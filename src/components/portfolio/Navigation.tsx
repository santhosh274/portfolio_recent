"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";


interface NavigationProps {
  onNavigate: (id: string) => void;
}


export default function Navigation({ onNavigate }: NavigationProps) {
  const navItems = useMemo(
    () => ["About", "Experience", "Projects", "Research", "Contact"],
    []
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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
    <nav className="fixed top-0 w-full z-50 px-6 py-3 flex justify-between items-center pointer-events-none glass-bar">
      <div
        className="font-mono font-black text-2xl pointer-events-auto cursor-pointer"
        onClick={() => {
          onNavigate("top");
          setMenuOpen(false);
        }}
      >
        <span className="text-[#DC143C]">SK</span>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 font-mono text-sm pointer-events-auto text-[#2a2a2a]">
        {navItems.map((link) => (
          <li
            key={link}
            onClick={() => handleNavigate(link)}
            className="hover:text-[#DC143C]/60 transition-colors cursor-pointer uppercase tracking-widest"
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
        className="md:hidden pointer-events-auto inline-flex flex-col justify-center items-center w-11 h-11 rounded border border-[#2a2a2a]/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span
          className={`block w-6 h-0.5 bg-[#DC143C] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#DC143C] mt-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
            menuOpen ? "-rotate-45 -translate-y-1" : ""
          }`}
        />
      </button>


      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 380, damping: 30, mass: 0.9 }
            }
            className="md:hidden pointer-events-auto absolute top-[72px] left-0 right-0 px-6 origin-top"
          >
            <div className="glass relative rounded-xl p-4">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
                  },
                }}
                className="flex flex-col gap-3 font-mono text-sm"
              >
                {navItems.map((link) => (
                  <motion.li
                    key={link}
                    variants={{
                      hidden: { opacity: 0, y: -6 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 520, damping: 32 },
                      },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate(link)}
                      className="w-full text-left text-[#DC143C] hover:text-[#DC143C]/70 transition-colors cursor-pointer uppercase tracking-widest"
                    >
                      {link}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
