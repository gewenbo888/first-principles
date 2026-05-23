"use client";

import { useMemo, useState } from "react";
import { T, useLang, type Bi } from "./lang";

/* ------------------------------------------------------------------ *
 * The 7 axes of first-principles capacity.
 * ------------------------------------------------------------------ */
type Axis = {
  key: string;
  name: Bi;
  short: Bi; // terse vertex label
  gloss: Bi; // one-line legend gloss
};

const AXES: Axis[] = [
  {
    key: "decomposition",
    name: { en: "Decomposition", zh: "分解" },
    short: { en: "Decompose", zh: "分解" },
    gloss: {
      en: "Breaking a whole into its constituent parts.",
      zh: "把整体拆解为构成它的部分。",
    },
  },
  {
    key: "assumptions",
    name: { en: "Assumption-surfacing", zh: "识别假设" },
    short: { en: "Assumptions", zh: "识别假设" },
    gloss: {
      en: "Making hidden beliefs explicit and inspectable.",
      zh: "把隐藏的信念显式化、可审视。",
    },
  },
  {
    key: "reduction",
    name: { en: "Reduction to invariants", zh: "还原至不变量" },
    short: { en: "Invariants", zh: "不变量" },
    gloss: {
      en: "Finding what cannot be reduced further — the physics, the conserved quantities.",
      zh: "找到无法再被还原的东西——物理定律与守恒量。",
    },
  },
  {
    key: "reconstruction",
    name: { en: "Reconstruction", zh: "重建" },
    short: { en: "Rebuild", zh: "重建" },
    gloss: {
      en: "Rebuilding a better whole from the parts.",
      zh: "用这些部分重新组装出更好的整体。",
    },
  },
  {
    key: "quantification",
    name: { en: "Quantification", zh: "量化" },
    short: { en: "Quantify", zh: "量化" },
    gloss: {
      en: "Putting numbers on each piece.",
      zh: "为每一个部分赋予数字。",
    },
  },
  {
    key: "analogyResistance",
    name: { en: "Analogy-resistance", zh: "抗类比" },
    short: { en: "Anti-analogy", zh: "抗类比" },
    gloss: {
      en: "Refusing “it’s done this way because that’s how it’s done”.",
      zh: "拒绝“因为一向如此，所以就该如此”。",
    },
  },
  {
    key: "iteration",
    name: { en: "Iteration", zh: "迭代" },
    short: { en: "Iterate", zh: "迭代" },
    gloss: {
      en: "Re-running the loop as truths are revised.",
      zh: "当真相被修正时，重新跑一遍整个循环。",
    },
  },
];

/* Reference profiles, indexed in the same order as AXES. */
const ANALOGICAL = [30, 25, 20, 55, 55, 15, 55];
const FIRST_PRINCIPLES = [92, 88, 95, 85, 80, 90, 86];

/* ------------------------------------------------------------------ *
 * Geometry helpers — a regular 7-gon, first vertex pointing up.
 * ------------------------------------------------------------------ */
const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 188;
const RINGS = [20, 40, 60, 80, 100];

function pointFor(index: number, value: number): [number, number] {
  const angle = (Math.PI * 2 * index) / AXES.length - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];
}

function polygon(values: number[]): string {
  return values.map((v, i) => pointFor(i, v).join(",")).join(" ");
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */
export default function FPRadar() {
  const { lang } = useLang();

  const [you, setYou] = useState<number[]>(() => AXES.map(() => 50));
  const [showAnalogical, setShowAnalogical] = useState(true);
  const [showFP, setShowFP] = useState(true);

  const setAxis = (i: number, v: number) =>
    setYou((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });

  const score = useMemo(
    () => Math.round(you.reduce((a, b) => a + b, 0) / you.length),
    [you]
  );

  const band: { label: Bi; cls: string } = useMemo(() => {
    if (score < 40)
      return {
        label: { en: "Mostly reasoning by analogy", zh: "主要在类比推理" },
        cls: "node-text",
      };
    if (score < 70)
      return {
        label: { en: "A mixed reasoner", zh: "混合型思考者" },
        cls: "axiom-text",
      };
    return {
      label: { en: "Reasoning from fundamentals", zh: "在从根本出发推理" },
      cls: "spark-text",
    };
  }, [score]);

  return (
    <section className="holo rounded-2xl p-5 md:p-8">
      {/* Header */}
      <header className="mb-6">
        <div className="label-mono text-axiom-400/70">
          <T v={{ en: "META-MODEL", zh: "元模型" }} />
        </div>
        <h2 className="display mt-1 text-2xl md:text-3xl text-ghost-100">
          <T v={{ en: "First-Principles Capacity", zh: "第一性原理能力" }} />
        </h2>
        <p className="serif mt-2 max-w-2xl text-sm md:text-base text-ghost-300">
          <T
            v={{
              en: "Seven axes that separate reasoning from analogy from reasoning from fundamentals. Drive the gold profile to plot yourself.",
              zh: "七条轴，将“从类比推理”与“从根本出发推理”区分开来。拖动金色轮廓，标出你自己的位置。",
            }}
          />
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        {/* ----------------------------- RADAR ----------------------------- */}
        <div className="min-w-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-auto w-full"
            role="img"
            aria-label={
              lang === "zh"
                ? "第一性原理能力雷达图"
                : "First-principles capacity radar chart"
            }
          >
            <defs>
              <radialGradient id="fpr-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b76e0" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#3b76e0" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#fpr-glow)" />

            {/* concentric rings (blueprint) */}
            {RINGS.map((ring) => (
              <polygon
                key={ring}
                points={polygon(AXES.map(() => ring))}
                fill="none"
                stroke="#5b9dff"
                strokeOpacity={ring === 100 ? 0.28 : 0.12}
                strokeWidth={ring === 100 ? 1.2 : 1}
              />
            ))}

            {/* ring value labels along the up-spoke */}
            {RINGS.map((ring) => {
              const [, y] = pointFor(0, ring);
              return (
                <text
                  key={`lbl-${ring}`}
                  x={CENTER + 6}
                  y={y + 3}
                  className="mono"
                  fontSize={9}
                  fill="#5b9dff"
                  fillOpacity={0.4}
                >
                  {ring}
                </text>
              );
            })}

            {/* spokes */}
            {AXES.map((ax, i) => {
              const [x, y] = pointFor(i, 100);
              return (
                <line
                  key={ax.key}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke="#5b9dff"
                  strokeOpacity={0.18}
                  strokeWidth={1}
                />
              );
            })}

            {/* Analogical thinker — violet */}
            {showAnalogical && (
              <polygon
                points={polygon(ANALOGICAL)}
                fill="#b07cff"
                fillOpacity={0.16}
                stroke="#b07cff"
                strokeOpacity={0.7}
                strokeWidth={1.5}
              />
            )}

            {/* First-principles thinker — blue */}
            {showFP && (
              <polygon
                points={polygon(FIRST_PRINCIPLES)}
                fill="#3b76e0"
                fillOpacity={0.16}
                stroke="#5b9dff"
                strokeOpacity={0.85}
                strokeWidth={1.5}
              />
            )}

            {/* You — gold */}
            <polygon
              points={polygon(you)}
              fill="#ffb454"
              fillOpacity={0.22}
              stroke="#ffb454"
              strokeOpacity={0.95}
              strokeWidth={2}
            />
            {you.map((v, i) => {
              const [x, y] = pointFor(i, v);
              return (
                <circle
                  key={`you-dot-${i}`}
                  cx={x}
                  cy={y}
                  r={3.5}
                  fill="#ffdca6"
                  stroke="#e0921f"
                  strokeWidth={1}
                />
              );
            })}

            {/* vertex labels */}
            {AXES.map((ax, i) => {
              const [x, y] = pointFor(i, 117);
              const dx = x - CENTER;
              const anchor =
                Math.abs(dx) < 14 ? "middle" : dx > 0 ? "start" : "end";
              return (
                <text
                  key={`vx-${ax.key}`}
                  x={x}
                  y={y + 3}
                  textAnchor={anchor as "start" | "middle" | "end"}
                  className={lang === "zh" ? "zh mono" : "mono"}
                  fontSize={12}
                  fill="#aecfff"
                >
                  {ax.short[lang]}
                </text>
              );
            })}
          </svg>

          {/* legend */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <button
              type="button"
              onClick={() => setShowAnalogical((s) => !s)}
              className={`flex items-center gap-2 transition ${
                showAnalogical ? "opacity-100" : "opacity-40"
              }`}
              aria-pressed={showAnalogical}
            >
              <span className="inline-block h-3 w-3 rounded-sm border border-node-300/70 bg-node-500/40" />
              <span className={lang === "zh" ? "zh text-ghost-300" : "text-ghost-300"}>
                <T v={{ en: "Analogical thinker", zh: "类比型思考者" }} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowFP((s) => !s)}
              className={`flex items-center gap-2 transition ${
                showFP ? "opacity-100" : "opacity-40"
              }`}
              aria-pressed={showFP}
            >
              <span className="inline-block h-3 w-3 rounded-sm border border-axiom-400/70 bg-axiom-500/40" />
              <span className={lang === "zh" ? "zh text-ghost-300" : "text-ghost-300"}>
                <T v={{ en: "First-principles thinker", zh: "第一性原理思考者" }} />
              </span>
            </button>

            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm border border-spark-400/80 bg-spark-500/60" />
              <span className={lang === "zh" ? "zh text-ghost-200" : "text-ghost-200"}>
                <T v={{ en: "You", zh: "你" }} />
              </span>
            </span>
          </div>
        </div>

        {/* --------------------------- CONTROLS --------------------------- */}
        <div className="min-w-0">
          {/* score */}
          <div className="mb-5 rounded-xl border border-ghost-700/40 bg-void-900/40 p-4">
            <div className="label-mono text-ghost-500">
              <T v={{ en: "YOUR SCORE", zh: "你的得分" }} />
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`display text-5xl md:text-6xl ${band.cls}`}>
                {score}
              </span>
              <span className="mono text-ghost-500 text-sm">/ 100</span>
            </div>
            <div className={`mt-1 text-sm ${band.cls}`}>
              <T v={band.label} />
            </div>
          </div>

          {/* sliders */}
          <div className="space-y-4">
            {AXES.map((ax, i) => (
              <div key={ax.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <label
                    htmlFor={`fpr-${ax.key}`}
                    className={`text-sm text-ghost-200 ${
                      lang === "zh" ? "zh" : ""
                    }`}
                  >
                    {ax.name[lang]}
                  </label>
                  <span className="mono text-xs spark-text tabular-nums">
                    {you[i]}
                  </span>
                </div>
                <input
                  id={`fpr-${ax.key}`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={you[i]}
                  onChange={(e) => setAxis(i, Number(e.target.value))}
                  className="fpr-slider mt-1.5 w-full"
                  aria-label={ax.name[lang]}
                />
                <p
                  className={`mt-1 text-[0.7rem] leading-snug text-ghost-500 ${
                    lang === "zh" ? "zh" : ""
                  }`}
                >
                  {ax.gloss[lang]}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setYou(AXES.map(() => 50))}
            className="mono mt-5 rounded-md border border-ghost-700/50 px-3 py-1.5 text-xs text-ghost-300 transition hover:border-axiom-400/60 hover:text-axiom-300"
          >
            <T v={{ en: "Reset", zh: "重置" }} />
          </button>
        </div>
      </div>

      {/* slider styling — scoped via a unique class */}
      <style jsx>{`
        .fpr-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(255, 180, 84, 0.55),
            rgba(91, 157, 255, 0.25)
          );
          outline: none;
          cursor: pointer;
        }
        .fpr-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ffc878;
          border: 2px solid #e0921f;
          box-shadow: 0 0 8px rgba(255, 180, 84, 0.45);
          cursor: pointer;
        }
        .fpr-slider::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #ffc878;
          border: 2px solid #e0921f;
          box-shadow: 0 0 8px rgba(255, 180, 84, 0.45);
          cursor: pointer;
        }
        .fpr-slider:focus-visible {
          outline: 1px solid rgba(130, 182, 255, 0.6);
          outline-offset: 4px;
        }
      `}</style>
    </section>
  );
}
