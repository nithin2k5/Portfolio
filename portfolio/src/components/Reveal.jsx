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

// Numbered, code-style section label, e.g. "01 / experience [1]"
export const SectionTitle = ({ index, children, count, className = '' }) => (
    <div className={`flex items-baseline gap-2 font-mono ${className}`}>
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {index && <span className="mr-1.5 text-signal">{index}</span>}
            {index && <span className="mr-1.5 opacity-40">/</span>}
            {children}
        </h2>
        {count !== undefined && <span className="text-[11px] tabular-nums text-muted-foreground opacity-60">[{count}]</span>}
    </div>
);

export default Reveal;
