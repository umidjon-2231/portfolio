import type {ISkill} from '@/db/scheme/skill';
import type {DictionaryType, LanguageEnum} from '@/locales';
import {Section, SectionHeader} from './_ui';
import Marquee from '@/components/motion/Marquee';

const Track = ({items}: {items: string[]}) => (
    <>
        {items.map((s, i) => (
            <span key={i} className="flex items-center gap-12">
                <span className="text-3xl font-semibold tracking-tight md:text-5xl">
                    {s}
                </span>
                <span className="text-accent">✦</span>
            </span>
        ))}
    </>
);

export default function SkillsMarquee({
    skills,
    dict,
}: {
    skills: ISkill[];
    lang: LanguageEnum;
    dict: DictionaryType;
}) {
    if (!skills.length) return null;
    const names = skills.map((s) => s.name);
    const mid = Math.ceil(names.length / 2);
    const rowA = names.slice(0, mid);
    const rowB = names.slice(mid);

    return (
        <Section id="skills" className="overflow-hidden">
            <SectionHeader index="05" title={dict.sections.skillsTitle} />
            <div className="space-y-6">
                <Marquee speed={40}>
                    <Track items={rowA} />
                </Marquee>
                {rowB.length > 0 && (
                    <Marquee speed={48} reverse>
                        <Track items={rowB} />
                    </Marquee>
                )}
            </div>
        </Section>
    );
}
