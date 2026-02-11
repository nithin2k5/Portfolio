import React from 'react';
import { Trophy, Award, Star, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

const Achievements = () => {
    const hackathons = [
        {
            badge: '1st Place',
            title: '24-Hour Hackathon',
            subtitle: 'Research Conclave',
            location: 'Siddhartha Academy University',
            year: '2025',
            description: 'Developed an innovative research management solution, optimizing data accessibility and collaboration.',
            icon: Trophy,
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        {
            badge: '2nd Place',
            title: 'VR Siddhartha Webathon',
            subtitle: '24-Hour Challenge',
            location: 'Siddhartha Academy',
            year: '2025',
            price: '₹15,000 Prize',
            description: 'Created an immersive web-based VR experience platform, recognized for technical complexity.',
            icon: Award,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            badge: '2nd Place',
            title: 'CodeForCause',
            subtitle: 'Social Impact',
            location: 'ZeroOne Code Club',
            year: '2023',
            description: 'Built a social impact platform connecting volunteers with local NGOs.',
            icon: Award,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        },
        {
            badge: 'Finalist',
            title: 'BITS Hackathon',
            subtitle: 'National Level',
            location: 'BITS Pilani, Hyderabad',
            year: '2024',
            description: 'Qualified for the final round in national-level hackathon with a blockchain-based voting system.',
            icon: Star,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20'
        }
    ];

    const getBadgeStyle = (badge) => {
        if (badge.includes('1st')) return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-500 dark:border-yellow-500/20';
        if (badge.includes('2nd')) return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-500 dark:border-blue-500/20';
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-500 dark:border-purple-500/20';
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-xl dark:text-white text-zinc-900 flex items-center gap-2">
                    Hackathons <span className="text-zinc-500 font-normal">/ Awards</span>
                </h3>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Victory Log</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hackathons.map((item, index) => (
                    <div
                        key={index}
                        className="group relative h-full"
                    >
                        <div className="h-full p-6 bg-white border border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800/50 rounded-2xl backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
                            <div className="flex flex-col gap-4">
                                <div className={`w-fit px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(item.badge)}`}>
                                    {item.badge}
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg dark:text-white text-zinc-900 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h4>
                                    <div className="flex flex-col gap-1 text-zinc-600 dark:text-zinc-400 text-sm">
                                        <span className="font-medium">{item.subtitle}</span>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={12} />
                                                <span>{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                <span>{item.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
