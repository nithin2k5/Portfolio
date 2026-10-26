import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal, { EASE, SectionTitle } from './Reveal';
import { experience } from '../data/portfolio';

const Experience = () => {
    const [open, setOpen] = useState(0);

    return (
        <Reveal as="section" className="mx-auto w-full max-w-2xl px-5 pb-8 pt-3 lg:max-w-none lg:px-8 lg:pt-6">
            <SectionTitle index="01" className="mb-6">Experience</SectionTitle>
            <ol>
                {experience.map((exp, index) => {
                    const isOpen = open === index;
                    const isLast = index === experience.length - 1;
                    return (
                        <li key={exp.company} className={`relative pl-6 ${isLast ? '' : 'border-l pb-8'}`}>
                            <span
                                className="absolute -left-[6.5px] top-1 h-3 w-3 rounded-full border-2 border-background bg-foreground"
                                aria-hidden="true"
                            />
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? -1 : index)}
                                aria-expanded={isOpen}
                                className="group w-full text-left"
                            >
                                <span className="text-xs font-medium text-muted-foreground">{exp.period}</span>
                                <span className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                    <span className="font-semibold text-foreground">
                                        {exp.company}
                                    </span>
                                    <span className="text-sm italic text-muted-foreground">{exp.role}</span>
                                    <ChevronDown
                                        size={14}
                                        className={`self-center text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:text-foreground ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </span>
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.p
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                        className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                                    >
                                        <span className="block pt-2">{exp.description}</span>
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                })}
            </ol>
        </Reveal>
    );
};

export default Experience;
