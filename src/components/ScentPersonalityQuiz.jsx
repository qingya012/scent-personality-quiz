import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "你更向往的日常是？",
    options: ["雨中独行", "阳光草地", "深夜街头", "藏书阁内"],
  },
  {
    id: 2,
    question: "如果香味有颜色，它是什么？",
    options: ["黯紫", "橙黄", "银白", "墨绿"],
  },
  {
    id: 3,
    question: "你偏好的气味类型是？",
    options: ["木头与树脂", "水果与花草", "烟熏与皮革", "沉静药草"],
  },
  {
    id: 4,
    question: "你对陌生人的第一印象希望是？",
    options: ["有距离感但可靠", "温暖亲切", "令人着迷", "不易接近"],
  },
  {
    id: 5,
    question: "你最认同的一句话是？",
    options: [
      "\"我拥有自然、艺术和诗歌，如果这还不够，那什么才算够？\" —— 梵高",
      "\"万物皆有裂痕，那是光照进来的地方。\" —— 莱昂纳德·科恩",
      "\"自由存在于勇敢之中。\" —— 罗伯特·弗罗斯特",
      "\"宇宙不仅比我们想象的更奇特，它比我们能想象的还要奇特。\" —— 哈尔丹"
    ],
  },
  {
    id: 6,
    question: "如果你是一瓶香水，你更像是？",
    options: ["一本遗落的日记", "半张车票", "路边烟草摊", "破碎的琉璃吊坠"],
  },
];

const RESULTS = [
  {
    type: "木质哲思系",
    keywords: ["雨中独行", "黯紫", "木头与树脂", "有距离感但可靠", "梵高", "日记"],
    scent: "檀香、雪松、香根草",
    name: "Ashes of Silence",
    brand: "NEBO",
    description: "你沉静、内敛，像雨后森林中一块温热的木头。",
  },
  // 更多结果可以继续补充
];

function getResult(answers) {
  // 简单关键词匹配，返回第一个匹配上的结果
  for (let result of RESULTS) {
    if (result.keywords.some((k) => answers.includes(k))) {
      return result;
    }
  }
  return {
    type: "柔光花果系",
    scent: "橙花、香柠檬、麝香",
    name: "Summer Drift",
    brand: "FLOR",
    description: "你轻盈如风，像夏日午后阳光下的一束橙花。",
  };
}

export default function ScentPersonalityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleSelect = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step + 1 === QUESTIONS.length) {
      const res = getResult(newAnswers);
      setResult(res);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-xl mx-auto text-center p-6">
        <h2 className="text-2xl font-bold mb-4">你的香味人格：{result.type}</h2>
        <p className="mb-2">🧴 推荐香水：{result.name} by {result.brand}</p>
        <p className="mb-2">🌿 香调关键词：{result.scent}</p>
        <p className="mb-6">📝 {result.description}</p>
        <button className="bg-black text-white px-4 py-2 rounded" onClick={restart}>再测一次</button>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">第 {step + 1} 题 / 共 {QUESTIONS.length} 题</h1>
      <h2 className="text-lg mb-6">{q.question}</h2>
      <div className="grid gap-4">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className="border border-gray-300 rounded p-3 hover:bg-gray-100"
            onClick={() => handleSelect(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
