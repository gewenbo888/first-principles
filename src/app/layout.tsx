import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "First Principles · A Thinking Engine for Reasoning from Fundamental Truths";
const TITLE_ZH = "第一性原理 · 从根本真理出发的思维引擎";
const DESC =
  "A bilingual, lifelong intellectual tool for First Principles Thinking — the discipline of breaking any problem down to its irreducible truths and rebuilding the solution from the ground up. A fusion of philosophy, physics, cognitive science, engineering and AI: theory, worked case studies, an interactive decomposition engine, a knowledge library, and a community thinking space.";

export const metadata: Metadata = {
  metadataBase: new URL("https://first-principles.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "first principles", "first principles thinking", "reasoning from first principles",
    "decomposition", "reductionism", "axioms", "fundamental truths", "critical thinking",
    "mental models", "epistemology", "ontology", "Aristotle", "Descartes", "Newton",
    "Einstein", "Elon Musk", "reasoning by analogy", "heuristics", "cognitive science",
    "problem solving", "systems thinking", "rocket cost", "battery cost", "SpaceX", "Tesla",
    "representation learning", "machine reasoning", "thinking tool", "intellectual operating system",
    "第一性原理", "第一性原理思维", "从第一性原理出发", "分解", "还原论", "公理", "根本真理",
    "批判性思维", "思维模型", "认识论", "本体论", "亚里士多德", "笛卡尔", "牛顿", "爱因斯坦",
    "马斯克", "类比推理", "启发式", "认知科学", "问题求解", "系统思维", "思维工具", "智识操作系统",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "First Principles · 第一性原理 — A Thinking Engine" }],
    title: TITLE_EN,
    description:
      "Break any problem down to its irreducible truths, then rebuild the solution from the ground up. A bilingual engine for First Principles Thinking — theory, case studies, a live decomposition tool, library, and community.",
    url: "https://first-principles.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: TITLE_EN,
    description: "Stop reasoning by analogy. Boil any problem down to physics and rebuild from there. A bilingual First Principles Thinking engine.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#06080f" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@300;400;500&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://first-principles.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-void-950 text-ghost-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
