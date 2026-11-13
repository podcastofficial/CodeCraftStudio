import { NextRequest, NextResponse } from "next/server";

const allowedPrefixes = ["/miniapp", "/api", "/admin", "/_next"];
const allowedExact = new Set(["/robots.txt", "/favicon.ico", "/site.webmanifest"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (allowedExact.has(pathname) || allowedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next();
  }
  const destination = request.nextUrl.clone();
  destination.pathname = "/miniapp";
  destination.search = "";
  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
