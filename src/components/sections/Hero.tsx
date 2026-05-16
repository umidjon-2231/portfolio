import {localized} from '@/db/scheme/_shared';
import type {IProfile} from '@/db/scheme/profile';
import type {DictionaryType, LanguageEnum} from '@/locales';
import AnimatedHeadline from '@/components/motion/AnimatedHeadline';
import MagneticButton from '@/components/motion/MagneticButton';
import Reveal from '@/components/motion/Reveal';

const social = (links: IProfile['socialLinks'] = {}) => {
    const out: {label: string; href: string}[] = [];
    if (links.github) out.push({label: 'GitHub', href: links.github});
    if (links.linkedin) out.push({label: 'LinkedIn', href: links.linkedin});
    if (links.x) out.push({label: 'X', href: links.x});
    if (links.telegram) out.push({label: 'Telegram', href: links.telegram});
    if (links.instagram) out.push({label: 'Instagram', href: links.instagram});
    if (links.email)
        out.push({
            label: 'Email',
            href: links.email.startsWith('mailto:') ? links.email : `mailto:${links.email}`,
        });
    return out;
};

export default function Hero({
    profile,
    lang,
    dict,
}: {
    profile: IProfile | null;
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    const headline = profile ? localized(profile.headline, lang) : 'Full-Stack Engineer & CTO';
    const bio = profile ? localized(profile.shortBio, lang) : '';
    const city = profile ? localized(profile.city, lang) : '';
    const status = profile ? localized(profile.status, lang) : '';
    const words = headline.split(' ');
    const accentWords = words.length ? [words.length - 1] : [];

    return (
        <header className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-20 md:px-8">
            <Reveal y={12}>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                    {profile?.fullName ?? 'Umidjon Tojiboyev'}
                    {city && <span className="text-line">/</span>}
                    {city && <span>{city}</span>}
                </div>
            </Reveal>

            <AnimatedHeadline
                text={headline}
                accentWords={accentWords}
                className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
            />

            {bio && (
                <Reveal delay={0.2}>
                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                        {bio}
                    </p>
                </Reveal>
            )}

            <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <MagneticButton
                        href="/cv.pdf"
                        download="Umidjon Tojiboyev — CV.pdf"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform"
                    >
                        {dict.ui.downloadCv}
                        <span aria-hidden>↓</span>
                    </MagneticButton>
                    <a
                        href="#contact"
                        className="rounded-full border border-line px-6 py-3 text-sm font-medium hover:border-foreground"
                    >
                        {dict.ui.getInTouch}
                    </a>
                    {status && (
                        <span className="ml-1 font-mono text-xs uppercase tracking-widest text-muted">
                            {dict.ui.availableFor}: {status}
                        </span>
                    )}
                </div>
            </Reveal>

            <Reveal delay={0.42}>
                <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    {social(profile?.socialLinks).map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 hover:text-foreground"
                        >
                            <span className="underline-offset-4 group-hover:underline">
                                {s.label}
                            </span>
                            <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                                ↗
                            </span>
                        </a>
                    ))}
                </nav>
            </Reveal>
        </header>
    );
}
