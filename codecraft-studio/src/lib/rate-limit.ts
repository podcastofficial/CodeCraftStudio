import "server-only";
import { createHash } from "node:crypto";
import { getSql } from "@/lib/db";

export type RateLimitResult = { allowed: boolean; retryAfter: number };

export function clientKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const hash = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  return `${scope}:${hash}`;
}

/**
 * Fixed-window limiter stored in PostgreSQL so it works across serverless instances.
 * Fails open (allows the request) if the database check itself errors, so a limiter
 * problem never blocks real customers.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO rate_limits (key, window_start, count)
      VALUES (${key}, NOW(), 1)
      ON CONFLICT (key) DO UPDATE SET
        count = CASE
          WHEN rate_limits.window_start < NOW() - (${windowSeconds}::int * INTERVAL '1 second') THEN 1
          ELSE rate_limits.count + 1 END,
        window_start = CASE
          WHEN rate_limits.window_start < NOW() - (${windowSeconds}::int * INTERVAL '1 second') THEN NOW()
          ELSE rate_limits.window_start END
      RETURNING count,
        GREATEST(1, CEIL(EXTRACT(EPOCH FROM (window_start + (${windowSeconds}::int * INTERVAL '1 second') - NOW()))))::int AS retry_after
    `;
    const row = rows[0] as { count: number; retry_after: number };
    if (Math.random() < 0.01) {
      sql`DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '1 day'`.catch(() => {});
    }
    return { allowed: Number(row.count) <= limit, retryAfter: Number(row.retry_after) };
  } catch (error) {
    console.error("Rate limiter error (failing open):", error);
    return { allowed: true, retryAfter: 0 };
  }
}
