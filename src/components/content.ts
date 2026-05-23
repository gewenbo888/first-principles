import { Bi } from "./lang";

/* ============================================================
   NAVIGATION / SECTION SPINE
   ============================================================ */
export type NavItem = { id: string; label: Bi };
export const NAV: NavItem[] = [
  { id: "method", label: { en: "Method", zh: "方法" } },
  { id: "theory", label: { en: "Theory", zh: "理论" } },
  { id: "history", label: { en: "Lineage", zh: "谱系" } },
  { id: "applications", label: { en: "Applications", zh: "应用" } },
  { id: "engine", label: { en: "The Engine", zh: "引擎" } },
  { id: "library", label: { en: "Library", zh: "藏书阁" } },
  { id: "space", label: { en: "Thinking Space", zh: "思维空间" } },
];

/* ============================================================
   THE METHOD — the canonical first-principles loop
   ============================================================ */
export type Step = { n: string; name: Bi; gloss: Bi; prompt: Bi; accent: string };
export const METHOD: Step[] = [
  {
    n: "01", name: { en: "State the problem", zh: "厘清问题" },
    gloss: {
      en: "Write the question in plain, exact language. A vague problem cannot be decomposed; precision is the first reduction.",
      zh: "用朴素而精确的语言把问题写下来。模糊的问题无法被分解；精确，本身就是第一次还原。",
    },
    prompt: { en: "What exactly am I trying to explain or build?", zh: "我究竟想解释或建造什么？" },
    accent: "#5b9dff",
  },
  {
    n: "02", name: { en: "Surface assumptions", zh: "揭示假设" },
    gloss: {
      en: "List every belief you are carrying — especially the invisible ones inherited from convention, authority, or 'how it's always done'. Each is a candidate for deletion.",
      zh: "列出你携带的每一个信念——尤其是那些隐形的、从惯例、权威或「向来如此」中继承来的。它们每一个，都是被删除的候选。",
    },
    prompt: { en: "What am I assuming that I have never checked?", zh: "我假定了什么，却从未核验？" },
    accent: "#b07cff",
  },
  {
    n: "03", name: { en: "Reduce to base truths", zh: "还原至基本真理" },
    gloss: {
      en: "Strip the problem down to what must be true — the physics, the mathematics, the definitions, the conserved quantities. These are the things you cannot argue with.",
      zh: "把问题剥到「必然为真」之处——物理、数学、定义、守恒量。这些，是你无法与之争辩的东西。",
    },
    prompt: { en: "What is true here regardless of opinion or precedent?", zh: "在此处，无关意见或先例，什么必然为真？" },
    accent: "#5b9dff",
  },
  {
    n: "04", name: { en: "Find the irreducible", zh: "找出不可约者" },
    gloss: {
      en: "Among the truths, identify the atoms — the components that cannot be broken down further. These are your real building blocks, your floor.",
      zh: "在诸真理之中，辨认出原子——那些再也无法被分解的成分。它们，是你真正的积木，是你的地板。",
    },
    prompt: { en: "What are the atoms I will build from?", zh: "我将用以建造的原子，是哪些？" },
    accent: "#aecfff",
  },
  {
    n: "05", name: { en: "Reconstruct upward", zh: "向上重建" },
    gloss: {
      en: "Rebuild the solution from the atoms alone — as if no prior solution existed. Ignore convention. Ask only what the base truths permit and demand.",
      zh: "仅凭原子，重新建造解法——仿佛此前不存在任何解法。无视惯例。只问：基本真理允许什么、又要求什么。",
    },
    prompt: { en: "If I started from scratch, what would the truths build?", zh: "若从零开始，这些真理会建造出什么？" },
    accent: "#ffb454",
  },
  {
    n: "06", name: { en: "Quantify & iterate", zh: "量化与迭代" },
    gloss: {
      en: "Put numbers on every piece, compare against reality, and re-run the loop as assumptions fall and truths sharpen. First principles is a cycle, not a single descent.",
      zh: "为每一块装上数字，与现实比对，并在假设崩落、真理变利之时，重跑这一循环。第一性原理是一个循环，而非一次性的下降。",
    },
    prompt: { en: "What do the numbers say — and what must I revise?", zh: "数字怎么说——我又必须修正什么？" },
    accent: "#ffb454",
  },
];

/* ============================================================
   THEORY — deep exposition blocks
   ============================================================ */
export type TheoryBlock = { id: string; num: string; title: Bi; sub: Bi; body: Bi; points?: { h: Bi; t: Bi }[] };
export const THEORY: TheoryBlock[] = [
  {
    id: "what", num: "T1",
    title: { en: "What a first principle is", zh: "何为第一性原理" },
    sub: { en: "A truth that stands on nothing beneath it", zh: "一条其下空无依凭的真理" },
    body: {
      en: "Aristotle defined a first principle (πρώτη ἀρχή) as 'the first basis from which a thing is known' — a proposition that cannot be deduced from any other, and which every other claim in a domain ultimately rests upon. To think from first principles is to refuse to take the middle of the chain as your starting point. Instead of accepting a conclusion because it is widely held, or because it resembles something else that worked, you descend to the bedrock — the assertions that are true by physics, by mathematics, or by definition — and you build back up from there. The method is old, but its power is permanent: a conclusion is only as trustworthy as the foundations it was derived from, and most of what we believe was inherited, not derived.",
      zh: "亚里士多德将第一性原理（πρώτη ἀρχή）定义为「一个事物被认识的最初依据」——一个无法从任何其他命题推导出来、而某一领域内一切其他主张最终都依凭于它的命题。从第一性原理思考，就是拒绝把链条的中段当作你的起点。你不再因为某个结论广为接受、或因为它酷似另一个曾经奏效之物而接受它；你下降至基岩——那些凭物理、凭数学、或凭定义而为真的断言——再从那里向上重建。这方法古老，其力量却恒久：一个结论的可信度，至多等于推导它所凭依的根基；而我们所信的大部分，是继承来的，不是推导来的。",
    },
    points: [
      { h: { en: "Derivable vs. given", zh: "可推导 vs. 给定" }, t: { en: "A first principle is given; everything else is derived. Confusing the two is the root of most bad reasoning.", zh: "第一性原理是给定的；其余一切是推导的。混淆二者，是大多数糟糕推理的根源。" } },
      { h: { en: "Domain-relative", zh: "相对于领域" }, t: { en: "What is irreducible in economics may be derived in physics. First principles are the floor of a given domain, not of the universe.", zh: "在经济学中不可约的，在物理学中或可推导。第一性原理是某一领域的地板，而非宇宙的地板。" } },
      { h: { en: "Few and load-bearing", zh: "少而承重" }, t: { en: "Good foundations are sparse. If your 'first principles' number in the dozens, most are disguised assumptions.", zh: "好的根基是稀疏的。若你的「第一性原理」多达数十条，其中大部分是伪装的假设。" } },
    ],
  },
  {
    id: "ontology", num: "T2",
    title: { en: "The ontology of knowledge", zh: "知识的本体论" },
    sub: { en: "What are the things a domain is really made of?", zh: "一个领域，究竟由什么东西构成？" },
    body: {
      en: "Ontology asks what exists — what the irreducible furniture of a domain actually is. Before you can reason from first principles, you must know what the principles are about. In mechanics, the furniture is mass, length, time, charge; in chemistry, atoms and bonds and energy; in a business, it is materials, labor, energy, capital, and information. The discipline of first-principles thinking begins as an ontological audit: you replace the fuzzy, high-level objects you were handed ('a rocket', 'a degree', 'a battery') with the primitive entities they are actually composed of. A rocket is not an irreducible object with an irreducible price — it is a specific arrangement of aluminum, carbon fiber, copper, and fuel, each of which trades on a commodity market. The moment you see the primitives, the inherited price tag stops looking like a law of nature.",
      zh: "本体论追问的是：什么存在——一个领域那不可约的「家具」究竟是什么。在你能够从第一性原理推理之前，你必须知道这些原理是关于什么的。在力学中，家具是质量、长度、时间、电荷；在化学中，是原子、化学键与能量；在一桩生意里，是材料、人工、能源、资本与信息。第一性原理思维的修炼，始于一次本体论的盘点：你把别人递给你的那些模糊、高层的对象（「一枚火箭」「一纸文凭」「一块电池」）替换为它们实际所由构成的原始实体。一枚火箭并非一个带着不可约价格的不可约对象——它是铝、碳纤维、铜与燃料的某种特定排布，而其中每一样都在大宗商品市场上交易。当你看见这些原始构件的那一刻，那继承来的价签，便不再像是一条自然律。",
    },
  },
  {
    id: "epistemology", num: "T3",
    title: { en: "The epistemology of reasoning", zh: "推理的认识论" },
    sub: { en: "How does a claim earn the right to be called true?", zh: "一个主张，如何赢得被称为「真」的资格？" },
    body: {
      en: "Epistemology asks how we know — what justifies a belief. First-principles thinking is, at heart, an epistemic hygiene: a refusal to let any proposition into the foundation unless it has earned its place. There are only a few sources of justification strong enough to bear weight. Logical and mathematical necessity (a thing cannot both be and not be; 2+2 cannot equal 5). Physical law, confirmed by measurement (energy is conserved; the speed of light is fixed). Direct definition (a kilogram is this much mass). Everything else — testimony, tradition, analogy, intuition, consensus — may be useful as a shortcut, but it is not a foundation, and the careful thinker keeps a clear line between the two. Most reasoning errors are smuggled in at this border: an assumption disguised as a fact, an analogy mistaken for a derivation, a convention treated as a constraint.",
      zh: "认识论追问的是：我们如何知道——是什么为一个信念辩护。第一性原理思维，其内核是一种认识上的卫生：拒绝让任何命题进入根基，除非它赢得了自己的位置。能够承重的辩护来源，只有寥寥几种。逻辑与数学的必然性（一物不能既是又不是；2+2 不可能等于 5）。经测量证实的物理定律（能量守恒；光速恒定）。直接的定义（一千克，就是这么多质量）。其余的一切——证词、传统、类比、直觉、共识——作为捷径或许有用，但它不是根基；审慎的思考者，会在二者之间划一条清晰的线。大多数推理的谬误，正是在这条边界上被偷渡进来的：一个假设伪装成事实，一个类比被误认作推导，一种惯例被当成了约束。",
    },
  },
  {
    id: "vs-analogy", num: "T4",
    title: { en: "First principles vs. analogy", zh: "第一性原理 vs. 类比" },
    sub: { en: "Why copying the past caps how far you can go", zh: "为何复制过去，会为你能走多远封顶" },
    body: {
      en: "Almost all everyday reasoning is by analogy: we do what was done before, with small variations. This is fast, cheap, and usually right — the accumulated wisdom of analogy is most of culture. But analogy has a ceiling built into it. When you reason 'this is like that, so do what that did', you silently inherit every assumption baked into the precedent, including the ones that were never true or are no longer true. A car company that designs by analogy will keep building slightly better versions of the car it already makes; it cannot, from inside that frame, ask whether the car should exist. First-principles thinking is the deliberate, expensive act of dropping the precedent entirely and asking what the base truths alone would produce. Most of the time you will rebuild something close to what already existed — confirming the analogy was sound. Occasionally you will find that everyone was anchored to a number, a material, or a method that the physics never required, and the gap between the inherited answer and the derived one is where breakthroughs live.",
      zh: "几乎所有日常推理，都是类比式的：我们沿用从前的做法，略加变化。这快速、廉价，而且通常正确——类比所累积的智慧，构成了文化的大部分。但类比，内建了一道天花板。当你推理「这个像那个，所以照那个做」时，你便无声地继承了那先例中所烘焙进去的每一个假设，包括那些从不为真、或已不再为真的。一家靠类比来设计的汽车公司，会不断造出它已在造的那辆车的略好版本；身处那框架之内，它无法追问这辆车是否应当存在。第一性原理思维，是一种刻意的、昂贵的行为：彻底抛开先例，追问仅凭基本真理会产生什么。大多数时候，你会重建出与已存在之物相近的东西——这恰恰确认了那类比是稳健的。偶尔，你会发现所有人都被锚定在某个数字、某种材料、或某个方法上，而物理从未对此有过要求；那继承来的答案与推导出的答案之间的鸿沟，正是突破栖居之地。",
    },
  },
  {
    id: "vs-heuristics", num: "T5",
    title: { en: "First principles vs. heuristics", zh: "第一性原理 vs. 启发式" },
    sub: { en: "Fast shortcuts, and when they betray you", zh: "快速的捷径，及它们何时背叛你" },
    body: {
      en: "Heuristics are the rules of thumb the mind uses to decide quickly under uncertainty: anchor to the first number you hear, judge frequency by how easily examples come to mind, prefer the familiar, follow the crowd. They evolved because they are usually good enough and enormously cheaper than full analysis — you cannot derive everything from scratch and still catch the bus. But each heuristic has a predictable failure mode, a bias, and in exactly the situations that matter most — high stakes, novel structure, adversarial framing — the shortcut quietly delivers the wrong answer with full confidence. First-principles thinking is the tool you reach for precisely when the cost of being wrong exceeds the cost of thinking: you spend the effort to derive, because the heuristic cannot be trusted here. The mature reasoner is bilingual — fluent in fast heuristics for the ordinary and in slow derivation for the decisive — and, crucially, knows which situation they are in.",
      zh: "启发式，是心智在不确定下为了快速决断而使用的经验法则：锚定于你听到的第一个数字，凭例子涌现的难易来判断频率，偏好熟悉之物，随大流。它们之所以演化出来，是因为它们通常足够好，且远比完整分析廉价——你不可能凡事从零推导，还赶得上那班车。但每一种启发式，都有一个可预测的失效模式、一种偏差；而恰恰在最要紧的情形里——高风险、新结构、被对手刻意构陷的框架——这捷径会悄然交出错误的答案，却满怀自信。第一性原理思维，正是你在「犯错的代价超过思考的代价」时所要取用的工具：你花费气力去推导，因为启发式在此不可信任。成熟的推理者是「双语」的——对寻常之事流利地使用快速启发式，对决定性之事则缓慢地推导——而且，关键在于，他知道自己身处哪一种情形。",
    },
  },
];

/* ============================================================
   THE DECOMPOSITION MODEL — shared by Engine + Applications
   ============================================================ */
export type Assumption = { text: Bi; verdict: "false" | "shaky" | "holds"; note: Bi };
export type Decomposition = {
  id: string;
  domain: Bi;
  icon: string;          // single glyph/letter
  problem: Bi;
  context: Bi;           // one-line framing
  assumptions: Assumption[];
  truths: Bi[];          // base truths / irreducible components
  reconstruction: Bi;    // the rebuilt solution prose
  result: Bi;            // the punchline / quantified outcome
  accent: string;
  keywords: string[];    // for the Engine's matcher
};

export const DECOMPOSITIONS: Decomposition[] = [
  {
    id: "rocket",
    domain: { en: "Business · Physics", zh: "商业 · 物理" },
    icon: "▲",
    problem: { en: "Why does a rocket cost ~$65 million — and could it cost far less?", zh: "一枚火箭为何要价约 6500 万美元——它能否便宜得多？" },
    context: { en: "The SpaceX reduction: stop pricing rockets like aerospace heritage; price them like materials plus work.", zh: "SpaceX 的还原：别再用航天传统给火箭定价；用「材料加工费」给它定价。" },
    assumptions: [
      { text: { en: "A rocket's price is set by what rockets have historically cost.", zh: "火箭的价格，由火箭历来的成本决定。" }, verdict: "false", note: { en: "Heritage pricing anchors to the last contract, not to physics.", zh: "传统定价锚定于上一份合同，而非物理。" } },
      { text: { en: "You must buy a finished rocket from an established prime contractor.", zh: "你必须从既有的主承包商手中购买一枚成品火箭。" }, verdict: "false", note: { en: "You can buy the raw materials and integrate them yourself.", zh: "你可以购入原材料，自行集成。" } },
      { text: { en: "Each rocket is used once and discarded.", zh: "每一枚火箭只用一次，随后丢弃。" }, verdict: "shaky", note: { en: "Nothing in physics forbids landing and reflying the booster.", zh: "物理中没有任何东西禁止回收并复飞助推级。" } },
    ],
    truths: [
      { en: "A rocket is mostly aluminum alloys, copper, carbon fiber, and titanium — all commodities with public market prices.", zh: "一枚火箭主要由铝合金、铜、碳纤维与钛构成——全是有公开市场价的大宗商品。" },
      { en: "The materials cost of an orbital rocket is on the order of 2% of its historical sale price.", zh: "一枚入轨火箭的材料成本，约为其历史售价的 2% 量级。" },
      { en: "Energy to reach orbit is fixed by physics; the propellant to deliver it is comparatively cheap.", zh: "入轨所需的能量由物理固定；输送这些能量的推进剂，相对廉价。" },
      { en: "The expensive part is fabrication, integration, and throwing the hardware away — not the atoms.", zh: "昂贵的，是制造、集成，以及把硬件扔掉——而非那些原子。" },
    ],
    reconstruction: {
      en: "If the materials are ~2% of the price, the other 98% is process and waste. Build the rocket in-house from commodity stock, vertically integrate the supply chain, and — above all — recover and reuse the most expensive stage. The cost floor is no longer 'what a rocket costs' but 'materials + fabrication + fuel ÷ number of flights'.",
      zh: "若材料仅占价格的约 2%，那另外的 98% 便是工艺与浪费。从大宗原料起，自建火箭，垂直整合供应链，并且——最重要的——回收并复用那最昂贵的一级。成本的地板，不再是「一枚火箭值多少钱」，而是「材料 + 制造 + 燃料 ÷ 飞行次数」。",
    },
    result: {
      en: "Vertical integration plus reusability cut launch cost roughly tenfold. The inherited price was never a law of nature — it was a habit nobody had re-derived.",
      zh: "垂直整合加可复用性，把发射成本压低了约十倍。那继承来的价格从不是自然律——它只是一个无人重新推导过的习惯。",
    },
    accent: "#ffb454",
    keywords: ["rocket", "spacex", "launch", "火箭", "发射", "space"],
  },
  {
    id: "battery",
    domain: { en: "Business", zh: "商业" },
    icon: "▮",
    problem: { en: "Why do battery packs cost $600/kWh — and is that a real floor?", zh: "电池包为何要 600 美元/千瓦时——这是真实的地板吗？" },
    context: { en: "Musk's battery reduction: price the metals on the London Metal Exchange, not the finished pack.", zh: "马斯克的电池还原：在伦敦金属交易所给金属定价，而非给成品电池包定价。" },
    assumptions: [
      { text: { en: "Batteries are expensive and always will be.", zh: "电池很贵，且将永远很贵。" }, verdict: "false", note: { en: "'Always' is an extrapolation of the present, not a derivation.", zh: "「永远」是对当下的外推，而非一次推导。" } },
      { text: { en: "The pack price reflects the cost of its materials.", zh: "电池包的价格，反映了其材料的成本。" }, verdict: "false", note: { en: "Most of the price is manufacturing, margin, and supply structure.", zh: "价格的大部分是制造、利润与供应结构。" } },
    ],
    truths: [
      { en: "A lithium-ion cell is cobalt, nickel, aluminum, graphite, lithium, copper, and a steel/polymer casing.", zh: "一颗锂离子电芯，是钴、镍、铝、石墨、锂、铜，加一个钢/聚合物外壳。" },
      { en: "Each of those is a commodity with a spot price per kilogram on a metals exchange.", zh: "其中每一样，都是在金属交易所有每千克现货价的大宗商品。" },
      { en: "Summed at market prices, the raw materials cost roughly $80/kWh — far below the pack price.", zh: "按市价相加，原材料成本约为 80 美元/千瓦时——远低于电池包价格。" },
      { en: "The gap is cell design, manufacturing scale, yield, and how cleverly you buy the metals.", zh: "其间的差距，是电芯设计、制造规模、良率，以及你买金属买得多聪明。" },
    ],
    reconstruction: {
      en: "If the metals are ~$80/kWh, the path to a cheaper battery is not a breakthrough chemistry but relentless attack on the gap: buy materials on the exchange, combine them in a new factory built for scale, raise yield, and redesign the cell around the cheapest abundant elements.",
      zh: "若金属仅约 80 美元/千瓦时，那通往更便宜电池的路，不是某种突破性化学，而是对那道差距的不懈攻击：在交易所买入材料，在一座为规模而建的新工厂中组合它们，提升良率，并围绕最廉价、最丰富的元素重新设计电芯。",
    },
    result: {
      en: "Reframing the pack as 'metals + manufacturing' turned an accepted $600/kWh into a moving target now well under $150/kWh — and falling. The floor was the commodity price all along.",
      zh: "把电池包重新框定为「金属 + 制造」，把一个被默认的 600 美元/千瓦时，变成了如今远低于 150 美元/千瓦时、且仍在下降的移动靶。地板，自始至终都是那大宗商品的价格。",
    },
    accent: "#5b9dff",
    keywords: ["battery", "batteries", "kwh", "lithium", "电池", "锂"],
  },
  {
    id: "ai",
    domain: { en: "AI · Machine Learning", zh: "人工智能 · 机器学习" },
    icon: "◴",
    problem: { en: "Does a task really need a giant model — or can it be reduced?", zh: "一个任务，真的需要一个巨型模型吗——还是它能被还原？" },
    context: { en: "Model simplification as first-principles: ask what computation the task actually requires, not what is fashionable.", zh: "把模型简化当作第一性原理：追问任务真正需要什么计算，而非什么时髦。" },
    assumptions: [
      { text: { en: "Better results require a bigger model.", zh: "更好的结果，需要更大的模型。" }, verdict: "shaky", note: { en: "Scale helps broadly, but a narrow task may need very little of it.", zh: "规模在广义上有帮助，但一个狭窄任务可能只需其中极少。" } },
      { text: { en: "You must call a frontier model at inference time.", zh: "你必须在推理时调用一个前沿模型。" }, verdict: "false", note: { en: "A large model can teach a tiny one offline (distillation).", zh: "一个大模型可以离线教会一个微小模型（蒸馏）。" } },
    ],
    truths: [
      { en: "A model's job is to approximate a function from inputs to outputs; capacity must match the function's true complexity, not its reputation.", zh: "模型的工作，是逼近一个从输入到输出的函数；容量应当匹配函数真实的复杂度，而非它的名声。" },
      { en: "Inference cost scales with parameters and tokens — both are levers you can pull down.", zh: "推理成本随参数与 token 数而变——二者都是你可以向下拉的杠杆。" },
      { en: "Most of a large model's knowledge is irrelevant to any single narrow task.", zh: "一个大模型的大部分知识，对任何单一狭窄任务都无关紧要。" },
      { en: "Distillation, quantization, retrieval, and caching each remove cost without removing the needed capability.", zh: "蒸馏、量化、检索与缓存，每一样都能在不移除所需能力的前提下，移除成本。" },
    ],
    reconstruction: {
      en: "Start from the function the task actually demands. Use the big model to label data or to teach, then distill into the smallest network that holds the accuracy; quantize the weights; retrieve facts instead of memorizing them; cache repeated work. The reasoning chain that mattered is preserved; the dead weight is gone.",
      zh: "从任务真正要求的那个函数出发。用大模型来标注数据、或用以教学，再蒸馏进一个仍能守住精度的最小网络；量化权重；以检索取代记忆事实；缓存重复的计算。要紧的那条推理链被保留下来；多余的死重，则被卸去。",
    },
    result: {
      en: "The same quality can often run at a fraction of the parameters and cost. 'Use the biggest model' was an analogy to others' setups, not a derivation from the task.",
      zh: "同样的质量，常常能以一个零头的参数与成本运行。「用最大的模型」是对别人配置的类比，而非从任务出发的推导。",
    },
    accent: "#b07cff",
    keywords: ["ai", "model", "ml", "neural", "llm", "模型", "人工智能", "机器学习"],
  },
  {
    id: "decision",
    domain: { en: "Personal Life", zh: "个人生活" },
    icon: "◆",
    problem: { en: "Should I take this job / move / degree — or am I just following a script?", zh: "我该接受这份工作 / 搬家 / 读这个学位吗——还是我只是在照剧本走？" },
    context: { en: "Decision decomposition: separate what you actually want from what you were told to want.", zh: "决策分解：把你真正想要的，与别人告诉你该想要的，分开。" },
    assumptions: [
      { text: { en: "This is the next step because it's what people like me do.", zh: "这是下一步，因为「像我这样的人」都这么做。" }, verdict: "false", note: { en: "A social script is an analogy, not a reason.", zh: "社会剧本是一种类比，不是一个理由。" } },
      { text: { en: "More prestige / money is automatically better.", zh: "更多声望 / 金钱，自动地更好。" }, verdict: "shaky", note: { en: "Better only relative to a goal you have actually named.", zh: "「更好」只相对于一个你真正命名过的目标而言。" } },
      { text: { en: "This choice is irreversible.", zh: "这个选择不可逆。" }, verdict: "shaky", note: { en: "Most decisions are doors you can walk back through; few are one-way.", zh: "大多数决定是你能走回去的门；单向门极少。" } },
    ],
    truths: [
      { en: "You have one finite resource that never refills: time, and the attention you spend within it.", zh: "你有一种永不回充的有限资源：时间，以及你在其中花费的注意力。" },
      { en: "Your real objective is some weighting of meaning, autonomy, relationships, security, and growth — not a job title.", zh: "你真正的目标，是意义、自主、关系、安全感与成长的某种加权——而非一个职衔。" },
      { en: "Most outcomes are reversible; the cost of trying is usually smaller than the cost of wondering.", zh: "大多数结果是可逆的；尝试的代价，通常小于「一直琢磨」的代价。" },
      { en: "Future-you has different information; a good decision is one that keeps the most options open at acceptable cost.", zh: "未来的你，握有不同的信息；一个好决定，是在可接受的代价下，为你保留最多选项的那一个。" },
    ],
    reconstruction: {
      en: "Name the objective in your own words. Score each option against that objective, not against what others expect. Weight by reversibility — favor reversible bets you can learn from. Then choose the option that maximizes expected meaning per unit of irreplaceable time, and treat it as an experiment, not a vow.",
      zh: "用你自己的话，命名那个目标。让每个选项对照那目标打分，而非对照他人的期待。按可逆性加权——偏向那些你能从中学习的、可逆的赌注。然后，选择那个能在每单位不可替代的时间里，最大化预期意义的选项，并把它当作一次实验，而非一句誓言。",
    },
    result: {
      en: "The decision stops being 'what should someone like me do?' and becomes 'what do my own base truths build?' — which is the only version you won't resent later.",
      zh: "这决定不再是「像我这样的人该怎么做？」，而成了「我自己的基本真理，会建造出什么？」——这是唯一一个你日后不会怨恨的版本。",
    },
    accent: "#ffc878",
    keywords: ["job", "career", "decision", "move", "degree", "life", "工作", "决定", "选择", "人生"],
  },
  {
    id: "orbit",
    domain: { en: "Physics", zh: "物理" },
    icon: "◯",
    problem: { en: "How fast must something go to stay in orbit — derived from nothing but physics?", zh: "一个物体要多快才能维持在轨——仅凭物理推导？" },
    context: { en: "A pure derivation: no formula memorized, just the base laws and a balance of forces.", zh: "一次纯粹的推导：不背任何公式，只用基本定律与力的平衡。" },
    assumptions: [
      { text: { en: "You need to look up the 'orbital velocity formula'.", zh: "你需要去查「轨道速度公式」。" }, verdict: "false", note: { en: "The formula is derivable in two lines from forces you already know.", zh: "这公式，可从你已知的力，用两行推导出来。" } },
    ],
    truths: [
      { en: "Gravity pulls the object toward Earth's center with force F = GMm/r².", zh: "引力以 F = GMm/r² 的力，把物体拉向地心。" },
      { en: "Circular motion requires a center-pointing force of exactly F = mv²/r.", zh: "圆周运动要求一个指向圆心、恰为 F = mv²/r 的力。" },
      { en: "To orbit is precisely for gravity to supply that required force — no more, no less.", zh: "在轨，恰恰就是让引力供给那所需之力——不多，不少。" },
    ],
    reconstruction: {
      en: "Set the two forces equal: GMm/r² = mv²/r. The mass m cancels — orbital speed does not depend on the satellite's mass. Solve for v: v = √(GM/r). That is the entire derivation; everything else is plugging in numbers.",
      zh: "令两力相等：GMm/r² = mv²/r。质量 m 被约去——轨道速度与卫星自身的质量无关。解出 v：v = √(GM/r)。这就是全部推导；其余一切，不过是代入数字。",
    },
    result: {
      en: "For low Earth orbit, v ≈ 7.9 km/s — about Mach 23. Derived in two lines from forces alone. The 'formula' was never fundamental; the force balance was.",
      zh: "对近地轨道，v ≈ 7.9 公里/秒——约 23 倍音速。仅凭力，两行推出。那「公式」从不根本；力的平衡才是。",
    },
    accent: "#82b6ff",
    keywords: ["orbit", "velocity", "physics", "gravity", "formula", "轨道", "速度", "物理", "引力"],
  },
];

/* ============================================================
   ENGINE — generic scaffold prompts for arbitrary input
   ============================================================ */
export type ScaffoldPrompt = { kind: "assumption" | "truth" | "irreducible" | "reconstruction"; text: Bi };
export const SCAFFOLD: ScaffoldPrompt[] = [
  { kind: "assumption", text: { en: "It has to be done the way it is currently done.", zh: "它必须按照目前的方式来做。" } },
  { kind: "assumption", text: { en: "The current cost / limit is a fixed fact.", zh: "当前的成本 / 限制，是一个固定的事实。" } },
  { kind: "assumption", text: { en: "Experts and precedent have already found the best answer.", zh: "专家与先例，早已找到了最佳答案。" } },
  { kind: "assumption", text: { en: "This category of thing is inherently expensive / hard / slow.", zh: "这一类东西，天生就昂贵 / 困难 / 缓慢。" } },
  { kind: "truth", text: { en: "What is this actually, physically or logically, made of?", zh: "这东西在物理上或逻辑上，究竟由什么构成？" } },
  { kind: "truth", text: { en: "What laws (physics, math, economics) must hold no matter what?", zh: "无论如何，哪些定律（物理、数学、经济）必然成立？" } },
  { kind: "truth", text: { en: "What is conserved, fixed, or required here?", zh: "在此处，什么是守恒的、固定的、或必需的？" } },
  { kind: "irreducible", text: { en: "Which components can no longer be broken down?", zh: "哪些成分，再也无法被分解？" } },
  { kind: "irreducible", text: { en: "What is the true floor cost / minimum effort the laws permit?", zh: "定律所允许的真实成本下限 / 最小努力，是多少？" } },
  { kind: "reconstruction", text: { en: "If you started from these atoms with no precedent, what would you build?", zh: "若你从这些原子出发、毫无先例，你会建造什么？" } },
  { kind: "reconstruction", text: { en: "Where is the gap between the inherited answer and the derived one?", zh: "继承来的答案与推导出的答案之间，鸿沟在哪？" } },
];

/* ============================================================
   KNOWLEDGE LIBRARY — long-form bilingual articles
   ============================================================ */
export type Article = {
  id: string;
  shelf: Bi;             // category
  title: Bi;
  author: Bi;            // figure / source
  era: Bi;
  abstract: Bi;
  body: Bi[];            // paragraphs
  quote?: Bi;
  accent: string;
};

export const ARTICLES: Article[] = [
  {
    id: "aristotle",
    shelf: { en: "Philosophy", zh: "哲学" },
    title: { en: "Aristotle and the First Cause", zh: "亚里士多德与第一因" },
    author: { en: "Aristotle, Metaphysics & Posterior Analytics", zh: "亚里士多德，《形而上学》与《后分析篇》" },
    era: { en: "384–322 BCE", zh: "公元前 384–322 年" },
    abstract: {
      en: "The original statement of the idea: a first principle is that which is known through itself and from which other things are known — the unprovable starting point that makes proof possible at all.",
      zh: "这一观念的最初陈述：第一性原理，是「通过自身被认识、并使其他事物得以被认识」者——那个无法被证明、却使一切证明成为可能的起点。",
    },
    body: [
      {
        en: "Aristotle faced a problem that still defines rigorous thought. If every claim must be justified by another claim, then either the chain of justification goes on forever, or it circles back on itself, or it stops somewhere. The first two are useless: an infinite regress proves nothing, and a circle assumes what it sets out to show. So knowledge, if it exists at all, must rest on starting points that are not themselves proved — propositions grasped directly, true in themselves, requiring nothing beneath them. He called these archai: first principles.",
        zh: "亚里士多德面对着一个至今仍界定着严谨思想的问题。若每一个主张都必须由另一个主张来辩护，那么辩护的链条要么无穷延伸，要么绕回自身，要么在某处停住。前两者皆无用：无穷倒退什么也证明不了，而循环则预设了它本欲证明之物。于是，知识若真存在，就必须依凭于一些其自身未被证明的起点——那些被直接把握、自身为真、其下无需任何依凭的命题。他称之为 archai：第一性原理。",
      },
      {
        en: "Crucially, for Aristotle a first principle is not merely a convenient axiom we agree to assume. It is something prior in the order of being and of knowledge — the cause from which a thing's nature genuinely follows. To understand a triangle is to grasp the few definitions and postulates from which all its properties necessarily flow; to understand change is to find the unmoved source from which motion derives. Science, in his picture, is the work of tracing phenomena back to their first principles and then demonstrating, step by valid step, how the phenomena follow from them.",
        zh: "至关重要的是，对亚里士多德而言，第一性原理并非我们图方便而同意去假定的公理。它是在「存在」与「认识」的秩序中更为在先者——一个事物的本性真正由之而来的那个因。理解一个三角形，就是把握那寥寥几条定义与公设，其一切性质皆由之必然流出；理解变化，就是找到那「不动的源头」，运动由之而来。在他的图景中，科学，就是把现象追溯回它们的第一性原理、再一步步以有效的演绎，展示现象如何由之而来的工作。",
      },
      {
        en: "Twenty-three centuries later the vocabulary has changed but the architecture has not. When an engineer insists on deriving a cost from commodity prices rather than from last year's invoice, when a physicist refuses to accept a formula they cannot rebuild from a force balance, they are doing exactly what Aristotle prescribed: declining to treat a derived, middle-of-the-chain claim as a foundation, and descending instead to the archai. The discipline he named remains the dividing line between knowing why something is true and merely repeating that it is.",
        zh: "二十三个世纪之后，词汇变了，结构却未变。当一位工程师坚持从大宗商品价格、而非从去年的发票来推导成本，当一位物理学家拒绝接受一个他无法从力的平衡中重建的公式时，他们所做的，恰恰是亚里士多德所规定的：拒绝把一个推导出来的、位于链条中段的主张当作根基，转而下降至 archai。他所命名的那门修炼，至今仍是「知其所以然」与「仅仅复述其然」之间的分界线。",
      },
    ],
    quote: { en: "“We do not have knowledge of a thing until we have grasped its first cause.”", zh: "「在把握一个事物的第一因之前，我们并不真正认识它。」" },
    accent: "#5b9dff",
  },
  {
    id: "descartes",
    shelf: { en: "Philosophy", zh: "哲学" },
    title: { en: "Descartes: Demolish, Then Rebuild", zh: "笛卡尔：先拆毁，再重建" },
    author: { en: "René Descartes, Meditations & Discourse on Method", zh: "勒内·笛卡尔，《沉思集》与《方法论》" },
    era: { en: "1596–1650", zh: "1596–1650 年" },
    abstract: {
      en: "The most radical first-principles act ever performed: doubt everything that can possibly be doubted, until one indubitable truth remains — then rebuild the whole edifice of knowledge from that single stone.",
      zh: "有史以来最激进的第一性原理之举：怀疑一切可被怀疑之物，直至剩下一条无可置疑的真理——再从那一块石头，重建整座知识的大厦。",
    },
    body: [
      {
        en: "Descartes noticed that he had, over a lifetime, accepted countless beliefs on authority, habit, and the senses — and that many had turned out false. Rather than correct them one by one, he resolved on a more drastic procedure: to raze the entire structure to the ground, once in his life, and accept nothing back into the foundation unless it was so clear and distinct that it could not possibly be doubted. This is decomposition taken to its absolute limit — not of a rocket or a price, but of the whole of one's knowledge.",
        zh: "笛卡尔注意到，自己一生中曾凭权威、习惯与感官接受了无数信念——而其中许多，后来被证明是假的。他没有逐一去更正，而是决意采取一套更为决绝的程序：在一生中有这么一次，把整座结构夷为平地，绝不让任何东西重新进入根基，除非它清晰、分明到不可能被怀疑。这是被推至绝对极限的分解——分解的不是一枚火箭或一个价格，而是一个人知识的全部。",
      },
      {
        en: "His doubt was methodical and merciless. The senses deceive, so sensory belief is out. Reasoning makes mistakes, so even mathematics is suspended under the hypothesis of a deceiving demon. What survives? Only this: that while he is being deceived, he must exist to be deceived. The very act of doubting is itself a thought, and a thought requires a thinker. Cogito, ergo sum — I think, therefore I am. Here, at last, is a proposition that cannot be doubted without being confirmed, an Archimedean point on which to stand.",
        zh: "他的怀疑是有方法的，也是无情的。感官会欺骗，于是感官信念出局。推理会犯错，于是连数学也在「有一个行骗的恶魔」这一假设下被悬置。还剩下什么？只剩这一条：当他正被欺骗时，他必须存在，才能被欺骗。怀疑这一行为本身就是一个思想，而思想需要一个思想者。Cogito, ergo sum——我思故我在。在这里，终于有了一个命题：它无法被怀疑而不同时被确证，一个可供立足的阿基米德支点。",
      },
      {
        en: "What matters for us is not whether his reconstruction succeeded — philosophers have argued the point for four centuries — but the shape of the move. Descartes shows that the deepest version of first-principles thinking is willing to suspend not just a convention or a price, but the very floor you have been standing on, in order to find out which planks are load-bearing and which were only ever painted to look solid. Most of our certainties, examined this way, turn out to be inherited furniture. The few that survive the demolition are worth more than everything that didn't.",
        zh: "于我们要紧的，并非他的重建是否成功——哲学家们已为此争论了四个世纪——而是这一步的形状。笛卡尔表明：第一性原理思维最深的版本，愿意悬置的不只是一个惯例或一个价格，而是你一直立于其上的那块地板本身，只为查明哪些木板真正承重，哪些不过是被漆成了看似坚实的样子。我们的大多数确定性，如此审视之下，都成了继承来的家具。而那少数熬过拆毁的，比所有未能熬过的加在一起，更值钱。",
      },
    ],
    quote: { en: "“If you would be a real seeker after truth, you must at least once in your life doubt, as far as possible, all things.”", zh: "「若你想成为真理真正的求索者，你必须在一生中至少有一次，尽其所能地，怀疑一切。」" },
    accent: "#b07cff",
  },
  {
    id: "newton",
    shelf: { en: "Science", zh: "科学" },
    title: { en: "Newton's Rules of Reasoning", zh: "牛顿的推理法则" },
    author: { en: "Isaac Newton, Principia Mathematica", zh: "艾萨克·牛顿，《自然哲学的数学原理》" },
    era: { en: "1643–1727", zh: "1643–1727 年" },
    abstract: {
      en: "From three laws of motion and one law of gravitation, Newton derived the falling apple, the tides, the orbits of the planets, and the path of comets — a working demonstration of how much a few true principles can carry.",
      zh: "从三条运动定律与一条万有引力定律，牛顿推导出了下落的苹果、潮汐、行星的轨道与彗星的路径——一次活生生的演示：寥寥几条真原理，能承载多少。",
    },
    body: [
      {
        en: "Before Newton, the heavens and the earth were thought to obey different rules: the celestial realm was perfect and circular, the earthly one corrupt and linear. Newton's astonishing claim was that a single set of principles governs both — that the force pulling an apple to the ground is the same force holding the Moon in its orbit. He did not arrive at this by analogy to prior systems; he arrived at it by asking what laws, if true everywhere, would necessarily produce the motions actually observed, and then proving the derivation mathematically.",
        zh: "在牛顿之前，天与地被认为遵循不同的法则：天界完美而循环，尘世败坏而直线。牛顿那惊人的主张是：同一组原理，统辖着二者——把苹果拉向地面的那个力，与维系月亮于其轨道的那个力，是同一个。他抵达此结论，不是靠类比于先前的体系；他靠的是追问：若哪些定律处处为真，便会必然产生实际观测到的那些运动——然后，以数学证明那推导。",
      },
      {
        en: "He was explicit about the method. In the Principia he laid down his Regulae Philosophandi — rules of reasoning — instructing the natural philosopher to admit no more causes than are both true and sufficient to explain the phenomena, and to treat properties found universally in experiment as universal until experiment says otherwise. Most famous is his refusal to fake a foundation: hypotheses non fingo, 'I feign no hypotheses'. He would describe how gravity acts, and derive its consequences with ferocious rigor, but he declined to invent an unfounded story about what gravity is. A first principle you can measure and build on is worth more than a deep-sounding explanation you made up.",
        zh: "他对方法直言不讳。在《原理》中，他立下了他的 Regulae Philosophandi——推理的法则——告诫自然哲学家：不要承认超过「既为真、又足以解释现象」所需的更多原因，并把实验中普遍发现的性质视为普遍的，直到实验另有所言。最著名的，是他拒绝伪造一个根基：hypotheses non fingo，「我不杜撰假说」。他会描述引力如何作用，并以凶猛的严谨推导其后果，却拒绝去发明一个关于「引力是什么」的、毫无根据的故事。一个你能测量、并能在其上建造的第一性原理，胜过一个你编造出来、听上去深刻的解释。",
      },
      {
        en: "The payoff was overwhelming. The same handful of principles explained why the tides rise twice a day, why the planets sweep equal areas in equal times, why a thrown stone and an orbiting moon trace the same kind of curve. This is the signature of genuine first principles: they are few, and they reach absurdly far. When a small number of assumptions explains an enormous range of phenomena, you have probably found bedrock — and when you need a new assumption for every new fact, you have probably found none.",
        zh: "回报是压倒性的。同样寥寥几条原理，解释了为何潮水一天涨落两次，为何行星在相等时间里扫过相等的面积，为何一块掷出的石头与一个绕行的月亮，描出同一类曲线。这正是真正第一性原理的标志：它们寥寥可数，却伸展得荒谬地远。当少数几个假设解释了极其广阔的一系列现象，你多半已找到基岩——而当你每遇一个新事实就需要一个新假设，你多半一无所获。",
      },
    ],
    quote: { en: "“I feign no hypotheses. It is enough that gravity does really exist and acts according to the laws I have explained.”", zh: "「我不杜撰假说。引力确实存在、并按我所阐明的定律作用，这便已足够。」" },
    accent: "#82b6ff",
  },
  {
    id: "einstein",
    shelf: { en: "Science", zh: "科学" },
    title: { en: "Einstein's Two Postulates", zh: "爱因斯坦的两条公设" },
    author: { en: "Albert Einstein, On the Electrodynamics of Moving Bodies", zh: "阿尔伯特·爱因斯坦，《论动体的电动力学》" },
    era: { en: "1879–1955", zh: "1879–1955 年" },
    abstract: {
      en: "Special relativity is the purest modern example of first-principles reasoning: from two simple postulates, taken absolutely seriously, Einstein re-derived space and time themselves — and was willing to give up common sense rather than the principles.",
      zh: "狭义相对论，是第一性原理推理最纯粹的现代范例：从两条简单的公设出发、并把它们绝对认真地对待，爱因斯坦重新推导了空间与时间本身——而且，他宁可放弃常识，也不放弃那两条原理。",
    },
    body: [
      {
        en: "By 1905 physics had a contradiction at its heart. The laws of mechanics said velocities simply add: run forward on a train and your speed relative to the ground is the train's plus your own. But Maxwell's equations said light always travels at the same speed c, no matter who measures it. Both could not be naively true. The established move was to patch the gap with an invisible medium, the 'ether', through which light supposedly propagated — an assumption inherited to save the old framework.",
        zh: "到 1905 年，物理学的核心藏着一个矛盾。力学定律说速度只是简单相加：在火车上向前跑，你相对地面的速度，就是火车的加上你自己的。但麦克斯韦方程组说，光总是以同一个速度 c 行进，无论谁来测量。二者不可能都朴素地为真。当时既定的做法，是用一种看不见的介质——「以太」——来弥合这道裂缝，光据说便在其中传播——一个为拯救旧框架而被继承下来的假设。",
      },
      {
        en: "Einstein's move was the opposite of a patch. He took two propositions as first principles and refused to compromise them: that the laws of physics are the same in every uniformly moving frame, and that light travels at c for every observer. He then asked, with relentless honesty, what must be true of space and time if both postulates hold exactly. The answer was that the assumptions everyone had treated as bedrock — that two events can be simultaneous in an absolute sense, that a meter is a meter and a second is a second for everyone — were not bedrock at all. They were derived, and they were wrong.",
        zh: "爱因斯坦的一招，与「打补丁」恰恰相反。他把两个命题当作第一性原理，并拒绝向它们妥协：物理定律在每一个匀速运动的参考系中都相同；以及，光对每一个观察者都以 c 行进。然后，他以不懈的诚实追问：若这两条公设精确成立，那么空间与时间必然为真的是什么。答案是：那些人人都当作基岩的假设——两个事件能在绝对意义上同时发生，一米对所有人都是一米、一秒对所有人都是一秒——根本不是基岩。它们是推导出来的，而且，它们错了。",
      },
      {
        en: "Time dilates; lengths contract; simultaneity is relative; and mass and energy turn out to be the same thing, E = mc². None of this was added by hand — it all fell out of taking two principles seriously and following the mathematics wherever it led, even off the cliff of intuition. This is the defining discipline and the defining cost of first-principles thinking: when a true principle collides with a cherished assumption, the assumption must yield. Einstein kept the postulates and surrendered absolute time. The universe, it turned out, agreed with the principles, not with common sense.",
        zh: "时间膨胀；长度收缩；同时性是相对的；而质量与能量原来是同一样东西，E = mc²。这一切，没有一样是手工添加的——它们全都是从「认真对待两条原理、并跟随数学走到它所引向之处，哪怕是走下直觉的悬崖」中跌落出来的。这正是第一性原理思维那界定性的修炼，也是它界定性的代价：当一条真原理与一个被珍视的假设相撞，让步的，必须是假设。爱因斯坦保住了公设，交出了绝对时间。结果，宇宙站在原理那一边，而非常识那一边。",
      },
    ],
    quote: { en: "“The whole of science is nothing more than a refinement of everyday thinking.”", zh: "「整个科学，不过是日常思维的一种精炼。」" },
    accent: "#5b9dff",
  },
  {
    id: "musk",
    shelf: { en: "Modern Practice", zh: "当代实践" },
    title: { en: "Musk and 'the Physics Up'", zh: "马斯克与「从物理出发往上建」" },
    author: { en: "Engineering practice at SpaceX & Tesla", zh: "SpaceX 与特斯拉的工程实践" },
    era: { en: "2002 – present", zh: "2002 年 – 至今" },
    abstract: {
      en: "The most cited modern popularizer of the method made it concrete and quantitative: boil a product down to its raw materials at commodity prices, compute the true floor, and treat the gap to the market price as an engineering problem.",
      zh: "这一方法最常被引用的当代普及者，把它变得具体而可量化：把一件产品煮到只剩其以大宗商品价计的原材料，算出真实的地板，再把它与市场价之间的鸿沟，当作一个工程问题来处理。",
    },
    body: [
      {
        en: "Asked why he reasons from first principles, Musk frames it as a contrast: most people reason by analogy — they do something because it's like what was done before, with minor variation — which is mentally cheap but bounded by precedent. First principles, he says, means boiling things down to the most fundamental truths you are sure of, and then reasoning up from there. The example he returns to is the battery pack. People said batteries were irreducibly expensive at $600 per kilowatt-hour because that is what they had always cost. He asked instead: what are the material constituents, and what are those worth on the London Metal Exchange? Cobalt, nickel, aluminum, carbon, the separator, a steel can — summed at spot prices, around $80/kWh. Everything between $80 and $600 is not physics; it is manufacturing, and manufacturing can be attacked.",
        zh: "当被问及为何从第一性原理推理时，马斯克把它框定为一种对照：大多数人靠类比推理——他们做某件事，是因为它像从前所做之事、略加变化——这在脑力上廉价，却被先例所限。第一性原理，他说，意味着把事物煮到只剩你确信的最根本真理，再从那里往上推理。他反复回到的例子，是电池包。人们说电池在 600 美元/千瓦时上不可约地昂贵，因为它一向就是这个价。他却反问：它的材料成分是什么，这些在伦敦金属交易所又值多少？钴、镍、铝、碳、隔膜、一个钢罐——按现货价相加，约 80 美元/千瓦时。介于 80 与 600 之间的一切，都不是物理；那是制造，而制造，是可以被攻击的。",
      },
      {
        en: "The same reduction built SpaceX. Rockets were priced by heritage — each new vehicle a small variation on the last, with the last contract's number as the anchor. SpaceX instead asked what a rocket is made of (mostly aerospace-grade aluminum, some titanium, copper, carbon fiber) and found the materials to be a low single-digit percentage of the launch price. If the atoms are 2% of the cost, the other 98% is process and the decision to throw the vehicle away after one flight. Hence vertical integration to compress the process, and reusability to amortize the hardware — two moves that follow directly once you have located the real cost floor.",
        zh: "同样的还原，建起了 SpaceX。火箭曾按传统定价——每一艘新飞行器都是上一艘的小小变体，以上一份合同的数字为锚。SpaceX 却反问：一枚火箭由什么构成（大多是航天级铝，些许钛、铜、碳纤维），并发现材料只占发射价格一个低个位数的百分比。若原子是成本的 2%，那另外的 98%，便是工艺，以及「飞一次就把飞行器扔掉」这个决定。于是有了垂直整合以压缩工艺，与可复用性以摊薄硬件——两步棋，一旦你定位了真实的成本地板，便直接随之而来。",
      },
      {
        en: "It is worth being honest about the limits, because uncritical worship is itself a failure of first-principles thinking. Deriving a cost floor tells you what is physically possible, not that you can reach it cheaply, on schedule, or at all — execution, capital, and people remain hard. And first principles is expensive: you cannot, and should not, re-derive everything. Its value is concentrated exactly where an entire field has anchored to an inherited number that the underlying physics never required. Find one of those, and the method pays for itself many times over. That is the practical lesson under the slogan.",
        zh: "对它的局限，值得诚实以待，因为不加批判的崇拜，本身就是第一性原理思维的一种失败。推导出一个成本地板，告诉你的是物理上什么可能，而非你能廉价地、按期地、乃至根本地抵达它——执行、资本与人，依然艰难。而且第一性原理是昂贵的：你不能、也不该，凡事重新推导。它的价值，恰恰集中在「整个领域都锚定于某个继承来的、底层物理从未要求过的数字」之处。找到一个那样的数字，这方法便能数倍地回本。这，才是口号底下那条务实的教训。",
      },
    ],
    quote: { en: "“I think it's important to reason from first principles rather than by analogy… boil things down to the most fundamental truths and reason up from there.”", zh: "「我认为，从第一性原理、而非从类比出发推理，是重要的……把事物煮到最根本的真理，再从那里往上推理。」" },
    accent: "#ffb454",
  },
  {
    id: "cogsci",
    shelf: { en: "Cognitive Science", zh: "认知科学" },
    title: { en: "Why the Mind Resists First Principles", zh: "心智为何抗拒第一性原理" },
    author: { en: "Kahneman, Tversky, Simon & the bounded-rationality tradition", zh: "卡尼曼、特沃斯基、西蒙，与有限理性传统" },
    era: { en: "1955 – present", zh: "1955 年 – 至今" },
    abstract: {
      en: "First-principles thinking is unnatural — the brain is built to reason by analogy and shortcut. Knowing the specific machinery that fights you is half of learning to override it when it matters.",
      zh: "第一性原理思维是不自然的——大脑天生为类比与捷径而造。了解那台与你作对的具体机器，便已是「在要紧处学会推翻它」的一半。",
    },
    body: [
      {
        en: "Herbert Simon observed that real minds are not the unlimited optimizers of economic theory but bounded reasoners: finite in attention, memory, and time. Given those limits, the brain does the sensible thing and substitutes easy questions for hard ones. Asked 'what is the true cost of this?', it quietly answers the easier 'what did it cost last time?'. This substitution is usually adaptive — it is why we function at all — but it is the precise opposite of decomposing to base truths.",
        zh: "赫伯特·西蒙观察到，真实的心智，并非经济理论中那个无限的优化者，而是有限的推理者：在注意力、记忆与时间上都有限。在这些限制下，大脑做了明智之事——用容易的问题替换困难的问题。被问及「这东西的真实成本是多少？」时，它悄悄回答了那个更容易的「它上次花了多少？」。这种替换通常是适应性的——正是它，让我们得以运转——但它，恰恰是「分解至基本真理」的反面。",
      },
      {
        en: "Kahneman and Tversky catalogued the specific shortcuts and their failure modes. Anchoring: the first number you encounter contaminates your estimate, even when it is irrelevant — which is why an inherited price is so hard to question. Availability: you judge what is true by what comes easily to mind, so vivid precedent crowds out unseen possibility. Confirmation: once a belief is in place, you hunt for evidence that supports it and wave away the rest. The status quo and authority biases make the existing answer feel safe and the expert's word feel like proof. Each of these is, structurally, a machine for reasoning by analogy and inheritance rather than by derivation.",
        zh: "卡尼曼与特沃斯基，编录了那些具体的捷径及其失效模式。锚定：你遇到的第一个数字会污染你的估计，哪怕它毫不相干——这正是「继承来的价格如此难以质疑」的原因。可得性：你凭「什么容易浮现于脑海」来判断什么为真，于是鲜活的先例，挤占了未被看见的可能。确证：一旦一个信念就位，你便去搜寻支持它的证据，把其余的挥手赶开。现状偏差与权威偏差，让既有的答案显得安全，让专家之言显得像证明。这些当中的每一个，从结构上说，都是一台「靠类比与继承、而非靠推导来推理」的机器。",
      },
      {
        en: "The practical upshot is not that we can rewrite the hardware — we cannot — but that first-principles thinking is best understood as a deliberate, effortful protocol you invoke against your own defaults. You externalize: write the assumptions down where the availability bias cannot hide them. You quantify: put numbers on each piece so anchoring has nothing vague to grab. You invert: ask what would have to be true for the opposite conclusion, to disarm confirmation. The method works precisely because it does not rely on willpower or genius; it is a checklist that compensates, step by step, for known and predictable flaws in the reasoning instrument.",
        zh: "务实的结论，并非我们能改写硬件——我们不能——而是：第一性原理思维，最好被理解为一套刻意的、费力的协议，你调用它，去对抗你自己的默认设定。你把它外化：把假设写在可得性偏差藏不住它们的地方。你把它量化：为每一块装上数字，让锚定无从抓住任何模糊之物。你把它倒置：追问「相反的结论若要成立，什么必须为真」，以解除确证偏差的武装。这方法之所以奏效，恰恰因为它不依赖意志力或天才；它是一张清单，一步一步地，补偿着推理这件仪器中那些已知且可预测的缺陷。",
      },
    ],
    quote: { en: "“Nothing in life is as important as you think it is, while you are thinking about it.” — D. Kahneman", zh: "「生活中没有任何事，像你正想着它时所以为的那般重要。」——丹尼尔·卡尼曼" },
    accent: "#b07cff",
  },
];

/* ============================================================
   CLOSING + COMPANION ARCHIVES
   ============================================================ */
export type Companion = { name: Bi; href: string };
export const COMPANIONS: Companion[] = [
  { name: { en: "Mind vs Machine · 心智与机器", zh: "心智与机器" }, href: "https://mind-vs-machine.psyverse.fun" },
  { name: { en: "AI Genesis · AI 创世", zh: "AI 创世" }, href: "https://ai-genesis.psyverse.fun" },
  { name: { en: "Beyond Tech · 技术之上", zh: "技术之上" }, href: "https://beyond-tech.psyverse.fun" },
];
