import React from 'react';
import { BadgeCheck } from 'lucide-react';
import Reveal from './Reveal';
import { profile } from '../data/portfolio';

const Profile = () => (
    <section className="mx-auto w-full max-w-2xl px-5 pb-2 pt-16 sm:pt-20 lg:max-w-none lg:px-8 lg:pt-20">
        <Reveal className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-5">
            <div className="group relative shrink-0">
                <span
                    aria-hidden="true"
                    className="avatar-ring pointer-events-none absolute -inset-[5px] scale-95 rounded-full opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:-inset-[7px]"
                >
                    <span className="avatar-ring__spin absolute inset-0 rounded-full" />
                </span>
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${profile.name} on GitHub`}
                    data-say="That's me 👋"
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
                <div className="flex items-center gap-1.5">
                    <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl lg:text-2xl">{profile.name}</h1>
                    <BadgeCheck size={18} className="text-foreground" aria-label="Verified" />
                </div>
                <p className="text-sm font-medium text-muted-foreground sm:text-base">{profile.role}</p>
            </div>
        </Reveal>

        <Reveal delay={0.08}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-auto lg:text-center">
                {profile.tagline}
            </p>
            <div className="mt-4 flex gap-2 lg:mt-6">
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    data-say="Follow me on GitHub 🐙"
                    className="flex-1 rounded-lg bg-foreground px-4 py-2 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90 active:scale-[0.98]"
                >
                    Follow
                </a>
                <a
                    href={`mailto:${profile.email}`}
                    data-say="Say hi 💬"
                    className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent active:scale-[0.98]"
                >
                    Message
                </a>
            </div>
        </Reveal>
        <hr className="mt-8 lg:hidden" />
    </section>
);

export default Profile;
