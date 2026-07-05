# Plateforme d'enseignement — 2ème sciences (Tunisie)

Application web installable (PWA) qui organise le **programme officiel de 2ème sciences** matière par matière et chapitre par chapitre, avec cours, résumés, notions clés et exercices corrigés. Elle contient aussi un espace **« Mes documents »** pour classer ses propres fichiers.

Interface bilingue **français / arabe** (bouton `FR / عربي`) et numéro de **version** affiché dans l'en-tête.

---

## 1. Navigation : deux pages principales

Une barre en haut permet d'afficher **une seule page à la fois** (plus de contenu empilé) :

- **Programme** — le programme officiel (matières → chapitres → chapitre).
- **Mes documents** — dépôt et classement de fichiers personnels.

## 2. Programme : navigation par paliers

Le programme se parcourt comme de vraies pages successives :

1. **Matières** — une carte par matière (12 manuels officiels), avec le nombre de chapitres.
2. **Page matière** — en-tête de la matière, PDF du manuel, puis la **liste des chapitres** en cartes (chaque carte indique le nombre d'exercices « du livre » et « autres »).
3. **Page chapitre** — le chapitre choisi, organisé en **onglets**.

Un **fil d'Ariane** cliquable (`Matières › Physique › Électricité`) permet de revenir à n'importe quel niveau. Les pastilles de matières de la page « Mes documents » ouvrent aussi directement la matière.

## 3. Onglets d'une page chapitre

Chaque chapitre est divisé en cinq onglets :

- **Livre & résumé** — PDF du livre scolaire, **objectif du chapitre**, **l'essentiel à retenir** (règles, formules, méthode), **notions clés** (vocabulaire défini) et liens vidéo.
- **Exercices du livre** — tous les exercices prévus pour le chapitre, avec un nombre propre à chaque chapitre/matière, énoncé complet affiché dans la plateforme, page PDF de référence optionnelle, figure et bouton **Voir la correction détaillée**.
- **Autres exercices** — exercices supplémentaires corrigés, avec filtre de difficulté.
- **Problèmes** — au moins **5 situations-problèmes corrigées par chapitre**, séparées dans leur propre onglet.
- **Examens** — sujets d'examen corrigés avec durée, barème, énoncé structuré et méthode de correction.

## 4. Contenu pédagogique

- **Tous les exercices de type livre pour chaque chapitre** (sciences et matières littéraires), complétés automatiquement jusqu'au total défini pour ce chapitre.
- **Banque d'entraînement supplémentaire** : chaque chapitre reçoit automatiquement au moins 20 activités supplémentaires au total, réparties entre l'onglet « Autres exercices » et l'onglet « Problèmes ».
- **Sujets d'examen** : chaque chapitre reçoit automatiquement 5 examens corrigés pour s'entraîner en conditions proches d'un devoir, avec des énoncés originaux intégrés directement dans l'application.
- **Corrections détaillées en mode professeur** : chaque correction explique la démarche, pourquoi la méthode convient, les étapes d'application, les points à vérifier et ajoute un croquis au tableau quand un dessin aide l'élève à comprendre.
- **Figures dessinées en SVG** (originales, pas d'images du manuel) : parabole, droite affine, vecteurs, circuit électrique, graphique distance-temps, molécule d'eau, atome, coupe géologique, courbe de température — chacune avec sa légende.
- L'**arabe** dispose de contenu et d'exercices rédigés en arabe.

Tout ce contenu se modifie dans `app.js` :

- `chapterContent` — objectif, essentiel, notions clés et exercices par chapitre (clé = `id` du manuel, dans l'ordre des chapitres).
- `chapterFigures` / `chapterFigureCaptions` — les figures SVG et leurs légendes.
- `officialManualExercises` + générateur d'énoncés — les exercices reliés au manuel officiel et complétés jusqu'au total `officialExerciseCount` de chaque chapitre (page PDF de référence, énoncé complet autonome, figure, correction détaillée masquée par bouton).

## 5. Mes documents

- Formulaire d'ajout de fichiers (PDF, images, Word, PowerPoint, audio…) avec matière, leçon, type, année, mots-clés et note.
- Bibliothèque **« Mes cours »** avec recherche, filtres et tri.
- Page de matière personnelle avec création de feuilles (éditeur de texte) et import de feuilles Word.
- Les fichiers sont stockés localement dans **IndexedDB** (ils restent dans le navigateur de cet ordinateur).

---

## Lancer sur PC

```powershell
python -m http.server 8080
```

Ouvre ensuite `http://localhost:8080/` dans Edge ou Chrome. Si le bouton `Installer` apparaît, clique dessus pour l'ajouter comme une vraie application.

## Utiliser sur téléphone

Le téléphone ne peut pas ouvrir le `localhost` du PC. Il faut soit publier le dossier sur un hébergement web, soit lancer le serveur sur le PC et ouvrir l'adresse réseau du PC depuis le téléphone, par exemple `http://192.168.1.20:8080/`.

Ensuite :

- Android Chrome : menu puis `Ajouter à l'écran d'accueil` ou `Installer l'application`.
- iPhone Safari : bouton partager puis `Sur l'écran d'accueil`.

## Mettre à jour la version

La version apparaît à trois endroits à garder synchronisés :

- `APP_VERSION` en haut de `app.js` (badge affiché dans l'en-tête) ;
- les paramètres `?v=` dans `index.html` ;
- `CACHE_NAME` et la liste `APP_SHELL` dans `service-worker.js`.

Incrémente ces valeurs ensemble (ex. `v25` → `v26`) pour forcer le rechargement après une modification.

## Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page et sections |
| `app.js` | Logique, contenu pédagogique, exercices, figures, navigation |
| `styles.css` | Styles (navigation, onglets, cartes, figures) |
| `service-worker.js` | Cache hors-ligne (PWA) |
| `manifest.webmanifest` | Manifeste d'installation PWA |
| `manuels_2eme_sciences_tunisie_officiel_cnp/` | Manuels PDF officiels |
| `icons/` | Icônes de l'application |

Les fichiers personnels sont stockés dans IndexedDB (dans le navigateur de cet ordinateur). Pour une copie durable, garde aussi tes documents importants sur un disque ou un cloud.
