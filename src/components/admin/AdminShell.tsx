'use client';
import {FC, PropsWithChildren, useState} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {DOMAINS} from '@/lib/admin/config';

const AdminShell: FC<PropsWithChildren> = ({children}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    const logout = async () => {
        setLoggingOut(true);
        await fetch('/api/admin/logout', {method: 'POST'});
        router.replace('/admin/login');
        router.refresh();
    };

    const isActive = (slug: string) =>
        pathname === `/admin/${slug}` || pathname.startsWith(`/admin/${slug}/`);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
            <aside className="w-60 shrink-0 border-r border-neutral-800 flex flex-col">
                <Link href="/admin" className="px-5 py-5 text-lg font-semibold tracking-tight">
                    Portfolio<span className="text-neutral-500"> / admin</span>
                </Link>
                <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {DOMAINS.map((d) => (
                        <Link
                            key={d.key}
                            href={`/admin/${d.slug}`}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                isActive(d.slug)
                                    ? 'bg-neutral-800 text-white'
                                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                            }`}
                        >
                            {d.label}
                            {d.singleton && (
                                <span className="ml-2 text-[10px] uppercase text-neutral-600">single</span>
                            )}
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={logout}
                    disabled={loggingOut}
                    className="m-3 rounded-md border border-neutral-800 px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 disabled:opacity-50"
                >
                    {loggingOut ? 'Signing out…' : 'Sign out'}
                </button>
            </aside>
            <main className="flex-1 overflow-x-hidden">
                <div className="mx-auto max-w-4xl px-8 py-10">{children}</div>
            </main>
        </div>
    );
};

export default AdminShell;
