import React from 'react';

const Experience = () => {
    const experiences = [
        {
            period: '2025—PRESENT',
            company: 'Infac India Pvt Ltd',
            role: 'Computer Vision Engineer',
            description: 'Built a safety system using MediaPipe and OpenCV for hydraulic press operations. Focus on real-time video processing and bounding box implementation.'
        },
    ];

    return (
        <section className="space-y-12 pt-8">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Selected Experience</h3>

            <div className="space-y-16">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <div className="sm:w-1/4 shrink-0 pt-1">
                            <span className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{exp.period}</span>
                        </div>
                        <div className="sm:w-3/4 flex flex-col gap-3">
                            <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight">
                                {exp.role} <span className="text-zinc-400 dark:text-zinc-500 font-normal px-2">&mdash;</span> {exp.company}
                            </h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
