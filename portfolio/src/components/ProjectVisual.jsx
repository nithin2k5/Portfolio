import React from 'react';

// Placeholder app screens drawn in the project's color; three layouts for the three phones
const PhoneScreen = ({ color, variant }) => (
    <div className="absolute inset-0 flex flex-col gap-[6%] bg-[#0f0f10] px-[9%] pb-[8%] pt-[18%]">
        {variant === 0 && (
            <>
                <div className="h-[4%] w-[55%] rounded-full bg-white/80" />
                <div className="h-[3%] w-[35%] rounded-full bg-white/25" />
                <div className="aspect-[4/3] w-full rounded-xl" style={{ background: `linear-gradient(135deg, ${color}, ${color}55)` }} />
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-[8%]">
                        <div className="aspect-square w-[22%] rounded-lg" style={{ backgroundColor: `${color}${i === 0 ? 'cc' : '44'}` }} />
                        <div className="flex flex-1 flex-col gap-1">
                            <div className="h-1.5 w-[80%] rounded-full bg-white/50" />
                            <div className="h-1.5 w-[50%] rounded-full bg-white/20" />
                        </div>
                    </div>
                ))}
            </>
        )}
        {variant === 1 && (
            <>
                <div className="flex items-center justify-between">
                    <div className="h-2 w-[45%] rounded-full bg-white/80" />
                    <div className="aspect-square w-[14%] rounded-full" style={{ backgroundColor: color }} />
                </div>
                <div className="relative aspect-square w-full">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff1a" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="10" strokeDasharray="251" strokeDashoffset="70" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 m-auto h-2 w-[30%] rounded-full bg-white/70" />
                </div>
                <div className="flex items-end justify-between gap-[6%]">
                    {[40, 70, 55, 90, 65, 80].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 0.3}px`, backgroundColor: i === 3 ? color : `${color}55` }} />
                    ))}
                </div>
            </>
        )}
        {variant === 2 && (
            <>
                <div className="h-2 w-[60%] rounded-full bg-white/80" />
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg bg-white/[0.06] p-[8%]">
                        <div className="h-1.5 w-[70%] rounded-full bg-white/50" />
                        <div className="mt-1.5 h-1.5 w-[40%] rounded-full" style={{ backgroundColor: i === 1 ? color : '#ffffff22' }} />
                    </div>
                ))}
                <div className="mt-auto h-[7%] w-full rounded-full" style={{ backgroundColor: color }} />
            </>
        )}
    </div>
);

const Phones = ({ project }) => (
    <div className="absolute inset-0 flex items-end justify-center">
        {[-1, 0, 1].map((o, i) => (
            <div
                key={o}
                className="phone absolute bottom-[-12%] aspect-[9/19.5] w-[30%] max-w-[130px] overflow-hidden rounded-[18px] border-[3px] border-background bg-black shadow-xl"
                style={{ '--o': o, '--a': Math.abs(o), zIndex: o === 0 ? 10 : 9 }}
            >
                {project.images?.[i] ? (
                    <img src={project.images[i]} alt="" loading="lazy" draggable="false" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                    <PhoneScreen color={project.color} variant={i} />
                )}
                <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-[2.2%] z-10 flex h-[4.4%] w-[34%] -translate-x-1/2 items-center justify-end rounded-full bg-black px-[3.5%] ${
                        o === 0 ? 'transition-[width] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:w-[60%]' : ''
                    }`}
                >
                    {o === 0 && (
                        <span className="absolute left-[9%] flex aspect-square h-[42%] opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100">
                            <span className="h-full w-full animate-pulse rounded-full bg-[#30d158]" />
                        </span>
                    )}
                    <span className="aspect-square h-[46%] rounded-full bg-[#14141f] ring-1 ring-white/10" />
                </span>
            </div>
        ))}
    </div>
);

// A camera feed with bounding boxes popping in, for the computer vision projects
const DetectionScreen = ({ project }) => (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0d10]">
        <div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: 'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)',
                backgroundSize: '10% 14%',
            }}
        />
        <div className="absolute -left-[10%] top-[30%] h-[80%] w-[60%] rounded-full bg-white/[0.06] blur-2xl" />
        <div className="absolute right-0 top-[10%] h-[70%] w-[40%] rounded-full blur-2xl" style={{ backgroundColor: `${project.color}22` }} />
        {project.detections.map((d, i) => (
            <div
                key={`${d.label}-${i}`}
                className="detect-box absolute rounded-[2px] border"
                style={{
                    left: `${d.box[0]}%`,
                    top: `${d.box[1]}%`,
                    width: `${d.box[2]}%`,
                    height: `${d.box[3]}%`,
                    borderColor: project.color,
                    backgroundColor: `${project.color}14`,
                    animationDelay: `${i * 0.35}s`,
                }}
            >
                <span
                    className="absolute -top-px left-[-1px] -translate-y-full whitespace-nowrap rounded-t-[2px] px-1 font-mono text-[7px] font-semibold leading-[11px] text-black"
                    style={{ backgroundColor: project.color }}
                >
                    {d.label} {d.score.toFixed(2)}
                </span>
            </div>
        ))}
        <div className="scan-line absolute inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
        <div className="absolute bottom-[5%] left-[3%] flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[7px] text-white/70">
            <span className="h-1 w-1 animate-pulse rounded-full bg-[#ff3b30]" />
            LIVE · {project.detections.length} objects
        </div>
    </div>
);

const Laptop = ({ project }) => (
    <div className="absolute inset-x-[10%] top-1/2 -translate-y-[56%] transition-transform duration-500 ease-out-expo group-hover:-translate-y-[60%]">
        <div className="relative rounded-t-[3.5%] bg-[#0b0b0b] p-[2.2%] pb-[2.6%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#2a2a2a]">
            <span aria-hidden="true" className="absolute left-1/2 top-0 z-10 h-[3.2%] w-[11%] -translate-x-1/2 rounded-b-[40%] bg-[#0b0b0b]" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2%] bg-black">
                {project.images?.[0] ? (
                    <img src={project.images[0]} alt="" loading="lazy" draggable="false" className="absolute inset-0 h-full w-full object-cover object-top" />
                ) : (
                    <DetectionScreen project={project} />
                )}
            </div>
        </div>
        <div
            aria-hidden="true"
            className="relative -mx-[6%] h-0 rounded-b-[45%_100%] bg-gradient-to-b from-[#d9d9d9] via-[#a9a9a9] to-[#6f6f6f] pt-[3%] dark:from-[#5a5a5a] dark:via-[#3d3d3d] dark:to-[#232323]"
        >
            <span className="absolute left-1/2 top-0 h-[45%] w-[16%] -translate-x-1/2 rounded-b-[40%] bg-black/25" />
        </div>
    </div>
);

const ProjectVisual = ({ project }) => (project.category === 'Mobile' ? <Phones project={project} /> : <Laptop project={project} />);

export default ProjectVisual;
