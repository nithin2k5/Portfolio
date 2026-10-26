import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './components/ThemeContext';
import Background from './components/Background';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Availability from './components/Availability';
import Featured from './components/Featured';
import Projects from './components/Projects';
import GithubActivity from './components/GithubActivity';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import CursorBubble from './components/CursorBubble';

const column = 'relative no-scrollbar lg:h-screen lg:overflow-y-auto lg:overscroll-contain';

const App = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <>
            <Background />
            <CursorBubble />

            <button
                type="button"
                onClick={toggleTheme}
                data-say={isDarkMode ? 'Lights on ☀️' : 'Lights off 🌙'}
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                className="fixed right-4 top-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/70 text-muted-foreground backdrop-blur-md transition-colors hover:bg-accent hover:text-foreground"
            >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <main className="min-h-screen lg:grid lg:h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] lg:overflow-hidden">
                {/* Left: who I am */}
                <aside className={`${column} lg:border-r lg:pb-[30vh]`}>
                    <Profile />
                    <Experience />
                    <Achievements />
                    <Availability />
                </aside>

                {/* Middle: work */}
                <div className={`${column} min-w-0`}>
                    <Featured />
                    <Projects />
                    <Footer />
                </div>

                {/* Right: activity and stack */}
                <aside className={`${column} lg:border-l`}>
                    <GithubActivity />
                    <TechStack />
                </aside>
            </main>
        </>
    );
};

export default App;
