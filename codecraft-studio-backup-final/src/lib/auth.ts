import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "ccs_admin_session";
const secret = () => {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be configured with at least 32 characters.");
  return new TextEncoder().encode(value);
};

export async function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!configuredEmail || !hash) return false;
  if (email.trim().toLowerCase() !== configuredEmail.trim().toLowerCase()) return false;
  return bcrypt.compare(password, hash);
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}