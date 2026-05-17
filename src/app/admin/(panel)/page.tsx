import Link from 'next/link';
import {DOMAINS} from '@/lib/admin/config';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-500">
                Edit every section of the portfolio. EN is required; RU/UZ fall back to EN.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOMAINS.map((d) => (
                    <Link
                        key={d.key}
                        href={`/admin/${d.slug}`}
                        className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-neutral-700 hover:bg-neutral-900 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{d.label}</span>
                            {d.singleton && (
                                <span className="text-[10px] uppercase tracking-wide text-neutral-600">
                                    single
                                </span>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-neutral-500">{d.hint}</p>
                        <span className="mt-3 inline-block text-sm text-neutral-400 group-hover:text-neutral-200">
                            Edit →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
