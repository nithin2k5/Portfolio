import React from 'react';

const TechStack = () => {
  const categories = [
    {
      name: 'LANGUAGES',
      skills: ['TypeScript', 'Python', 'SQL', '.NET']
    },
    {
      name: 'FRONTEND',
      skills: ['React / Next.js', 'Tailwind CSS', 'Expo']
    },
    {
      name: 'BACKEND',
      skills: ['Node.js', 'MySQL', 'PostgreSQL']
    },
    {
      name: 'CLOUD / DEV',
      skills: ['Docker', 'Git', 'OpenCV / MediaPipe']
    }
  ];

  return (
    <section className="space-y-12 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-16">
      <h3 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Core Competencies</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
        {categories.map((category, index) => (
          <div key={index} className="space-y-6">
            <h4 className="text-[11px] font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">{category.name}</h4>
            <ul className="space-y-4">
              {category.skills.map((skill, idx) => (
                <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
