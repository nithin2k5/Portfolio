import React, { useEffect, useState } from 'react';
import { Download, Mail } from 'lucide-react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import LastPush from './LastPush';
import { profile } from '../data/portfolio';

const formatTime = (date) =>
    new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: profile.timezone,
    }).format(date);

const localHour = (date) =>
    Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: profile.timezone }).format(date));

const statusFor = (hour) => {
    if (hour >= 1 && hour < 7) return 'Probably asleep 😴';
    if (hour >= 7 && hour < 10) return 'Morning coffee ☕';
    if (hour >= 10 && hour < 19) return 'Building things 🛠️';
    return 'Late-night coding 🌙';
};

const Availability = () => {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 15000);
        return () => clearInterval(id);
    }, []);

    return (
        <Reveal as="section" className="mx-auto w-full max-w-2xl px-5 pb-8 lg:max-w-none lg:px-8">
            <div className="rounded-2xl border bg-background/60 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-strong opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-strong" />
                    </span>
                    <p className="text-sm font-semibold text-foreground">Open to opportunities</p>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3 border-t pt-3">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{profile.timezoneLabel}</p>
                        <p className="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-foreground">{formatTime(now)}</p>
                    </div>
                    <p className="pb-1 text-right text-xs text-muted-foreground">{statusFor(localHour(now))}</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Usually replies within a day</p>
                <LastPush />
                <div className="mt-4 flex gap-2">
                    <Magnetic className="flex flex-1">
                        <a
                            href={profile.resume}
                            data-say="Grab my resume 📄"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        >
                            <Download size={15} />
                            Resume
                        </a>
                    </Magnetic>
                    <Magnetic className="flex">
                        <a
                            href={`mailto:${profile.email}?subject=Available%20for%20Hire`}
                            aria-label="Email me"
                            data-say="Drop me an email 📮"
                            className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-foreground transition-colors hover:bg-accent"
                        >
                            <Mail size={16} />
                        </a>
                    </Magnetic>
                </div>
            </div>
        </Reveal>
    );
};

export default Availability;
