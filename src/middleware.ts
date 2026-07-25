import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { ROUTES } from "@/constants/route";
import { ROUTE_ROLE_MAP, Role } from "@/constants/route-permissions";

// Ce middleware est un confort UX, la vraie protection est déjà assurée par
// @PreAuthorize côté backend Spring Boot — ne JAMAIS considérer ce fichier
// comme suffisant pour la sécurité.
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  const { pathname } = request.nextUrl;
  const roles = (token.roles as Role[] | undefined) ?? [];

  const rule = ROUTE_ROLE_MAP.find(({ prefix }) => pathname.startsWith(prefix));

  if (rule && !roles.some((role) => rule.roles.includes(role))) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
