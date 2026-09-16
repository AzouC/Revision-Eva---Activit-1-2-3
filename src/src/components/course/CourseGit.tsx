import CodeBlock from "../CodeBlock";
import { Callout, InlineCode, SectionCard } from "./CourseHelpers";

export default function CourseGit() {
  return (
    <div className="space-y-5">
      <SectionCard title="git clone">
        <p>
          Permet de <strong>récupérer un dépôt distant et de le copier en local</strong>, avec tout son historique.
        </p>
        <CodeBlock label="terminal" code={`git clone https://github.com/utilisateur/projet.git`} />
      </SectionCard>

      <SectionCard title="git push">
        <p>Permet d'<strong>envoyer ses modifications (commits) locales</strong> vers le dépôt distant.</p>
        <CodeBlock label="terminal" code={`git push`} />
      </SectionCard>

      <SectionCard title="git fetch">
        <p>
          Permet de <strong>récupérer les modifications du dépôt distant sans les fusionner</strong> avec la branche
          locale. Cela permet de consulter les changements avant de décider de les intégrer.
        </p>
        <CodeBlock label="terminal" code={`git fetch`} />
      </SectionCard>

      <SectionCard title="git pull">
        <p>
          Permet de <strong>récupérer les modifications du dépôt distant ET de les fusionner</strong>{" "}
          automatiquement avec la branche locale courante. C'est équivalent à un{" "}
          <InlineCode>git fetch</InlineCode> suivi d'une fusion.
        </p>
        <CodeBlock label="terminal" code={`git pull`} />
      </SectionCard>

      <SectionCard title="Notion de commit et bonnes pratiques">
        <p>
          Un <strong>commit</strong> est un enregistrement des modifications apportées aux fichiers du projet, à un
          instant donné, accompagné d'un <strong>message</strong> décrivant ces changements.
        </p>
        <CodeBlock label="terminal" code={`git add .\ngit commit -m "Ajout de la fonction de connexion"`} />
        <p>Bonnes pratiques à respecter :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Faire des <strong>commits réguliers</strong>, plutôt que d'attendre la fin du projet ;</li>
          <li>Chaque commit doit correspondre à <strong>une modification logique et cohérente</strong> ;</li>
          <li>Rédiger des <strong>messages clairs et explicites</strong>, décrivant ce qui a été fait et pourquoi.</li>
        </ul>
        <Callout>
          Des commits réguliers et bien décrits facilitent le suivi du projet, la recherche de bugs et le travail en
          équipe.
        </Callout>
      </SectionCard>
    </div>
  );
}
