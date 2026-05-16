'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import type {DictionaryType, LanguageEnum} from '@/locales';

const LOCALES: LanguageEnum[] = ['en', 'ru', 'uz'];

export default function SiteNav({
    lang,
    dict,
}: {
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const sections = [
        {href: '#about', label: dict.nav.about},
        {href: '#work', label: dict.nav.work},
        {href: '#experience', label: dict.nav.experience},
        {href: '#writing', label: dict.nav.writing},
        {href: '#contact', label: dict.nav.contact},
    ];
    const resumeHref = lang === 'en' ? '/resume' : `/${lang}/resume`;
    const localeHref = (l: LanguageEnum) => (l === 'en' ? '/' : `/${l}`);

    return (
        <header
            id="top"
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                scrolled
                    ? 'border-b border-line bg-background/80 backdrop-blur-md'
                    : 'border-b border-transparent'
            }`}
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
                <Link
                    href={localeHref(lang)}
                    className="font-mono text-sm font-semibold tracking-tight"
                >
                    UT<span className="text-accent">.</span>
                </Link>

                <nav className="hidden items-center gap-7 text-sm md:flex">
                    {sections.map((s) => (
                        <a
                            key={s.href}
                            href={s.href}
                            className="text-muted transition-colors hover:text-foreground"
                        >
                            {s.label}
                        </a>
                    ))}
                    <Link
                        href={resumeHref}
                        className="text-muted transition-colors hover:text-foreground"
                    >
                        {dict.nav.resume}
                    </Link>
                    <span className="flex items-center gap-2 border-l border-line pl-5 font-mono text-xs uppercase">
                        {LOCALES.map((l) => (
                            <Link
                                key={l}
                                href={localeHref(l)}
                                className={
                                    l === lang
                                        ? 'text-accent'
                                        : 'text-muted hover:text-foreground'
                                }
                            >
                                {l}
                            </Link>
                        ))}
                    </span>
                </nav>

                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="md:hidden"
                    aria-label="Menu"
                    aria-expanded={open}
                >
                    <span className="font-mono text-sm">{open ? 'CLOSE' : 'MENU'}</span>
                </button>
            </div>

            {open && (
                <div className="border-t border-line bg-background px-5 py-6 md:hidden">
                    <nav className="flex flex-col gap-4 text-lg">
                        {sections.map((s) => (
                            <a key={s.href} href={s.href} onClick={() => setOpen(false)}>
                                {s.label}
                            </a>
                        ))}
                        <Link href={resumeHref} onClick={() => setOpen(false)}>
                            {dict.nav.resume}
                        </Link>
                        <span className="mt-2 flex gap-4 font-mono text-sm uppercase">
                            {LOCALES.map((l) => (
                                <Link
                                    key={l}
                                    href={localeHref(l)}
                                    className={l === lang ? 'text-accent' : 'text-muted'}
                                >
                                    {l}
                                </Link>
                            ))}
                        </span>
                    </nav>
                </div>
            )}
        </header>
    );
}
