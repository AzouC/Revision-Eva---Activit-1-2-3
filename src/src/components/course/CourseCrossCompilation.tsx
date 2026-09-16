import CodeBlock from "../CodeBlock";
import { Callout, InlineCode, SectionCard } from "./CourseHelpers";

export default function CourseCrossCompilation() {
  return (
    <div className="space-y-5">
      <SectionCard title="Définition de la cross-compilation">
        <p>
          La <strong>cross-compilation</strong> consiste à <strong>compiler un programme sur une machine</strong>{" "}
          (la machine "hôte") <strong>pour qu'il s'exécute sur une autre machine</strong> (la machine "cible"), qui
          possède une <strong>architecture</strong> et/ou un <strong>système d'exploitation différents</strong>.
        </p>
      </SectionCard>

      <SectionCard title="CISC vs RISC">
        <p>
          Ces deux termes désignent des familles de jeux d'instructions de processeurs (deux philosophies de
          conception) :
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700/60">
            <p className="mb-1 font-semibold text-slate-900 dark:text-white">CISC</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complex Instruction Set Computer</p>
            <p className="mt-2">
              Jeu d'instructions <strong>complexe et riche</strong> : une seule instruction peut réaliser plusieurs
              opérations. Exemple d'architecture CISC : x86.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700/60">
            <p className="mb-1 font-semibold text-slate-900 dark:text-white">RISC</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reduced Instruction Set Computer</p>
            <p className="mt-2">
              Jeu d'instructions <strong>réduit et simplifié</strong>, chaque instruction est simple et rapide à
              exécuter. Exemple d'architecture RISC : ARM.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Notion d'ISA (Instruction Set Architecture)">
        <p>
          L'<strong>ISA</strong> (Instruction Set Architecture) désigne l'<strong>ensemble des instructions</strong>{" "}
          qu'un processeur est capable de comprendre et d'exécuter. CISC et RISC sont deux grandes familles d'ISA. Un
          programme compilé pour une ISA donnée ne peut fonctionner que sur un processeur compatible avec cette
          ISA.
        </p>
      </SectionCard>

      <SectionCard title="Pourquoi cross-compiler ?">
        <p>On a recours à la cross-compilation notamment quand la machine cible :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>est <strong>trop lente</strong> pour compiler elle-même le projet dans un temps raisonnable ;</li>
          <li>ne dispose <strong>d'aucune chaîne de compilation</strong> installée (pas de compilateur) ;</li>
          <li>ne possède <strong>pas d'écran ni de clavier</strong> (systèmes embarqués, cartes électroniques...).</li>
        </ul>
      </SectionCard>

      <SectionCard title="Exemple : compiler depuis Linux vers Windows">
        <p>
          Avec le compilateur croisé <InlineCode>g++-mingw-w64</InlineCode>, on peut générer, depuis une machine
          Linux, un exécutable Windows (.exe) :
        </p>
        <CodeBlock label="terminal (Linux)" code={`x86_64-w64-mingw32-g++ main.cpp -o programme.exe -static`} />
        <p>
          L'option <InlineCode>-static</InlineCode> illustre la notion de <strong>liaison statique</strong> des
          librairies : les bibliothèques comme <InlineCode>libgcc</InlineCode> et{" "}
          <InlineCode>libstdc++</InlineCode> sont directement intégrées dans l'exécutable final. Celui-ci devient
          alors autonome et peut s'exécuter sur la machine cible <strong>sans avoir besoin d'installer ces
          librairies séparément</strong>.
        </p>
        <Callout>
          Sans liaison statique, l'exécutable pourrait ne pas fonctionner sur la machine cible si les librairies
          nécessaires n'y sont pas déjà installées.
        </Callout>
      </SectionCard>
    </div>
  );
}
