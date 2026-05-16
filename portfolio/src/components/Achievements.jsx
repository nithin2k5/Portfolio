import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';

const awards = [
    {
        rank: '1st Place',
        icon: <Trophy size={20} className="text-amber-500/80" />,
        title: '24-Hour Hackathon',
        org: 'Research Conclave, Siddhartha Academy University',
        year: '2025',
    },
    {
        rank: '2nd Place',
        icon: <Award size={20} />,
        title: 'VR Siddhartha Webathon',
        org: 'Created an immersive web-based VR experience platform.',
        year: '2025',
    },
    {
        rank: '2nd Place',
        icon: <Award size={20} />,
        title: 'CodeForCause',
        org: 'Built a social impact platform connecting volunteers with local NGOs.',
        year: '2023',
    },
    {
        rank: 'Finalist',
        icon: <Star size={20} />,
        title: 'BITS Hackathon',
        org: 'National Level, BITS Pilani Hyderabad',
        year: '2024',
    },
];

const Achievements = () => {
    return (
        <section className="space-y-12 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                Awards &amp; Recognition
            </h3>

            <div className="flex flex-col">
                {awards.map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-start gap-6 py-5 border-b border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300"
                    >
                        {/* Icon Container */}
                        <div className="mt-1 shrink-0 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-300">
                            {item.icon}
                        </div>

                        {/* Left: rank + title + org */}
                        <div className="flex flex-col gap-1 flex-1 min-w-0 transform group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                                {item.rank}
                            </span>
                            <h4 className="font-bold text-[15px] tracking-wide text-zinc-900 dark:text-zinc-100 leading-snug">
                                {item.title}
                            </h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {item.org}
                            </p>
                        </div>

                        {/* Right: year */}
                        <span className="shrink-0 text-[11px] font-bold tracking-widest text-zinc-300 dark:text-zinc-700 uppercase group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors duration-300 pt-0.5">
                            {item.year}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
