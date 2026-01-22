import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaFolder, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const navItems = [
    { id: 'home', icon: FaHome, label: 'HOME' },
    { id: 'about', icon: FaUser, label: 'ABOUT' },
    { id: 'stack', icon: FaCode, label: 'STACK' },
    { id: 'projects', icon: FaFolder, label: 'WORKS' },
    { id: 'contact', icon: FaEnvelope, label: 'TOUCH' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 rounded-none ${isScrolled
          ? 'w-[90%] md:w-auto bg-background/80 backdrop-blur-xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)]'
          : 'w-[95%] md:w-auto bg-background/40 backdrop-blur-md border border-primary/10'
        } px-2 py-2`}>
        <div className="flex items-center gap-1">
          {/* Logo */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 border border-primary/10 mr-2 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="font-black text-xs tracking-tighter group-hover:scale-110 transition-transform italic underline underline-offset-4">NK</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 text-[10px] font-black tracking-[0.2em] text-foreground/50 hover:text-foreground hover:bg-primary/5 transition-all duration-300 flex items-center gap-2 group"
                >
                  <Icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="h-4 w-[1px] bg-primary/20 mx-2 hidden md:block"></div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center justify-between w-full md:w-auto px-2 md:px-0">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-primary/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FaSun className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FaMoon className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={toggleMenu}
                className="w-10 h-10 flex items-center justify-center text-foreground"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-background md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-5 py-6 border-b border-primary/10 text-left group"
                  >
                    <Icon className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                    <span className="text-2xl font-black tracking-tighter text-foreground">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-8 border border-primary/10 bg-primary/5 text-center"
            >
              <p className="text-xs font-bold tracking-widest text-primary/40 uppercase mb-4">SOCIALS</p>
              <div className="flex justify-center gap-8">
                <a href="https://github.com/nithin2k5" className="text-foreground/60 hover:text-foreground italic font-black">GH</a>
                <a href="mailto:ntbm8125@gmail.com" className="text-foreground/60 hover:text-foreground italic font-black">EM</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
