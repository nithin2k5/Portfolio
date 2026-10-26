import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

// Pulls its child gently toward the cursor and springs back on leave; also squishes on press
const Magnetic = ({ strength = 0.25, max = 8, className = '', children }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const x = useSpring(useMotionValue(0), SPRING);
    const y = useSpring(useMotionValue(0), SPRING);

    const onPointerMove = (e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const box = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (box.left + box.width / 2)) * strength;
        const dy = (e.clientY - (box.top + box.height / 2)) * strength;
        x.set(Math.max(-max, Math.min(max, dx)));
        y.set(Math.max(-max, Math.min(max, dy)));
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x, y }}
            whileTap={reduce ? undefined : { scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
