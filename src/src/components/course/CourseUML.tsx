import CodeBlock from "../CodeBlock";
import { Callout, InlineCode, SectionCard } from "./CourseHelpers";

export default function CourseUML() {
  return (
    <div className="space-y-5">
      <SectionCard title="Le diagramme de classe UML">
        <p>
          Un <strong>diagramme de classe UML</strong> est une représentation graphique de la structure d'un
          programme orienté objet. Il décrit les <strong>classes</strong> (avec leurs{" "}
          <strong>attributs</strong> et <strong>méthodes</strong>) ainsi que les{" "}
          <strong>relations</strong> qui existent entre elles, avant même d'écrire une seule ligne de code.
        </p>
      </SectionCard>

      <SectionCard title="Les relations UML : héritage, composition, agrégation">
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Héritage — relation "est un"</p>
            <p>
              Une classe fille hérite des attributs et méthodes d'une classe mère. Exemple : un{" "}
              <InlineCode>Chat</InlineCode> <strong>est un</strong> <InlineCode>Animal</InlineCode>.
            </p>
            <CodeBlock code={`class Animal { /* ... */ };\nclass Chat : public Animal { /* ... */ };`} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Composition — relation "a un" forte</p>
            <p>
              Les objets composants n'existent pas indépendamment de l'objet qui les contient : s'il est détruit,
              ils le sont aussi. Exemple : une <InlineCode>Maison</InlineCode> possède des{" "}
              <InlineCode>Piece</InlineCode>, qui n'ont pas de sens sans elle.
            </p>
            <CodeBlock code={`class Piece { /* ... */ };\nclass Maison {\n  private:\n    Piece piece1; // créée et détruite avec la Maison\n};`} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Agrégation — relation "a un" faible</p>
            <p>
              Les objets liés peuvent exister indépendamment les uns des autres. Exemple : une{" "}
              <InlineCode>Voiture</InlineCode> possède des <InlineCode>Roue</InlineCode>, mais une roue peut exister
              (et être réutilisée) sans la voiture.
            </p>
            <CodeBlock code={`class Roue { /* ... */ };\nclass Voiture {\n  private:\n    Roue* roue1; // existe indépendamment de la Voiture\n};`} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Du diagramme UML vers le code C++">
        <p>
          En UML, la visibilité des attributs/méthodes est indiquée par un symbole :{" "}
          <InlineCode>-</InlineCode> pour <strong>privé</strong> (private) et <InlineCode>+</InlineCode> pour{" "}
          <strong>public</strong>.
        </p>
        <p>Exemple de conversion d'une classe UML simple en C++ :</p>
        <CodeBlock
          label="Personne.hpp"
          code={`class Personne {
  private:
    std::string nom;   // - nom
    int age;            // - age

  public:
    Personne(std::string n, int a); // + Personne(n, a)
    std::string getNom() const;     // + getNom()
    ~Personne();                    // destructeur
};`}
        />
        <p>
          Les attributs privés (<InlineCode>-</InlineCode>) sont placés dans la section{" "}
          <InlineCode>private:</InlineCode>, et les méthodes publiques (<InlineCode>+</InlineCode>) dans la section{" "}
          <InlineCode>public:</InlineCode>.
        </p>
      </SectionCard>

      <SectionCard title="Bonnes pratiques : éviter les fuites mémoire">
        <p>
          Lorsqu'une classe alloue de la mémoire dynamiquement (avec <InlineCode>new</InlineCode>), il faut définir
          un <strong>destructeur</strong> qui libère cette mémoire (avec <InlineCode>delete</InlineCode>) afin
          d'éviter les <strong>fuites mémoire</strong>.
        </p>
        <CodeBlock
          code={`class Voiture {
  private:
    Roue* roue1;
  public:
    Voiture() { roue1 = new Roue(); }
    ~Voiture() { delete roue1; } // libère la mémoire allouée
};`}
        />
        <Callout tone="warn">
          Oublier le destructeur (ou oublier d'y libérer la mémoire) provoque une fuite mémoire : la mémoire allouée
          reste occupée même après que l'objet n'est plus utilisé.
        </Callout>
      </SectionCard>

      <SectionCard title="Doxygen">
        <p>
          <strong>Doxygen</strong> est un outil de <strong>documentation du code</strong>. Il permet de générer
          automatiquement une documentation (souvent au format HTML) à partir de commentaires écrits directement
          dans le code source, ce qui facilite la compréhension et la maintenance du projet.
        </p>
      </SectionCard>
    </div>
  );
}
