import React from 'react';
// import './App.css'; // Removed for premium design
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GitHubHeatmap from './components/GitHubHeatmap';
import TypingSpeed from './components/TypingSpeed';
import ScrollToTop from './components/ScrollToTop';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans selection:bg-foreground selection:text-background">
      <Navbar />

      <main>
        <Hero />

        <About />

        {/* Custom Section for Activity */}
        <section id="activity" className="py-32 px-4 bg-background relative border-y border-primary/5">
          {/* Vertical Section Name */}
          <div className="absolute top-32 left-10 hidden lg:block h-full">
            <div className="flex flex-col gap-2 sticky top-32">
              <div className="w-10 h-[1px] bg-foreground/20"></div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold rotate-90 origin-left mt-8 whitespace-nowrap">ACTIVITY</p>
            </div>
          </div>

          <div className="container max-w-6xl mx-auto">
            <div className="mb-20 text-left lg:ml-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="text-xs font-black text-primary/40 tracking-[0.3em] uppercase">The Pulse</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black text-foreground tracking-tighter"
              >
                ACTIVITY.
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch lg:ml-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8 group flex"
              >
                <div className="w-full p-8 border border-primary/10 bg-primary/[0.01] transition-colors hover:border-primary/20 hover:bg-primary/[0.02]">
                  <GitHubHeatmap />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 group flex"
              >
                <div className="w-full p-8 border border-primary/10 bg-primary/[0.01] flex items-center justify-center transition-colors hover:border-primary/20 hover:bg-primary/[0.02]">
                  <TypingSpeed />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <TechStack />

        <Projects />

        <Contact />
      </main>

      <footer className="py-12 px-4 border-t border-primary/5 text-center">
        <div className="container max-w-5xl mx-auto">
          <p className="text-[10px] font-black tracking-[0.5em] text-primary/20 uppercase">
            © Nithin Kumar K <span className="mx-4">/</span> Designed with Precision
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

export default App;
export { ThemeProvider } from './components/ThemeContext';