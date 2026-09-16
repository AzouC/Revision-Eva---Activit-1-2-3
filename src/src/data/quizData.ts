export type Category = "cmake" | "cross" | "git" | "uml" | "linux";

export interface QCMQuestion {
  type: "qcm";
  id: string;
  category: Category;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface FillQuestion {
  type: "fill";
  id: string;
  category: Category;
  prompt: string; // texte avec "____" pour le trou
  answers: string[]; // réponses acceptées (en minuscule)
  explanation: string;
}

export interface MatchingQuestion {
  type: "matching";
  id: string;
  category: Category;
  question: string;
  left: string[]; // commandes / notions
  right: string[]; // descriptions dans un ordre différent (mélangées à l'affichage)
  // correctMap[i] = index dans right qui correspond à left[i]
  correctMap: number[];
  explanation: string;
}

export interface OrderingQuestion {
  type: "ordering";
  id: string;
  category: Category;
  question: string;
  steps: string[]; // dans l'ordre correct
  explanation: string;
}

export type Question = QCMQuestion | FillQuestion | MatchingQuestion | OrderingQuestion;

export const categoryLabels: Record<Category, string> = {
  cmake: "CMake",
  cross: "Cross-compilation",
  git: "Git",
  uml: "UML & POO",
  linux: "Commandes Linux",
};

export const categoryColors: Record<Category, string> = {
  cmake: "from-sky-500 to-cyan-500",
  cross: "from-orange-500 to-amber-500",
  git: "from-rose-500 to-pink-500",
  uml: "from-violet-500 to-purple-500",
  linux: "from-emerald-500 to-teal-500",
};

export const questions: Question[] = [
  // ---------------- CMAKE ----------------
  {
    type: "qcm",
    id: "cmake-1",
    category: "cmake",
    question: "Qu'est-ce que CMake ?",
    choices: [
      "Un compilateur C++ multiplateforme",
      "Un outil open-source d'automatisation de la configuration de construction de projets, multiplateforme",
      "Un éditeur de texte pour le C++",
      "Un système de gestion de versions",
    ],
    correctIndex: 1,
    explanation:
      "CMake est un outil open-source qui automatise la configuration de la construction (build) d'un projet et fonctionne sur plusieurs plateformes (Linux, Windows, macOS).",
  },
  {
    type: "qcm",
    id: "cmake-2",
    category: "cmake",
    question: "Quel est le rôle du fichier CMakeLists.txt ?",
    choices: [
      "Il contient le code source du programme",
      "Il liste les dépendances, options de compilation et paramètres du projet",
      "Il stocke l'historique des commits",
      "Il contient uniquement la documentation du projet",
    ],
    correctIndex: 1,
    explanation:
      "Le fichier CMakeLists.txt décrit comment construire le projet : dépendances, options de compilation, paramètres, etc.",
  },
  {
    type: "qcm",
    id: "cmake-3",
    category: "cmake",
    question: "À quoi sert la commande cmake_minimum_required(VERSION x.x) ?",
    choices: [
      "À définir la version minimale de CMake requise pour construire le projet",
      "À définir la version minimale du compilateur C++",
      "À installer CMake sur la machine",
      "À définir la version du projet livré",
    ],
    correctIndex: 0,
    explanation:
      "Cette commande précise la version minimale de CMake nécessaire pour que le CMakeLists.txt fonctionne correctement.",
  },
  {
    type: "qcm",
    id: "cmake-4",
    category: "cmake",
    question: "À quoi sert la commande project(NomDuProjet) ?",
    choices: [
      "Elle crée un nouveau dossier pour le projet",
      "Elle définit le nom du projet (et peut initialiser d'autres variables internes)",
      "Elle compile le projet",
      "Elle initialise un dépôt Git",
    ],
    correctIndex: 1,
    explanation: "project(NomDuProjet) déclare le nom du projet dans CMake.",
  },
  {
    type: "qcm",
    id: "cmake-5",
    category: "cmake",
    question:
      "À quoi servent set(CMAKE_CXX_STANDARD 11) et set(CMAKE_CXX_STANDARD_REQUIRED True) ?",
    choices: [
      "À définir la version du C++ utilisée par le projet et à rendre cette version obligatoire",
      "À définir la version de CMake utilisée",
      "À activer le mode debug",
      "À définir le nom de l'exécutable final",
    ],
    correctIndex: 0,
    explanation:
      "Ces deux commandes fixent la norme C++ utilisée (ici C++11) et imposent son respect strict lors de la compilation.",
  },
  {
    type: "qcm",
    id: "cmake-6",
    category: "cmake",
    question: "Que fait la commande add_executable(nom fichier.cpp) ?",
    choices: [
      "Elle supprime l'exécutable",
      "Elle génère un exécutable nommé 'nom' à partir du fichier source fichier.cpp",
      "Elle ajoute une bibliothèque au projet",
      "Elle exécute le programme",
    ],
    correctIndex: 1,
    explanation:
      "add_executable indique à CMake de produire un exécutable portant le nom donné, compilé à partir du ou des fichiers sources listés.",
  },
  {
    type: "qcm",
    id: "cmake-7",
    category: "cmake",
    question: "Que fait la commande 'cmake ..' exécutée depuis le dossier build ?",
    choices: [
      "Elle compile directement le programme en exécutable",
      "Elle lit le CMakeLists.txt situé dans le dossier parent (..) et génère les fichiers de configuration/build (ex: Makefile)",
      "Elle supprime le dossier build",
      "Elle envoie le projet sur un dépôt distant",
    ],
    correctIndex: 1,
    explanation:
      "'..' désigne le dossier parent, où se trouve le CMakeLists.txt. cmake .. génère, dans le dossier build courant, les fichiers nécessaires à la compilation (par ex. un Makefile) sans polluer les sources.",
  },
  {
    type: "fill",
    id: "cmake-fill-1",
    category: "cmake",
    prompt:
      "Pour créer un dossier de build et s'y déplacer avant de lancer CMake, on tape : mkdir build puis ____ build",
    answers: ["cd"],
    explanation: "cd build permet de se déplacer dans le dossier build nouvellement créé.",
  },
  {
    type: "fill",
    id: "cmake-fill-2",
    category: "cmake",
    prompt:
      "Une fois les fichiers générés par CMake, la commande ____ lit le Makefile et compile réellement le projet.",
    answers: ["make"],
    explanation:
      "make utilise le Makefile généré par CMake pour compiler le projet et produire l'exécutable.",
  },
  {
    type: "fill",
    id: "cmake-fill-3",
    category: "cmake",
    prompt: "Pour lancer l'exécutable généré nommé 'monprogramme', on tape : ____monprogramme",
    answers: ["./"],
    explanation:
      "./monprogramme exécute le programme situé dans le répertoire courant (le './' indique le chemin relatif).",
  },
  {
    type: "matching",
    id: "cmake-match-1",
    category: "cmake",
    question: "Associe chaque commande CMake à son rôle.",
    left: [
      "cmake_minimum_required(VERSION x.x)",
      "project(NomDuProjet)",
      "set(CMAKE_CXX_STANDARD 11)",
      "add_executable(nom fichier.cpp)",
    ],
    right: [
      "Génère l'exécutable à partir du fichier source",
      "Définit le nom du projet",
      "Impose la version du C++ utilisée",
      "Fixe la version minimale de CMake requise",
    ],
    correctMap: [3, 1, 2, 0],
    explanation:
      "Chaque commande CMake a un rôle précis dans la configuration du projet avant compilation.",
  },
  {
    type: "ordering",
    id: "cmake-order-1",
    category: "cmake",
    question:
      "Remets dans l'ordre les étapes permettant de compiler puis d'exécuter un projet avec CMake.",
    steps: ["mkdir build", "cd build", "cmake ..", "make", "./nom_executable"],
    explanation:
      "On crée le dossier de build, on s'y déplace, on génère les fichiers de build avec cmake .., on compile avec make, puis on exécute le programme obtenu.",
  },

  // ---------------- CROSS-COMPILATION ----------------
  {
    type: "qcm",
    id: "cross-1",
    category: "cross",
    question: "Qu'est-ce que la cross-compilation ?",
    choices: [
      "Compiler un programme plusieurs fois de suite",
      "Compiler un programme sur une machine pour qu'il s'exécute sur une autre machine (architecture ou OS différents)",
      "Compiler un programme en plusieurs langages en même temps",
      "Utiliser deux compilateurs différents sur la même machine",
    ],
    correctIndex: 1,
    explanation:
      "La cross-compilation consiste à produire, depuis une machine 'hôte', un exécutable destiné à fonctionner sur une machine 'cible' différente (architecture et/ou OS).",
  },
  {
    type: "qcm",
    id: "cross-2",
    category: "cross",
    question: "Quelle affirmation décrit le mieux une architecture CISC ?",
    choices: [
      "Un jeu d'instructions réduit et simple, exécuté très rapidement",
      "Un jeu d'instructions complexe et riche, avec des instructions capables de réaliser des opérations complexes",
      "Une architecture réservée aux microcontrôleurs",
      "Une architecture sans jeu d'instructions",
    ],
    correctIndex: 1,
    explanation:
      "CISC (Complex Instruction Set Computer) désigne des processeurs avec un jeu d'instructions complexe et riche, chaque instruction pouvant effectuer plusieurs opérations.",
  },
  {
    type: "qcm",
    id: "cross-3",
    category: "cross",
    question: "Quelle affirmation décrit le mieux une architecture RISC ?",
    choices: [
      "Un jeu d'instructions réduit et simplifié, favorisant des instructions rapides à exécuter",
      "Un jeu d'instructions extrêmement complexe",
      "Une architecture uniquement logicielle",
      "Une architecture qui n'exécute que du code compilé en C++",
    ],
    correctIndex: 0,
    explanation:
      "RISC (Reduced Instruction Set Computer) repose sur un jeu d'instructions réduit et simple, chaque instruction s'exécutant généralement en un cycle.",
  },
  {
    type: "qcm",
    id: "cross-4",
    category: "cross",
    question: "Que signifie ISA ?",
    choices: [
      "Instruction Set Architecture : l'ensemble des instructions qu'un processeur peut exécuter",
      "Integrated System Application",
      "Internal Storage Architecture",
      "Instruction Standard Assembly",
    ],
    correctIndex: 0,
    explanation:
      "L'ISA (Instruction Set Architecture) définit le jeu d'instructions compris et exécutable par un processeur donné.",
  },
  {
    type: "qcm",
    id: "cross-5",
    category: "cross",
    question: "Pourquoi utilise-t-on la cross-compilation ?",
    choices: [
      "Uniquement pour améliorer la lisibilité du code source",
      "Parce que la machine cible peut être trop lente, ne pas disposer de chaîne de compilation, ou ne pas avoir d'écran/clavier",
      "Parce que c'est obligatoire pour tous les projets C++",
      "Pour remplacer Git",
    ],
    correctIndex: 1,
    explanation:
      "On cross-compile notamment quand la machine cible (ex: carte embarquée) est trop lente pour compiler elle-même, n'a pas d'outils de compilation installés, ou pas d'interface (écran/clavier).",
  },
  {
    type: "qcm",
    id: "cross-6",
    category: "cross",
    question:
      "Que permet de faire g++-mingw-w64 depuis une machine Linux ?",
    choices: [
      "Compiler un programme pour qu'il s'exécute sous Windows",
      "Compiler un programme pour qu'il s'exécute sous macOS uniquement",
      "Installer Windows sur la machine Linux",
      "Créer un dépôt Git distant",
    ],
    correctIndex: 0,
    explanation:
      "g++-mingw-w64 est un compilateur croisé permettant, depuis Linux, de générer un exécutable Windows (.exe).",
  },
  {
    type: "fill",
    id: "cross-fill-1",
    category: "cross",
    prompt:
      "Pour qu'un exécutable généré par cross-compilation fonctionne sans dépendre des bibliothèques du système cible, on utilise une liaison ____ des librairies comme libgcc et libstdc++.",
    answers: ["statique"],
    explanation:
      "La liaison statique inclut directement le code des librairies (libgcc, libstdc++) dans l'exécutable final, qui devient ainsi autonome sur la machine cible.",
  },
  {
    type: "matching",
    id: "cross-match-1",
    category: "cross",
    question: "Associe chaque terme à sa définition.",
    left: ["CISC", "RISC", "ISA", "Cross-compilation"],
    right: [
      "Ensemble des instructions qu'un processeur peut exécuter",
      "Jeu d'instructions complexe et riche",
      "Compiler pour une machine différente de celle de compilation",
      "Jeu d'instructions réduit et simple",
    ],
    correctMap: [1, 3, 0, 2],
    explanation:
      "CISC = instructions complexes, RISC = instructions réduites, ISA = jeu d'instructions d'un processeur, cross-compilation = compiler pour une autre machine.",
  },

  // ---------------- GIT ----------------
  {
    type: "qcm",
    id: "git-1",
    category: "git",
    question: "À quoi sert la commande git clone URL ?",
    choices: [
      "À créer une branche",
      "À récupérer un dépôt distant et le copier en local",
      "À supprimer un dépôt distant",
      "À envoyer ses modifications locales vers le dépôt distant",
    ],
    correctIndex: 1,
    explanation:
      "git clone URL télécharge une copie complète d'un dépôt distant sur la machine locale.",
  },
  {
    type: "qcm",
    id: "git-2",
    category: "git",
    question: "À quoi sert la commande git push ?",
    choices: [
      "À récupérer les modifications distantes",
      "À envoyer les commits locaux vers le dépôt distant",
      "À créer un nouveau dépôt local",
      "À annuler le dernier commit",
    ],
    correctIndex: 1,
    explanation: "git push envoie les commits enregistrés localement vers le dépôt distant.",
  },
  {
    type: "qcm",
    id: "git-3",
    category: "git",
    question: "À quoi sert la commande git fetch ?",
    choices: [
      "À récupérer les modifications du dépôt distant SANS les fusionner avec la branche locale",
      "À récupérer les modifications du dépôt distant ET les fusionner immédiatement",
      "À supprimer les modifications locales",
      "À envoyer les commits locaux",
    ],
    correctIndex: 0,
    explanation:
      "git fetch télécharge les nouveautés du dépôt distant mais ne les fusionne pas automatiquement avec la branche locale.",
  },
  {
    type: "qcm",
    id: "git-4",
    category: "git",
    question: "À quoi sert la commande git pull ?",
    choices: [
      "À récupérer les modifications distantes ET les fusionner avec la branche locale",
      "À uniquement télécharger les modifications sans fusion",
      "À créer un commit vide",
      "À cloner un dépôt",
    ],
    correctIndex: 0,
    explanation:
      "git pull équivaut à un git fetch suivi d'une fusion (merge) automatique avec la branche locale courante.",
  },
  {
    type: "qcm",
    id: "git-5",
    category: "git",
    question: "Qu'est-ce qu'un commit en Git ?",
    choices: [
      "Un enregistrement (photographie) des modifications apportées aux fichiers, accompagné d'un message",
      "Une branche distante",
      "Un fichier de configuration Git",
      "Le nom du dépôt distant",
    ],
    correctIndex: 0,
    explanation:
      "Un commit capture un état des fichiers modifiés avec un message décrivant les changements effectués.",
  },
  {
    type: "qcm",
    id: "git-6",
    category: "git",
    question: "Quelle est une bonne pratique concernant les commits ?",
    choices: [
      "Faire un seul commit gigantesque à la fin du projet",
      "Faire des commits réguliers et de petite taille, avec des messages clairs et explicites",
      "Ne jamais écrire de message de commit",
      "Committer uniquement le vendredi",
    ],
    correctIndex: 1,
    explanation:
      "Il est recommandé de committer régulièrement, par petites étapes logiques, avec des messages clairs décrivant les changements.",
  },
  {
    type: "matching",
    id: "git-match-1",
    category: "git",
    question: "Associe chaque commande Git à sa description.",
    left: ["git clone", "git push", "git fetch", "git pull"],
    right: [
      "Récupère les modifications distantes et les fusionne",
      "Envoie les modifications locales vers le dépôt distant",
      "Récupère un dépôt distant en local",
      "Récupère les modifications distantes sans fusionner",
    ],
    correctMap: [2, 1, 3, 0],
    explanation:
      "clone = récupérer un dépôt, push = envoyer, fetch = récupérer sans fusion, pull = récupérer + fusion.",
  },

  // ---------------- UML & POO ----------------
  {
    type: "qcm",
    id: "uml-1",
    category: "uml",
    question: "À quoi sert un diagramme de classe UML ?",
    choices: [
      "À représenter graphiquement la structure d'un programme : classes, attributs, méthodes et relations",
      "À représenter le planning d'un projet",
      "À afficher les performances d'un programme",
      "À gérer les versions du code source",
    ],
    correctIndex: 0,
    explanation:
      "Un diagramme de classe UML modélise la structure statique d'un programme orienté objet : classes, attributs, méthodes et relations entre elles.",
  },
  {
    type: "qcm",
    id: "uml-2",
    category: "uml",
    question:
      "Quelle relation UML correspond à 'une voiture possède des roues, mais une roue peut exister indépendamment de la voiture' ?",
    choices: ["Héritage", "Composition", "Agrégation", "Aucune relation"],
    correctIndex: 2,
    explanation:
      "L'agrégation représente une relation 'a un' où les objets liés peuvent exister indépendamment l'un de l'autre.",
  },
  {
    type: "qcm",
    id: "uml-3",
    category: "uml",
    question:
      "Quelle relation UML correspond à 'une maison possède des pièces qui n'existent pas sans la maison' ?",
    choices: ["Composition", "Héritage", "Agrégation", "Association simple"],
    correctIndex: 0,
    explanation:
      "La composition est une relation forte : les parties (les pièces) ne peuvent pas exister sans le tout (la maison). Si la maison est détruite, les pièces le sont aussi.",
  },
  {
    type: "qcm",
    id: "uml-4",
    category: "uml",
    question:
      "Quelle relation UML correspond à 'un Chat est un Animal' ?",
    choices: ["Composition", "Agrégation", "Héritage", "Aucune relation"],
    correctIndex: 2,
    explanation:
      "L'héritage représente une relation 'est un' : la classe Chat hérite des caractéristiques de la classe Animal.",
  },
  {
    type: "qcm",
    id: "uml-5",
    category: "uml",
    question:
      "En UML, que signifie le symbole '-' devant un attribut ou une méthode ?",
    choices: ["Visibilité publique", "Visibilité privée", "Une valeur négative", "Une méthode statique"],
    correctIndex: 1,
    explanation:
      "Le symbole '-' indique une visibilité privée (private en C++), accessible uniquement depuis la classe elle-même.",
  },
  {
    type: "qcm",
    id: "uml-6",
    category: "uml",
    question: "En UML, que signifie le symbole '+' devant un attribut ou une méthode ?",
    choices: ["Visibilité privée", "Visibilité publique", "Une méthode virtuelle", "Un attribut statique"],
    correctIndex: 1,
    explanation:
      "Le symbole '+' indique une visibilité publique (public en C++), accessible depuis l'extérieur de la classe.",
  },
  {
    type: "fill",
    id: "uml-fill-1",
    category: "uml",
    prompt:
      "En C++, un attribut privé nommé 'age' de type int se déclare, dans la section privée, sous la forme : int ____;",
    answers: ["age", "age;"],
    explanation:
      "Un attribut privé se déclare comme n'importe quel attribut, mais dans la section 'private:' de la classe : int age;",
  },
  {
    type: "qcm",
    id: "uml-7",
    category: "uml",
    question:
      "Pourquoi est-il important de définir un destructeur dans une classe C++ qui alloue de la mémoire dynamiquement ?",
    choices: [
      "Pour accélérer la compilation",
      "Pour éviter les fuites mémoire en libérant les ressources allouées",
      "Pour rendre la classe publique",
      "Ce n'est jamais nécessaire",
    ],
    correctIndex: 1,
    explanation:
      "Le destructeur permet de libérer proprement la mémoire allouée dynamiquement (avec new par exemple) afin d'éviter les fuites mémoire.",
  },
  {
    type: "qcm",
    id: "uml-8",
    category: "uml",
    question: "À quoi sert Doxygen ?",
    choices: [
      "C'est un compilateur C++",
      "C'est un outil de documentation du code source",
      "C'est un gestionnaire de versions",
      "C'est un outil de cross-compilation",
    ],
    correctIndex: 1,
    explanation:
      "Doxygen est un outil qui génère automatiquement une documentation (souvent au format HTML) à partir de commentaires écrits dans le code source.",
  },
  {
    type: "matching",
    id: "uml-match-1",
    category: "uml",
    question: "Associe chaque relation UML à sa définition.",
    left: ["Héritage", "Composition", "Agrégation"],
    right: [
      "Relation 'a un' forte : les parties n'existent pas sans le tout",
      "Relation 'est un' entre une classe fille et une classe mère",
      "Relation 'a un' faible : les parties peuvent exister indépendamment",
    ],
    correctMap: [1, 0, 2],
    explanation:
      "Héritage = 'est un', Composition = 'a un' fort (dépendance de vie), Agrégation = 'a un' faible (indépendance de vie).",
  },

  // ---------------- LINUX ----------------
  {
    type: "qcm",
    id: "linux-1",
    category: "linux",
    question: "À quoi sert la commande pwd ?",
    choices: [
      "Afficher le répertoire courant",
      "Créer un répertoire",
      "Supprimer un fichier",
      "Changer les permissions",
    ],
    correctIndex: 0,
    explanation: "pwd (print working directory) affiche le chemin absolu du répertoire courant.",
  },
  {
    type: "qcm",
    id: "linux-2",
    category: "linux",
    question: "Que fait la commande ls -l ?",
    choices: [
      "Elle liste le contenu du répertoire sous forme détaillée (permissions, taille, dates...)",
      "Elle supprime le contenu du répertoire",
      "Elle liste uniquement les fichiers cachés",
      "Elle crée un lien symbolique",
    ],
    correctIndex: 0,
    explanation:
      "L'option -l affiche un format long avec les détails : permissions, propriétaire, taille, date de modification, etc.",
  },
  {
    type: "qcm",
    id: "linux-3",
    category: "linux",
    question: "Que fait la commande ls -a ?",
    choices: [
      "Elle affiche tous les fichiers, y compris les fichiers cachés (commençant par un point)",
      "Elle affiche uniquement les dossiers",
      "Elle trie les fichiers par taille",
      "Elle archive les fichiers",
    ],
    correctIndex: 0,
    explanation: "L'option -a (all) inclut les fichiers/dossiers cachés dans le listing.",
  },
  {
    type: "qcm",
    id: "linux-4",
    category: "linux",
    question: "Que fait la commande cd .. ?",
    choices: [
      "Elle revient au répertoire parent",
      "Elle va directement à la racine du système",
      "Elle retourne au répertoire personnel",
      "Elle affiche le contenu du répertoire",
    ],
    correctIndex: 0,
    explanation: "cd .. permet de remonter d'un niveau dans l'arborescence des répertoires.",
  },
  {
    type: "qcm",
    id: "linux-5",
    category: "linux",
    question: "Que fait la commande cd ~ ?",
    choices: [
      "Elle se déplace vers le répertoire personnel (home) de l'utilisateur",
      "Elle se déplace vers la racine du système",
      "Elle crée un raccourci",
      "Elle supprime le répertoire courant",
    ],
    correctIndex: 0,
    explanation: "Le symbole ~ représente le répertoire personnel (home) de l'utilisateur connecté.",
  },
  {
    type: "qcm",
    id: "linux-6",
    category: "linux",
    question: "Que permet de faire cd /chemin ?",
    choices: [
      "Se déplacer directement vers le répertoire correspondant à ce chemin absolu",
      "Créer le dossier /chemin",
      "Copier le dossier /chemin",
      "Afficher les droits du dossier /chemin",
    ],
    correctIndex: 0,
    explanation:
      "Faire précéder le chemin d'un '/' indique un chemin absolu à partir de la racine du système de fichiers.",
  },
  {
    type: "qcm",
    id: "linux-7",
    category: "linux",
    question: "À quoi sert la commande mkdir ?",
    choices: ["Créer un répertoire", "Supprimer un répertoire", "Afficher un répertoire", "Déplacer un répertoire"],
    correctIndex: 0,
    explanation: "mkdir (make directory) crée un nouveau répertoire.",
  },
  {
    type: "qcm",
    id: "linux-8",
    category: "linux",
    question: "À quoi sert la commande cat ?",
    choices: [
      "Afficher le contenu d'un fichier",
      "Supprimer un fichier",
      "Copier un fichier",
      "Renommer un fichier",
    ],
    correctIndex: 0,
    explanation: "cat affiche le contenu d'un ou plusieurs fichiers texte dans le terminal.",
  },
  {
    type: "qcm",
    id: "linux-9",
    category: "linux",
    question: "À quoi sert sudo devant une commande ?",
    choices: [
      "À exécuter la commande avec les droits administrateur (superuser)",
      "À exécuter la commande plus rapidement",
      "À annuler la commande précédente",
      "À afficher l'aide de la commande",
    ],
    correctIndex: 0,
    explanation:
      "sudo (superuser do) permet d'exécuter une commande avec les privilèges d'administrateur, après authentification.",
  },
  {
    type: "qcm",
    id: "linux-10",
    category: "linux",
    question: "Quelle est la différence entre rm et rm -r ?",
    choices: [
      "rm supprime un fichier, rm -r supprime un dossier et son contenu de façon récursive",
      "rm -r restaure un fichier supprimé",
      "Il n'y a aucune différence",
      "rm supprime un dossier, rm -r supprime uniquement un fichier",
    ],
    correctIndex: 0,
    explanation:
      "rm supprime des fichiers, tandis que l'option -r (récursive) est nécessaire pour supprimer un dossier et tout son contenu.",
  },
  {
    type: "qcm",
    id: "linux-11",
    category: "linux",
    question: "À quoi sert la commande cp ?",
    choices: ["Copier un fichier", "Déplacer un fichier", "Compresser un fichier", "Comparer deux fichiers"],
    correctIndex: 0,
    explanation: "cp (copy) copie un fichier ou un dossier vers un autre emplacement.",
  },
  {
    type: "qcm",
    id: "linux-12",
    category: "linux",
    question: "À quoi sert la commande mv ?",
    choices: [
      "À déplacer et/ou renommer un fichier ou un dossier",
      "À afficher un fichier",
      "À créer un fichier vide",
      "À modifier les permissions",
    ],
    correctIndex: 0,
    explanation: "mv (move) permet de déplacer un fichier/dossier, et peut aussi servir à le renommer.",
  },
  {
    type: "qcm",
    id: "linux-13",
    category: "linux",
    question: "À quoi sert la commande chmod ?",
    choices: [
      "À modifier les permissions d'un fichier ou d'un dossier",
      "À changer le propriétaire d'un fichier",
      "À afficher les métadonnées d'un fichier",
      "À compresser un fichier",
    ],
    correctIndex: 0,
    explanation: "chmod (change mode) modifie les droits d'accès (lecture, écriture, exécution) d'un fichier/dossier.",
  },
  {
    type: "qcm",
    id: "linux-14",
    category: "linux",
    question: "À quoi sert la commande touch ?",
    choices: [
      "Créer un fichier vide (ou mettre à jour sa date de modification)",
      "Supprimer un fichier",
      "Afficher le contenu d'un fichier",
      "Compiler un fichier",
    ],
    correctIndex: 0,
    explanation: "touch crée un fichier vide s'il n'existe pas, ou met à jour sa date de dernière modification.",
  },
  {
    type: "fill",
    id: "linux-fill-1",
    category: "linux",
    prompt: "Pour afficher le contenu du répertoire courant en incluant les fichiers cachés et en mode détaillé, on combine les deux options : ls ____",
    answers: ["-la", "-al"],
    explanation: "ls -la (ou ls -al) combine le mode détaillé (-l) et l'affichage des fichiers cachés (-a).",
  },
  {
    type: "matching",
    id: "linux-match-1",
    category: "linux",
    question: "Associe chaque commande Linux à sa description.",
    left: ["pwd", "mkdir", "rm -r", "chmod"],
    right: [
      "Modifie les permissions d'un fichier",
      "Affiche le répertoire courant",
      "Supprime un dossier et son contenu",
      "Crée un répertoire",
    ],
    correctMap: [1, 3, 2, 0],
    explanation:
      "pwd affiche le répertoire courant, mkdir crée un dossier, rm -r supprime récursivement, chmod modifie les permissions.",
  },
  {
    type: "matching",
    id: "linux-match-2",
    category: "linux",
    question: "Associe chaque commande Linux à sa description.",
    left: ["cp", "mv", "touch", "cat"],
    right: [
      "Affiche le contenu d'un fichier",
      "Copie un fichier",
      "Crée un fichier vide",
      "Déplace ou renomme un fichier",
    ],
    correctMap: [1, 3, 2, 0],
    explanation:
      "cp copie, mv déplace/renomme, touch crée un fichier vide, cat affiche le contenu d'un fichier.",
  },
];
