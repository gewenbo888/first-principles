"use client";

import { useEffect, useMemo, useState } from "react";
import { T, useLang, type Bi } from "./lang";

/* ──────────────────────────────────────────────────────────────────────────
   ThinkingSpace — a community "思维空间 / Thinking Space".
   Members publish a DECOMPOSITION (a problem reduced to first principles),
   the room votes on which are Most Fundamental / Most Elegant, and discussion
   is not a linear thread but THREE reasoning layers: Assumptions (violet),
   Base truths (blue), Reconstruction (gold). Persisted in localStorage.
────────────────────────────────────────────────────────────────────────── */

const POSTS_KEY = "fp-thinking-space";

type Layer = "assumptions" | "truths" | "reconstruction";

/** A field may be a plain string (user content) or a bilingual object (seeds). */
type Field = string | Bi;

interface Comment {
  id: string;
  layer: Layer;
  author: Field;
  text: Field;
  createdAt: number;
}

interface Post {
  id: string;
  author: Field;
  title: Field;
  problem: Field;
  principles: Field[];
  votesFundamental: number;
  votesElegant: number;
  createdAt: number;
  comments: Comment[];
}

type Lang = "en" | "zh";
type SortKey = "fundamental" | "elegant" | "newest";
type VoteKind = "fundamental" | "elegant";

/** Render a Field in the current language; user strings pass through unchanged. */
function render(f: Field, lang: Lang): string {
  if (f && typeof f === "object" && "en" in f && "zh" in f) return f[lang];
  return f as string;
}

function isZh(f: Field, lang: Lang): boolean {
  // bilingual seed in zh mode, or a user string that looks Chinese
  if (f && typeof f === "object") return lang === "zh";
  return /[㐀-鿿]/.test(f as string);
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/* ── layer metadata ──────────────────────────────────────────────────────── */
const LAYERS: { key: Layer; label: Bi; hint: Bi; accent: string; dot: string; chip: string }[] = [
  {
    key: "assumptions",
    label: { en: "Assumptions", zh: "假设" },
    hint: { en: "Challenge the hidden beliefs", zh: "挑战隐藏的信念" },
    accent: "node",
    dot: "bg-node-500",
    chip: "border-node-500/40 text-node-300 hover:border-node-500/70",
  },
  {
    key: "truths",
    label: { en: "Base truths", zh: "基本事实" },
    hint: { en: "Correct or add to the irreducible facts", zh: "修正或补充不可再分的事实" },
    accent: "axiom",
    dot: "bg-axiom-500",
    chip: "border-axiom-500/40 text-axiom-300 hover:border-axiom-500/70",
  },
  {
    key: "reconstruction",
    label: { en: "Reconstruction", zh: "重建" },
    hint: { en: "A better way to rebuild the solution", zh: "更好地重建解决方案" },
    accent: "spark",
    dot: "bg-spark-500",
    chip: "border-spark-500/40 text-spark-300 hover:border-spark-500/70",
  },
];

/* ── seed posts (bilingual) ──────────────────────────────────────────────── */
function seedPosts(): Post[] {
  const now = Date.now();
  const day = 86400000;
  return [
    {
      id: "seed-rockets",
      author: { en: "Lattice", zh: "格物" },
      title: { en: "Why are rockets so expensive?", zh: "火箭为何如此昂贵？" },
      problem: {
        en: "Launch costs are treated as a fixed law of physics. But the rocket is just refined metal, fuel and labor. So where does the price actually come from once you strip away tradition and habit?",
        zh: "人们把发射成本当作物理定律一般不可撼动。但火箭不过是精炼金属、燃料与人力。一旦剥离传统与惯例，价格究竟从何而来？",
      },
      principles: [
        { en: "Raw materials are only ~2% of total launch cost", zh: "原材料仅占发射总成本约 2%" },
        { en: "Discarding the vehicle after one flight is a choice, not a requirement", zh: "一次飞行后即抛弃箭体是一种选择，而非必然要求" },
        { en: "The physics of reaching orbit is fixed; the manufacturing of the hardware is not", zh: "入轨的物理是固定的；硬件的制造方式则不是" },
      ],
      votesFundamental: 41,
      votesElegant: 28,
      createdAt: now - day * 6,
      comments: [
        {
          id: "c-r1",
          layer: "assumptions",
          author: { en: "Vega", zh: "织女" },
          text: {
            en: "The hidden assumption is that each rocket must be hand-built. Mass production of engines breaks that.",
            zh: "隐藏的假设是每枚火箭都必须手工打造。发动机的批量生产打破了这一点。",
          },
          createdAt: now - day * 5,
        },
        {
          id: "c-r2",
          layer: "truths",
          author: { en: "Kepler", zh: "开普勒" },
          text: {
            en: "Add a base fact: propellant (LOX/RP-1) is remarkably cheap relative to the airframe.",
            zh: "补充一条基本事实：相对于箭体，推进剂（液氧/煤油）极其廉价。",
          },
          createdAt: now - day * 4,
        },
        {
          id: "c-r3",
          layer: "reconstruction",
          author: { en: "Booster", zh: "助推" },
          text: {
            en: "Rebuild it around reuse: land and refly the first stage and the cost curve collapses by an order of magnitude.",
            zh: "围绕复用来重建：回收并复飞第一级，成本曲线便会下降一个数量级。",
          },
          createdAt: now - day * 3,
        },
      ],
    },
    {
      id: "seed-sleep",
      author: { en: "Somnus", zh: "梦衡" },
      title: { en: "Why do humans sleep ~8 hours?", zh: "人为何要睡约8小时？" },
      problem: {
        en: "We accept eight hours as a target, but the body is not asking for a number on a clock. What is sleep actually doing, and does the duration follow from the function rather than from culture?",
        zh: "我们把八小时当作目标，但身体要的并非时钟上的数字。睡眠究竟在做什么？时长是由其功能决定，还是由文化决定？",
      },
      principles: [
        { en: "Sleep clears metabolic waste from the brain (glymphatic flushing)", zh: "睡眠清除脑内代谢废物（类淋巴系统冲刷）" },
        { en: "Memory is consolidated during specific sleep stages", zh: "记忆在特定睡眠阶段被巩固" },
        { en: "Need is set by sleep pressure (adenosine) and circadian timing, not a fixed clock-number", zh: "需求由睡眠压力（腺苷）与昼夜节律决定，而非固定的钟点数" },
      ],
      votesFundamental: 33,
      votesElegant: 37,
      createdAt: now - day * 4,
      comments: [
        {
          id: "c-s1",
          layer: "assumptions",
          author: { en: "Circa", zh: "节律" },
          text: {
            en: "The assumption that everyone needs the same eight hours ignores genetic short-sleeper variants.",
            zh: "“人人都需要同样的八小时”这一假设忽略了基因层面的短睡眠者变体。",
          },
          createdAt: now - day * 3,
        },
        {
          id: "c-s2",
          layer: "truths",
          author: { en: "Adeno", zh: "腺苷" },
          text: {
            en: "Base truth to add: 'eight hours' is a modern industrial average, not a biological constant.",
            zh: "需要补充的基本事实：“八小时”是现代工业时代的平均值，而非生物学常数。",
          },
          createdAt: now - day * 2,
        },
        {
          id: "c-s3",
          layer: "reconstruction",
          author: { en: "Phase", zh: "相位" },
          text: {
            en: "Rebuild around sleep cycles (~90 min) and chronotype rather than a flat hour target.",
            zh: "围绕睡眠周期（约 90 分钟）与时型来重建，而非一个固定的小时目标。",
          },
          createdAt: now - day,
        },
      ],
    },
    {
      id: "seed-tuition",
      author: { en: "Forum", zh: "论坛" },
      title: { en: "Why is university tuition so high?", zh: "大学学费为何如此之高？" },
      problem: {
        en: "Tuition is framed as the cost of knowledge. But the underlying knowledge is now nearly free to copy. So what is the price really buying, once we separate the information from everything bundled around it?",
        zh: "学费被包装成“知识的成本”。但底层知识如今几乎可以零成本复制。一旦把信息与其周边捆绑的一切分开，价格究竟买的是什么？",
      },
      principles: [
        { en: "The marginal cost of delivering information has fallen toward zero", zh: "传递信息的边际成本已趋近于零" },
        { en: "Much of the price funds credentialing and signaling, not teaching", zh: "价格的很大一部分用于资历认证与信号传递，而非教学本身" },
        { en: "Subsidized loans let prices rise faster than the underlying value", zh: "补贴贷款使价格上涨快于其内在价值" },
      ],
      votesFundamental: 26,
      votesElegant: 19,
      createdAt: now - day * 2,
      comments: [
        {
          id: "c-t1",
          layer: "assumptions",
          author: { en: "Ledger", zh: "账簿" },
          text: {
            en: "Hidden assumption: that the degree and the learning are the same product. They are not.",
            zh: "隐藏的假设：学位与学习是同一种产品。它们并不是。",
          },
          createdAt: now - day,
        },
        {
          id: "c-t2",
          layer: "truths",
          author: { en: "Cohort", zh: "同窗" },
          text: {
            en: "Base truth: a large share of cost is buildings, sports, and administration, not instruction.",
            zh: "基本事实：大量成本来自建筑、体育与行政，而非教学。",
          },
          createdAt: now - day,
        },
        {
          id: "c-t3",
          layer: "reconstruction",
          author: { en: "Open", zh: "开放" },
          text: {
            en: "Rebuild: separate credential (cheap, examinable) from community and mentorship (the part worth paying for).",
            zh: "重建：将资历（廉价、可考核）与社群、导师制（真正值得付费的部分）分离。",
          },
          createdAt: now,
        },
      ],
    },
  ];
}

/* ── relative time ───────────────────────────────────────────────────────── */
function relTime(ts: number, lang: Lang): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (lang === "zh") {
    if (m < 1) return "刚刚";
    if (m < 60) return `${m} 分钟前`;
    if (h < 24) return `${h} 小时前`;
    if (d < 30) return `${d} 天前`;
    return `${Math.floor(d / 30)} 个月前`;
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  if (h < 24) return `${h} hr ago`;
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  const mo = Math.floor(d / 30);
  return `${mo} mo ago`;
}

/* ════════════════════════════════════════════════════════════════════════ */
export default function ThinkingSpace() {
  const { lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [votes, setVotes] = useState<Record<string, VoteKind[]>>({});
  const [sort, setSort] = useState<SortKey>("fundamental");
  const [loaded, setLoaded] = useState(false);

  // publish form state
  const [fAuthor, setFAuthor] = useState("");
  const [fTitle, setFTitle] = useState("");
  const [fProblem, setFProblem] = useState("");
  const [fPrinciples, setFPrinciples] = useState<string[]>(["", ""]);
  const [formError, setFormError] = useState<Bi | null>(null);

  /* ── load / seed ── */
  useEffect(() => {
    let initial: Post[];
    try {
      const raw = window.localStorage.getItem(POSTS_KEY);
      if (raw) {
        initial = JSON.parse(raw) as Post[];
      } else {
        initial = seedPosts();
        window.localStorage.setItem(POSTS_KEY, JSON.stringify(initial));
      }
    } catch {
      initial = seedPosts();
    }
    setPosts(initial);

    // hydrate this browser's votes
    const v: Record<string, VoteKind[]> = {};
    try {
      for (const p of initial) {
        const raw = window.localStorage.getItem(`fp-votes-${p.id}`);
        if (raw) v[p.id] = JSON.parse(raw) as VoteKind[];
      }
    } catch {
      /* ignore */
    }
    setVotes(v);
    setLoaded(true);
  }, []);

  /* ── persist posts whenever they change (after load) ── */
  const persist = (next: Post[]) => {
    setPosts(next);
    try {
      window.localStorage.setItem(POSTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  /* ── publish ── */
  const addPrinciple = () => {
    if (fPrinciples.length >= 6) return;
    setFPrinciples((p) => [...p, ""]);
  };
  const removePrinciple = (i: number) => {
    setFPrinciples((p) => (p.length <= 1 ? p : p.filter((_, idx) => idx !== i)));
  };
  const setPrinciple = (i: number, val: string) => {
    setFPrinciples((p) => p.map((x, idx) => (idx === i ? val : x)));
  };

  const publish = () => {
    const title = fTitle.trim();
    const problem = fProblem.trim();
    const principles = fPrinciples.map((s) => s.trim()).filter(Boolean);
    if (!title || !problem || principles.length < 1) {
      setFormError({
        en: "Add a title, a problem, and at least one first principle.",
        zh: "请填写标题、问题，以及至少一条第一性原理。",
      });
      return;
    }
    setFormError(null);
    const post: Post = {
      id: uid(),
      author: fAuthor.trim() || (lang === "zh" ? "匿名" : "Anonymous"),
      title,
      problem,
      principles,
      votesFundamental: 0,
      votesElegant: 0,
      createdAt: Date.now(),
      comments: [],
    };
    persist([post, ...posts]);
    setFAuthor("");
    setFTitle("");
    setFProblem("");
    setFPrinciples(["", ""]);
  };

  /* ── voting (toggle, persisted per browser) ── */
  const toggleVote = (postId: string, kind: VoteKind) => {
    const current = votes[postId] ?? [];
    const has = current.includes(kind);
    const nextForPost = has ? current.filter((k) => k !== kind) : [...current, kind];
    const nextVotes = { ...votes, [postId]: nextForPost };
    setVotes(nextVotes);
    try {
      window.localStorage.setItem(`fp-votes-${postId}`, JSON.stringify(nextForPost));
    } catch {
      /* ignore */
    }
    const delta = has ? -1 : 1;
    persist(
      posts.map((p) =>
        p.id !== postId
          ? p
          : kind === "fundamental"
            ? { ...p, votesFundamental: Math.max(0, p.votesFundamental + delta) }
            : { ...p, votesElegant: Math.max(0, p.votesElegant + delta) },
      ),
    );
  };

  /* ── add layered comment ── */
  const addComment = (postId: string, layer: Layer, author: string, text: string) => {
    const t = text.trim();
    if (!t) return;
    const comment: Comment = {
      id: uid(),
      layer,
      author: author.trim() || (lang === "zh" ? "匿名" : "Anonymous"),
      text: t,
      createdAt: Date.now(),
    };
    persist(posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)));
  };

  /* ── sorted view ── */
  const sorted = useMemo(() => {
    const copy = [...posts];
    if (sort === "fundamental") copy.sort((a, b) => b.votesFundamental - a.votesFundamental || b.createdAt - a.createdAt);
    else if (sort === "elegant") copy.sort((a, b) => b.votesElegant - a.votesElegant || b.createdAt - a.createdAt);
    else copy.sort((a, b) => b.createdAt - a.createdAt);
    return copy;
  }, [posts, sort]);

  const sortOptions: { key: SortKey; label: Bi }[] = [
    { key: "fundamental", label: { en: "Most fundamental", zh: "最根本" } },
    { key: "elegant", label: { en: "Most elegant", zh: "最优雅" } },
    { key: "newest", label: { en: "Newest", zh: "最新" } },
  ];

  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      {/* ── header ── */}
      <div className="mb-8">
        <p className="label-mono">
          <T v={{ en: "Community", zh: "社区" }} />
        </p>
        <h2 className="display mt-2 text-3xl text-ghost-50 sm:text-4xl">
          <T v={{ en: "Thinking Space", zh: "思维空间" }} />
        </h2>
        <div className="rule-fp my-5 h-px w-full" />
        <p className="serif max-w-2xl text-[1.02rem] leading-relaxed text-ghost-300">
          <T
            v={{
              en: "Publish a problem reduced to its first principles. The room votes on what is most fundamental and most elegant — and discussion happens across three reasoning layers, not one thread.",
              zh: "发布一个被还原到第一性原理的问题。在这里，大家投票评选最根本、最优雅的拆解——讨论沿着三个推理层展开，而非单一的线性回复。",
            }}
          />
        </p>
      </div>

      {/* ── publish form ── */}
      <PublishForm
        lang={lang}
        author={fAuthor}
        title={fTitle}
        problem={fProblem}
        principles={fPrinciples}
        error={formError}
        onAuthor={setFAuthor}
        onTitle={setFTitle}
        onProblem={setFProblem}
        onPrinciple={setPrinciple}
        onAddPrinciple={addPrinciple}
        onRemovePrinciple={removePrinciple}
        onPublish={publish}
      />

      {/* ── sort control ── */}
      <div className="mb-6 mt-12 flex flex-wrap items-center gap-3">
        <span className="label-mono">
          <T v={{ en: "Sort", zh: "排序" }} />
        </span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((o) => {
            const active = sort === o.key;
            return (
              <button
                key={o.key}
                onClick={() => setSort(o.key)}
                aria-pressed={active}
                className={`mono rounded-full border px-3.5 py-1.5 text-xs transition ${
                  active
                    ? "border-axiom-500/60 bg-axiom-500/15 text-axiom-300"
                    : "border-ghost-700/70 text-ghost-300 hover:border-axiom-500/40 hover:text-axiom-300"
                } ${isZh(o.label, lang) ? "zh" : ""}`}
              >
                {render(o.label, lang)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── post list ── */}
      {!loaded ? null : sorted.length === 0 ? (
        <div className="holo rounded-2xl p-10 text-center">
          <p className={`text-ghost-300 ${lang === "zh" ? "zh" : "serif"}`}>
            <T
              v={{
                en: "No decompositions yet. Be the first to break a problem down to its first principles.",
                zh: "还没有任何拆解。成为第一个把问题还原到第一性原理的人吧。",
              }}
            />
          </p>
        </div>
      ) : (
        <div className="space-y-7">
          {sorted.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              lang={lang}
              myVotes={votes[post.id] ?? []}
              onVote={toggleVote}
              onComment={addComment}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PUBLISH FORM
═══════════════════════════════════════════════════════════════════════════ */
function PublishForm(props: {
  lang: Lang;
  author: string;
  title: string;
  problem: string;
  principles: string[];
  error: Bi | null;
  onAuthor: (v: string) => void;
  onTitle: (v: string) => void;
  onProblem: (v: string) => void;
  onPrinciple: (i: number, v: string) => void;
  onAddPrinciple: () => void;
  onRemovePrinciple: (i: number) => void;
  onPublish: () => void;
}) {
  const { lang } = props;
  const inputCls =
    "w-full rounded-lg border border-ghost-700/70 bg-void-900/70 px-3.5 py-2.5 text-sm text-ghost-100 placeholder:text-ghost-500 outline-none transition focus:border-axiom-500/60 focus:bg-void-900";

  return (
    <div className="holo rounded-2xl p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-spark-500" />
        <p className="label-mono">
          <T v={{ en: "New decomposition", zh: "新建拆解" }} />
        </p>
      </div>

      <div className="grid gap-4">
        {/* author + title */}
        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <label className="block">
            <span className="label-mono mb-1.5 block !text-ghost-300">
              <T v={{ en: "Name (optional)", zh: "署名（可选）" }} />
            </span>
            <input
              className={inputCls}
              value={props.author}
              onChange={(e) => props.onAuthor(e.target.value)}
              placeholder={lang === "zh" ? "匿名" : "Anonymous"}
            />
          </label>
          <label className="block">
            <span className="label-mono mb-1.5 block !text-ghost-300">
              <T v={{ en: "Title", zh: "标题" }} />
            </span>
            <input
              className={inputCls}
              value={props.title}
              onChange={(e) => props.onTitle(e.target.value)}
              placeholder={lang === "zh" ? "例如：为什么会议总是太长？" : "e.g. Why are meetings always too long?"}
            />
          </label>
        </div>

        {/* problem */}
        <label className="block">
          <span className="label-mono mb-1.5 block !text-ghost-300">
            <T v={{ en: "The problem", zh: "问题" }} />
          </span>
          <textarea
            className={`${inputCls} min-h-[88px] resize-y leading-relaxed`}
            value={props.problem}
            onChange={(e) => props.onProblem(e.target.value)}
            placeholder={
              lang === "zh"
                ? "用一两句话陈述被普遍接受、却值得拆解的命题。"
                : "State the accepted claim worth breaking apart, in a sentence or two."
            }
          />
        </label>

        {/* principles */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="label-mono !text-ghost-300">
              <T v={{ en: "First principles — the irreducible truths", zh: "第一性原理——不可再分的真相" }} />
            </span>
            <span className="mono text-[0.65rem] text-ghost-500">{props.principles.length}/6</span>
          </div>
          <div className="space-y-2.5">
            {props.principles.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="mono w-6 shrink-0 text-right text-xs text-axiom-400">{i + 1}.</span>
                <input
                  className={inputCls}
                  value={p}
                  onChange={(e) => props.onPrinciple(i, e.target.value)}
                  placeholder={lang === "zh" ? "一条无法再被分解的事实" : "A fact that cannot be reduced further"}
                />
                <button
                  type="button"
                  onClick={() => props.onRemovePrinciple(i)}
                  disabled={props.principles.length <= 1}
                  aria-label={lang === "zh" ? "移除此条" : "Remove this principle"}
                  className="mono shrink-0 rounded-md border border-ghost-700/70 px-2.5 py-2 text-ghost-300 transition hover:border-node-500/60 hover:text-node-300 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={props.onAddPrinciple}
            disabled={props.principles.length >= 6}
            className={`mono mt-3 rounded-full border border-axiom-500/40 px-3.5 py-1.5 text-xs text-axiom-300 transition hover:border-axiom-500/70 disabled:cursor-not-allowed disabled:opacity-30 ${
              lang === "zh" ? "zh" : ""
            }`}
          >
            {lang === "zh" ? "+ 添加原理" : "+ Add principle"}
          </button>
        </div>

        {/* error + publish */}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <span className={`text-sm text-spark-300 ${props.error && isZh(props.error, lang) ? "zh" : ""}`}>
            {props.error ? render(props.error, lang) : ""}
          </span>
          <button
            type="button"
            onClick={props.onPublish}
            className={`rounded-lg border border-axiom-500/60 bg-axiom-600/20 px-6 py-2.5 text-sm font-medium text-axiom-200 transition hover:bg-axiom-600/35 ${
              lang === "zh" ? "zh" : ""
            }`}
          >
            {lang === "zh" ? "发布" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   POST CARD
═══════════════════════════════════════════════════════════════════════════ */
function PostCard(props: {
  post: Post;
  lang: Lang;
  myVotes: VoteKind[];
  onVote: (postId: string, kind: VoteKind) => void;
  onComment: (postId: string, layer: Layer, author: string, text: string) => void;
}) {
  const { post, lang, myVotes } = props;

  const VoteButton = ({ kind, count, label }: { kind: VoteKind; count: number; label: Bi }) => {
    const voted = myVotes.includes(kind);
    const isFund = kind === "fundamental";
    // static class strings (no runtime interpolation) so Tailwind's JIT picks them up
    const votedCls = isFund
      ? "border-axiom-500/70 bg-axiom-500/15 text-axiom-200"
      : "border-spark-500/70 bg-spark-500/15 text-spark-200";
    const idleCls = isFund
      ? "border-ghost-700/70 text-ghost-300 hover:text-axiom-300 hover:border-axiom-500/50"
      : "border-ghost-700/70 text-ghost-300 hover:text-spark-300 hover:border-spark-500/50";
    const dotVoted = isFund ? "bg-axiom-500" : "bg-spark-500";
    return (
      <button
        type="button"
        onClick={() => props.onVote(post.id, kind)}
        aria-pressed={voted}
        className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition ${
          voted ? votedCls : idleCls
        }`}
      >
        <span
          className={`inline-block h-2 w-2 rounded-full transition ${
            voted ? dotVoted : "bg-ghost-700 group-hover:bg-ghost-500"
          }`}
        />
        <span className={lang === "zh" ? "zh" : ""}>{render(label, lang)}</span>
        <span className="mono tabular-nums opacity-80">{count}</span>
      </button>
    );
  };

  return (
    <article className="holo rise-in rounded-2xl p-6 sm:p-7">
      {/* meta */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={`text-sm text-axiom-300 ${isZh(post.author, lang) ? "zh" : ""}`}>{render(post.author, lang)}</span>
        <span className="text-ghost-700">·</span>
        <span className="mono text-[0.7rem] text-ghost-500">{relTime(post.createdAt, lang)}</span>
      </div>

      {/* title + problem */}
      <h3 className={`display text-xl text-ghost-50 sm:text-2xl ${isZh(post.title, lang) ? "zh" : ""}`}>
        {render(post.title, lang)}
      </h3>
      <p className={`mt-2.5 leading-relaxed text-ghost-300 ${isZh(post.problem, lang) ? "zh" : "serif"}`}>
        {render(post.problem, lang)}
      </p>

      {/* principles */}
      <div className="mt-5">
        <p className="label-mono mb-2.5">
          <T v={{ en: "First principles", zh: "第一性原理" }} />
        </p>
        <ol className="space-y-2">
          {post.principles.map((pr, i) => (
            <li key={i} className="flex gap-3">
              <span className="mono mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-axiom-500/40 text-[0.65rem] text-axiom-300">
                {i + 1}
              </span>
              <span className={`text-[0.95rem] leading-relaxed text-ghost-100 ${isZh(pr, lang) ? "zh" : ""}`}>
                {render(pr, lang)}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* votes */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        <VoteButton kind="fundamental" count={post.votesFundamental} label={{ en: "Most fundamental", zh: "最根本" }} />
        <VoteButton kind="elegant" count={post.votesElegant} label={{ en: "Most elegant", zh: "最优雅" }} />
      </div>

      <div className="rule-fp my-6 h-px w-full opacity-60" />

      {/* layered comments */}
      <div className="grid gap-5 lg:grid-cols-3">
        {LAYERS.map((layer) => (
          <LayerColumn
            key={layer.key}
            layer={layer}
            lang={lang}
            comments={post.comments.filter((c) => c.layer === layer.key)}
            onAdd={(author, text) => props.onComment(post.id, layer.key, author, text)}
          />
        ))}
      </div>
    </article>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   LAYER COLUMN — one of the three reasoning buckets
═══════════════════════════════════════════════════════════════════════════ */
function LayerColumn(props: {
  layer: (typeof LAYERS)[number];
  lang: Lang;
  comments: Comment[];
  onAdd: (author: string, text: string) => void;
}) {
  const { layer, lang, comments } = props;
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    props.onAdd(author, text);
    setAuthor("");
    setText("");
    setOpen(false);
  };

  const accent = layer.accent; // "node" | "axiom" | "spark"
  const headColor =
    accent === "node" ? "text-node-300" : accent === "axiom" ? "text-axiom-300" : "text-spark-300";

  return (
    <div className="rounded-xl border border-ghost-700/50 bg-void-900/40 p-4">
      {/* layer head */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${layer.dot}`} />
          <span className={`text-sm font-medium ${headColor} ${lang === "zh" ? "zh" : ""}`}>
            {render(layer.label, lang)}
          </span>
        </div>
        <span className="mono rounded-full border border-ghost-700/70 px-2 py-0.5 text-[0.65rem] text-ghost-500">
          {comments.length}
        </span>
      </div>
      <p className={`mb-3 text-[0.72rem] leading-snug text-ghost-500 ${lang === "zh" ? "zh" : ""}`}>
        {render(layer.hint, lang)}
      </p>

      {/* comments */}
      <div className="space-y-2.5">
        {comments.length === 0 ? (
          <p className={`text-[0.78rem] italic text-ghost-700 ${lang === "zh" ? "zh" : ""}`}>
            {lang === "zh" ? "此层暂无内容" : "Nothing in this layer yet"}
          </p>
        ) : (
          comments
            .slice()
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((c) => (
              <div key={c.id} className="rounded-lg bg-void-800/50 px-3 py-2.5">
                <p className={`text-[0.85rem] leading-relaxed text-ghost-100 ${isZh(c.text, lang) ? "zh" : ""}`}>
                  {render(c.text, lang)}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`text-[0.7rem] ${headColor} ${isZh(c.author, lang) ? "zh" : ""}`}>
                    {render(c.author, lang)}
                  </span>
                  <span className="mono text-[0.62rem] text-ghost-700">{relTime(c.createdAt, lang)}</span>
                </div>
              </div>
            ))
        )}
      </div>

      {/* add to this layer */}
      {open ? (
        <div className="mt-3 space-y-2">
          <input
            className="w-full rounded-md border border-ghost-700/70 bg-void-900/70 px-2.5 py-1.5 text-xs text-ghost-100 placeholder:text-ghost-500 outline-none focus:border-ghost-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={lang === "zh" ? "署名（可选）" : "Name (optional)"}
          />
          <textarea
            className="min-h-[64px] w-full resize-y rounded-md border border-ghost-700/70 bg-void-900/70 px-2.5 py-2 text-xs leading-relaxed text-ghost-100 placeholder:text-ghost-500 outline-none focus:border-ghost-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              lang === "zh" ? "向此推理层添加你的思考……" : "Add your thinking to this layer…"
            }
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submit}
              className={`mono flex-1 rounded-md border px-3 py-1.5 text-xs transition ${layer.chip} ${
                lang === "zh" ? "zh" : ""
              }`}
            >
              {lang === "zh" ? "提交" : "Post"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setText("");
                setAuthor("");
              }}
              className={`mono rounded-md border border-ghost-700/70 px-3 py-1.5 text-xs text-ghost-500 transition hover:text-ghost-300 ${
                lang === "zh" ? "zh" : ""
              }`}
            >
              {lang === "zh" ? "取消" : "Cancel"}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mono mt-3 w-full rounded-md border border-dashed px-3 py-1.5 text-xs transition ${layer.chip} ${
            lang === "zh" ? "zh" : ""
          }`}
        >
          {lang === "zh" ? "在此层添加" : "Add to this layer"}
        </button>
      )}
    </div>
  );
}
