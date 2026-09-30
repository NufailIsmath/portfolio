"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { openPalette } from "./CommandPalette";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark mono" aria-hidden>
            NI
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="nav-links">
          {sections.slice(0, 6).map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "on" : ""}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="kbd-btn mono" onClick={openPalette} aria-label="Open command menu">
            <span className="kbd-label">Search</span> <kbd>Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <a href="#contact" className="btn btn-sm btn-primary">
            Hire me
          </a>
        </div>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
    </header>
  );
}
