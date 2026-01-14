import React from 'react';
import { Button } from './ui/button';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="py-24 px-4 bg-black relative">
      <div className="container max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-medium text-white/40 tracking-widest uppercase">Get In Touch</span>
            <div className="h-px w-12 bg-white mx-auto mt-2"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Contact
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto font-light">
            Let's work together to bring your ideas to life
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            onClick={() => window.location.href = 'mailto:ntbm8125@gmail.com'}
            className="px-10 py-4 text-sm font-medium rounded-none border-2 border-white hover:bg-white hover:text-black transition-all duration-300 gap-3"
          >
            <FaEnvelope className="w-4 h-4" />
            Send Email
          </Button>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs font-medium">
              © 2025 Nithin Kumar K. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="text-white/40 text-xs font-medium">Available for opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
