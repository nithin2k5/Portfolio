import React from 'react';
import { FaReact, FaNode, FaPython, FaGithub, FaJava, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiNextdotjs, SiMysql, SiRedis } from 'react-icons/si';
import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    { icon: SiTypescript, name: 'TypeScript' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: FaPython, name: 'Python' },
    { icon: FaJava, name: 'Java' },
    { icon: FaNode, name: 'Node.js' },
    { icon: FaReact, name: 'React' },
    { icon: SiNextdotjs, name: 'Next.js' },
    { icon: FaGithub, name: 'Git' },
    { icon: FaDocker, name: 'Docker' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: SiRedis, name: 'Redis' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="stack" className="py-32 px-4 bg-background relative transition-colors duration-500">
      {/* Vertical Section Name */}
      <div className="absolute top-32 left-10 hidden lg:block h-full">
        <div className="flex flex-col gap-2 sticky top-32">
          <div className="w-10 h-[1px] bg-foreground/20"></div>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold rotate-90 origin-left mt-8 whitespace-nowrap">STACK</p>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto lg:ml-20">
        {/* Section Header */}
        <div className="mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-xs font-black text-primary/40 tracking-[0.3em] uppercase">Tools & Forge</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-foreground tracking-tighter"
          >
            TECH STACK.
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group flex flex-col items-center justify-center p-4 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 blur-sm"></div>
                  <IconComponent className="text-4xl md:text-5xl text-foreground/40 group-hover:text-foreground transition-all duration-300 relative z-10" />
                </div>
                <span className="text-[10px] md:text-xs font-black tracking-widest text-primary/30 group-hover:text-primary transition-colors uppercase">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-primary/[0.02] select-none pointer-events-none uppercase">
        SKILLS
      </div>
    </section>
  );
};

export default TechStack;
