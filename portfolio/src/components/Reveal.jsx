import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// Fades and lifts content in the first time it scrolls into view
const Reveal = ({ as = 'div', delay = 0, className, children, ...rest }) => {
    const reduce = useReducedMotion();
    const Component = motion[as];

    return (
        <Component
            className={className}
            initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay }}
            {...rest}
        >
            {children}
        </Component>
    );
};

export const SectionTitle = ({ children, count, className = '' }) => (
    <div className={`flex items-baseline gap-2 ${className}`}>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{children}</h2>
        {count !== undefined && <span className="text-[11px] tabular-nums text-muted-foreground">{count}</span>}
    </div>
);

export default Reveal;
