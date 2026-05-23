"use client";

import { useState } from "react";
import { T, useLang, type Bi } from "./lang";

type Accent = "axiom" | "node" | "spark";

type Thinker = {
  id: string;
  name: Bi;
  era: Bi;
  move: Bi;
  reduced: Bi;
  quote: Bi;
  attribution: Bi;
  exampleLabel: Bi;
  example: Bi;
  accent: Accent;
};

const THINKERS: Thinker[] = [
  {
    id: "aristotle",
    name: { en: "Aristotle", zh: "亚里士多德" },
    era: { en: "384–322 BCE", zh: "公元前384—前322年" },
    move: {
      en: "Coined the very idea. He named the πρῶτη ἀρχή (prōtē archē) — the first principle: that which is known through itself and from which everything else derives, but which itself rests on nothing prior. To explain anything, he argued, you must trace it back to causes that need no further cause.",
      zh: "他造出了这个概念本身。他提出 πρῶτη ἀρχή（第一本原）——那个凭自身即可被认识、其余一切由之派生、而它自己却不依赖任何在先之物的起点。他主张：要解释任何事物，就必须把它一路追溯到无需再被解释的原因。",
    },
    reduced: {
      en: "Substance, form and matter, and the four causes (material, formal, efficient, final) — terminating in an unmoved first cause.",
      zh: "还原为实体、形式与质料，以及四因（质料因、形式因、动力因、目的因）——最终止于一个不被推动的第一因。",
    },
    quote: {
      en: "“A first principle is that from which a thing first comes to be, or is first known.”",
      zh: "“第一本原，乃是一物由之而首先生成、或由之而首先被认识者。”",
    },
    attribution: { en: "— Metaphysics, Book V", zh: "——《形而上学》第五卷" },
    exampleLabel: { en: "Worked reduction / 实例还原", zh: "实例还原 / Worked reduction" },
    example: {
      en: "Faced with motion, Aristotle refused to let causes regress forever. Each mover is moved by another — but an infinite chain explains nothing, so the series must rest on a first, self-sufficient term. That demand for a stopping point, not the answer he reached, is the first-principles instinct.",
      zh: "面对“运动”，亚里士多德拒绝让原因无穷倒退。每一个推动者都被另一个所推动——但无尽的链条什么也解释不了，于是这一系列必须落脚于一个最初的、自足的项。真正属于第一性原理的，不是他得出的那个答案，而是他对“必须有一个终点”的坚持。",
    },
    accent: "axiom",
  },
  {
    id: "euclid",
    name: { en: "Euclid", zh: "欧几里得" },
    era: { en: "fl. c. 300 BCE", zh: "约公元前300年" },
    move: {
      en: "Turned principle into method. In the Elements he laid down 5 postulates and a handful of common notions, then derived the entire edifice of plane geometry — 465 propositions — from nothing else. Every theorem is forced by what was already granted; nothing is smuggled in.",
      zh: "他把“原理”变成了“方法”。在《几何原本》中，他先立下5条公设和若干公理，然后仅凭这些就推演出整座平面几何的大厦——465个命题。每一条定理都被先前已承认的前提所逼出，没有任何东西被偷偷塞进来。",
    },
    reduced: {
      en: "Five postulates plus the common notions — point, line, and the rules that bind them.",
      zh: "还原为五条公设加上若干公理——点、线，以及约束它们的那几条规则。",
    },
    quote: {
      en: "“Let the following be postulated: to draw a straight line from any point to any point.”",
      zh: "“设以下各条为公设：可以从任一点到任一点作一条直线。”",
    },
    attribution: { en: "— Elements, Book I", zh: "——《几何原本》第一卷" },
    exampleLabel: { en: "Worked reduction / 实例还原", zh: "实例还原 / Worked reduction" },
    example: {
      en: "Proposition I.1 builds an equilateral triangle using only a compass and straightedge — two intersecting circles and three straight lines. No appeal to intuition, only to the postulates already accepted. The figure is not observed to be equilateral; it is proven to be, by construction.",
      zh: "第一卷命题1只用圆规和直尺就作出一个等边三角形——两个相交的圆，三条直线。其中没有诉诸任何直觉，只诉诸已被接受的公设。这个三角形不是被“看出来”是等边的，而是由作图法被“证明”为等边的。",
    },
    accent: "axiom",
  },
  {
    id: "descartes",
    name: { en: "Descartes", zh: "笛卡尔" },
    era: { en: "1596–1650", zh: "1596—1650年" },
    move: {
      en: "Demolition before construction. He resolved to doubt everything that could be doubted — the senses, the body, even mathematics — to clear away inherited belief entirely. What survived total doubt could serve as bedrock. One thing did: the doubting itself proves a doubter.",
      zh: "先拆毁，再重建。他决意去怀疑一切可被怀疑之物——感官、身体，乃至数学——以彻底清除一切因袭而来的信念。凡能熬过这场全面怀疑的，才配做地基。最终只有一样东西活了下来：怀疑这个行为本身，恰恰证明了有一个在怀疑的人。",
    },
    reduced: {
      en: "A single indubitable point: the thinking self — cogito ergo sum.",
      zh: "还原为唯一不可怀疑的一点：那个正在思考的“我”——我思故我在。",
    },
    quote: {
      en: "“I think, therefore I am.” (Cogito, ergo sum.)",
      zh: "“我思，故我在。”（Cogito, ergo sum.）",
    },
    attribution: { en: "— Discourse on the Method, 1637", zh: "——《谈谈方法》，1637年" },
    exampleLabel: { en: "Thought experiment / 思想实验", zh: "思想实验 / Thought experiment" },
    example: {
      en: "Suppose an all-powerful evil demon deceives you about everything — the world, your body, the truths of arithmetic. Can it deceive you that you exist? No: to be deceived, you must first be there to be deceived. The demon's reach ends exactly where the thinker begins.",
      zh: "假设有一个全能的恶魔，在一切事情上欺骗你——外部世界、你的身体、甚至算术的真理。它能骗你“你并不存在”吗？不能：要被欺骗，你首先得在场、得存在，才谈得上被骗。恶魔的力量恰好止步于“思考者”开始的地方。",
    },
    accent: "node",
  },
  {
    id: "newton",
    name: { en: "Newton", zh: "牛顿" },
    era: { en: "1643–1727", zh: "1643—1727年" },
    move: {
      en: "Stated his rules of reasoning, then obeyed them. In the Principia he set down the Regulae Philosophandi and built all terrestrial and celestial motion from three laws plus one law of universal gravitation. He refused to invent unseen mechanisms — \"Hypotheses non fingo\" — keeping only what the phenomena forced.",
      zh: "他先写下推理的规则，再严守这些规则。在《自然哲学的数学原理》中，他立下“哲学中的推理法则”，并仅凭三条运动定律加一条万有引力定律，就推演出地上与天上的一切运动。他拒绝臆造看不见的机制——“我不杜撰假说”——只保留现象所逼出的东西。",
    },
    reduced: {
      en: "Three laws of motion plus universal gravitation — mass, force, and inverse-square attraction.",
      zh: "还原为三条运动定律加万有引力——质量、力，以及与距离平方成反比的吸引。",
    },
    quote: {
      en: "“I frame no hypotheses; for whatever is not deduced from the phenomena is to be called a hypothesis.”",
      zh: "“我不杜撰假说；凡不是从现象中推导出来的，皆应称为假说。”",
    },
    attribution: { en: "— Principia, General Scholium, 1713", zh: "——《原理》总释，1713年" },
    exampleLabel: { en: "Worked reduction / 实例还原", zh: "实例还原 / Worked reduction" },
    example: {
      en: "The apple's fall and the Moon's orbit had seemed wholly different things. Newton reduced both to one cause: the same inverse-square attraction, scaled only by distance. The falling apple and the wheeling Moon obey a single equation — a unification reached not by analogy but by deriving both from the same primitive.",
      zh: "苹果的下落与月亮的绕行，原本看似毫不相干。牛顿把二者还原为同一个原因：同一条与距离平方成反比的引力，仅因距离不同而强弱有别。下落的苹果与运行的月亮服从同一个方程——这种统一不是靠类比得来，而是靠把两者都从同一个基本原理中推导出来。",
    },
    accent: "axiom",
  },
  {
    id: "lavoisier",
    name: { en: "Lavoisier", zh: "拉瓦锡" },
    era: { en: "1743–1794", zh: "1743—1794年" },
    move: {
      en: "Let the balance overrule the story. Where chemistry trusted the invisible \"phlogiston\" thought to escape burning bodies, Lavoisier insisted on weighing. If matter is neither created nor destroyed, every gain and loss of mass must be accounted for — and that single conservation principle dissolved an entire false substance.",
      zh: "让天平推翻成说。当时的化学相信燃烧时会逸出一种看不见的“燃素”，而拉瓦锡坚持称重。既然物质既不会被创造、也不会被消灭，那么每一份质量的增减就都必须有账可算——正是这一条“质量守恒”，溶解掉了一整个虚构的物质。",
    },
    reduced: {
      en: "Conservation of mass and a fixed list of elements — measured quantity, not unseen essence.",
      zh: "还原为质量守恒与一张固定的元素清单——可测量的“量”，而非看不见的“本质”。",
    },
    quote: {
      en: "“Nothing is created, nothing is lost, all is transformed.”",
      zh: "“无物被创造，无物被消灭，万物只是被转化。”",
    },
    attribution: { en: "— Traité élémentaire de chimie, 1789", zh: "——《化学基础论》，1789年" },
    exampleLabel: { en: "Worked reduction / 实例还原", zh: "实例还原 / Worked reduction" },
    example: {
      en: "Phlogiston theory said burning metal should lose substance. Lavoisier sealed a metal with air and weighed the whole system before and after. The metal gained weight; the air lost exactly as much. Nothing escaped — something combined. Burning was oxygen joining the metal, and the balance, not the story, decided it.",
      zh: "燃素说断言：金属燃烧应当失去某种物质。拉瓦锡把金属连同空气一起密封，在燃烧前后对整个系统称重。结果金属变重了，而空气恰好减少了同样的质量。没有什么逸出——而是有什么结合了进来。燃烧其实是氧气与金属相结合；裁决此事的，是天平，而不是成说。",
    },
    accent: "spark",
  },
  {
    id: "einstein",
    name: { en: "Einstein", zh: "爱因斯坦" },
    era: { en: "1879–1955", zh: "1879—1955年" },
    move: {
      en: "Rebuilt physics from two postulates. Rather than patch the contradictions in classical mechanics, Einstein took as bedrock that the laws of physics are the same in every inertial frame, and that light's speed is constant for all observers. From just those two premises he derived the strangeness of time and space.",
      zh: "他用两条公设重建了物理学。爱因斯坦没有去修补经典力学中的矛盾，而是把两点定为地基：物理定律在一切惯性系中都相同；光速对所有观察者都恒定。仅凭这两条前提，他就推导出了时间与空间的种种诡异之处。",
    },
    reduced: {
      en: "Two postulates: the relativity of inertial frames and the invariance of the speed of light.",
      zh: "还原为两条公设：惯性系的相对性，与光速的不变性。",
    },
    quote: {
      en: "“The whole of science is nothing more than a refinement of everyday thinking.”",
      zh: "“整个科学不过是日常思维的一种精炼罢了。”",
    },
    attribution: { en: "— Albert Einstein, 1936", zh: "——阿尔伯特·爱因斯坦，1936年" },
    exampleLabel: { en: "Thought experiment / 思想实验", zh: "思想实验 / Thought experiment" },
    example: {
      en: "As a boy he wondered: what would a beam of light look like if you chased it at its own speed? Classically it should appear frozen — yet Maxwell's equations forbid a stationary light wave. The contradiction could only be escaped by abandoning absolute time. The elevator experiment later did the same for gravity, recasting it as acceleration.",
      zh: "少年时他便琢磨：如果你以光速去追一束光，那束光看起来会是什么样？按经典力学，它该是静止冻结的——可麦克斯韦方程组却不允许存在静止的光波。要逃出这一矛盾，唯有放弃“绝对时间”。后来那个“电梯”思想实验对引力做了同样的事，把引力重新理解为加速度。",
    },
    accent: "axiom",
  },
  {
    id: "musk",
    name: { en: "Elon Musk", zh: "埃隆·马斯克" },
    era: { en: "b. 1971", zh: "1971年生" },
    move: {
      en: "Carried the method into engineering and made the phrase popular. His rule: reason from first principles, not by analogy. Don't ask what something has always cost — break it down to physics and raw materials, price those, and rebuild the cost from the floor up. Convention is treated as an assumption to be tested, not a fact.",
      zh: "他把这套方法带进工程实践，并让“第一性原理”一词广为流传。他的准则是：从第一性原理出发去推理，而不是靠类比。不要问一样东西历来值多少钱——把它拆解到物理与原材料层面，给这些原材料定价，再从最底层把成本一砖一瓦地重建起来。惯例只被当作有待检验的假设，而非既定事实。",
    },
    reduced: {
      en: "Physics and commodity inputs — the raw materials and their market cost.",
      zh: "还原为物理与大宗商品投入——构成它的原材料，及其市场价格。",
    },
    quote: {
      en: "“I think it's important to reason from first principles rather than by analogy… you boil things down to the most fundamental truths and then reason up from there.”",
      zh: "“我认为重要的是从第一性原理出发去推理，而不是靠类比……你把事物归结到最根本的真理，然后再从那里向上推演。”",
    },
    attribution: { en: "— Elon Musk, 2013 interview", zh: "——埃隆·马斯克，2013年访谈" },
    exampleLabel: { en: "Worked reduction / 实例还原", zh: "实例还原 / Worked reduction" },
    example: {
      en: "Told that rockets simply cost tens of millions, SpaceX instead asked what a rocket is made of — aluminum, titanium, copper, carbon fiber — and what those commodities cost on the open market. The raw materials ran a few percent of the finished price. The rest was process, not physics, so the rest could be attacked.",
      zh: "面对“火箭就是要花上千万美元”这种说法，SpaceX 反问：火箭究竟由什么造成——铝、钛、铜、碳纤维——这些大宗商品在公开市场上又值多少钱？算下来，原材料只占成品价格的百分之几。其余的差价来自工艺流程，而非物理定律——既然如此，这部分就是可以被攻破的。",
    },
    accent: "spark",
  },
];

const ACCENT: Record<
  Accent,
  {
    text: string;
    border: string;
    ring: string;
    dotOn: string;
    dotOff: string;
    glow: string;
    chip: string;
  }
> = {
  axiom: {
    text: "text-axiom-300",
    border: "border-axiom-500/40",
    ring: "ring-axiom-500/30",
    dotOn: "bg-axiom-500 border-axiom-300 shadow-[0_0_18px_rgba(91,157,255,0.55)]",
    dotOff: "bg-void-900 border-axiom-500/40 hover:border-axiom-400 hover:bg-axiom-500/10",
    glow: "shadow-[0_0_60px_-12px_rgba(59,118,224,0.35)]",
    chip: "bg-axiom-500/10 text-axiom-300 border-axiom-500/30",
  },
  node: {
    text: "text-node-300",
    border: "border-node-500/40",
    ring: "ring-node-500/30",
    dotOn: "bg-node-500 border-node-300 shadow-[0_0_18px_rgba(176,124,255,0.55)]",
    dotOff: "bg-void-900 border-node-500/40 hover:border-node-300 hover:bg-node-500/10",
    glow: "shadow-[0_0_60px_-12px_rgba(176,124,255,0.35)]",
    chip: "bg-node-500/10 text-node-300 border-node-500/30",
  },
  spark: {
    text: "text-spark-300",
    border: "border-spark-500/40",
    ring: "ring-spark-500/30",
    dotOn: "bg-spark-500 border-spark-300 shadow-[0_0_18px_rgba(255,180,84,0.55)]",
    dotOff: "bg-void-900 border-spark-500/40 hover:border-spark-300 hover:bg-spark-500/10",
    glow: "shadow-[0_0_60px_-12px_rgba(255,180,84,0.35)]",
    chip: "bg-spark-500/10 text-spark-300 border-spark-500/30",
  },
};

const FIELD_LABELS = {
  move: { en: "First-principle move", zh: "第一性原理之举" } as Bi,
  reduced: { en: "Reduced the world to", zh: "把世界还原为" } as Bi,
};

export default function HistoryTimeline() {
  const { lang } = useLang();
  const [selectedId, setSelectedId] = useState<string>(THINKERS[0].id);
  const selected = THINKERS.find((t) => t.id === selectedId) ?? THINKERS[0];
  const a = ACCENT[selected.accent];

  return (
    <section className="relative w-full px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 max-w-3xl rise-in">
          <p className="label-mono text-axiom-400/80">
            <T v={{ en: "Lineage of Reasoning", zh: "推理的谱系" }} />
          </p>
          <h2 className="display mt-3 text-3xl leading-tight text-ghost-100 sm:text-4xl md:text-5xl">
            <T
              v={{
                en: "Reasoning from first principles, across 2,300 years",
                zh: "第一性原理推理：跨越两千三百年",
              }}
            />
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ghost-300 sm:text-base">
            <T
              v={{
                en: "From Aristotle's first cause to a rocket's commodity cost — seven thinkers who refused inherited answers and rebuilt the world from what cannot be reduced further.",
                zh: "从亚里士多德的“第一因”，到一枚火箭的原材料成本——七位思想者拒绝因袭现成的答案，从那些无法再被拆解的东西出发，把世界重新建立起来。",
              }}
            />
          </p>
        </div>

        {/* Timeline rail (desktop) / stack (mobile) */}
        <div className="mb-10">
          {/* Desktop horizontal rail */}
          <div className="relative hidden md:block">
            <div className="rule-fp absolute left-0 right-0 top-[14px] h-px" aria-hidden="true" />
            <ol className="relative flex items-start justify-between">
              {THINKERS.map((th) => {
                const ac = ACCENT[th.accent];
                const isSel = th.id === selectedId;
                return (
                  <li key={th.id} className="flex min-w-0 flex-1 flex-col items-center text-center">
                    <button
                      onClick={() => setSelectedId(th.id)}
                      aria-pressed={isSel}
                      aria-label={th.name[lang]}
                      className={`group relative z-10 h-7 w-7 rounded-full border-2 transition-all duration-300 ${
                        isSel ? `${ac.dotOn} scale-110` : ac.dotOff
                      }`}
                    >
                      {isSel && (
                        <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-void-950/70" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedId(th.id)}
                      className="mt-3 flex flex-col items-center px-1"
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isSel ? ac.text : "text-ghost-300 group-hover:text-ghost-100 hover:text-ghost-100"
                        } ${lang === "zh" ? "zh" : ""}`}
                      >
                        {th.name[lang]}
                      </span>
                      <span className="mono mt-1 text-[0.65rem] tracking-wide text-ghost-500">
                        {th.era[lang]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Mobile vertical stack */}
          <div className="md:hidden">
            <ol className="relative ml-1 border-l border-void-700 pl-5">
              {THINKERS.map((th) => {
                const ac = ACCENT[th.accent];
                const isSel = th.id === selectedId;
                return (
                  <li key={th.id} className="relative pb-3">
                    <span
                      className={`absolute -left-[26px] top-1.5 h-4 w-4 rounded-full border-2 transition-all ${
                        isSel ? ac.dotOn : ac.dotOff
                      }`}
                      aria-hidden="true"
                    />
                    <button
                      onClick={() => setSelectedId(th.id)}
                      aria-pressed={isSel}
                      className={`flex w-full items-baseline justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-all ${
                        isSel
                          ? `${ac.border} ${ac.chip}`
                          : "border-transparent text-ghost-300 hover:border-void-700 hover:bg-void-900/60"
                      }`}
                    >
                      <span className={`text-sm font-medium ${lang === "zh" ? "zh" : ""}`}>
                        {th.name[lang]}
                      </span>
                      <span className="mono shrink-0 text-[0.62rem] text-ghost-500">
                        {th.era[lang]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Detail card */}
        <article
          key={selected.id}
          className={`holo rise-in rounded-2xl border ${a.border} ${a.glow} p-6 sm:p-8 md:p-10`}
        >
          {/* Header: name + era */}
          <header className="flex flex-col gap-2 border-b border-void-700/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <h3 className={`display text-2xl text-ghost-50 sm:text-3xl md:text-4xl ${lang === "zh" ? "zh" : ""}`}>
              {selected.name[lang]}
            </h3>
            <span
              className={`mono inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs ${a.chip}`}
            >
              {selected.era[lang]}
            </span>
          </header>

          <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Left column: move + reduced */}
            <div className="space-y-6">
              <div>
                <p className={`label-mono mb-2 ${a.text}`}>
                  <T v={FIELD_LABELS.move} />
                </p>
                <p className={`text-sm leading-relaxed text-ghost-200 sm:text-base ${lang === "zh" ? "zh" : ""}`}>
                  {selected.move[lang]}
                </p>
              </div>

              <div>
                <p className={`label-mono mb-2 ${a.text}`}>
                  <T v={FIELD_LABELS.reduced} />
                </p>
                <p className={`rule-fp border-l-2 pl-3 text-sm leading-relaxed text-ghost-100 sm:text-base ${a.border} ${lang === "zh" ? "zh" : ""}`}
                   style={{ borderLeftStyle: "solid" }}>
                  {selected.reduced[lang]}
                </p>
              </div>
            </div>

            {/* Right column: quote + example */}
            <div className="space-y-6">
              <figure className={`rounded-xl border border-void-700/60 bg-void-950/40 p-5 ${a.ring} ring-1`}>
                <blockquote className={`serif text-base italic leading-relaxed text-ghost-100 sm:text-lg ${lang === "zh" ? "zh" : ""}`}>
                  {selected.quote[lang]}
                </blockquote>
                <figcaption className={`mono mt-3 text-xs text-ghost-500 ${lang === "zh" ? "zh" : ""}`}>
                  {selected.attribution[lang]}
                </figcaption>
              </figure>

              <div>
                <p className={`label-mono mb-2 ${a.text} ${lang === "zh" ? "zh" : ""}`}>
                  {selected.exampleLabel[lang]}
                </p>
                <p className={`text-sm leading-relaxed text-ghost-300 sm:text-[0.95rem] ${lang === "zh" ? "zh" : ""}`}>
                  {selected.example[lang]}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Footnote */}
        <p className="mt-6 text-center text-xs text-ghost-500/80">
          <T
            v={{
              en: "Select a node to trace how the method sharpened from metaphysics into a working engineering tool.",
              zh: "点选任一节点，追踪这套方法如何从形而上学，一路磨砺为可用的工程工具。",
            }}
          />
        </p>
      </div>
    </section>
  );
}
