import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, Award, Star, ChevronDown } from 'lucide-react';
import Reveal, { EASE, SectionTitle } from './Reveal';
import { awards } from '../data/portfolio';

const icons = { trophy: Trophy, award: Award, star: Star };
const INITIAL = 3;

const AwardItem = ({ item }) => {
    const Icon = icons[item.icon];
    return (
        <li className="group flex gap-3.5">
            <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted text-foreground transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-110"
                aria-hidden="true"
            >
                <Icon size={16} />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                    {item.rank} · {item.year}
                </p>
                <p className="mt-0.5 font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.org}</p>
            </div>
        </li>
    );
};

const Achievements = () => {
    const [showAll, setShowAll] = useState(false);
    const rest = awards.slice(INITIAL);

    return (
        <Reveal as="section" id="achievements" className="scroll-mt-6 mx-auto w-full max-w-2xl px-5 pb-8 pt-3 lg:max-w-none lg:px-8 lg:pt-6">
            <SectionTitle index="02" count={awards.length} className="mb-6">Achievements</SectionTitle>
            <ul className="space-y-6">
                {awards.slice(0, INITIAL).map((item) => (
                    <AwardItem key={item.title} item={item} />
                ))}
            </ul>
            <AnimatePresence initial={false}>
                {showAll && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <ul className="space-y-6 pt-6">
                            {rest.map((item) => (
                                <AwardItem key={item.title} item={item} />
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            {rest.length > 0 && (
                <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="mt-5 inline-flex items-center gap-1 pl-[50px] text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                    {showAll ? 'Show less' : `See all (${awards.length})`}
                    <ChevronDown size={14} className={`transition-transform duration-300 ease-out-expo ${showAll ? 'rotate-180' : ''}`} />
                </button>
            )}
        </Reveal>
    );
};

export default Achievements;
