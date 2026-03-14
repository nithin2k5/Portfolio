import React from 'react';

const Experience = () => {
    const experiences = [
        {
            period: 'MAY 2025—JUNE 2025',
            company: 'Infac India Pvt Ltd',
            role: 'Computer Vision Engineer',
            description: 'Built a safety system using MediaPipe and OpenCV for hydraulic press operations. Focus on real-time video processing and bounding box implementation.'
        },
        {
            period: '29 JAN 2026—PRESENT',
            company: 'myCrux.',
            role: 'Fullstack Developer',
            description: 'Contributing to the end-to-end development of a comprehensive fashion e-commerce platform. Responsibilities include designing responsive web interfaces, building cross-platform mobile application features, and implementing robust backend services to ensure a seamless shopping experience.'
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
