import React from 'react';
import { FaKeyboard } from 'react-icons/fa';
import './TypingSpeed.css';

const TypingSpeed = () => {
  const wpm = 70;

  return (
    <div className="typing-speed-container">
      {/* Icon */}
      <div className="typing-speed-icon-wrapper">
        <FaKeyboard />
      </div>

      {/* WPM Display */}
      <div className="typing-speed-display">
        <div className="typing-speed-number">
          {wpm}
        </div>
        <div className="typing-speed-label-wpm">
          WPM
        </div>
      </div>

      {/* Label */}
      <div className="typing-speed-label-text">
        Typing Speed
      </div>

      {/* Decorative line */}
      <div className="typing-speed-divider"></div>
    </div>
  );
};

export default TypingSpeed;
