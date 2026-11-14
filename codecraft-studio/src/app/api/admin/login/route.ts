import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = await rateLimit(clientKey(request, "admin-login"), 5, 15 * 60);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }
  try {
    const parsed = loginSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid login details." }, { status: 400 });
    const valid = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
    if (!valid) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Admin login is not configured correctly." }, { status: 500 });
  }
}