"use client";

import { ReactNode } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import { NAV, METHOD, THEORY, COMPANIONS } from "./content";
import AxiomField from "./AxiomField";
import DecomposeAnimation from "./DecomposeAnimation";
import ReasoningModes from "./ReasoningModes";
import HistoryTimeline from "./HistoryTimeline";
import ApplicationCases from "./ApplicationCases";
import DecompositionEngine from "./DecompositionEngine";
import FPRadar from "./FPRadar";
import KnowledgeLibrary from "./KnowledgeLibrary";
import ThinkingSpace from "./ThinkingSpace";

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8">
      <g stroke="#5b9dff" strokeWidth="1.4" opacity="0.85">
        <line x1="16" y1="9" x2="9" y2="20" />
        <line x1="16" y1="9" x2="23" y2="20" />
        <line x1="16" y1="9" x2="16" y2="20" />
      </g>
      <circle cx="16" cy="8" r="3.1" fill="#5b9dff" />
      <circle cx="9" cy="21.5" r="2.3" fill="#b07cff" />
      <circle cx="16" cy="21.5" r="2.3" fill="#ffb454" />
      <circle cx="23" cy="21.5" r="2.3" fill="#ffb454" />
    </svg>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-axiom-500/12 bg-void-950/80 px-5 py-3 backdrop-blur md:px-9">
      <a href="#top" className="flex items-center gap-3">
        <Logo />
        <div className="leading-tight">
          <div className="display text-base text-ghost-50">First Principles</div>
          <div className="zh text-[0.6rem] text-ghost-500">第一性原理</div>
        </div>
      </a>
      <nav className="hidden gap-5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ghost-500 xl:flex">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="hover:text-axiom-300"><T v={n.label} /></a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <LangToggle />
        <a href="https://psyverse.fun" className="hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-node-300 hover:text-axiom-300 sm:block">← Psyverse</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 opacity-90"><AxiomField /></div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-void-950/30 via-transparent to-void-950" />
      <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="label-mono">Psyverse · A thinking engine</div>
          <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ghost-500">
            EN · 中文 · decompose → base truths → reconstruct
          </div>
          <h1 className="display mt-6 text-6xl leading-[0.95] text-ghost-50 md:text-8xl">
            First <span className="axiom-text">Principles</span>
          </h1>
          <h2 className="zh mt-3 text-3xl text-ghost-200 md:text-5xl">第一性原理</h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ghost-100 md:text-xl">
            <T v={{
              en: "Almost everything you believe was inherited, not derived. First-principles thinking is the discipline of breaking a problem down to the truths that cannot be reduced further — then rebuilding the answer from those alone, as if no one had ever solved it before.",
              zh: "你所信的几乎一切，是继承来的，而非推导来的。第一性原理思维，是这样一门修炼：把一个问题分解到那些再也无法被还原的真理——再仅凭它们，重建答案，仿佛此前从未有人解过它。",
            }} />
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#engine" className="rounded-lg border border-axiom-500/50 bg-axiom-500/12 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-axiom-200 transition hover:bg-axiom-500/22">
              <T v={{ en: "Open the engine →", zh: "打开引擎 →" }} />
            </a>
            <a href="#method" className="rounded-lg border border-ghost-700 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ghost-300 transition hover:border-axiom-500/40 hover:text-ghost-100">
              <T v={{ en: "Learn the method", zh: "学习方法" }} />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ghost-500">
            <span>{`6-step method · 六步法`}</span>
            <span>{`live decomposition tool · 实时分解工具`}</span>
            <span>{`Aristotle → Musk`}</span>
          </div>
        </div>

        <div className="w-full"><DecomposeAnimation /></div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, sub, body }: { kicker: string; title: Bi; sub?: Bi; body?: Bi }) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="label-mono">{kicker}</div>
      <h2 className="display mt-3 text-4xl text-ghost-50 md:text-5xl"><T v={title} /></h2>
      {sub && <h3 className="mt-2 text-lg text-axiom-300"><T v={sub} /></h3>}
      <div className="mt-5 h-px rule-fp opacity-50" />
      {body && <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ghost-200"><T v={body} /></p>}
    </div>
  );
}

type Bi = { en: string; zh: string };

function Body() {
  const { lang } = useLang();
  return (
    <main className="relative bg-void-950 text-ghost-100">
      <Header />
      <Hero />

      {/* ticker */}
      <div className="grid-bg border-y border-axiom-500/12 bg-void-900/60 py-2.5 overflow-hidden">
        <div className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.3em] text-node-300/70 ticker inline-block">
          {(lang === "zh"
            ? "厘清问题 · 揭示假设 · 还原至基本真理 · 找出不可约者 · 向上重建 · 量化与迭代 · "
            : "STATE THE PROBLEM · SURFACE ASSUMPTIONS · REDUCE TO BASE TRUTHS · FIND THE IRREDUCIBLE · RECONSTRUCT UPWARD · QUANTIFY & ITERATE · ").repeat(2)}
        </div>
      </div>

      {/* ===== METHOD ===== */}
      <section id="method" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="The method · 方法"
          title={{ en: "The six-step descent and rebuild", zh: "六步：下降，再重建" }}
          sub={{ en: "First principles is a loop you run, not a fact you possess", zh: "第一性原理是你运行的循环，而非你拥有的事实" }}
          body={{
            en: "There is no magic to it — only a sequence stubborn enough to defeat your own shortcuts. You go down to the bedrock, then build back up. Each step has a question; the discipline is refusing to skip one.",
            zh: "其中并无魔法——只有一个足够固执、足以击败你自己捷径的序列。你下降至基岩，再向上建回。每一步都有一个问题；而那纪律，就在于拒绝跳过任何一步。",
          }}
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {METHOD.map((s) => (
            <div key={s.n} className="holo rounded-xl p-5" style={{ borderTopColor: s.accent, borderTopWidth: 2 }}>
              <div className="flex items-baseline gap-3">
                <span className="display text-3xl" style={{ color: s.accent }}>{s.n}</span>
                <span className="display text-lg text-ghost-50"><T v={s.name} /></span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ghost-300"><T v={s.gloss} /></p>
              <p className="mt-3 border-l-2 pl-3 font-mono text-[0.72rem] italic leading-relaxed text-ghost-400" style={{ borderColor: `${s.accent}66` }}>
                <T v={s.prompt} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THEORY ===== */}
      <section id="theory" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Theory · 理论"
          title={{ en: "The architecture of reasoning", zh: "推理的建筑学" }}
          sub={{ en: "Ontology, epistemology, and the modes you reason in", zh: "本体论、认识论，与你所用的推理模式" }}
        />
        <div className="mx-auto mt-12 max-w-6xl space-y-12">
          {THEORY.map((b) => (
            <div key={b.id} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="display text-2xl text-axiom-500/40">{b.num}</span>
                  <h3 className="display text-2xl text-ghost-50 md:text-3xl"><T v={b.title} /></h3>
                </div>
                <p className="mt-2 text-base text-axiom-300"><T v={b.sub} /></p>
                {b.points && (
                  <div className="mt-5 space-y-3">
                    {b.points.map((p, i) => (
                      <div key={i} className="rounded-lg border border-ghost-700/50 bg-void-900/40 p-3">
                        <div className="display text-sm text-node-300"><T v={p.h} /></div>
                        <div className="mt-1 text-sm text-ghost-300"><T v={p.t} /></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className={`serif text-[1.05rem] leading-[1.9] text-ghost-100 ${lang === "zh" ? "zh-serif" : ""}`}><T v={b.body} /></p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-6xl">
          <ReasoningModes />
        </div>
      </section>

      {/* ===== HISTORY / LINEAGE ===== */}
      <section id="history" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Lineage · 谱系"
          title={{ en: "Twenty-three centuries of descending to bedrock", zh: "下降至基岩的二十三个世纪" }}
          body={{
            en: "The vocabulary changes; the move does not. From Aristotle's first cause to Musk's commodity-cost reduction, each of these thinkers refused to take the middle of the chain as a starting point.",
            zh: "词汇在变；那一步未变。从亚里士多德的第一因，到马斯克的大宗商品成本还原，这些思想者中的每一位，都拒绝把链条的中段当作起点。",
          }}
        />
        <div className="mx-auto mt-12 max-w-6xl"><HistoryTimeline /></div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section id="applications" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Applications · 应用"
          title={{ en: "Four domains, one move", zh: "四个领域，同一步棋" }}
          sub={{ en: "Physics · business · AI · personal life", zh: "物理 · 商业 · 人工智能 · 个人生活" }}
          body={{
            en: "Each case is a full descent: the inherited assumptions, the base truths that survive scrutiny, the reconstruction, and the result. Open one and read it as a tree, a layered map, or a derivation.",
            zh: "每个案例都是一次完整的下降：继承来的假设、经受住审视的基本真理、重建，以及结果。展开其一，把它当作一棵树、一张分层图，或一次推导来读。",
          }}
        />
        <div className="mx-auto mt-12 max-w-6xl"><ApplicationCases /></div>
      </section>

      {/* ===== THE ENGINE ===== */}
      <section id="engine" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="The engine · 引擎"
          title={{ en: "The decomposition engine", zh: "分解引擎" }}
          sub={{ en: "Feed it a problem; get back assumptions, truths, and a rebuild", zh: "喂给它一个问题；取回假设、真理，与一次重建" }}
          body={{
            en: "Type any problem. If it matches a worked case, you get the full derivation; otherwise you get a Socratic scaffold — the exact questions to ask, in the right order. Visualize it three ways and export the reasoning as JSON, an image, or a printable report.",
            zh: "输入任何问题。若它匹配一个已推导的案例，你会得到完整的推导；否则，你会得到一份苏格拉底式脚手架——按正确顺序、该问的那些确切问题。以三种方式将它可视化，并把推理导出为 JSON、一张图片，或一份可打印的报告。",
          }}
        />
        <div className="mx-auto mt-12 max-w-6xl"><DecompositionEngine /></div>
      </section>

      {/* ===== META-MODEL / RADAR ===== */}
      <section id="model" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Meta-model · 元模型"
          title={{ en: "What a first-principles thinker is made of", zh: "一个第一性原理思考者，由什么构成" }}
          body={{
            en: "If reasoning from fundamentals is a capacity, it is not one ability but seven, weighted differently in everyone. Move the sliders to profile your own reasoning against the analogist and the first-principles thinker.",
            zh: "若「从根本出发推理」是一种能力，那它不是一种本领，而是七种，在每个人身上有不同的加权。拖动滑块，把你自己的推理，与类比型思考者、第一性原理思考者，作一番对照。",
          }}
        />
        <div className="mx-auto mt-12 max-w-4xl"><FPRadar /></div>
      </section>

      {/* ===== LIBRARY ===== */}
      <section id="library" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Library · 藏书阁"
          title={{ en: "The knowledge library", zh: "知识藏书阁" }}
          sub={{ en: "Source texts and deep readings, philosophy to cognitive science", zh: "源典与深读，从哲学到认知科学" }}
        />
        <div className="mx-auto mt-12 max-w-6xl"><KnowledgeLibrary /></div>
      </section>

      {/* ===== THINKING SPACE ===== */}
      <section id="space" className="relative border-t border-axiom-500/8 px-6 py-24 md:px-12">
        <SectionHead
          kicker="Thinking space · 思维空间"
          title={{ en: "Publish a decomposition", zh: "发布一份分解" }}
          sub={{ en: "Vote on the most fundamental and most elegant; comment by reasoning layer", zh: "为最根本、最优雅者投票；按推理层次评论" }}
          body={{
            en: "A space to reason in public. Post the irreducible truths you boiled a problem down to. Comments are organized not as a linear thread but by the layer they belong to — assumptions, base truths, or reconstruction.",
            zh: "一个公开推理的空间。贴出你把某个问题煮到只剩的那些不可约真理。评论不按线性串排列，而按它们所属的层次组织——假设、基本真理，或重建。",
          }}
        />
        <div className="mx-auto mt-12 max-w-6xl"><ThinkingSpace /></div>
        <p className="mx-auto mt-4 max-w-6xl font-mono text-[0.6rem] text-ghost-500">
          {lang === "zh" ? "※ 思维空间保存在你的浏览器本地（localStorage）；尚无共享后端。" : "※ The thinking space is saved locally in your browser (localStorage); there is no shared backend yet."}
        </p>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="relative border-t border-axiom-500/8 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-4xl leading-snug text-ghost-50 md:text-6xl">
            <T v={{ en: "A conclusion is only as trustworthy as the foundation it was built on.", zh: "一个结论的可信度，至多等于它所建立的根基。" }} />
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ghost-300">
            <T v={{
              en: "Reasoning by analogy is fast and almost always right, which is exactly why it caps how far you can go. First principles is slow, effortful, and reserved for the moments that matter — when the cost of inheriting a wrong assumption is too high to pay. Learn to tell which moment you are in, and you have the whole of the method.",
              zh: "类比推理快速，且几乎总是正确，而这恰恰是它为「你能走多远」封顶的原因。第一性原理缓慢、费力，只为那些要紧的时刻保留——当继承一个错误假设的代价，高到无法承受之时。学会分辨你身处哪一种时刻，你便掌握了这门方法的全部。",
            }} />
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-lg border border-node-500/25 bg-void-900/60 p-5">
            <p className="text-xs leading-relaxed text-ghost-500">
              <T v={{
                en: "An educational synthesis of philosophy, the history of science, engineering practice, and cognitive science. Worked case studies are hand-derived and order-of-magnitude; the engine's free-text mode returns a reasoning scaffold, not an authoritative answer. Open questions are stated as open.",
                zh: "一份融合哲学、科学史、工程实践与认知科学的教育性综述。已推导的案例研究为手工推导、数量级估计；引擎的自由文本模式返回的是一份推理脚手架，而非权威答案。悬而未决的问题，被如实陈述为悬而未决。",
              }} />
            </p>
          </div>
          <div className="mx-auto mt-12 h-px w-40 rule-fp" />
          <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.4em] text-node-300/70">
            First Principles · 第一性原理 · Psyverse · 2026
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-axiom-500/12 bg-void-950 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2"><Logo /><span className="display text-xl text-ghost-50">First Principles</span></div>
            <div className="zh mt-1 text-sm text-ghost-300">第一性原理</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ghost-500">
              <T v={{ en: "A thinking engine for reasoning from fundamental truths — theory, applications, a live decomposition tool, library, and community.", zh: "一台从根本真理出发推理的思维引擎——理论、应用、一个实时分解工具、藏书阁与社区。" }} />
            </p>
          </div>
          <div>
            <div className="label-mono">Sections · 章节</div>
            <ul className="mt-4 space-y-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ghost-500">
              {NAV.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:text-axiom-300"><T v={n.label} /></a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label-mono">Companion archives</div>
            <ul className="mt-4 space-y-1.5 text-sm text-ghost-300">
              {COMPANIONS.map((c) => (
                <li key={c.href}><a href={c.href} className="hover:text-axiom-200"><T v={c.name} /></a></li>
              ))}
              <li className="pt-3"><a href="https://psyverse.fun" className="text-node-300 hover:text-axiom-200">↩ All Psyverse archives</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 h-px max-w-7xl rule-fp" />
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-[0.58rem] uppercase tracking-[0.3em] text-ghost-500">
          <div>© 2026 Gewenbo · Psyverse</div>
          <div>EN · 中文 · educational</div>
        </div>
      </footer>
    </main>
  );
}

export default function FirstPrinciples() {
  return (
    <LangProvider>
      <Body />
    </LangProvider>
  );
}
