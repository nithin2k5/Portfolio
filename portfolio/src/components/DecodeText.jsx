import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '01<>/\\[]{}=+*#_-';
const HOLD_MS = 3200;
const DECODE_MS = 650;

// Cycles through `words`, scrambling glyphs that resolve left to right into each new word
const DecodeText = ({ words, className = '' }) => {
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [shown, setShown] = useState(words[0]);
    const frame = useRef(null);

    useEffect(() => {
        const id = setTimeout(() => setIndex((i) => (i + 1) % words.length), HOLD_MS);
        return () => clearTimeout(id);
    }, [index, words.length]);

    useEffect(() => {
        const target = words[index];
        if (reduce) {
            setShown(target);
            return undefined;
        }
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / DECODE_MS, 1);
            const settled = Math.floor(progress * target.length);
            let out = target.slice(0, settled);
            for (let i = settled; i < target.length; i++) {
                out += target[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            setShown(out);
            if (progress < 1) frame.current = requestAnimationFrame(step);
        };
        frame.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame.current);
    }, [index, words, reduce]);

    return (
        <span className={className} aria-label={words.join(', ')}>
            <span aria-hidden="true">{shown}</span>
        </span>
    );
};

export default DecodeText;
