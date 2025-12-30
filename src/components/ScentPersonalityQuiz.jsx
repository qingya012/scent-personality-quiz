import { useMemo, useState } from "react";
import questionsData from "../data/questions.json";
import resultsData from "../data/results.json";
import Progress from "./Progress";
import Result from "./Result";
import Cover from "./Cover";
import GradientBackground from "./GradientBackground";

const personas = ["fruity", "floral", "woody", "oriental"];
const tieBreak = ["oriental", "woody", "floral", "fruity"]; // 平分时优先级（可改）

function pickWinner(scores) {
  const maxVal = Math.max(...personas.map((p) => scores[p] ?? 0));
  const candidates = personas.filter((p) => (scores[p] ?? 0) === maxVal);
  if (candidates.length === 1) return candidates[0];
  for (const t of tieBreak) if (candidates.includes(t)) return t;
  return candidates[0];
}

export default function ScentPersonalityQuiz() {
  const [started, setStarted] = useState(false);

  const questions = questionsData.questions ?? [];
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({
    fruity: 0,
    floral: 0,
    woody: 0,
    oriental: 0,
  });

  const done = index >= total;

  const winner = useMemo(() => {
    if (!done) return null;
    return pickWinner(scores);
  }, [done, scores]);

  const result = winner ? resultsData[winner] : null;

  const handlePick = (weights) => {
    setScores((prev) => {
      const next = { ...prev };
      personas.forEach((p, i) => {
        next[p] = (next[p] ?? 0) + (weights?.[i] ?? 0);
      });
      return next;
    });
    setIndex((prev) => prev + 1);
  };

  const restart = () => {
    setIndex(0);
    setScores({ fruity: 0, floral: 0, woody: 0, oriental: 0 });
  };

  if(!started) {
    return <Cover onStart={() => setStarted(true)} />;
  }

  if (total === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">
          No questions found. Check <code>src/data/questions.json</code>.
        </p>
      </div>
    );
  }

  if (done) {
    return <Result result={result} onRestart={restart} />;
  }

  const q = questions[index];

  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      className="flex items-center justify-center"
    >
      <GradientBackground />

      <div style={{ position: "relative", zIndex: 1 }} className="w-full max-w-xl px-6 py-10">

        {/* Title */}
        <h1 className="text-center text-sm tracking-wide text-gray-500 mb-6">
          Scent Personality Quiz
        </h1>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-8">
          <div
            className="h-1 bg-purple-400 rounded-full transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question index */}
        <p className="text-xs text-gray-400 text-center mb-2">
          Question {index + 1} of {total}
        </p>

        {/* Question text */}
        <h2 className="text-2xl font-semibold text-center leading-snug mb-8">
          {q.text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handlePick(opt.weights)}
              className="
                w-full
                py-3
                px-4
                rounded-xl
                border
                border-gray-200
                hover:border-gray-400
                transition
                text-left
              "
            >
              {opt.text}
            </button>
          ))}
        </div>

      </div>
    </div>
  );

}
