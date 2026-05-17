'use client';
import {FC, PropsWithChildren} from 'react';
import {motion, useReducedMotion} from 'motion/react';

interface Props extends PropsWithChildren {
    delay?: number;
    y?: number;
    className?: string;
}

/** Fade + rise into view on scroll. Honors prefers-reduced-motion. */
const Reveal: FC<Props> = ({children, delay = 0, y = 28, className}) => {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{opacity: 0, y}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.7, delay, ease: [0.16, 1, 0.3, 1]}}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
