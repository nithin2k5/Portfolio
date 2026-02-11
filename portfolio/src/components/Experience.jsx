import React from 'react';

const Experience = () => {
    const experiences = [
        {
            date: 'July,2025',
            company: 'Infac India Pvt Ltd',
            role: 'Computer Vision Engineer',
            description: 'Built a safety system using MediaPipe and OpenCV for hydraulic press operations.'
        },

    ];

    return (
        <section className="space-y-8">
            <h3 className="font-bold text-xl dark:text-white text-zinc-900">Experience</h3>

            <div className="relative pl-2 border-l border-zinc-200 dark:border-zinc-800 space-y-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-6">
                        {/* Dot */}
                        <div className="absolute -left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-zinc-900 dark:bg-white border-2 border-white dark:border-black shadow-[0_0_0_4px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.05)]"></div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-1">{exp.period}</span>
                            <h4 className="font-bold text-lg dark:text-white text-zinc-900 leading-none">{exp.role}</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm">{exp.company}</p>
                            <p className="text-zinc-600 dark:text-zinc-500 text-sm mt-2 leading-relaxed">
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
