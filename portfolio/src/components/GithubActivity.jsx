import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { EASE, SectionTitle } from './Reveal';
import CountUp from './CountUp';
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

const describe = (day) =>
    `${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} · ${formatDay(day.date)}`;

const Dot = ({ day, delay }) => {
    if (!day) return <span style={{ width: CELL, height: CELL }} />;
    const size = SIZES[day.level];
    return (
        <span
            className="group/dot flex items-center justify-center"
            style={{ width: CELL, height: CELL }}
            data-say={describe(day)}
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
    const scrollRef = useRef(null);
    const drag = useRef(null);
    const glide = useRef(null);

    useEffect(() => () => cancelAnimationFrame(glide.current), []);

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

    // Drag horizontally to scroll through the year, gliding to a stop on release
    const onPointerDown = (e) => {
        if (e.pointerType !== 'mouse') return;
        cancelAnimationFrame(glide.current);
        drag.current = { x: e.clientX, left: scrollRef.current.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0 };
    };
    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d) return;
        const now = performance.now();
        d.v = (e.clientX - d.lastX) / Math.max(now - d.lastT, 1);
        d.lastX = e.clientX;
        d.lastT = now;
        scrollRef.current.scrollLeft = d.left - (e.clientX - d.x);
    };
    const endDrag = () => {
        const d = drag.current;
        drag.current = null;
        if (!d || Math.abs(d.v) < 0.05) return;
        let v = d.v * 16;
        const step = () => {
            scrollRef.current.scrollLeft -= v;
            v *= 0.92;
            if (Math.abs(v) > 0.3) glide.current = requestAnimationFrame(step);
        };
        glide.current = requestAnimationFrame(step);
    };

    return (
        <Reveal as="section" id="github" className="scroll-mt-6 mx-auto w-full max-w-2xl px-5 py-8 lg:max-w-none lg:px-6 lg:pt-20">
            <div className="mb-4 flex items-center justify-between gap-2">
                <SectionTitle index="05">GitHub</SectionTitle>
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

            <div className="relative">
                <div
                    ref={scrollRef}
                    dir="rtl"
                    data-say="Drag me ↔"
                    className="no-scrollbar cursor-grab select-none overflow-x-auto pb-1 active:cursor-grabbing"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
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
                                          <Dot key={day?.date ?? `pad-${j}`} day={day} delay={i * 9 + j * 25} />
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
