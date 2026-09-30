"use client";

import { useEffect, useRef, useState } from "react";

// A simulated money-flow trace, laid out in hop bands like Aegis' Pathfinder canvas.
type Kind = "seed" | "wallet" | "exchange" | "mixer" | "flagged" | "bridge";
type Node = { id: number; hop: number; y: number; kind: Kind; addr: string; label: string };
type Edge = { from: number; to: number; weight: number };

const KIND_LABEL: Record<Kind, string> = {
  seed: "Seed address",
  wallet: "Wallet",
  exchange: "Exchange deposit",
  mixer: "Mixer",
  flagged: "Flagged · phishing drainer",
  bridge: "Bridge contract",
};

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function build() {
  const r = rng(42);
  const hex = () =>
    "0x" +
    Array.from({ length: 4 }, () => Math.floor(r() * 16).toString(16)).join("") +
    "…" +
    Array.from({ length: 4 }, () => Math.floor(r() * 16).toString(16)).join("");
  const bands = [1, 3, 4, 4, 3];
  const nodes: Node[] = [];
  const kindsByHop: Kind[][] = [
    ["seed"],
    ["wallet", "flagged", "wallet"],
    ["wallet", "mixer", "wallet", "bridge"],
    ["wallet", "wallet", "flagged", "wallet"],
    ["exchange", "wallet", "exchange"],
  ];
  bands.forEach((count, hop) => {
    for (let i = 0; i < count; i++) {
      const kind = kindsByHop[hop][i];
      nodes.push({
        id: nodes.length,
        hop,
        y: (i + 1) / (count + 1) + (r() - 0.5) * 0.08,
        kind,
        addr: hex(),
        label: KIND_LABEL[kind],
      });
    }
  });
  const edges: Edge[] = [];
  for (let hop = 0; hop < bands.length - 1; hop++) {
    const a = nodes.filter((n) => n.hop === hop);
    const b = nodes.filter((n) => n.hop === hop + 1);
    b.forEach((to, i) => {
      const from = a[Math.min(a.length - 1, Math.floor((i / b.length) * a.length))];
      edges.push({ from: from.id, to: to.id, weight: 1 + Math.floor(r() * 4) });
      if (r() > 0.6 && a.length > 1) {
        const alt = a[(a.indexOf(from) + 1) % a.length];
        edges.push({ from: alt.id, to: to.id, weight: 1 });
      }
    });
  }
  return { nodes, edges };
}

const GRAPH = build();

function readVar(el: Element, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim();
}

export default function TraceGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ node: Node; x: number; y: number } | null>(null);
  const hoverRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const hops = 5;

    const pos = (n: Node) => {
      const padX = 28;
      const padY = 22;
      return {
        x: padX + (n.hop / (hops - 1)) * (w - padX * 2),
        y: padY + n.y * (h - padY * 2),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const c = {
        line: readVar(wrap, "--graph-line"),
        node: readVar(wrap, "--graph-node"),
        accent: readVar(wrap, "--accent"),
        danger: readVar(wrap, "--danger"),
        warn: readVar(wrap, "--warn"),
        info: readVar(wrap, "--info"),
        bg: readVar(wrap, "--surface"),
        text: readVar(wrap, "--muted"),
      };
      const elapsed = (t - start) / 1000;
      // Hop-by-hop reveal, then hold, then loop.
      const cycle = 11;
      const phase = reduce ? cycle : elapsed % cycle;
      const revealed = reduce ? hops : Math.min(hops, 1 + phase / 1.1);

      ctx.clearRect(0, 0, w, h);

      // Hop band guides
      ctx.font = "10px " + readVar(document.documentElement, "--font-mono");
      ctx.fillStyle = c.text;
      ctx.textAlign = "center";
      for (let i = 0; i < hops; i++) {
        const x = 28 + (i / (hops - 1)) * (w - 56);
        ctx.strokeStyle = c.line;
        ctx.globalAlpha = 0.35;
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 14);
        ctx.lineTo(x, h - 6);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.8;
        ctx.fillText(i === 0 ? "SEED" : `HOP ${i}`, x, 10);
      }
      ctx.globalAlpha = 1;

      const hovered = hoverRef.current;
      for (const e of GRAPH.edges) {
        const a = GRAPH.nodes[e.from];
        const b = GRAPH.nodes[e.to];
        const prog = Math.max(0, Math.min(1, revealed - b.hop));
        if (prog <= 0) continue;
        const p1 = pos(a);
        const p2 = pos(b);
        const tainted = a.kind === "flagged" || b.kind === "flagged" || a.kind === "mixer";
        const lit = hovered === a.id || hovered === b.id;
        ctx.strokeStyle = tainted ? c.danger : c.line;
        ctx.globalAlpha = lit ? 1 : tainted ? 0.55 : 0.7;
        ctx.lineWidth = 0.8 + e.weight * 0.45;
        const mx = (p1.x + p2.x) / 2;
        const ex = p1.x + (p2.x - p1.x) * prog;
        const ey = p1.y + (p2.y - p1.y) * prog;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        if (prog >= 1) ctx.bezierCurveTo(mx, p1.y, mx, p2.y, p2.x, p2.y);
        else ctx.lineTo(ex, ey);
        ctx.stroke();

        // Value packets flowing along fully-drawn edges
        if (prog >= 1 && !reduce) {
          const speed = 0.35 + e.weight * 0.08;
          const s = (elapsed * speed + e.from * 0.13 + e.to * 0.07) % 1;
          const bez = (u: number, p0: number, q1: number, q2: number, p3: number) =>
            (1 - u) ** 3 * p0 + 3 * (1 - u) ** 2 * u * q1 + 3 * (1 - u) * u * u * q2 + u ** 3 * p3;
          const px = bez(s, p1.x, mx, mx, p2.x);
          const py = bez(s, p1.y, p1.y, p2.y, p2.y);
          ctx.globalAlpha = 1;
          ctx.fillStyle = tainted ? c.danger : c.accent;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        if (e.weight > 2 && prog >= 1 && w > 380) {
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = c.text;
          ctx.font = "9px " + readVar(document.documentElement, "--font-mono");
          ctx.fillText(`×${e.weight * 7}`, mx, (p1.y + p2.y) / 2 - 4);
        }
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;

      for (const n of GRAPH.nodes) {
        const appear = Math.max(0, Math.min(1, revealed - n.hop + 0.3));
        if (appear <= 0) continue;
        const p = pos(n);
        const color =
          n.kind === "seed"
            ? c.accent
            : n.kind === "flagged"
              ? c.danger
              : n.kind === "mixer"
                ? c.warn
                : n.kind === "exchange" || n.kind === "bridge"
                  ? c.info
                  : c.node;
        const rad = (n.kind === "seed" ? 7 : n.kind === "wallet" ? 4.5 : 6) * appear;
        if (n.kind === "flagged" || n.kind === "seed") {
          const pulse = reduce ? 0.5 : (elapsed * 0.9 + n.id * 0.2) % 1;
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - pulse) * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad + pulse * 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = c.bg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad + 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (hovered === n.id) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      if (!reduce) raf = requestAnimationFrame(loop);
    };

    const onMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      let best: Node | null = null;
      let bestD = 14;
      for (const n of GRAPH.nodes) {
        const p = pos(n);
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      hoverRef.current = best ? best.id : null;
      if (best) {
        const p = pos(best);
        setHover({ node: best, x: p.x, y: p.y });
      } else setHover(null);
      if (reduce) draw(performance.now());
    };
    const onLeave = () => {
      hoverRef.current = null;
      setHover(null);
      if (reduce) draw(performance.now());
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(wrap);
    const mo = new MutationObserver(() => reduce && draw(performance.now()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="trace">
      <div className="trace-bar">
        <span className="dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="mono">pathfinder://trace/case-0x1f</span>
        <span className="trace-live mono">
          <b /> live · simulated
        </span>
      </div>
      <div
        className="trace-canvas"
        ref={wrapRef}
        role="img"
        aria-label="Animated illustration of a blockchain transaction trace: funds flow from a seed address through wallets, a mixer and flagged addresses to exchanges."
      >
        <canvas ref={canvasRef} />
        {hover && (
          <div
            className="trace-tip mono"
            style={{ left: hover.x, top: hover.y }}
          >
            <strong>{hover.node.addr}</strong>
            <span>{hover.node.label}</span>
            <span>hop {hover.node.hop}</span>
          </div>
        )}
      </div>
      <div className="trace-legend mono">
        <span><i style={{ background: "var(--accent)" }} />seed</span>
        <span><i style={{ background: "var(--graph-node)" }} />wallet</span>
        <span><i style={{ background: "var(--warn)" }} />mixer</span>
        <span><i style={{ background: "var(--danger)" }} />flagged</span>
        <span><i style={{ background: "var(--info)" }} />exchange / bridge</span>
      </div>
    </div>
  );
}
