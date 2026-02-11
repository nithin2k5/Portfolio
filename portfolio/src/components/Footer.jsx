import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 border-t border-zinc-200 dark:border-zinc-900/50 mt-12">
      <div className="text-center md:text-left">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Nithin Kumar. All rights reserved.
        </p>
        <p className="text-zinc-600 dark:text-zinc-600 text-xs mt-1">
          Built with React, Tailwind & Motion.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/nithin2k5" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <Github size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <Linkedin size={18} />
        </a>
        <a href="mailto:ntbm8125@gmail.com" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
