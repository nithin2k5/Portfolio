import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from './ThemeContext';

const GithubActivity = () => {
    const { isDarkMode } = useTheme();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const years = [];
    for (let year = currentYear; year >= 2025; year--) {
        years.push(year);
    }

    const explicitTheme = {
        light: ['#f4f4f5', '#d4d4d8', '#a1a1aa', '#52525b', '#18181b'],
        dark: ['#27272a', '#52525b', '#a1a1aa', '#e4e4e7', '#fafafa'],
    };

    return (
        <section className="space-y-8 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    GitHub Contributions
                </h3>
                <div className="flex gap-2">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                selectedYear === year
                                    ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow-sm'
                                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-200'
                            }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full overflow-x-auto custom-scrollbar pb-2">
                <div className="min-w-max">
                <GitHubCalendar 
                    username="nithin2k5" 
                    year={selectedYear}
                    colorScheme={isDarkMode ? 'dark' : 'light'}
                    theme={explicitTheme}
                    blockSize={14}
                    blockMargin={5}
                    fontSize={12}
                />
                </div>
            </div>
        </section>
    );
};

export default GithubActivity;
