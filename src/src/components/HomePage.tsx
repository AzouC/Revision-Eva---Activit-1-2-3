import { categoryColors, categoryLabels, questions, type Category } from "../data/quizData";

interface HomePageProps {
  onNavigate: (page: "cours" | "quiz") => void;
}

const cards: { category: Category; icon: string; desc: string }[] = [
  { category: "cmake", icon: "🛠️", desc: "Configuration et compilation de projets avec CMake." },
  { category: "cross", icon: "🔄", desc: "Compiler pour une autre architecture ou un autre OS." },
  { category: "git", icon: "🌿", desc: "Cloner, envoyer et récupérer du code avec Git." },
  { category: "uml", icon: "📐", desc: "Diagrammes de classe, relations et conversion en C++." },
  { category: "linux", icon: "🐧", desc: "Les commandes indispensables du terminal Linux." },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <p className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          BTS CIEL — option Informatique et Réseaux
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          CIEL <span className="text-indigo-600 dark:text-indigo-400">Révisions</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
          CMake, cross-compilation, Git, UML/POO en C++ et commandes Linux : apprends chaque notion puis teste tes
          connaissances avec des quiz interactifs et un score immédiat.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate("cours")}
            className="rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
          >
            📚 Consulter le cours
          </button>
          <button
            onClick={() => onNavigate("quiz")}
            className="rounded-full border-2 border-indigo-500 px-7 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
          >
            📝 Lancer un quiz
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const count = questions.filter((q) => q.category === c.category).length;
          return (
            <div
              key={c.category}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/60"
            >
              <div
                className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-xl ${categoryColors[c.category]}`}
              >
                {c.icon}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{categoryLabels[c.category]}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.desc}</p>
              <p className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {count} question{count > 1 ? "s" : ""} de quiz
              </p>
            </div>
          );
        })}
        <div className="flex flex-col justify-center rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-5 text-center dark:border-indigo-800 dark:bg-indigo-950/20">
          <p className="mb-2 text-2xl">🎯</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {questions.length} questions au total, réparties en QCM, textes à trous, associations et un exercice de
            remise en ordre.
          </p>
        </div>
      </div>
    </div>
  );
}
