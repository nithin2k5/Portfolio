import React from 'react';
import { FaGithub, FaEnvelope, FaArrowRight, FaHandPaper } from 'react-icons/fa';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 pt-32 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-medium text-foreground/80">Available for opportunities</span>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <FaHandPaper className="text-foreground/60 text-lg animate-bounce" />
            <span className="text-base font-medium text-foreground/70 tracking-wide">Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <div className="relative inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground"
            >
              NITHIN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40">
                KUMAR K
              </span>
            </motion.h1>
          </div>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pt-4"
          >
            <p className="text-xl md:text-2xl font-bold text-foreground/80 tracking-tight">
              Full Stack developer <span className="text-foreground/30 mx-2">/</span> Web Architect
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed pt-2"
          >
            Third year Computer Science student passionate about crafting digital experiences through code.
            Specializing in modern web technologies and scalable applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-10"
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group h-14 px-8 text-base font-bold rounded-none transition-all duration-300 bg-primary text-primary-foreground hover:translate-y-[-2px] hover:shadow-xl"
            >
              View Projects
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 text-base font-bold rounded-none border-2 border-primary/20 hover:border-primary hover:bg-transparent transition-all duration-300 hover:translate-y-[-2px]"
            >
              <FaEnvelope className="mr-2 w-4 h-4" />
              Let's Talk
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center justify-center gap-6 pt-12"
          >
            <a
              href="https://github.com/nithin2k5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground transition-colors duration-300 transform hover:scale-125"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="mailto:ntbm8125@gmail.com"
              className="text-foreground/40 hover:text-foreground transition-colors duration-300 transform hover:scale-125"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Extreme minimalism decoration */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-[1px] bg-foreground/20"></div>
          <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold rotate-90 origin-left mt-8">HOME</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
