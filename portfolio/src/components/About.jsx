import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "10+", label: "Projects Built" },
    { number: "15+", label: "Technologies" },
  ];

  return (
    <section id="about" className="py-32 px-4 bg-background relative transition-colors duration-500">
      {/* Vertical Section Name */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 border-r border-primary/5 flex items-center justify-center hidden md:flex select-none">
        <span className="text-[10px] font-black text-primary/20 tracking-[0.5em] uppercase whitespace-nowrap -rotate-90">
          ABOUT
        </span>
      </div>

      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-xs font-black text-primary/40 tracking-[0.3em] uppercase">The Story</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-foreground tracking-tighter"
          >
            ABOUT ME.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8"
          >
            <div className="border-l-4 border-primary pl-8 space-y-6">
              <p className="text-xl md:text-2xl text-foreground/80 leading-tight font-medium">
                Hello, World! I am <span className="text-primary italic">Nithin Kumar K</span>, a Full-Stack developer passionate about crafting high-performance, scalable web applications.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in Next.js, React, Node.js, and modern web technologies, I thrive on building seamless user experiences and optimizing system performance. My approach combines technical precision with creative problem-solving.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Currently pursuing my third year in Computer Science, I spend my time exploring the latest in software architecture and contributing to open-source projects.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="md:col-span-4 space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="p-6 border-2 border-primary/5 bg-primary/[0.02] transition-all duration-500 hover:border-primary/20 group"
              >
                <div className="text-4xl font-black text-foreground mb-1 group-hover:translate-x-2 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-start"
        >
          <Button
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group h-14 px-10 text-base font-bold rounded-none bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          >
            START A PROJECT
            <FaArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
