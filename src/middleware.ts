import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/logout"];

function isPublic(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => new RegExp(`^${route}$`).test(pathname));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  res.cookies.set("next-url", pathname);

  if (isPublic(pathname)) {
    return res;
  }

  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|fonts|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
