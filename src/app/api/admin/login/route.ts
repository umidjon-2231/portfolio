import {NextRequest, NextResponse} from 'next/server';
import {verifyCaptcha} from '@/lib/recaptcha';
import {verifyPassword} from '@/lib/auth/password';
import {signSession} from '@/lib/auth/jwt';
import {setSessionCookie} from '@/lib/auth/session';

export const POST = async (req: NextRequest) => {
    let body: {password?: string; recaptchaToken?: string};
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            {data: null, status: false, message: 'Bad request'},
            {status: 400},
        );
    }

    // reCAPTCHA is enforced only when configured (keeps dev usable).
    if (process.env.RECAPTCHA_SECRET_KEY) {
        const captcha = await verifyCaptcha(body.recaptchaToken ?? '');
        if (!captcha.success) {
            return NextResponse.json(
                {data: null, status: false, message: 'Captcha verification failed'},
                {status: 400},
            );
        }
    }

    let ok = false;
    try {
        ok = await verifyPassword(body.password ?? '');
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {data: null, status: false, message: 'Server auth not configured'},
            {status: 500},
        );
    }

    if (!ok) {
        return NextResponse.json(
            {data: null, status: false, message: 'Invalid password'},
            {status: 401},
        );
    }

    const token = await signSession();
    const res = NextResponse.json({data: null, status: true, message: 'Logged in'});
    setSessionCookie(res, token);
    return res;
};
