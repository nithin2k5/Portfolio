import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import Reveal, { EASE, SectionTitle } from './Reveal';
import { projects } from '../data/portfolio';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

const FilterMenu = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                data-say="Filter by category"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
                {value}
                <ChevronDown size={12} className={`transition-transform duration-300 ease-out-expo ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className="absolute right-0 top-full z-30 mt-1.5 min-w-[160px] origin-top-right rounded-xl border bg-background p-1 shadow-lg"
                    >
                        {categories.map((c) => (
                            <li key={c} role="option" aria-selected={c === value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(c);
                                        setOpen(false);
                                    }}
                                    className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-left text-xs text-foreground transition-colors hover:bg-accent"
                                >
                                    {c}
                                    {c === value && <Check size={12} />}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProjectRow = ({ project }) => (
    <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        data-say={`Open ${project.title} →`}
        className="group flex w-full items-start gap-3 rounded-xl px-5 py-3 text-left transition-colors hover:bg-accent"
    >
        <span
            className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/5 text-base font-bold text-white grayscale transition duration-300 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
            style={{ backgroundColor: project.color }}
        >
            {project.title[0]}
        </span>
        <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
                <span className="truncate text-[15px] font-semibold text-foreground">{project.title}</span>
                <ArrowUpRight
                    size={14}
                    className="shrink-0 text-muted-foreground transition duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
            </span>
            <span className="mt-1 flex flex-wrap gap-1">
                {project.tech.map((t) => (
                    <span key={t} className="rounded-full border px-2 py-0.5 text-[10px] leading-4 text-muted-foreground">
                        {t}
                    </span>
                ))}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-muted-foreground">{project.description}</span>
        </span>
    </a>
);

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

    return (
        <Reveal as="section" id="projects" className="mx-auto w-full max-w-2xl scroll-mt-6 py-8 lg:max-w-none lg:px-5 lg:pt-10">
            <div className="mb-2 flex items-center justify-between gap-2 px-5">
                <SectionTitle count={visible.length}>Projects</SectionTitle>
                <FilterMenu value={filter} onChange={setFilter} />
            </div>
            <motion.div layout className="flex flex-col lg:gap-1">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            <ProjectRow project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <a
                href="https://github.com/nithin2k5?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 px-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
                More on GitHub
                <ArrowUpRight size={14} />
            </a>
        </Reveal>
    );
};

export default Projects;
