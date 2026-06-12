"use client";

import { useCallback, useMemo, useState } from "react";


interface NavigationProps {
  onNavigate: (id: string) => void;
}


export default function Navigation({ onNavigate }: NavigationProps) {
  const navItems = useMemo(
    () => ["About", "Experience", "Projects", "Research", "Contact"],
    []
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContact = useCallback(() => {
    // Footer CTA section is "05 — Connect"
    onNavigate("connect");
    setMenuOpen(false);
  }, [onNavigate]);

  const handleNavigate = useCallback(
    (link: string) => {
      if (link === "Contact") {
        handleContact();
        return;
      }
      onNavigate(link.toLowerCase());
      setMenuOpen(false);
    },
    [handleContact, onNavigate]
  );

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
      <div
        className="font-mono font-black text-2xl pointer-events-auto cursor-pointer"
        onClick={() => {
          onNavigate("top");
          setMenuOpen(false);
        }}
      >
        <span className="text-[#ff5555]">SK</span>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 font-mono text-sm pointer-events-auto text-white">
        {navItems.map((link) => (
          <li
            key={link}
            onClick={() => handleNavigate(link)}
            className="hover:text-[#ff5555]/60 transition-colors cursor-pointer uppercase tracking-widest"
          >
            {link}
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden pointer-events-auto inline-flex flex-col justify-center items-center w-11 h-11 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span
          className={`block w-6 h-0.5 bg-[#ff5555] transition-transform origin-center ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#ff5555] mt-1 transition-transform origin-center ${
            menuOpen ? "-rotate-45 -translate-y-1" : ""
          }`}
        />
      </button>


      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-[72px] left-0 right-0 px-6">
          <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 shadow-lg">
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(link)}
                    className="w-full text-left text-[#ff5555] hover:text-[#ff5555]/70 transition-colors cursor-pointer uppercase tracking-widest"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
