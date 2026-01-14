import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

const About = () => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "10+", label: "Projects Built" },
    { number: "15+", label: "Technologies" },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-black relative">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-medium text-white/40 tracking-widest uppercase">About Me</span>
            <div className="h-px w-12 bg-white mx-auto mt-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            About
          </h2>
        </div>

        <div className="space-y-12">
          {/* Main Description Card */}
          <div className="border-2 border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl hover:border-white/20 transition-all duration-500">
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-light max-w-3xl mx-auto text-center">
              Hello, World! I am <span className="font-medium text-white">Nithin Kumar K</span>, a Full-Stack Developer passionate about crafting high-performance, scalable web applications. With a strong foundation in Next.js, React, Node.js, and modern web technologies, I thrive on building seamless user experiences and optimizing system performance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="border-2 border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:border-white/30 hover:bg-white/10 transition-all duration-500 group text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-6">
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-sm font-medium rounded-none border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Let's connect and collaborate!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
