"use client";

import { useState } from "react";
import { useLang, T, type Bi } from "./lang";
import { ARTICLES, Article } from "./content";

const SHELVES: { key: string; label: Bi }[] = [
  { key: "all", label: { en: "All", zh: "全部" } },
  { key: "Philosophy", label: { en: "Philosophy", zh: "哲学" } },
  { key: "Science", label: { en: "Science", zh: "科学" } },
  { key: "Modern Practice", label: { en: "Practice", zh: "实践" } },
  { key: "Cognitive Science", label: { en: "Cognition", zh: "认知" } },
];

export default function KnowledgeLibrary() {
  const { lang } = useLang();
  const [shelf, setShelf] = useState("all");
  const [reading, setReading] = useState<Article | null>(null);

  const list = shelf === "all" ? ARTICLES : ARTICLES.filter((a) => a.shelf.en === shelf);

  return (
    <div>
      {/* shelf filter */}
      <div className="flex flex-wrap gap-2">
        {SHELVES.map((s) => (
          <button key={s.key} onClick={() => setShelf(s.key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs transition ${shelf === s.key ? "border-axiom-500/60 bg-axiom-500/15 text-axiom-200" : "border-ghost-700 text-ghost-300 hover:border-axiom-500/40 hover:text-ghost-100"}`}>
            <T v={s.label} />
          </button>
        ))}
      </div>

      {/* cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((a) => (
          <button key={a.id} onClick={() => setReading(a)}
            className="holo group rounded-2xl p-5 text-left transition" style={{ borderTopColor: `${a.accent}55`, borderTopWidth: 2 }}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em]" style={{ color: a.accent }}><T v={a.shelf} /></span>
              <span className="font-mono text-[0.58rem] text-ghost-500"><T v={a.era} /></span>
            </div>
            <h3 className="display mt-2 text-xl text-ghost-50 group-hover:text-axiom-100"><T v={a.title} /></h3>
            <p className="mt-1 text-xs text-ghost-400"><T v={a.author} /></p>
            <p className="serif mt-3 text-sm leading-relaxed text-ghost-300"><T v={a.abstract} /></p>
            <span className="mt-4 inline-block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-axiom-300">
              <T v={{ en: "Read →", zh: "阅读 →" }} />
            </span>
          </button>
        ))}
      </div>

      {/* reader */}
      {reading && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-void-950/85 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setReading(null)}>
          <article className="relative my-auto w-full max-w-3xl rounded-2xl border border-axiom-500/20 bg-void-900 p-6 shadow-axiomcard md:p-10"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setReading(null)}
              className="absolute right-4 top-4 rounded-full border border-ghost-700 px-3 py-1 font-mono text-xs text-ghost-300 hover:border-axiom-500/50 hover:text-axiom-200">
              <T v={{ en: "Close ✕", zh: "关闭 ✕" }} />
            </button>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em]" style={{ color: reading.accent }}>
              <T v={reading.shelf} /> · <T v={reading.era} />
            </div>
            <h2 className="display mt-3 text-3xl text-ghost-50 md:text-4xl"><T v={reading.title} /></h2>
            <p className="mt-2 text-sm text-ghost-400"><T v={reading.author} /></p>
            <div className="mt-5 h-px rule-fp opacity-50" />
            <p className="serif mt-6 text-base italic leading-relaxed text-ghost-300"><T v={reading.abstract} /></p>
            <div className="mt-6 space-y-5">
              {reading.body.map((p, i) => (
                <p key={i} className={`serif text-[1.02rem] leading-[1.85] text-ghost-100 ${lang === "zh" ? "zh-serif" : ""}`}><T v={p} /></p>
              ))}
            </div>
            {reading.quote && (
              <blockquote className="mt-8 border-l-2 pl-5" style={{ borderColor: reading.accent }}>
                <p className={`serif text-lg italic leading-relaxed ${lang === "zh" ? "zh-serif" : ""}`} style={{ color: reading.accent }}>
                  <T v={reading.quote} />
                </p>
              </blockquote>
            )}
          </article>
        </div>
      )}
    </div>
  );
}
