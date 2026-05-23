"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   AxiomField — full-bleed animated blueprint-reactor background for the hero.
   A living lattice of drifting nodes, faint connection lines, a handful of
   glowing "axiom" nodes, pointer reactivity, and a periodic "decomposition
   pulse" that scatters then reforms a cluster. GPU-light, 60fps-friendly.
────────────────────────────────────────────────────────────────────────── */

type Kind = "blue" | "violet" | "gold";

interface Node {
  x: number;
  y: number;
  // base drift velocity
  vx: number;
  vy: number;
  // pointer / pulse displacement offset (eases back to 0)
  ox: number;
  oy: number;
  r: number;
  kind: Kind;
  // per-node phase so glowing rings breathe out of sync
  phase: number;
}

interface Pulse {
  x: number;
  y: number;
  // ring radius, expands over life
  age: number; // 0..1
}

const VOID = "#06080f";
const BLUE = "#5b9dff";
const VIOLET = "#b07cff";
const GOLD = "#ffb454";

const LINK_DIST = 130;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const POINTER_DIST = 160;
const POINTER_DIST_SQ = POINTER_DIST * POINTER_DIST;
const PULSE_INTERVAL = 7000; // ms
const PULSE_LIFE = 1700; // ms

export default function AxiomField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx0 = canvas.getContext("2d", { alpha: false });
    if (!ctx0) return;
    const ctx: CanvasRenderingContext2D = ctx0;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];

    // pointer state (in CSS px, relative to canvas)
    const pointer = { x: -9999, y: -9999, active: false };

    // active pulses (usually 0–2 at a time)
    let pulses: Pulse[] = [];
    let lastPulseAt = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function nodeCount() {
      // scale count with viewport area, clamped to spec range
      const area = width * height;
      const n = Math.round(area / 14000);
      return Math.max(70, Math.min(110, n));
    }

    function buildNodes() {
      const count = nodeCount();
      nodes = [];
      // distribute axiom nodes: ~6 violet, ~6 gold (scaled gently with count)
      const axiomEach = Math.max(4, Math.min(7, Math.round(count / 16)));
      const axiomKinds: Kind[] = [];
      for (let i = 0; i < axiomEach; i++) axiomKinds.push("violet");
      for (let i = 0; i < axiomEach; i++) axiomKinds.push("gold");

      for (let i = 0; i < count; i++) {
        const isAxiom = i < axiomKinds.length;
        const kind: Kind = isAxiom ? axiomKinds[i] : "blue";
        const speed = rand(0.04, 0.16);
        const ang = rand(0, Math.PI * 2);
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          ox: 0,
          oy: 0,
          r: isAxiom ? rand(2.2, 2.8) : rand(1.2, 2.0),
          kind,
          phase: rand(0, Math.PI * 2),
        });
      }
      // shuffle so axiom nodes aren't all clustered in spawn order region
      for (let i = nodes.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const t = nodes[i];
        nodes[i] = nodes[j];
        nodes[j] = t;
      }
    }

    function resize() {
      const parent = canvas.parentElement;
      const cw = parent ? parent.clientWidth : window.innerWidth;
      const ch = parent ? parent.clientHeight : window.innerHeight;
      width = Math.max(1, cw);
      height = Math.max(1, ch);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) {
        buildNodes();
      } else {
        // keep existing field but clamp stray nodes into new bounds
        for (const n of nodes) {
          if (n.x > width) n.x = Math.random() * width;
          if (n.y > height) n.y = Math.random() * height;
        }
      }
    }

    function colorFor(kind: Kind) {
      if (kind === "violet") return VIOLET;
      if (kind === "gold") return GOLD;
      return BLUE;
    }

    // Draw a single static or animated frame.
    function draw(now: number) {
      // background fill (alpha:false context, so paint the void each frame)
      ctx.fillStyle = VOID;
      ctx.fillRect(0, 0, width, height);

      // resolved positions for this frame
      const px = new Array<number>(nodes.length);
      const py = new Array<number>(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        px[i] = n.x + n.ox;
        py[i] = n.y + n.oy;
      }

      // ── 1. connection lines (drawn first, beneath nodes) ──
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const ax = px[i];
        const ay = py[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = ax - px[j];
          const dy = ay - py[j];
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const d = Math.sqrt(d2);
            const t = 1 - d / LINK_DIST; // 1 near, 0 at threshold
            // faint blueprint filaments
            const alpha = 0.16 * t * t;
            if (alpha < 0.012) continue;
            ctx.strokeStyle = `rgba(91,157,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }
      }

      // ── 2. expanding pulse rings (faint) ──
      for (const p of pulses) {
        const t = p.age; // 0..1
        const radius = 8 + t * 150;
        const alpha = 0.28 * (1 - t) * (1 - t);
        if (alpha <= 0.005) continue;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,180,84,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── 3. nodes on top ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = px[i];
        const y = py[i];
        const isAxiom = n.kind !== "blue";

        if (isAxiom) {
          const col = colorFor(n.kind);
          // soft glowing ring — limited count, so shadowBlur is affordable here
          const breathe = 0.5 + 0.5 * Math.sin(now * 0.0018 + n.phase);
          // outer glow ring
          ctx.save();
          ctx.shadowBlur = 8 + breathe * 6;
          ctx.shadowColor = col;
          ctx.beginPath();
          ctx.strokeStyle =
            n.kind === "violet"
              ? `rgba(176,124,255,${(0.45 + 0.25 * breathe).toFixed(3)})`
              : `rgba(255,180,84,${(0.45 + 0.25 * breathe).toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.arc(x, y, n.r + 3.2 + breathe * 1.4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // solid core
          ctx.beginPath();
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.92;
          ctx.arc(x, y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          // ordinary faint blue node
          ctx.beginPath();
          ctx.fillStyle = "rgba(130,182,255,0.55)";
          ctx.arc(x, y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Advance simulation by dt (ms).
    function step(dt: number, now: number) {
      // clamp dt to avoid jumps after tab is backgrounded
      const f = Math.min(dt, 48) / 16.6667; // frame-normalized factor

      // spawn a decomposition pulse on cadence
      if (now - lastPulseAt > PULSE_INTERVAL) {
        lastPulseAt = now;
        const axiomNodes = nodes.filter((n) => n.kind !== "blue");
        if (axiomNodes.length) {
          const a = axiomNodes[(Math.random() * axiomNodes.length) | 0];
          pulses.push({ x: a.x + a.ox, y: a.y + a.oy, age: 0 });
          // scatter nearby nodes radially outward
          for (const n of nodes) {
            const dx = n.x - a.x;
            const dy = n.y - a.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 150 * 150 && d2 > 0.0001) {
              const d = Math.sqrt(d2);
              const force = (1 - d / 150) * 26; // strongest near the axiom
              n.ox += (dx / d) * force;
              n.oy += (dy / d) * force;
            }
          }
        }
      }

      // advance & retire pulses
      if (pulses.length) {
        pulses = pulses.filter((p) => {
          p.age += dt / PULSE_LIFE;
          return p.age < 1;
        });
      }

      const pActive = pointer.active;

      for (const n of nodes) {
        // base slow drift
        n.x += n.vx * f;
        n.y += n.vy * f;

        // wrap softly around edges (with margin so links don't pop)
        const m = 40;
        if (n.x < -m) n.x = width + m;
        else if (n.x > width + m) n.x = -m;
        if (n.y < -m) n.y = height + m;
        else if (n.y > height + m) n.y = -m;

        // pointer reactivity — gentle bend toward cursor when in range
        if (pActive) {
          const dx = pointer.x - (n.x + n.ox);
          const dy = pointer.y - (n.y + n.oy);
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_DIST_SQ && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const pull = (1 - d / POINTER_DIST) * 0.9; // subtle
            n.ox += (dx / d) * pull * f;
            n.oy += (dy / d) * pull * f;
          }
        }

        // ease displacement back toward 0 (collapse → reform)
        const ease = Math.pow(0.92, f);
        n.ox *= ease;
        n.oy *= ease;
      }
    }

    let rafId = 0;
    let prev = performance.now();

    function frame(now: number) {
      const dt = now - prev;
      prev = now;
      step(dt, now);
      draw(now);
      rafId = requestAnimationFrame(frame);
    }

    // ── pointer tracking over the window (mapped into canvas space) ──
    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // only treat as active when within (a generous band around) the canvas
      if (
        x >= -POINTER_DIST &&
        y >= -POINTER_DIST &&
        x <= width + POINTER_DIST &&
        y <= height + POINTER_DIST
      ) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    let resizeRaf = 0;
    function onResize() {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        if (reduceMotion) {
          // re-render the single static frame at new size
          draw(performance.now());
        }
      });
    }

    // init
    resize();

    if (reduceMotion) {
      // one static frame, no animation, no rAF loop
      draw(performance.now());
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
      };
    }

    lastPulseAt = performance.now() - PULSE_INTERVAL * 0.5; // first pulse ~3.5s in
    prev = performance.now();
    rafId = requestAnimationFrame(frame);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full block" aria-hidden="true" />;
}
