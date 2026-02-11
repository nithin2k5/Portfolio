import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between mb-20 pt-4">
      <div className="w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
};

export default Navbar;
