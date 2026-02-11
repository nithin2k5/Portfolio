import React from 'react';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-xl font-bold dark:text-white text-zinc-900">Nithin Kumar K</h1>
                <p className="text-muted">Full-Stack Developer</p>
                <p className="text-muted">Andhra Pradesh, India</p>
            </div>

            <div className="space-y-4 max-w-2xl">
                <p className="text-xl font-medium text-zinc-600 dark:text-zinc-300">
                    Pre-Final Year CSE Student at <span className="text-zinc-900 dark:text-white font-semibold">KL University</span>
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                    Passionate about engineering robust solutions across the entire stack. I specialize in building scalable
                    <span className="text-zinc-900 dark:text-zinc-200 font-medium"> Web, Mobile, and Desktop Applications</span>,
                    while actively exploring the frontiers of <span className="text-zinc-900 dark:text-zinc-200 font-medium">Computer Vision</span>.
                    I strive to bridge the gap between complex problems and elegant, user-centric software.
                </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex gap-4">
                    <a
                        href="/2300031401_nithin.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
                    >
                        Resume
                    </a>
                    <a
                        href="/2300031401_nithin.pdf"
                        download="Nithin_Kumar_Resume.pdf"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all"
                        title="Download Resume"
                    >
                        <FaDownload size={14} />
                    </a>
                </div>
                <div className="flex gap-4">
                    <a href="mailto:ntbm8125@gmail.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all">
                        @
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all">
                        <FaLinkedin size={18} />
                    </a>
                    <a href="https://github.com/nithin2k5" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all">
                        <FaGithub size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
