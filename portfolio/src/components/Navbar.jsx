import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaFolder, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { Button } from './ui/button';

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
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'about', icon: FaUser, label: 'About' },
    { id: 'stack', icon: FaCode, label: 'Stack' },
    { id: 'projects', icon: FaFolder, label: 'Projects' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-xl border-2 border-white/20 shadow-2xl' 
        : 'bg-black/70 backdrop-blur-lg border-2 border-white/10'
    } rounded-full px-5 py-2.5 max-w-5xl w-[95%]`}>
      <div className="flex items-center justify-between">
        <div className="font-bold text-base px-3 text-white tracking-tight">NK</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                aria-label={item.label}
              >
                <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            );
          })}
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="w-3.5 h-3.5" /> : <FaBars className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border-2 border-white/20 rounded-2xl shadow-2xl p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white hover:bg-white/10 transition-all duration-300 text-left group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
