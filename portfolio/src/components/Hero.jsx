import React from 'react';
import { FaGithub, FaEnvelope, FaArrowRight, FaHandPaper } from 'react-icons/fa';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 pt-32 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-xs font-normal text-white">Available for opportunities</span>
          </div>

          {/* Greeting */}
          <div className="flex items-center justify-center gap-2">
            <FaHandPaper className="wave-icon-hero" />
            <span className="text-base font-light text-white/80 tracking-wide">Hello, I'm</span>
          </div>

          {/* Name */}
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Nithin
              <br />
              <span className="relative">
                Kumar K
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-100"></span>
              </span>
            </h1>
          </div>

          {/* Role */}
          <div className="pt-2">
            <p className="text-lg md:text-xl font-light text-white/70 tracking-wide">
              Full Stack Developer
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 leading-relaxed font-light pt-4">
            Third year Computer Science student passionate about crafting digital experiences through code.
            <br />
            Full Stack Developer based in India, specializing in modern web technologies and scalable applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="gap-2 px-6 py-4 text-sm font-medium rounded-none border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              View My Work
              <FaArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="gap-2 px-6 py-4 text-sm font-medium rounded-none border-2 border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              <FaEnvelope className="w-4 h-4" />
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <a 
              href="https://github.com/nithin2k5" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="group"
            >
              <div className="w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300">
                <FaGithub className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
            </a>
            <a 
              href="mailto:ntbm8125@gmail.com" 
              aria-label="Email"
              className="group"
            >
              <div className="w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300">
                <FaEnvelope className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
