import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from './ThemeContext';

const GithubActivity = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
                GitHub Contributions
            </h2>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-sm flex justify-center w-full overflow-hidden">
                <div className="overflow-x-auto max-w-full custom-scrollbar pb-2">
                    <GitHubCalendar 
                        username="nithin2k5" 
                        colorScheme={isDarkMode ? 'dark' : 'light'}
                        blockSize={14}
                        blockMargin={5}
                        fontSize={12}
                    />
                </div>
            </div>
        </div>
    );
};

export default GithubActivity;
