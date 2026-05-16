import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {match as matchLocale} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {DEFAULT_LANG, dictionary} from "@/locales";
import {verifySession} from "@/lib/auth/jwt";
import {ADMIN_COOKIE} from "@/lib/auth/constants";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: string[] = Object.keys(dictionary);

    const languages = new Negotiator({headers: negotiatorHeaders}).languages(
        locales,
    );

    return matchLocale(languages, locales, DEFAULT_LANG);
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (
        pathname.match(/\/(.+)\.(.+)/)?.index !== undefined
    ) return

    // Admin gate — runs before i18n. The admin UI is English-only, so it
    // is never locale-redirected. /admin/login is public.
    if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") return;
        const session = await verifySession(request.cookies.get(ADMIN_COOKIE)?.value);
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        return;
    }

    const pathnameIsMissingLocale = Object.keys(dictionary).every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        if (locale==="en") return
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url,
            ),
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};