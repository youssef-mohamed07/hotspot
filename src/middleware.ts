import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultAudience, isAudience } from "@/i18n/audience";
import { defaultLocale, isLocale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const maybeAudience = segments[1];

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/${defaultAudience}`;
    // Keep utm_* / gclid / fbclid on paid landing redirects
    return NextResponse.redirect(url);
  }

  const locale = isLocale(maybeLocale ?? "") ? maybeLocale! : defaultLocale;
  const hasAudience = isAudience(maybeAudience ?? "");
  const audience = hasAudience ? maybeAudience! : defaultAudience;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-audience", audience);

  if (!isLocale(maybeLocale ?? "") || !hasAudience) {
    const url = request.nextUrl.clone();
    const rest = !isLocale(maybeLocale ?? "")
      ? pathname
      : hasAudience
        ? pathname.replace(`/${locale}/${maybeAudience}`, "")
        : pathname.replace(`/${locale}`, "");
    url.pathname = `/${locale}/${defaultAudience}${rest === "/" ? "" : rest}`;
    // searchParams (UTM, click IDs) preserved via clone()
    const response = NextResponse.redirect(url);
    response.headers.set("x-locale", locale);
    response.headers.set("x-audience", defaultAudience);
    return response;
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-locale", locale);
  response.headers.set("x-audience", audience);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
