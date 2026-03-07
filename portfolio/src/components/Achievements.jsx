import React from 'react';

const Achievements = () => {
    const awards = [
        {
            title: '1st Place &mdash; 24-Hour Hackathon',
            subtitle: 'Research Conclave, Siddhartha Academy University',
            year: '2025',
        },
        {
            title: '2nd Place &mdash; VR Siddhartha Webathon',
            subtitle: 'Created an immersive web-based VR experience platform.',
            year: '2025',
        },
        {
            title: '2nd Place &mdash; CodeForCause',
            subtitle: 'Built a social impact platform connecting volunteers with local NGOs.',
            year: '2023',
        },
        {
            title: 'Finalist &mdash; BITS Hackathon',
            subtitle: 'National Level, BITS Pilani Hyderabad',
            year: '2024',
        }
    ];

    return (
        <section className="space-y-12 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Awards & Recognition</h3>

            <div className="flex flex-col gap-8">
                {awards.map((item, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 py-4 border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors duration-300"
                    >
                        {/* Decorative subtle dot */}
                        <div className="absolute left-[-16px] top-[26px] h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"></div>

                        <div className="flex flex-col gap-1.5 max-w-2xl transform group-hover:translate-x-2 transition-transform duration-300">
                            <h4
                                className="font-bold text-[15px] tracking-wide text-zinc-900 dark:text-zinc-100"
                                dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {item.subtitle}
                            </p>
                        </div>
                        <div className="shrink-0 sm:pt-0 pt-1">
                            <span className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-600 uppercase group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors duration-300">
                                {item.year}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
