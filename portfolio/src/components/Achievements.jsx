import React from 'react';

const Achievements = () => {
    const awards = [
        {
            year: '2025',
            event: '24-Hour Hackathon',
            role: '1st Place',
            description: 'Research Conclave, Siddhartha Academy University'
        },
        {
            year: '2025',
            event: 'VR Siddhartha Webathon',
            role: '2nd Place',
            description: 'Created an immersive web-based VR experience platform.'
        },
        {
            year: '2023',
            event: 'CodeForCause Hackathon',
            role: '2nd Place',
            description: 'Built a social impact platform connecting volunteers with local NGOs.'
        },
        {
            year: '2024',
            event: 'BITS Hackathon',
            role: 'Finalist',
            description: 'National Level Hackathon at BITS Pilani Hyderabad.'
        }
    ];

    return (
        <section className="space-y-12 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Awards & Recognition</h3>

            <div className="space-y-16">
                {awards.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <div className="sm:w-1/4 shrink-0 pt-1">
                            <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{item.year}</span>
                        </div>
                        <div className="sm:w-3/4 flex flex-col gap-3">
                            <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight">
                                {item.role} <span className="text-zinc-400 dark:text-zinc-500 font-normal px-2">&mdash;</span> {item.event}
                            </h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
