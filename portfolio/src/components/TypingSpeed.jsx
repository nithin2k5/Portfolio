import React from 'react';
import { FaKeyboard } from 'react-icons/fa';

const TypingSpeed = () => {
  const wpm = 70;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border border-primary/10 flex items-center justify-center text-primary/40">
        <FaKeyboard />
      </div>

      <div className="text-center">
        <div className="text-6xl font-black text-foreground tracking-tighter">
          {wpm}
        </div>
        <div className="text-[10px] font-black tracking-[0.3em] text-primary/40 uppercase">
          WPM
        </div>
      </div>

      <div className="text-xs font-bold text-foreground/60 tracking-widest uppercase">
        Typing Velocity
      </div>
    </div>
  );
};

export default TypingSpeed;
