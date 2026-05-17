'use client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ReCaptchaProvider, useReCaptcha} from 'next-recaptcha-v3';

const LoginForm = () => {
    const router = useRouter();
    const {executeRecaptcha} = useReCaptcha();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setBusy(true);
        try {
            const recaptchaToken = executeRecaptcha
                ? await executeRecaptcha('admin_login')
                : '';
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password, recaptchaToken}),
            });
            const json = await res.json();
            if (res.ok && json.status) {
                router.replace('/admin');
                router.refresh();
            } else {
                setError(json.message || 'Login failed');
                setBusy(false);
            }
        } catch {
            setError('Network error');
            setBusy(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 space-y-5"
            >
                <div>
                    <h1 className="text-xl font-semibold">Admin sign in</h1>
                    <p className="mt-1 text-sm text-neutral-500">Portfolio dashboard</p>
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="pw" className="text-sm text-neutral-400">
                        Password
                    </label>
                    <input
                        id="pw"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                    />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
                >
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    );
};

const LoginPage = () => (
    <ReCaptchaProvider>
        <LoginForm />
    </ReCaptchaProvider>
);

export default LoginPage;
