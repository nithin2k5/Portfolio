import React from 'react';
import { FaReact, FaNode, FaPython, FaGithub, FaJava, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiNextdotjs, SiMysql, SiRedis } from 'react-icons/si';

const TechStack = () => {
  const technologies = [
    { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: FaPython, name: 'Python', color: 'text-blue-300' },
    { icon: FaJava, name: 'Java', color: 'text-orange-400' },
    { icon: FaNode, name: 'Node.js', color: 'text-green-400' },
    { icon: FaReact, name: 'React', color: 'text-cyan-400' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
    { icon: FaGithub, name: 'Git', color: 'text-white' },
    { icon: FaDocker, name: 'Docker', color: 'text-blue-400' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-400' },
    { icon: SiMysql, name: 'MySQL', color: 'text-blue-500' },
    { icon: SiRedis, name: 'Redis', color: 'text-red-400' },
  ];

  return (
    <section id="stack" className="py-24 px-4 bg-black relative">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-medium text-white/40 tracking-widest uppercase">Technologies</span>
            <div className="h-px w-12 bg-white mx-auto mt-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className="group relative border-2 border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:border-white/30 hover:bg-white/10 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <IconComponent className={`text-4xl ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
