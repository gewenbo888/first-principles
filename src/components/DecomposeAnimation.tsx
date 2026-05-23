"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang, type Bi } from "./lang";

/* ── Phase model ───────────────────────────────────────────────────────────
   0 DECONSTRUCT — one dense composite "Problem" block sits at top center.
   1 ATOMS       — it fractures into 6 labeled atomic chips spread on an arc.
   2 RECONSTRUCT — chips converge upward into a single clean "Solution" block.
   Loop ~9s.                                                                  */

type Phase = 0 | 1 | 2;

const PHASE_MS = 3000; // each phase holds ~3s → ~9s loop

const PHASES: { label: Bi }[] = [
  { label: { en: "Deconstruct", zh: "拆解" } },
  { label: { en: "Atoms", zh: "原子" } },
  { label: { en: "Reconstruct", zh: "重建" } },
];

/* Six atomic units. `kind` drives color: violet = assumption, blue = truth/fact. */
type Kind = "assumption" | "truth";
const ATOMS: { label: Bi; kind: Kind }[] = [
  { label: { en: "Assumption", zh: "假设" }, kind: "assumption" },
  { label: { en: "Base truth", zh: "基本事实" }, kind: "truth" },
  { label: { en: "Constraint", zh: "约束" }, kind: "assumption" },
  { label: { en: "Physical fact", zh: "物理事实" }, kind: "truth" },
  { label: { en: "Cost", zh: "成本" }, kind: "assumption" },
  { label: { en: "Goal", zh: "目标" }, kind: "truth" },
];

/* SVG canvas geometry (viewBox units). */
const VB_W = 920;
const VB_H = 540;
const CX = VB_W / 2;

/* Chip dimensions. */
const CHIP_W = 132;
const CHIP_H = 58;

/* Per-atom resting position on the spread arc (phase 1) and the
   fragment slot inside the problem block (phase 0). */
function atomLayout(i: number) {
  // Arc of 6 chips across the middle band.
  const n = ATOMS.length;
  const spread = VB_W - 220; // total horizontal travel
  const x = CX - spread / 2 + (spread / (n - 1)) * i;
  // gentle downward arc — ends dip lower than center
  const t = (i - (n - 1) / 2) / ((n - 1) / 2); // -1..1
  const y = 286 + t * t * 46;
  return { x, y };
}

/* Fragment slot inside the dense block (2 cols x 3 rows hatched cells). */
function fragmentSlot(i: number) {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const bx = CX - CHIP_W; // block spans ~2*CHIP_W
  const x = bx + col * CHIP_W + CHIP_W / 2;
  const y = 96 + row * 38 + 19;
  return { x, y };
}

export default function DecomposeAnimation() {
  const { lang } = useLang();
  const [phase, setPhase] = useState<Phase>(0);
  const [cycle, setCycle] = useState(0); // bump to force replay
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Drive the loop. Reset to phase 0 immediately on (re)mount / replay,
    // then advance every PHASE_MS.
    setPhase(0);
    let p: Phase = 0;
    timer.current = setInterval(() => {
      p = ((p + 1) % 3) as Phase;
      setPhase(p);
    }, PHASE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [cycle]);

  const replay = () => setCycle((c) => c + 1);

  return (
    <div className="holo rounded-2xl p-4 sm:p-6 grid-bg-fine relative overflow-hidden">
      {/* top rule + eyebrow */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="label-mono">
          <T v={{ en: "First-Principles Engine", zh: "第一性原理引擎" }} />
        </span>
        <button
          onClick={replay}
          className="no-print mono text-[0.7rem] px-3 py-1 rounded-full border border-axiom-500/30 text-ghost-300 hover:text-axiom-300 hover:border-axiom-400/60 transition-colors"
          aria-label={lang === "zh" ? "重播动画" : "Replay animation"}
        >
          ↻ <T v={{ en: "Replay", zh: "重播" }} />
        </button>
      </div>
      <div className="rule-fp mb-4" />

      {/* ── The stage ──────────────────────────────────────────────────── */}
      <div className="w-full">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width="100%"
          className="block h-[440px] sm:h-[480px] lg:h-[520px]"
          role="img"
          aria-label={
            lang === "zh"
              ? "动画：问题拆解为原子化的真理，再重建为解法"
              : "Animation: a problem decomposed into atomic truths, then reassembled into a solution"
          }
        >
          <defs>
            {/* hatch pattern for the dense problem block */}
            <pattern
              id="fp-hatch"
              width="9"
              height="9"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="9" height="9" fill="transparent" />
              <line x1="0" y1="0" x2="0" y2="9" stroke="#5b9dff" strokeWidth="1" strokeOpacity="0.28" />
            </pattern>

            {/* glows */}
            <filter id="fp-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="fp-prob" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#161b2e" />
              <stop offset="100%" stopColor="#0a0d18" />
            </linearGradient>
            <linearGradient id="fp-sol" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3a2c12" />
              <stop offset="100%" stopColor="#1a130a" />
            </linearGradient>
            <radialGradient id="fp-solglow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffb454" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#ffb454" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint baseline guides */}
          <line x1="60" y1="286" x2={VB_W - 60} y2="286" stroke="#1f2640" strokeWidth="1" strokeDasharray="2 8" />

          {/* ── Flow connectors (chips → solution), visible while reconstructing ── */}
          <g
            style={{
              opacity: phase === 2 ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          >
            {ATOMS.map((_, i) => {
              const a = atomLayout(i);
              return (
                <line
                  key={`flow-${i}`}
                  className="flow"
                  x1={a.x}
                  y1={a.y}
                  x2={CX}
                  y2={132}
                  stroke="#ffb454"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
              );
            })}
          </g>

          {/* ── PROBLEM block (phase 0 prominent; recedes as it fractures) ── */}
          <g
            style={{
              opacity: phase === 0 ? 1 : 0,
              transform: phase === 0 ? "scale(1)" : "scale(0.92)",
              transformOrigin: `${CX}px 132px`,
              transition: "opacity 700ms ease, transform 700ms cubic-bezier(.22,1,.36,1)",
            }}
          >
            <rect
              x={CX - CHIP_W}
              y={60}
              width={CHIP_W * 2}
              height={144}
              rx={10}
              fill="url(#fp-prob)"
              stroke="#5b9dff"
              strokeWidth="1.6"
            />
            <rect
              x={CX - CHIP_W}
              y={60}
              width={CHIP_W * 2}
              height={144}
              rx={10}
              fill="url(#fp-hatch)"
            />
            {/* inner sub-divisions — the "density" of an unexamined problem */}
            {Array.from({ length: 5 }).map((_, k) => (
              <line
                key={`pd-${k}`}
                x1={CX - CHIP_W + 14}
                y1={84 + k * 24}
                x2={CX + CHIP_W - 14}
                y2={84 + k * 24}
                stroke="#5b9dff"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            ))}
            <line
              x1={CX}
              y1={70}
              x2={CX}
              y2={194}
              stroke="#5b9dff"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
            <text
              x={CX}
              y={36}
              textAnchor="middle"
              className={`label-mono ${lang === "zh" ? "zh" : ""}`}
              fill="#aecfff"
              style={{ fontSize: 13, letterSpacing: lang === "zh" ? 1 : 2 }}
            >
              {{ en: "PROBLEM", zh: "问题" }[lang]}
            </text>
          </g>

          {/* ── SOLUTION block (phase 2 only): clean, simple, gold ── */}
          <g
            style={{
              opacity: phase === 2 ? 1 : 0,
              transform: phase === 2 ? "translateY(0) scale(1)" : "translateY(22px) scale(0.9)",
              transformOrigin: `${CX}px 110px`,
              transition: "opacity 700ms ease 120ms, transform 760ms cubic-bezier(.22,1,.36,1) 120ms",
            }}
          >
            <ellipse cx={CX} cy={112} rx={170} ry={96} fill="url(#fp-solglow)" />
            <rect
              x={CX - 116}
              y={70}
              width={232}
              height={92}
              rx={12}
              fill="url(#fp-sol)"
              stroke="#ffb454"
              strokeWidth="1.8"
              filter="url(#fp-glow)"
            />
            {/* a single clean dividing line — order from chaos */}
            <line
              x1={CX - 92}
              y1={116}
              x2={CX + 92}
              y2={116}
              stroke="#ffdca6"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <circle cx={CX} cy={96} r={4} fill="#ffdca6" />
            <text
              x={CX}
              y={138}
              textAnchor="middle"
              className={`display ${lang === "zh" ? "zh" : ""}`}
              fill="#ffdca6"
              style={{ fontSize: lang === "zh" ? 22 : 20, letterSpacing: lang === "zh" ? 4 : 1 }}
            >
              {{ en: "SOLUTION", zh: "解法" }[lang]}
            </text>
          </g>

          {/* ── ATOM chips ─────────────────────────────────────────────────
              Phase 0: tucked inside the problem block (low opacity).
              Phase 1: spread out on the arc, fully visible.
              Phase 2: re-converge into the solution position (then fade).   */}
          {ATOMS.map((atom, i) => {
            const spread = atomLayout(i);
            const slot = fragmentSlot(i);

            let x: number;
            let y: number;
            let opacity: number;
            let scale: number;

            if (phase === 0) {
              x = slot.x;
              y = slot.y;
              opacity = 0;
              scale = 0.4;
            } else if (phase === 1) {
              x = spread.x;
              y = spread.y;
              opacity = 1;
              scale = 1;
            } else {
              // reconstruct: pull toward the solution block center
              x = CX;
              y = 116;
              opacity = 0;
              scale = 0.55;
            }

            const isAssumption = atom.kind === "assumption";
            const stroke = isAssumption ? "#b07cff" : "#5b9dff";
            const textFill = isAssumption ? "#ddc4ff" : "#aecfff";
            const fill = isAssumption ? "#160f24" : "#0b1322";

            // staggered delays so the fracture / convergence feels organic
            const delay = phase === 1 ? i * 70 : (ATOMS.length - 1 - i) * 60;

            return (
              <g
                key={`atom-${i}`}
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  opacity,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: `transform 720ms cubic-bezier(.22,1,.36,1) ${delay}ms, opacity 560ms ease ${delay}ms`,
                }}
              >
                <rect
                  x={-CHIP_W / 2}
                  y={-CHIP_H / 2}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx={9}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.5"
                />
                {/* kind tick — left accent bar */}
                <rect
                  x={-CHIP_W / 2}
                  y={-CHIP_H / 2}
                  width={4}
                  height={CHIP_H}
                  rx={2}
                  fill={stroke}
                />
                <text
                  x={0}
                  y={-3}
                  textAnchor="middle"
                  className={`${lang === "zh" ? "zh" : "display"}`}
                  fill={textFill}
                  style={{ fontSize: lang === "zh" ? 16 : 14 }}
                >
                  {atom.label[lang]}
                </text>
                <text
                  x={0}
                  y={16}
                  textAnchor="middle"
                  className="mono"
                  fill={isAssumption ? "#b07cff" : "#5b9dff"}
                  style={{ fontSize: 8.5, letterSpacing: 1.4, opacity: 0.7 }}
                >
                  {isAssumption
                    ? { en: "ASSUMED", zh: "可质疑" }[lang]
                    : { en: "IRREDUCIBLE", zh: "不可约" }[lang]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Phase indicator strip ──────────────────────────────────────── */}
      <div className="mt-5 flex items-center justify-center gap-2 sm:gap-3">
        {PHASES.map((p, i) => {
          const active = phase === i;
          return (
            <div key={`ind-${i}`} className="flex items-center gap-2 sm:gap-3">
              <span
                className={`mono text-[0.68rem] sm:text-xs px-2.5 py-1 rounded-full border transition-all duration-500 ${
                  active
                    ? i === 2
                      ? "border-spark-500/60 text-spark-300 bg-spark-500/10"
                      : i === 1
                      ? "border-node-500/60 text-node-300 bg-node-500/10"
                      : "border-axiom-500/60 text-axiom-300 bg-axiom-500/10"
                    : "border-void-600 text-ghost-500"
                }`}
              >
                <span className="opacity-60 mr-1">{i + 1}</span>
                <T v={p.label} />
              </span>
              {i < PHASES.length - 1 && (
                <span className="text-ghost-500/50 text-xs select-none">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Caption ────────────────────────────────────────────────────── */}
      <p className="serif mt-5 text-center text-sm sm:text-base text-ghost-300 max-w-xl mx-auto leading-relaxed">
        <T
          v={{
            en: "Every solution is assembled from truths you can no longer reduce.",
            zh: "每一个解法，都由你再也无法分解的真理组装而成。",
          }}
        />
      </p>
    </div>
  );
}
