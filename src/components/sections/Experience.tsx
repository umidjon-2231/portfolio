import {localized} from '@/db/scheme/_shared';
import type {IExperience} from '@/db/scheme/experience';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section, SectionHeader} from './_ui';
import Reveal from '@/components/motion/Reveal';

const fmt = (d: Date | string | undefined, lang: string) =>
    d
        ? new Date(d).toLocaleDateString(lang, {month: 'short', year: 'numeric'})
        : '';

export default function Experience({
    experience,
    lang,
    dict,
}: {
    experience: IExperience[];
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    if (!experience.length) return null;
    return (
        <Section id="experience">
            <SectionHeader index="03" title={dict.sections.experienceTitle} />
            <div className="border-l border-line">
                {experience.map((e, i) => (
                    <Reveal key={String(e._id) || i} delay={Math.min(i * 0.06, 0.3)}>
                        <div className="relative pl-8 pb-14 last:pb-0 md:pl-12">
                            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                                    {localized(e.role, lang)}
                                    <span className="text-muted"> · {e.company}</span>
                                </h3>
                                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                                    {fmt(e.startDate, lang)} —{' '}
                                    {e.current || !e.endDate
                                        ? dict.ui.present
                                        : fmt(e.endDate, lang)}
                                </span>
                            </div>
                            <p className="mt-1 font-mono text-xs text-muted">
                                {[e.employmentType, e.location, e.remote && 'Remote']
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                                {localized(e.description, lang)}
                            </p>
                            {e.highlights?.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {e.highlights.map((h, j) => (
                                        <li
                                            key={j}
                                            className="flex gap-3 text-sm leading-relaxed"
                                        >
                                            <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                                            <span>{localized(h, lang)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {e.techStack?.length > 0 && (
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {e.techStack.map((t) => (
                                        <li
                                            key={t}
                                            className="font-mono text-[11px] text-muted"
                                        >
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
