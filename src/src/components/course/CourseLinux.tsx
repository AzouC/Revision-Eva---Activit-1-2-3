import CodeBlock from "../CodeBlock";
import { InlineCode, SectionCard } from "./CourseHelpers";

interface Cmd {
  cmd: string;
  desc: string;
  example?: string;
}

const commands: Cmd[] = [
  { cmd: "pwd", desc: "Affiche le chemin absolu du répertoire courant.", example: "pwd" },
  {
    cmd: "ls / ls -l / ls -a",
    desc:
      "Liste le contenu d'un répertoire. L'option -l donne un format détaillé (permissions, taille, dates), l'option -a affiche aussi les fichiers cachés.",
    example: "ls -la",
  },
  {
    cmd: "cd",
    desc:
      "Permet de se déplacer dans l'arborescence : cd .. (répertoire parent), cd ~ (répertoire personnel), cd /chemin (chemin absolu).",
    example: "cd ..\ncd ~\ncd /var/log",
  },
  { cmd: "mkdir", desc: "Crée un nouveau répertoire.", example: "mkdir mon_dossier" },
  { cmd: "cat", desc: "Affiche le contenu d'un fichier texte.", example: "cat fichier.txt" },
  {
    cmd: "sudo",
    desc: "Exécute une commande avec les droits administrateur (superuser).",
    example: "sudo apt update",
  },
  {
    cmd: "rm / rm -r",
    desc: "Supprime un fichier. L'option -r (récursive) est nécessaire pour supprimer un dossier et son contenu.",
    example: "rm fichier.txt\nrm -r mon_dossier",
  },
  { cmd: "cp", desc: "Copie un fichier (ou un dossier avec -r) vers un autre emplacement.", example: "cp source.txt destination.txt" },
  { cmd: "mv", desc: "Déplace un fichier/dossier, ou le renomme.", example: "mv ancien_nom.txt nouveau_nom.txt" },
  {
    cmd: "chmod",
    desc: "Modifie les permissions (droits de lecture/écriture/exécution) d'un fichier ou dossier.",
    example: "chmod +x script.sh",
  },
  { cmd: "touch", desc: "Crée un fichier vide, ou met à jour sa date de modification.", example: "touch nouveau_fichier.txt" },
];

export default function CourseLinux() {
  return (
    <div className="space-y-5">
      <SectionCard title="Commandes de base Linux">
        <p>
          Ces commandes s'utilisent dans un <strong>terminal</strong> et permettent de naviguer et d'agir sur les
          fichiers et dossiers du système.
        </p>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {commands.map((c) => (
          <div
            key={c.cmd}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60"
          >
            <p className="mb-1 font-mono text-base font-semibold text-emerald-600 dark:text-emerald-400">
              <InlineCode>{c.cmd}</InlineCode>
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.desc}</p>
            {c.example && <CodeBlock code={c.example} />}
          </div>
        ))}
      </div>
    </div>
  );
}
