import { useState } from "react";
import type { QCMQuestion } from "../../data/quizData";
import { cn } from "../../utils/cn";

export default function QCM({
  question,
  onAnswered,
}: {
  question: QCMQuestion;
  onAnswered: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    onAnswered(selected === question.correctIndex);
  };

  return (
    <div>
      <p className="mb-4 text-lg font-medium text-slate-900 dark:text-white">{question.question}</p>
      <div className="space-y-2">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let style =
            "border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500";
          if (checked) {
            if (isCorrect) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
            else if (isSelected && !isCorrect) style = "border-rose-500 bg-rose-50 dark:bg-rose-950/40";
            else style = "border-slate-200 dark:border-slate-700 opacity-60";
          } else if (isSelected) {
            style = "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40";
          }
          return (
            <button
              key={i}
              disabled={checked}
              onClick={() => setSelected(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition disabled:cursor-default",
                style,
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-slate-700 dark:text-slate-200">{choice}</span>
            </button>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selected === null}
          className="mt-5 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Vérifier
        </button>
      ) : (
        <div
          className={cn(
            "mt-5 rounded-xl p-4 text-sm leading-relaxed",
            selected === question.correctIndex
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200",
          )}
        >
          <p className="mb-1 font-semibold">
            {selected === question.correctIndex ? "✅ Bonne réponse !" : "❌ Ce n'est pas la bonne réponse."}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
