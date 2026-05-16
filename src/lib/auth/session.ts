import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {ADMIN_COOKIE, SESSION_MAX_AGE} from './constants';
import {verifySession, type SessionPayload} from './jwt';

/** Read + verify the admin session from the request cookies (route handlers). */
export async function getSession(): Promise<SessionPayload | null> {
    const store = await cookies();
    return verifySession(store.get(ADMIN_COOKIE)?.value);
}

/**
 * Guard for /api/admin/* route handlers (defense-in-depth — the proxy
 * also gates /admin pages, but the matcher excludes /api).
 * Returns a 401 NextResponse if unauthorized, otherwise null.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
    const session = await getSession();
    if (!session) {
        return NextResponse.json(
            {data: null, status: false, message: 'Unauthorized'},
            {status: 401},
        );
    }
    return null;
}

const isProd = process.env.NODE_ENV === 'production';

/** Cookie options for the signed, httpOnly session cookie. */
export function setSessionCookie(res: NextResponse, token: string): void {
    res.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_MAX_AGE,
    });
}

export function clearSessionCookie(res: NextResponse): void {
    res.cookies.set(ADMIN_COOKIE, '', {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });
}
