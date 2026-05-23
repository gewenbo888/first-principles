"use client";

import { useState } from "react";
import { T, useLang, type Bi } from "./lang";

type ModeKey = "first" | "analogy" | "heuristic";

type Mode = {
  key: ModeKey;
  label: Bi;
  accent: string; // text color class for active label
  ring: string; // border color when active
  glow: string; // soft bg tint when active
  dot: string; // small marker color
  definition: Bi;
  steps: Bi[];
  strengths: Bi;
  failure: Bi;
};

const MODES: Mode[] = [
  {
    key: "first",
    label: { en: "First Principles", zh: "第一性原理" },
    accent: "text-axiom-300",
    ring: "border-axiom-500/60",
    glow: "bg-axiom-500/10",
    dot: "bg-axiom-500",
    definition: {
      en: "Break the problem down to the irreducible truths that cannot be deduced from anything else, then rebuild upward only from those.",
      zh: "把问题拆解到无法再由其他事物推导出来的不可约真理，再仅凭这些地基重新向上构建。",
    },
    steps: [
      {
        en: "Doubt the price. Refuse the inherited number; ask what it must be made of.",
        zh: "怀疑价格。拒绝沿用的数字，追问它究竟由什么构成。",
      },
      {
        en: "Decompose to physics & materials: the raw cost of cobalt, nickel, steel, energy — priced per kilogram, not per product.",
        zh: "拆解到物理与材料：钴、镍、钢、能源的原料成本——按公斤计价，而非按成品计价。",
      },
      {
        en: "Sum the floor: add the minimum each primitive demands. This is the true cost ceiling that nature imposes.",
        zh: "求和得地板价：把每个基本要素的最低需求相加，得到自然强加的真实成本下限。",
      },
      {
        en: "Rebuild upward: reconstruct the product from that floor — and the gap to today's price becomes opportunity.",
        zh: "向上重建：从这个地板价重新构造产品——与今天价格之间的差距即是机会。",
      },
    ],
    strengths: {
      en: "Can reach answers nobody else sees, because it ignores the consensus and consults reality directly.",
      zh: "能抵达无人看见的答案，因为它无视共识，直接向现实求证。",
    },
    failure: {
      en: "Slow and effortful. It demands real knowledge of the domain and the patience to derive what others simply copy.",
      zh: "缓慢且费力。它要求对领域的真实理解，以及推导他人径直照搬之物的耐心。",
    },
  },
  {
    key: "analogy",
    label: { en: "Reasoning by Analogy", zh: "类比推理" },
    accent: "text-node-300",
    ring: "border-node-500/60",
    glow: "bg-node-500/10",
    dot: "bg-node-500",
    definition: {
      en: "Solve the new problem by mapping it onto an old one already solved: 'this is like X, so do what worked for X.'",
      zh: "通过把新问题映射到已解决的旧问题上来作答：“这就像 X，所以照搬 X 的做法。”",
    },
    steps: [
      {
        en: "Find a familiar case: 'a battery pack is like every other battery pack on the market.'",
        zh: "找一个熟悉的先例：“电池组就和市面上所有别的电池组一样。”",
      },
      {
        en: "Copy its template: adopt its supplier list, its margins, its assumed price band.",
        zh: "复制它的模板：照搬它的供应商清单、利润率与默认价格区间。",
      },
      {
        en: "Adjust at the margin: tweak a few percent up or down to fit the new context.",
        zh: "在边际上微调：上下浮动几个百分点，以适配新情境。",
      },
    ],
    strengths: {
      en: "Fast and cheap. Reuses hard-won prior knowledge and is usually 'close enough' in stable domains.",
      zh: "快速且省力。复用来之不易的既有知识，在稳定领域通常“足够接近”。",
    },
    failure: {
      en: "You inherit everyone else's assumptions — including their mistakes — so you can only ever plateau near the herd.",
      zh: "你继承了所有人的假设——连同他们的错误——因此只能在群体附近停滞，无法真正突破。",
    },
  },
  {
    key: "heuristic",
    label: { en: "Heuristics", zh: "启发式" },
    accent: "text-spark-300",
    ring: "border-spark-500/60",
    glow: "bg-spark-500/10",
    dot: "bg-spark-500",
    definition: {
      en: "Skip the analysis with a rule of thumb that jumps straight to a good-enough answer most of the time.",
      zh: "用经验法则跳过分析，多数时候直接跳到一个“足够好”的答案。",
    },
    steps: [
      {
        en: "Reach for a shortcut: 'good gear is expensive — so a fair price is whatever the brand asks.'",
        zh: "抓取一条捷径：“好东西就是贵——所以品牌报多少就是合理价。”",
      },
      {
        en: "Anchor and round: latch onto the first number seen and adjust by feel.",
        zh: "锚定并取整：抓住看到的第一个数字，凭感觉调整。",
      },
      {
        en: "Commit fast: accept the first answer that feels acceptable and move on.",
        zh: "快速定论：接受第一个感觉过得去的答案，然后继续前进。",
      },
    ],
    strengths: {
      en: "Almost instant and nearly free of cognitive cost — invaluable under time pressure or low stakes.",
      zh: "几乎瞬时完成、近乎零认知成本——在时间紧迫或低风险时极其宝贵。",
    },
    failure: {
      en: "Systematically bias-prone: anchoring, availability, and authority quietly steer you to a wrong but comfortable number.",
      zh: "系统性地易受偏误左右：锚定、可得性与权威效应悄然把你引向一个错误却舒适的数字。",
    },
  },
];

/* ── Per-mode SVG diagram metaphors ───────────────────────────────────── */

function FirstPrinciplesDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="Pyramid built up from foundation blocks to a gold capstone">
      <defs>
        <linearGradient id="rm-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdca6" />
          <stop offset="100%" stopColor="#e0921f" />
        </linearGradient>
      </defs>
      {/* foundation blocks (base truths) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`base-${i}`}
          x={20 + i * 56}
          y={150}
          width={50}
          height={30}
          rx={3}
          fill="none"
          stroke="#5b9dff"
          strokeWidth={1.5}
          className="rise-in"
          style={{ animationDelay: `${i * 70}ms` }}
        />
      ))}
      {/* second tier */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`t2-${i}`}
          x={48 + i * 56}
          y={114}
          width={50}
          height={28}
          rx={3}
          fill="rgba(91,157,255,0.08)"
          stroke="#5b9dff"
          strokeWidth={1.5}
          className="rise-in"
          style={{ animationDelay: `${360 + i * 70}ms` }}
        />
      ))}
      {/* third tier */}
      {[0, 1, 2].map((i) => (
        <rect
          key={`t3-${i}`}
          x={76 + i * 56}
          y={80}
          width={50}
          height={26}
          rx={3}
          fill="rgba(91,157,255,0.14)"
          stroke="#aecfff"
          strokeWidth={1.5}
          className="rise-in"
          style={{ animationDelay: `${640 + i * 70}ms` }}
        />
      ))}
      {/* capstone (synthesized answer) */}
      <path
        d="M160 24 L196 64 L124 64 Z"
        fill="url(#rm-cap)"
        stroke="#ffdca6"
        strokeWidth={1.5}
        className="rise-in"
        style={{ animationDelay: "900ms" }}
      />
      {/* rising guide line */}
      <line x1="160" y1="180" x2="160" y2="64" stroke="#3b76e0" strokeWidth="1" className="flow" opacity="0.5" />
      <text x="160" y="196" textAnchor="middle" className="label-mono" fill="#8aa0c8" fontSize="9">
        base truths
      </text>
      <text x="160" y="18" textAnchor="middle" className="label-mono" fill="#ffdca6" fontSize="9">
        derived answer
      </text>
    </svg>
  );
}

function AnalogyDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="A solved template copied across to a new problem box">
      <defs>
        <marker id="rm-copyarrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
          <path d="M0 0 L7 3 L0 6 Z" fill="#b07cff" />
        </marker>
      </defs>
      {/* source: solved template */}
      <rect x="30" y="60" width="100" height="80" rx="6" fill="rgba(139,83,230,0.14)" stroke="#b07cff" strokeWidth="1.5" className="rise-in" />
      <text x="80" y="48" textAnchor="middle" className="label-mono" fill="#ddc4ff" fontSize="9">
        known case X
      </text>
      {/* pattern marks inside source */}
      <line x1="46" y1="84" x2="114" y2="84" stroke="#b07cff" strokeWidth="1.5" opacity="0.7" />
      <line x1="46" y1="100" x2="114" y2="100" stroke="#b07cff" strokeWidth="1.5" opacity="0.5" />
      <line x1="46" y1="116" x2="100" y2="116" stroke="#b07cff" strokeWidth="1.5" opacity="0.35" />
      {/* copy arrow */}
      <path d="M132 100 C 162 80, 168 80, 188 100" fill="none" stroke="#b07cff" strokeWidth="1.6" markerEnd="url(#rm-copyarrow)" className="flow" />
      <text x="160" y="78" textAnchor="middle" className="label-mono" fill="#b07cff" fontSize="9">
        copy
      </text>
      {/* target: new problem, pattern duplicated (dashed = borrowed) */}
      <rect x="190" y="60" width="100" height="80" rx="6" fill="none" stroke="#b07cff" strokeWidth="1.5" strokeDasharray="5 5" className="rise-in" style={{ animationDelay: "200ms" }} />
      <text x="240" y="48" textAnchor="middle" className="label-mono" fill="#ddc4ff" fontSize="9">
        new problem
      </text>
      <line x1="206" y1="84" x2="274" y2="84" stroke="#b07cff" strokeWidth="1.5" opacity="0.7" strokeDasharray="4 4" />
      <line x1="206" y1="100" x2="274" y2="100" stroke="#b07cff" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" />
      <line x1="206" y1="116" x2="260" y2="116" stroke="#b07cff" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 4" />
      <text x="160" y="172" textAnchor="middle" className="label-mono" fill="#8aa0c8" fontSize="9">
        &quot;it&apos;s like X, so do what X did&quot;
      </text>
    </svg>
  );
}

function HeuristicDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="A dashed shortcut arc jumping from the problem straight to a good-enough answer">
      <defs>
        <marker id="rm-shortarrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
          <path d="M0 0 L7 3 L0 6 Z" fill="#ffb454" />
        </marker>
      </defs>
      {/* problem node */}
      <circle cx="46" cy="150" r="20" fill="rgba(224,146,31,0.14)" stroke="#ffb454" strokeWidth="1.5" className="rise-in" />
      <text x="46" y="186" textAnchor="middle" className="label-mono" fill="#ffdca6" fontSize="9">
        problem
      </text>
      {/* the skipped middle (faint full analysis path) */}
      {[110, 160, 210].map((cx, i) => (
        <circle key={`skip-${i}`} cx={cx} cy={150 - i * 0} r="9" fill="none" stroke="#5b7090" strokeWidth="1" strokeDasharray="2 4" opacity="0.45" />
      ))}
      <text x="160" y="178" textAnchor="middle" className="label-mono" fill="#5b7090" fontSize="8.5" opacity="0.7">
        ( analysis skipped )
      </text>
      {/* answer node */}
      <circle cx="274" cy="150" r="20" fill="url(#rm-ans)" stroke="#ffb454" strokeWidth="1.5" className="rise-in" style={{ animationDelay: "200ms" }} />
      <defs>
        <radialGradient id="rm-ans">
          <stop offset="0%" stopColor="rgba(255,180,84,0.4)" />
          <stop offset="100%" stopColor="rgba(224,146,31,0.1)" />
        </radialGradient>
      </defs>
      <text x="274" y="186" textAnchor="middle" className="label-mono" fill="#ffdca6" fontSize="9">
        good enough
      </text>
      {/* the shortcut: high curved dashed jump over the middle */}
      <path
        d="M62 138 C 120 30, 200 30, 258 138"
        fill="none"
        stroke="#ffb454"
        strokeWidth="2"
        strokeDasharray="7 6"
        markerEnd="url(#rm-shortarrow)"
        className="flow"
      />
      <text x="160" y="44" textAnchor="middle" className="label-mono" fill="#ffb454" fontSize="9">
        shortcut
      </text>
    </svg>
  );
}

/* ── Ontology / Epistemology glyphs ───────────────────────────────────── */

function OntologyGlyph() {
  // irreducible "furniture" — a few atomic primitives that cannot be split
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="img" aria-label="Irreducible primitives">
      <circle cx="22" cy="24" r="9" fill="rgba(91,157,255,0.18)" stroke="#5b9dff" strokeWidth="1.4" />
      <rect x="34" y="18" width="16" height="16" rx="3" fill="rgba(91,157,255,0.1)" stroke="#5b9dff" strokeWidth="1.4" />
      <path d="M32 40 L24 54 L40 54 Z" fill="rgba(91,157,255,0.14)" stroke="#aecfff" strokeWidth="1.4" />
      <circle cx="22" cy="24" r="2" fill="#aecfff" />
    </svg>
  );
}

function EpistemologyGlyph() {
  // how we know — an eye / lens over a justified line
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" role="img" aria-label="Justification and knowing">
      <path d="M8 32 C 18 16, 46 16, 56 32 C 46 48, 18 48, 8 32 Z" fill="rgba(255,180,84,0.08)" stroke="#ffb454" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="9" fill="rgba(255,180,84,0.12)" stroke="#ffb454" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="3.5" fill="#ffdca6" />
      <line x1="32" y1="32" x2="49" y2="20" stroke="#ffdca6" strokeWidth="1.2" strokeDasharray="2 3" />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function ReasoningModes() {
  const { lang } = useLang();
  const [active, setActive] = useState<ModeKey>("first");
  const mode = MODES.find((m) => m.key === active) ?? MODES[0];

  const stepHeading: Bi = { en: "How it attacks the problem", zh: "它如何攻克问题" };
  const defHeading: Bi = { en: "Definition", zh: "定义" };
  const strHeading: Bi = { en: "Strengths", zh: "优点" };
  const failHeading: Bi = { en: "Failure mode", zh: "失效之处" };

  const Diagram =
    active === "first" ? FirstPrinciplesDiagram : active === "analogy" ? AnalogyDiagram : HeuristicDiagram;

  return (
    <section className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
      {/* eyebrow */}
      <div className="mb-3 flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${mode.dot} transition-colors`} />
        <span className="label-mono text-ghost-500">
          <T v={{ en: "THREE WAYS TO THINK · ONE PROBLEM", zh: "三种思考方式 · 同一个问题" }} />
        </span>
      </div>

      <h2 className="display text-balance text-3xl text-ghost-100 sm:text-4xl">
        <T v={{ en: "Reasoning Modes", zh: "推理模式" }} />
      </h2>

      {/* shared problem */}
      <div className="rule-fp mt-6 max-w-3xl border-l-2 border-axiom-500/40 pl-4">
        <p className="label-mono mb-1 text-ghost-500">
          <T v={{ en: "THE SHARED PROBLEM", zh: "共同的问题" }} />
        </p>
        <p className="serif text-lg leading-relaxed text-ghost-200 sm:text-xl">
          <T
            v={{
              en: "Why does this battery pack cost what it costs — and could it cost far less?",
              zh: "这块电池组为何是这个价——它能否便宜得多？",
            }}
          />
        </p>
      </div>

      {/* segmented control / tabs */}
      <div role="tablist" aria-label="Reasoning modes" className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {MODES.map((m) => {
          const isActive = m.key === active;
          return (
            <button
              key={m.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(m.key)}
              className={[
                "group flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all duration-300",
                isActive
                  ? `${m.ring} ${m.glow}`
                  : "border-void-700 bg-void-900/40 hover:border-void-600",
              ].join(" ")}
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${
                  isActive ? m.dot : "bg-void-600 group-hover:bg-void-600"
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive ? m.accent : "text-ghost-500 group-hover:text-ghost-300"
                } ${lang === "zh" ? "zh" : ""}`}
              >
                {m.label[lang]}
              </span>
            </button>
          );
        })}
      </div>

      {/* active mode panel */}
      <div
        key={active}
        role="tabpanel"
        className="holo rise-in mt-6 grid grid-cols-1 gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* text column */}
        <div>
          {/* (a) definition */}
          <div>
            <p className="label-mono text-ghost-500">
              <T v={defHeading} />
            </p>
            <p className={`serif mt-1.5 text-lg leading-relaxed ${mode.accent}`}>
              <T v={mode.definition} />
            </p>
          </div>

          {/* (b) attack steps */}
          <div className="mt-6">
            <p className="label-mono mb-3 text-ghost-500">
              <T v={stepHeading} />
            </p>
            <ol className="space-y-3">
              {mode.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`mono mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${mode.ring} ${mode.accent}`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ghost-200">
                    <T v={s} />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* (c) + (d) strengths / failure */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-void-700 bg-void-900/40 p-4">
              <p className="label-mono mb-1.5 text-axiom-400/80">
                <T v={strHeading} />
              </p>
              <p className="text-sm leading-relaxed text-ghost-300">
                <T v={mode.strengths} />
              </p>
            </div>
            <div className="rounded-xl border border-spark-600/30 bg-spark-600/[0.06] p-4">
              <p className="label-mono mb-1.5 text-spark-300/90">
                <T v={failHeading} />
              </p>
              <p className="text-sm leading-relaxed text-ghost-300">
                <T v={mode.failure} />
              </p>
            </div>
          </div>
        </div>

        {/* (e) diagram column */}
        <div className="flex flex-col">
          <p className="label-mono mb-2 text-ghost-500">
            <T v={{ en: "THE SHAPE OF THE METHOD", zh: "方法的形状" }} />
          </p>
          <div className="grid-bg flex flex-1 items-center justify-center rounded-xl border border-void-700 bg-void-950/60 p-4">
            <Diagram />
          </div>
          <p className="mono mt-2 text-center text-[0.7rem] text-ghost-500">
            <T
              v={{
                first: { en: "Build up from base truths.", zh: "从地基真理向上构建。" },
                analogy: { en: "Copy a template sideways.", zh: "横向复制一个模板。" },
                heuristic: { en: "Jump straight to good-enough.", zh: "径直跳到足够好。" },
              }[active]}
            />
          </p>
        </div>
      </div>

      {/* ── Ontology / Epistemology explainer ─────────────────────────── */}
      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="rule-fp h-px flex-1" />
          <span className="label-mono text-ghost-500">
            <T v={{ en: "WHAT FIRST PRINCIPLES RESTS ON", zh: "第一性原理的根基" }} />
          </span>
          <span className="rule-fp h-px flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Ontology */}
          <div className="holo rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <OntologyGlyph />
              <div>
                <h3 className="display text-xl text-axiom-300">
                  <T v={{ en: "Ontology", zh: "本体论" }} />
                </h3>
                <p className="label-mono mt-0.5 text-ghost-500">
                  <T v={{ en: "WHAT EXISTS", zh: "何物存在" }} />
                </p>
              </div>
            </div>
            <p className="serif mt-4 leading-relaxed text-ghost-200">
              <T
                v={{
                  en: "Ontology asks what the irreducible furniture of a domain really is — the entities your reasoning bottoms out in once every label and convention is stripped away. First-principles thinking takes ontology seriously: it insists on finding the real primitives instead of the names we casually assign them.",
                  zh: "本体论追问一个领域真正不可约的“家具”是什么——即剥去一切标签与约定之后，你的推理最终落地所依凭的实体。第一性原理认真对待本体论：它坚持去寻找真实的基本要素，而非我们随手贴上的称谓。",
                }}
              />
            </p>
          </div>

          {/* Epistemology */}
          <div className="holo rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <EpistemologyGlyph />
              <div>
                <h3 className="display text-xl text-spark-300">
                  <T v={{ en: "Epistemology", zh: "认识论" }} />
                </h3>
                <p className="label-mono mt-0.5 text-ghost-500">
                  <T v={{ en: "HOW WE KNOW", zh: "如何知晓" }} />
                </p>
              </div>
            </div>
            <p className="serif mt-4 leading-relaxed text-ghost-200">
              <T
                v={{
                  en: "Epistemology asks how a belief earns the status of truth — what actually justifies a claim rather than merely making it feel familiar. First-principles thinking is rigorous here: it refuses to accept any assumption it cannot independently justify, no matter how many others already take it for granted.",
                  zh: "认识论追问一个信念凭什么取得“真理”的资格——究竟是什么真正为一个主张提供辩护，而非仅仅让它显得熟悉。第一性原理在此格外严格：它拒绝接受任何无法独立加以辩护的假设，无论已有多少人将其视为理所当然。",
                }}
              />
            </p>
          </div>
        </div>

        {/* synthesis line */}
        <p className="serif mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-ghost-300">
          <T
            v={{
              en: "To reason from first principles is to take ontology seriously and epistemology rigorously: find the real primitives, then accept nothing you cannot justify from them.",
              zh: "从第一性原理出发，就是认真对待本体论、严格对待认识论：找到真实的基本要素，然后只接受你能由其推导出来的一切。",
            }}
          />
        </p>
      </div>
    </section>
  );
}
