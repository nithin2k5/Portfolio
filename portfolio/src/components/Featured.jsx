import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import Reveal, { SectionTitle } from './Reveal';
import ProjectVisual from './ProjectVisual';
import { projects } from '../data/portfolio';

const AUTOPLAY_MS = 6000;

const Slide = ({ project, index, onLinkClick }) => (
    <div className="min-w-0 flex-[0_0_100%] pl-4" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}`}>
        <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            draggable="false"
            onClick={onLinkClick}
            data-say={`Open ${project.title} on GitHub ↗`}
            className="group grid h-full overflow-hidden rounded-2xl border bg-background/60 backdrop-blur-sm transition-colors hover:bg-accent sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
        >
            <div className="relative h-60 overflow-hidden bg-muted sm:h-auto sm:min-h-[280px]">
                <ProjectVisual project={project} />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                    <Github size={12} />
                    {project.category}
                </span>
            </div>
            <div className="flex flex-col p-5">
                <div className="flex items-center gap-3">
                    <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[22%] border border-black/5 text-lg font-bold text-white"
                        style={{ backgroundColor: project.color }}
                    >
                        {project.title[0]}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold tracking-tight text-foreground">{project.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{project.tags.join(' · ')}</p>
                    </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2">
                    {project.stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="truncate text-xl font-bold tracking-tight text-foreground">{stat.value}</dd>
                            <dd className="line-clamp-2 text-[11px] leading-tight text-muted-foreground">{stat.label}</dd>
                        </div>
                    ))}
                </dl>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-foreground">
                    View on GitHub
                    <ArrowRight size={14} className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </span>
            </div>
        </a>
    </div>
);

const Featured = () => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [width, setWidth] = useState(0);
    const [dragX, setDragX] = useState(null);
    const trackRef = useRef(null);
    const drag = useRef(null);
    const dragged = useRef(false);
    const reduce = useReducedMotion();
    const count = projects.length;

    const go = useCallback((delta) => setIndex((i) => (i + delta + count) % count), [count]);

    // Each slide spans the full track, so one step is the track's own width
    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => setWidth(entry.target.offsetWidth));
        observer.observe(trackRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (paused || reduce || dragX !== null) return undefined;
        const id = setTimeout(() => go(1), AUTOPLAY_MS);
        return () => clearTimeout(id);
    }, [index, paused, reduce, dragX, go]);

    const onPointerDown = (e) => {
        if (e.button !== 0) return;
        drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), axis: null };
        dragged.current = false;
    };

    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (!d.axis && Math.hypot(dx, dy) > 6) {
            d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
            if (d.axis === 'x') e.currentTarget.setPointerCapture(e.pointerId);
        }
        if (d.axis !== 'x') return;
        dragged.current = true;
        // Resist past the first and last slides
        const atEdge = (index === 0 && dx > 0) || (index === count - 1 && dx < 0);
        setDragX(atEdge ? dx * 0.25 : dx);
    };

    const onPointerUp = (e) => {
        const d = drag.current;
        drag.current = null;
        if (!d || d.axis !== 'x') return;
        const dx = e.clientX - d.x;
        const velocity = dx / Math.max(performance.now() - d.t, 1);
        if ((dx < -width / 5 || velocity < -0.5) && index < count - 1) go(1);
        else if ((dx > width / 5 || velocity > 0.5) && index > 0) go(-1);
        setDragX(null);
    };

    // Swallow the click that ends a drag so it doesn't open the link
    const onLinkClick = (e) => {
        if (dragged.current) e.preventDefault();
    };

    const navButton =
        'inline-flex h-7 w-7 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95';

    return (
        <Reveal as="section" className="px-5 pt-8 lg:pt-20">
            <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                aria-roledescription="carousel"
            >
                <div className="mb-3 flex items-center justify-between gap-2">
                    <SectionTitle>
                        Featured
                        <span className="ml-2 font-normal normal-case tabular-nums tracking-normal">
                            {index + 1}/{count}
                        </span>
                    </SectionTitle>
                    <div className="flex items-center gap-1.5">
                        <button type="button" aria-label="Previous featured slide" data-say="← Previous" onClick={() => go(-1)} className={navButton}>
                            <ChevronLeft size={14} />
                        </button>
                        <button type="button" aria-label="Next featured slide" data-say="Next →" onClick={() => go(1)} className={navButton}>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="-ml-4 flex cursor-grab touch-pan-y select-none active:cursor-grabbing"
                        style={{
                            transform: `translate3d(${-index * width + (dragX ?? 0)}px, 0, 0)`,
                            transition: dragX !== null || reduce ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                    >
                        {projects.map((project, i) => (
                            <Slide key={project.title} project={project} index={i} onLinkClick={onLinkClick} />
                        ))}
                    </div>
                </div>

                <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Featured slides">
                    {projects.map((project, i) => (
                        <button
                            key={project.title}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`Show ${project.title}`}
                            onClick={() => setIndex(i)}
                            className="group relative h-1.5 overflow-hidden rounded-full bg-border transition-[width] duration-500 ease-out-expo"
                            style={{ width: i === index ? 24 : 6 }}
                        >
                            {i === index && !paused && !reduce && (
                                <motion.span
                                    key={`progress-${index}`}
                                    className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                                />
                            )}
                            {i === index && (paused || reduce) && <span className="absolute inset-0 rounded-full bg-foreground" />}
                        </button>
                    ))}
                </div>
            </div>
        </Reveal>
    );
};

export default Featured;
