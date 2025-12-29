import { useState } from "react";
import questionsData from "../data/questions.json";
import resultsData from "../data/results.json";

console.log("Quiz mounted");

const personas = ["fruity", "floral", "woody", "oriental"];

export default function ScentPersonalityQuiz() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ 
    fruity: 0, 
    floral: 0, 
    woody: 0, 
    oriental: 0 
  });

  const questions = questionsData.questions;
  const total = questions.length;

  // when clicking an option
  const handlePick = (weights) => {
    const newScores = { ...scores };
    personas.forEach((p, i) => {
      newScores[p] += weights[i] || 0;
    });
    setScores(newScores);
    setIndex(index + 1);
  };

  // when quiz ends -> show result
  if (index >= total) {
    // determine winner
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const result = resultsData[winner];
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">{result.name}</h2>
        <p className="mb-2">{result.summary}</p>
        <p className="text-gray-500">
          Recommened notes: {result.suggestions.join(", ")}
        </p>
      </div>
    );

  }

  // quiz in progress -> show question
  const q = questions[index];
  return (
    <div className="p-8 text-center">
      <p className="text-gray-500 mb-4">
        Question {index + 1} of {total}
      </p>
      <h3 className="text-xl font-semibold mb-6">{q.text}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
          key ={i}
          onClick={() => handlePick(option.weights)}
          className="block w-full bg-purple-100 hover:bg-purple-200 text-gray-800 py-2 rounded-lg transition"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}