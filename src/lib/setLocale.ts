import {LOCALE_COOKIE, type LanguageEnum} from '@/locales';

/**
 * Persist an explicit language choice and hard-navigate so the proxy
 * (src/proxy.ts) sees the cookie and stops auto-redirecting by
 * Accept-Language. Module-level so it isn't flagged as an in-component
 * external mutation by the React compiler lint.
 */
export function setLocaleAndGo(l: LanguageEnum): void {
    document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
    window.location.assign(l === 'en' ? '/' : `/${l}`);
}
