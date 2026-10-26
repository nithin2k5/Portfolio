import React, { useEffect, useState } from 'react';
import { GitCommitHorizontal } from 'lucide-react';
import { profile } from '../data/portfolio';

const timeAgo = (date) => {
    const s = Math.max(1, Math.round((Date.now() - date.getTime()) / 1000));
    const units = [
        ['y', 31536000],
        ['mo', 2592000],
        ['d', 86400],
        ['h', 3600],
        ['m', 60],
    ];
    for (const [label, size] of units) {
        if (s >= size) return `${Math.floor(s / size)}${label} ago`;
    }
    return 'just now';
};

// Most recent public push, straight from the GitHub events API
const LastPush = () => {
    const [push, setPush] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://api.github.com/users/${profile.githubUser}/events/public?per_page=30`)
            .then((res) => (res.ok ? res.json() : []))
            .then((events) => {
                const latest = (Array.isArray(events) ? events : [])
                    .filter((e) => e.type === 'PushEvent')
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
                if (!cancelled && latest) {
                    setPush({ repo: latest.repo.name, at: new Date(latest.created_at) });
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    if (!push) return null;
    const name = push.repo.split('/')[1];

    return (
        <a
            href={`https://github.com/${push.repo}`}
            target="_blank"
            rel="noreferrer"
            data-say={`Open ${name} ↗`}
            className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
            <GitCommitHorizontal size={13} className="shrink-0 text-signal" />
            <span className="truncate">
                pushed to <span className="text-foreground">{name}</span> · {timeAgo(push.at)}
            </span>
        </a>
    );
};

export default LastPush;
