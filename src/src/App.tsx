import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CoursePage from "./components/CoursePage";
import QuizPage from "./components/QuizPage";

type Page = "accueil" | "cours" | "quiz";

export default function App() {
  const [page, setPage] = useState<Page>("accueil");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar page={page} onNavigate={setPage} dark={dark} onToggleDark={() => setDark((d) => !d)} />

      <main>
        {page === "accueil" && <HomePage onNavigate={setPage} />}
        {page === "cours" && <CoursePage />}
        {page === "quiz" && <QuizPage />}
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
        Site de révision — BTS CIEL option Informatique et Réseaux — CMake, Cross-compilation, Git, UML/POO,
        Linux.
      </footer>
    </div>
  );
}
