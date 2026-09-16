import { cn } from "../utils/cn";

type Page = "accueil" | "cours" | "quiz";

interface NavbarProps {
  page: Page;
  onNavigate: (p: Page) => void;
  dark: boolean;
  onToggleDark: () => void;
}

const items: { id: Page; label: string; icon: string }[] = [
  { id: "accueil", label: "Accueil", icon: "🏠" },
  { id: "cours", label: "Cours", icon: "📚" },
  { id: "quiz", label: "Quiz", icon: "📝" },
];

export default function Navbar({ page, onNavigate, dark, onToggleDark }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <button
          onClick={() => onNavigate("accueil")}
          className="flex items-center gap-2 font-black text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            💻
          </span>
          CIEL Révisions
        </button>

        <nav className="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition sm:px-4",
                page === item.id
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100",
              )}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={onToggleDark}
          aria-label="Basculer le thème"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-sm transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
