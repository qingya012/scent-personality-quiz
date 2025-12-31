import { useMemo, useState } from "react";
import questionsData from "../data/questions.json";
import resultsData from "../data/results.json";
import Progress from "./Progress";
import Result from "./Result";
import Cover from "./Cover";
import GradientBackground from "./GradientBackground";
import AnimatedBlobs from "./AnimatedBlobs";

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

  if (done) return <Result result={result} winner={winner} onRestart={restart} />;

  const q = questions[index];

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100vw" }}>
      <GradientBackground />
      <AnimatedBlobs />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      
        <div style={{ width: "100%", maxWidth:640, padding: "40px 24px" }}>
          {/* Title */}
          <h1 style={{ textAlign: "center", fontSize: 14, color: "#444", marginBottom: 24 }}>
            Scent Personality Quiz
          </h1>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: 10,
              borderRadius: 999,
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(0,0,0,0.10)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
              marginBottom: 28,
            }}
          />
          <div
            style={{
              height: "100%",
              width: `${Math.max(0, Math.min(100, ((index + 1) / total) * 100))}%`,
              borderRadius: 999,
              background: "rgba(0,0,0,0.65)",
              transition: "width 260ms ease",
            }}
          />

         {/* Question index */}
         <p className="text-xs text-gray-400 text-center mb-2">
           Question {index + 1} of {total}
         </p>

          {/* Question text */}
          <h2 className="text-2xl font-semibold text-center leading-snug mb-8">
            {q.text}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePick(opt.weights)}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: 18, // 方圆角（不是 pill）
                  background: "rgba(255,255,255,0.75)", // 半透明白
                  border: "1px solid rgba(0,0,0,0.12)", // 灰色边框
                  color: "#111",
                  fontSize: 16,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 160ms ease",
                  backdropFilter: "blur(6px)", // 关键：玻璃感
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.75)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.985)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
               {opt.text}
             </button>
           ))}
          </div>

        </div>
      </div>
    </div>
  );

}
