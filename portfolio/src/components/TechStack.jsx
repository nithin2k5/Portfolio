import React from 'react';

const TechStack = () => {
  const skills = [
    "Next.js", "React", "TypeScript", "Node.js",
    "Python", "Computer Vision", "OpenCV", "MediaPipe",
    ".NET", "Expo", "Tailwind CSS", "MySQL", "PostgreSQL", "Docker", "Git"
  ];

  return (
    <section className="space-y-6">
      <h3 className="font-bold text-xl dark:text-white text-zinc-900">Tech Stack</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-md bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-900 border dark:border-zinc-800 dark:text-zinc-400 text-sm font-medium hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
