"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { profile, sections } from "@/lib/data";
import { toggleTheme } from "./ThemeToggle";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return [
      ...sections.map((s) => ({ id: s.id, label: `Go to ${s.label}`, hint: "Navigate", run: go(s.id) })),
      { id: "aegis", label: "Open Aegis case study", hint: "Project", run: go("aegis") },
      {
        id: "copy",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setToast("Email copied");
        },
      },
      { id: "cv", label: "Download CV (PDF)", hint: "File", run: () => window.open(profile.resume, "_blank") },
      { id: "gh", label: "Open GitHub", hint: "Link", run: () => window.open(profile.links.github, "_blank") },
      { id: "li", label: "Open LinkedIn", hint: "Link", run: () => window.open(profile.links.linkedin, "_blank") },
      { id: "md", label: "Read on Medium", hint: "Link", run: () => window.open(profile.links.medium, "_blank") },
      { id: "theme", label: "Toggle light / dark theme", hint: "Appearance", run: toggleTheme },
    ];
  }, []);

  const filtered = commands.filter((c) =>
    (c.label + " " + c.hint).toLowerCase().includes(q.trim().toLowerCase()),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (c: Cmd | undefined) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  return (
    <>
      {open && (
        <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={q}
              placeholder="Type a command or search…"
              aria-label="Search commands"
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(filtered.length - 1, a + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(0, a - 1));
                } else if (e.key === "Enter") run(filtered[active]);
              }}
            />
            <ul role="listbox">
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? "on" : ""}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  <span className="mono">{c.hint}</span>
                </li>
              ))}
              {filtered.length === 0 && <li className="empty">No matches</li>}
            </ul>
            <div className="palette-foot mono">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
