"use client";

import { useLang, type Bi } from "./lang";
import { Decomposition } from "./content";

/* ------------------------------------------------------------------
   DecompTree — a pure-SVG decomposition tree.
   Pure SVG (no foreignObject) so it serializes cleanly to PNG.
   Layout: Problem (root) → 3 branch hubs (Assumptions / Base truths /
   Reconstruction) → leaves. Used on the Engine "tree" view and in the
   Applications cards, and as the source for the image-snapshot export.
   ------------------------------------------------------------------ */

const ROOT_X = 14, ROOT_W = 232;
const HUB_X = 338, HUB_W = 150;
const LEAF_X = 546, LEAF_W = 256;
const VB_W = 824;
const LINE_H = 15.5, PAD_Y = 9, GAP = 15, TOP = 26, MIN_H = 38;

function isCJK(s: string) {
  return /[　-鿿＀-￯]/.test(s);
}
function wrap(s: string, maxCJK: number, maxLatin: number): string[] {
  if (isCJK(s)) {
    const out: string[] = [];
    for (let i = 0; i < s.length; i += maxCJK) out.push(s.slice(i, i + maxCJK));
    return out.length ? out : [s];
  }
  const words = s.split(/\s+/);
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > maxLatin) {
      out.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) out.push(cur);
  return out.length ? out : [s];
}

type Branch = "assumption" | "truth" | "recon";
const BRANCH_COLOR: Record<Branch, string> = {
  assumption: "#b07cff",
  truth: "#5b9dff",
  recon: "#ffb454",
};
const VERDICT_COLOR: Record<string, string> = {
  false: "#e0728a",
  shaky: "#ffb454",
  holds: "#5b9dff",
};
const VERDICT_LABEL: Record<string, Bi> = {
  false: { en: "FALSE", zh: "证伪" },
  shaky: { en: "SHAKY", zh: "存疑" },
  holds: { en: "HOLDS", zh: "成立" },
};

export default function DecompTree({ d, idPrefix = "t" }: { d: Decomposition; idPrefix?: string }) {
  const { lang } = useLang();

  type Leaf = { branch: Branch; text: string; verdict?: string; lines: string[]; h: number; y: number; cy: number };

  const raw: { branch: Branch; text: string; verdict?: string }[] = [
    ...d.assumptions.map((a) => ({ branch: "assumption" as Branch, text: a.text[lang], verdict: a.verdict })),
    ...d.truths.map((t) => ({ branch: "truth" as Branch, text: t[lang] })),
    { branch: "recon" as Branch, text: d.reconstruction[lang] },
    { branch: "recon" as Branch, text: d.result[lang] },
  ];

  let cursor = TOP;
  const leaves: Leaf[] = raw.map((r) => {
    const lines = wrap(r.text, 17, 30);
    const h = Math.max(MIN_H, lines.length * LINE_H + PAD_Y * 2);
    const y = cursor;
    const cy = y + h / 2;
    cursor = y + h + GAP;
    return { ...r, lines, h, y, cy };
  });
  const totalH = cursor - GAP + TOP;

  const hubs: { branch: Branch; label: Bi; cy: number }[] = (["assumption", "truth", "recon"] as Branch[]).map((b) => {
    const own = leaves.filter((l) => l.branch === b);
    const cy = own.length ? (own[0].cy + own[own.length - 1].cy) / 2 : totalH / 2;
    return {
      branch: b,
      label:
        b === "assumption" ? { en: "Assumptions", zh: "假设" } : b === "truth" ? { en: "Base truths", zh: "基本真理" } : { en: "Reconstruction", zh: "重建" },
      cy,
    };
  });

  const rootCY = totalH / 2;
  const rootLines = wrap(d.problem[lang], 15, 26);
  const rootH = Math.max(56, rootLines.length * LINE_H + PAD_Y * 2);

  const path = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <svg viewBox={`0 0 ${VB_W} ${totalH}`} width="100%" style={{ height: "auto", maxHeight: 620 }} role="img"
      aria-label={lang === "zh" ? "分解树" : "decomposition tree"}>
      <defs>
        <linearGradient id={`${idPrefix}-glow`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b9dff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb454" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* connectors: root → hubs */}
      {hubs.map((h) => (
        <path key={`rh-${h.branch}`} d={path(ROOT_X + ROOT_W, rootCY, HUB_X, h.cy)} fill="none"
          stroke={BRANCH_COLOR[h.branch]} strokeOpacity="0.45" strokeWidth="1.4" />
      ))}
      {/* connectors: hub → leaves */}
      {leaves.map((l, i) => {
        const h = hubs.find((x) => x.branch === l.branch)!;
        return (
          <path key={`hl-${i}`} d={path(HUB_X + HUB_W, h.cy, LEAF_X, l.cy)} fill="none"
            stroke={BRANCH_COLOR[l.branch]} strokeOpacity="0.3" strokeWidth="1.2" />
        );
      })}

      {/* root: the problem */}
      <g>
        <rect x={ROOT_X} y={rootCY - rootH / 2} width={ROOT_W} height={rootH} rx="10"
          fill="#0f1322" stroke={`url(#${idPrefix}-glow)`} strokeWidth="1.6" />
        <text x={ROOT_X + 14} y={rootCY - rootH / 2 + 17} fill="#aecfff" fontSize="9.5"
          fontFamily="JetBrains Mono, monospace" letterSpacing="2">{lang === "zh" ? "问题" : "PROBLEM"}</text>
        {rootLines.map((ln, i) => (
          <text key={i} x={ROOT_X + 14} y={rootCY - rootH / 2 + 33 + i * LINE_H} fill="#e7ecf5" fontSize="11.5"
            fontFamily={isCJK(ln) ? "Noto Sans SC, sans-serif" : "Space Grotesk, sans-serif"}>{ln}</text>
        ))}
      </g>

      {/* hubs */}
      {hubs.map((h) => (
        <g key={`hub-${h.branch}`}>
          <rect x={HUB_X} y={h.cy - 19} width={HUB_W} height={38} rx="9"
            fill="#0a0d18" stroke={BRANCH_COLOR[h.branch]} strokeOpacity="0.75" strokeWidth="1.4" />
          <text x={HUB_X + HUB_W / 2} y={h.cy + 4.5} fill={BRANCH_COLOR[h.branch]} fontSize="12.5" textAnchor="middle"
            fontFamily={lang === "zh" ? "Noto Sans SC, sans-serif" : "Space Grotesk, sans-serif"} fontWeight="600">
            {h.label[lang]}
          </text>
        </g>
      ))}

      {/* leaves */}
      {leaves.map((l, i) => {
        const c = BRANCH_COLOR[l.branch];
        return (
          <g key={`leaf-${i}`}>
            <rect x={LEAF_X} y={l.y} width={LEAF_W} height={l.h} rx="8"
              fill="#0c0e16" stroke={c} strokeOpacity="0.45" strokeWidth="1.1" />
            <rect x={LEAF_X} y={l.y} width="3" height={l.h} rx="1.5" fill={c} />
            {l.verdict && (
              <>
                <text x={LEAF_X + LEAF_W - 12} y={l.y + 16} fill={VERDICT_COLOR[l.verdict]} fontSize="8.5"
                  textAnchor="end" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
                  {VERDICT_LABEL[l.verdict][lang]}
                </text>
              </>
            )}
            {l.lines.map((ln, j) => (
              <text key={j} x={LEAF_X + 14} y={l.y + PAD_Y + 12 + j * LINE_H}
                fill={l.verdict === "false" ? "#94a0bb" : "#e7ecf5"} fontSize="11"
                fontFamily={isCJK(ln) ? "Noto Sans SC, sans-serif" : "Space Grotesk, sans-serif"}
                textDecoration={l.verdict === "false" ? "line-through" : "none"}>
                {ln}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
