import {localized} from '@/db/scheme/_shared';
import type {IProject} from '@/db/scheme/project';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section, SectionHeader} from './_ui';
import Reveal from '@/components/motion/Reveal';
import ParallaxCard from '@/components/motion/ParallaxCard';

const linkList = (links: IProject['links'] = {}) =>
    [
        links.liveDemo && {label: 'Live', href: links.liveDemo},
        links.github && {label: 'Code', href: links.github},
        links.npm && {label: 'npm', href: links.npm},
        links.other && {label: 'Link', href: links.other},
    ].filter(Boolean) as {label: string; href: string}[];

export default function SelectedWork({
    projects,
    lang,
    dict,
}: {
    projects: IProject[];
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    if (!projects.length) return null;
    return (
        <Section id="work">
            <SectionHeader
                index="02"
                title={dict.sections.workTitle}
                aside={dict.ui.selectedWorkKicker}
            />
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {projects.map((p, i) => (
                    <ParallaxCard key={String(p._id) || i} range={i % 2 ? 28 : 44}>
                        <Reveal delay={(i % 2) * 0.08}>
                            <article className="group flex h-full flex-col justify-between gap-8 bg-background p-7 transition-colors hover:bg-surface md:p-10">
                                <div>
                                    <span className="font-mono text-xs text-muted">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                                        {localized(p.title, lang)}
                                    </h3>
                                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
                                        {localized(p.description, lang)}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {p.techStack?.length > 0 && (
                                        <ul className="flex flex-wrap gap-2">
                                            {p.techStack.map((t) => (
                                                <li
                                                    key={t}
                                                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {linkList(p.links).length > 0 && (
                                        <div className="flex gap-4 text-sm">
                                            {linkList(p.links).map((l) => (
                                                <a
                                                    key={l.label}
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent underline-offset-4 hover:underline"
                                                >
                                                    {l.label} ↗
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        </Reveal>
                    </ParallaxCard>
                ))}
            </div>
        </Section>
    );
}
