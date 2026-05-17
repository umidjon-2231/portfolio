import {localized} from '@/db/scheme/_shared';
import type {IWriting} from '@/db/scheme/writing';
import type {IOpenSource} from '@/db/scheme/openSource';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section, SectionHeader} from './_ui';
import Reveal from '@/components/motion/Reveal';

export default function WritingOpenSource({
    writing,
    openSource,
    lang,
    dict,
}: {
    writing: IWriting[];
    openSource: IOpenSource[];
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    if (!writing.length && !openSource.length) return null;
    return (
        <Section id="writing">
            <SectionHeader index="04" title={dict.sections.writingTitle} />
            <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-6">
                    {writing.map((w, i) => (
                        <Reveal key={String(w._id) || i} delay={i * 0.06}>
                            <a
                                href={w.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-xl border border-line p-6 transition-colors hover:bg-surface"
                            >
                                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted">
                                    <span>{w.platform}</span>
                                    <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                                        Read ↗
                                    </span>
                                </div>
                                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                                    {localized(w.title, lang)}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {localized(w.summary, lang)}
                                </p>
                                {w.metrics && (
                                    <p className="mt-3 font-mono text-xs text-accent">
                                        {localized(w.metrics, lang)}
                                    </p>
                                )}
                            </a>
                        </Reveal>
                    ))}
                </div>
                <div className="space-y-6">
                    {openSource.map((o, i) => (
                        <Reveal key={String(o._id) || i} delay={i * 0.06}>
                            <a
                                href={o.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-xl border border-line p-6 transition-colors hover:bg-surface"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold tracking-tight">
                                        {o.name}
                                    </h3>
                                    <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                                        ↗
                                    </span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted">
                                    {localized(o.description, lang)}
                                </p>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}
