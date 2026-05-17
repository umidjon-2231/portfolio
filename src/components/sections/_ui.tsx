import {FC, PropsWithChildren, ReactNode} from 'react';
import Reveal from '@/components/motion/Reveal';

export const Section: FC<PropsWithChildren<{id?: string; className?: string}>> = ({
    id,
    className,
    children,
}) => (
    <section
        id={id}
        className={`scroll-mt-24 border-t border-line py-20 md:py-32 ${className ?? ''}`}
    >
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
);

export const SectionHeader: FC<{
    index: string;
    title: string;
    aside?: ReactNode;
}> = ({index, title, aside}) => (
    <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
            <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    {index}
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                    {title}
                </h2>
            </div>
            {aside && <div className="hidden shrink-0 text-sm text-muted md:block">{aside}</div>}
        </div>
    </Reveal>
);
