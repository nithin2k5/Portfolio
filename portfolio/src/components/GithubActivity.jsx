import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion';
import Reveal, { EASE, SectionTitle } from './Reveal';
import { profile } from '../data/portfolio';

const CELL = 14;
const FIRST_YEAR = 2025;
const SIZES = [3, 4, 5, 6, 7];
const OPACITY = [1, 0.45, 0.65, 0.85, 1];
const EMPTY = 'color-mix(in srgb, var(--muted-foreground) 35%, transparent)';

const cache = new Map();

const fetchContributions = async (year) => {
    if (cache.has(year)) return cache.get(year);
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubUser}?y=${year}`);
    if (!res.ok) throw new Error(`GitHub contributions request failed (${res.status})`);
    const data = await res.json();
    cache.set(year, data);
    return data;
};

// Group days into Sunday-first week columns, padding the first week
const toWeeks = (days) => {
    const weeks = [];
    let week = new Array(new Date(days[0].date).getUTCDay()).fill(null);
    days.forEach((day) => {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    });
    if (week.length) weeks.push(week);
    return weeks;
};

const formatDay = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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

const Dot = ({ day, delay, onHover }) => {
    if (!day) return <span style={{ width: CELL, height: CELL }} />;
    const size = SIZES[day.level];
    return (
        <span
            className="group/dot flex items-center justify-center"
            style={{ width: CELL, height: CELL }}
            onMouseEnter={(e) => onHover(day, e.currentTarget)}
        >
            <span
                className="rounded-full transition-transform duration-150 group-hover/dot:scale-150"
                style={{
                    width: size,
                    height: size,
                    opacity: OPACITY[day.level],
                    animation: 'dot-in 0.5s var(--ease-out-expo) both',
                    animationDelay: `${delay}ms`,
                    backgroundColor: day.level === 0 ? EMPTY : 'var(--foreground)',
                }}
            />
        </span>
    );
};

const GithubActivity = () => {
    const currentYear = new Date().getFullYear();
    const years = useMemo(() => {
        const list = ['last'];
        for (let y = currentYear; y >= FIRST_YEAR; y--) list.push(y);
        return list;
    }, [currentYear]);

    const [year, setYear] = useState('last');
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [tip, setTip] = useState(null);
    const scrollRef = useRef(null);
    const wrapRef = useRef(null);
    const drag = useRef(null);

    useEffect(() => {
        let cancelled = false;
        setError(false);
        if (!cache.has(year)) setData(null);
        fetchContributions(year)
            .then((d) => !cancelled && setData(d))
            .catch(() => !cancelled && setError(true));
        return () => {
            cancelled = true;
        };
    }, [year]);

    const weeks = useMemo(() => (data?.contributions?.length ? toWeeks(data.contributions) : []), [data]);
    const total = data?.total?.[year === 'last' ? 'lastYear' : year] ?? 0;

    const onHover = (day, el) => {
        if (drag.current?.moved) return;
        const box = el.getBoundingClientRect();
        const wrap = wrapRef.current.getBoundingClientRect();
        setTip({ day, x: box.left - wrap.left + CELL / 2, y: box.top - wrap.top });
    };

    // Drag horizontally to scroll through the year
    const onPointerDown = (e) => {
        if (e.pointerType !== 'mouse') return;
        drag.current = { x: e.clientX, left: scrollRef.current.scrollLeft, moved: false };
    };
    const onPointerMove = (e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        if (Math.abs(dx) > 3) {
            drag.current.moved = true;
            setTip(null);
        }
        scrollRef.current.scrollLeft = drag.current.left - dx;
    };
    const endDrag = () => {
        drag.current = null;
    };

    return (
        <Reveal as="section" className="mx-auto w-full max-w-2xl px-5 py-8 lg:max-w-none lg:px-6 lg:pt-20">
            <div className="mb-4 flex items-center justify-between gap-2">
                <SectionTitle>GitHub</SectionTitle>
                <div className="flex gap-1">
                    {years.map((y) => (
                        <button
                            key={y}
                            type="button"
                            onClick={() => setYear(y)}
                            aria-pressed={year === y}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium tabular-nums transition-colors ${
                                year === y ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            }`}
                        >
                            {y === 'last' ? 'Last 12m' : y}
                        </button>
                    ))}
                </div>
            </div>

            <div ref={wrapRef} className="relative" onMouseLeave={() => setTip(null)}>
                <div
                    ref={scrollRef}
                    dir="rtl"
                    data-say="Drag me ↔ or hover a dot"
                    className="no-scrollbar cursor-grab select-none overflow-x-auto pb-1 active:cursor-grabbing"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                    onScroll={() => setTip(null)}
                >
                    <motion.div
                        key={weeks.length ? `${year}` : 'loading'}
                        dir="ltr"
                        className="flex w-max gap-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                    >
                        {weeks.length
                            ? weeks.map((week, i) => (
                                  <div key={i} className="flex flex-col gap-[2px]">
                                      {week.map((day, j) => (
                                          <Dot key={day?.date ?? `pad-${j}`} day={day} delay={i * 9 + j * 25} onHover={onHover} />
                                      ))}
                                  </div>
                              ))
                            : Array.from({ length: 53 }, (_, i) => (
                                  <div key={i} className="flex flex-col gap-[2px]">
                                      {Array.from({ length: 7 }, (__, j) => (
                                          <span key={j} className="flex items-center justify-center" style={{ width: CELL, height: CELL }}>
                                              <span className="h-[3px] w-[3px] animate-pulse rounded-full" style={{ backgroundColor: EMPTY }} />
                                          </span>
                                      ))}
                                  </div>
                              ))}
                    </motion.div>
                </div>

                <AnimatePresence>
                    {tip && (
                        <motion.div
                            key={tip.day.date}
                            role="tooltip"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-md"
                            style={{ left: tip.x, top: tip.y - 6 }}
                        >
                            {tip.day.count === 0 ? 'No' : tip.day.count} contribution{tip.day.count === 1 ? '' : 's'} on {formatDay(tip.day.date)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>
                    {error ? (
                        'Could not load contributions right now.'
                    ) : (
                        <>
                            <span className="font-semibold tabular-nums text-foreground">{data ? <CountUp value={total} /> : '—'}</span>{' '}
                            contributions {year === 'last' ? 'in the last year' : `in ${year}`}
                        </>
                    )}
                </p>
                <div className="flex items-center gap-1" aria-hidden="true">
                    <span>Less</span>
                    {SIZES.map((size, level) => (
                        <span key={level} className="flex h-3 w-3 items-center justify-center">
                            <span
                                className="rounded-full"
                                style={{
                                    width: size,
                                    height: size,
                                    opacity: OPACITY[level],
                                    backgroundColor: level === 0 ? EMPTY : 'var(--foreground)',
                                }}
                            />
                        </span>
                    ))}
                    <span>More</span>
                </div>
            </div>
        </Reveal>
    );
};

export default GithubActivity;
