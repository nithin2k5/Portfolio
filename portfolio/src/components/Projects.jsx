import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
    // Limited to top 3 projects as requested
    const projects = [
        {
            title: 'Sahaay',
            category: 'Healthcare · Expo',
            description: 'A React Native/Expo application for healthcare assistance.',
            tech: 'React Native • Expo',
            link: 'https://github.com/dinexh/Sahaay-expo.git'
        },
        {
            title: 'swasthya',
            category: 'Healthcare · App',
            description: 'A mobile application focused on health and wellness tracking.',
            tech: 'React Native • TypeScript',
            link: 'https://github.com/nithin2k5/swasthya-app.git'
        },
        {
            title: 'DataG',
            category: 'Data · Generator',
            description: 'YOLO data generator tool for computer vision datasets.',
            tech: 'Python • YOLO',
            link: 'https://github.com/nithin2k5/yoloGenerator.git'
        }
    ];

    return (
        <section className="space-y-8">
            <h3 className="font-bold text-xl dark:text-white text-zinc-900">Projects</h3>

            <div className="flex flex-col">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group py-8 border-b border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 transition-opacity duration-300 hover:opacity-70"
                    >
                        <div className="flex flex-col gap-2 max-w-lg">
                            <div className="flex items-baseline gap-3">
                                <h4 className="font-bold text-xl tracking-tight dark:text-white text-zinc-900">
                                    {project.title}
                                </h4>
                                <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48 shrink-0 mt-2 sm:mt-0">
                            <span className="text-zinc-500 dark:text-zinc-600 text-xs font-medium text-right hidden sm:block">
                                {project.tech}
                            </span>
                            <ArrowUpRight size={18} className="text-zinc-900 dark:text-white transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;
