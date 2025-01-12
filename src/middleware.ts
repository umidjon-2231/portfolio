import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {match as matchLocale} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {DEFAULT_LANG, dictionary} from "@/locales";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: string[] = Object.keys(dictionary);

    console.log(locales)
    const languages = new Negotiator({headers: negotiatorHeaders}).languages(
        locales,
    );

    return matchLocale(languages, locales, DEFAULT_LANG);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (
        pathname.match(/\/(.+)\.(.+)/)?.index !== undefined
    ) return
    console.log(pathname)
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