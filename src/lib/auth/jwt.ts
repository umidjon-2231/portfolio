import {SignJWT, jwtVerify, type JWTPayload} from 'jose';
import {SESSION_MAX_AGE} from './constants';

export interface SessionPayload extends JWTPayload {
    role: 'admin';
}

function getSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 16) {
        throw new Error('JWT_SECRET is missing or too short (set a long random value in .env)');
    }
    return new TextEncoder().encode(secret);
}

/** Issue a signed admin session token (HS256, 7-day expiry). */
export async function signSession(): Promise<string> {
    return new SignJWT({role: 'admin'})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime(`${SESSION_MAX_AGE}s`)
        .sign(getSecret());
}

/** Verify a session token. Returns the payload, or null if invalid/expired. */
export async function verifySession(
    token: string | undefined | null,
): Promise<SessionPayload | null> {
    if (!token) return null;
    try {
        const {payload} = await jwtVerify(token, getSecret());
        return payload.role === 'admin' ? (payload as SessionPayload) : null;
    } catch {
        return null;
    }
}
