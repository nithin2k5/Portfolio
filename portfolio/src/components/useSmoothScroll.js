import { useEffect } from 'react';
import Lenis from 'lenis';

const OPTIONS = { autoRaf: true, lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true };

// Inertial wheel scrolling: one instance per column on desktop, the window on smaller screens
const useSmoothScroll = (columnRefs) => {
    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktop = window.matchMedia('(min-width: 1024px)');
        let instances = [];

        const setup = () => {
            instances.forEach((lenis) => lenis.destroy());
            instances = [];
            if (reduceMotion.matches) return;
            if (desktop.matches) {
                instances = columnRefs
                    .map((ref) => ref.current)
                    .filter(Boolean)
                    .map((el) => new Lenis({ ...OPTIONS, wrapper: el, content: el }));
            } else {
                instances = [new Lenis(OPTIONS)];
            }
        };

        setup();
        desktop.addEventListener('change', setup);
        reduceMotion.addEventListener('change', setup);
        return () => {
            desktop.removeEventListener('change', setup);
            reduceMotion.removeEventListener('change', setup);
            instances.forEach((lenis) => lenis.destroy());
        };
    }, [columnRefs]);
};

export default useSmoothScroll;
