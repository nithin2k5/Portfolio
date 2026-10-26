import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 500, damping: 40, mass: 0.6 };

// Shows the nearest [data-say] hint in a bubble that trails the cursor (mouse only)
const CursorBubble = () => {
    const [text, setText] = useState(null);
    const [enabled, setEnabled] = useState(false);
    const x = useSpring(useMotionValue(-100), SPRING);
    const y = useSpring(useMotionValue(-100), SPRING);

    useEffect(() => {
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setEnabled(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;
        const onMove = (e) => {
            // Keep the bubble on screen near the right edge
            x.set(Math.min(e.clientX + 14, window.innerWidth - 200));
            y.set(e.clientY + 18);
            const target = e.target instanceof Element ? e.target.closest('[data-say]') : null;
            setText(target ? target.getAttribute('data-say') : null);
        };
        const onLeave = () => setText(null);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        window.addEventListener('blur', onLeave);
        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('blur', onLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60]" style={{ x, y }}>
            <AnimatePresence>
                {text && (
                    <motion.span
                        key="bubble"
                        initial={{ opacity: 0, scale: 0.85, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="block origin-top-left whitespace-nowrap rounded-full rounded-tl-sm border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-md backdrop-blur-md"
                    >
                        {text}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CursorBubble;
