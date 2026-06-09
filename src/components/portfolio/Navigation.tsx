"use client";

import { useCallback } from "react";

interface NavigationProps {
  onNavigate: (id: string) => void;
}


export default function Navigation({ onNavigate }: NavigationProps) {
  const navItems = ["About", "Experience", "Projects", "Research", "Contact"];

  const handleContact = useCallback(() => {
    // Footer CTA section is "05 — Connect"
    onNavigate("connect");
  }, [onNavigate]);


  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center pointer-events-none">
      <div
        className="font-mono font-bold text-2xl pointer-events-auto cursor-pointer"
        onClick={() => onNavigate("top")}
      >
        <span className="text-emerald-500">SK</span>
      </div>
      <ul className="hidden md:flex gap-8 font-mono text-sm pointer-events-auto">
        {navItems.map((link) => (
          <li
            key={link}
            onClick={() =>
              link === "Contact" ? handleContact() : onNavigate(link.toLowerCase())
            }

            className="hover:text-emerald-400 transition-colors cursor-pointer uppercase tracking-widest"
          >
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
}
