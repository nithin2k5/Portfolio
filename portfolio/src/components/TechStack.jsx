import React from 'react';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss, SiFramer,
  SiExpo, SiNodedotjs, SiExpress, SiMysql, SiPostgresql, SiOpencv, SiMediapipe, SiGit, SiGithub, SiNginx, SiVercel,
} from 'react-icons/si';
import { Database, ScanEye } from 'lucide-react';
import Reveal, { SectionTitle } from './Reveal';
import { tools } from '../data/portfolio';

// Brand icon and color per tool; colors only appear on hover
const icons = {
  JavaScript: [SiJavascript, '#F7DF1E'],
  TypeScript: [SiTypescript, '#3178C6'],
  Python: [SiPython, '#3776AB'],
  SQL: [Database, '#00758F'],
  HTML5: [SiHtml5, '#E34F26'],
  CSS3: [SiCss3, '#1572B6'],
  React: [SiReact, '#61DAFB'],
  'Next.js': [SiNextdotjs, 'var(--foreground)'],
  'Tailwind CSS': [SiTailwindcss, '#06B6D4'],
  'Framer Motion': [SiFramer, '#0055FF'],
  'React Native': [SiReact, '#61DAFB'],
  Expo: [SiExpo, 'var(--foreground)'],
  'Node.js': [SiNodedotjs, '#5FA04E'],
  Express: [SiExpress, 'var(--foreground)'],
  MySQL: [SiMysql, '#4479A1'],
  PostgreSQL: [SiPostgresql, '#4169E1'],
  OpenCV: [SiOpencv, '#5C3EE8'],
  MediaPipe: [SiMediapipe, '#0097A7'],
  YOLO: [ScanEye, '#00B8D9'],
  Git: [SiGit, '#F05032'],
  GitHub: [SiGithub, 'var(--foreground)'],
  Nginx: [SiNginx, '#009639'],
  Vercel: [SiVercel, 'var(--foreground)'],
};

const total = tools.reduce((n, g) => n + g.items.length, 0);

const Pill = ({ name }) => {
  const [Icon, color] = icons[name] ?? [];
  return (
    <li
      data-say={`I use ${name}`}
      className="group inline-flex items-center gap-1.5 rounded-full border bg-background py-1 pl-1.5 pr-2.5 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-accent"
      style={{ '--brand': color }}
    >
      {Icon && (
        <Icon
          size={14}
          aria-hidden="true"
          className="shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-[color:var(--brand)]"
        />
      )}
      <span className="text-xs text-foreground">{name}</span>
    </li>
  );
};

const TechStack = () => (
  <Reveal as="section" className="mx-auto w-full max-w-2xl px-5 pb-10 pt-2 lg:max-w-none lg:px-6 lg:pt-0">
    <SectionTitle index="06" count={total} className="mb-4">Tools &amp; Technologies</SectionTitle>
    <div className="flex flex-col gap-4">
      {tools.map((group) => (
        <div key={group.group}>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            {group.group}
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="tabular-nums">{group.items.length}</span>
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <Pill key={item} name={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Reveal>
);

export default TechStack;
