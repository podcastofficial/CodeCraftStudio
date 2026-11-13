import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
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