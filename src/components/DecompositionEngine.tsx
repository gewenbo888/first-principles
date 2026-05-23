"use client";

import { useRef, useState } from "react";
import { useLang, T, type Bi } from "./lang";
import { DECOMPOSITIONS, SCAFFOLD, Decomposition } from "./content";
import DecompTree from "./TreeGraph";

type Mode = "worked" | "scaffold";
type View = "tree" | "layers" | "flow";

/* Build a Socratic scaffold from arbitrary input: not fabricated facts,
   but a genuine first-principles worksheet of prompts to fill in. */
function buildScaffold(input: string): Decomposition {
  const both = (s: string): Bi => ({ en: s, zh: s });
  return {
    id: "scaffold",
    domain: { en: "Your problem", zh: "你的问题" },
    icon: "?",
    problem: both(input),
    context: { en: "A guided scaffold — prompts to fill in, not pre-computed facts.", zh: "一份引导式脚手架——供你填写的提示，而非预先算好的事实。" },
    assumptions: SCAFFOLD.filter((s) => s.kind === "assumption").map((s) => ({
      text: s.text,
      verdict: "shaky" as const,
      note: { en: "Check this before you trust it.", zh: "在信任它之前，先核验它。" },
    })),
    truths: SCAFFOLD.filter((s) => s.kind === "truth" || s.kind === "irreducible").map((s) => s.text),
    reconstruction: SCAFFOLD.find((s) => s.kind === "reconstruction")!.text,
    result: SCAFFOLD.filter((s) => s.kind === "reconstruction")[1]?.text ?? { en: "Rebuild from the atoms above.", zh: "从上面的原子重建。" },
    accent: "#5b9dff",
    keywords: [],
  };
}

const VERDICT: Record<string, { cls: string; label: Bi }> = {
  false: { cls: "text-rose-300 border-rose-400/40 bg-rose-500/5", label: { en: "falsified", zh: "证伪" } },
  shaky: { cls: "text-spark-300 border-spark-500/40 bg-spark-500/5", label: { en: "unverified", zh: "存疑" } },
  holds: { cls: "text-axiom-300 border-axiom-500/40 bg-axiom-500/5", label: { en: "holds", zh: "成立" } },
};

export default function DecompositionEngine() {
  const { lang } = useLang();
  const [input, setInput] = useState("");
  const [active, setActive] = useState<Decomposition>(DECOMPOSITIONS[0]);
  const [mode, setMode] = useState<Mode>("worked");
  const [view, setView] = useState<View>("tree");
  const [msg, setMsg] = useState<Bi | null>(null);
  const treeWrap = useRef<HTMLDivElement>(null);

  function decompose() {
    const q = input.trim();
    if (!q) {
      setMsg({ en: "Type a problem, or pick an example below.", zh: "输入一个问题，或在下方选一个示例。" });
      return;
    }
    setMsg(null);
    const lc = q.toLowerCase();
    const match = DECOMPOSITIONS.find((d) => d.keywords.some((k) => lc.includes(k)));
    if (match) {
      setActive(match);
      setMode("worked");
    } else {
      setActive(buildScaffold(q));
      setMode("scaffold");
    }
  }

  function loadPreset(d: Decomposition) {
    setActive(d);
    setMode("worked");
    setInput(d.problem[lang]);
    setMsg(null);
  }

  /* ---- exports ---- */
  function exportJSON() {
    const payload = {
      problem: active.problem[lang],
      domain: active.domain[lang],
      mode,
      assumptions: active.assumptions.map((a) => ({ assumption: a.text[lang], verdict: a.verdict, note: a.note[lang] })),
      baseTruths: active.truths.map((t) => t[lang]),
      reconstruction: active.reconstruction[lang],
      result: active.result[lang],
      generatedBy: "first-principles.psyverse.fun",
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `first-principles-${active.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPNG() {
    const svg = treeWrap.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const vb = (clone.getAttribute("viewBox") || "0 0 824 600").split(/\s+/).map(Number);
    const w = vb[2], h = vb[3];
    clone.setAttribute("width", String(w));
    clone.setAttribute("height", String(h));
    const xml = new XMLSerializer().serializeToString(clone);
    const src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#06080f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `first-principles-${active.id}.png`;
      a.click();
    };
    img.src = src;
  }

  function exportPDF() {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) return;
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const T2 = (b: Bi) => esc(b[lang]);
    const li = (items: string[]) => items.map((x) => `<li>${esc(x)}</li>`).join("");
    const aRows = active.assumptions
      .map((a) => `<li><b>[${T2(VERDICT[a.verdict].label)}]</b> ${T2(a.text)}<br><i style="color:#666">${T2(a.note)}</i></li>`)
      .join("");
    const heads = lang === "zh"
      ? { t: "第一性原理分解报告", p: "问题", d: "领域", a: "假设", b: "基本真理 / 不可约成分", r: "重建", o: "结果", f: "由 first-principles.psyverse.fun 生成" }
      : { t: "First-Principles Decomposition Report", p: "Problem", d: "Domain", a: "Assumptions", b: "Base truths / irreducible components", r: "Reconstruction", o: "Result", f: "Generated at first-principles.psyverse.fun" };
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(heads.t)}</title>
      <style>
        body{font-family:Georgia,'Noto Serif SC',serif;max-width:720px;margin:48px auto;padding:0 24px;color:#111;line-height:1.6}
        h1{font-size:22px;border-bottom:2px solid #111;padding-bottom:10px}
        h2{font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#3b76e0;margin-top:28px}
        .prob{font-size:18px;font-weight:600}
        .meta{color:#666;font-size:12px}
        ul{padding-left:20px} li{margin:6px 0}
        .foot{margin-top:40px;border-top:1px solid #ccc;padding-top:12px;color:#888;font-size:11px}
      </style></head><body>
      <h1>${esc(heads.t)}</h1>
      <p class="meta">${esc(heads.d)}: ${T2(active.domain)}${mode === "scaffold" ? " · scaffold" : ""}</p>
      <h2>${esc(heads.p)}</h2><p class="prob">${T2(active.problem)}</p>
      <h2>${esc(heads.a)}</h2><ul>${aRows}</ul>
      <h2>${esc(heads.b)}</h2><ul>${li(active.truths.map((t) => t[lang]))}</ul>
      <h2>${esc(heads.r)}</h2><p>${T2(active.reconstruction)}</p>
      <h2>${esc(heads.o)}</h2><p>${T2(active.result)}</p>
      <p class="foot">${esc(heads.f)} · ${new Date().toLocaleDateString()}</p>
      </body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 350);
  }

  const accent = active.accent;

  return (
    <div className="holo rounded-2xl p-5 md:p-7">
      {/* input row */}
      <div className="label-mono">Decomposition engine · 分解引擎</div>
      <h3 className="display mt-2 text-2xl text-ghost-50 md:text-3xl">
        <T v={{ en: "Enter any problem — decompose it into first principles", zh: "输入任何问题——把它分解为第一性原理" }} />
      </h3>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) decompose(); }}
          rows={2}
          placeholder={lang === "zh" ? "例如：为什么火箭这么贵？我该换工作吗？……（按 ⌘/Ctrl+Enter 分解）" : "e.g. Why are rockets so expensive? Should I switch jobs? … (⌘/Ctrl+Enter to run)"}
          className="min-h-[58px] flex-1 resize-y rounded-lg border border-axiom-500/25 bg-void-900/70 px-4 py-3 text-sm text-ghost-100 outline-none placeholder:text-ghost-500 focus:border-axiom-500/60"
        />
        <button
          onClick={decompose}
          className="shrink-0 rounded-lg border border-axiom-500/50 bg-axiom-500/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-axiom-200 transition hover:bg-axiom-500/25"
        >
          <T v={{ en: "Decompose →", zh: "分解 →" }} />
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-spark-300"><T v={msg} /></p>}

      {/* preset chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="self-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ghost-500">
          {lang === "zh" ? "实例：" : "Worked examples:"}
        </span>
        {DECOMPOSITIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => loadPreset(d)}
            className={`rounded-full border px-3 py-1 text-xs transition ${active.id === d.id && mode === "worked" ? "border-axiom-500/70 bg-axiom-500/15 text-axiom-200" : "border-ghost-700 text-ghost-300 hover:border-axiom-500/40 hover:text-ghost-100"}`}
          >
            <span style={{ color: d.accent }} className="mr-1.5">{d.icon}</span>
            <T v={d.domain} />
          </button>
        ))}
      </div>

      {/* mode banner */}
      <div className="mt-5 rounded-lg border-l-2 px-4 py-2.5 text-xs leading-relaxed"
        style={{ borderColor: accent, background: "rgba(255,255,255,0.02)" }}>
        {mode === "worked" ? (
          <T v={{ en: "Worked decomposition — a hand-derived case study you can inspect step by step.", zh: "已推导的分解——一个你可以逐步检视的、手工推导的案例研究。" }} />
        ) : (
          <T v={{ en: "Guided scaffold — these are the questions to ask, not answers. First-principles thinking is something you do; the engine hands you the worksheet and the discipline, not a verdict.", zh: "引导式脚手架——这些是你该问的问题，而非答案。第一性原理思维是一件你去「做」的事；引擎递给你的是工作表与纪律，而非一个裁决。" }} />
        )}
      </div>

      {/* view tabs */}
      <div className="mt-6 flex items-center justify-between border-b border-ghost-700/60 pb-2">
        <div className="flex gap-1">
          {([["tree", { en: "Tree", zh: "树图" }], ["layers", { en: "Layers", zh: "分层" }], ["flow", { en: "Flow", zh: "流程" }]] as [View, Bi][]).map(([v, label]) => (
            <button key={v} onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-xs transition ${view === v ? "bg-axiom-500/15 text-axiom-200" : "text-ghost-400 hover:text-ghost-100"}`}>
              <T v={label} />
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ghost-500 sm:block"><T v={active.context} /></span>
      </div>

      {/* views */}
      <div className="mt-5 min-h-[260px]">
        {view === "tree" && (
          <div ref={treeWrap} className="overflow-x-auto rounded-lg border border-ghost-700/40 bg-void-950/50 p-2">
            <DecompTree d={active} idPrefix={active.id} />
          </div>
        )}

        {view === "layers" && (
          <div className="space-y-3">
            <LayerBand n="1" color="#b07cff" title={{ en: "Assumptions to remove", zh: "待移除的假设" }}>
              <ul className="space-y-2">
                {active.assumptions.map((a, i) => (
                  <li key={i} className="flex flex-col gap-1 rounded-md bg-void-900/50 p-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-ghost-100"><T v={a.text} /></span>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider ${VERDICT[a.verdict].cls}`}>
                      <T v={VERDICT[a.verdict].label} />
                    </span>
                  </li>
                ))}
              </ul>
            </LayerBand>
            <LayerBand n="2" color="#5b9dff" title={{ en: "Irreducible base truths", zh: "不可约的基本真理" }}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {active.truths.map((t, i) => (
                  <li key={i} className="rounded-md bg-void-900/50 p-2.5 text-sm text-ghost-100">
                    <span className="mono mr-2 text-axiom-400">{String(i + 1).padStart(2, "0")}</span><T v={t} />
                  </li>
                ))}
              </ul>
            </LayerBand>
            <LayerBand n="3" color="#ffb454" title={{ en: "Reconstruction", zh: "重建" }}>
              <p className="text-sm leading-relaxed text-ghost-100"><T v={active.reconstruction} /></p>
            </LayerBand>
            <LayerBand n="4" color="#ffc878" title={{ en: "Result", zh: "结果" }}>
              <p className="spark-text text-sm leading-relaxed"><T v={active.result} /></p>
            </LayerBand>
          </div>
        )}

        {view === "flow" && (
          <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch">
            <FlowCard color="#82b6ff" tag={{ en: "Problem", zh: "问题" }} body={active.problem} />
            <FlowArrow label={{ en: "strip assumptions", zh: "剥离假设" }} />
            <FlowCard color="#5b9dff" tag={{ en: "Base truths", zh: "基本真理" }}
              body={{ en: active.truths.map((t) => "• " + t.en).join("\n"), zh: active.truths.map((t) => "• " + t.zh).join("\n") }} pre />
            <FlowArrow label={{ en: "rebuild", zh: "重建" }} />
            <FlowCard color="#ffb454" tag={{ en: "Solution", zh: "解法" }} body={active.reconstruction} />
            <FlowArrow label={{ en: "yields", zh: "得出" }} />
            <FlowCard color="#ffc878" tag={{ en: "Result", zh: "结果" }} body={active.result} glow />
          </div>
        )}
      </div>

      {/* export bar */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ghost-700/50 pt-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ghost-500">{lang === "zh" ? "导出：" : "Export:"}</span>
        <button onClick={exportJSON} className="rounded-md border border-ghost-700 px-3 py-1.5 text-xs text-ghost-200 transition hover:border-axiom-500/50 hover:text-axiom-200">JSON</button>
        <button onClick={exportPNG} className="rounded-md border border-ghost-700 px-3 py-1.5 text-xs text-ghost-200 transition hover:border-axiom-500/50 hover:text-axiom-200">
          <T v={{ en: "Image (PNG)", zh: "图片 (PNG)" }} />
        </button>
        <button onClick={exportPDF} className="rounded-md border border-ghost-700 px-3 py-1.5 text-xs text-ghost-200 transition hover:border-axiom-500/50 hover:text-axiom-200">
          <T v={{ en: "Report (print → PDF)", zh: "报告 (打印 → PDF)" }} />
        </button>
        <span className="ml-auto font-mono text-[0.55rem] text-ghost-500">
          {lang === "zh" ? "PNG 取自树图视图" : "PNG captures the Tree view"}
        </span>
      </div>
    </div>
  );
}

function LayerBand({ n, color, title, children }: { n: string; color: string; title: Bi; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-2 bg-void-900/30 p-4" style={{ borderColor: color }}>
      <div className="mb-2 flex items-center gap-2">
        <span className="mono text-sm" style={{ color }}>{n}</span>
        <span className="display text-sm" style={{ color }}><T v={title} /></span>
      </div>
      {children}
    </div>
  );
}

function FlowCard({ color, tag, body, pre, glow }: { color: string; tag: Bi; body: Bi; pre?: boolean; glow?: boolean }) {
  const { lang } = useLang();
  return (
    <div className="flex-1 rounded-lg border bg-void-900/50 p-4" style={{ borderColor: `${color}66`, boxShadow: glow ? `0 0 30px -16px ${color}` : undefined }}>
      <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em]" style={{ color }}><T v={tag} /></div>
      <div className={`mt-2 text-[0.82rem] leading-relaxed ${glow ? "spark-text" : "text-ghost-100"} ${lang === "zh" ? "zh" : ""}`} style={pre ? { whiteSpace: "pre-line" } : undefined}>
        {body[lang]}
      </div>
    </div>
  );
}

function FlowArrow({ label }: { label: Bi }) {
  return (
    <div className="flex items-center justify-center gap-1 lg:flex-col">
      <span className="font-mono text-[0.52rem] uppercase tracking-wider text-ghost-500"><T v={label} /></span>
      <span className="text-axiom-400">→</span>
    </div>
  );
}
