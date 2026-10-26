import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { EASE } from './Reveal';

// Counts up to the new total whenever it changes
const CountUp = ({ value }) => {
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(0);
    const shownRef = useRef(0);

    useEffect(() => {
        if (reduce) {
            setShown(value);
            return undefined;
        }
        const controls = animate(shownRef.current, value, {
            duration: 1.2,
            ease: EASE,
            onUpdate: (v) => {
                shownRef.current = v;
                setShown(Math.round(v));
            },
        });
        return () => controls.stop();
    }, [value, reduce]);

    return shown.toLocaleString();
};

export default CountUp;
