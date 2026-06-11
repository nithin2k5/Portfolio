import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from './ThemeContext';

const GithubActivity = () => {
    const { isDarkMode } = useTheme();

    const explicitTheme = {
        light: ['#f4f4f5', '#d4d4d8', '#a1a1aa', '#52525b', '#18181b'],
        dark: ['#27272a', '#52525b', '#a1a1aa', '#e4e4e7', '#fafafa'],
    };

    return (
        <section className="space-y-12 pt-8">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                GitHub Contributions
            </h3>
            <div className="w-full overflow-x-auto custom-scrollbar pb-2">
                <GitHubCalendar 
                    username="nithin2k5" 
                    colorScheme={isDarkMode ? 'dark' : 'light'}
                    theme={explicitTheme}
                    blockSize={14}
                    blockMargin={5}
                    fontSize={12}
                />
            </div>
        </section>
    );
};

export default GithubActivity;
