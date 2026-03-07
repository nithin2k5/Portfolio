import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: 'Sahaay',
            description: 'A React Native/Expo application for healthcare assistance, featuring guided flows and accessibility tools.',
            tech: ['REACT NATIVE', 'EXPO', 'NODE'],
            link: 'https://github.com/dinexh/Sahaay-expo.git'
        },
        {
            title: 'swasthya',
            description: 'A mobile application focused on health and wellness tracking, with custom data visualization.',
            tech: ['REACT NATIVE', 'TYPESCRIPT', 'API'],
            link: 'https://github.com/nithin2k5/swasthya-app.git'
        },
        {
            title: 'DataG',
            description: 'YOLO data generator tool for computer vision datasets. Streamlines annotation and augmentations.',
            tech: ['PYTHON', 'YOLO', 'OPENCV'],
            link: 'https://github.com/nithin2k5/yoloGenerator.git'
        }
    ];

    return (
        <section className="space-y-12 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Projects</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col gap-4"
                    >
                        <h4 className="font-bold text-[15px] tracking-wider text-zinc-900 dark:text-zinc-100 uppercase group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                            {project.title}
                        </h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[60px]">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 mt-auto">
                            {project.tech.map((t, idx) => (
                                <span key={idx} className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;
