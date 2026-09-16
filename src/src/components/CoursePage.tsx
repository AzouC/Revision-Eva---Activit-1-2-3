import { useState } from "react";
import { cn } from "../utils/cn";
import CourseCMake from "./course/CourseCMake";
import CourseCrossCompilation from "./course/CourseCrossCompilation";
import CourseGit from "./course/CourseGit";
import CourseUML from "./course/CourseUML";
import CourseLinux from "./course/CourseLinux";

const parts = [
  { id: "cmake", label: "1. CMake", icon: "🛠️", Component: CourseCMake },
  { id: "cross", label: "2. Cross-compilation", icon: "🔄", Component: CourseCrossCompilation },
  { id: "git", label: "3. Git", icon: "🌿", Component: CourseGit },
  { id: "uml", label: "4. UML & POO", icon: "📐", Component: CourseUML },
  { id: "linux", label: "5. Linux", icon: "🐧", Component: CourseLinux },
] as const;

export default function CoursePage() {
  const [active, setActive] = useState<(typeof parts)[number]["id"]>("cmake");
  const current = parts.find((p) => p.id === active)!;
  const Active = current.Component;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">📚 Le cours</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Choisis une partie pour découvrir les notions, avec des exemples de code.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {parts.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              active === p.id
                ? "border-transparent bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                : "border-slate-300 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-indigo-400",
            )}
          >
            <span>{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      <Active />
    </div>
  );
}
