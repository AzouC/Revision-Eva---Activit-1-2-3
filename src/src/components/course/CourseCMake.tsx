import CodeBlock from "../CodeBlock";
import { Callout, InlineCode, SectionCard } from "./CourseHelpers";

export default function CourseCMake() {
  return (
    <div className="space-y-5">
      <SectionCard title="Qu'est-ce que CMake ?">
        <p>
          <strong>CMake</strong> est un outil <strong>open-source</strong> qui permet
          d'<strong>automatiser la configuration de la construction (build)</strong> d'un projet informatique. Il a
          l'avantage d'être <strong>multiplateforme</strong> : le même projet peut ainsi être configuré et compilé
          sur Linux, Windows ou macOS sans réécrire les instructions de compilation à chaque fois.
        </p>
        <p>
          Concrètement, CMake ne compile pas lui-même le code : il génère les fichiers nécessaires (par exemple un
          Makefile) que l'on utilisera ensuite avec un outil de compilation comme <InlineCode>make</InlineCode>.
        </p>
      </SectionCard>

      <SectionCard title="Le fichier CMakeLists.txt">
        <p>
          Le fichier <InlineCode>CMakeLists.txt</InlineCode> est le fichier central d'un projet CMake. Il décrit :
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>les <strong>dépendances</strong> du projet (bibliothèques nécessaires) ;</li>
          <li>les <strong>options de compilation</strong> (norme du langage, drapeaux du compilateur...) ;</li>
          <li>les <strong>paramètres</strong> du projet (nom, exécutables à générer, etc.).</li>
        </ul>
        <p>Il se place à la racine du projet et doit obligatoirement porter ce nom exact.</p>
      </SectionCard>

      <SectionCard title="Les commandes CMake de base">
        <p>Voici un exemple minimal de CMakeLists.txt et le rôle de chaque ligne :</p>
        <CodeBlock
          label="CMakeLists.txt"
          code={`cmake_minimum_required(VERSION 3.10)
project(MonProjet)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(mon_programme main.cpp)`}
        />
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <InlineCode>cmake_minimum_required(VERSION x.x)</InlineCode> : indique la{" "}
            <strong>version minimale de CMake</strong> requise pour que le projet puisse être configuré
            correctement.
          </li>
          <li>
            <InlineCode>project(NomDuProjet)</InlineCode> : définit le <strong>nom du projet</strong>.
          </li>
          <li>
            <InlineCode>set(CMAKE_CXX_STANDARD 11)</InlineCode> et{" "}
            <InlineCode>set(CMAKE_CXX_STANDARD_REQUIRED True)</InlineCode> : précisent la{" "}
            <strong>version du C++ utilisée</strong> (ici C++11) et rendent son respect obligatoire.
          </li>
          <li>
            <InlineCode>add_executable(nom fichier.cpp)</InlineCode> : demande à CMake de{" "}
            <strong>générer un exécutable</strong> nommé "nom" à partir du fichier source indiqué.
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="Les étapes de compilation avec CMake">
        <p>Une fois le CMakeLists.txt écrit, on compile le projet en suivant ces étapes, depuis un terminal :</p>
        <CodeBlock
          label="terminal"
          code={`mkdir build
cd build
cmake ..
make
./mon_programme`}
        />
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <InlineCode>mkdir build</InlineCode> : crée un dossier <InlineCode>build</InlineCode> dédié aux fichiers
            générés par la compilation, afin de ne pas mélanger ces fichiers avec le code source.
          </li>
          <li>
            <InlineCode>cd build</InlineCode> : se déplace dans ce dossier de build.
          </li>
          <li>
            <InlineCode>cmake ..</InlineCode> : lance CMake en lui indiquant que le{" "}
            <InlineCode>CMakeLists.txt</InlineCode> se trouve dans le <strong>dossier parent</strong>{" "}
            (<InlineCode>..</InlineCode>). CMake lit ce fichier et génère, dans le dossier build courant, les
            fichiers nécessaires à la compilation (par exemple un Makefile).
          </li>
          <li>
            <InlineCode>make</InlineCode> : utilise le Makefile généré pour <strong>compiler réellement</strong> le
            projet et produire l'exécutable.
          </li>
          <li>
            <InlineCode>./mon_programme</InlineCode> : exécute le programme compilé (le{" "}
            <InlineCode>./</InlineCode> indique qu'il se trouve dans le répertoire courant).
          </li>
        </ul>
        <Callout>
          Le <InlineCode>..</InlineCode> dans <InlineCode>cmake ..</InlineCode> est essentiel : il indique à CMake
          où se trouve le CMakeLists.txt à lire (le dossier parent du dossier build), tout en générant les fichiers
          de compilation dans le dossier build courant.
        </Callout>
      </SectionCard>
    </div>
  );
}
