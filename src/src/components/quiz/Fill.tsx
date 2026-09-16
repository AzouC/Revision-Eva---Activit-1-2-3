import { useState } from "react";
import type { FillQuestion } from "../../data/quizData";
import { cn } from "../../utils/cn";

export default function Fill({
  question,
  onAnswered,
}: {
  question: FillQuestion;
  onAnswered: (correct: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleCheck = () => {
    const normalized = value.trim().toLowerCase();
    const isCorrect = question.answers.some((a) => a.toLowerCase() === normalized);
    setCorrect(isCorrect);
    setChecked(true);
    onAnswered(isCorrect);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-500">Question à trous</p>
      <p className="mb-4 text-lg font-medium text-slate-900 dark:text-white">{question.prompt}</p>

      <input
        type="text"
        value={value}
        disabled={checked}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !checked && value.trim() && handleCheck()}
        placeholder="Ta réponse..."
        className="w-full max-w-sm rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-mono text-sm text-slate-800 outline-none transition focus:border-indigo-500 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
      />

      {!checked ? (
        <div>
          <button
            onClick={handleCheck}
            disabled={!value.trim()}
            className="mt-5 block rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Vérifier
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "mt-5 rounded-xl p-4 text-sm leading-relaxed",
            correct
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
          )}
        >
          <p className="mb-1 font-semibold">
            {correct ? "✅ Bonne réponse !" : `❌ Réponse attendue : "${question.answers[0]}"`}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
