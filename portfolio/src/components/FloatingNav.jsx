import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Award, Code } from 'lucide-react';

const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'tech', icon: Code, label: 'Stack' },
    { id: 'projects', icon: Briefcase, label: 'Work' },
    { id: 'hackathons', icon: Award, label: 'Awards' },
    { id: 'experience', icon: User, label: 'Exp' }
];

const FloatingNav = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show nav after scrolling down 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Update active section
            const sections = navItems.map(item => document.getElementById(item.id));

            const scrollPosition = window.scrollY + window.innerHeight / 3;

            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
            <nav className="flex items-center gap-1 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/50">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive
                                ? 'text-white bg-black dark:text-black dark:bg-white shadow-lg'
                                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                                }`}
                        >
                            <item.icon size={16} className={isActive ? 'text-white dark:text-black' : ''} />
                            {isActive && (
                                <span className="animate-in fade-in slide-in-from-right-2 duration-300">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default FloatingNav;
