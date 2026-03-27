import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "auth-token";

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? "");
}

async function getPayload(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { sub: string; role: string; name: string; email: string };
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin panel — requires ADMIN role
  if (pathname.startsWith("/admin")) {
    const payload = await getPayload(req);
    if (!payload || payload.role !== "ADMIN") {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Booking — requires any authenticated user
  if (pathname.startsWith("/booking")) {
    const payload = await getPayload(req);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Account — requires any authenticated user
  if (pathname.startsWith("/account")) {
    const payload = await getPayload(req);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/booking/:path*", "/account/:path*"],
};
