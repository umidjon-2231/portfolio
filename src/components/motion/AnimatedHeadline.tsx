'use client';
import {motion, useReducedMotion} from 'motion/react';

interface Props {
    text: string;
    /** word indexes to paint with the accent color */
    accentWords?: number[];
    className?: string;
}

/** Word-by-word rise-in headline. Plain text when reduced-motion. */
const AnimatedHeadline = ({text, accentWords = [], className}: Props) => {
    const reduce = useReducedMotion();
    const words = text.split(' ');

    const render = (w: string, i: number) => (
        <span
            key={i}
            className={
                accentWords.includes(i) ? 'text-accent' : undefined
            }
        >
            {w}
            {i < words.length - 1 ? ' ' : ''}
        </span>
    );

    if (reduce) {
        return <h1 className={className}>{words.map(render)}</h1>;
    }

    return (
        <h1 className={className} aria-label={text}>
            {words.map((w, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{opacity: 0, y: '0.5em'}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.7,
                        delay: 0.05 * i,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <span className={accentWords.includes(i) ? 'text-accent' : undefined}>
                        {w}
                        {i < words.length - 1 ? ' ' : ''}
                    </span>
                </motion.span>
            ))}
        </h1>
    );
};

export default AnimatedHeadline;
