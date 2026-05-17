import {localized} from '@/db/scheme/_shared';
import type {IProfile} from '@/db/scheme/profile';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section} from './_ui';
import Reveal from '@/components/motion/Reveal';
import MagneticButton from '@/components/motion/MagneticButton';

export default function Contact({
    profile,
    lang,
    dict,
}: {
    profile: IProfile | null;
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    const email = profile?.socialLinks?.email;
    const mailto = email
        ? email.startsWith('mailto:')
            ? email
            : `mailto:${email}`
        : 'mailto:tumidjon808@gmail.com';
    const status = profile ? localized(profile.status, lang) : '';

    return (
        <Section id="contact">
            <Reveal>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    06
                </span>
                <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                    {dict.sections.contactTitle}
                </h2>
            </Reveal>
            <Reveal delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <MagneticButton
                        href={mailto}
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-medium text-accent-ink"
                    >
                        {dict.ui.emailMe}
                        <span aria-hidden>→</span>
                    </MagneticButton>
                    {status && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {status}
                        </span>
                    )}
                </div>
            </Reveal>
        </Section>
    );
}
