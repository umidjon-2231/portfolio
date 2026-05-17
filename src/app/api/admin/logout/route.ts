import {NextResponse} from 'next/server';
import {clearSessionCookie} from '@/lib/auth/session';

export const POST = async () => {
    const res = NextResponse.json({data: null, status: true, message: 'Logged out'});
    clearSessionCookie(res);
    return res;
};
