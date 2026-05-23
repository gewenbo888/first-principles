"use client";

import { useState } from "react";
import { useLang, T, type Bi } from "./lang";
import { DECOMPOSITIONS } from "./content";
import DecompTree from "./TreeGraph";

const VERDICT: Record<string, { cls: string; label: Bi }> = {
  false: { cls: "text-rose-300 border-rose-400/40", label: { en: "falsified", zh: "证伪" } },
  shaky: { cls: "text-spark-300 border-spark-500/40", label: { en: "unverified", zh: "存疑" } },
  holds: { cls: "text-axiom-300 border-axiom-500/40", label: { en: "holds", zh: "成立" } },
};

export default function ApplicationCases() {
  const { lang } = useLang();
  const [open, setOpen] = useState<string>(DECOMPOSITIONS[0].id);

  return (
    <div className="space-y-4">
      {DECOMPOSITIONS.map((d) => {
        const isOpen = open === d.id;
        return (
          <div key={d.id} className="holo overflow-hidden rounded-2xl" style={{ borderTopColor: `${d.accent}55`, borderTopWidth: 2 }}>
            <button
              onClick={() => setOpen(isOpen ? "" : d.id)}
              className="flex w-full items-start gap-4 px-5 py-5 text-left md:px-7"
            >
              <span className="display mt-0.5 text-2xl" style={{ color: d.accent }}>{d.icon}</span>
              <span className="flex-1">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em]" style={{ color: d.accent }}><T v={d.domain} /></span>
                <span className="display mt-1 block text-lg text-ghost-50 md:text-xl"><T v={d.problem} /></span>
                <span className="mt-1 block text-sm text-ghost-300"><T v={d.context} /></span>
              </span>
              <span className={`mt-1 shrink-0 font-mono text-lg text-ghost-500 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>

            {isOpen && (
              <div className="rise-in border-t border-ghost-700/40 px-5 pb-7 pt-5 md:px-7">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* structured breakdown */}
                  <div className="space-y-5">
                    <div>
                      <div className="label-mono" style={{ color: "#b07cff" }}>Assumptions removed · 移除的假设</div>
                      <ul className="mt-2 space-y-2">
                        {d.assumptions.map((a, i) => (
                          <li key={i} className="rounded-md border border-ghost-700/50 bg-void-900/40 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-sm text-ghost-100"><T v={a.text} /></span>
                              <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider ${VERDICT[a.verdict].cls}`}>
                                <T v={VERDICT[a.verdict].label} />
                              </span>
                            </div>
                            <div className="mt-1 text-[0.78rem] text-ghost-400"><T v={a.note} /></div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="label-mono" style={{ color: "#5b9dff" }}>Base truths · 基本真理</div>
                      <ul className="mt-2 space-y-1.5">
                        {d.truths.map((t, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed text-ghost-200">
                            <span className="mono shrink-0 text-axiom-400">{String(i + 1).padStart(2, "0")}</span><T v={t} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* reconstruction + tree */}
                  <div className="space-y-5">
                    <div className="rounded-lg border-l-2 border-spark-500/60 bg-spark-500/[0.04] p-4">
                      <div className="label-mono" style={{ color: "#ffb454" }}>Reconstruction · 重建</div>
                      <p className="mt-2 text-sm leading-relaxed text-ghost-100"><T v={d.reconstruction} /></p>
                      <p className="mt-3 spark-text text-sm leading-relaxed"><T v={d.result} /></p>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-ghost-700/40 bg-void-950/50 p-2">
                      <DecompTree d={d} idPrefix={`app-${d.id}`} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
