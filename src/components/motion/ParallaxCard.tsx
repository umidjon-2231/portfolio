'use client';
import {PropsWithChildren, useRef} from 'react';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';

interface Props extends PropsWithChildren {
    /** vertical travel in px across the scroll range */
    range?: number;
    className?: string;
}

/** Subtle scroll parallax. No transform when reduced-motion. */
const ParallaxCard = ({children, range = 60, className}: Props) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={reduce ? undefined : {y}}>{children}</motion.div>
        </div>
    );
};

export default ParallaxCard;
