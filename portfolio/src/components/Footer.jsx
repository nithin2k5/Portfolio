import React from 'react';

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-12">
      <div className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
        DESIGNED & DEVELOPED BY NITHIN KUMAR © {new Date().getFullYear()}
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/nithin2k5" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">
          Github
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
