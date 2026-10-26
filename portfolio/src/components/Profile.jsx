import React from 'react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { profile } from '../data/portfolio';

const Profile = () => (
    <section className="mx-auto w-full max-w-2xl px-5 pb-2 pt-16 sm:pt-20 lg:max-w-none lg:px-8 lg:pt-20">
        <Reveal className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-5">
            <div className="group relative shrink-0">
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${profile.name} on GitHub`}
                    data-say="human · that's me 👋"
                    className="relative block h-14 w-14 overflow-hidden rounded-full bg-muted outline-none sm:h-16 sm:w-16 lg:h-44 lg:w-44"
                >
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="h-full w-full object-cover grayscale-[60%] transition duration-500 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                    />
                </a>
            </div>
            <div className="flex flex-col lg:items-center lg:text-center">
                <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl lg:text-2xl">{profile.name}</h1>
                <p className="font-mono text-[11px] text-muted-foreground">@{profile.githubUser}</p>
                <p className="text-sm font-medium text-muted-foreground sm:text-base">{profile.role}</p>
            </div>
        </Reveal>

        <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-auto lg:text-center">
                {profile.tagline}
            </p>
            <div className="mt-4 flex gap-2 lg:mt-6">
                <Magnetic className="flex-1">
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        data-say="Follow me on GitHub 🐙"
                        className="block rounded-lg bg-foreground px-4 py-2 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
                    >
                        Follow
                    </a>
                </Magnetic>
                <Magnetic className="flex-1">
                    <a
                        href={`mailto:${profile.email}`}
                        data-say="Say hi 💬"
                        className="block rounded-lg border px-4 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                        Message
                    </a>
                </Magnetic>
            </div>
        </Reveal>
        <hr className="mt-8 lg:hidden" />
    </section>
);

export default Profile;
