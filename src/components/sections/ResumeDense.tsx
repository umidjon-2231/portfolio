import Link from 'next/link';
import {localized} from '@/db/scheme/_shared';
import type {DictionaryType, LanguageEnum} from '@/locales';
import type {PortfolioData} from '@/lib/portfolio';

const fmt = (d: Date | string | undefined, lang: string) =>
    d ? new Date(d).toLocaleDateString(lang, {month: 'short', year: 'numeric'}) : '';

const Block = ({title, children}: {title: string; children: React.ReactNode}) => (
    <section className="border-t border-line py-8">
        <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {title}
        </h2>
        {children}
    </section>
);

export default function ResumeDense({
    data,
    lang,
    dict,
}: {
    data: PortfolioData;
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    const {
        profile,
        allProjects,
        experience,
        skills,
        education,
        certifications,
        writing,
        openSource,
        events,
        coursework,
        socialProof,
    } = data;

    const skillsByCat = skills.reduce<Record<string, string[]>>((acc, s) => {
        (acc[s.category] ??= []).push(s.name);
        return acc;
    }, {});
    const homeHref = lang === 'en' ? '/' : `/${lang}`;

    return (
        <main className="mx-auto w-full max-w-3xl px-5 py-20 md:px-8">
            <Link
                href={homeHref}
                className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
            >
                ← {dict.ui.backHome}
            </Link>

            <header className="mt-8 border-b border-line pb-8">
                <h1 className="text-4xl font-semibold tracking-tight">
                    {profile?.fullName ?? 'Umidjon Tojiboyev'}
                </h1>
                {profile && (
                    <>
                        <p className="mt-2 text-lg text-muted">
                            {localized(profile.headline, lang)}
                        </p>
                        <p className="mt-4 max-w-prose text-sm leading-relaxed">
                            {localized(profile.longBio, lang) ||
                                localized(profile.shortBio, lang)}
                        </p>
                    </>
                )}
            </header>

            {experience.length > 0 && (
                <Block title={dict.sections.experienceTitle}>
                    <div className="space-y-6">
                        {experience.map((e, i) => (
                            <div key={i}>
                                <div className="flex justify-between gap-4">
                                    <strong className="text-sm">
                                        {localized(e.role, lang)} · {e.company}
                                    </strong>
                                    <span className="shrink-0 font-mono text-xs text-muted">
                                        {fmt(e.startDate, lang)} —{' '}
                                        {e.current || !e.endDate
                                            ? dict.ui.present
                                            : fmt(e.endDate, lang)}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-muted">
                                    {localized(e.description, lang)}
                                </p>
                                {e.highlights?.length > 0 && (
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                                        {e.highlights.map((h, j) => (
                                            <li key={j}>{localized(h, lang)}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </Block>
            )}

            {allProjects.length > 0 && (
                <Block title={dict.sections.workTitle}>
                    <ul className="space-y-3">
                        {allProjects.map((p, i) => (
                            <li key={i} className="text-sm">
                                <strong>{localized(p.title, lang)}</strong>
                                <span className="text-muted">
                                    {' '}
                                    — {localized(p.description, lang)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {Object.keys(skillsByCat).length > 0 && (
                <Block title={dict.sections.skillsTitle}>
                    <dl className="space-y-2 text-sm">
                        {Object.entries(skillsByCat).map(([cat, names]) => (
                            <div key={cat} className="flex flex-col gap-1 md:flex-row md:gap-4">
                                <dt className="w-44 shrink-0 font-mono text-xs uppercase text-muted">
                                    {cat}
                                </dt>
                                <dd>{names.join(', ')}</dd>
                            </div>
                        ))}
                    </dl>
                </Block>
            )}

            {education.length > 0 && (
                <Block title={dict.sections.educationTitle}>
                    <div className="space-y-3 text-sm">
                        {education.map((e, i) => (
                            <div key={i} className="flex justify-between gap-4">
                                <span>
                                    <strong>{localized(e.degree, lang)}</strong> ·{' '}
                                    {e.institution}
                                    {e.grade && (
                                        <span className="text-muted"> · {e.grade}</span>
                                    )}
                                </span>
                                <span className="shrink-0 font-mono text-xs text-muted">
                                    {fmt(e.startDate, lang)} — {fmt(e.endDate, lang)}
                                </span>
                            </div>
                        ))}
                    </div>
                </Block>
            )}

            {writing.length > 0 && (
                <Block title={dict.sections.writingTitle}>
                    <ul className="space-y-2 text-sm">
                        {writing.map((w, i) => (
                            <li key={i}>
                                <a
                                    href={w.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline-offset-4 hover:underline"
                                >
                                    {localized(w.title, lang)}
                                </a>{' '}
                                <span className="text-muted">— {w.platform}</span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {openSource.length > 0 && (
                <Block title="Open Source">
                    <ul className="space-y-2 text-sm">
                        {openSource.map((o, i) => (
                            <li key={i}>
                                <a
                                    href={o.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline-offset-4 hover:underline"
                                >
                                    {o.name}
                                </a>{' '}
                                <span className="text-muted">
                                    — {localized(o.description, lang)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {certifications.length > 0 && (
                <Block title={dict.sections.certificationsTitle}>
                    <ul className="space-y-1 text-sm">
                        {certifications.map((c, i) => (
                            <li key={i}>
                                {localized(c.name, lang)}{' '}
                                <span className="text-muted">— {c.issuer}</span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {coursework.length > 0 && (
                <Block title={dict.sections.courseworkTitle}>
                    <ul className="space-y-2 text-sm">
                        {coursework.map((c, i) => (
                            <li key={i}>
                                <strong>{localized(c.title, lang)}</strong>
                                <span className="text-muted">
                                    {' '}
                                    — {localized(c.description, lang)}
                                    {c.topics?.length ? ` (${c.topics.join(', ')})` : ''}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {events.length > 0 && (
                <Block title={dict.sections.eventsTitle}>
                    <ul className="space-y-2 text-sm">
                        {events.map((e, i) => (
                            <li key={i}>
                                <strong>{localized(e.title, lang)}</strong>
                                <span className="text-muted">
                                    {' '}
                                    — {localized(e.description, lang)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Block>
            )}

            {socialProof?.items?.length ? (
                <Block title={dict.sections.proofTitle}>
                    <ul className="grid grid-cols-2 gap-3 text-sm">
                        {socialProof.items.map((s, i) => (
                            <li key={i}>
                                <span className="font-mono text-xs uppercase text-muted">
                                    {s.platform}
                                </span>
                                <div>{localized(s.stat, lang)}</div>
                            </li>
                        ))}
                    </ul>
                </Block>
            ) : null}
        </main>
    );
}
