import React, { useEffect, useRef } from 'react';

const GAP = 22;

const readVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const fitCanvas = (canvas) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
};

// A dot grid that brightens around the cursor, plus light streaks gliding along grid lines.
const Background = () => {
    const dotsRef = useRef(null);
    const streaksRef = useRef(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let dots = fitCanvas(dotsRef.current);
        let streaks = fitCanvas(streaksRef.current);
        let dotColor = readVar('--bg-dot');
        let fg = readVar('--foreground');
        const mouse = { x: -9999, y: -9999 };
        const lines = [];
        let frame;
        let dotsDirty = true;
        let last = performance.now();

        const drawDots = () => {
            const { ctx, w, h } = dots;
            ctx.clearRect(0, 0, w, h);
            for (let x = GAP / 2; x < w; x += GAP) {
                for (let y = GAP / 2; y < h; y += GAP) {
                    const d = Math.hypot(x - mouse.x, y - mouse.y);
                    const boost = Math.max(0, 1 - d / 160);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = dotColor;
                    ctx.beginPath();
                    ctx.arc(x, y, 1 + boost * 0.9, 0, Math.PI * 2);
                    ctx.fill();
                    if (boost > 0) {
                        ctx.globalAlpha = boost * 0.35;
                        ctx.fillStyle = fg;
                        ctx.fill();
                    }
                }
            }
            ctx.globalAlpha = 1;
        };

        const spawn = () => {
            const { w, h } = streaks;
            const horizontal = Math.random() > 0.5;
            const lane = Math.floor(Math.random() * ((horizontal ? h : w) / GAP)) * GAP + GAP / 2;
            const dir = Math.random() > 0.5 ? 1 : -1;
            const span = horizontal ? w : h;
            lines.push({
                horizontal,
                lane,
                dir,
                pos: dir > 0 ? -120 : span + 120,
                speed: 140 + Math.random() * 160,
                len: 80 + Math.random() * 100,
                end: dir > 0 ? span + 120 : -120,
            });
        };

        const drawStreaks = (dt) => {
            const { ctx, w, h } = streaks;
            ctx.clearRect(0, 0, w, h);
            if (lines.length < 4 && Math.random() < dt * 0.9) spawn();
            for (let i = lines.length - 1; i >= 0; i--) {
                const l = lines[i];
                l.pos += l.speed * dt * l.dir;
                const tail = l.pos - l.len * l.dir;
                const [x1, y1, x2, y2] = l.horizontal
                    ? [tail, l.lane, l.pos, l.lane]
                    : [l.lane, tail, l.lane, l.pos];
                const grad = ctx.createLinearGradient(x1, y1, x2, y2);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(1, fg);
                ctx.globalAlpha = 0.22;
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                if ((l.dir > 0 && l.pos > l.end) || (l.dir < 0 && l.pos < l.end)) lines.splice(i, 1);
            }
            ctx.globalAlpha = 1;
        };

        const tick = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            if (dotsDirty) {
                drawDots();
                dotsDirty = false;
            }
            drawStreaks(dt);
            frame = requestAnimationFrame(tick);
        };

        const onResize = () => {
            dots = fitCanvas(dotsRef.current);
            streaks = fitCanvas(streaksRef.current);
            dotsDirty = true;
            if (reduceMotion) drawDots();
        };
        const onMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            dotsDirty = true;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
            dotsDirty = true;
        };
        const onVisibility = () => {
            cancelAnimationFrame(frame);
            if (!document.hidden && !reduceMotion) {
                last = performance.now();
                frame = requestAnimationFrame(tick);
            }
        };
        // Re-read colors whenever the theme class flips
        const themeObserver = new MutationObserver(() => {
            dotColor = readVar('--bg-dot');
            fg = readVar('--foreground');
            dotsDirty = true;
            if (reduceMotion) drawDots();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('resize', onResize);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        document.addEventListener('visibilitychange', onVisibility);

        if (reduceMotion) drawDots();
        else frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            themeObserver.disconnect();
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <div aria-hidden="true" className="page-bg">
            <div className="page-bg-dots">
                <canvas ref={dotsRef} className="absolute left-0 top-0" />
            </div>
            <div className="page-bg-streaks">
                <canvas ref={streaksRef} className="absolute left-0 top-0" />
            </div>
        </div>
    );
};

export default Background;
