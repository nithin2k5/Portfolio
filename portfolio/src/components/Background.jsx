import React, { useEffect, useRef } from 'react';

const LINK = 120;
const TRACK = 190;
const MAX_POINTS = 110;

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

const seed = (w, h) =>
    Array.from({ length: Math.min(MAX_POINTS, Math.round((w * h) / 15000)) }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 9;
        return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
    });

// Drifting keypoints linked like a pose skeleton; the cursor is a tracked point that
// pulls nearby keypoints in and marks the closest ones with detection brackets
const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let view = fitCanvas(canvasRef.current);
        let points = seed(view.w, view.h);
        let colors = {};
        const readColors = () => {
            colors = { dot: readVar('--bg-dot'), fg: readVar('--foreground'), signal: readVar('--signal-strong') };
        };
        readColors();
        const mouse = { x: -9999, y: -9999, active: false };
        let frame;
        let last = performance.now();

        const draw = (dt) => {
            const { ctx, w, h } = view;
            ctx.clearRect(0, 0, w, h);

            for (const p of points) {
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const d = Math.hypot(dx, dy);
                    if (d < TRACK && d > 1) {
                        p.x += (dx / d) * 14 * dt;
                        p.y += (dy / d) * 14 * dt;
                    }
                }
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                if (p.x < -20) p.x = w + 20;
                if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20;
                if (p.y > h + 20) p.y = -20;
            }

            // Skeleton links between nearby keypoints
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors.fg;
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const a = points[i];
                    const b = points[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < LINK) {
                        ctx.globalAlpha = (1 - d / LINK) * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            ctx.fillStyle = colors.dot;
            for (const p of points) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
                ctx.fill();
            }

            if (!mouse.active) return;

            // Tracking lines from the cursor, brackets on the three closest keypoints
            const near = points
                .map((p) => ({ p, d: Math.hypot(p.x - mouse.x, p.y - mouse.y) }))
                .filter((n) => n.d < TRACK)
                .sort((a, b) => a.d - b.d);
            ctx.strokeStyle = colors.signal;
            near.forEach(({ p, d }, i) => {
                ctx.globalAlpha = (1 - d / TRACK) * 0.55;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                if (i < 3) {
                    const s = 5;
                    ctx.globalAlpha = (1 - d / TRACK) * 0.9;
                    ctx.beginPath();
                    ctx.moveTo(p.x - s, p.y - s + 2.5);
                    ctx.lineTo(p.x - s, p.y - s);
                    ctx.lineTo(p.x - s + 2.5, p.y - s);
                    ctx.moveTo(p.x + s - 2.5, p.y + s);
                    ctx.lineTo(p.x + s, p.y + s);
                    ctx.lineTo(p.x + s, p.y + s - 2.5);
                    ctx.stroke();
                }
            });
            ctx.globalAlpha = 1;
        };

        const tick = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            draw(dt);
            frame = requestAnimationFrame(tick);
        };

        const onResize = () => {
            view = fitCanvas(canvasRef.current);
            points = seed(view.w, view.h);
            if (reduceMotion) draw(0);
        };
        const onMove = (e) => {
            if (e.pointerType !== 'mouse') return;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };
        const onLeave = () => {
            mouse.active = false;
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
            readColors();
            if (reduceMotion) draw(0);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('resize', onResize);
        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        document.addEventListener('visibilitychange', onVisibility);

        if (reduceMotion) draw(0);
        else frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            themeObserver.disconnect();
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <div aria-hidden="true" className="page-bg">
            <div className="page-bg-field">
                <canvas ref={canvasRef} className="absolute left-0 top-0" />
            </div>
        </div>
    );
};

export default Background;
