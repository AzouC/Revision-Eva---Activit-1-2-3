import { useMemo, useState } from "react";
import { categoryColors, categoryLabels, questions, type Category, type Question } from "../data/quizData";
import { cn } from "../utils/cn";
import QCM from "./quiz/QCM";
import Fill from "./quiz/Fill";
import Matching from "./quiz/Matching";
import Ordering from "./quiz/Ordering";

type FilterValue = Category | "all";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const typeBadge: Record<Question["type"], string> = {
  qcm: "QCM",
  fill: "Texte à trous",
  matching: "Association",
  ordering: "Remise en ordre",
};

const filters: { value: FilterValue; label: string; icon: string }[] = [
  { value: "all", label: "Quiz complet", icon: "🎯" },
  { value: "cmake", label: "CMake", icon: "🛠️" },
  { value: "cross", label: "Cross-compilation", icon: "🔄" },
  { value: "git", label: "Git", icon: "🌿" },
  { value: "uml", label: "UML & POO", icon: "📐" },
  { value: "linux", label: "Linux", icon: "🐧" },
];

export default function QuizPage() {
  const [stage, setStage] = useState<"select" | "playing" | "result">("select");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [answered, setAnswered] = useState(false);

  const availableCount = useMemo(
    () => (filter === "all" ? questions.length : questions.filter((q) => q.category === filter).length),
    [filter],
  );

  const startQuiz = () => {
    const pool = filter === "all" ? questions : questions.filter((q) => q.category === filter);
    setQuizQuestions(shuffle(pool));
    setIndex(0);
    setResults([]);
    setAnswered(false);
    setStage("playing");
  };

  const handleAnswered = (correct: boolean) => {
    setAnswered(true);
    setResults((prev) => [...prev, correct]);
  };

  const handleNext = () => {
    if (index + 1 >= quizQuestions.length) {
      setStage("result");
    } else {
      setIndex((i) => i + 1);
      setAnswered(false);
    }
  };

  const restart = () => {
    setStage("select");
  };

  const score = results.filter(Boolean).length;
  const total = results.length;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  if (stage === "select") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">📝 Quiz d'auto-évaluation</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Choisis un thème puis lance le quiz. QCM, textes à trous, associations et un exercice de remise en
            ordre t'attendent !
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition",
                filter === f.value
                  ? "border-indigo-500 bg-indigo-50 shadow-md dark:bg-indigo-950/40"
                  : "border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800",
              )}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {availableCount} question{availableCount > 1 ? "s" : ""} disponible{availableCount > 1 ? "s" : ""}
          </p>
          <button
            onClick={startQuiz}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-500 hover:to-violet-500"
          >
            Commencer le quiz
          </button>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <div className="mb-4 text-6xl">{percent >= 70 ? "🏆" : percent >= 40 ? "💪" : "📖"}</div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Quiz terminé !</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Voici ton résultat :</p>

        <div className="my-8 inline-block rounded-3xl border border-slate-200 bg-white px-10 py-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {score} / {total}
          </p>
          <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">{percent}% de bonnes réponses</p>
        </div>

        <p className="mb-8 text-slate-600 dark:text-slate-300">
          {percent >= 70
            ? "Excellent travail, les notions sont bien assimilées !"
            : percent >= 40
            ? "Pas mal ! Revois le cours sur les points manqués pour progresser."
            : "N'hésite pas à retourner voir le cours avant de retenter le quiz."}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={restart}
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Choisir un autre thème
          </button>
          <button
            onClick={startQuiz}
            className="rounded-full border-2 border-indigo-500 px-6 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
          >
            Recommencer ce thème
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[index];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            Question {index + 1} / {quizQuestions.length}
          </span>
          <span>
            Score : {score} / {results.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
            style={{ width: `${(index / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white",
              categoryColors[currentQuestion.category],
            )}
          >
            {categoryLabels[currentQuestion.category]}
          </span>
          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {typeBadge[currentQuestion.type]}
          </span>
        </div>

        {currentQuestion.type === "qcm" && (
          <QCM key={currentQuestion.id} question={currentQuestion} onAnswered={handleAnswered} />
        )}
        {currentQuestion.type === "fill" && (
          <Fill key={currentQuestion.id} question={currentQuestion} onAnswered={handleAnswered} />
        )}
        {currentQuestion.type === "matching" && (
          <Matching key={currentQuestion.id} question={currentQuestion} onAnswered={handleAnswered} />
        )}
        {currentQuestion.type === "ordering" && (
          <Ordering key={currentQuestion.id} question={currentQuestion} onAnswered={handleAnswered} />
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="mt-5 ml-3 rounded-full bg-slate-800 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            {index + 1 >= quizQuestions.length ? "Voir mon score" : "Question suivante →"}
          </button>
        )}
      </div>
    </div>
  );
}
