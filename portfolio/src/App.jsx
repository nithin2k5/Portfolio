import React, { useEffect } from 'react';
import { useTheme } from './components/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

const App = () => {
    // Add active section tracking for the sidebar navigation
    const [activeSection, setActiveSection] = React.useState('');
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const navItems = [
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Tech Stack', href: '#tech' },
        { name: 'Awards', href: '#awards' },
    ];

    return (
        <div className="bg-white dark:bg-zinc-900 min-h-screen font-sans text-zinc-900 dark:text-white selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white backdrop-blur-sm shadow-sm hover:scale-110 transition-transform duration-300"
                aria-label="Toggle Theme"
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 flex flex-col lg:flex-row gap-12 lg:gap-16">

                {/* Left Sidebar (Sticky on LG) */}
                <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[280px] shrink-0 lg:flex-col lg:justify-between lg:py-24 z-10">
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-[42px] font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
                            Nithin<br />Kumar K
                        </h1>
                        <p className="text-sm md:text-[15px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-xs">
                            Full-Stack Developer passionate about engineering robust solutions across Web, Mobile, Desktop, and Computer Vision.
                        </p>

                        <nav className="hidden lg:block pt-12 space-y-4">
                            <ul className="space-y-4">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={`group flex items-center gap-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeSection === item.href.slice(1)
                                                ? 'text-zinc-900 dark:text-white'
                                                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                                }`}
                                        >
                                            <span className={`h-px transition-all duration-300 ${activeSection === item.href.slice(1)
                                                ? 'w-16 bg-zinc-900 dark:bg-white'
                                                : 'w-8 bg-zinc-300 dark:bg-zinc-700 group-hover:w-16 group-hover:bg-zinc-900 dark:group-hover:bg-white'
                                                }`}></span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="mt-12 lg:mt-auto space-y-8">
                        <div className="flex items-center gap-5 text-[11px] font-bold tracking-widest text-zinc-900 dark:text-white uppercase">
                            <a href="https://github.com/nithin2k5" target="_blank" rel="noreferrer" className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">Github</a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">LinkedIn</a>
                            <a href="mailto:ntbm8125@gmail.com" className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">Email</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <a
                                href="/2300031401_nithin.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex justify-center px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs font-bold tracking-widest uppercase hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm text-center"
                            >
                                Resume
                            </a>
                            <a
                                href="mailto:ntbm8125@gmail.com?subject=Available%20for%20Hire"
                                className="inline-flex justify-center px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold tracking-widest uppercase hover:opacity-80 transition-opacity shadow-sm text-center border border-zinc-900 dark:border-white"
                            >
                                Available for Hire
                            </a>
                        </div>
                    </div>
                </header>

                {/* Right Main Content (Scrollable) */}
                <main className="pt-12 lg:pt-24 lg:flex-1 lg:pb-24 space-y-32">
                    <section id="experience" className="scroll-mt-16 lg:scroll-mt-24">
                        <Experience />
                    </section>

                    <section id="projects" className="scroll-mt-16 lg:scroll-mt-24">
                        <Projects />
                    </section>

                    <section id="tech" className="scroll-mt-16 lg:scroll-mt-24">
                        <TechStack />
                    </section>

                    <section id="awards" className="scroll-mt-16 lg:scroll-mt-24">
                        <Achievements />
                    </section>

                    <Footer />
                </main>

            </div>
        </div>
    );
};

export default App;
