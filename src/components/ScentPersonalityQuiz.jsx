import { useMemo, useState } from "react";
import questionsData from "../data/questions.json";
import resultsData from "../data/results.json";
import Progress from "./Progress";
import Result from "./Result";

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
    <div className="p-8 w-full max-w-xl">
      <Progress current={index + 1} total={total} />

      <h3 className="text-xl font-semibold mb-6 text-center">{q.text}</h3>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(opt.weights)}
            className="block w-full bg-purple-100 hover:bg-purple-200 text-gray-800 py-3 rounded-lg transition"
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Scores: {personas.map((p) => `${p}:${scores[p]}`).join("  ")}
      </div>
    </div>
  );
}
