import {localized} from '@/db/scheme/_shared';
import type {IProfile} from '@/db/scheme/profile';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section, SectionHeader} from './_ui';
import Reveal from '@/components/motion/Reveal';

export default function About({
    profile,
    lang,
    dict,
}: {
    profile: IProfile | null;
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    if (!profile) return null;
    const bio = localized(profile.longBio, lang) || localized(profile.shortBio, lang);
    const goals = (profile.careerGoals ?? []).map((g) => localized(g, lang)).filter(Boolean);

    return (
        <Section id="about">
            <SectionHeader index="01" title={dict.sections.aboutTitle} />
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
                <Reveal>
                    <p className="text-balance text-xl leading-relaxed md:text-2xl">{bio}</p>
                </Reveal>
                {goals.length > 0 && (
                    <Reveal delay={0.15}>
                        <ul className="space-y-4 border-l border-line pl-6">
                            {goals.map((g, i) => (
                                <li key={i} className="text-sm leading-relaxed text-muted">
                                    <span className="mr-2 font-mono text-accent">→</span>
                                    {g}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                )}
            </div>
        </Section>
    );
}
