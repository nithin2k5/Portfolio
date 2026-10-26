import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const OFFSET = 16;
const FOLLOW = { stiffness: 520, damping: 38, mass: 0.5 };
const LEAN = { stiffness: 300, damping: 24 };
const EASE = [0.22, 1, 0.36, 1];
// Brief grace period so the bubble doesn't blink while crossing gaps between elements
const HIDE_DELAY = 90;

const hintAt = (x, y) => {
    const el = document.elementFromPoint(x, y);
    return el?.closest('[data-say]')?.getAttribute('data-say') ?? null;
};

// Shows the nearest [data-say] hint in a bubble that trails the cursor (mouse only)
const CursorBubble = () => {
    const [enabled, setEnabled] = useState(false);
    const [text, setText] = useState(null);
    const [flip, setFlip] = useState({ x: false, y: false });
    const bubbleRef = useRef(null);
    const pointer = useRef({ x: -100, y: -100 });
    const hideTimer = useRef(null);
    const placeRef = useRef(() => {});

    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);
    const x = useSpring(rawX, FOLLOW);
    const y = useSpring(rawY, FOLLOW);
    // Lean into horizontal motion, like it's being dragged along
    const rotate = useSpring(useTransform(useVelocity(x), [-1500, 0, 1500], [-7, 0, 7], { clamp: true }), LEAN);

    useEffect(() => {
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setEnabled(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;

        const place = () => {
            const { x: px, y: py } = pointer.current;
            // Untransformed size, so the pop-in scale doesn't skew edge detection
            const w = bubbleRef.current?.offsetWidth ?? 160;
            const h = bubbleRef.current?.offsetHeight ?? 28;
            const fx = px + OFFSET + w > window.innerWidth - 8;
            const fy = py + OFFSET + h > window.innerHeight - 8;
            setFlip((f) => (f.x === fx && f.y === fy ? f : { x: fx, y: fy }));
            rawX.set(fx ? px - OFFSET - w : px + OFFSET);
            rawY.set(fy ? py - OFFSET - h : py + OFFSET);
        };

        placeRef.current = place;

        const show = (hint) => {
            clearTimeout(hideTimer.current);
            if (hint) setText(hint);
            else hideTimer.current = setTimeout(() => setText(null), HIDE_DELAY);
        };

        const onMove = (e) => {
            pointer.current = { x: e.clientX, y: e.clientY };
            const target = e.target instanceof Element ? e.target.closest('[data-say]') : null;
            show(target?.getAttribute('data-say') ?? null);
            place();
        };
        // Content slides under a still cursor while scrolling, so re-check what's beneath it
        const onScroll = () => show(hintAt(pointer.current.x, pointer.current.y));
        const onLeave = () => show(null);
        const onDown = () => setText(null);

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { capture: true, passive: true });
        window.addEventListener('pointerdown', onDown);
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('blur', onLeave);

        return () => {
            clearTimeout(hideTimer.current);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', onScroll, { capture: true });
            window.removeEventListener('pointerdown', onDown);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('blur', onLeave);
        };
    }, [enabled, rawX, rawY]);

    // Re-place when the bubble appears or its size changes with new text
    const visible = Boolean(text);
    useEffect(() => {
        const el = bubbleRef.current;
        if (!visible || !el) return undefined;
        const observer = new ResizeObserver(() => placeRef.current());
        observer.observe(el);
        return () => observer.disconnect();
    }, [visible]);

    if (!enabled) return null;

    // The corner nearest the cursor is pinched, like a speech bubble's tail
    const corner = `${flip.y ? 'b' : 't'}${flip.x ? 'r' : 'l'}`;
    const radius = { tl: 'rounded-tl-[4px]', tr: 'rounded-tr-[4px]', bl: 'rounded-bl-[4px]', br: 'rounded-br-[4px]' }[corner];
    const origin = `${flip.y ? 'bottom' : 'top'} ${flip.x ? 'right' : 'left'}`;

    return (
        <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60]" style={{ x, y }}>
            <AnimatePresence>
                {text && (
                    <motion.div
                        key="bubble"
                        ref={bubbleRef}
                        initial={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.6, filter: 'blur(4px)' }}
                        transition={{ type: 'spring', stiffness: 520, damping: 30, mass: 0.6 }}
                        style={{ rotate, transformOrigin: origin }}
                        className={`rounded-2xl ${radius} bg-foreground text-background shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.2)]`}
                    >
                        <motion.div layout transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={text}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2, ease: EASE }}
                                    className="block whitespace-nowrap px-3 py-1.5 text-[12px] font-medium leading-4 tracking-tight"
                                >
                                    {text}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CursorBubble;
