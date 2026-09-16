import { useMemo, useState } from "react";
import type { MatchingQuestion } from "../../data/quizData";
import { cn } from "../../utils/cn";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Matching({
  question,
  onAnswered,
}: {
  question: MatchingQuestion;
  onAnswered: (correct: boolean) => void;
}) {
  const shuffledRight = useMemo(
    () => shuffle(question.right.map((text, originalIndex) => ({ text, originalIndex }))),
    [question],
  );

  const [selections, setSelections] = useState<number[]>(() => new Array(question.left.length).fill(-1));
  const [checked, setChecked] = useState(false);

  const allSelected = selections.every((s) => s !== -1);

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = selections.every((sel, i) => sel === question.correctMap[i]);
    onAnswered(allCorrect);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-500">Association</p>
      <p className="mb-4 text-lg font-medium text-slate-900 dark:text-white">{question.question}</p>

      <div className="space-y-3">
        {question.left.map((item, i) => {
          const isRowCorrect = selections[i] === question.correctMap[i];
          return (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="min-w-[10rem] font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                {item}
              </span>
              <select
                disabled={checked}
                value={selections[i]}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setSelections((prev) => prev.map((p, idx) => (idx === i ? v : p)));
                }}
                className={cn(
                  "flex-1 rounded-lg border-2 px-3 py-2 text-sm outline-none transition dark:bg-slate-900 dark:text-slate-100",
                  checked
                    ? isRowCorrect
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                      : "border-rose-500 bg-rose-50 dark:bg-rose-950/40"
                    : "border-slate-300 focus:border-indigo-500 dark:border-slate-600",
                )}
              >
                <option value={-1} disabled>
                  Choisir une description...
                </option>
                {shuffledRight.map((r) => (
                  <option key={r.originalIndex} value={r.originalIndex}>
                    {r.text}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!allSelected}
          className="mt-5 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Vérifier
        </button>
      ) : (
        <div
          className={cn(
            "mt-5 rounded-xl p-4 text-sm leading-relaxed",
            selections.every((sel, i) => sel === question.correctMap[i])
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
          )}
        >
          <p className="mb-1 font-semibold">
            {selections.every((sel, i) => sel === question.correctMap[i])
              ? "✅ Toutes les associations sont correctes !"
              : "❌ Certaines associations sont incorrectes."}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
