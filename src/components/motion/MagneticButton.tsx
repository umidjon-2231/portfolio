'use client';
import {PropsWithChildren, useRef} from 'react';
import {motion, useMotionValue, useReducedMotion, useSpring} from 'motion/react';

interface Props extends PropsWithChildren {
    href: string;
    download?: string | boolean;
    external?: boolean;
    className?: string;
}

/** Pointer-magnetic CTA. Falls back to a plain link when reduced-motion. */
const MagneticButton = ({
    children,
    href,
    download,
    external,
    className,
}: Props) => {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, {stiffness: 220, damping: 16, mass: 0.4});
    const sy = useSpring(y, {stiffness: 220, damping: 16, mass: 0.4});

    const onMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={reduce ? undefined : {x: sx, y: sy}}
            className={className}
        >
            {children}
        </motion.a>
    );
};

export default MagneticButton;
