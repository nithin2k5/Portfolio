import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import CountUp from './CountUp';

// Free, keyless counter (https://abacus.jasoncameron.dev); `hit` increments, `get` only reads
const COUNTER = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'nithin2k5-portfolio';
const KEY = 'visitors';
const STORAGE_KEY = 'visitor-counted';

const isLocal = () => /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

// Counts each browser once, so the number approximates unique visitors.
// Local development only reads the count so your own reloads don't inflate it.
const shouldCount = () => {
    if (isLocal()) return false;
    try {
        if (localStorage.getItem(STORAGE_KEY)) return false;
        localStorage.setItem(STORAGE_KEY, '1');
        return true;
    } catch {
        return false;
    }
};

const VisitorCount = () => {
    const [count, setCount] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const counted = shouldCount();
        fetch(`${COUNTER}/${counted ? 'hit' : 'get'}/${NAMESPACE}/${KEY}`)
            // The counter doesn't exist until the first real visit creates it
            .then((res) => (res.ok ? res.json() : res.status === 404 ? { value: 0 } : null))
            .then((data) => {
                if (cancelled || typeof data?.value !== 'number') return;
                setCount(data.value);
                setIsNew(counted);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    if (count === null) return null;

    return (
        <p
            className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground"
            data-say={isNew ? `welcome, visitor #${count.toLocaleString()} 👋` : 'unique visitors so far'}
        >
            <Eye size={13} className="shrink-0 text-signal" />
            <span>
                <span className="tabular-nums text-foreground">
                    <CountUp value={count} />
                </span>{' '}
                visitors
                {isNew && <span className="text-signal"> · you&apos;re #{count.toLocaleString()}</span>}
            </span>
        </p>
    );
};

export default VisitorCount;
