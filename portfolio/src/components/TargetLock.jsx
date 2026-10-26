import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const GLIDE = { stiffness: 420, damping: 36, mass: 0.7 };
const EASE = [0.22, 1, 0.36, 1];
const LABEL_H = 20;
// Short grace period so the box doesn't drop while crossing gaps between elements
const RELEASE_DELAY = 110;

// A stable fake "confidence score" per label, 0.90–0.99
const confidence = (text) => {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
    return (0.9 + (h % 10) / 100).toFixed(2);
};

const Corner = ({ className }) => <span className={`absolute h-2.5 w-2.5 border-signal-strong ${className}`} />;

// Like an object detector: a bracketed box locks onto whatever [data-say] element is hovered,
// glides between targets and labels them (mouse only)
const TargetLock = () => {
    const reduce = useReducedMotion();
    const [enabled, setEnabled] = useState(false);
    const [lock, setLock] = useState(null);
    const target = useRef(null);
    const releaseTimer = useRef(null);
    const visible = useRef(false);

    const spring = reduce ? { duration: 0 } : GLIDE;
    const x = useSpring(useMotionValue(0), spring);
    const y = useSpring(useMotionValue(0), spring);
    const w = useSpring(useMotionValue(0), spring);
    const h = useSpring(useMotionValue(0), spring);

    useEffect(() => {
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setEnabled(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;

        // Move the box onto the element; `snap` skips the glide (first lock-on, scrolling)
        const frame = (el, snap) => {
            const r = el.getBoundingClientRect();
            const pad = Math.min(r.width, r.height) < 24 ? 3 : 6;
            const next = [r.left - pad, r.top - pad, r.width + pad * 2, r.height + pad * 2];
            [x, y, w, h].forEach((v, i) => (snap ? v.jump(next[i]) : v.set(next[i])));
            setLock((prev) => {
                const text = el.getAttribute('data-say');
                const above = r.top - pad > LABEL_H + 6;
                const alignRight = r.left + 220 > window.innerWidth;
                if (prev && prev.text === text && prev.above === above && prev.alignRight === alignRight) return prev;
                return { text, score: confidence(text), above, alignRight };
            });
        };

        const acquire = (el) => {
            clearTimeout(releaseTimer.current);
            if (el === target.current) return;
            target.current = el;
            frame(el, !visible.current);
            visible.current = true;
        };

        const release = () => {
            if (!target.current) return;
            clearTimeout(releaseTimer.current);
            releaseTimer.current = setTimeout(() => {
                target.current = null;
                visible.current = false;
                setLock(null);
            }, RELEASE_DELAY);
        };

        const onMove = (e) => {
            const el = e.target instanceof Element ? e.target.closest('[data-say]') : null;
            if (el) acquire(el);
            else release();
        };
        // Keep the box glued to its target while content scrolls or resizes
        const onScroll = () => {
            const el = target.current;
            if (!el) return;
            if (!el.isConnected) release();
            else frame(el, true);
        };
        const onLeave = () => release();

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { capture: true, passive: true });
        window.addEventListener('resize', onScroll);
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('blur', onLeave);
        return () => {
            clearTimeout(releaseTimer.current);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', onScroll, { capture: true });
            window.removeEventListener('resize', onScroll);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('blur', onLeave);
        };
    }, [enabled, x, y, w, h]);

    if (!enabled) return null;

    return (
        <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60]" style={{ x, y, width: w, height: h }}>
            <AnimatePresence>
                {lock && (
                    <motion.div
                        key="lock"
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        <span className="absolute inset-0 rounded-[3px]" style={{ backgroundColor: 'color-mix(in srgb, var(--signal-strong) 5%, transparent)' }} />
                        <Corner className="left-0 top-0 rounded-tl-[3px] border-l-[1.5px] border-t-[1.5px]" />
                        <Corner className="right-0 top-0 rounded-tr-[3px] border-r-[1.5px] border-t-[1.5px]" />
                        <Corner className="bottom-0 left-0 rounded-bl-[3px] border-b-[1.5px] border-l-[1.5px]" />
                        <Corner className="bottom-0 right-0 rounded-br-[3px] border-b-[1.5px] border-r-[1.5px]" />

                        <motion.div
                            layout
                            transition={{ duration: 0.25, ease: EASE }}
                            className={`absolute flex items-center overflow-hidden rounded-[3px] bg-signal-strong font-mono text-[10.5px] font-medium text-signal-foreground shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] ${
                                lock.above ? 'bottom-full mb-1' : 'top-full mt-1'
                            } ${lock.alignRight ? 'right-0' : 'left-0'}`}
                            style={{ height: LABEL_H }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={lock.text}
                                    initial={{ opacity: 0, y: lock.above ? 8 : -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: lock.above ? -8 : 8 }}
                                    transition={{ duration: 0.2, ease: EASE }}
                                    className="flex items-center gap-1.5 whitespace-nowrap px-1.5"
                                >
                                    {lock.text}
                                    <span className="tabular-nums opacity-60">{lock.score}</span>
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TargetLock;
