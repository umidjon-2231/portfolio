'use client';
import {FC, PropsWithChildren} from 'react';
import {motion, useReducedMotion} from 'motion/react';

interface Props extends PropsWithChildren {
    /** seconds per full loop */
    speed?: number;
    reverse?: boolean;
    className?: string;
}

/** Infinite horizontal marquee (transform-only). Static if reduced-motion. */
const Marquee: FC<Props> = ({children, speed = 32, reverse = false, className}) => {
    const reduce = useReducedMotion();

    if (reduce) {
        return (
            <div className={`overflow-x-auto ${className ?? ''}`}>
                <div className="flex w-max gap-12">{children}</div>
            </div>
        );
    }

    return (
        <div
            className={`group overflow-hidden ${className ?? ''}`}
            aria-hidden="true"
        >
            <motion.div
                className="flex w-max gap-12 group-hover:[animation-play-state:paused]"
                initial={{x: reverse ? '-50%' : '0%'}}
                animate={{x: reverse ? '0%' : '-50%'}}
                transition={{duration: speed, ease: 'linear', repeat: Infinity}}
            >
                <div className="flex gap-12">{children}</div>
                <div className="flex gap-12">{children}</div>
            </motion.div>
        </div>
    );
};

export default Marquee;
