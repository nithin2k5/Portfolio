import React from 'react';
import { profile } from '../data/portfolio';

const links = [
  { name: 'GitHub', href: profile.github },
  { name: 'LinkedIn', href: profile.linkedin },
  { name: 'Email', href: `mailto:${profile.email}` },
];

const Footer = () => (
  <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between gap-3 border-t px-5 py-8 sm:flex-row lg:max-w-none lg:px-10">
    <p className="text-xs text-muted-foreground">
      © {new Date().getFullYear()} {profile.name}. Designed &amp; built with care.
    </p>
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.name}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
