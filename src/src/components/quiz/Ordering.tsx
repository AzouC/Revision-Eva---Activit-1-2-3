import { useState } from "react";
import type { OrderingQuestion } from "../../data/quizData";
import { cn } from "../../utils/cn";

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // s'assurer que ce n'est pas déjà dans le bon ordre
  if (arr.every((v, i) => v === i) && n > 1) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export default function Ordering({
  question,
  onAnswered,
}: {
  question: OrderingQuestion;
  onAnswered: (correct: boolean) => void;
}) {
  const [order, setOrder] = useState<number[]>(() => shuffleIndices(question.steps.length));
  const [checked, setChecked] = useState(false);

  const move = (pos: number, direction: -1 | 1) => {
    const target = pos + direction;
    if (target < 0 || target >= order.length) return;
    setOrder((prev) => {
      const copy = [...prev];
      [copy[pos], copy[target]] = [copy[target], copy[pos]];
      return copy;
    });
  };

  const handleCheck = () => {
    setChecked(true);
    const isCorrect = order.every((v, i) => v === i);
    onAnswered(isCorrect);
  };

  const isCorrectOverall = order.every((v, i) => v === i);

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-500">
        Exercice pratique — remise dans l'ordre
      </p>
      <p className="mb-4 text-lg font-medium text-slate-900 dark:text-white">{question.question}</p>

      <div className="space-y-2">
        {order.map((stepIndex, pos) => {
          const isRowCorrect = stepIndex === pos;
          return (
            <div
              key={stepIndex}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 font-mono text-sm transition",
                checked
                  ? isRowCorrect
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                    : "border-rose-500 bg-rose-50 dark:bg-rose-950/40"
                  : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800",
              )}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {pos + 1}
                </span>
                <span className="text-slate-800 dark:text-slate-100">{question.steps[stepIndex]}</span>
              </span>
              {!checked && (
                <span className="flex shrink-0 gap-1">
                  <button
                    aria-label="Monter"
                    onClick={() => move(pos, -1)}
                    disabled={pos === 0}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 disabled:opacity-30 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    ↑
                  </button>
                  <button
                    aria-label="Descendre"
                    onClick={() => move(pos, 1)}
                    disabled={pos === order.length - 1}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100 disabled:opacity-30 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    ↓
                  </button>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={handleCheck}
          className="mt-5 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Vérifier l'ordre
        </button>
      ) : (
        <div
          className={cn(
            "mt-5 rounded-xl p-4 text-sm leading-relaxed",
            isCorrectOverall
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
          )}
        >
          <p className="mb-1 font-semibold">
            {isCorrectOverall ? "✅ Ordre correct !" : "❌ L'ordre n'est pas tout à fait correct."}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
