import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowUpRight, Briefcase, Code2, Copy, Download, FolderGit2, Github, Hash, Linkedin, Mail, Moon, Search, Sparkles, Sun, Trophy,
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { profile, projects } from '../data/portfolio';

const EASE = [0.22, 1, 0.36, 1];

const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Briefly mark the section that was jumped to
    el.classList.remove('section-ping');
    void el.offsetWidth;
    el.classList.add('section-ping');
};

const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const CommandPalette = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [notice, setNotice] = useState(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

    const commands = useMemo(
        () => [
            { group: 'Jump to', label: 'Experience', icon: Briefcase, run: () => goTo('experience') },
            { group: 'Jump to', label: 'Achievements', icon: Trophy, run: () => goTo('achievements') },
            { group: 'Jump to', label: 'Featured work', icon: Sparkles, run: () => goTo('featured') },
            { group: 'Jump to', label: 'Projects', icon: FolderGit2, run: () => goTo('projects') },
            { group: 'Jump to', label: 'GitHub activity', icon: Github, run: () => goTo('github') },
            { group: 'Jump to', label: 'Tools & technologies', icon: Code2, run: () => goTo('tools') },
            ...projects.map((p) => ({
                group: 'Projects',
                label: p.title,
                hint: p.tech.join(' · '),
                icon: Hash,
                run: () => openUrl(p.link),
            })),
            {
                group: 'Actions',
                label: 'Copy email address',
                hint: profile.email,
                icon: Copy,
                keepOpen: true,
                run: async () => {
                    try {
                        await navigator.clipboard.writeText(profile.email);
                        setNotice('Email copied ✓');
                    } catch {
                        setNotice(profile.email);
                    }
                },
            },
            { group: 'Actions', label: isDarkMode ? 'Switch to light theme' : 'Switch to dark theme', icon: isDarkMode ? Sun : Moon, run: () => toggleTheme() },
            { group: 'Actions', label: 'Open resume', icon: Download, run: () => openUrl(profile.resume) },
            { group: 'Links', label: 'GitHub', hint: `@${profile.githubUser}`, icon: Github, run: () => openUrl(profile.github) },
            { group: 'Links', label: 'LinkedIn', icon: Linkedin, run: () => openUrl(profile.linkedin) },
            { group: 'Links', label: 'Send an email', icon: Mail, run: () => window.location.assign(`mailto:${profile.email}`) },
        ],
        [isDarkMode, toggleTheme]
    );

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return commands;
        return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q));
    }, [commands, query]);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const onKey = (e) => {
            const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName));
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        const onOpen = () => setOpen(true);
        window.addEventListener('keydown', onKey);
        window.addEventListener('open-command-palette', onOpen);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('open-command-palette', onOpen);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActive(0);
            setNotice(null);
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [open]);

    useEffect(() => setActive(0), [query]);

    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [active]);

    const run = async (cmd) => {
        if (!cmd) return;
        await cmd.run();
        if (!cmd.keepOpen) close();
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((i) => (i + 1) % Math.max(results.length, 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            run(results[active]);
        } else if (e.key === 'Escape') {
            close();
        }
    };

    let lastGroup = null;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    data-lenis-prevent
                >
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={close} />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl border bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE }}
                    >
                        <div className="flex items-center gap-2.5 border-b px-4">
                            <Search size={16} className="shrink-0 text-muted-foreground" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Type a command or search…"
                                aria-label="Search commands"
                                className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                            />
                            <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">esc</kbd>
                        </div>

                        <div ref={listRef} className="no-scrollbar max-h-[50vh] overflow-y-auto p-1.5" role="listbox">
                            {results.length === 0 && (
                                <p className="px-3 py-8 text-center font-mono text-xs text-muted-foreground">no detections for “{query}”</p>
                            )}
                            {results.map((cmd, i) => {
                                const header = cmd.group !== lastGroup ? cmd.group : null;
                                lastGroup = cmd.group;
                                const Icon = cmd.icon;
                                const selected = i === active;
                                return (
                                    <React.Fragment key={`${cmd.group}-${cmd.label}`}>
                                        {header && (
                                            <p className="px-2.5 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{header}</p>
                                        )}
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={selected}
                                            data-index={i}
                                            onMouseMove={() => setActive(i)}
                                            onClick={() => run(cmd)}
                                            className="relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-foreground"
                                        >
                                            {selected && (
                                                <motion.span
                                                    layoutId="palette-active"
                                                    className="absolute inset-0 rounded-lg bg-accent"
                                                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                                                />
                                            )}
                                            {selected && <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-signal-strong" />}
                                            <Icon size={15} className="relative shrink-0 text-muted-foreground" />
                                            <span className="relative flex-1 truncate">{cmd.label}</span>
                                            {cmd.hint && <span className="relative hidden truncate font-mono text-[11px] text-muted-foreground sm:block">{cmd.hint}</span>}
                                            {cmd.group === 'Links' || cmd.group === 'Projects' ? (
                                                <ArrowUpRight size={13} className="relative shrink-0 text-muted-foreground" />
                                            ) : null}
                                        </button>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t px-4 py-2 font-mono text-[10px] text-muted-foreground">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={notice ?? 'hints'}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className={notice ? 'text-signal' : ''}
                                >
                                    {notice ?? '↑↓ navigate · ↵ select'}
                                </motion.span>
                            </AnimatePresence>
                            <span>{isMac ? '⌘' : 'Ctrl'} K to toggle</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
