const DB_NAME = "lycee-documents";
const DB_VERSION = 1;
const STORE_NAME = "documents";
const CUSTOM_SUBJECTS_KEY = "lycee-custom-subjects";
const HIDDEN_SUBJECTS_KEY = "lycee-hidden-subjects";
const UI_LANGUAGE_KEY = "lycee-ui-language";
const MANUAL_FOLDER = "manuels_2eme_sciences_tunisie_officiel_cnp";
const APP_VERSION = "v47";
const PRACTICE_MIN_EXERCISES = 20;
const PRACTICE_MIN_PROBLEMS = 5;
const EXAMS_PER_CHAPTER = 5;

const state = {
  db: null,
  documents: [],
  selectedFiles: [],
  pendingDeleteId: null,
  installPrompt: null,
  customSubjects: [],
  hiddenSubjects: [],
  activeSubject: "",
  activeStudyView: "books",
  activeCourseId: "math-functions",
  activeChapterBookId: "math-sciences",
  activeChapterIndex: 0,
  activeDifficulty: "all",
  activeChapterTab: "lesson",
  studyStage: "subjects",
  appView: "programme",
  language: "fr",
};

const defaultSubjects = [
  "Mathématiques",
  "Arabe",
  "Français",
  "Anglais",
  "SVT",
  "Science",
  "Physique",
  "Chimie",
  "Technologie",
  "Histoire",
  "Géographie",
  "Éducation civique",
  "Pensée islamique",
];
const defaultTypes = ["Cours", "Feuille", "Word", "Exercice", "Correction", "Devoir", "Résumé", "Examen", "Fiche", "Autre"];

const uiText = {
  fr: {
    dir: "ltr",
    appTitle: "Documents et cours de lycée",
    appleTitle: "Docs Lycée",
    level: "2ème sciences",
    headerTitle: "Programme 2ème sciences",
    navProgramme: "Programme",
    navDocuments: "Mes documents",
    install: "Installer",
    exportTitle: "Exporter l'index",
    resetTitle: "Réinitialiser",
    documentsStat: "documents",
    storedStat: "stockés",
    subjectsStat: "matières",
    subjectsTitle: "Matières",
    visibleCount: "{count} cours affiché{plural}",
    addSubject: "Ajouter une matière",
    deleteSubject: "Supprimer une matière",
    all: "Toutes",
    officialProgram: "Programme officiel Tunisie",
    studyTitle: "Programme : matières, chapitres et exercices",
    books: "Livres",
    interactiveCourse: "Cours interactif",
    chooseChapter: "Page de chapitre",
    book: "Livre",
    chapter: "Chapitre",
    difficulty: "Difficulté",
    allDifficulties: "Tous les niveaux",
    difficultyEasy: "Facile",
    difficultyMedium: "Moyen",
    difficultyHard: "Difficile",
    chapterFocus: "Chapitre sélectionné",
    tabLesson: "Livre & résumé",
    tabManual: "Exercices du livre",
    tabPractice: "Autres exercices",
    tabProblems: "Problèmes",
    tabExams: "Examens",
    chaptersCount: "{count} chapitres",
    fromBookShort: "{count} du livre",
    otherShort: "{count} autres",
    manualSectionTitle: "Livre scolaire",
    videosSectionTitle: "Vidéos",
    practiceIntro: "Exercices supplémentaires classés par niveau : choisis une difficulté.",
    problemsIntro: "Situations-problèmes corrigées pas à pas : choisis une difficulté.",
    examsIntro: "Sujets d'examen corrigés avec durée, barème et méthode de rédaction.",
    practiceSummary: "{count} exercices corrigés",
    problemsSummary: "{count} problèmes corrigés",
    examsSummary: "{count} examens corrigés",
    examNumber: "Examen {number}",
    examDuration: "Durée",
    examScale: "Barème",
    problemBadge: "Problème",
    noPracticeExercise: "Aucun exercice pour ce niveau. Choisis un autre niveau.",
    noProblemExercise: "Aucun problème pour ce niveau. Choisis un autre niveau.",
    officialExercisesTitle: "Exercices du livre officiel",
    officialExercisesIntro: "Chaque exercice affiche ici un énoncé complet d'entraînement aligné sur le manuel. Le PDF reste disponible comme référence.",
    officialExerciseNumber: "Exercice officiel {number}",
    officialExerciseReference: "Énoncé complet",
    officialExerciseSource: "Source",
    officialExercisePage: "Page PDF {page}",
    openManualPage: "Page PDF de référence",
    showDetailedCorrection: "Voir la correction détaillée",
    hideDetailedCorrection: "Masquer la correction",
    noOfficialExercise: "Aucun exercice officiel lié à ce chapitre pour le moment.",
    correctionMethodTitle: "Méthode à comprendre",
    correctionWhyTitle: "Pourquoi cette méthode ?",
    correctionApplicationTitle: "Application détaillée",
    correctionCheckTitle: "À vérifier avant de finir",
    teacherExplanationTitle: "Explication du professeur",
    teacherBoardTitle: "Croquis au tableau",
    teacherStepPrefix: "Étape {number}",
    teacherActionLabel: "Ce que je fais :",
    teacherReasonLabel: "Pourquoi :",
    searchKeyword: "Rechercher par mot-clé",
    allSubjects: "Toutes les matières",
    allTypes: "Tous les types",
    allContent: "Tout le contenu",
    resourcePdf: "PDF",
    resourceSummary: "Résumé",
    resourceExercise: "Exercices",
    resourceVideo: "Vidéos",
    emptyResult: "Aucun résultat",
    emptyResultText: "Essaie un autre mot-clé ou une autre matière.",
    subjectPage: "Page de matière",
    addWordSheet: "Ajouter une feuille Word",
    close: "Fermer",
    subjectDataTitle: "Données de la matière",
    subjectDataIntro: "Livres officiels, chapitres, résumés, exercices corrigés, corrections et ressources utiles.",
    subjectManuals: "Manuels officiels",
    subjectBooksCount: "{count} livre(s)",
    subjectChaptersCount: "{count} chapitre(s)",
    subjectOfficialExercisesCount: "{count} exercices officiels",
    subjectPersonalDocsCount: "{count} documents personnels",
    subjectGeneratedExercisesCount: "{count} exercices d'entraînement",
    subjectOfficialChapterExercisesCount: "{count} exercices du manuel",
    openChapterData: "Ouvrir ce chapitre",
    noOfficialSubjectData: "Aucun manuel officiel lié à cette matière pour le moment.",
    openInteractiveCourse: "Cours interactif",
    createSheet: "Créer une feuille",
    title: "Titre",
    lesson: "Leçon",
    sheetTitlePlaceholder: "Ex: Résumé du chapitre",
    sheetLessonPlaceholder: "Ex: Leçon 2",
    editorTools: "Outils de texte",
    editorPlaceholder: "Écris ta feuille ici...",
    saveSheet: "Enregistrer la feuille",
    addDocument: "Ajouter un document",
    chooseFiles: "Choisir des fichiers",
    acceptedFiles: "PDF, images, Word, PowerPoint, audio...",
    courseTitle: "Titre du cours",
    subject: "Matière",
    new: "Nouvelle",
    lessonPlaceholder: "Ex: Leçon 3",
    titlePlaceholder: "Ex: Fonctions dérivées",
    type: "Type",
    year: "Année",
    tags: "Mots-clés",
    tagsPlaceholder: "Ex: fonctions, dérivée, graphique",
    note: "Résumé ou note",
    notePlaceholder: "Quelques lignes pour retrouver ce document",
    save: "Enregistrer",
    myCourses: "Mes cours",
    search: "Rechercher",
    sortNewest: "Plus récents",
    sortOldest: "Plus anciens",
    sortTitle: "Titre A-Z",
    sortSubject: "Matière A-Z",
    sortSize: "Taille",
    noDocument: "Aucun document",
    noDocumentText: "Ajoute tes cours, exercices et corrections.",
    deleteDocTitle: "Supprimer ce document ?",
    cancel: "Annuler",
    delete: "Supprimer",
    newSubject: "Nouvelle matière",
    name: "Nom",
    namePlaceholder: "Ex: Anglais",
    add: "Ajouter",
    deleteSubjectTitle: "Supprimer une matière",
    deleteSubjectText: "Les documents déjà ajoutés ne seront pas supprimés.",
    correctedExerciseCountOne: "1 exercice corrigé",
    correctedExercisesCount: "{count} exercices corrigés",
    exerciseNumber: "Exercice {number}",
    correction: "Correction",
    essentialsTitle: "L'essentiel à retenir",
    keyTermsTitle: "Notions clés",
    objectiveTitle: "Objectif du chapitre",
    videoNumber: "Vidéo {number}",
    exercises: "Exercices",
    exerciseCount: "{count} exercices",
    chooseAnswer: "Choisis une réponse.",
    correct: "Correct",
    toReview: "À revoir",
    lessonMeta: "Leçon",
    open: "Ouvrir",
    download: "Télécharger",
    addedOn: "ajouté le",
    chooseFileToast: "Choisis au moins un fichier.",
    documentSaved: "Document enregistré.",
    documentDeleted: "Document supprimé.",
    chooseSubjectFirst: "Choisis une matière d'abord.",
    writeSheetContent: "Écris quelque chose dans la feuille.",
    sheetSaved: "Feuille enregistrée.",
    wordAdded: "Feuille Word ajoutée.",
    noSubjectDelete: "Aucune matière à supprimer.",
    writeSubjectName: "Écris le nom de la matière.",
    subjectExists: "Cette matière existe déjà.",
    subjectAdded: "Matière ajoutée.",
    subjectDeleted: "Matière supprimée.",
    installHint: "Sur téléphone, utilise le menu du navigateur puis Ajouter à l'écran d'accueil.",
    offlineError: "Le mode hors ligne n'a pas pu être activé.",
    appInstalled: "Application installée.",
    storageError: "Impossible d'ouvrir le stockage du navigateur.",
    subjectLabels: {
      "Mathématiques": "Mathématiques",
      Arabe: "Arabe",
      "Français": "Français",
      Anglais: "Anglais",
      SVT: "SVT",
      Science: "Science",
      Physique: "Physique",
      Chimie: "Chimie",
      Technologie: "Technologie",
      Histoire: "Histoire",
      "Géographie": "Géographie",
      "Éducation civique": "Éducation civique",
      "Pensée islamique": "Pensée islamique",
    },
    typeLabels: {
      Cours: "Cours",
      Feuille: "Feuille",
      Word: "Word",
      Exercice: "Exercice",
      Correction: "Correction",
      Devoir: "Devoir",
      "Résumé": "Résumé",
      Examen: "Examen",
      Fiche: "Fiche",
      Autre: "Autre",
    },
  },
  ar: {
    dir: "rtl",
    appTitle: "وثائق ودروس الثانوية",
    appleTitle: "وثائق الثانوية",
    level: "السنة الثانية علوم",
    headerTitle: "برنامج السنة الثانية علوم",
    navProgramme: "البرنامج",
    navDocuments: "وثائقي",
    install: "تثبيت",
    exportTitle: "تصدير الفهرس",
    resetTitle: "إعادة الضبط",
    documentsStat: "وثائق",
    storedStat: "محفوظة",
    subjectsStat: "مواد",
    subjectsTitle: "المواد",
    visibleCount: "{count} درس معروض",
    addSubject: "إضافة مادة",
    deleteSubject: "حذف مادة",
    all: "الكل",
    officialProgram: "البرنامج الرسمي التونسي",
    studyTitle: "البرنامج: المواد والفصول والتمارين",
    books: "الكتب",
    interactiveCourse: "درس تفاعلي",
    chooseChapter: "صفحة الفصل",
    book: "الكتاب",
    chapter: "الفصل",
    difficulty: "الصعوبة",
    allDifficulties: "كل المستويات",
    difficultyEasy: "سهل",
    difficultyMedium: "متوسط",
    difficultyHard: "صعب",
    chapterFocus: "الفصل المختار",
    tabLesson: "الكتاب والملخص",
    tabManual: "تمارين الكتاب",
    tabPractice: "تمارين إضافية",
    tabProblems: "مسائل",
    tabExams: "امتحانات",
    chaptersCount: "{count} فصول",
    fromBookShort: "{count} من الكتاب",
    otherShort: "{count} إضافية",
    manualSectionTitle: "الكتاب المدرسي",
    videosSectionTitle: "فيديوهات",
    practiceIntro: "تمارين إضافية مرتّبة حسب المستوى: اختر صعوبة.",
    problemsIntro: "مسائل محلولة خطوة بخطوة: اختر صعوبة.",
    examsIntro: "مواضيع امتحانات محلولة مع المدة وسلم التنقيط وطريقة التحرير.",
    practiceSummary: "{count} تمرينا محلولا",
    problemsSummary: "{count} مسألة محلولة",
    examsSummary: "{count} امتحانات محلولة",
    examNumber: "امتحان {number}",
    examDuration: "المدة",
    examScale: "سلم التنقيط",
    problemBadge: "مسألة",
    noPracticeExercise: "لا توجد تمارين لهذا المستوى. اختر مستوى آخر.",
    noProblemExercise: "لا توجد مسائل لهذا المستوى. اختر مستوى آخر.",
    officialExercisesTitle: "تمارين الكتاب الرسمي",
    officialExercisesIntro: "يعرض كل تمرين هنا نصا كاملا للتدريب منسجما مع الكتاب، ويبقى ملف PDF مرجعا إضافيا.",
    officialExerciseNumber: "تمرين رسمي {number}",
    officialExerciseReference: "نص تمرين كامل",
    officialExerciseSource: "المصدر",
    officialExercisePage: "صفحة PDF {page}",
    openManualPage: "صفحة PDF كمرجع",
    showDetailedCorrection: "عرض الإصلاح المفصل",
    hideDetailedCorrection: "إخفاء الإصلاح",
    noOfficialExercise: "لا يوجد تمرين رسمي مرتبط بهذا الفصل حاليا.",
    correctionMethodTitle: "منهجية الفهم",
    correctionWhyTitle: "لماذا هذه الطريقة؟",
    correctionApplicationTitle: "تطبيق مفصل",
    correctionCheckTitle: "قبل إنهاء الإجابة تأكد من",
    teacherExplanationTitle: "شرح الأستاذ",
    teacherBoardTitle: "رسم توضيحي على السبورة",
    teacherStepPrefix: "المرحلة {number}",
    teacherActionLabel: "ما أفعله:",
    teacherReasonLabel: "لماذا:",
    searchKeyword: "ابحث بكلمة مفتاحية",
    allSubjects: "كل المواد",
    allTypes: "كل الأنواع",
    allContent: "كل المحتوى",
    resourcePdf: "PDF",
    resourceSummary: "ملخص",
    resourceExercise: "تمارين",
    resourceVideo: "فيديوهات",
    emptyResult: "لا توجد نتائج",
    emptyResultText: "جرّب كلمة مفتاحية أو مادة أخرى.",
    subjectPage: "صفحة المادة",
    addWordSheet: "إضافة ورقة Word",
    close: "إغلاق",
    subjectDataTitle: "بيانات المادة",
    subjectDataIntro: "كتب رسمية، فصول، ملخصات، تمارين مع الإصلاح، تصحيحات وموارد مفيدة.",
    subjectManuals: "الكتب الرسمية",
    subjectBooksCount: "{count} كتاب",
    subjectChaptersCount: "{count} فصل",
    subjectOfficialExercisesCount: "{count} تمارين رسمية",
    subjectPersonalDocsCount: "{count} وثائق شخصية",
    subjectGeneratedExercisesCount: "{count} تمارين تدريبية",
    subjectOfficialChapterExercisesCount: "{count} تمارين من الكتاب",
    openChapterData: "فتح هذا الفصل",
    noOfficialSubjectData: "لا يوجد كتاب رسمي مرتبط بهذه المادة حاليا.",
    openInteractiveCourse: "درس تفاعلي",
    createSheet: "إنشاء ورقة",
    title: "العنوان",
    lesson: "الدرس",
    sheetTitlePlaceholder: "مثال: ملخص الفصل",
    sheetLessonPlaceholder: "مثال: الدرس 2",
    editorTools: "أدوات النص",
    editorPlaceholder: "اكتب الورقة هنا...",
    saveSheet: "حفظ الورقة",
    addDocument: "إضافة وثيقة",
    chooseFiles: "اختيار الملفات",
    acceptedFiles: "PDF، صور، Word، PowerPoint، صوت...",
    courseTitle: "عنوان الدرس",
    subject: "المادة",
    new: "جديدة",
    lessonPlaceholder: "مثال: الدرس 3",
    titlePlaceholder: "مثال: الدوال المشتقة",
    type: "النوع",
    year: "السنة",
    tags: "كلمات مفتاحية",
    tagsPlaceholder: "مثال: دوال، مشتقة، رسم بياني",
    note: "ملخص أو ملاحظة",
    notePlaceholder: "اكتب أسطرا قصيرة لتجد هذه الوثيقة بسرعة",
    save: "حفظ",
    myCourses: "دروسي",
    search: "بحث",
    sortNewest: "الأحدث",
    sortOldest: "الأقدم",
    sortTitle: "العنوان أ-ي",
    sortSubject: "المادة أ-ي",
    sortSize: "الحجم",
    noDocument: "لا توجد وثائق",
    noDocumentText: "أضف دروسك وتمارينك وإصلاحاتك.",
    deleteDocTitle: "حذف هذه الوثيقة؟",
    cancel: "إلغاء",
    delete: "حذف",
    newSubject: "مادة جديدة",
    name: "الاسم",
    namePlaceholder: "مثال: الإنجليزية",
    add: "إضافة",
    deleteSubjectTitle: "حذف مادة",
    deleteSubjectText: "لن يتم حذف الوثائق التي أضفتها سابقا.",
    correctedExerciseCountOne: "تمرين واحد مع الإصلاح",
    correctedExercisesCount: "{count} تمارين مع الإصلاح",
    exerciseNumber: "تمرين {number}",
    correction: "الإصلاح",
    essentialsTitle: "الأساسي الذي يجب حفظه",
    keyTermsTitle: "مفاهيم أساسية",
    objectiveTitle: "هدف الدرس",
    videoNumber: "فيديو {number}",
    exercises: "تمارين",
    exerciseCount: "{count} تمارين",
    chooseAnswer: "اختر إجابة.",
    correct: "صحيح",
    toReview: "راجع الإجابة",
    lessonMeta: "الدرس",
    open: "فتح",
    download: "تحميل",
    addedOn: "أضيف يوم",
    chooseFileToast: "اختر ملفا واحدا على الأقل.",
    documentSaved: "تم حفظ الوثيقة.",
    documentDeleted: "تم حذف الوثيقة.",
    chooseSubjectFirst: "اختر مادة أولا.",
    writeSheetContent: "اكتب شيئا في الورقة.",
    sheetSaved: "تم حفظ الورقة.",
    wordAdded: "تمت إضافة ورقة Word.",
    noSubjectDelete: "لا توجد مادة للحذف.",
    writeSubjectName: "اكتب اسم المادة.",
    subjectExists: "هذه المادة موجودة بالفعل.",
    subjectAdded: "تمت إضافة المادة.",
    subjectDeleted: "تم حذف المادة.",
    installHint: "على الهاتف، استعمل قائمة المتصفح ثم أضف التطبيق إلى الشاشة الرئيسية.",
    offlineError: "تعذر تفعيل وضع دون إنترنت.",
    appInstalled: "تم تثبيت التطبيق.",
    storageError: "تعذر فتح تخزين المتصفح.",
    subjectLabels: {
      "Mathématiques": "الرياضيات",
      Arabe: "العربية",
      "Français": "الفرنسية",
      Anglais: "الإنجليزية",
      SVT: "علوم الحياة والأرض",
      Science: "علوم",
      Physique: "الفيزياء",
      Chimie: "الكيمياء",
      Technologie: "التكنولوجيا",
      Histoire: "التاريخ",
      "Géographie": "الجغرافيا",
      "Éducation civique": "التربية المدنية",
      "Pensée islamique": "التفكير الإسلامي",
    },
    typeLabels: {
      Cours: "درس",
      Feuille: "ورقة",
      Word: "Word",
      Exercice: "تمرين",
      Correction: "إصلاح",
      Devoir: "فرض",
      "Résumé": "ملخص",
      Examen: "اختبار",
      Fiche: "بطاقة",
      Autre: "آخر",
    },
  },
};

const officialBooks = [
  {
    id: "arabe-textes",
    subject: "Arabe",
    title: "عيون الأدب - textes",
    summary: "Lecture, analyse de textes, langue arabe et production écrite autour de textes littéraires et argumentatifs.",
    keywords: ["arabe", "texte", "lecture", "expression", "argumentation", "poésie", "récit", "langue"],
    parts: [
      { label: "Partie 1", file: "01_arabe_textes_partie_1_201202P00.pdf" },
      { label: "Partie 2", file: "02_arabe_textes_partie_2_201203P00.pdf" },
    ],
    chapters: [
      { title: "Compréhension", summary: "Repérer le thème, les idées principales et les indices du texte.", officialExerciseCount: 38 },
      { title: "Analyse", summary: "Étudier le vocabulaire, les procédés d'écriture et l'organisation des idées.", officialExerciseCount: 34 },
      { title: "Production", summary: "Construire un paragraphe clair avec arguments, exemples et conclusion.", officialExerciseCount: 30 },
    ],
    videoQueries: ["شرح نصوص ثانية ثانوي تونس", "عربية ثانية ثانوي علوم تونس"],
  },
  {
    id: "francais",
    subject: "Français",
    title: "Français",
    summary: "Compréhension de textes, grammaire, vocabulaire, résumé et écriture organisée.",
    keywords: ["français", "résumé", "texte", "grammaire", "vocabulaire", "argumentation", "production écrite"],
    parts: [{ label: "PDF", file: "08_francais_221203P00.pdf" }],
    chapters: [
      { title: "Lire", summary: "Identifier la situation d'énonciation, le thème et le point de vue.", officialExerciseCount: 24 },
      { title: "Résumer", summary: "Garder les idées essentielles avec des phrases personnelles.", officialExerciseCount: 18 },
      { title: "Écrire", summary: "Organiser introduction, développement et conclusion.", officialExerciseCount: 22 },
    ],
    videoQueries: ["résumé de texte 2ème secondaire Tunisie", "français 2ème secondaire Tunisie"],
  },
  {
    id: "anglais",
    subject: "Anglais",
    title: "Anglais",
    summary: "Lecture, vocabulaire, grammaire et expression en anglais pour communiquer avec précision.",
    keywords: ["anglais", "english", "grammar", "vocabulary", "reading", "writing", "communication"],
    parts: [{ label: "PDF", file: "17_anglais_241203P00.pdf" }],
    chapters: [
      { title: "Reading", summary: "Comprendre un texte et retrouver les informations importantes.", officialExerciseCount: 18 },
      { title: "Language", summary: "Réviser les temps, les connecteurs et les structures utiles.", officialExerciseCount: 20 },
      { title: "Writing", summary: "Rédiger un paragraphe court avec vocabulaire adapté.", officialExerciseCount: 16 },
    ],
    videoQueries: ["English 2nd secondary Tunisia", "anglais 2ème secondaire Tunisie"],
  },
  {
    id: "math-sciences",
    subject: "Mathématiques",
    title: "Mathématiques - section sciences",
    summary: "Calcul, fonctions, géométrie et raisonnement pour résoudre des problèmes scientifiques.",
    keywords: ["mathématiques", "fonction", "équation", "inéquation", "géométrie", "vecteur", "trigonométrie", "statistiques"],
    parts: [
      { label: "Partie 1", file: "09_mathematiques_sciences_partie_1_222231P00.pdf" },
      { label: "Partie 2", file: "10_mathematiques_sciences_partie_2_222232P00.pdf" },
    ],
    chapters: [
      { title: "Calcul algébrique", summary: "Développer, factoriser et transformer une expression.", officialExerciseCount: 28 },
      { title: "Fonctions", summary: "Lire une courbe, calculer une image et résoudre graphiquement.", officialExerciseCount: 36 },
      { title: "Géométrie", summary: "Utiliser propriétés, vecteurs et figures pour démontrer.", officialExerciseCount: 40 },
      { title: "Problèmes", summary: "Traduire une situation en équation puis interpréter le résultat.", officialExerciseCount: 24 },
    ],
    courseId: "math-functions",
    videoQueries: ["fonctions 2ème sciences Tunisie", "math 2ème sciences Tunisie fonctions"],
  },
  {
    id: "physique",
    subject: "Physique",
    title: "Physique - section sciences",
    summary: "Étude de phénomènes physiques par l'observation, les mesures, les lois et les calculs.",
    keywords: ["physique", "force", "mouvement", "énergie", "électricité", "mesure", "unité", "graphique"],
    parts: [{ label: "PDF", file: "11_physique_sciences_223231P00.pdf" }],
    chapters: [
      { title: "Mesures", summary: "Choisir les unités, lire une grandeur et vérifier la cohérence.", officialExerciseCount: 18 },
      { title: "Mouvement", summary: "Décrire une trajectoire, une vitesse et l'effet d'une force.", officialExerciseCount: 22 },
      { title: "Électricité", summary: "Relier tension, intensité, dipôles et sécurité du circuit.", officialExerciseCount: 26 },
    ],
    courseId: "physics-forces",
    videoQueries: ["physique 2ème sciences Tunisie force mouvement", "physique 2ème secondaire Tunisie"],
  },
  {
    id: "chimie",
    subject: "Chimie",
    title: "Chimie - section sciences",
    summary: "Structure de la matière, transformations chimiques, solutions et calculs de quantité.",
    keywords: ["chimie", "atome", "molécule", "ion", "réaction", "équation", "mole", "solution", "concentration"],
    parts: [{ label: "PDF", file: "12_chimie_sciences_224231P00.pdf" }],
    chapters: [
      { title: "Matière", summary: "Distinguer atomes, molécules, ions et corps chimiques.", officialExerciseCount: 20 },
      { title: "Réaction chimique", summary: "Écrire une équation et respecter la conservation des atomes.", officialExerciseCount: 24 },
      { title: "Solutions", summary: "Relier masse, volume, concentration et quantité de matière.", officialExerciseCount: 22 },
    ],
    courseId: "chem-reaction",
    videoQueries: ["chimie 2ème sciences Tunisie réaction chimique", "quantité de matière 2ème sciences Tunisie"],
  },
  {
    id: "svt",
    subject: "SVT",
    title: "Sciences de la Vie et de la Terre",
    summary: "Observation du vivant et de la Terre: documents scientifiques, cartes, ressources et raisonnement.",
    keywords: ["svt", "vie", "terre", "géologie", "carte", "stratigraphie", "ressources", "fossile", "biologie"],
    parts: [{ label: "PDF", file: "13_svt_sciences_225232P00.pdf" }],
    chapters: [
      { title: "Documents scientifiques", summary: "Lire un schéma, un tableau, une carte ou une coupe.", officialExerciseCount: 18 },
      { title: "Géologie", summary: "Comprendre les roches, les couches et les ressources géologiques.", officialExerciseCount: 20 },
      { title: "Raisonnement", summary: "Observer, comparer, expliquer et conclure avec des arguments.", officialExerciseCount: 16 },
    ],
    courseId: "svt-map",
    videoQueries: ["SVT 2ème sciences Tunisie carte géologique", "sciences de la vie et de la terre 2ème sciences Tunisie"],
  },
  {
    id: "technologie",
    subject: "Technologie",
    title: "Technologie - manuel d'activités",
    summary: "Activités autour des systèmes techniques, de la mécanique, de l'électricité et de l'analyse fonctionnelle.",
    keywords: ["technologie", "système", "mécanique", "électricité", "fonction", "schéma", "activité", "automatisme"],
    parts: [
      { label: "Partie 1", file: "14_technologie_activites_partie_1_228233P01.pdf" },
      { label: "Partie 2", file: "15_technologie_activites_partie_2_228233P02.pdf" },
      { label: "Partie 3", file: "16_technologie_activites_partie_3_228233P03.pdf" },
    ],
    chapters: [
      { title: "Analyse fonctionnelle", summary: "Identifier le besoin, la fonction globale et les fonctions techniques.", officialExerciseCount: 18 },
      { title: "Chaîne d'énergie", summary: "Repérer alimenter, distribuer, convertir et transmettre.", officialExerciseCount: 20 },
      { title: "Chaîne d'information", summary: "Repérer acquérir, traiter et communiquer l'information.", officialExerciseCount: 18 },
    ],
    courseId: "tech-system",
    videoQueries: ["technologie 2ème sciences Tunisie système technique", "analyse fonctionnelle technologie 2ème secondaire"],
  },
  {
    id: "geographie",
    subject: "Géographie",
    title: "Géographie - section sciences",
    summary: "Étude de l'espace, des cartes, des documents géographiques et des relations population-milieu.",
    keywords: ["géographie", "carte", "espace", "population", "milieu", "document", "croquis", "Tunisie"],
    parts: [{ label: "PDF", file: "03_geographie_sciences_206271P00.pdf" }],
    chapters: [
      { title: "Carte", summary: "Lire titre, légende, échelle et orientation.", officialExerciseCount: 14 },
      { title: "Documents", summary: "Comparer tableaux, graphiques, photos et cartes.", officialExerciseCount: 16 },
      { title: "Synthèse", summary: "Rédiger une réponse géographique structurée.", officialExerciseCount: 12 },
    ],
    videoQueries: ["géographie 2ème secondaire Tunisie", "géographie 2ème sciences Tunisie"],
  },
  {
    id: "histoire",
    subject: "Histoire",
    title: "Histoire - section sciences",
    summary: "Repères chronologiques, analyse de documents historiques et rédaction de réponses argumentées.",
    keywords: ["histoire", "chronologie", "document", "civilisation", "source", "événement", "analyse"],
    parts: [
      { label: "Partie 1", file: "04_histoire_sciences_partie_1_207271P01.pdf" },
      { label: "Partie 2", file: "05_histoire_sciences_partie_2_207271P02.pdf" },
    ],
    chapters: [
      { title: "Repères", summary: "Situer les événements dans le temps et l'espace.", officialExerciseCount: 16 },
      { title: "Documents", summary: "Identifier la source, l'idée principale et le contexte.", officialExerciseCount: 18 },
      { title: "Rédaction", summary: "Construire une réponse avec preuves et vocabulaire historique.", officialExerciseCount: 14 },
    ],
    videoQueries: ["histoire 2ème secondaire Tunisie", "histoire 2ème sciences Tunisie"],
  },
  {
    id: "education-civique",
    subject: "Éducation civique",
    title: "Éducation civique",
    summary: "Citoyenneté, droits, devoirs, vie collective et institutions.",
    keywords: ["éducation civique", "citoyen", "droit", "devoir", "constitution", "institution", "responsabilité"],
    parts: [{ label: "PDF", file: "06_education_civique_211203P00.pdf" }],
    chapters: [
      { title: "Citoyenneté", summary: "Comprendre droits, devoirs et participation.", officialExerciseCount: 12 },
      { title: "Vie publique", summary: "Identifier les règles et les institutions.", officialExerciseCount: 14 },
      { title: "Débat", summary: "Argumenter avec respect et exemples.", officialExerciseCount: 10 },
    ],
    videoQueries: ["éducation civique 2ème secondaire Tunisie"],
  },
  {
    id: "pensee-islamique",
    subject: "Pensée islamique",
    title: "Pensée islamique",
    summary: "Textes, valeurs, réflexion, vocabulaire et mise en relation avec la vie quotidienne.",
    keywords: ["pensée islamique", "islamique", "valeurs", "texte", "hadith", "coran", "morale"],
    parts: [{ label: "PDF", file: "07_pensee_islamique_211204P00.pdf" }],
    chapters: [
      { title: "Textes", summary: "Lire, comprendre et expliquer les idées principales.", officialExerciseCount: 14 },
      { title: "Valeurs", summary: "Relier les notions étudiées au comportement quotidien.", officialExerciseCount: 16 },
      { title: "Synthèse", summary: "Répondre avec vocabulaire précis et exemples.", officialExerciseCount: 12 },
    ],
    videoQueries: ["تفكير اسلامي ثانية ثانوي تونس"],
  },
];

const officialManualExercises = [
  {
    bookId: "math-sciences",
    chapter: "Calcul algebrique",
    partIndex: 0,
    page: 33,
    source: "Exercices et problemes - appliquer",
    title: "Equations et produits nuls",
    reference: "Travaille les equations de la page, surtout celles qui se ramènent a un produit nul ou a une forme factorisee.",
    difficulty: "easy",
    correction:
      "Mets chaque equation sous la forme A x B = 0. Utilise la regle du produit nul, resous chaque facteur, puis remplace les valeurs trouvees dans l'equation de depart pour verifier.",
    keywords: ["equation", "produit nul", "factorisation"],
  },
  {
    bookId: "math-sciences",
    chapter: "Calcul algebrique",
    partIndex: 0,
    page: 52,
    source: "Exercices et problemes - reduire et ordonner",
    title: "Calcul litteral",
    reference: "Choisis un exercice de reduction ou d'ordonnancement des polynomes sur la page du manuel.",
    difficulty: "medium",
    correction:
      "Regroupe les termes de meme degre, additionne leurs coefficients, puis ecris le polynome dans l'ordre demande. Controle le signe de chaque terme avant de simplifier.",
    keywords: ["polynome", "reduire", "ordonner"],
  },
  {
    bookId: "math-sciences",
    chapter: "Calcul algebrique",
    partIndex: 0,
    page: 53,
    source: "Exercices et problemes - factorisation",
    title: "Factoriser puis resoudre",
    reference: "Prends l'exercice de factorisation du manuel et transforme d'abord l'expression avant toute resolution.",
    difficulty: "hard",
    correction:
      "Cherche un facteur commun ou une identite remarquable. Une fois la factorisation obtenue, pose chaque facteur egal a zero. La derniere ligne doit contenir l'ensemble des solutions.",
    keywords: ["factorisation", "identite remarquable", "solutions"],
  },
  {
    bookId: "math-sciences",
    chapter: "Fonctions",
    partIndex: 1,
    page: 45,
    source: "Exercices et problemes - ensemble de definition",
    title: "Domaine de definition",
    reference: "Utilise les fonctions proposees dans le manuel et determine pour quelles valeurs elles sont definies.",
    difficulty: "easy",
    correction:
      "Repere les interdits: denominateur nul, racine carree d'un nombre negatif ou expression impossible. Ecris les conditions, resous-les, puis donne l'ensemble de definition.",
    keywords: ["fonction", "domaine", "definition"],
  },
  {
    bookId: "math-sciences",
    chapter: "Fonctions",
    partIndex: 1,
    page: 69,
    source: "Exercices et problemes - parabole",
    title: "Lecture graphique d'une parabole",
    reference: "Ouvre la page et lis graphiquement les inegalites liees a la parabole.",
    statement: "On donne la fonction f(x) = x² − 4, représentée par la parabole ci-dessous. 1) Calcule f(0) et f(2). 2) Résous graphiquement puis par le calcul f(x) = 0.",
    questions: ["Calcule f(0) et f(2).", "Résous graphiquement f(x) = 0.", "Résous ensuite f(x) = 0 par le calcul et compare les deux méthodes."],
    figure: "math-parabola",
    difficulty: "medium",
    correction:
      "Trace ou observe la courbe, puis compare sa position avec la droite horizontale demandee. Les solutions sont les abscisses des points ou la courbe est au-dessus, au-dessous ou sur la droite.",
    steps: [
      "1) f(0) = 0² − 4 = −4 ; f(2) = 2² − 4 = 0.",
      "2) Graphiquement, f(x) = 0 aux points où la parabole coupe l'axe des abscisses.",
      "Par le calcul : x² − 4 = 0 ⇒ x² = 4 ⇒ x = 2 ou x = −2.",
      "Les deux méthodes donnent les mêmes solutions : x = −2 et x = 2.",
    ],
    keywords: ["parabole", "graphique", "inequation"],
  },
  {
    bookId: "math-sciences",
    chapter: "Fonctions",
    partIndex: 1,
    page: 70,
    source: "Exercices et problemes - courbe et droite",
    title: "Intersection de courbes",
    reference: "Travaille l'exercice ou une courbe et une droite sont comparees.",
    difficulty: "hard",
    correction:
      "Les intersections se trouvent en resolvant l'egalite des deux expressions. Pour une inegalite, garde les intervalles ou la courbe de la fonction est au-dessus ou au-dessous de la droite.",
    keywords: ["intersection", "courbe", "droite"],
  },
  {
    bookId: "math-sciences",
    chapter: "Geometrie",
    partIndex: 0,
    page: 90,
    source: "Exercices et problemes - vecteurs",
    title: "Relations vectorielles",
    reference: "Choisis un exercice de vecteurs et exprime les vecteurs demandes avec les donnees de la figure.",
    difficulty: "easy",
    correction:
      "Utilise la relation de Chasles et les proprietes de colinearite. Decompose chaque vecteur en passant par les points connus, puis simplifie les termes opposes.",
    keywords: ["vecteur", "Chasles", "colinearite"],
  },
  {
    bookId: "math-sciences",
    chapter: "Geometrie",
    partIndex: 0,
    page: 106,
    source: "Exercices et problemes - barycentre",
    title: "Construire un barycentre",
    reference: "Travaille les constructions de barycentres proposees dans le manuel.",
    difficulty: "medium",
    correction:
      "Additionne les coefficients, verifie qu'ils ne donnent pas zero, puis place le point sur la droite ou dans le triangle selon les masses. Justifie avec l'egalite vectorielle du barycentre.",
    keywords: ["barycentre", "construction", "coefficients"],
  },
  {
    bookId: "math-sciences",
    chapter: "Geometrie",
    partIndex: 1,
    page: 115,
    source: "Exercices et problemes - repere cartesien",
    title: "Geometrie analytique",
    reference: "Ouvre l'exercice avec des points dans un repere et demontre la nature du quadrilatere.",
    difficulty: "hard",
    correction:
      "Calcule les vecteurs ou les milieux des diagonales. Pour prouver un parallelogramme, montre que deux vecteurs opposes sont egaux ou que les diagonales ont le meme milieu.",
    keywords: ["repere", "coordonnees", "parallelogramme"],
  },
  {
    bookId: "math-sciences",
    chapter: "Problemes",
    partIndex: 0,
    page: 34,
    source: "Exercices et problemes - Thales",
    title: "Probleme geometrique avec Thales",
    reference: "Lis la situation de la page et exprime les longueurs en fonction de la variable.",
    difficulty: "medium",
    correction:
      "Identifie les triangles en configuration de Thales, ecris les rapports egaux, isole la longueur demandee, puis remplace dans la condition du probleme.",
    keywords: ["probleme", "Thales", "longueur"],
  },
  {
    bookId: "math-sciences",
    chapter: "Problemes",
    partIndex: 1,
    page: 196,
    source: "Exercices et problemes - statistiques",
    title: "Probleme de statistiques",
    reference: "Utilise le tableau statistique de la page et calcule les indicateurs demandes.",
    difficulty: "easy",
    correction:
      "Range les valeurs, calcule l'effectif total, puis determine mode, mediane et moyenne. Pour la moyenne, multiplie chaque valeur par son effectif avant de diviser par le total.",
    keywords: ["statistiques", "moyenne", "mediane"],
  },
  {
    bookId: "math-sciences",
    chapter: "Problemes",
    partIndex: 1,
    page: 197,
    source: "Exercices et problemes - interpretation",
    title: "Interpreter un tableau",
    reference: "Choisis un exercice avec donnees mensuelles et redige une conclusion chiffrée.",
    difficulty: "hard",
    correction:
      "Calcule l'indicateur demande, compare les valeurs extremes et termine par une phrase d'interpretation. Une reponse complete donne toujours l'unite et le sens du resultat.",
    keywords: ["tableau", "interpretation", "donnees"],
  },
  {
    bookId: "physique",
    chapter: "Mesures",
    partIndex: 0,
    page: 18,
    source: "Chapitre 1 - exercices",
    title: "Grandeurs et unites electriques",
    reference: "Complete les phrases du manuel sur puissance, energie et unites.",
    difficulty: "easy",
    correction:
      "Associe chaque grandeur a son unite SI: puissance en watt, energie en joule, tension en volt, intensite en ampere. Verifie ensuite que chaque symbole correspond a la bonne grandeur.",
    keywords: ["mesure", "unite", "puissance"],
  },
  {
    bookId: "physique",
    chapter: "Mesures",
    partIndex: 0,
    page: 33,
    source: "Chapitre 2 - conductibilite",
    title: "Mesurer une resistance",
    reference: "Utilise les exercices sur resistance, ohmmetre et conductibilite.",
    difficulty: "medium",
    correction:
      "La resistance se mesure en ohms avec un ohmmetre hors circuit. Pour comparer des conducteurs, garde les memes dimensions et relie la valeur mesuree a la nature du materiau.",
    keywords: ["resistance", "ohmmetre", "conductibilite"],
  },
  {
    bookId: "physique",
    chapter: "Mesures",
    partIndex: 0,
    page: 130,
    source: "Chapitre 8 - tensions",
    title: "Tension continue ou alternative",
    reference: "Reponds aux questions du manuel sur l'observation d'une tension au cours du temps.",
    difficulty: "hard",
    correction:
      "Une tension continue garde le meme signe et reste constante ou quasi constante. Une tension alternative change de signe periodiquement. Justifie avec la forme du graphe.",
    keywords: ["tension", "graphe", "oscilloscope"],
  },
  {
    bookId: "physique",
    chapter: "Mouvement",
    partIndex: 0,
    page: 146,
    source: "Chapitre 9 - interactions mecaniques",
    title: "Systemes et interactions",
    reference: "Travaille les exercices sur systeme et actions mecaniques.",
    difficulty: "easy",
    correction:
      "Isole le systeme et liste les objets qui agissent sur lui. Chaque interaction se represente par une force avec direction, sens, point d'application et valeur si elle est connue.",
    keywords: ["force", "interaction", "systeme"],
  },
  {
    bookId: "physique",
    chapter: "Mouvement",
    partIndex: 0,
    page: 196,
    source: "Chapitre 12 - mouvement du point materiel",
    title: "Decrire un mouvement",
    reference: "Ouvre la page des exercices et identifie trajectoire, vitesse et referentiel.",
    difficulty: "medium",
    correction:
      "Precise d'abord le referentiel. La trajectoire est la forme du chemin suivi; la vitesse moyenne se calcule par distance divisee par duree, avec une unite coherente.",
    keywords: ["mouvement", "vitesse", "referentiel"],
  },
  {
    bookId: "physique",
    chapter: "Mouvement",
    partIndex: 0,
    page: 242,
    source: "Chapitre 15 - energie cinetique",
    title: "Energie et mouvement",
    reference: "Choisis un exercice d'application sur l'energie cinetique.",
    difficulty: "hard",
    correction:
      "Convertis la masse en kilogrammes et la vitesse en metres par seconde. Applique Ec = 1/2 x m x v^2, puis interprete: si la vitesse double, l'energie cinetique est multipliee par quatre.",
    keywords: ["energie cinetique", "vitesse", "calcul"],
  },
  {
    bookId: "physique",
    chapter: "Electricite",
    partIndex: 0,
    page: 19,
    source: "Chapitre 1 - puissance electrique",
    title: "Lampe automobile",
    reference: "Resous l'exercice d'application sur la lampe 12 V du manuel.",
    difficulty: "easy",
    correction:
      "Utilise P = U x I, donc I = P / U. Remplace P par la puissance indiquee et U par 12 V. Termine avec l'unite ampere.",
    keywords: ["puissance", "intensite", "lampe"],
  },
  {
    bookId: "physique",
    chapter: "Electricite",
    partIndex: 0,
    page: 50,
    source: "Chapitre 3 - recepteurs passifs",
    title: "Loi d'Ohm et caracteristique",
    reference: "Travaille les exercices sur point de fonctionnement et conducteur ohmique.",
    difficulty: "medium",
    correction:
      "Pour un conducteur ohmique, U = R x I. Si la caracteristique est une droite passant par l'origine, le coefficient directeur donne la resistance.",
    keywords: ["Ohm", "resistance", "caracteristique"],
  },
  {
    bookId: "physique",
    chapter: "Electricite",
    partIndex: 0,
    page: 94,
    source: "Chapitre 6 - dipole generateur",
    title: "Generateur et puissance perdue",
    reference: "Reponds aux questions vrai/faux du manuel sur le generateur.",
    difficulty: "hard",
    correction:
      "Distingue la force electromotrice, la resistance interne et la tension aux bornes. La puissance utile est celle fournie au circuit externe; la perte par effet Joule depend de la resistance interne.",
    keywords: ["generateur", "fem", "puissance"],
  },
  {
    bookId: "chimie",
    chapter: "Matiere",
    partIndex: 0,
    page: 16,
    source: "Theme I - modele de l'atome",
    title: "Constituants de l'atome",
    reference: "Traite les QCM du manuel sur electron, proton, neutron et charge.",
    difficulty: "easy",
    correction:
      "Un atome neutre contient autant d'electrons que de protons. Le numero atomique Z donne le nombre de protons; le nombre de neutrons vaut A - Z.",
    keywords: ["atome", "proton", "electron"],
  },
  {
    bookId: "chimie",
    chapter: "Matiere",
    partIndex: 0,
    page: 31,
    source: "Theme I - element chimique",
    title: "Caracteriser un element",
    reference: "Reponds aux questions de cours sur symbole, isotopes et element chimique.",
    difficulty: "medium",
    correction:
      "Un element chimique est defini par son numero atomique Z. Des isotopes ont le meme Z mais des nombres de nucleons differents. Le symbole doit respecter la notation du manuel.",
    keywords: ["element", "isotope", "symbole"],
  },
  {
    bookId: "chimie",
    chapter: "Matiere",
    partIndex: 0,
    page: 41,
    source: "Theme I - repartition des electrons",
    title: "Structure electronique",
    reference: "Complete les exercices sur les couches K, L et M.",
    difficulty: "hard",
    correction:
      "Remplis les couches dans l'ordre K puis L puis M, en respectant les capacites vues en cours. Pour un ion, ajoute ou retire les electrons selon la charge avant d'ecrire la structure.",
    keywords: ["electron", "couche", "ion"],
  },
  {
    bookId: "chimie",
    chapter: "Reaction chimique",
    partIndex: 0,
    page: 59,
    source: "Theme I - liaisons et composes",
    title: "Liaison et formule",
    reference: "Utilise les exercices pour passer des ions ou atomes a une formule de compose.",
    difficulty: "easy",
    correction:
      "Le compose final doit etre electriquement neutre. Equilibre les charges positives et negatives, puis reduis les indices si necessaire.",
    keywords: ["ion", "formule", "liaison"],
  },
  {
    bookId: "chimie",
    chapter: "Reaction chimique",
    partIndex: 0,
    page: 171,
    source: "Theme II - reaction acide base",
    title: "Equation acido-basique",
    reference: "Travaille les exercices sur la reaction entre acide et base.",
    difficulty: "medium",
    correction:
      "Identifie les ions H3O+ et OH-. A l'equivalence, les quantites de matiere qui reagissent sont dans les proportions de l'equation. Ecris le bilan avant de calculer.",
    keywords: ["acide", "base", "equivalence"],
  },
  {
    bookId: "chimie",
    chapter: "Reaction chimique",
    partIndex: 0,
    page: 188,
    source: "Theme III - hydrocarbures",
    title: "Reaction organique",
    reference: "Ouvre les exercices sur hydrocarbures et reactions de substitution ou addition.",
    difficulty: "hard",
    correction:
      "Determine d'abord la famille du compose et sa formule brute. En substitution, un atome d'hydrogene est remplace; en addition, la liaison multiple s'ouvre pour fixer de nouveaux atomes.",
    keywords: ["hydrocarbure", "substitution", "addition"],
  },
  {
    bookId: "chimie",
    chapter: "Solutions",
    partIndex: 0,
    page: 79,
    source: "Theme II - concentration molaire",
    title: "Calculer une concentration",
    reference: "Choisis un exercice de concentration molaire dans le manuel.",
    difficulty: "easy",
    correction:
      "Calcule n = m / M si la masse est donnee, puis C = n / V. Convertis le volume en litre avant de diviser et ecris l'unite mol.L-1.",
    keywords: ["concentration", "mole", "volume"],
  },
  {
    bookId: "chimie",
    chapter: "Solutions",
    partIndex: 0,
    page: 92,
    source: "Theme II - solubilite",
    title: "Solution saturee",
    reference: "Travaille les questions sur solubilite et saturation.",
    difficulty: "medium",
    correction:
      "Compare la concentration de la solution a la solubilite. Si C est inferieure a la solubilite, la solution n'est pas saturee; si elle l'atteint, elle est saturee.",
    keywords: ["solubilite", "saturation", "solution"],
  },
  {
    bookId: "chimie",
    chapter: "Solutions",
    partIndex: 0,
    page: 106,
    source: "Theme II - identification des ions",
    title: "Identifier des ions en solution",
    reference: "Utilise les exercices avec precipites et tests chimiques.",
    difficulty: "hard",
    correction:
      "Associe chaque reactif au precipite observe. Note la couleur, ecris l'ion identifie, puis justifie avec le test caracteristique au lieu de conclure seulement par intuition.",
    keywords: ["ion", "precipite", "test"],
  },
  {
    bookId: "svt",
    chapter: "Documents scientifiques",
    partIndex: 0,
    page: 15,
    source: "Carte topographique - restituer ses connaissances",
    title: "Lire une carte topographique",
    reference: "Reponds aux QCM du manuel sur carte, relief, altitude et echelle.",
    difficulty: "easy",
    correction:
      "Commence par le titre, l'echelle et la legende. Une carte topographique represente le relief; les courbes de niveau relient les points de meme altitude.",
    keywords: ["carte", "relief", "echelle"],
  },
  {
    bookId: "svt",
    chapter: "Documents scientifiques",
    partIndex: 0,
    page: 16,
    source: "Exercice corrige - echelle",
    title: "Calcul d'echelle",
    reference: "Observe l'exercice corrige du manuel puis refais le calcul sans regarder la solution.",
    difficulty: "medium",
    correction:
      "Mets les deux distances dans la meme unite. L'echelle vaut distance sur la carte divisee par distance reelle. Simplifie le rapport sous la forme 1 / n.",
    keywords: ["echelle", "distance", "carte"],
  },
  {
    bookId: "svt",
    chapter: "Documents scientifiques",
    partIndex: 0,
    page: 30,
    source: "Exercice corrige - deformation tectonique",
    title: "Identifier des structures",
    reference: "Analyse le document geologique corrige et identifie les deformations.",
    difficulty: "hard",
    correction:
      "Observe la forme des couches. Des couches courbees indiquent un pli; une cassure avec deplacement indique une faille. La justification doit citer un indice visible du document.",
    keywords: ["document", "pli", "faille"],
  },
  {
    bookId: "svt",
    chapter: "Geologie",
    partIndex: 0,
    page: 49,
    source: "Ressources en eau - exercices",
    title: "Nappes et eaux souterraines",
    reference: "Travaille les exercices sur nappes phreatiques et roches aquiferes.",
    difficulty: "easy",
    correction:
      "Une nappe se trouve dans une roche permeable et aquifere. Pour expliquer un puits, repere la couche permeable, la couche impermeable et le niveau de l'eau.",
    keywords: ["nappe", "aquifere", "eau"],
  },
  {
    bookId: "svt",
    chapter: "Geologie",
    partIndex: 0,
    page: 65,
    source: "Phosphates - restituer ses connaissances",
    title: "Roche sedimentaire utile",
    reference: "Reponds aux questions sur les phosphates et leur interet economique.",
    difficulty: "medium",
    correction:
      "Relie la roche a son origine sedimentaire, a sa zone d'exploitation et a son usage. Une bonne conclusion distingue observation geologique et interet economique.",
    keywords: ["phosphate", "roche", "ressource"],
  },
  {
    bookId: "svt",
    chapter: "Geologie",
    partIndex: 0,
    page: 78,
    source: "Petrole - exercice corrige",
    title: "Roche reservoir et migration",
    reference: "Refais l'exercice corrige sur le petrole en cachant la correction.",
    difficulty: "hard",
    correction:
      "Le petrole s'accumule dans une roche reservoir permeable et poreuse. Il est bloque par une roche couverture impermeable. La reponse doit suivre le trajet de migration.",
    keywords: ["petrole", "reservoir", "migration"],
  },
  {
    bookId: "svt",
    chapter: "Raisonnement",
    partIndex: 0,
    page: 150,
    source: "Relations trophiques - exercices corriges",
    title: "Chaînes alimentaires",
    reference: "Analyse les documents d'ecosysteme et construis les relations trophiques.",
    difficulty: "easy",
    correction:
      "Place d'abord les producteurs, puis les consommateurs. Une fleche alimentaire va de l'etre mange vers celui qui le mange. Termine par une phrase sur le transfert de matiere.",
    keywords: ["chaine alimentaire", "ecosysteme", "producteur"],
  },
  {
    bookId: "svt",
    chapter: "Raisonnement",
    partIndex: 0,
    page: 153,
    source: "Ecosysteme - exercices",
    title: "Producteurs et consommateurs",
    reference: "Lis l'exercice sur les habitants d'un ecosysteme et classe les organismes.",
    difficulty: "medium",
    correction:
      "Classe chaque organisme selon son role: producteur, consommateur ou decomposeur. Justifie par son mode de nutrition et relie les roles dans une chaine alimentaire simple.",
    keywords: ["producteur", "consommateur", "decomposeur"],
  },
  {
    bookId: "svt",
    chapter: "Raisonnement",
    partIndex: 0,
    page: 212,
    source: "Mitose - exercices corriges",
    title: "Etapes de la division cellulaire",
    reference: "Observe les schemas de cellules en division et classe les etapes.",
    difficulty: "hard",
    correction:
      "Repere l'etat des chromosomes: alignement au centre, separation des chromatides, puis formation de deux cellules filles. L'ordre doit etre justifie par les indices visibles.",
    keywords: ["mitose", "chromosome", "cellule"],
  },
  {
    bookId: "technologie",
    chapter: "Analyse fonctionnelle",
    partIndex: 0,
    page: 12,
    source: "Manuel d'activites - partie 1",
    title: "Besoin et fonction globale",
    reference: "Ouvre une activite d'analyse fonctionnelle et identifie le besoin du systeme.",
    difficulty: "easy",
    correction:
      "Formule le besoin avec un verbe d'action, puis ecris la fonction globale sous la forme agir sur une matiere d'oeuvre pour obtenir un resultat mesurable.",
    keywords: ["besoin", "fonction", "systeme"],
  },
  {
    bookId: "technologie",
    chapter: "Analyse fonctionnelle",
    partIndex: 0,
    page: 28,
    source: "Manuel d'activites - partie 1",
    title: "Fonctions techniques",
    reference: "Choisis l'activite de decomposition fonctionnelle et complete les blocs.",
    difficulty: "medium",
    correction:
      "Pars de la fonction globale, puis separe les fonctions techniques necessaires. Chaque bloc doit avoir un role clair et un lien logique avec le bloc suivant.",
    keywords: ["fonction technique", "bloc", "analyse"],
  },
  {
    bookId: "technologie",
    chapter: "Analyse fonctionnelle",
    partIndex: 0,
    page: 42,
    source: "Manuel d'activites - partie 1",
    title: "Criteres et contraintes",
    reference: "Travaille l'activite ou les contraintes du systeme doivent etre justifiees.",
    difficulty: "hard",
    correction:
      "Associe chaque contrainte a un critere observable: securite, cout, energie, ergonomie ou environnement. Termine par une justification courte pour chaque choix.",
    keywords: ["contrainte", "critere", "justification"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'energie",
    partIndex: 1,
    page: 10,
    source: "Manuel d'activites - partie 2",
    title: "Identifier la chaine d'energie",
    reference: "Repere dans l'activite les composants qui alimentent, distribuent, convertissent et transmettent.",
    difficulty: "easy",
    correction:
      "Classe les composants selon leur fonction: alimenter, distribuer, convertir, transmettre. Un moteur convertit l'energie; un mecanisme transmet le mouvement.",
    keywords: ["energie", "convertir", "transmettre"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'energie",
    partIndex: 1,
    page: 28,
    source: "Manuel d'activites - partie 2",
    title: "Schéma d'energie",
    reference: "Complete le schema de circulation de l'energie dans le systeme.",
    difficulty: "medium",
    correction:
      "Dessine les blocs dans l'ordre d'action et oriente les fleches du fournisseur d'energie vers l'effecteur. Les pertes ou transformations doivent etre notees si elles sont utiles.",
    keywords: ["schema", "energie", "bloc"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'energie",
    partIndex: 1,
    page: 52,
    source: "Manuel d'activites - partie 2",
    title: "Diagnostic d'une panne",
    reference: "Utilise l'activite pour localiser une panne dans la chaine d'energie.",
    difficulty: "hard",
    correction:
      "Teste la chaine dans l'ordre: source, protection, distribution, conversion, transmission. La panne se situe au premier bloc ou la grandeur attendue n'est plus presente.",
    keywords: ["panne", "diagnostic", "energie"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'information",
    partIndex: 2,
    page: 10,
    source: "Manuel d'activites - partie 3",
    title: "Acquerir une information",
    reference: "Repere les capteurs ou organes d'entree dans l'activite du manuel.",
    difficulty: "easy",
    correction:
      "Un capteur acquiert une information depuis l'environnement. Note la grandeur detectee, le signal produit et le bloc qui recoit ce signal.",
    keywords: ["capteur", "information", "signal"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'information",
    partIndex: 2,
    page: 30,
    source: "Manuel d'activites - partie 3",
    title: "Traiter et communiquer",
    reference: "Complete la chaine d'information avec les fonctions traiter et communiquer.",
    difficulty: "medium",
    correction:
      "Apres l'acquisition, le systeme traite l'information selon une regle ou un programme, puis communique l'ordre ou le message vers l'utilisateur ou la chaine d'energie.",
    keywords: ["traiter", "communiquer", "ordre"],
  },
  {
    bookId: "technologie",
    chapter: "Chaine d'information",
    partIndex: 2,
    page: 54,
    source: "Manuel d'activites - partie 3",
    title: "Relier information et energie",
    reference: "Travaille l'activite ou un ordre commande une action du systeme.",
    difficulty: "hard",
    correction:
      "Montre le passage du signal d'information vers la commande d'energie. Une reponse complete nomme le capteur, l'unite de traitement, le preactionneur et l'actionneur.",
    keywords: ["commande", "preactionneur", "actionneur"],
  },
  {
    bookId: "francais",
    chapter: "Lire",
    partIndex: 0,
    page: 23,
    source: "Module 1 - vocabulaire et sens",
    title: "Comprendre un extrait",
    reference: "Lis l'extrait et reponds aux questions de comprehension de la page.",
    difficulty: "easy",
    correction:
      "Commence par identifier qui parle, de qui on parle et ce qui se passe. Les reponses doivent citer un indice du texte puis reformuler l'idee avec tes mots.",
    keywords: ["lecture", "comprehension", "indice"],
  },
  {
    bookId: "francais",
    chapter: "Lire",
    partIndex: 0,
    page: 37,
    source: "Application - comparaison",
    title: "Comparer et expliquer",
    reference: "Traite l'application sur la comparaison et son effet dans le texte.",
    difficulty: "medium",
    correction:
      "Releve d'abord les deux elements compares et l'outil de comparaison. Explique ensuite ce que la comparaison ajoute au sens ou a l'image du passage.",
    keywords: ["comparaison", "texte", "effet"],
  },
  {
    bookId: "francais",
    chapter: "Résumer",
    partIndex: 0,
    page: 16,
    source: "Situation de production",
    title: "Reformuler l'essentiel",
    reference: "Utilise les consignes de la page pour transformer les phrases sans perdre le sens.",
    difficulty: "medium",
    correction:
      "Supprime les details secondaires, garde le rapport logique et reformule avec des mots personnels. La phrase obtenue doit rester fidele au sens de depart.",
    keywords: ["resume", "reformulation", "sens"],
  },
  {
    bookId: "francais",
    chapter: "Écrire",
    partIndex: 0,
    page: 18,
    source: "Production de l'ecrit",
    title: "Organiser un paragraphe",
    reference: "Travaille la production ecrite de la page en organisant les idees avant de rediger.",
    difficulty: "hard",
    correction:
      "Prepare un plan court: idee principale, deux arguments ou exemples, phrase finale. Verifie les connecteurs, les temps verbaux et la ponctuation.",
    keywords: ["production ecrite", "paragraphe", "connecteurs"],
  },
  {
    bookId: "anglais",
    chapter: "Reading",
    partIndex: 0,
    page: 34,
    source: "Reading activity",
    title: "Read and choose a title",
    reference: "Use the official reading task and justify the selected title.",
    difficulty: "easy",
    correction:
      "Find the main idea first, then eliminate titles that are too narrow or too general. Justify your answer with one detail from the text.",
    keywords: ["reading", "main idea", "title"],
  },
  {
    bookId: "anglais",
    chapter: "Language",
    partIndex: 0,
    page: 15,
    source: "Review session",
    title: "Vocabulary review",
    reference: "Work on the vocabulary items from the review page.",
    difficulty: "medium",
    correction:
      "Group the words by meaning, then write one correct sentence for each selected word. The sentence must show the meaning, not only repeat the word.",
    keywords: ["vocabulary", "sentence", "review"],
  },
  {
    bookId: "anglais",
    chapter: "Writing",
    partIndex: 0,
    page: 61,
    source: "Group questions",
    title: "Short opinion paragraph",
    reference: "Use the discussion questions as a base for a short written answer.",
    difficulty: "hard",
    correction:
      "Write a topic sentence, give two reasons, add an example and finish with a clear conclusion. Check subject-verb agreement and connectors.",
    keywords: ["writing", "opinion", "paragraph"],
  },
];

const interactiveCourses = [
  {
    id: "math-functions",
    subject: "Mathématiques",
    title: "Fonctions et lecture graphique",
    goal: "Lire une courbe, calculer une image et résoudre une équation simple.",
    keywords: ["fonction", "image", "antécédent", "graphique", "équation"],
    steps: [
      "Une fonction associe à chaque valeur de x une valeur f(x).",
      "L'image de a est la valeur f(a). Graphiquement, on lit l'ordonnée du point de la courbe d'abscisse a.",
      "Résoudre f(x) = k revient à chercher les abscisses des points de la courbe qui ont pour ordonnée k.",
    ],
    exercises: [
      {
        id: "math-fx",
        question: "Si f(x) = 2x + 3, quelle est l'image de 4 ?",
        choices: ["8", "11", "14"],
        answer: 1,
        correction: "f(4) = 2 × 4 + 3 = 11.",
      },
      {
        id: "math-eq",
        question: "Pour f(x) = 3x - 6, quelle valeur de x vérifie f(x) = 0 ?",
        choices: ["-2", "0", "2"],
        answer: 2,
        correction: "3x - 6 = 0, donc 3x = 6 et x = 2.",
      },
    ],
    videoQueries: ["fonctions 2ème sciences Tunisie", "lecture graphique fonction 2ème secondaire"],
  },
  {
    id: "physics-forces",
    subject: "Physique",
    title: "Forces et mouvement",
    goal: "Relier force, mouvement, vitesse et représentation vectorielle.",
    keywords: ["force", "mouvement", "vitesse", "trajectoire", "vecteur"],
    steps: [
      "Une force modélise une action mécanique exercée sur un objet.",
      "Elle se représente par un vecteur: point d'application, direction, sens et valeur.",
      "Une force peut modifier le mouvement, la vitesse ou la forme d'un objet.",
    ],
    exercises: [
      {
        id: "phys-vector",
        question: "Quelle information n'appartient pas à la représentation d'une force ?",
        choices: ["Le sens", "La couleur du cahier", "La valeur"],
        answer: 1,
        correction: "Une force se décrit par point d'application, direction, sens et valeur. La couleur du cahier n'intervient pas.",
      },
      {
        id: "phys-speed",
        question: "Si un objet parcourt 20 m en 4 s, quelle est sa vitesse moyenne ?",
        choices: ["5 m/s", "16 m/s", "80 m/s"],
        answer: 0,
        correction: "v = distance / durée = 20 / 4 = 5 m/s.",
      },
    ],
    videoQueries: ["forces mouvement 2ème sciences Tunisie", "physique force vecteur 2ème secondaire"],
  },
  {
    id: "chem-reaction",
    subject: "Chimie",
    title: "Réaction chimique et conservation",
    goal: "Lire une équation chimique et respecter la conservation des atomes.",
    keywords: ["réaction", "équation", "atome", "réactif", "produit", "conservation"],
    steps: [
      "Les réactifs sont consommés pendant la transformation chimique.",
      "Les produits apparaissent après la transformation.",
      "Dans une équation équilibrée, chaque élément a le même nombre d'atomes avant et après.",
    ],
    exercises: [
      {
        id: "chem-role",
        question: "Dans une équation chimique, les espèces à gauche de la flèche sont les...",
        choices: ["produits", "réactifs", "solvants"],
        answer: 1,
        correction: "Les réactifs sont placés à gauche; les produits sont à droite.",
      },
      {
        id: "chem-balance",
        question: "Pourquoi équilibre-t-on une équation chimique ?",
        choices: ["Pour conserver les atomes", "Pour changer la couleur", "Pour supprimer les produits"],
        answer: 0,
        correction: "On équilibre l'équation pour respecter la conservation des atomes.",
      },
    ],
    videoQueries: ["équation chimique 2ème sciences Tunisie", "réaction chimique 2ème secondaire Tunisie"],
  },
  {
    id: "svt-map",
    subject: "SVT",
    title: "Lire une carte géologique",
    goal: "Identifier les informations utiles d'une carte et rédiger une conclusion.",
    keywords: ["svt", "carte", "géologie", "roche", "légende", "strate"],
    steps: [
      "On commence par lire le titre, l'échelle et la légende.",
      "Chaque couleur ou symbole correspond à une formation ou à une information.",
      "La conclusion doit relier observation et explication scientifique.",
    ],
    exercises: [
      {
        id: "svt-legend",
        question: "Quel élément donne le sens des couleurs sur une carte géologique ?",
        choices: ["La légende", "La marge", "Le numéro de page"],
        answer: 0,
        correction: "La légende explique les couleurs, symboles et types de roches.",
      },
      {
        id: "svt-scale",
        question: "L'échelle d'une carte sert à...",
        choices: ["mesurer les distances réelles", "choisir la couleur", "écrire le titre"],
        answer: 0,
        correction: "L'échelle permet de passer d'une distance sur la carte à une distance réelle.",
      },
    ],
    videoQueries: ["carte géologique 2ème sciences Tunisie", "SVT géologie 2ème sciences Tunisie"],
  },
  {
    id: "tech-system",
    subject: "Technologie",
    title: "Chaîne fonctionnelle d'un système",
    goal: "Repérer les fonctions d'un système technique et distinguer énergie et information.",
    keywords: ["technologie", "système", "fonction", "énergie", "information", "capteur"],
    steps: [
      "Un système technique répond à un besoin par une fonction globale.",
      "La chaîne d'énergie regroupe alimenter, distribuer, convertir et transmettre.",
      "La chaîne d'information regroupe acquérir, traiter et communiquer.",
    ],
    exercises: [
      {
        id: "tech-energy",
        question: "Dans la chaîne d'énergie, un moteur sert surtout à...",
        choices: ["convertir l'énergie", "écrire un message", "mesurer la température"],
        answer: 0,
        correction: "Le moteur transforme l'énergie électrique en énergie mécanique.",
      },
      {
        id: "tech-info",
        question: "Un capteur appartient plutôt à la fonction...",
        choices: ["acquérir", "transmettre l'énergie", "stocker un livre"],
        answer: 0,
        correction: "Un capteur acquiert une information depuis l'environnement.",
      },
    ],
    videoQueries: ["chaîne fonctionnelle technologie 2ème secondaire Tunisie", "technologie système technique 2ème sciences"],
  },
  {
    id: "fr-summary",
    subject: "Français",
    title: "Résumé de texte",
    goal: "Garder les idées essentielles avec une formulation personnelle.",
    keywords: ["français", "résumé", "idée principale", "connecteur", "reformulation"],
    steps: [
      "Lire le texte une première fois pour comprendre le thème.",
      "Souligner les idées essentielles et supprimer les exemples secondaires.",
      "Reformuler avec ses propres mots en respectant l'ordre logique.",
    ],
    exercises: [
      {
        id: "fr-main",
        question: "Dans un résumé, on garde surtout...",
        choices: ["les idées essentielles", "tous les exemples", "les répétitions"],
        answer: 0,
        correction: "Un résumé conserve les idées essentielles et supprime les détails secondaires.",
      },
      {
        id: "fr-words",
        question: "La reformulation consiste à...",
        choices: ["copier le texte", "dire la même idée avec d'autres mots", "ajouter une histoire"],
        answer: 1,
        correction: "Reformuler, c'est exprimer la même idée autrement, sans changer le sens.",
      },
    ],
    videoQueries: ["résumé de texte 2ème secondaire Tunisie", "français résumé méthode lycée Tunisie"],
  },
];

// Contenu pédagogique enrichi par chapitre : l'essentiel à retenir, les notions
// clés (définitions) et des exercices réellement corrigés, classés par difficulté.
// Les clés correspondent aux "id" de officialBooks ; l'ordre suit celui des chapitres.
const chapterContent = {
  "math-sciences": [
    {
      objective: "Développer, factoriser et transformer une expression sans erreur de signe.",
      essentials: [
        "Développer, c'est transformer un produit en somme : k(a + b) = ka + kb.",
        "Identités remarquables : (a + b)² = a² + 2ab + b² ; (a − b)² = a² − 2ab + b² ; (a + b)(a − b) = a² − b².",
        "Factoriser, c'est écrire une somme sous forme de produit (facteur commun ou identité remarquable).",
        "Une fraction n'a de sens que si son dénominateur est différent de 0.",
      ],
      keyTerms: [
        { term: "Développer", definition: "Écrire une expression sous forme de somme de termes." },
        { term: "Factoriser", definition: "Écrire une expression sous forme de produit de facteurs." },
        { term: "Identité remarquable", definition: "Égalité toujours vraie qui accélère développement et factorisation." },
      ],
      exercises: [
        { title: "Facteur commun", difficulty: "easy", prompt: "Factorise L = 7x + 7.", correction: "L = 7(x + 1)." },
        { title: "Développer et réduire", difficulty: "easy", prompt: "Développe et réduis A = 3(2x − 5) + 4x.", correction: "A = 6x − 15 + 4x = 10x − 15." },
        { title: "Carré d'une somme", difficulty: "easy", prompt: "Développe B = (x + 4)² avec une identité remarquable.", correction: "B = x² + 2 × x × 4 + 4² = x² + 8x + 16." },
        { title: "Produit de deux binômes", difficulty: "medium", prompt: "Développe et réduis G = (x + 2)(x − 3).", correction: "G = x² − 3x + 2x − 6 = x² − x − 6." },
        { title: "Différence de deux carrés", difficulty: "medium", prompt: "Factorise C = 9x² − 25.", correction: "C = (3x)² − 5² = (3x − 5)(3x + 5)." },
        { title: "Carré parfait", difficulty: "medium", prompt: "Factorise D = 4x² + 12x + 9.", correction: "D = (2x)² + 2 × (2x) × 3 + 3² = (2x + 3)²." },
        { title: "Facteur commun caché", difficulty: "hard", prompt: "Factorise K = 2x(x − 1) − 3(x − 1).", correction: "Facteur commun (x − 1) : K = (x − 1)(2x − 3)." },
        { title: "Factorisation guidée", difficulty: "hard", prompt: "Factorise E = (x − 1)² − (2x + 3)².", correction: "Différence de carrés : E = [(x − 1) − (2x + 3)] × [(x − 1) + (2x + 3)] = (−x − 4)(3x + 2)." },
      ],
    },
    {
      objective: "Lire une courbe, calculer une image et résoudre graphiquement une équation.",
      essentials: [
        "Une fonction f associe à chaque nombre x un unique nombre noté f(x).",
        "f(a) est l'image de a ; si f(a) = b, alors a est un antécédent de b.",
        "Graphiquement, l'image de a se lit sur l'axe des ordonnées, à la verticale de a.",
        "Résoudre f(x) = k, c'est chercher les abscisses des points de la courbe d'ordonnée k.",
      ],
      keyTerms: [
        { term: "Image", definition: "Valeur f(a) obtenue à partir de a par la fonction f." },
        { term: "Antécédent", definition: "Nombre a dont l'image par f est une valeur donnée." },
        { term: "Courbe représentative", definition: "Ensemble des points de coordonnées (x ; f(x))." },
      ],
      exercises: [
        { title: "Calculer une image", difficulty: "easy", prompt: "Soit f(x) = 2x − 1. Calcule f(3).", correction: "f(3) = 2 × 3 − 1 = 5.", figure: "math-affine", steps: ["Je remplace x par 3 dans l'expression : f(3) = 2 × 3 − 1.", "Je calcule le produit : 2 × 3 = 6.", "Je termine : 6 − 1 = 5. Donc f(3) = 5."] },
        { title: "Image d'un négatif", difficulty: "easy", prompt: "Soit f(x) = x² + 1. Calcule l'image de −2.", correction: "f(−2) = (−2)² + 1 = 4 + 1 = 5." },
        { title: "Fonction affine", difficulty: "easy", prompt: "Soit f(x) = −3x + 2. Calcule f(0) et f(1).", correction: "f(0) = 2 ; f(1) = −3 + 2 = −1." },
        { title: "Chercher un antécédent", difficulty: "medium", prompt: "Soit f(x) = 3x + 6. Détermine l'antécédent de 0.", correction: "3x + 6 = 0 ⇒ 3x = −6 ⇒ x = −2." },
        { title: "Antécédent d'une valeur", difficulty: "medium", prompt: "Soit f(x) = 2x − 1. Détermine l'antécédent de 5.", correction: "2x − 1 = 5 ⇒ 2x = 6 ⇒ x = 3." },
        { title: "Résoudre f(x) = 0", difficulty: "medium", prompt: "Soit f(x) = x² − 4. Résous f(x) = 0.", correction: "x² − 4 = 0 ⇒ x² = 4 ⇒ x = 2 ou x = −2.", figure: "math-parabola", steps: ["Je pose l'équation : x² − 4 = 0.", "J'isole x² : x² = 4.", "Je prends les deux racines : x = 2 ou x = −2.", "Sur la courbe, ce sont les points où la parabole coupe l'axe des abscisses."] },
        { title: "Domaine de définition", difficulty: "hard", prompt: "Soit f(x) = (x − 1)/(x + 2). Donne le domaine de définition puis calcule f(0).", correction: "Défini si x + 2 ≠ 0, soit x ≠ −2. f(0) = (0 − 1)/(0 + 2) = −1/2." },
        { title: "Équation avec fraction", difficulty: "hard", prompt: "Résous f(x) = 0 pour f(x) = (2x − 6)/(x + 1).", correction: "Une fraction est nulle si son numérateur est nul (x ≠ −1) : 2x − 6 = 0 ⇒ x = 3." },
      ],
    },
    {
      objective: "Utiliser vecteurs, coordonnées et propriétés pour démontrer.",
      essentials: [
        "Deux vecteurs sont égaux s'ils ont même direction, même sens et même norme.",
        "Coordonnées du vecteur AB : (xB − xA ; yB − yA).",
        "Distance AB = √[(xB − xA)² + (yB − yA)²].",
        "Le milieu I de [AB] a pour coordonnées ((xA + xB)/2 ; (yA + yB)/2).",
      ],
      keyTerms: [
        { term: "Vecteur", definition: "Objet défini par une direction, un sens et une norme." },
        { term: "Colinéaires", definition: "Deux vecteurs de même direction : l'un est un multiple de l'autre." },
        { term: "Norme", definition: "Longueur d'un vecteur." },
      ],
      exercises: [
        { title: "Coordonnées d'un vecteur", difficulty: "easy", prompt: "A(1 ; 2) et B(4 ; 6). Calcule les coordonnées du vecteur AB.", correction: "AB(4 − 1 ; 6 − 2) = AB(3 ; 4).", figure: "math-vectors", steps: ["Formule : AB(xB − xA ; yB − yA).", "J'applique avec A(1 ; 2) et B(4 ; 6) : (4 − 1 ; 6 − 2).", "Résultat : AB(3 ; 4)."] },
        { title: "Distance entre deux points", difficulty: "easy", prompt: "Avec A(1 ; 2) et B(4 ; 6), calcule la distance AB.", correction: "AB = √(3² + 4²) = √25 = 5.", figure: "math-vectors", steps: ["Formule : AB = √[(xB − xA)² + (yB − yA)²].", "Écarts : 4 − 1 = 3 et 6 − 2 = 4.", "AB = √(3² + 4²) = √(9 + 16) = √25 = 5."] },
        { title: "Milieu d'un segment", difficulty: "easy", prompt: "A(−2 ; 1) et B(4 ; 5). Calcule les coordonnées du milieu I de [AB].", correction: "I((−2 + 4)/2 ; (1 + 5)/2) = I(1 ; 3)." },
        { title: "Somme de vecteurs", difficulty: "medium", prompt: "u(3 ; −1) et v(2 ; 4). Calcule les coordonnées de u + v.", correction: "u + v = (3 + 2 ; −1 + 4) = (5 ; 3)." },
        { title: "Norme d'un vecteur", difficulty: "medium", prompt: "Calcule la norme du vecteur w(6 ; 8).", correction: "‖w‖ = √(6² + 8²) = √100 = 10." },
        { title: "Tester la colinéarité", difficulty: "hard", prompt: "u(2 ; 3) et v(6 ; 9). Ces vecteurs sont-ils colinéaires ?", correction: "On calcule 2 × 9 − 3 × 6 = 18 − 18 = 0. Le déterminant est nul, donc u et v sont colinéaires." },
        { title: "Parallélogramme", difficulty: "hard", prompt: "A(0 ; 0), B(3 ; 1), C(5 ; 4). Trouve D pour que ABCD soit un parallélogramme.", correction: "ABCD parallélogramme ⇔ AB = DC. D = C − AB = (5 − 3 ; 4 − 1) = (2 ; 3)." },
      ],
    },
    {
      objective: "Traduire une situation en équation puis interpréter le résultat.",
      essentials: [
        "Mettre en équation : choisir l'inconnue, traduire l'énoncé, résoudre, vérifier.",
        "Équation produit : A × B = 0 équivaut à A = 0 ou B = 0.",
        "Toujours vérifier que la solution a un sens dans le contexte du problème.",
      ],
      keyTerms: [
        { term: "Inconnue", definition: "Nombre cherché, souvent noté x." },
        { term: "Mise en équation", definition: "Traduction d'un énoncé en une égalité mathématique." },
      ],
      exercises: [
        { title: "Nombre inconnu", difficulty: "easy", prompt: "La somme d'un nombre et de son double vaut 18. Trouve ce nombre.", correction: "x + 2x = 18 ⇒ 3x = 18 ⇒ x = 6." },
        { title: "Deux nombres consécutifs", difficulty: "easy", prompt: "La somme de deux entiers consécutifs vaut 27. Trouve-les.", correction: "x + (x + 1) = 27 ⇒ 2x + 1 = 27 ⇒ x = 13. Les nombres sont 13 et 14." },
        { title: "Équation du premier degré", difficulty: "easy", prompt: "Résous 5x − 3 = 2x + 9.", correction: "5x − 2x = 9 + 3 ⇒ 3x = 12 ⇒ x = 4." },
        { title: "Périmètre d'un rectangle", difficulty: "medium", prompt: "Un rectangle a un périmètre de 26 cm et une longueur de 8 cm. Calcule sa largeur.", correction: "2(L + l) = 26 ⇒ L + l = 13 ⇒ l = 13 − 8 = 5 cm." },
        { title: "Équation produit", difficulty: "medium", prompt: "Résous (x − 2)(x + 5) = 0.", correction: "x − 2 = 0 ou x + 5 = 0, donc x = 2 ou x = −5." },
        { title: "Problème d'âges", difficulty: "medium", prompt: "Un père a 30 ans de plus que son fils. Dans 10 ans, il aura le double de l'âge du fils. Quel est l'âge du fils ?", correction: "Fils = x. (x + 30) + 10 = 2(x + 10) ⇒ x + 40 = 2x + 20 ⇒ x = 20 ans." },
        { title: "Pourcentages successifs", difficulty: "hard", prompt: "Un prix augmente de 20 % puis baisse de 20 %. Il vaut alors 96 D. Quel était le prix initial ?", correction: "Prix final = P × 1,2 × 0,8 = 0,96 P = 96 ⇒ P = 100 D." },
      ],
    },
  ],
  physique: [
    {
      objective: "Choisir les unités, lire une grandeur et vérifier la cohérence.",
      essentials: [
        "Toute grandeur physique s'écrit avec un nombre suivi d'une unité.",
        "Unités du Système international : mètre (m), kilogramme (kg), seconde (s), ampère (A).",
        "On convertit les grandeurs avant de calculer pour garder la cohérence des unités.",
        "Un résultat de mesure comporte une incertitude ; on garde un nombre raisonnable de chiffres.",
      ],
      keyTerms: [
        { term: "Grandeur", definition: "Propriété mesurable : longueur, masse, durée..." },
        { term: "Unité", definition: "Référence choisie pour exprimer la valeur d'une grandeur." },
        { term: "Masse volumique", definition: "Masse par unité de volume : ρ = m/V." },
      ],
      exercises: [
        { title: "Conversion de longueur", difficulty: "easy", prompt: "Convertis 2,5 km en mètres.", correction: "2,5 km = 2,5 × 1000 = 2500 m." },
        { title: "Conversion de masse", difficulty: "easy", prompt: "Convertis 500 g en kilogrammes.", correction: "500 g = 500 ÷ 1000 = 0,5 kg." },
        { title: "Conversion de durée", difficulty: "easy", prompt: "Convertis 2 min 30 s en secondes.", correction: "2 × 60 + 30 = 150 s." },
        { title: "Masse volumique", difficulty: "medium", prompt: "Calcule la masse volumique ρ = m/V pour m = 200 g et V = 250 cm³.", correction: "ρ = 200 / 250 = 0,8 g/cm³." },
        { title: "Calcul d'un volume", difficulty: "medium", prompt: "Un pavé mesure 2 cm × 3 cm × 5 cm. Calcule son volume.", correction: "V = 2 × 3 × 5 = 30 cm³." },
        { title: "Masse à partir de ρ", difficulty: "hard", prompt: "Un corps a ρ = 2,7 g/cm³ et V = 10 cm³. Calcule sa masse.", correction: "m = ρ × V = 2,7 × 10 = 27 g." },
        { title: "Vitesse en m/s", difficulty: "hard", prompt: "Exprime une vitesse de 72 km/h en m/s.", correction: "72 km/h = 72 × 1000 / 3600 = 20 m/s." },
      ],
    },
    {
      objective: "Décrire une trajectoire, une vitesse et l'effet d'une force.",
      essentials: [
        "Le mouvement d'un objet se décrit toujours par rapport à un référentiel.",
        "Vitesse moyenne : v = distance parcourue / durée.",
        "Une force est modélisée par un vecteur : point d'application, direction, sens, valeur.",
        "Une force peut modifier la vitesse, la direction ou la forme d'un objet.",
      ],
      keyTerms: [
        { term: "Référentiel", definition: "Objet par rapport auquel on étudie le mouvement." },
        { term: "Vitesse moyenne", definition: "Rapport de la distance parcourue par la durée du trajet." },
        { term: "Force", definition: "Action mécanique capable de modifier le mouvement d'un corps." },
      ],
      exercises: [
        { title: "Calculer une vitesse", difficulty: "easy", prompt: "Un cycliste parcourt 30 m en 6 s. Calcule sa vitesse moyenne.", correction: "v = 30 / 6 = 5 m/s." },
        { title: "Caractéristiques d'une force", difficulty: "easy", prompt: "Cite les quatre caractéristiques d'une force.", correction: "Point d'application, direction, sens et valeur (intensité)." },
        { title: "Nature d'un mouvement", difficulty: "easy", prompt: "Un objet garde une vitesse constante en ligne droite. Comment nomme-t-on ce mouvement ?", correction: "Un mouvement rectiligne uniforme." },
        { title: "Distance parcourue", difficulty: "medium", prompt: "Une voiture roule à 90 km/h pendant 2 h. Quelle distance parcourt-elle ?", correction: "d = v × t = 90 × 2 = 180 km.", figure: "phys-motion-graph", steps: ["Formule : d = v × t.", "Je remplace : d = 90 × 2.", "Résultat : d = 180 km.", "Sur le graphique distance-temps, une vitesse constante donne une droite."] },
        { title: "Durée d'un trajet", difficulty: "medium", prompt: "Un train roule à 120 km/h sur 300 km. Combien de temps met-il ?", correction: "t = d / v = 300 / 120 = 2,5 h." },
        { title: "Effet d'une force", difficulty: "medium", prompt: "Cite deux effets possibles d'une force sur un objet.", correction: "Modifier son mouvement (vitesse, direction) ou le déformer." },
        { title: "Vitesse moyenne globale", difficulty: "hard", prompt: "Un mobile parcourt 100 m en 8 s puis 60 m en 4 s. Calcule sa vitesse moyenne sur tout le trajet.", correction: "v = (100 + 60) / (8 + 4) = 160 / 12 ≈ 13,3 m/s." },
      ],
    },
    {
      objective: "Relier tension, intensité, dipôles et sécurité du circuit.",
      essentials: [
        "Dans un circuit série, l'intensité est la même en tout point.",
        "La tension du générateur se répartit entre les dipôles (additivité des tensions en série).",
        "Loi d'Ohm d'un conducteur ohmique : U = R × I.",
        "L'ampèremètre se branche en série ; le voltmètre en dérivation.",
      ],
      keyTerms: [
        { term: "Intensité", definition: "Débit de charges électriques, mesuré en ampères (A)." },
        { term: "Tension", definition: "Différence de potentiel entre deux points, en volts (V)." },
        { term: "Résistance", definition: "Opposition au passage du courant, en ohms (Ω)." },
      ],
      exercises: [
        { title: "Mesurer l'intensité", difficulty: "easy", prompt: "Quel appareil mesure l'intensité et comment le branche-t-on ?", correction: "L'ampèremètre, branché en série dans le circuit." },
        { title: "Mesurer la tension", difficulty: "easy", prompt: "Quel appareil mesure la tension et comment le branche-t-on ?", correction: "Le voltmètre, branché en dérivation (en parallèle)." },
        { title: "Loi d'Ohm (U)", difficulty: "easy", prompt: "Un conducteur ohmique R = 100 Ω est traversé par I = 0,2 A. Calcule U.", correction: "U = R × I = 100 × 0,2 = 20 V.", figure: "phys-circuit", steps: ["Loi d'Ohm : U = R × I.", "Je remplace : U = 100 × 0,2.", "Résultat : U = 20 V."] },
        { title: "Loi d'Ohm (R)", difficulty: "medium", prompt: "Aux bornes d'un résistor, U = 12 V et I = 0,5 A. Calcule R.", correction: "R = U / I = 12 / 0,5 = 24 Ω." },
        { title: "Loi d'Ohm (I)", difficulty: "medium", prompt: "U = 6 V aux bornes d'un résistor R = 30 Ω. Calcule I.", correction: "I = U / R = 6 / 30 = 0,2 A." },
        { title: "Intensité en série", difficulty: "medium", prompt: "Dans un circuit série, l'intensité vaut 0,3 A près de la lampe. Que vaut-elle près du générateur ?", correction: "0,3 A : l'intensité est la même partout en série." },
        { title: "Additivité des tensions", difficulty: "hard", prompt: "Circuit série : générateur 9 V, lampe 5 V. Quelle tension reçoit le résistor ?", correction: "U(résistor) = 9 − 5 = 4 V (les tensions s'ajoutent en série)." },
      ],
    },
  ],
  chimie: [
    {
      objective: "Distinguer atomes, molécules, ions et corps chimiques.",
      essentials: [
        "La matière est constituée d'atomes, de molécules et d'ions.",
        "Un atome est électriquement neutre : nombre de protons = nombre d'électrons.",
        "Un ion vient d'un atome ayant perdu (cation, +) ou gagné (anion, −) des électrons.",
        "Une molécule est un assemblage d'atomes liés entre eux.",
      ],
      keyTerms: [
        { term: "Atome", definition: "Plus petite particule d'un élément, électriquement neutre." },
        { term: "Ion", definition: "Atome ou groupe d'atomes portant une charge électrique." },
        { term: "Molécule", definition: "Assemblage d'au moins deux atomes liés." },
      ],
      exercises: [
        { title: "Cation ou anion", difficulty: "easy", prompt: "L'ion sodium s'écrit Na⁺. A-t-il gagné ou perdu un électron ?", correction: "Charge positive ⇒ il a perdu un électron : c'est un cation." },
        { title: "Formule de l'eau", difficulty: "easy", prompt: "Donne la formule de la molécule d'eau.", correction: "H₂O : deux atomes d'hydrogène et un atome d'oxygène.", figure: "chem-water" },
        { title: "Atomes d'une molécule", difficulty: "easy", prompt: "Combien d'atomes compte la molécule CO₂ ?", correction: "3 atomes : 1 de carbone et 2 d'oxygène." },
        { title: "Neutralité d'un atome", difficulty: "medium", prompt: "Un atome possède 11 protons et 11 électrons. Quelle est sa charge ?", correction: "Charges opposées égales ⇒ atome neutre, charge nulle." },
        { title: "Reconnaître un ion", difficulty: "medium", prompt: "L'espèce Mg²⁺ est-elle un atome, une molécule ou un ion ? Justifie.", correction: "Un ion : elle porte une charge (+2), c'est un cation." },
        { title: "Électrons d'un cation", difficulty: "hard", prompt: "L'ion Al³⁺ possède 13 protons. Combien a-t-il d'électrons ?", correction: "Charge +3 ⇒ 3 électrons de moins : 13 − 3 = 10 électrons.", figure: "chem-atom", steps: ["Un atome neutre a autant d'électrons que de protons : 13.", "La charge +3 indique qu'il a perdu 3 électrons.", "Nombre d'électrons : 13 − 3 = 10."] },
        { title: "Électrons d'un anion", difficulty: "hard", prompt: "L'ion chlorure Cl⁻ possède 17 protons. Combien a-t-il d'électrons ?", correction: "Charge −1 ⇒ un électron de plus que de protons : 17 + 1 = 18 électrons." },
      ],
    },
    {
      objective: "Écrire une équation et respecter la conservation des atomes.",
      essentials: [
        "Les réactifs (à gauche) sont consommés, les produits (à droite) sont formés.",
        "Une équation est équilibrée quand chaque élément a le même nombre d'atomes des deux côtés.",
        "La masse totale se conserve pendant la transformation (loi de Lavoisier).",
      ],
      keyTerms: [
        { term: "Réactif", definition: "Espèce chimique consommée pendant la réaction." },
        { term: "Produit", definition: "Espèce chimique formée pendant la réaction." },
        { term: "Équation équilibrée", definition: "Équation qui respecte la conservation des atomes." },
      ],
      exercises: [
        { title: "Réactifs et produits", difficulty: "easy", prompt: "Dans C + O₂ → CO₂, cite les réactifs et le produit.", correction: "Réactifs : C et O₂ ; produit : CO₂." },
        { title: "Sens de la flèche", difficulty: "easy", prompt: "Dans une équation chimique, où place-t-on les produits ?", correction: "À droite de la flèche." },
        { title: "Équilibrer l'eau", difficulty: "medium", prompt: "Équilibre : H₂ + O₂ → H₂O.", correction: "2 H₂ + O₂ → 2 H₂O." },
        { title: "Combustion du méthane", difficulty: "medium", prompt: "Équilibre : CH₄ + O₂ → CO₂ + H₂O.", correction: "CH₄ + 2 O₂ → CO₂ + 2 H₂O." },
        { title: "Équilibrer une synthèse", difficulty: "medium", prompt: "Équilibre : N₂ + H₂ → NH₃.", correction: "N₂ + 3 H₂ → 2 NH₃." },
        { title: "Conservation de la masse", difficulty: "hard", prompt: "On brûle 12 g de carbone qui donnent 44 g de CO₂. Quelle masse de dioxygène a réagi ?", correction: "Conservation de la masse : m(O₂) = 44 − 12 = 32 g." },
        { title: "Masse d'un produit", difficulty: "hard", prompt: "2 g de dihydrogène réagissent avec 16 g de dioxygène. Quelle masse d'eau obtient-on ?", correction: "Conservation : m(H₂O) = 2 + 16 = 18 g." },
      ],
    },
    {
      objective: "Relier masse, volume, concentration et quantité de matière.",
      essentials: [
        "Une solution = un soluté dissous dans un solvant.",
        "Concentration massique : Cm = masse de soluté / volume de solution (en g/L).",
        "Diluer, c'est ajouter du solvant : la masse de soluté ne change pas.",
      ],
      keyTerms: [
        { term: "Soluté", definition: "Espèce dissoute dans le solvant." },
        { term: "Solvant", definition: "Liquide qui dissout le soluté (souvent l'eau)." },
        { term: "Concentration massique", definition: "Masse de soluté par litre de solution." },
      ],
      exercises: [
        { title: "Calculer une concentration", difficulty: "easy", prompt: "On dissout 20 g de sel dans 0,5 L d'eau. Calcule la concentration massique.", correction: "Cm = 20 / 0,5 = 40 g/L." },
        { title: "Vocabulaire", difficulty: "easy", prompt: "Dans l'eau salée, quel est le soluté et quel est le solvant ?", correction: "Soluté : le sel ; solvant : l'eau." },
        { title: "Concentration simple", difficulty: "easy", prompt: "10 g de sucre sont dissous dans 1 L. Quelle est la concentration massique ?", correction: "Cm = 10 / 1 = 10 g/L." },
        { title: "Masse de soluté", difficulty: "medium", prompt: "Quelle masse de sucre faut-il pour 250 mL d'une solution à 40 g/L ?", correction: "m = Cm × V = 40 × 0,25 = 10 g." },
        { title: "Volume de solution", difficulty: "medium", prompt: "On veut une solution à 5 g/L avec 15 g de soluté. Quel volume prépare-t-on ?", correction: "V = m / Cm = 15 / 5 = 3 L." },
        { title: "Dilution (concentration)", difficulty: "hard", prompt: "On dilue 10 fois une solution à 60 g/L. Quelle est la concentration finale ?", correction: "Cf = 60 / 10 = 6 g/L." },
        { title: "Dilution (volume)", difficulty: "hard", prompt: "Pour diluer 5 fois 50 mL de solution, quel volume final faut-il atteindre ?", correction: "V final = 5 × 50 = 250 mL (donc ajouter 200 mL d'eau)." },
      ],
    },
  ],
  svt: [
    {
      objective: "Lire un schéma, un tableau, une carte ou une coupe.",
      essentials: [
        "On lit d'abord le titre, la nature et la source du document.",
        "On repère ensuite les grandeurs, les unités, la légende ou l'échelle.",
        "L'exploitation relie les observations à un raisonnement scientifique.",
      ],
      keyTerms: [
        { term: "Légende", definition: "Explication des symboles et des couleurs d'un document." },
        { term: "Échelle", definition: "Rapport entre une distance sur le document et la distance réelle." },
      ],
      exercises: [
        { title: "Ordre de lecture", difficulty: "easy", prompt: "Quels éléments observer en premier sur un document scientifique ?", correction: "Le titre, la nature et la source, puis la légende ou l'échelle." },
        { title: "Rôle de la légende", difficulty: "easy", prompt: "À quoi sert la légende d'un document ?", correction: "À expliquer la signification des couleurs et des symboles." },
        { title: "Lire un graphique", difficulty: "medium", prompt: "Un graphique montre la température en fonction du temps. Quelles grandeurs et unités lit-on ?", correction: "Température (°C) en ordonnée ; temps (s ou min) en abscisse.", figure: "svt-temp-graph" },
        { title: "Lire un tableau", difficulty: "medium", prompt: "Dans un tableau de mesures, comment repère-t-on la valeur maximale ?", correction: "On compare les valeurs d'une même colonne (ou ligne) et on retient la plus grande." },
        { title: "Utiliser une échelle", difficulty: "hard", prompt: "Sur une carte au 1/25 000, deux villages sont distants de 4 cm. Quelle est la distance réelle ?", correction: "4 cm × 25 000 = 100 000 cm = 1 km." },
        { title: "Convertir une échelle", difficulty: "hard", prompt: "À l'échelle 1/50 000, quelle distance réelle représente 3 cm ?", correction: "3 × 50 000 = 150 000 cm = 1,5 km." },
      ],
    },
    {
      objective: "Comprendre les roches, les couches et les ressources géologiques.",
      essentials: [
        "Trois familles de roches : sédimentaires, magmatiques, métamorphiques.",
        "Principe de superposition : la strate la plus ancienne est en bas.",
        "Les fossiles renseignent sur l'âge des couches et les milieux anciens.",
      ],
      keyTerms: [
        { term: "Strate", definition: "Couche de roche sédimentaire." },
        { term: "Fossile", definition: "Reste ou trace d'un être vivant conservé dans une roche." },
        { term: "Roche sédimentaire", definition: "Roche formée par accumulation de dépôts." },
      ],
      exercises: [
        { title: "Familles de roches", difficulty: "easy", prompt: "Cite les trois grandes familles de roches.", correction: "Roches sédimentaires, magmatiques et métamorphiques." },
        { title: "Définir une strate", difficulty: "easy", prompt: "Qu'est-ce qu'une strate ?", correction: "Une couche de roche sédimentaire." },
        { title: "Datation relative", difficulty: "medium", prompt: "Dans une coupe, quelle strate est la plus ancienne et pourquoi ?", correction: "Celle du bas : d'après le principe de superposition, les dépôts récents recouvrent les anciens.", figure: "svt-cross-section", steps: ["Les sédiments se déposent couche par couche, de bas en haut.", "La couche du bas s'est déposée en premier : elle est la plus ancienne.", "C'est le principe de superposition."] },
        { title: "Rôle des fossiles", difficulty: "medium", prompt: "Que peut-on déduire de la présence de fossiles marins dans une roche ?", correction: "Que la région était autrefois recouverte par la mer." },
        { title: "Fossile stratigraphique", difficulty: "hard", prompt: "Un fossile n'a vécu qu'à une époque précise. En quoi est-il utile ?", correction: "C'est un fossile stratigraphique : il permet de dater la couche qui le contient." },
        { title: "Ordre des événements", difficulty: "hard", prompt: "Une couche est traversée par une faille. Qui est le plus récent : la couche ou la faille ?", correction: "La faille : elle affecte la couche, donc elle s'est formée après." },
      ],
    },
    {
      objective: "Observer, comparer, expliquer et conclure avec des arguments.",
      essentials: [
        "Démarche scientifique : observation → problème → hypothèse → expérience → conclusion.",
        "Une hypothèse doit être vérifiable par une expérience ou une observation.",
        "La conclusion valide ou rejette l'hypothèse à partir des résultats.",
      ],
      keyTerms: [
        { term: "Hypothèse", definition: "Réponse possible et vérifiable à un problème posé." },
        { term: "Expérience témoin", definition: "Expérience de référence où le facteur étudié n'est pas modifié." },
      ],
      exercises: [
        { title: "Ordonner la démarche", difficulty: "easy", prompt: "Range dans l'ordre : conclusion, hypothèse, observation, expérience.", correction: "Observation, hypothèse, expérience, conclusion." },
        { title: "Reconnaître une hypothèse", difficulty: "easy", prompt: "« La lumière fait verdir la plante. » Est-ce une observation ou une hypothèse ?", correction: "Une hypothèse : une réponse possible à vérifier." },
        { title: "Rôle du témoin", difficulty: "medium", prompt: "À quoi sert une expérience témoin ?", correction: "Elle sert de référence pour isoler l'effet du seul facteur étudié." },
        { title: "Identifier le facteur testé", difficulty: "medium", prompt: "On compare une plante à la lumière et une à l'obscurité. Quel facteur teste-t-on ?", correction: "La lumière (le seul facteur qui varie)." },
        { title: "Concevoir un test", difficulty: "hard", prompt: "Une plante privée de lumière jaunit. Formule une hypothèse et propose un test.", correction: "Hypothèse : la lumière est nécessaire à la couleur verte. Test : comparer deux plantes identiques, l'une à la lumière, l'autre à l'obscurité (expérience témoin)." },
        { title: "Interpréter un résultat", difficulty: "hard", prompt: "La plante à l'obscurité jaunit, celle à la lumière reste verte. Que conclus-tu ?", correction: "L'hypothèse est validée : la lumière est nécessaire à la couleur verte." },
      ],
    },
  ],
  technologie: [
    {
      objective: "Identifier le besoin, la fonction globale et les fonctions techniques.",
      essentials: [
        "Un système technique répond à un besoin par une fonction globale.",
        "La fonction globale transforme une matière d'œuvre entrante en matière d'œuvre sortante.",
        "On distingue la fonction d'usage (le service rendu) et les fonctions techniques.",
      ],
      keyTerms: [
        { term: "Besoin", definition: "Nécessité à satisfaire par le système." },
        { term: "Fonction globale", definition: "Action principale du système sur la matière d'œuvre." },
        { term: "Matière d'œuvre", definition: "Matière, énergie ou information transformée par le système." },
      ],
      exercises: [
        { title: "Fonction globale", difficulty: "easy", prompt: "Quelle est la fonction globale d'un ventilateur ?", correction: "Mettre l'air en mouvement à partir d'énergie électrique." },
        { title: "Définir le besoin", difficulty: "easy", prompt: "Quel besoin satisfait un réfrigérateur ?", correction: "Conserver les aliments au froid." },
        { title: "Matière d'œuvre", difficulty: "medium", prompt: "Pour un sèche-cheveux, identifie la matière d'œuvre entrante et sortante.", correction: "Entrée : air froid ; sortie : air chaud en mouvement." },
        { title: "Fonction d'usage", difficulty: "medium", prompt: "Donne la fonction d'usage d'un parapluie.", correction: "Protéger l'utilisateur de la pluie." },
        { title: "Usage et technique", difficulty: "hard", prompt: "Distingue la fonction d'usage et une fonction technique d'un store automatique.", correction: "Fonction d'usage : protéger du soleil ; fonction technique : détecter la luminosité puis commander le moteur." },
        { title: "Bête à cornes", difficulty: "hard", prompt: "Pour un grille-pain, réponds : à qui rend-il service, sur quoi agit-il, dans quel but ?", correction: "À l'utilisateur ; sur le pain ; pour le griller (le chauffer)." },
      ],
    },
    {
      objective: "Repérer alimenter, distribuer, convertir et transmettre.",
      essentials: [
        "Chaîne d'énergie : alimenter, distribuer, convertir, transmettre.",
        "Alimenter fournit l'énergie, distribuer la commande, convertir la transforme, transmettre l'achemine.",
        "Un moteur convertit l'énergie électrique en énergie mécanique.",
      ],
      keyTerms: [
        { term: "Convertir", definition: "Transformer une forme d'énergie en une autre." },
        { term: "Effecteur", definition: "Élément qui agit sur la matière d'œuvre (roue, bras...)." },
      ],
      exercises: [
        { title: "Les quatre fonctions", difficulty: "easy", prompt: "Cite les quatre fonctions de la chaîne d'énergie.", correction: "Alimenter, distribuer, convertir, transmettre." },
        { title: "Fonction alimenter", difficulty: "easy", prompt: "Quel composant assure la fonction « alimenter » dans un jouet ?", correction: "La pile (ou la batterie)." },
        { title: "Rôle du moteur", difficulty: "medium", prompt: "Un moteur électrique : quelle fonction assure-t-il et quelle conversion réalise-t-il ?", correction: "Il assure « convertir » : énergie électrique → énergie mécanique." },
        { title: "Distribuer l'énergie", difficulty: "medium", prompt: "Quel composant commande le passage de l'énergie vers le moteur ?", correction: "Un interrupteur, un relais ou un variateur (fonction distribuer)." },
        { title: "Associer les éléments", difficulty: "hard", prompt: "Portail automatique : associe batterie, relais, moteur, engrenage aux fonctions de la chaîne d'énergie.", correction: "Batterie = alimenter, relais = distribuer, moteur = convertir, engrenage = transmettre." },
        { title: "Transmettre le mouvement", difficulty: "hard", prompt: "Cite deux éléments qui assurent la fonction « transmettre ».", correction: "Engrenages, courroies, poulies ou arbres (deux au choix)." },
      ],
    },
    {
      objective: "Repérer acquérir, traiter et communiquer l'information.",
      essentials: [
        "Chaîne d'information : acquérir, traiter, communiquer.",
        "Un capteur acquiert une information sur l'environnement.",
        "L'unité de traitement décide, l'interface communique le résultat.",
      ],
      keyTerms: [
        { term: "Capteur", definition: "Élément qui acquiert une grandeur physique et la transforme en signal." },
        { term: "Traiter", definition: "Analyser l'information et décider d'une action." },
      ],
      exercises: [
        { title: "Les trois fonctions", difficulty: "easy", prompt: "Cite les trois fonctions de la chaîne d'information.", correction: "Acquérir, traiter, communiquer." },
        { title: "Rôle d'un capteur", difficulty: "easy", prompt: "À quelle fonction appartient un capteur de température ?", correction: "À la fonction « acquérir »." },
        { title: "Fonction traiter", difficulty: "medium", prompt: "Quel composant décide de l'action à partir des informations reçues ?", correction: "L'unité de traitement (microcontrôleur, carte programmable)." },
        { title: "Fonction communiquer", difficulty: "medium", prompt: "Cite deux éléments qui assurent la fonction « communiquer ».", correction: "Écran, LED, haut-parleur ou buzzer (deux au choix)." },
        { title: "Associer les éléments", difficulty: "hard", prompt: "Alarme : associe capteur de mouvement, microcontrôleur, sirène aux fonctions de la chaîne d'information.", correction: "Capteur = acquérir, microcontrôleur = traiter, sirène = communiquer." },
        { title: "Distinguer les chaînes", difficulty: "hard", prompt: "Un moteur et un capteur : lequel appartient à la chaîne d'énergie, lequel à la chaîne d'information ?", correction: "Le moteur → chaîne d'énergie ; le capteur → chaîne d'information." },
      ],
    },
  ],
  francais: [
    {
      essentials: [
        "Identifier la situation d'énonciation : qui parle, à qui, où et quand ?",
        "Repérer le thème et le point de vue de l'auteur.",
        "Distinguer les types de textes : narratif, descriptif, argumentatif.",
      ],
      keyTerms: [
        { term: "Énonciation", definition: "Situation dans laquelle un message est produit." },
        { term: "Point de vue", definition: "Position ou opinion adoptée par l'auteur." },
      ],
      exercises: [
        { title: "Situation d'énonciation", difficulty: "easy", prompt: "Dans « Je vous écris de Tunis ce matin », qui parle, à qui, où et quand ?", correction: "« Je » parle à « vous », depuis Tunis, ce matin : c'est la situation d'énonciation." },
        { title: "Type de texte", difficulty: "easy", prompt: "Un texte raconte une suite d'événements. De quel type est-il ?", correction: "Un texte narratif (un récit)." },
        { title: "Le thème", difficulty: "easy", prompt: "Comment repère-t-on le thème d'un texte ?", correction: "En cherchant le mot ou l'idée qui revient le plus et de quoi parle le texte." },
        { title: "Point de vue", difficulty: "medium", prompt: "« Cette décision injuste a révolté tout le monde. » L'auteur est-il neutre ?", correction: "Non : « injuste » et « révolté » montrent un point de vue critique." },
        { title: "Reconnaître le descriptif", difficulty: "medium", prompt: "Quels indices montrent qu'un passage est descriptif ?", correction: "Beaucoup d'adjectifs, de compléments de lieu, des verbes d'état et souvent l'imparfait." },
        { title: "Visée argumentative", difficulty: "hard", prompt: "Comment reconnaître un texte argumentatif ?", correction: "Il défend une thèse, emploie des connecteurs logiques (car, donc, cependant) et des arguments illustrés d'exemples." },
      ],
    },
    {
      essentials: [
        "Un résumé garde les idées essentielles et supprime les exemples.",
        "On reformule avec ses propres mots sans changer le sens.",
        "On respecte l'ordre des idées et le système d'énonciation.",
      ],
      keyTerms: [
        { term: "Reformulation", definition: "Dire une idée autrement, sans en changer le sens." },
        { term: "Idée essentielle", definition: "Information indispensable à la compréhension." },
      ],
      exercises: [
        { title: "But du résumé", difficulty: "easy", prompt: "Que garde-t-on et que supprime-t-on dans un résumé ?", correction: "On garde les idées essentielles ; on supprime les exemples et les détails secondaires." },
        { title: "Reformuler", difficulty: "easy", prompt: "Reformule : « Il fait preuve d'une grande générosité. »", correction: "Par exemple : « Il est très généreux. »" },
        { title: "Réduire une phrase", difficulty: "medium", prompt: "Résume : « Après avoir longuement réfléchi, et malgré ses doutes, il finit par accepter l'offre. »", correction: "« Il a fini par accepter l'offre. »" },
        { title: "Respect de l'énonciation", difficulty: "medium", prompt: "Si le texte est écrit à la 1re personne, à quelle personne rédige-t-on le résumé ?", correction: "À la même : on conserve le système d'énonciation (1re personne)." },
        { title: "Éviter la copie", difficulty: "medium", prompt: "Pourquoi ne faut-il pas recopier des phrases entières du texte ?", correction: "Un résumé exige une reformulation personnelle, sans changer le sens." },
        { title: "Taux de réduction", difficulty: "hard", prompt: "Un texte de 200 mots doit être résumé au quart. Combien de mots vise-t-on ?", correction: "200 ÷ 4 = 50 mots environ." },
      ],
    },
    {
      essentials: [
        "Un paragraphe s'organise : idée directrice, arguments, exemples, conclusion.",
        "Les connecteurs logiques structurent le raisonnement (d'abord, ensuite, donc...).",
        "On relit pour corriger l'orthographe et la ponctuation.",
      ],
      keyTerms: [
        { term: "Connecteur logique", definition: "Mot qui relie les idées : car, donc, mais..." },
        { term: "Idée directrice", definition: "Idée principale d'un paragraphe." },
      ],
      exercises: [
        { title: "Idée directrice", difficulty: "easy", prompt: "Par quoi commence un bon paragraphe ?", correction: "Par une phrase qui annonce l'idée directrice." },
        { title: "Choisir un connecteur", difficulty: "easy", prompt: "Complète : « Il pleut, ___ je prends un parapluie. »", correction: "« donc » (connecteur de conséquence)." },
        { title: "Ordonner des idées", difficulty: "medium", prompt: "Range ces connecteurs du début à la fin : « enfin, d'abord, ensuite ».", correction: "D'abord, ensuite, enfin." },
        { title: "Argument et exemple", difficulty: "medium", prompt: "Donne un argument et un exemple pour : « La lecture est utile. »", correction: "Argument : elle enrichit le vocabulaire. Exemple : en lisant des romans, on apprend de nouveaux mots." },
        { title: "Structurer un paragraphe", difficulty: "hard", prompt: "Cite dans l'ordre les quatre parties d'un paragraphe argumenté.", correction: "Idée directrice, argument(s), exemple(s), phrase de conclusion." },
        { title: "Relecture", difficulty: "hard", prompt: "Cite trois points à vérifier lors de la relecture.", correction: "L'orthographe, la ponctuation et la cohérence (connecteurs, accords)." },
      ],
    },
  ],
  anglais: [
    {
      essentials: [
        "Skim the text first to get the general idea.",
        "Scan for key details: names, dates and numbers.",
        "Use the title and pictures as reading clues.",
      ],
      keyTerms: [
        { term: "Skimming", definition: "Reading quickly to find the general idea." },
        { term: "Scanning", definition: "Reading to find specific information." },
      ],
      exercises: [
        { title: "Skimming", difficulty: "easy", prompt: "What do you do when you skim a text?", correction: "You read it quickly to get the general idea, without reading every word." },
        { title: "Scanning", difficulty: "easy", prompt: "You need to find a date in a text. Do you skim or scan?", correction: "You scan: you look for that specific piece of information." },
        { title: "Reading clues", difficulty: "easy", prompt: "Name two clues that help you before reading a text.", correction: "The title and the pictures (or the headings)." },
        { title: "Main idea", difficulty: "medium", prompt: "How do you find the main idea of a paragraph?", correction: "Look at the topic sentence, usually the first one, and what the paragraph is mostly about." },
        { title: "Reference words", difficulty: "medium", prompt: "In « Tom is tall. He plays basketball », what does « He » refer to?", correction: "« He » refers to Tom." },
        { title: "Guessing meaning", difficulty: "hard", prompt: "How can you guess the meaning of an unknown word?", correction: "Use the context (surrounding words) and clues such as examples or opposites." },
      ],
    },
    {
      essentials: [
        "Master the main tenses: present, past and future.",
        "Use connectors to link ideas: and, but, because, so.",
        "Follow the English word order: Subject + Verb + Object.",
      ],
      keyTerms: [
        { term: "Tense", definition: "The form of a verb that shows time." },
        { term: "Connector", definition: "A word that links ideas or sentences." },
      ],
      exercises: [
        { title: "Present simple", difficulty: "easy", prompt: "Complete: « She ___ (play) tennis every day. »", correction: "« plays » (present simple, third person adds -s)." },
        { title: "Past simple", difficulty: "easy", prompt: "Put in the past: « They visit the museum. »", correction: "« They visited the museum. »" },
        { title: "Choose the connector", difficulty: "medium", prompt: "Complete: « I was tired, ___ I went to bed. »", correction: "« so » (it shows a result)." },
        { title: "Word order", difficulty: "medium", prompt: "Order the words: « football / plays / he ».", correction: "« He plays football. » (Subject + Verb + Object)." },
        { title: "Future with will", difficulty: "medium", prompt: "Make a future sentence with « will » and « help ».", correction: "For example: « I will help you tomorrow. »" },
        { title: "Comparative", difficulty: "hard", prompt: "Complete: « This book is ___ (interesting) than that one. »", correction: "« more interesting » (long adjective → more + adjective)." },
      ],
    },
    {
      essentials: [
        "Start with a clear topic sentence.",
        "Add two or three supporting ideas with examples.",
        "End with a short concluding sentence, then proofread.",
      ],
      keyTerms: [
        { term: "Topic sentence", definition: "The sentence that states the main idea." },
        { term: "Proofread", definition: "To check your writing for mistakes." },
      ],
      exercises: [
        { title: "Topic sentence", difficulty: "easy", prompt: "What is a topic sentence?", correction: "The sentence that states the main idea of the paragraph." },
        { title: "Capital letters", difficulty: "easy", prompt: "Correct: « my friend lives in tunis. »", correction: "« My friend lives in Tunis. » (capital M and T)." },
        { title: "Supporting ideas", difficulty: "medium", prompt: "After the topic sentence, what should you add?", correction: "Two or three supporting ideas with examples." },
        { title: "Linking words", difficulty: "medium", prompt: "Add a linking word: « I like sport ___ I play every weekend. »", correction: "« and » (or « so »)." },
        { title: "Concluding sentence", difficulty: "hard", prompt: "Write a concluding sentence for a paragraph about the benefits of sport.", correction: "For example: « In short, sport keeps us healthy and happy. »" },
        { title: "Proofreading", difficulty: "hard", prompt: "Name three things to check when you proofread.", correction: "Spelling, punctuation and capital letters (and grammar)." },
      ],
    },
  ],
  "arabe-textes": [
    {
      essentials: [
        "قبل التحليل، حدّد الموضوع والفكرة العامة للنص.",
        "ابحث عن القرائن: العنوان، الكلمات المفاتيح والروابط.",
        "ميّز بين الأفكار الأساسية والأفكار الثانوية.",
      ],
      keyTerms: [
        { term: "الفكرة العامة", definition: "الموضوع الرئيسي الذي يدور حوله النص." },
        { term: "القرينة", definition: "دليل لغوي أو معنوي يساعد على الفهم." },
      ],
      exercises: [
        { title: "الفكرة العامة", difficulty: "easy", prompt: "اقرأ النص واستخرج الفكرة العامة في جملة واحدة.", correction: "الفكرة العامة تلخّص موضوع النص كله في جملة قصيرة وواضحة." },
        { title: "الكلمات المفاتيح", difficulty: "easy", prompt: "استخرج ثلاث كلمات مفاتيح من النص.", correction: "الكلمات المفاتيح هي الأكثر تكرارا وارتباطا بالموضوع." },
        { title: "أفكار أساسية وثانوية", difficulty: "medium", prompt: "ميّز بين فكرة أساسية وفكرة ثانوية في النص.", correction: "الفكرة الأساسية ضرورية للفهم، أما الثانوية فمثال أو تفصيل يمكن حذفه." },
        { title: "القرائن", difficulty: "medium", prompt: "ما القرائن التي ساعدتك على فهم موضوع النص؟", correction: "العنوان، الكلمات المتكررة، والروابط بين الجمل." },
        { title: "بناء الفهم", difficulty: "hard", prompt: "حدّد: الموضوع، الفكرة العامة، وفكرتين أساسيتين.", correction: "نذكر الموضوع، ثم نصوغ الفكرة العامة في جملة، ثم نستخرج فكرتين أساسيتين من الفقرات." },
      ],
    },
    {
      essentials: [
        "ادرس المعجم والحقول الدلالية في النص.",
        "حدّد الأساليب والصور البلاغية ودورها في المعنى.",
        "اربط بنية النص بمعناه العام.",
      ],
      keyTerms: [
        { term: "الحقل الدلالي", definition: "مجموعة كلمات تشترك في المعنى نفسه." },
        { term: "الصورة البلاغية", definition: "تعبير مجازي كالتشبيه والاستعارة." },
      ],
      exercises: [
        { title: "الحقل الدلالي", difficulty: "easy", prompt: "استخرج كلمتين تنتميان إلى حقل دلالي واحد.", correction: "الحقل الدلالي يجمع كلمات متقاربة في المعنى، مثل: فرح، بهجة، سرور." },
        { title: "تعريف التشبيه", difficulty: "easy", prompt: "ما هو التشبيه؟ أعطِ مثالا.", correction: "التشبيه مقارنة بين طرفين بأداة، مثل: هو كالأسد في الشجاعة." },
        { title: "دور الصورة", difficulty: "medium", prompt: "اذكر صورة بلاغية من النص واشرح أثرها.", correction: "نذكر المثال ثم نبيّن كيف يقوّي المعنى أو العاطفة أو الحجاج." },
        { title: "الأسلوب وغرضه", difficulty: "medium", prompt: "استخرج أسلوب استفهام أو تعجب واذكر غرضه.", correction: "نحدّد الجملة ثم نبيّن الغرض: التشويق، الإنكار أو التعجب." },
        { title: "بنية ومعنى", difficulty: "hard", prompt: "كيف تخدم بنية النص (مقدمة، تطور، خاتمة) معناه العام؟", correction: "نبيّن كيف يتدرّج الكاتب من طرح الفكرة إلى تطويرها ثم خلاصتها." },
      ],
    },
    {
      essentials: [
        "خطّط للفقرة: مقدمة، تطوير، خاتمة.",
        "ادعم أفكارك بالحجج والأمثلة.",
        "احرص على الترابط وسلامة اللغة.",
      ],
      keyTerms: [
        { term: "الحجة", definition: "دليل يدعم الرأي أو الفكرة." },
        { term: "الروابط", definition: "كلمات تربط بين الجمل والأفكار." },
      ],
      exercises: [
        { title: "التخطيط", difficulty: "easy", prompt: "ما هي الأجزاء الثلاثة للفقرة؟", correction: "مقدمة، تطوير (أفكار وأمثلة)، خاتمة." },
        { title: "الروابط", difficulty: "easy", prompt: "أكمل بالرابط المناسب: «تمطر السماء ... آخذ المظلة».", correction: "«لذلك» (رابط نتيجة)." },
        { title: "حجة ومثال", difficulty: "medium", prompt: "ادعم فكرة «المطالعة مفيدة» بحجة ومثال.", correction: "الحجة: تُثري الرصيد اللغوي. المثال: بقراءة القصص نتعلّم كلمات جديدة." },
        { title: "ترتيب الأفكار", difficulty: "medium", prompt: "رتّب الروابط من البداية إلى النهاية: «أخيرا، أولا، ثم».", correction: "أولا، ثم، أخيرا." },
        { title: "إنتاج فقرة", difficulty: "hard", prompt: "اكتب فقرة قصيرة (فكرة + حجة + مثال + خاتمة) حول قيمة التعاون.", correction: "نبدأ بالفكرة، ندعمها بحجة ومثال من الحياة، ثم نختم بجملة تلخّص أهمية التعاون." },
      ],
    },
  ],
  geographie: [
    {
      essentials: [
        "Toute carte se lit par : titre, légende, échelle, orientation.",
        "L'échelle relie la distance sur la carte à la distance réelle.",
        "La légende explique les figurés (couleurs et symboles).",
      ],
      keyTerms: [
        { term: "Échelle", definition: "Rapport entre une distance sur la carte et la distance réelle." },
        { term: "Figuré", definition: "Symbole représentant une information sur une carte." },
      ],
      exercises: [
        { title: "Éléments d'une carte", difficulty: "easy", prompt: "Cite les quatre éléments à lire sur une carte.", correction: "Titre, légende, échelle, orientation." },
        { title: "Rôle de la légende", difficulty: "easy", prompt: "À quoi sert la légende d'une carte ?", correction: "À expliquer les figurés (couleurs et symboles)." },
        { title: "Orientation", difficulty: "easy", prompt: "Sur une carte, vers où pointe généralement le nord ?", correction: "Vers le haut (indiqué par la rose des vents ou une flèche)." },
        { title: "Calcul avec l'échelle", difficulty: "medium", prompt: "À l'échelle 1/100 000, 5 cm représentent quelle distance réelle ?", correction: "5 × 100 000 = 500 000 cm = 5 km." },
        { title: "Choisir un figuré", difficulty: "medium", prompt: "Comment représente-t-on une ville et une route sur une carte ?", correction: "Un figuré ponctuel (point) pour la ville, un figuré linéaire (trait) pour la route." },
        { title: "Distance réelle", difficulty: "hard", prompt: "Sur une carte au 1/25 000, deux points sont à 8 cm. Quelle distance réelle ?", correction: "8 × 25 000 = 200 000 cm = 2 km." },
      ],
    },
    {
      essentials: [
        "Comparer des documents, c'est repérer points communs et différences.",
        "Croiser les informations rend la réponse plus fiable.",
        "On cite toujours le document utilisé.",
      ],
      keyTerms: [
        { term: "Croiser les documents", definition: "Confronter plusieurs sources pour vérifier une information." },
        { term: "Source", definition: "Origine d'un document : auteur, date, organisme." },
      ],
      exercises: [
        { title: "Comparer", difficulty: "easy", prompt: "Comparer deux documents, c'est chercher quoi ?", correction: "Les points communs et les différences." },
        { title: "Citer une source", difficulty: "easy", prompt: "Que doit-on toujours indiquer quand on utilise un document ?", correction: "Sa source (auteur, date, organisme)." },
        { title: "Croiser des documents", difficulty: "medium", prompt: "Pourquoi croiser plusieurs documents ?", correction: "Pour vérifier l'information et la rendre plus fiable." },
        { title: "Lire un graphique", difficulty: "medium", prompt: "Un graphique montre l'évolution de la population. Que lit-on sur chaque axe ?", correction: "L'axe horizontal : les années ; l'axe vertical : le nombre d'habitants." },
        { title: "Repérer une tendance", difficulty: "hard", prompt: "La population passe de 8 à 11 millions en 20 ans. Décris la tendance.", correction: "Une augmentation de 3 millions : la population croît." },
        { title: "Fiabilité d'une source", difficulty: "hard", prompt: "Entre un blog anonyme et un institut national de statistiques, quelle source privilégier ? Pourquoi ?", correction: "L'institut national : source officielle, datée et vérifiable." },
      ],
    },
    {
      essentials: [
        "Une synthèse géographique est organisée et localisée.",
        "On emploie le vocabulaire géographique adapté.",
        "Chaque idée s'appuie sur une information du document.",
      ],
      keyTerms: [
        { term: "Localiser", definition: "Situer un phénomène dans l'espace." },
        { term: "Synthèse", definition: "Réponse organisée qui relie plusieurs informations." },
      ],
      exercises: [
        { title: "Localiser", difficulty: "easy", prompt: "Que signifie « localiser » un phénomène ?", correction: "Le situer dans l'espace (dire où il se trouve)." },
        { title: "Vocabulaire géographique", difficulty: "easy", prompt: "Cite trois mots du vocabulaire géographique.", correction: "Par exemple : littoral, densité, région (ou milieu, ressource, échelle)." },
        { title: "Organiser une synthèse", difficulty: "medium", prompt: "Quelles sont les trois parties d'une synthèse ?", correction: "Introduction, développement organisé, conclusion." },
        { title: "Appuyer une idée", difficulty: "medium", prompt: "Sur quoi doit s'appuyer chaque idée d'une synthèse ?", correction: "Sur une information tirée d'un document." },
        { title: "Rédiger localisé", difficulty: "hard", prompt: "Transforme en phrase localisée : « Il y a beaucoup d'usines. »", correction: "Par exemple : « Les usines se concentrent sur le littoral nord-est du pays. »" },
        { title: "Conclure", difficulty: "hard", prompt: "Que doit contenir la conclusion d'une synthèse géographique ?", correction: "Une réponse claire au sujet et un bilan des idées principales." },
      ],
    },
  ],
  histoire: [
    {
      essentials: [
        "Situer un événement, c'est le placer dans le temps et l'espace.",
        "Les grands repères organisent la chronologie (siècles, périodes).",
        "Une frise chronologique visualise l'ordre des faits.",
      ],
      keyTerms: [
        { term: "Chronologie", definition: "Ordre des événements dans le temps." },
        { term: "Frise chronologique", definition: "Ligne du temps représentant des événements." },
      ],
      exercises: [
        { title: "Situer un événement", difficulty: "easy", prompt: "Situer un événement, c'est le placer dans quoi ?", correction: "Dans le temps et dans l'espace." },
        { title: "Le siècle", difficulty: "easy", prompt: "L'année 1789 appartient à quel siècle ?", correction: "Au XVIIIe siècle (18e)." },
        { title: "Frise chronologique", difficulty: "easy", prompt: "À quoi sert une frise chronologique ?", correction: "À représenter l'ordre des événements dans le temps." },
        { title: "Calculer une durée", difficulty: "medium", prompt: "Combien d'années séparent 1881 de 1956 ?", correction: "1956 − 1881 = 75 ans." },
        { title: "Ordonner des faits", difficulty: "medium", prompt: "Range du plus ancien au plus récent : 1956, 1881, 2011.", correction: "1881, 1956, 2011." },
        { title: "Avant Jésus-Christ", difficulty: "hard", prompt: "Combien d'années séparent 200 av. J.-C. et 150 apr. J.-C. ?", correction: "200 + 150 = 350 ans." },
      ],
    },
    {
      essentials: [
        "Un document historique se présente : nature, auteur, date, contexte.",
        "On distingue source primaire (d'époque) et source secondaire.",
        "On dégage l'idée principale et son intérêt historique.",
      ],
      keyTerms: [
        { term: "Source primaire", definition: "Document produit à l'époque étudiée." },
        { term: "Contexte", definition: "Circonstances historiques entourant le document." },
      ],
      exercises: [
        { title: "Présenter un document", difficulty: "easy", prompt: "Cite quatre éléments pour présenter un document historique.", correction: "Sa nature, son auteur, sa date et son contexte." },
        { title: "Nature d'un document", difficulty: "easy", prompt: "Une photographie et un discours : de quelle nature sont-ils ?", correction: "Une image (photographie) et un texte (discours)." },
        { title: "Source primaire", difficulty: "medium", prompt: "Un témoignage écrit pendant la guerre est-il une source primaire ou secondaire ?", correction: "Primaire : il est produit à l'époque étudiée." },
        { title: "Source secondaire", difficulty: "medium", prompt: "Un article d'historien écrit aujourd'hui sur l'Antiquité est de quel type ?", correction: "Secondaire : il est postérieur à l'époque étudiée." },
        { title: "Idée principale", difficulty: "hard", prompt: "Comment dégage-t-on l'idée principale d'un document ?", correction: "En repérant le sujet, les mots importants et le message que l'auteur veut transmettre." },
        { title: "Point de vue de l'auteur", difficulty: "hard", prompt: "Pourquoi faut-il se méfier du point de vue de l'auteur d'une source ?", correction: "Parce qu'il peut être partial : il défend des idées ou des intérêts." },
      ],
    },
    {
      essentials: [
        "Un paragraphe historique : idée, preuve (fait daté), explication.",
        "On utilise un vocabulaire historique précis.",
        "On conclut en répondant clairement à la question.",
      ],
      keyTerms: [
        { term: "Argument", definition: "Idée appuyée par une preuve historique." },
        { term: "Preuve", definition: "Fait précis (date, événement) qui soutient l'idée." },
      ],
      exercises: [
        { title: "Structure du paragraphe", difficulty: "easy", prompt: "Cite les trois éléments d'un paragraphe historique.", correction: "Une idée, une preuve (fait daté) et une explication." },
        { title: "Qu'est-ce qu'une preuve ?", difficulty: "easy", prompt: "Donne un exemple de preuve historique.", correction: "Un fait précis daté, par exemple « l'indépendance en 1956 »." },
        { title: "Vocabulaire précis", difficulty: "medium", prompt: "Remplace « des gens importants » par un terme historique.", correction: "Par exemple : « les dirigeants » ou « les responsables politiques »." },
        { title: "Relier idée et preuve", difficulty: "medium", prompt: "Complète : « Le pays devient indépendant, comme le montre... »", correction: "« ... la signature du protocole en 1956. » (une preuve datée)." },
        { title: "Rédiger une conclusion", difficulty: "hard", prompt: "Que doit faire la conclusion d'une réponse historique ?", correction: "Répondre clairement à la question posée en résumant l'idée essentielle." },
        { title: "Argument complet", difficulty: "hard", prompt: "Écris un mini-paragraphe (idée + preuve + explication) sur l'importance d'une date étudiée.", correction: "Exemple — Idée : cette date marque un tournant. Preuve : en 1956, le pays obtient l'indépendance. Explication : il gère désormais lui-même ses affaires." },
      ],
    },
  ],
  "education-civique": [
    {
      essentials: [
        "La citoyenneté associe des droits et des devoirs.",
        "Participer à la vie collective est un acte citoyen.",
        "Le respect des règles garantit le vivre-ensemble.",
      ],
      keyTerms: [
        { term: "Droit", definition: "Ce que la loi autorise ou garantit au citoyen." },
        { term: "Devoir", definition: "Obligation du citoyen envers la société." },
      ],
      exercises: [
        { title: "Droit ou devoir ?", difficulty: "easy", prompt: "« Aller à l'école » : droit ou devoir ?", correction: "C'est un droit (et une obligation légale jusqu'à un certain âge)." },
        { title: "Exemple de devoir", difficulty: "easy", prompt: "Cite un devoir du citoyen.", correction: "Par exemple : respecter la loi, payer ses impôts ou respecter autrui." },
        { title: "Acte citoyen", difficulty: "easy", prompt: "Cite un exemple de participation à la vie collective.", correction: "Voter, participer à une association ou aider dans un projet de classe." },
        { title: "Droits et devoirs liés", difficulty: "medium", prompt: "Pourquoi dit-on que droits et devoirs vont ensemble ?", correction: "Mon droit s'arrête où commence celui des autres : chacun a des devoirs pour que tous aient des droits." },
        { title: "Respect des règles", difficulty: "medium", prompt: "Pourquoi respecter le règlement de l'établissement ?", correction: "Pour garantir la sécurité, l'égalité et le bon vivre-ensemble." },
        { title: "Situation citoyenne", difficulty: "hard", prompt: "Un élève jette un papier par terre. Quel devoir n'a-t-il pas respecté et pourquoi est-ce important ?", correction: "Le devoir de respecter l'environnement et le bien commun ; la propreté profite à tous." },
      ],
    },
    {
      essentials: [
        "Les institutions organisent la vie publique.",
        "La loi est la même pour tous.",
        "Chaque institution a un rôle précis.",
      ],
      keyTerms: [
        { term: "Institution", definition: "Organisme officiel assurant le fonctionnement de l'État." },
        { term: "Loi", definition: "Règle générale et obligatoire adoptée par les représentants." },
      ],
      exercises: [
        { title: "Rôle des institutions", difficulty: "easy", prompt: "À quoi servent les institutions ?", correction: "À organiser et faire fonctionner la vie publique et l'État." },
        { title: "La loi pour tous", difficulty: "easy", prompt: "La loi s'applique-t-elle de la même façon à tous ?", correction: "Oui : la loi est la même pour tous (égalité devant la loi)." },
        { title: "Reconnaître une institution", difficulty: "easy", prompt: "Cite deux institutions.", correction: "Par exemple : la municipalité, le parlement, la justice ou l'école." },
        { title: "Qui vote la loi ?", difficulty: "medium", prompt: "Qui adopte les lois ?", correction: "Les représentants élus (le parlement / l'assemblée)." },
        { title: "Rôle de la justice", difficulty: "medium", prompt: "Quel est le rôle de la justice ?", correction: "Faire respecter la loi et régler les conflits de manière équitable." },
        { title: "Institution adaptée", difficulty: "hard", prompt: "À quelle institution s'adresser pour obtenir un acte de naissance ?", correction: "À la municipalité (l'état civil de la commune)." },
      ],
    },
    {
      essentials: [
        "Un débat respecte l'écoute et l'argumentation.",
        "On défend une idée avec des arguments et des exemples.",
        "On accepte la contradiction avec respect.",
      ],
      keyTerms: [
        { term: "Argument", definition: "Raison avancée pour défendre une opinion." },
        { term: "Tolérance", definition: "Respect des opinions différentes des siennes." },
      ],
      exercises: [
        { title: "Règles du débat", difficulty: "easy", prompt: "Cite deux règles à respecter dans un débat.", correction: "Écouter l'autre et parler chacun à son tour, sans couper la parole." },
        { title: "Qu'est-ce qu'un argument ?", difficulty: "easy", prompt: "Qu'est-ce qu'un argument ?", correction: "Une raison qui appuie une opinion." },
        { title: "Argument + exemple", difficulty: "medium", prompt: "Défends l'idée « le sport est utile » avec un argument et un exemple.", correction: "Argument : il entretient la santé. Exemple : courir régulièrement renforce le cœur." },
        { title: "Respecter la contradiction", difficulty: "medium", prompt: "Que fait-on quand quelqu'un n'est pas d'accord avec nous ?", correction: "On l'écoute avec respect et on répond par des arguments, sans agressivité (tolérance)." },
        { title: "Reconnaître la tolérance", difficulty: "hard", prompt: "Un camarade a une opinion différente. Quelle attitude est tolérante ?", correction: "Accepter son droit d'avoir un autre avis et discuter calmement, sans le mépriser." },
        { title: "Construire deux arguments", difficulty: "hard", prompt: "Donne deux arguments pour « préserver l'environnement ».", correction: "1) Protéger la santé (air et eau propres). 2) Préserver les ressources pour les générations futures." },
      ],
    },
  ],
  "pensee-islamique": [
    {
      essentials: [
        "Lire le texte pour dégager l'idée principale et le message.",
        "Expliquer le vocabulaire clé du texte.",
        "Relier chaque idée au sens général du texte.",
      ],
      keyTerms: [
        { term: "Idée principale", definition: "Message essentiel porté par le texte." },
        { term: "Explication", definition: "Éclaircissement du sens des mots et des idées." },
      ],
      exercises: [
        { title: "Idée principale", difficulty: "easy", prompt: "Comment repère-t-on l'idée principale d'un texte ?", correction: "En cherchant le message essentiel et ce qui revient le plus." },
        { title: "Expliquer un mot", difficulty: "easy", prompt: "Pourquoi expliquer le vocabulaire clé d'un texte ?", correction: "Pour bien comprendre le sens et éviter les contresens." },
        { title: "Relier au sens", difficulty: "medium", prompt: "Après avoir relevé une idée, que faut-il faire ?", correction: "La relier au sens général et au message du texte." },
        { title: "Dégager le message", difficulty: "medium", prompt: "Un texte invite au respect des parents. Quel est son message ?", correction: "Valoriser le bon comportement envers les parents (la bienfaisance)." },
        { title: "Analyse guidée", difficulty: "hard", prompt: "Pour un court texte, indique : idée principale, un mot clé et le message.", correction: "On énonce l'idée centrale, on définit un mot important, puis on formule le message en une phrase." },
      ],
    },
    {
      essentials: [
        "Les valeurs étudiées se traduisent dans le comportement quotidien.",
        "On relie une notion à un exemple concret de la vie.",
        "Les valeurs favorisent le vivre-ensemble.",
      ],
      keyTerms: [
        { term: "Valeur", definition: "Principe moral qui guide le comportement." },
        { term: "Comportement", definition: "Manière d'agir conforme aux valeurs." },
      ],
      exercises: [
        { title: "Définir une valeur", difficulty: "easy", prompt: "Qu'est-ce qu'une valeur ?", correction: "Un principe moral qui guide le comportement." },
        { title: "Exemple concret", difficulty: "easy", prompt: "Donne un exemple concret de la valeur d'honnêteté.", correction: "Rendre à son propriétaire un objet trouvé." },
        { title: "Valeur et comportement", difficulty: "medium", prompt: "Comment la valeur de solidarité se traduit-elle au quotidien ?", correction: "Aider une personne en difficulté, partager, participer à l'entraide." },
        { title: "Vivre-ensemble", difficulty: "medium", prompt: "En quoi les valeurs favorisent-elles le vivre-ensemble ?", correction: "Elles créent le respect, la confiance et la coopération entre les personnes." },
        { title: "Relier notion et vie", difficulty: "hard", prompt: "Relie la valeur de justice à une situation de classe.", correction: "Traiter tous les élèves de la même façon, par exemple partager équitablement les tâches." },
      ],
    },
    {
      essentials: [
        "Une réponse claire utilise un vocabulaire précis.",
        "Chaque idée est appuyée par un exemple.",
        "La réponse est organisée de façon logique.",
      ],
      keyTerms: [
        { term: "Synthèse", definition: "Réponse organisée qui reprend l'essentiel." },
        { term: "Exemple", definition: "Cas concret qui illustre une idée." },
      ],
      exercises: [
        { title: "Réponse claire", difficulty: "easy", prompt: "Qu'est-ce qui rend une réponse claire ?", correction: "Un vocabulaire précis et des idées bien ordonnées." },
        { title: "Rôle de l'exemple", difficulty: "easy", prompt: "Pourquoi ajouter un exemple à une idée ?", correction: "Pour l'illustrer et la rendre plus convaincante." },
        { title: "Organiser la réponse", difficulty: "medium", prompt: "Dans quel ordre organise-t-on une réponse ?", correction: "Idée, explication, exemple, puis courte conclusion." },
        { title: "Reprendre l'essentiel", difficulty: "medium", prompt: "Que doit contenir une synthèse ?", correction: "Les idées essentielles reprises de façon organisée." },
        { title: "Rédiger une synthèse", difficulty: "hard", prompt: "Rédige une mini-synthèse (idée + exemple + conclusion) sur une valeur étudiée.", correction: "Exemple — Idée : la solidarité rapproche les gens. Exemple : aider un voisin malade. Conclusion : elle renforce la société." },
      ],
    },
  ],
};

function chapterContentFor(book, chapter) {
  const chapters = chapterContent[book.id];
  if (!Array.isArray(chapters)) return null;
  const index = book.chapters.indexOf(chapter);
  return chapters[index] || null;
}

// Figures dessinées (SVG originaux) pour illustrer les exercices : courbes,
// circuits, schémas et coupes. Elles remplacent proprement les images du manuel.
const chapterFigures = {
  "math-parabola": `<svg viewBox="0 0 320 200" role="img" aria-label="Courbe d'une parabole">
      <line x1="20" y1="170" x2="300" y2="170" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="160" y1="20" x2="160" y2="188" stroke="#94a3b8" stroke-width="1.5" />
      <polyline points="100,40 120,105 140,150 160,168 180,150 200,105 220,40" fill="none" stroke="#0f766e" stroke-width="3" />
      <circle cx="160" cy="168" r="3.5" fill="#b45309" />
      <text x="290" y="186" font-size="12" fill="#64748b">x</text>
      <text x="144" y="30" font-size="12" fill="#64748b">y</text>
      <text x="166" y="186" font-size="11" fill="#64748b">O</text>
    </svg>`,
  "math-affine": `<svg viewBox="0 0 320 200" role="img" aria-label="Droite d'une fonction affine">
      <line x1="20" y1="150" x2="300" y2="150" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="60" y1="20" x2="60" y2="185" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="40" y1="168" x2="280" y2="46" stroke="#0f766e" stroke-width="3" />
      <circle cx="60" cy="158" r="3.5" fill="#b45309" />
      <text x="290" y="166" font-size="12" fill="#64748b">x</text>
      <text x="44" y="30" font-size="12" fill="#64748b">y</text>
    </svg>`,
  "math-vectors": `<svg viewBox="0 0 320 200" role="img" aria-label="Deux points et le vecteur AB">
      <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#0f766e" /></marker></defs>
      <g stroke="#e2e8f0" stroke-width="1">
        <line x1="40" y1="40" x2="40" y2="170" /><line x1="90" y1="40" x2="90" y2="170" /><line x1="140" y1="40" x2="140" y2="170" /><line x1="190" y1="40" x2="190" y2="170" /><line x1="240" y1="40" x2="240" y2="170" /><line x1="290" y1="40" x2="290" y2="170" />
        <line x1="40" y1="40" x2="290" y2="40" /><line x1="40" y1="90" x2="290" y2="90" /><line x1="40" y1="140" x2="290" y2="140" />
      </g>
      <line x1="90" y1="150" x2="240" y2="60" stroke="#0f766e" stroke-width="3" marker-end="url(#arrow)" />
      <circle cx="90" cy="150" r="4" fill="#b45309" /><text x="76" y="166" font-size="13" fill="#334155">A</text>
      <circle cx="240" cy="60" r="4" fill="#b45309" /><text x="246" y="56" font-size="13" fill="#334155">B</text>
    </svg>`,
  "phys-circuit": `<svg viewBox="0 0 320 180" role="img" aria-label="Circuit électrique en série">
      <rect x="45" y="35" width="230" height="110" fill="none" stroke="#334155" stroke-width="2.5" />
      <line x1="39" y1="72" x2="39" y2="94" stroke="#0f766e" stroke-width="5" />
      <line x1="51" y1="80" x2="51" y2="86" stroke="#0f766e" stroke-width="9" />
      <text x="14" y="88" font-size="12" fill="#0f766e">G</text>
      <circle cx="160" cy="35" r="13" fill="#fff" stroke="#b45309" stroke-width="2.5" />
      <line x1="151" y1="26" x2="169" y2="44" stroke="#b45309" stroke-width="2" /><line x1="169" y1="26" x2="151" y2="44" stroke="#b45309" stroke-width="2" />
      <text x="150" y="18" font-size="12" fill="#b45309">L</text>
      <rect x="269" y="72" width="12" height="36" fill="#fff" stroke="#334155" stroke-width="2.5" />
      <text x="286" y="94" font-size="12" fill="#334155">R</text>
    </svg>`,
  "phys-motion-graph": `<svg viewBox="0 0 320 200" role="img" aria-label="Graphique distance-temps">
      <line x1="45" y1="165" x2="300" y2="165" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="45" y1="20" x2="45" y2="165" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="45" y1="165" x2="270" y2="45" stroke="#0f766e" stroke-width="3" />
      <text x="276" y="180" font-size="12" fill="#64748b">t (s)</text>
      <text x="10" y="30" font-size="12" fill="#64748b">d (m)</text>
    </svg>`,
  "chem-water": `<svg viewBox="0 0 320 190" role="img" aria-label="Molécule d'eau H2O">
      <line x1="160" y1="80" x2="112" y2="128" stroke="#64748b" stroke-width="5" />
      <line x1="160" y1="80" x2="208" y2="128" stroke="#64748b" stroke-width="5" />
      <circle cx="160" cy="80" r="30" fill="#0f766e" /><text x="152" y="86" font-size="18" fill="#fff">O</text>
      <circle cx="106" cy="132" r="19" fill="#cbd5e1" /><text x="100" y="138" font-size="14" fill="#1f2937">H</text>
      <circle cx="214" cy="132" r="19" fill="#cbd5e1" /><text x="208" y="138" font-size="14" fill="#1f2937">H</text>
    </svg>`,
  "chem-atom": `<svg viewBox="0 0 320 200" role="img" aria-label="Modèle d'un atome">
      <circle cx="160" cy="100" r="48" fill="none" stroke="#94a3b8" stroke-width="1.5" />
      <circle cx="160" cy="100" r="78" fill="none" stroke="#94a3b8" stroke-width="1.5" />
      <circle cx="160" cy="100" r="16" fill="#b45309" />
      <circle cx="208" cy="100" r="5" fill="#0f766e" /><circle cx="112" cy="100" r="5" fill="#0f766e" />
      <circle cx="160" cy="22" r="5" fill="#0f766e" /><circle cx="160" cy="178" r="5" fill="#0f766e" />
      <circle cx="216" cy="140" r="5" fill="#0f766e" /><circle cx="104" cy="60" r="5" fill="#0f766e" />
    </svg>`,
  "svt-cross-section": `<svg viewBox="0 0 320 180" role="img" aria-label="Coupe géologique en strates">
      <rect x="30" y="40" width="260" height="26" fill="#9cc0d8" /><text x="296" y="58" font-size="10" fill="#334155">récent</text>
      <rect x="30" y="66" width="260" height="30" fill="#a7c4a0" />
      <rect x="30" y="96" width="260" height="34" fill="#d8b483" />
      <rect x="30" y="130" width="260" height="30" fill="#c08a57" /><text x="296" y="149" font-size="10" fill="#334155">ancien</text>
      <g stroke="#00000022" stroke-width="1"><line x1="30" y1="66" x2="290" y2="66" /><line x1="30" y1="96" x2="290" y2="96" /><line x1="30" y1="130" x2="290" y2="130" /></g>
    </svg>`,
  "svt-temp-graph": `<svg viewBox="0 0 320 200" role="img" aria-label="Courbe de température">
      <line x1="45" y1="165" x2="300" y2="165" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="45" y1="20" x2="45" y2="165" stroke="#94a3b8" stroke-width="1.5" />
      <polyline points="45,150 95,120 145,80 195,55 245,50 290,49" fill="none" stroke="#b45309" stroke-width="3" />
      <text x="272" y="180" font-size="12" fill="#64748b">t (min)</text>
      <text x="8" y="30" font-size="12" fill="#64748b">T (°C)</text>
    </svg>`,
};

const chapterFigureCaptions = {
  "math-parabola": "Courbe d'une fonction du second degré (parabole).",
  "math-affine": "Droite représentative d'une fonction affine.",
  "math-vectors": "Repère : points A, B et vecteur AB.",
  "phys-circuit": "Circuit série : générateur (G), lampe (L) et résistor (R).",
  "phys-motion-graph": "Distance parcourue en fonction du temps (mouvement uniforme).",
  "chem-water": "Molécule d'eau : un atome d'oxygène et deux d'hydrogène.",
  "chem-atom": "Modèle d'un atome : noyau et électrons sur leurs couches.",
  "svt-cross-section": "Coupe géologique : les strates récentes recouvrent les anciennes.",
  "svt-temp-graph": "Évolution de la température au cours du temps.",
};

function figureSvg(name) {
  return chapterFigures[name] || "";
}

const els = {
  languageButtons: document.querySelectorAll("[data-language]"),
  uploadForm: document.querySelector("#uploadForm"),
  fileInput: document.querySelector("#fileInput"),
  dropZone: document.querySelector("#dropZone"),
  selectedFiles: document.querySelector("#selectedFiles"),
  titleInput: document.querySelector("#titleInput"),
  lessonInput: document.querySelector("#lessonInput"),
  subjectInput: document.querySelector("#subjectInput"),
  subjectQuickFilters: document.querySelector("#subjectQuickFilters"),
  typeInput: document.querySelector("#typeInput"),
  tagsInput: document.querySelector("#tagsInput"),
  noteInput: document.querySelector("#noteInput"),
  addSubjectButton: document.querySelector("#addSubjectButton"),
  addSubjectQuick: document.querySelector("#addSubjectQuick"),
  deleteSubjectButton: document.querySelector("#deleteSubjectButton"),
  subjectDialog: document.querySelector("#subjectDialog"),
  subjectForm: document.querySelector("#subjectForm"),
  newSubjectInput: document.querySelector("#newSubjectInput"),
  deleteSubjectDialog: document.querySelector("#deleteSubjectDialog"),
  deleteSubjectInput: document.querySelector("#deleteSubjectInput"),
  subjectPage: document.querySelector("#subjectPage"),
  subjectPageTitle: document.querySelector("#subjectPageTitle"),
  subjectOfficialContent: document.querySelector("#subjectOfficialContent"),
  closeSubjectPage: document.querySelector("#closeSubjectPage"),
  importWordButton: document.querySelector("#importWordButton"),
  wordImportInput: document.querySelector("#wordImportInput"),
  sheetForm: document.querySelector("#sheetForm"),
  sheetTitleInput: document.querySelector("#sheetTitleInput"),
  sheetLessonInput: document.querySelector("#sheetLessonInput"),
  sheetEditor: document.querySelector("#sheetEditor"),
  yearInput: document.querySelector("#yearInput"),
  searchInput: document.querySelector("#searchInput"),
  subjectFilter: document.querySelector("#subjectFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  sortInput: document.querySelector("#sortInput"),
  documentGrid: document.querySelector("#documentGrid"),
  emptyState: document.querySelector("#emptyState"),
  bookSearchInput: document.querySelector("#bookSearchInput"),
  bookSubjectInput: document.querySelector("#bookSubjectInput"),
  bookResourceInput: document.querySelector("#bookResourceInput"),
  chapterPickerTitle: document.querySelector("#chapterPickerTitle"),
  chapterBookInput: document.querySelector("#chapterBookInput"),
  chapterInput: document.querySelector("#chapterInput"),
  chapterDetail: document.querySelector("#chapterDetail"),
  chapterPicker: document.querySelector("#chapterPicker"),
  studyBreadcrumb: document.querySelector("#studyBreadcrumb"),
  studyHub: document.querySelector("#studyHub"),
  appNavTabs: document.querySelectorAll("[data-app-view]"),
  statsBand: document.querySelector(".stats-band"),
  subjectBand: document.querySelector(".subject-band"),
  documentLibrary: document.querySelector("#documentLibrary"),
  studyTabs: document.querySelectorAll("[data-study-view]"),
  booksView: document.querySelector("#booksView"),
  courseView: document.querySelector("#courseView"),
  bookGrid: document.querySelector("#bookGrid"),
  bookEmptyState: document.querySelector("#bookEmptyState"),
  courseMenu: document.querySelector("#courseMenu"),
  courseDetail: document.querySelector("#courseDetail"),
  docCount: document.querySelector("#docCount"),
  totalSize: document.querySelector("#totalSize"),
  subjectCount: document.querySelector("#subjectCount"),
  visibleCount: document.querySelector("#visibleCount"),
  appVersion: document.querySelector("#appVersion"),
  clearFilters: document.querySelector("#clearFilters"),
  exportBackup: document.querySelector("#exportBackup"),
  installApp: document.querySelector("#installApp"),
  confirmDialog: document.querySelector("#confirmDialog"),
  deleteTarget: document.querySelector("#deleteTarget"),
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
      store.createIndex("subject", "subject", { unique: false });
      store.createIndex("type", "type", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(mode = "readonly") {
  return state.db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

function getAllDocuments() {
  return new Promise((resolve, reject) => {
    const request = transaction().getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveDocument(documentRecord) {
  return new Promise((resolve, reject) => {
    const request = transaction("readwrite").put(documentRecord);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function removeDocument(id) {
  return new Promise((resolve, reject) => {
    const request = transaction("readwrite").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function formatBytes(bytes) {
  if (!bytes) return state.language === "ar" ? "0 م.ب" : "0 Mo";
  const units = state.language === "ar" ? ["بايت", "ك.ب", "م.ب", "غ.ب"] : ["octets", "Ko", "Mo", "Go"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function normalize(value) {
  return value.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function fileTitle(fileName) {
  return fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getKind(documentRecord) {
  const mime = documentRecord.mime || "";
  const name = documentRecord.fileName.toLowerCase();
  if (documentRecord.type === "Feuille" || mime.includes("html") || name.endsWith(".html")) return "sheet";
  if (mime.includes("pdf") || name.endsWith(".pdf")) return "pdf";
  if (mime.startsWith("image/")) return "image";
  if (/\.(docx?|pptx?|xlsx?)$/.test(name)) return "office";
  return "file";
}

function iconForKind(kind) {
  const icons = {
    pdf: "file-text",
    sheet: "file-pen-line",
    image: "image",
    office: "presentation",
    file: "file",
  };
  return icons[kind] || icons.file;
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);

  requestAnimationFrame(() => node.classList.add("visible"));
  window.setTimeout(() => {
    node.classList.remove("visible");
    window.setTimeout(() => node.remove(), 220);
  }, 2600);
}

function languageBundle() {
  return uiText[state.language] || uiText.fr;
}

function translate(key, params = {}) {
  const value = languageBundle()[key] ?? uiText.fr[key] ?? key;
  return value.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function displaySubject(subject) {
  return languageBundle().subjectLabels?.[subject] || subject;
}

function displayType(type) {
  return languageBundle().typeLabels?.[type] || type;
}

function displayDifficulty(difficulty) {
  const keys = {
    easy: "difficultyEasy",
    medium: "difficultyMedium",
    hard: "difficultyHard",
  };
  return translate(keys[difficulty] || "allDifficulties");
}

function difficultyOptions() {
  return [
    { value: "all", label: translate("allDifficulties") },
    { value: "easy", label: displayDifficulty("easy") },
    { value: "medium", label: displayDifficulty("medium") },
    { value: "hard", label: displayDifficulty("hard") },
  ];
}

function correctedExercisesLabel(count) {
  return count === 1 ? translate("correctedExerciseCountOne") : translate("correctedExercisesCount", { count });
}

function practiceSummaryLabel(exercises) {
  return translate("practiceSummary", { count: exercises.length });
}

function problemsSummaryLabel(exercises) {
  return translate("problemsSummary", { count: exercises.length });
}

function examsSummaryLabel(exams) {
  return translate("examsSummary", { count: exams.length });
}

function setText(selector, key, params = {}) {
  const node = document.querySelector(selector);
  if (node) node.textContent = translate(key, params);
}

function setPlaceholder(element, key) {
  if (element) element.placeholder = translate(key);
}

function setControlLabel(control, key) {
  const label = control?.closest("label");
  if (!label) return;

  const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) {
    textNode.textContent = `\n              ${translate(key)}\n              `;
  }
}

function setIconButton(selector, icon, key) {
  const button = document.querySelector(selector);
  if (button) {
    button.innerHTML = `<i data-lucide="${icon}"></i><span>${escapeHtml(translate(key))}</span>`;
  }
}

function setSelectOptions(select, options, selectedValue) {
  if (!select) return;
  const current = selectedValue ?? select.value;
  select.innerHTML = "";

  options.forEach((option) => {
    const node = document.createElement("option");
    node.value = option.value;
    node.textContent = option.label;
    select.appendChild(node);
  });

  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

function renderTypeInputOptions() {
  setSelectOptions(
    els.typeInput,
    defaultTypes.map((type) => ({ value: type, label: displayType(type) }))
  );
}

function renderBookResourceOptions() {
  setSelectOptions(els.bookResourceInput, [
    { value: "", label: translate("allContent") },
    { value: "pdf", label: translate("resourcePdf") },
    { value: "summary", label: translate("resourceSummary") },
    { value: "exercise", label: translate("resourceExercise") },
    { value: "video", label: translate("resourceVideo") },
  ]);
}

function renderSortOptions() {
  setSelectOptions(els.sortInput, [
    { value: "newest", label: translate("sortNewest") },
    { value: "oldest", label: translate("sortOldest") },
    { value: "title", label: translate("sortTitle") },
    { value: "subject", label: translate("sortSubject") },
    { value: "size", label: translate("sortSize") },
  ]);
}

function loadLanguagePreference() {
  const saved = localStorage.getItem(UI_LANGUAGE_KEY);
  return saved === "ar" ? "ar" : "fr";
}

function setLanguage(language) {
  state.language = language === "ar" ? "ar" : "fr";
  localStorage.setItem(UI_LANGUAGE_KEY, state.language);
  applyLanguage();
  updateFilters();
  renderStudyResources();
  renderCourseDetail(state.activeCourseId);
  renderStats();
  renderDocuments();
}

function applyLanguage() {
  const bundle = languageBundle();
  document.documentElement.lang = state.language;
  document.documentElement.dir = bundle.dir;
  document.title = translate("appTitle");
  document.querySelector('meta[name="apple-mobile-web-app-title"]')?.setAttribute("content", translate("appleTitle"));

  els.languageButtons.forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active.toString());
  });

  setText(".app-header .eyebrow", "level");
  setText(".app-header h1", "headerTitle");
  if (els.appVersion) els.appVersion.textContent = APP_VERSION;
  setText('[data-app-view="programme"] span', "navProgramme");
  setText('[data-app-view="documents"] span', "navDocuments");
  setIconButton("#installApp", "download", "install");
  els.exportBackup.title = translate("exportTitle");
  els.clearFilters.title = translate("resetTitle");
  setText(".stats-band article:nth-child(1) p", "documentsStat");
  setText(".stats-band article:nth-child(2) p", "storedStat");
  setText(".stats-band article:nth-child(3) p", "subjectsStat");
  setText(".subject-band .section-heading h2", "subjectsTitle");
  setIconButton("#addSubjectQuick", "book-plus", "addSubject");
  setIconButton("#deleteSubjectButton", "trash-2", "deleteSubject");
  setText("#studyHub .section-heading .eyebrow-light", "officialProgram");
  setText("#studyHub .section-heading h2", "studyTitle");
  setIconButton('[data-study-view="books"]', "book-open-check", "books");
  setIconButton('[data-study-view="course"]', "sparkles", "interactiveCourse");
  setText("#chapterPickerTitle", "chooseChapter");
  setControlLabel(els.chapterBookInput, "book");
  setControlLabel(els.chapterInput, "chapter");
  setPlaceholder(els.bookSearchInput, "searchKeyword");
  setText("#bookEmptyState h2", "emptyResult");
  setText("#bookEmptyState p", "emptyResultText");
  setText("#subjectPage .eyebrow-light", "subjectPage");
  setIconButton("#importWordButton", "file-up", "addWordSheet");
  setIconButton("#closeSubjectPage", "x", "close");
  setText("#sheetForm .panel-title h2", "createSheet");
  setControlLabel(els.sheetTitleInput, "title");
  setControlLabel(els.sheetLessonInput, "lesson");
  setPlaceholder(els.sheetTitleInput, "sheetTitlePlaceholder");
  setPlaceholder(els.sheetLessonInput, "sheetLessonPlaceholder");
  document.querySelector("#sheetForm .editor-toolbar")?.setAttribute("aria-label", translate("editorTools"));
  els.sheetEditor?.setAttribute("aria-label", translate("editorTools"));
  els.sheetEditor?.setAttribute("data-placeholder", translate("editorPlaceholder"));
  setIconButton("#sheetForm .primary-button", "save", "saveSheet");
  setText("#uploadForm .panel-title h2", "addDocument");
  setText("#dropZone strong", "chooseFiles");
  setText("#dropZone span", "acceptedFiles");
  setControlLabel(els.titleInput, "courseTitle");
  setControlLabel(els.subjectInput, "subject");
  setControlLabel(els.lessonInput, "lesson");
  setControlLabel(els.typeInput, "type");
  setControlLabel(els.yearInput, "year");
  setControlLabel(els.tagsInput, "tags");
  setControlLabel(els.noteInput, "note");
  setPlaceholder(els.titleInput, "titlePlaceholder");
  setPlaceholder(els.lessonInput, "lessonPlaceholder");
  setPlaceholder(els.tagsInput, "tagsPlaceholder");
  setPlaceholder(els.noteInput, "notePlaceholder");
  setIconButton("#addSubjectButton", "plus", "new");
  els.addSubjectButton.title = translate("addSubject");
  setIconButton("#uploadForm .primary-button", "save", "save");
  setText(".library-title h2", "myCourses");
  setPlaceholder(els.searchInput, "search");
  els.subjectFilter.title = translate("subject");
  els.typeFilter.title = translate("type");
  els.sortInput.title = translate("sortSize");
  setText("#emptyState h2", "noDocument");
  setText("#emptyState p", "noDocumentText");
  setText("#confirmDialog h2", "deleteDocTitle");
  setText("#subjectDialog h2", "newSubject");
  setControlLabel(els.newSubjectInput, "name");
  setPlaceholder(els.newSubjectInput, "namePlaceholder");
  setText("#deleteSubjectDialog h2", "deleteSubjectTitle");
  setControlLabel(els.deleteSubjectInput, "subject");
  setText("#deleteSubjectDialog p", "deleteSubjectText");

  document.querySelectorAll('button[value="cancel"]').forEach((button) => {
    button.textContent = translate("cancel");
  });
  document.querySelectorAll('button[value="delete"], button[value="delete-subject"]').forEach((button) => {
    button.textContent = translate("delete");
  });
  const addDialogButton = document.querySelector('button[value="add"]');
  if (addDialogButton) addDialogButton.textContent = translate("add");

  renderTypeInputOptions();
  renderBookResourceOptions();
  renderSortOptions();
  if (state.activeSubject) {
    els.subjectPageTitle.textContent = displaySubject(state.activeSubject);
    renderSubjectOfficialContent();
  }
  renderLucide();
}

function renderLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function manualPath(fileName) {
  return `${MANUAL_FOLDER}/${encodeURIComponent(fileName)}`;
}

function manualExercisePart(book, exercise) {
  const index = Number.isInteger(exercise.partIndex) ? exercise.partIndex : 0;
  return book.parts[index] || book.parts[0];
}

function manualExercisePath(book, exercise) {
  const part = manualExercisePart(book, exercise);
  if (!part) return "#";
  return `${manualPath(part.file)}${exercise.page ? `#page=${exercise.page}` : ""}`;
}

function officialManualExercisesFor(book, chapter, difficulty = state.activeDifficulty) {
  const chapterKey = normalize(chapter.title);
  const baseExercises = officialManualExercises.filter(
    (exercise) => exercise.bookId === book.id && normalize(exercise.chapter) === chapterKey
  );
  const exercises = completeOfficialManualExercises(book, chapter, baseExercises);

  if (!difficulty || difficulty === "all") return exercises;
  return exercises.filter((exercise) => exercise.difficulty === difficulty);
}

function completeOfficialManualExercises(book, chapter, baseExercises) {
  const target = officialExerciseTargetCount(book, chapter);
  if (!target || baseExercises.length >= target) return baseExercises;

  const missingCount = target - baseExercises.length;
  return [...baseExercises, ...generatedOfficialExercisesFor(book, chapter, baseExercises.length, missingCount)];
}

function officialExerciseTargetCount(book, chapter) {
  const matchedChapter = book?.chapters?.find((item) => normalize(item.title) === normalize(chapter.title));
  return Number.isFinite(matchedChapter?.officialExerciseCount) ? matchedChapter.officialExerciseCount : 0;
}

function generatedOfficialExercisesFor(book, chapter, baseCount, missingCount) {
  if (book.id === "math-sciences" && normalize(chapter.title) === "calcul algebrique") {
    const specific = mathAlgebraGeneratedOfficialExercises.slice(0, missingCount).map((exercise, index) => ({
      bookId: book.id,
      chapter: chapter.title,
      partIndex: 0,
      page: exercise.page || generatedOfficialPage(baseCount + index),
      source: exercise.source || `Serie complete - ${chapter.title}`,
      reference: exercise.reference || "Exercice complet d'entrainement aligne sur le chapitre du manuel.",
      generated: true,
      ...exercise,
    }));

    if (specific.length >= missingCount) return specific;

    return [
      ...specific,
      ...Array.from({ length: missingCount - specific.length }, (_, index) =>
        createGeneratedOfficialExercise(book, chapter, baseCount + specific.length + index)
      ),
    ];
  }

  return Array.from({ length: missingCount }, (_, index) => createGeneratedOfficialExercise(book, chapter, baseCount + index));
}

function generatedOfficialPage(index) {
  return 20 + Math.floor(index / 4) * 2;
}

function generatedDifficulty(index) {
  return ["easy", "easy", "medium", "medium", "hard", "medium", "easy"][index % 7];
}

function createGeneratedOfficialExercise(book, chapter, index) {
  const subject = normalize(book.subject);
  const number = index + 1;
  const difficulty = generatedDifficulty(index);
  const profile = generatedExerciseProfile(book, chapter, number);

  return {
    bookId: book.id,
    chapter: chapter.title,
    partIndex: Math.min(Math.floor(index / 12), Math.max(book.parts.length - 1, 0)),
    page: generatedOfficialPage(index),
    source: `Serie complete - ${chapter.title}`,
    title: profile.title,
    reference: "Exercice complet d'entrainement aligne sur le chapitre du manuel.",
    statement: profile.statement,
    questions: profile.questions,
    difficulty,
    correction: profile.correction,
    steps: profile.steps,
    keywords: profile.keywords?.length ? profile.keywords : generatedKeywordsFor(book, chapter),
    generated: true,
    ...(profile.figure ? { figure: profile.figure } : {}),
    ...(subject.includes("arabe") ? { language: "ar" } : {}),
  };
}

function generatedKeywordsFor(book, chapter) {
  return [book.subject, chapter.title]
    .concat(chapter.summary?.split(/[ ,.;:]+/).filter((word) => word.length > 4).slice(0, 4) || [])
    .map((word) => word.toString().toLowerCase());
}

function generatedExerciseProfile(book, chapter, number) {
  const subject = normalize(book.subject);
  const title = chapter.title;
  const summary = chapter.summary || book.summary;

  if (subject.includes("math")) return generatedMathProfile(title, number);
  if (subject.includes("physique")) return generatedPhysicsProfile(title, number);
  if (subject.includes("chimie")) return generatedChemistryProfile(title, number);
  if (subject.includes("svt") || subject.includes("vie") || subject.includes("terre")) return generatedSvtProfile(title, number);
  if (subject.includes("technologie")) return generatedTechnologyProfile(title, number);
  if (subject.includes("francais")) return generatedFrenchProfile(title, number);
  if (subject.includes("anglais")) return generatedEnglishProfile(title, number);
  if (subject.includes("arabe")) return generatedArabicProfile(title, number);
  if (subject.includes("histoire")) return generatedHistoryProfile(title, number);
  if (subject.includes("geographie")) return generatedGeographyProfile(title, number);
  if (subject.includes("civique")) return generatedCivicsProfile(title, number);
  if (subject.includes("islamique")) return generatedIslamicProfile(title, number);

  return generatedGenericProfile(book.subject, title, summary, number);
}

function generatedMathProfile(chapterTitle, number) {
  const variant = number % 6;
  const a = number + 2;
  const b = number + 5;
  const c = number % 5 + 2;

  if (variant === 0) {
    return {
      title: `Application ${number} - Calculer et verifier`,
      statement: `On considere l'expression A(x) = ${c}x + ${b}.`,
      questions: [`Calcule A(${number % 4 + 1}).`, `Resous A(x) = ${a + b}.`, "Verifie la solution dans l'expression de depart."],
      correction: "On remplace x par la valeur demandee, puis on isole x dans l'equation.",
      steps: [`A(${number % 4 + 1}) = ${c} × ${number % 4 + 1} + ${b} = ${c * (number % 4 + 1) + b}.`, `A(x) = ${a + b} donne ${c}x + ${b} = ${a + b}.`, `${c}x = ${a}, donc x = ${a}/${c}.`, "La verification consiste a remplacer cette valeur dans A(x)."],
      keywords: ["calcul", "equation", "verification"],
    };
  }

  if (variant === 1) {
    return {
      title: `Application ${number} - Developper`,
      statement: "Developpe puis reduis les expressions suivantes.",
      questions: [`A = ${c}(x + ${a}) - ${number % 4 + 1}x.`, `B = (x + ${c})(x - ${number % 6 + 1}).`, `C = (${c}x - 1)².`],
      correction: "On distribue chaque produit, puis on regroupe les termes semblables.",
      steps: [`A = ${c}x + ${c * a} - ${number % 4 + 1}x = ${c - (number % 4 + 1)}x + ${c * a}.`, `B = x² + ${c - (number % 6 + 1)}x - ${c * (number % 6 + 1)}.`, `C = ${c * c}x² - ${2 * c}x + 1.`, "On controle les signes avant de recopier le resultat final."],
      keywords: ["developper", "reduire", "identite remarquable"],
    };
  }

  if (variant === 2) {
    return {
      title: `Application ${number} - Factoriser`,
      statement: "Factorise les expressions proposees.",
      questions: [`A = ${c}x + ${c * a}.`, `B = x² - ${a * a}.`, `C = (x - ${c})(2x + 1) + ${b}(x - ${c}).`],
      correction: "On cherche un facteur commun ou une identite remarquable.",
      steps: [`A = ${c}(x + ${a}).`, `B = x² - ${a}² = (x - ${a})(x + ${a}).`, `C = (x - ${c})[(2x + 1) + ${b}] = (x - ${c})(2x + ${b + 1}).`, "La factorisation est correcte si le developpement redonne l'expression initiale."],
      keywords: ["factorisation", "facteur commun", "identite remarquable"],
    };
  }

  if (variant === 3) {
    return {
      title: `Application ${number} - Resoudre`,
      statement: "Resous les equations suivantes dans R.",
      questions: [`(x - ${c})(x + ${a}) = 0.`, `${c}x - ${b} = ${a}.`, `x² - ${c * c} = 0.`],
      correction: "On applique la regle adaptee : produit nul, isolement ou difference de carres.",
      steps: [`(x - ${c})(x + ${a}) = 0 donne x = ${c} ou x = -${a}.`, `${c}x - ${b} = ${a} donne ${c}x = ${a + b}, donc x = ${a + b}/${c}.`, `x² - ${c * c} = 0 donne x = ${c} ou x = -${c}.`, "Chaque solution est verifiee dans l'equation de depart."],
      keywords: ["equation", "produit nul", "resolution"],
    };
  }

  if (variant === 4) {
    return {
      title: `Application ${number} - Probleme`,
      statement: "Un probleme numerique doit etre traduit par une equation.",
      questions: [`Un nombre augmente de ${a} donne ${a + b}. Trouve ce nombre.`, `Le double d'un nombre diminue de ${c} vaut ${b}. Trouve ce nombre.`, "Redige une phrase de conclusion."],
      correction: "On pose x pour le nombre inconnu et on traduit chaque phrase.",
      steps: [`x + ${a} = ${a + b}, donc x = ${b}.`, `2x - ${c} = ${b}, donc 2x = ${b + c} et x = ${(b + c)}/2.`, "On remplace chaque valeur trouvee dans la phrase initiale.", "La conclusion doit reprendre l'unite ou le contexte du probleme."],
      keywords: ["probleme", "equation", "traduction"],
    };
  }

  return {
    title: `Application ${number} - Synthese ${chapterTitle}`,
    statement: `Exercice de synthese du chapitre ${chapterTitle}.`,
    questions: [`Developpe (x + ${c})(x + ${a}).`, `Factorise x² + ${2 * c}x + ${c * c}.`, `Resous (x + ${c})(x - ${a}) = 0.`],
    correction: "La synthese combine developpement, factorisation et resolution.",
    steps: [`(x + ${c})(x + ${a}) = x² + ${a + c}x + ${a * c}.`, `x² + ${2 * c}x + ${c * c} = (x + ${c})².`, `(x + ${c})(x - ${a}) = 0 donne x = -${c} ou x = ${a}.`, "On presente les resultats dans l'ordre des questions."],
    keywords: ["synthese", "calcul", "chapitre"],
  };
}

function generatedPhysicsProfile(chapterTitle, number) {
  const distance = 20 + number * 2;
  const time = 4 + (number % 6);
  const voltage = 6 + (number % 5) * 2;
  const intensity = 0.5 + (number % 4) * 0.25;

  return {
    title: `Exercice ${number} - Mesure et interpretation`,
    statement: `Situation de physique liee au chapitre ${chapterTitle}.`,
    questions: [`Un mobile parcourt ${distance} m en ${time} s. Calcule sa vitesse moyenne.`, `Un dipole est soumis a U = ${voltage} V et I = ${intensity} A. Calcule la grandeur utile si la relation U = R x I s'applique.`, "Redige une interpretation physique du resultat."],
    correction: "On choisit la relation adaptee, on remplace avec les unites correctes puis on interprete.",
    steps: [`v = d / t = ${distance} / ${time} = ${(distance / time).toFixed(2)} m/s.`, `R = U / I = ${voltage} / ${intensity} = ${(voltage / intensity).toFixed(2)} ohms.`, "Le resultat numerique doit toujours etre accompagne de son unite.", "L'interpretation explique ce que mesure la grandeur dans la situation."],
    keywords: ["mesure", "vitesse", "electricite", "interpretation"],
  };
}

function generatedChemistryProfile(chapterTitle, number) {
  const mass = 2 + number;
  const molarMass = 20 + (number % 5) * 10;
  const volume = 0.25 + (number % 4) * 0.25;
  const amount = mass / molarMass;

  return {
    title: `Exercice ${number} - Matiere et transformation`,
    statement: `Exercice de chimie lie au chapitre ${chapterTitle}.`,
    questions: [`On dispose de ${mass} g d'une espece de masse molaire ${molarMass} g/mol. Calcule n.`, `La solution obtenue a un volume de ${volume.toFixed(2)} L. Calcule C.`, "Explique la methode utilisee."],
    correction: "On calcule d'abord la quantite de matiere, puis la concentration si un volume est donne.",
    steps: [`n = m / M = ${mass} / ${molarMass} = ${amount.toFixed(3)} mol.`, `C = n / V = ${amount.toFixed(3)} / ${volume.toFixed(2)} = ${(amount / volume).toFixed(3)} mol.L-1.`, "Le volume doit etre exprime en litre avant le calcul.", "La conclusion indique la valeur et l'unite."],
    keywords: ["chimie", "mole", "concentration", "reaction"],
  };
}

function generatedSvtProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Analyse de document`,
    statement: `Document scientifique du chapitre ${chapterTitle} : on observe un schema, une carte ou un tableau accompagne d'une legende.`,
    questions: ["Identifie la nature du document et les informations donnees par la legende.", "Releve deux indices scientifiques utiles.", "Redige une conclusion qui relie les observations a l'explication."],
    correction: "On part des indices visibles du document et on evite de repondre uniquement de memoire.",
    steps: ["Je lis le titre, l'echelle, les unites et la legende.", "Je releve deux indices precis : forme, couleur, valeur, position ou relation entre elements.", "J'interprete ces indices avec le vocabulaire du chapitre.", "Je termine par une conclusion courte et justifiee."],
    keywords: ["svt", "document", "observation", "conclusion"],
  };
}

function generatedTechnologyProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Systeme technique`,
    statement: `On etudie un systeme technique en lien avec le chapitre ${chapterTitle}.`,
    questions: ["Formule le besoin ou la fonction globale du systeme.", "Classe les composants dans les fonctions adaptees.", "Explique la circulation de l'information ou de l'energie."],
    correction: "On relie chaque fonction technique a un composant reel du systeme.",
    steps: ["Je commence par formuler le besoin avec un verbe d'action.", "Je distingue les fonctions : acquerir, traiter, communiquer, alimenter, convertir, transmettre.", "Je place les composants dans l'ordre logique de fonctionnement.", "Je conclus par une phrase qui explique le role global du systeme."],
    keywords: ["technologie", "systeme", "fonction", "energie", "information"],
  };
}

function generatedFrenchProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Lecture et expression`,
    statement: `Activite de francais liee au chapitre ${chapterTitle}.`,
    questions: ["Lis la consigne et releve les mots importants.", "Redige une reponse complete avec une justification.", "Reformule l'idee essentielle en deux lignes maximum."],
    correction: "La reponse doit etre claire, justifiee et correctement redigee.",
    steps: ["Je repere le type de travail : comprehension, vocabulaire, resume ou production.", "Je donne une idee principale.", "J'ajoute un indice ou un exemple pour justifier.", "Je relis la ponctuation, les accords et les connecteurs."],
    keywords: ["francais", "lecture", "redaction", "resume"],
  };
}

function generatedEnglishProfile(chapterTitle, number) {
  return {
    title: `Exercise ${number} - Reading and writing`,
    statement: `English activity related to the chapter ${chapterTitle}.`,
    questions: ["Read the instruction and identify the main idea.", "Write a complete answer with one justification.", "Use two useful words from the chapter in correct sentences."],
    correction: "A good answer is clear, justified and grammatically correct.",
    steps: ["I identify the task: reading, vocabulary, grammar or writing.", "I write a short answer with a subject, verb and complement.", "I justify my answer with one detail.", "I check spelling, connectors and subject-verb agreement."],
    keywords: ["english", "reading", "writing", "vocabulary"],
  };
}

function generatedArabicProfile(chapterTitle, number) {
  return {
    title: `تمرين ${number} - فهم وتعبير`,
    statement: `نشاط عربي مرتبط بمحور ${chapterTitle}.`,
    questions: ["اقرأ التعليمة وحدد الفكرة الرئيسية.", "استخرج قرينتين من النص أو من السند.", "اكتب إجابة منظمة في فقرة قصيرة."],
    correction: "تكون الإجابة الجيدة واضحة ومعللة ومرتبطة بالسند.",
    steps: ["أحدد نوع المطلوب: فهم، لغة أو إنتاج كتابي.", "أستخرج فكرة رئيسية ثم أساندها بدليل.", "أستعمل مفردات مناسبة وروابط واضحة.", "أراجع سلامة الجمل وعلامات الترقيم."],
    keywords: ["عربية", "فهم", "تعبير", "لغة"],
  };
}

function generatedHistoryProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Document historique`,
    statement: `Analyse un document historique en lien avec ${chapterTitle}.`,
    questions: ["Presente le document : nature, auteur si possible, date et contexte.", "Releve deux informations historiques importantes.", "Redige une conclusion qui explique l'interet du document."],
    correction: "L'analyse historique commence par la presentation du document puis l'explication des informations.",
    steps: ["Je precise la nature du document et son contexte.", "Je releve des informations datees ou localisees.", "J'explique le sens historique des informations relevees.", "Je termine par une conclusion courte et argumentee."],
    keywords: ["histoire", "document", "chronologie", "contexte"],
  };
}

function generatedGeographyProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Croquis et carte`,
    statement: `Analyse un document geographique en lien avec ${chapterTitle}.`,
    questions: ["Lis le titre, l'echelle et la legende.", "Localise le phenomene et releve deux informations spatiales.", "Redige une conclusion geographique."],
    correction: "La geographie demande de localiser, de decrire puis d'expliquer.",
    steps: ["Je commence par les elements de lecture : titre, echelle, legende.", "Je localise le phenomene dans l'espace.", "Je compare les zones ou les valeurs observees.", "Je conclus en reliant localisation et explication."],
    keywords: ["geographie", "carte", "localisation", "legende"],
  };
}

function generatedCivicsProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Situation civique`,
    statement: `Etudie une situation de vie collective liee au chapitre ${chapterTitle}.`,
    questions: ["Identifie le droit, le devoir ou la valeur civique concernee.", "Explique le probleme pose par la situation.", "Propose un comportement responsable."],
    correction: "Une reponse civique relie la situation a une regle, un droit, un devoir ou une valeur.",
    steps: ["Je lis la situation et je repere les acteurs.", "J'identifie la regle ou la valeur concernee.", "J'explique les consequences du comportement.", "Je propose une solution responsable et respectueuse de la loi."],
    keywords: ["civique", "droit", "devoir", "citoyennete"],
  };
}

function generatedIslamicProfile(chapterTitle, number) {
  return {
    title: `Exercice ${number} - Comprendre et appliquer`,
    statement: `Activite de pensee islamique liee au chapitre ${chapterTitle}.`,
    questions: ["Degage l'idee principale du support.", "Explique une valeur ou une notion importante.", "Donne un exemple d'application dans la vie quotidienne."],
    correction: "La reponse doit expliquer la notion et montrer son effet dans le comportement.",
    steps: ["Je lis le support et j'identifie l'idee centrale.", "Je definis la valeur ou la notion avec des mots simples.", "Je donne un exemple concret et respectueux du contexte.", "Je conclus par l'effet positif sur l'individu ou la societe."],
    keywords: ["pensee islamique", "valeur", "comportement", "application"],
  };
}

function generatedGenericProfile(subject, chapterTitle, summary, number) {
  return {
    title: `Exercice ${number} - ${chapterTitle}`,
    statement: `Activite complete en ${subject} sur le chapitre ${chapterTitle}.`,
    questions: [summary || "Explique les notions principales du chapitre.", "Reponds avec des phrases completes et justifiees.", "Termine par une conclusion claire."],
    correction: "La correction suit la methode du chapitre et exige une justification.",
    steps: ["Je lis attentivement la consigne.", "Je releve les donnees importantes.", "J'applique la methode du chapitre.", "Je redige une conclusion claire et verifiee."],
    keywords: [subject, chapterTitle, "exercice", "correction"],
  };
}

const mathAlgebraGeneratedOfficialExercises = [
  {
    title: "Equations du premier degre",
    difficulty: "easy",
    page: 33,
    statement: "Resous dans R les equations donnees.",
    questions: ["3x - 7 = 11.", "5 - 2x = 13.", "4(x - 1) = 2x + 6."],
    correction: "On isole l'inconnue en effectuant la meme operation dans les deux membres.",
    steps: ["3x - 7 = 11 donne 3x = 18, donc x = 6.", "5 - 2x = 13 donne -2x = 8, donc x = -4.", "4(x - 1) = 2x + 6 donne 4x - 4 = 2x + 6, donc 2x = 10 et x = 5.", "On verifie en remplaçant x dans chaque equation de depart."],
    keywords: ["equation", "premier degre", "calcul litteral"],
  },
  {
    title: "Equations avec produits",
    difficulty: "easy",
    page: 33,
    statement: "Developpe si necessaire, puis resous les equations.",
    questions: ["2(x + 3) = 18.", "5(x - 2) - 3x = 4.", "3(2x - 1) = 4x + 7."],
    correction: "On developpe, on regroupe les termes en x puis on isole x.",
    steps: ["2(x + 3) = 18 donne 2x + 6 = 18, donc x = 6.", "5(x - 2) - 3x = 4 donne 5x - 10 - 3x = 4, donc 2x = 14 et x = 7.", "3(2x - 1) = 4x + 7 donne 6x - 3 = 4x + 7, donc 2x = 10 et x = 5.", "La solution est acceptee seulement si elle verifie l'equation initiale."],
    keywords: ["equation", "developper", "produit"],
  },
  {
    title: "Equations et carres",
    difficulty: "medium",
    page: 33,
    statement: "Resous dans R les equations contenant des carres.",
    questions: ["x² = 49.", "(x - 2)² = 9.", "4x² - 25 = 0."],
    correction: "Une equation du type A² = k se resout avec les deux racines lorsque k est positif.",
    steps: ["x² = 49 donne x = 7 ou x = -7.", "(x - 2)² = 9 donne x - 2 = 3 ou x - 2 = -3, donc x = 5 ou x = -1.", "4x² - 25 = 0 donne (2x)² - 5² = 0, donc (2x - 5)(2x + 5) = 0.", "Les solutions de la derniere equation sont x = 5/2 ou x = -5/2."],
    keywords: ["equation", "carre", "identite remarquable"],
  },
  {
    title: "Fractions rationnelles",
    difficulty: "medium",
    page: 33,
    statement: "Resous les equations en precisant les valeurs interdites.",
    questions: ["(6t + 8) / (1 - t) = 3.", "4 / x = x / 3.", "1 / y + 1 / (y + 1) = 0."],
    correction: "Avant de multiplier, on exclut les valeurs qui annulent les denominateurs.",
    steps: ["Pour (6t + 8)/(1 - t) = 3, t ≠ 1. On obtient 6t + 8 = 3 - 3t, donc 9t = -5 et t = -5/9.", "Pour 4/x = x/3, x ≠ 0. Produit en croix : 12 = x², donc x = 2√3 ou x = -2√3.", "Pour 1/y + 1/(y+1) = 0, y ≠ 0 et y ≠ -1. On obtient (y + 1 + y)/(y(y+1)) = 0, donc 2y + 1 = 0.", "La derniere solution est y = -1/2, elle est autorisee."],
    keywords: ["equation", "fraction", "valeur interdite"],
  },
  {
    title: "Equations quadratiques",
    difficulty: "medium",
    page: 33,
    statement: "Resous les equations suivantes par factorisation.",
    questions: ["4x² + 3x - 1 = 0.", "x² - 2x - 8 = 0.", "9x² - 12x + 4 = 0."],
    correction: "On transforme chaque expression en produit ou en carre remarquable.",
    steps: ["4x² + 3x - 1 = (4x - 1)(x + 1), donc x = 1/4 ou x = -1.", "x² - 2x - 8 = (x - 4)(x + 2), donc x = 4 ou x = -2.", "9x² - 12x + 4 = (3x - 2)², donc x = 2/3.", "On ecrit l'ensemble des solutions pour chaque equation."],
    keywords: ["equation", "factorisation", "second degre"],
  },
  {
    title: "Produit nul avance",
    difficulty: "medium",
    page: 34,
    statement: "Mets sous forme de produit nul puis resous.",
    questions: ["(x + 2)(x - 5) + (x + 2)(3x - 1) = 0.", "x² - 6x + 9 = 0.", "(2x - 1)² - 16 = 0."],
    correction: "On factorise avant d'appliquer la regle du produit nul.",
    steps: ["(x + 2)[(x - 5) + (3x - 1)] = (x + 2)(4x - 6) = 0, donc x = -2 ou x = 3/2.", "x² - 6x + 9 = (x - 3)², donc x = 3.", "(2x - 1)² - 16 = [(2x - 1) - 4][(2x - 1) + 4] = (2x - 5)(2x + 3).", "Les solutions sont x = 5/2 ou x = -3/2."],
    keywords: ["produit nul", "factorisation", "identite remarquable"],
  },
  {
    title: "Inequations produits",
    difficulty: "medium",
    page: 34,
    statement: "Resous les inequations en dressant un tableau de signes.",
    questions: ["(x - 3)(x + 2) ≤ 0.", "(2x - 1)(x - 4) > 0.", "x(x + 5) ≥ 0."],
    correction: "Les signes changent aux racines de chaque facteur.",
    steps: ["Pour (x - 3)(x + 2) ≤ 0, les racines sont -2 et 3. Le produit est negatif entre les racines : solution [-2 ; 3].", "Pour (2x - 1)(x - 4) > 0, les racines sont 1/2 et 4. Le produit est positif a l'exterieur : ]-∞ ; 1/2[ ∪ ]4 ; +∞[.", "Pour x(x + 5) ≥ 0, les racines sont -5 et 0. Le produit est positif a l'exterieur : ]-∞ ; -5] ∪ [0 ; +∞[.", "On inclut les bornes seulement lorsque l'inegalite accepte l'egalite."],
    keywords: ["inequation", "produit", "signe"],
  },
  {
    title: "Inequations avec quotient",
    difficulty: "hard",
    page: 34,
    statement: "Resous les inequations rationnelles.",
    questions: ["(x - 2) / (x + 1) ≥ 0.", "(3x + 6) / (x - 4) < 0.", "x / (2x - 1) ≤ 1."],
    correction: "On note les valeurs interdites puis on etudie le signe du quotient.",
    steps: ["Pour (x - 2)/(x + 1) ≥ 0, x ≠ -1. Les points critiques sont -1 et 2. Solution : ]-∞ ; -1[ ∪ [2 ; +∞[.", "Pour (3x + 6)/(x - 4) < 0, x ≠ 4 et le numerateur s'annule en -2. Solution : ]-2 ; 4[.", "x/(2x - 1) ≤ 1 equivaut a x/(2x - 1) - 1 ≤ 0, soit (1 - x)/(2x - 1) ≤ 0 avec x ≠ 1/2.", "Les points critiques sont 1/2 et 1. Solution : ]-∞ ; 1/2[ ∪ [1 ; +∞[."],
    keywords: ["inequation", "quotient", "valeur interdite"],
  },
  {
    title: "Valeur absolue",
    difficulty: "hard",
    page: 34,
    statement: "Resous les equations et inequations avec valeur absolue.",
    questions: ["|x - 3| = 5.", "|2x + 1| ≤ 7.", "|x - 2| > 4."],
    correction: "La valeur absolue mesure une distance sur la droite reelle.",
    steps: ["|x - 3| = 5 donne x - 3 = 5 ou x - 3 = -5, donc x = 8 ou x = -2.", "|2x + 1| ≤ 7 equivaut a -7 ≤ 2x + 1 ≤ 7, donc -8 ≤ 2x ≤ 6 et -4 ≤ x ≤ 3.", "|x - 2| > 4 signifie que la distance a 2 est strictement superieure a 4.", "La solution est x < -2 ou x > 6, soit ]-∞ ; -2[ ∪ ]6 ; +∞[."],
    keywords: ["valeur absolue", "equation", "inequation"],
  },
  {
    title: "Racines carrees",
    difficulty: "hard",
    page: 34,
    statement: "Resous en tenant compte des conditions d'existence.",
    questions: ["√(2x + 6) = x - 1.", "√(x + 5) = 3.", "√x < x - 2."],
    correction: "Une racine carree impose un radicande positif et un second membre compatible.",
    steps: ["Pour √(2x + 6) = x - 1, il faut x ≥ 1. En elevant au carre : 2x + 6 = (x - 1)² = x² - 2x + 1.", "On obtient x² - 4x - 5 = 0, donc (x - 5)(x + 1) = 0. Seule la solution x = 5 respecte x ≥ 1.", "√(x + 5) = 3 donne x + 5 = 9, donc x = 4.", "Pour √x < x - 2, il faut x ≥ 0 et x - 2 > 0, donc x > 2. Apres carre : x < (x - 2)², soit x² - 5x + 4 > 0. Avec x > 2, solution ]4 ; +∞[."],
    keywords: ["racine carree", "equation", "condition"],
  },
  {
    title: "Developper et reduire",
    difficulty: "easy",
    page: 35,
    statement: "Developpe puis reduis les expressions.",
    questions: ["A = 4(2x - 3) - 5(x + 1).", "B = (x + 2)(x + 5).", "C = (3x - 1)(2x + 4)."],
    correction: "On distribue chaque facteur puis on regroupe les termes semblables.",
    steps: ["A = 8x - 12 - 5x - 5 = 3x - 17.", "B = x² + 5x + 2x + 10 = x² + 7x + 10.", "C = 6x² + 12x - 2x - 4 = 6x² + 10x - 4.", "On relit les signes, surtout lorsqu'un signe moins precede une parenthese."],
    keywords: ["developper", "reduire", "calcul litteral"],
  },
  {
    title: "Identites remarquables",
    difficulty: "medium",
    page: 35,
    statement: "Utilise les identites remarquables pour developper ou factoriser.",
    questions: ["Developpe (x + 7)².", "Developpe (2x - 3)².", "Factorise x² - 16."],
    correction: "On applique les formules (a+b)², (a-b)² et a²-b².",
    steps: ["(x + 7)² = x² + 14x + 49.", "(2x - 3)² = 4x² - 12x + 9.", "x² - 16 = x² - 4² = (x - 4)(x + 4).", "L'identification de a et b evite les developpements longs."],
    keywords: ["identite remarquable", "developper", "factoriser"],
  },
  {
    title: "Factorisation par facteur commun",
    difficulty: "easy",
    page: 35,
    statement: "Factorise en cherchant un facteur commun.",
    questions: ["A = 6x + 12.", "B = 5x² - 10x.", "C = (x - 1)(3x + 2) + 4(x - 1)."],
    correction: "Le facteur commun est mis devant une parenthese.",
    steps: ["A = 6(x + 2).", "B = 5x(x - 2).", "C = (x - 1)[(3x + 2) + 4] = (x - 1)(3x + 6) = 3(x - 1)(x + 2).", "On peut verifier en redeveloppant."],
    keywords: ["factorisation", "facteur commun"],
  },
  {
    title: "Equations apres factorisation",
    difficulty: "medium",
    page: 35,
    statement: "Factorise puis resous l'equation.",
    questions: ["x² + 5x = 0.", "3x² - 12x = 0.", "(x + 4)² - 9 = 0."],
    correction: "La factorisation transforme l'equation en produit nul.",
    steps: ["x² + 5x = x(x + 5), donc x = 0 ou x = -5.", "3x² - 12x = 3x(x - 4), donc x = 0 ou x = 4.", "(x + 4)² - 9 = [(x + 4) - 3][(x + 4) + 3] = (x + 1)(x + 7).", "La derniere equation donne x = -1 ou x = -7."],
    keywords: ["equation", "factorisation", "produit nul"],
  },
  {
    title: "Expressions numeriques",
    difficulty: "easy",
    page: 36,
    statement: "Calcule la valeur des expressions pour les valeurs donnees.",
    questions: ["A = 2x² - 3x + 1 pour x = -2.", "B = (x - 1)(x + 4) pour x = 3.", "C = x² - y² pour x = 5 et y = 2."],
    correction: "On remplace les lettres par les valeurs en respectant les parentheses.",
    steps: ["A(-2) = 2×(-2)² - 3×(-2) + 1 = 8 + 6 + 1 = 15.", "B(3) = (3 - 1)(3 + 4) = 2×7 = 14.", "C = 5² - 2² = 25 - 4 = 21.", "Les carres de nombres negatifs sont positifs."],
    keywords: ["calcul litteral", "valeur numerique"],
  },
  {
    title: "Encadrement et ordre",
    difficulty: "medium",
    page: 36,
    statement: "Travaille avec des inegalites simples.",
    questions: ["Si -2 ≤ x ≤ 5, encadre x + 3.", "Si -2 ≤ x ≤ 5, encadre -2x.", "Explique pourquoi le sens de l'inegalite change."],
    correction: "Ajouter conserve l'ordre ; multiplier par un nombre negatif inverse l'ordre.",
    steps: ["En ajoutant 3 : 1 ≤ x + 3 ≤ 8.", "En multipliant par -2, on inverse les signes : 4 ≥ -2x ≥ -10.", "On reecrit dans l'ordre croissant : -10 ≤ -2x ≤ 4.", "Le sens change car la multiplication par un nombre negatif renverse l'ordre sur la droite reelle."],
    keywords: ["ordre", "inegalite", "encadrement"],
  },
  {
    title: "Probleme d'age",
    difficulty: "medium",
    page: 36,
    statement: "Un pere a 42 ans et son fils a 12 ans.",
    questions: ["Dans combien d'annees l'age du pere sera-t-il le double de l'age du fils ?", "Pose l'equation avec x.", "Verifie la solution."],
    correction: "On traduit la phrase par une equation.",
    steps: ["Dans x annees, le pere aura 42 + x ans et le fils 12 + x ans.", "On veut 42 + x = 2(12 + x).", "42 + x = 24 + 2x, donc x = 18.", "Verification : dans 18 ans, le pere aura 60 ans et le fils 30 ans ; 60 est bien le double de 30."],
    keywords: ["probleme", "equation", "age"],
  },
  {
    title: "Entiers consecutifs",
    difficulty: "medium",
    page: 36,
    statement: "On cherche cinq entiers naturels consecutifs dont la somme est comprise entre 2004 et 2009.",
    questions: ["Exprime les cinq entiers avec n.", "Encadre la somme.", "Donne les entiers possibles."],
    correction: "Cinq entiers consecutifs s'ecrivent n, n+1, n+2, n+3, n+4.",
    steps: ["La somme vaut 5n + 10.", "On cherche 2004 ≤ 5n + 10 ≤ 2009.", "1994 ≤ 5n ≤ 1999, donc 398,8 ≤ n ≤ 399,8.", "Le seul entier possible est n = 399. Les entiers sont 399, 400, 401, 402 et 403."],
    keywords: ["probleme", "entiers consecutifs", "inequation"],
  },
  {
    title: "Moyenne d'un examen",
    difficulty: "hard",
    page: 36,
    statement: "Dans un examen, la moyenne des admis est 13, celle des refuses est 7 et la moyenne de tous les candidats est 10,60.",
    questions: ["Si p est la proportion des admis, ecris l'equation de moyenne ponderee.", "Determine p.", "Donne le pourcentage d'admis."],
    correction: "La moyenne totale est une moyenne ponderee des deux groupes.",
    steps: ["On pose p la proportion des admis ; la proportion des refuses est 1 - p.", "13p + 7(1 - p) = 10,60.", "13p + 7 - 7p = 10,60, donc 6p = 3,60 et p = 0,60.", "Le pourcentage d'admis est 60 %."],
    keywords: ["moyenne", "pourcentage", "probleme"],
  },
  {
    title: "Aire d'un carre",
    difficulty: "medium",
    page: 37,
    statement: "On diminue de 3 cm la longueur des cotes d'un carre et son aire diminue de 12 cm².",
    questions: ["Pose x la longueur initiale du cote.", "Ecris l'equation traduisant la diminution d'aire.", "Trouve x."],
    correction: "L'aire initiale est x² et la nouvelle aire est (x - 3)².",
    steps: ["La diminution d'aire vaut x² - (x - 3)².", "On pose x² - (x - 3)² = 12.", "x² - (x² - 6x + 9) = 12, donc 6x - 9 = 12.", "6x = 21, donc x = 3,5 cm."],
    keywords: ["aire", "carre", "equation"],
  },
  {
    title: "Probleme de geometrie",
    difficulty: "hard",
    page: 37,
    statement: "Un rectangle a une longueur egale au double de sa largeur. Si on augmente la largeur de 3 cm et diminue la longueur de 2 cm, l'aire devient 84 cm².",
    questions: ["Pose x la largeur initiale.", "Ecris l'equation obtenue.", "Determine les dimensions initiales."],
    correction: "On traduit les dimensions par des expressions en x.",
    steps: ["La largeur initiale est x et la longueur initiale est 2x.", "Les nouvelles dimensions sont x + 3 et 2x - 2.", "On ecrit (x + 3)(2x - 2) = 84.", "2x² + 4x - 6 = 84, donc x² + 2x - 45 = 0 = (x + 9)(x - 5). Comme x > 0, x = 5. Dimensions initiales : 5 cm et 10 cm."],
    keywords: ["geometrie", "aire", "equation"],
  },
  {
    title: "Signe d'une expression",
    difficulty: "medium",
    page: 37,
    statement: "Etudie le signe des expressions suivantes.",
    questions: ["A(x) = 2x - 6.", "B(x) = (x + 1)(x - 3).", "C(x) = -3(x - 2)."],
    correction: "On repere les valeurs qui annulent chaque facteur.",
    steps: ["A s'annule en x = 3 ; A est negatif avant 3 et positif apres 3.", "B s'annule en -1 et 3 ; le produit est positif a l'exterieur et negatif entre les racines.", "C s'annule en 2 ; comme le coefficient -3 est negatif, C est positif avant 2 et negatif apres 2.", "Le tableau de signes resume ces resultats par intervalles."],
    keywords: ["signe", "expression", "facteur"],
  },
  {
    title: "Comparaison de deux expressions",
    difficulty: "medium",
    page: 37,
    statement: "Compare A(x) = x² - 4 et B(x) = 2x - 1 selon les valeurs de x.",
    questions: ["Calcule A(x) - B(x).", "Factorise l'expression obtenue.", "Deduis les intervalles ou A(x) ≥ B(x)."],
    correction: "Comparer deux expressions revient a etudier le signe de leur difference.",
    steps: ["A - B = x² - 4 - (2x - 1) = x² - 2x - 3.", "x² - 2x - 3 = (x - 3)(x + 1).", "Le produit est positif ou nul a l'exterieur des racines -1 et 3.", "Donc A(x) ≥ B(x) sur ]-∞ ; -1] ∪ [3 ; +∞[."],
    keywords: ["comparaison", "inequation", "factorisation"],
  },
  {
    title: "Parametre simple",
    difficulty: "hard",
    page: 38,
    statement: "On considere l'equation (m - 2)x = 6 selon la valeur du parametre m.",
    questions: ["Resous l'equation si m ≠ 2.", "Que se passe-t-il si m = 2 ?", "Donne une phrase de conclusion."],
    correction: "Un parametre peut changer la nature de l'equation.",
    steps: ["Si m ≠ 2, on peut diviser par m - 2 et x = 6/(m - 2).", "Si m = 2, l'equation devient 0 × x = 6, soit 0 = 6, impossible.", "Il n'y a donc aucune solution pour m = 2.", "Conclusion : une solution unique si m ≠ 2, aucune solution si m = 2."],
    keywords: ["parametre", "equation", "discussion"],
  },
  {
    title: "Systeme de deux equations",
    difficulty: "medium",
    page: 38,
    statement: "Resous le systeme suivant par substitution.",
    questions: ["x + y = 11.", "2x - y = 4.", "Verifie le couple solution."],
    correction: "On exprime une inconnue en fonction de l'autre puis on remplace.",
    steps: ["De x + y = 11, on obtient y = 11 - x.", "On remplace dans 2x - y = 4 : 2x - (11 - x) = 4.", "3x - 11 = 4, donc 3x = 15 et x = 5. Alors y = 6.", "Verification : 5 + 6 = 11 et 2×5 - 6 = 4."],
    keywords: ["systeme", "equation", "substitution"],
  },
  {
    title: "Probleme de vitesse",
    difficulty: "hard",
    page: 38,
    statement: "Un cycliste parcourt une distance de 30 km. Au retour, sa vitesse est superieure de 5 km/h et il met 30 minutes de moins.",
    questions: ["Pose v la vitesse a l'aller.", "Ecris l'equation avec les temps en heures.", "Determine v."],
    correction: "Le temps vaut distance divisee par vitesse.",
    steps: ["Temps aller : 30/v. Temps retour : 30/(v + 5).", "Le retour dure 0,5 h de moins : 30/v - 30/(v + 5) = 0,5.", "On multiplie par v(v + 5) : 30(v + 5) - 30v = 0,5v(v + 5).", "150 = 0,5v² + 2,5v, donc v² + 5v - 300 = 0. La solution positive est v = 15 km/h."],
    keywords: ["probleme", "vitesse", "equation"],
  },
  {
    title: "Synthese calcul algebrique",
    difficulty: "hard",
    page: 38,
    statement: "Exercice de synthese : factorisation, equation et interpretation.",
    questions: ["Factorise P(x) = x² - x - 12.", "Resous P(x) = 0.", "Determine le signe de P(x) selon x."],
    correction: "La forme factorisee permet de resoudre et d'etudier le signe.",
    steps: ["P(x) = x² - x - 12 = (x - 4)(x + 3).", "P(x) = 0 donne x = 4 ou x = -3.", "Le coefficient dominant est positif, donc P est positif a l'exterieur des racines et negatif entre elles.", "Conclusion : P(x) > 0 sur ]-∞ ; -3[ ∪ ]4 ; +∞[, P(x) = 0 pour -3 et 4, P(x) < 0 sur ]-3 ; 4[."],
    keywords: ["synthese", "factorisation", "signe"],
  },
];

function exerciseSearchText(exercise) {
  return normalize([exercise.title, exercise.reference, exercise.source, ...(exercise.keywords || [])].join(" "));
}

function exerciseHasTopic(exercise, ...topics) {
  const text = exerciseSearchText(exercise);
  return topics.some((topic) => text.includes(normalize(topic)));
}

function makeOfficialContent(intro, questions, steps, correctionIntro = "") {
  return { intro, questions, steps, correctionIntro };
}

function officialExerciseFullContentFor(book, chapter, exercise) {
  if (exercise.statement || exercise.questions?.length) {
    return makeOfficialContent(
      exercise.statement || exercise.reference,
      exercise.questions || [],
      exercise.steps?.length ? exercise.steps : officialGenericCorrectionSteps(book, chapter, exercise),
      exercise.correction
    );
  }

  if (book.id === "math-sciences") {
    if (exerciseHasTopic(exercise, "produit nul")) {
      return makeOfficialContent(
        "Résous les équations suivantes en utilisant la factorisation et la règle du produit nul.",
        ["(x - 3)(2x + 5) = 0.", "x² - 9 = 0.", "(x + 1)(x - 4) = 0, puis vérifie les solutions trouvées."],
        [
          "(x - 3)(2x + 5) = 0 : un produit est nul si l'un de ses facteurs est nul, donc x = 3 ou 2x + 5 = 0, soit x = -5/2.",
          "x² - 9 = 0 : on factorise x² - 3² = (x - 3)(x + 3). Les solutions sont x = 3 ou x = -3.",
          "(x + 1)(x - 4) = 0 donne x = -1 ou x = 4.",
          "La vérification consiste à remplacer chaque valeur dans l'équation initiale : au moins un facteur devient nul, donc le produit vaut bien 0.",
        ],
        "On transforme chaque équation en produit de facteurs, puis on applique la règle du produit nul."
      );
    }
    if (exerciseHasTopic(exercise, "polynome", "reduire", "ordonner")) {
      return makeOfficialContent(
        "Réduis, ordonne et identifie le degré de chaque polynôme.",
        ["A = 3x² - 5x + 2 + 7x - x² - 4.", "B = 2(3x - 1) - 4(x + 2).", "Classe A et B selon leur degré après réduction."],
        [
          "A = 3x² - x² - 5x + 7x + 2 - 4 = 2x² + 2x - 2. Son degré est 2.",
          "B = 2(3x - 1) - 4(x + 2) = 6x - 2 - 4x - 8 = 2x - 10. Son degré est 1.",
          "Les polynômes sont ordonnés selon les puissances décroissantes de x.",
          "Le contrôle final consiste à vérifier qu'on n'a additionné que des termes de même nature.",
        ],
        "On regroupe les termes semblables puis on écrit le résultat dans l'ordre demandé."
      );
    }
    if (exerciseHasTopic(exercise, "factorisation", "identite remarquable")) {
      return makeOfficialContent(
        "Factorise les expressions puis utilise la forme factorisée pour résoudre l'équation demandée.",
        ["Factorise E = (x - 2)(3x + 1) + (x - 2)(x - 5).", "Résous E = 0.", "Factorise F = 9x² - 25."],
        [
          "Dans E, le facteur commun est (x - 2) : E = (x - 2)[(3x + 1) + (x - 5)].",
          "On réduit : E = (x - 2)(4x - 4) = 4(x - 2)(x - 1).",
          "E = 0 donne x = 2 ou x = 1.",
          "F = 9x² - 25 = (3x)² - 5² = (3x - 5)(3x + 5).",
        ],
        "On cherche d'abord un facteur commun ou une identité remarquable, puis on applique le produit nul si nécessaire."
      );
    }
    if (exerciseHasTopic(exercise, "domaine")) {
      return makeOfficialContent(
        "Détermine le domaine de définition des fonctions suivantes.",
        ["f(x) = (2x + 1) / (x - 3).", "g(x) = √(x + 4).", "h(x) = (x - 1) / [(x + 2)(x - 5)]."],
        [
          "f est définie si x - 3 ≠ 0, donc x ≠ 3.",
          "g est définie si x + 4 ≥ 0, donc x ≥ -4.",
          "h est définie si (x + 2)(x - 5) ≠ 0, donc x ≠ -2 et x ≠ 5.",
          "On conclut en donnant clairement les valeurs interdites et l'ensemble des valeurs autorisées.",
        ],
        "Le domaine se trouve en repérant les divisions par zéro et les racines carrées impossibles."
      );
    }
    if (exerciseHasTopic(exercise, "parabole", "intersection", "courbe", "droite")) {
      return makeOfficialContent(
        "Compare la courbe de f(x) = x² - 4 avec la droite g(x) = x + 2.",
        ["Résous f(x) = g(x).", "Donne les coordonnées des points d'intersection.", "Indique où f(x) est au-dessus de g(x)."],
        [
          "On résout x² - 4 = x + 2, donc x² - x - 6 = 0.",
          "On factorise : x² - x - 6 = (x - 3)(x + 2). Les abscisses sont x = 3 et x = -2.",
          "Pour x = 3, y = 5 ; pour x = -2, y = 0. Les points sont (3 ; 5) et (-2 ; 0).",
          "Le signe de (x - 3)(x + 2) montre que f(x) ≥ g(x) sur ]-∞ ; -2] ∪ [3 ; +∞[.",
        ],
        "Les intersections se calculent en égalant les deux expressions."
      );
    }
    if (exerciseHasTopic(exercise, "vecteur", "barycentre", "repere", "coordonnees", "geometrie")) {
      return makeOfficialContent(
        "Dans un repère, on donne A(1 ; 2), B(4 ; 6), C(-1 ; 3) et D(2 ; 4).",
        ["Calcule les coordonnées de AB et BC.", "Calcule AC et vérifie la relation AB + BC = AC.", "Calcule le milieu de [AD]."],
        [
          "AB = (4 - 1 ; 6 - 2) = (3 ; 4).",
          "BC = (-1 - 4 ; 3 - 6) = (-5 ; -3).",
          "AC = (-1 - 1 ; 3 - 2) = (-2 ; 1) et AB + BC = (3 ; 4) + (-5 ; -3) = (-2 ; 1).",
          "Le milieu de [AD] est ((1 + 2)/2 ; (2 + 4)/2) = (3/2 ; 3).",
        ],
        "En géométrie analytique, on applique les formules de coordonnées puis on justifie la propriété utilisée."
      );
    }
    if (exerciseHasTopic(exercise, "thales", "longueur")) {
      return makeOfficialContent(
        "Dans le triangle ABC, D appartient à [AB] et E appartient à [AC]. On donne AD = 3 cm, AB = 6 cm, AE = 4 cm et AC = 8 cm.",
        ["Compare AD/AB et AE/AC.", "Dis si (DE) et (BC) sont parallèles.", "Nomme la propriété utilisée."],
        ["AD/AB = 3/6 = 1/2.", "AE/AC = 4/8 = 1/2.", "Les rapports sont égaux, donc d'après la réciproque du théorème de Thalès, (DE) est parallèle à (BC).", "La justification doit citer l'égalité des rapports et l'ordre des points."],
        "On vérifie les rapports de longueurs avant d'appliquer Thalès ou sa réciproque."
      );
    }
    if (exerciseHasTopic(exercise, "statistiques", "tableau", "donnees", "interpretation")) {
      return makeOfficialContent(
        "Une série statistique donne les notes 8, 10, 12 et 14 avec les effectifs 2, 5, 4 et 1.",
        ["Calcule l'effectif total.", "Détermine le mode et la médiane.", "Calcule la moyenne arrondie au centième."],
        ["Effectif total : 2 + 5 + 4 + 1 = 12.", "Le mode est 10 car c'est la valeur la plus fréquente.", "La médiane est la moyenne de la 6e et de la 7e valeur : (10 + 12) / 2 = 11.", "Moyenne = (8×2 + 10×5 + 12×4 + 14×1) / 12 = 128 / 12 ≈ 10,67."],
        "On commence par l'effectif total, puis on calcule les indicateurs demandés."
      );
    }
  }

  if (book.id === "physique") {
    if (exerciseHasTopic(exercise, "mouvement", "vitesse", "referentiel")) {
      return makeOfficialContent("Un mobile parcourt 60 m en 12 s sur une trajectoire rectiligne dans le référentiel terrestre.", ["Calcule sa vitesse moyenne.", "Précise la trajectoire.", "Explique le rôle du référentiel."], ["La vitesse moyenne vaut v = d / t = 60 / 12 = 5 m/s.", "La trajectoire est rectiligne car le chemin suivi est une droite.", "Le référentiel terrestre précise que le mouvement est décrit par rapport à la Terre.", "Une réponse complète donne la valeur, l'unité et le contexte de mesure."], "On décrit un mouvement avec un référentiel, une trajectoire et une vitesse.");
    }
    if (exerciseHasTopic(exercise, "energie cinetique")) {
      return makeOfficialContent("Une bille de masse 200 g se déplace à la vitesse de 10 m/s.", ["Convertis la masse en kilogrammes.", "Calcule l'énergie cinétique.", "Explique l'effet d'un doublement de la vitesse."], ["200 g = 0,200 kg.", "Ec = 1/2 × m × v² = 1/2 × 0,200 × 10² = 10 J.", "Si la vitesse double, v² est multiplié par 4.", "L'énergie cinétique serait donc multipliée par 4."], "On convertit les unités avant d'appliquer Ec = 1/2 × m × v².");
    }
    if (exerciseHasTopic(exercise, "ohm", "resistance", "lampe", "generateur", "tension", "puissance")) {
      return makeOfficialContent("Dans un circuit, un dipôle est soumis à une tension U = 6 V et traversé par un courant I = 0,03 A.", ["Calcule la résistance du dipôle.", "Prévois la tension si I = 0,05 A pour un dipôle ohmique.", "Explique comment reconnaître une tension alternative sur un graphe."], ["Pour un conducteur ohmique, U = R × I donc R = U / I = 6 / 0,03 = 200 Ω.", "Si I = 0,05 A, alors U = R × I = 200 × 0,05 = 10 V.", "Une tension alternative change de signe périodiquement ; une tension continue garde le même signe.", "Les unités attendues sont le volt pour U, l'ampère pour I et l'ohm pour R."], "Les exercices d'électricité se résolvent en identifiant la grandeur cherchée puis la relation adaptée."
      );
    }
    if (exerciseHasTopic(exercise, "interaction", "force", "systeme")) {
      return makeOfficialContent("Un livre est posé immobile sur une table. On choisit le livre comme système étudié.", ["Liste les objets qui exercent une action sur le livre.", "Nomme les forces correspondantes.", "Précise direction et sens de chaque force."], ["La Terre exerce le poids du livre, vertical vers le bas.", "La table exerce une réaction de contact, verticale vers le haut.", "Le livre étant immobile, ces forces se compensent si l'on néglige les autres actions.", "Chaque force doit être décrite par point d'application, direction, sens et valeur si elle est connue."], "On isole le système puis on inventorie les interactions avec l'extérieur.");
    }
  }

  if (book.id === "chimie") {
    if (exerciseHasTopic(exercise, "atome", "element", "isotope", "electron", "couche")) {
      return makeOfficialContent("Un atome X est caractérisé par A = 23 et Z = 11.", ["Donne le nombre de protons, d'électrons et de neutrons de l'atome neutre.", "Écris la répartition électronique sur K, L et M.", "Explique ce qui change si l'atome devient X+."], ["Z = 11 donne 11 protons et, pour un atome neutre, 11 électrons.", "Le nombre de neutrons vaut A - Z = 23 - 11 = 12.", "La répartition électronique est K2 L8 M1.", "L'ion X+ a perdu un électron : il possède 10 électrons, donc K2 L8."], "La structure atomique se déduit de A, Z et de la charge éventuelle de l'ion.");
    }
    if (exerciseHasTopic(exercise, "concentration", "solubilite", "solution", "ion")) {
      return makeOfficialContent("On dissout 5,85 g de NaCl dans l'eau pour obtenir 0,500 L de solution. M(NaCl) = 58,5 g/mol.", ["Calcule la quantité de matière dissoute.", "Calcule la concentration molaire.", "Explique comment identifier un ion chlorure avec un test chimique."], ["n = m / M = 5,85 / 58,5 = 0,100 mol.", "C = n / V = 0,100 / 0,500 = 0,200 mol.L-1.", "Un ion chlorure Cl- donne un précipité blanc avec le nitrate d'argent.", "La conclusion doit citer le réactif, l'observation et l'ion identifié."], "On combine calcul de quantité de matière et méthode d'identification des ions." );
    }
    if (exerciseHasTopic(exercise, "acide", "base", "hydrocarbure", "reaction", "formule")) {
      return makeOfficialContent("On étudie deux transformations chimiques : une réaction acido-basique et une réaction organique simple.", ["Écris l'équation H3O+ + OH-.", "Explique ce qui se passe à l'équivalence.", "Classe l'addition de Br2 sur l'éthène : substitution ou addition ?"], ["L'équation acido-basique est H3O+ + OH- → 2H2O.", "À l'équivalence, les réactifs sont introduits dans les proportions de l'équation.", "L'addition de Br2 sur l'éthène est une addition : la double liaison s'ouvre pour fixer deux atomes de brome.", "On justifie toujours avec les espèces chimiques et les proportions de l'équation."], "Une transformation chimique se traite avec l'équation, les réactifs et les produits formés." );
    }
  }

  if (book.id === "svt") {
    return makeOfficialContent(
      `Analyse un document scientifique sur le thème « ${exercise.title} » dans le chapitre « ${chapter.title} ».`,
      ["Lis le titre, la légende et les unités du document.", `Relève deux indices liés aux mots-clés : ${exercise.keywords?.join(", ") || exercise.title}.`, "Rédige une conclusion scientifique courte et justifiée."],
      ["Je commence par identifier la nature du document : carte, coupe, schéma, tableau ou texte scientifique.", "Je prélève les indices visibles au lieu de répondre de mémoire uniquement.", exercise.correction, "Je termine par une conclusion qui relie l'observation à l'explication scientifique."],
      "En SVT, une réponse complète part toujours des indices du document."
    );
  }

  if (book.id === "technologie") {
    return makeOfficialContent(
      `Étudie un système technique autour du thème « ${exercise.title} ».`,
      ["Indique le besoin ou la fonction globale du système.", `Classe les éléments utiles avec les mots-clés : ${exercise.keywords?.join(", ") || exercise.title}.`, "Explique le lien entre les fonctions ou les blocs du système."],
      ["Je commence par formuler le besoin avec un verbe d'action et un résultat attendu.", "Je sépare les fonctions techniques : acquérir, traiter, communiquer, alimenter, convertir ou transmettre selon le cas.", exercise.correction, "Je vérifie que chaque bloc est relié à un composant réel du système."],
      "En technologie, il faut relier chaque fonction à un composant observable."
    );
  }

  if (book.id === "francais") {
    return makeOfficialContent(
      `Travaille une activité de français sur « ${exercise.title} ».`,
      ["Lis la consigne et relève les mots importants.", "Réponds avec une phrase complète en citant un indice si le travail porte sur un texte.", "Termine par une reformulation ou une conclusion personnelle."],
      ["Je repère d'abord le type d'activité : compréhension, vocabulaire, résumé ou production écrite.", "Je construis la réponse avec une idée claire, puis une justification.", exercise.correction, "Je relis pour vérifier la fidélité au texte, les connecteurs et la ponctuation."],
      "Une réponse de français doit être claire, justifiée et correctement rédigée."
    );
  }

  if (book.id === "anglais") {
    return makeOfficialContent(
      `Work on the activity: ${exercise.title}.`,
      ["Read the instruction and identify the main idea.", `Use the key words: ${exercise.keywords?.join(", ") || exercise.title}.`, "Write a complete answer and justify it with one detail."],
      ["First, I identify the task: reading, vocabulary or writing.", "Then I choose useful words and build a grammatically correct sentence.", exercise.correction, "Finally, I check spelling, connectors and subject-verb agreement."],
      "A good English answer is clear, justified and grammatically correct."
    );
  }

  return makeOfficialContent(
    `Traite cet exercice complet à partir du thème « ${exercise.title} » du chapitre « ${chapter.title} » sans ouvrir le PDF.`,
    [`Relève les notions importantes liées à : ${exercise.keywords?.join(", ") || exercise.title}.`, "Réponds aux questions principales avec des phrases complètes et justifiées.", "Termine par une conclusion courte qui reprend le résultat ou l'idée essentielle."],
    officialGenericCorrectionSteps(book, chapter, exercise),
    exercise.correction
  );
}

function officialGenericCorrectionSteps(book, chapter, exercise) {
  return [
    `Je commence par identifier la matière (${displaySubject(book.subject)}) et le chapitre (${chapter.title}) pour choisir la méthode adaptée.`,
    `Je repère les mots-clés : ${exercise.keywords?.join(", ") || exercise.title}.`,
    exercise.correction,
    "Je vérifie que la réponse contient une justification, une unité si nécessaire et une conclusion claire.",
  ];
}

function officialStatementBlock(content) {
  const questions = content.questions?.length
    ? `<ol>${content.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>`
    : "";

  return `
    <section class="official-statement">
      <strong>${escapeHtml(translate("officialExerciseReference"))}</strong>
      <p>${escapeHtml(content.intro)}</p>
      ${questions}
    </section>
  `;
}

function officialCorrectionBlock(book, chapter, exercise, content, correctionId) {
  const methodBlock = officialCorrectionMethodBlock(book, chapter, exercise, content);
  const applicationSteps = officialApplicationSteps(book, chapter, exercise, content);
  const steps = applicationSteps.length
    ? teacherStepList(applicationSteps)
    : "";
  const intro = content.correctionIntro ? `<p>${escapeHtml(content.correctionIntro)}</p>` : "";
  const drawing = teacherDrawingBlock(book, chapter, exercise, content);

  return `
    <div class="chapter-correction official-correction" id="${escapeHtml(correctionId)}" hidden>
      <strong class="correction-heading">${escapeHtml(translate("correction"))}</strong>
      ${methodBlock}
      ${drawing}
      <section class="correction-application">
        <strong>${escapeHtml(translate("correctionApplicationTitle"))}</strong>
        ${intro}
        ${steps}
      </section>
    </div>
  `;
}

function officialApplicationSteps(book, chapter, exercise, content) {
  const steps = Array.isArray(content.steps) ? [...content.steps] : [];
  const fallbackSteps = officialGenericCorrectionSteps(book, chapter, exercise);

  for (const fallbackStep of fallbackSteps) {
    if (steps.length >= 5) break;
    if (!steps.some((step) => normalize(step) === normalize(fallbackStep))) {
      steps.push(fallbackStep);
    }
  }

  while (steps.length < 5) {
    steps.push("Je relis l'énoncé, je vérifie chaque question traitée et je termine par une phrase de conclusion claire.");
  }

  return steps;
}

function officialCorrectionMethodBlock(book, chapter, exercise, content) {
  const method = officialCorrectionMethodFor(book, chapter, exercise, content);
  const why = method.why ? `<p><strong>${escapeHtml(translate("correctionWhyTitle"))}</strong> ${escapeHtml(method.why)}</p>` : "";
  const steps = method.steps?.length
    ? `<ol class="method-steps">${method.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>`
    : "";
  const checks = method.checks?.length
    ? `<div class="correction-checklist"><strong>${escapeHtml(translate("correctionCheckTitle"))}</strong><ul>${method.checks
        .map((check) => `<li>${escapeHtml(check)}</li>`)
        .join("")}</ul></div>`
    : "";

  return `
    <section class="correction-method">
      <strong>${escapeHtml(translate("correctionMethodTitle"))}</strong>
      ${why}
      ${steps}
      ${checks}
    </section>
  `;
}

function teacherStepList(steps) {
  if (!Array.isArray(steps) || !steps.length) return "";
  return `
    <section class="teacher-explanation">
      <strong>${escapeHtml(translate("teacherExplanationTitle"))}</strong>
      <ol class="correction-steps teacher-steps">
        ${steps
          .map(
            (step, index) => `
              <li>
                <strong>${escapeHtml(translate("teacherStepPrefix", { number: index + 1 }))}</strong>
                <span><b>${escapeHtml(translate("teacherActionLabel"))}</b> ${escapeHtml(cleanMultilineText(step))}</span>
                <small><b>${escapeHtml(translate("teacherReasonLabel"))}</b> ${escapeHtml(teacherReasonForStep(step, index))}</small>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}

function teacherReasonForStep(step, index) {
  const text = normalize(step);
  if (text.includes("verif") || text.includes("controle")) {
    return "Cette vérification permet de confirmer que la réponse respecte bien l'énoncé de départ.";
  }
  if (text.includes("unite") || text.includes(" m/s") || text.includes(" mol") || text.includes("ohm") || text.includes("volt")) {
    return "L'unité donne le sens physique ou scientifique du nombre obtenu.";
  }
  if (text.includes("factor") || text.includes("produit nul") || text.includes("racine")) {
    return "On transforme l'expression pour utiliser une règle simple et éviter les calculs au hasard.";
  }
  if (text.includes("donc") || text.includes("=") || text.includes("⇒")) {
    return "Chaque égalité doit venir logiquement de la précédente : on ne saute pas les transformations.";
  }
  if (text.includes("document") || text.includes("indice") || text.includes("legende")) {
    return "On justifie avec des indices visibles pour éviter une réponse apprise sans preuve.";
  }
  if (index === 0) return "La première étape sert à choisir la bonne méthode avant de calculer.";
  return "Cette étape relie la méthode au résultat final et rend le raisonnement compréhensible.";
}

function teacherDrawingBlock(book, chapter, exercise, content) {
  const drawing = correctionDrawingFor(book, chapter, exercise, content);
  if (!drawing) return "";
  return `
    <section class="correction-drawing">
      <strong>${escapeHtml(translate("teacherBoardTitle"))}</strong>
      <div class="correction-drawing-frame">${drawing.svg}</div>
      <p>${escapeHtml(drawing.caption)}</p>
    </section>
  `;
}

function correctionDrawingFor(book, chapter, exercise, content) {
  const text = normalize([
    book?.subject,
    chapter?.title,
    exercise?.title,
    exercise?.prompt,
    exercise?.reference,
    exercise?.source,
    content?.intro,
    content?.correctionIntro,
    ...(exercise?.keywords || []),
  ].join(" "));

  if (exercise?.figure && figureSvg(exercise.figure)) {
    return { svg: figureSvg(exercise.figure), caption: chapterFigureCaptions[exercise.figure] || "Le croquis reprend la situation de l'exercice." };
  }
  if (text.includes("parabole") || text.includes("courbe") || text.includes("f(x)")) {
    return { svg: figureSvg("math-parabola"), caption: "Je place la courbe dans le repère, puis je lis les abscisses ou les intersections demandées." };
  }
  if (text.includes("fonction affine") || text.includes("droite")) {
    return { svg: figureSvg("math-affine"), caption: "La droite aide à lire une image, un antécédent ou une comparaison graphique." };
  }
  if (text.includes("vecteur") || text.includes("coordonne") || text.includes("repere") || text.includes("geometr")) {
    return { svg: figureSvg("math-vectors"), caption: "Je visualise les points dans le repère avant d'appliquer les formules." };
  }
  if (text.includes("equation") || text.includes("factor") || text.includes("develop") || text.includes("domaine") || text.includes("resous")) {
    return { svg: teacherBoardSvg("algebra"), caption: "Le schéma montre l'ordre de travail : comprendre, poser la condition, calculer, puis vérifier." };
  }
  if (text.includes("ohm") || text.includes("tension") || text.includes("resistance") || text.includes("circuit") || text.includes("lampe")) {
    return { svg: figureSvg("phys-circuit"), caption: "Je repère le générateur, le dipôle et les grandeurs U, I, R avant d'utiliser la relation." };
  }
  if (text.includes("mouvement") || text.includes("vitesse") || text.includes("trajectoire")) {
    return { svg: figureSvg("phys-motion-graph"), caption: "La pente du graphique distance-temps donne l'idée de vitesse." };
  }
  if (text.includes("force") || text.includes("interaction")) {
    return { svg: teacherBoardSvg("forces"), caption: "J'isole le système, puis je dessine les actions extérieures par des flèches." };
  }
  if (text.includes("atome") || text.includes("electron") || text.includes("noyau")) {
    return { svg: figureSvg("chem-atom"), caption: "Le modèle permet de distinguer noyau, électrons et couches électroniques." };
  }
  if (text.includes("molecule") || text.includes("formule")) {
    return { svg: figureSvg("chem-water"), caption: "Le schéma aide à relier formule chimique et composition de la molécule." };
  }
  if (text.includes("solution") || text.includes("concentration") || text.includes("reaction")) {
    return { svg: teacherBoardSvg("chemistry"), caption: "Je classe les données avant d'utiliser la formule ou l'équation chimique." };
  }
  if (text.includes("geologie") || text.includes("roche") || text.includes("coupe") || text.includes("strate")) {
    return { svg: figureSvg("svt-cross-section"), caption: "La coupe aide à lire l'ordre des couches et à justifier l'interprétation." };
  }
  if (text.includes("temperature") || text.includes("graphique")) {
    return { svg: figureSvg("svt-temp-graph"), caption: "Je lis l'évolution de la grandeur en suivant la courbe et les axes." };
  }
  if (text.includes("technologie") || text.includes("systeme") || text.includes("fonction") || text.includes("energie") || text.includes("information")) {
    return { svg: teacherBoardSvg("technology"), caption: "Le schéma relie besoin, fonction, composant et résultat attendu." };
  }
  if (text.includes("francais") || text.includes("lecture") || text.includes("resume") || text.includes("redaction") || text.includes("lire") || text.includes("ecrire") || text.includes("anglais") || text.includes("english") || text.includes("reading") || text.includes("writing") || text.includes("arabe") || text.includes("فهم") || text.includes("تعبير")) {
    return { svg: teacherBoardSvg("language"), caption: "Je lis la consigne, je repère l'idée, je justifie puis je rédige une réponse complète." };
  }
  if (text.includes("civique") || text.includes("citoyen") || text.includes("debat") || text.includes("valeur") || text.includes("islamique") || text.includes("argument")) {
    return { svg: teacherBoardSvg("argument"), caption: "Le schéma aide à construire une réponse argumentée : idée, preuve, exemple, conclusion." };
  }
  if (text.includes("document") || text.includes("carte") || text.includes("source") || text.includes("texte")) {
    return { svg: teacherBoardSvg("document"), caption: "Je pars du document, je relève les indices, puis je construis la conclusion." };
  }

  return { svg: teacherBoardSvg("document"), caption: "Ce croquis sert de plan de raisonnement : lire, relever les indices, expliquer, conclure." };
}

function teacherBoardSvg(kind) {
  const common = {
    algebra: ["Énoncé", "Condition", "Calcul", "Vérification"],
    chemistry: ["Données", "Formule", "Calcul", "Unité"],
    technology: ["Besoin", "Fonction", "Composant", "Résultat"],
    document: ["Document", "Indices", "Explication", "Conclusion"],
    language: ["Consigne", "Idée", "Preuve", "Réponse"],
    argument: ["Thème", "Argument", "Exemple", "Conclusion"],
  };
  if (kind === "forces") {
    return `<svg viewBox="0 0 320 180" role="img" aria-label="Bilan des forces">
      <rect x="120" y="78" width="80" height="38" rx="8" fill="#d1fae5" stroke="#0f766e" stroke-width="2" />
      <text x="143" y="101" font-size="13" fill="#065f46">système</text>
      <line x1="160" y1="72" x2="160" y2="28" stroke="#2563eb" stroke-width="3" />
      <polyline points="154,38 160,28 166,38" fill="none" stroke="#2563eb" stroke-width="3" />
      <text x="172" y="42" font-size="12" fill="#1d4ed8">réaction</text>
      <line x1="160" y1="122" x2="160" y2="160" stroke="#b45309" stroke-width="3" />
      <polyline points="154,150 160,160 166,150" fill="none" stroke="#b45309" stroke-width="3" />
      <text x="172" y="154" font-size="12" fill="#92400e">poids</text>
      <line x1="80" y1="120" x2="240" y2="120" stroke="#94a3b8" stroke-width="2" />
    </svg>`;
  }

  const labels = common[kind] || common.algebra;
  const xPositions = [28, 105, 182, 248];
  return `<svg viewBox="0 0 320 150" role="img" aria-label="Méthode au tableau">
    ${labels
      .map(
        (label, index) => `
          <rect x="${xPositions[index]}" y="42" width="58" height="40" rx="8" fill="#ffffff" stroke="#0f766e" stroke-width="2" />
          <text x="${xPositions[index] + 29}" y="66" text-anchor="middle" font-size="10" fill="#065f46">${label}</text>
          ${index < labels.length - 1 ? `<line x1="${xPositions[index] + 60}" y1="62" x2="${xPositions[index + 1] - 8}" y2="62" stroke="#2563eb" stroke-width="2" /><polyline points="${xPositions[index + 1] - 17},56 ${xPositions[index + 1] - 8},62 ${xPositions[index + 1] - 17},68" fill="none" stroke="#2563eb" stroke-width="2" />` : ""}
        `
      )
      .join("")}
    <text x="160" y="112" text-anchor="middle" font-size="12" fill="#334155">Je ne saute aucune étape.</text>
  </svg>`;
}

function officialCorrectionMethodFor(book, chapter, exercise, content) {
  const subjectText = normalize(book.subject);
  const exerciseText = normalize([
    book.subject,
    chapter.title,
    exercise.title,
    exercise.reference,
    exercise.source,
    content.intro,
    content.correctionIntro,
    ...(exercise.keywords || []),
  ].join(" "));

  if (subjectText.includes("math")) return mathCorrectionMethod(exerciseText);
  if (subjectText.includes("physique")) return physicsCorrectionMethod(exerciseText);
  if (subjectText.includes("chimie")) return chemistryCorrectionMethod(exerciseText);
  if (subjectText.includes("svt") || subjectText.includes("vie") || subjectText.includes("terre")) return documentCorrectionMethod("SVT");
  if (subjectText.includes("technologie")) return technologyCorrectionMethod();
  if (subjectText.includes("francais")) return languageCorrectionMethod("français");
  if (subjectText.includes("anglais")) return englishCorrectionMethod();
  if (subjectText.includes("arabe")) return arabicCorrectionMethod();
  if (subjectText.includes("histoire") || subjectText.includes("geographie") || subjectText.includes("civique") || subjectText.includes("islamique")) {
    return documentCorrectionMethod(displaySubject(book.subject));
  }

  return genericCorrectionMethod(book, chapter, exercise);
}

function correctionMethod(why, steps, checks) {
  return { why, steps, checks };
}

function mathCorrectionMethod(exerciseText) {
  if (exerciseText.includes("domaine") || exerciseText.includes("definition")) {
    return correctionMethod(
      "Le domaine de définition se trouve avant tout calcul : on cherche les valeurs qui rendent l'expression impossible.",
      [
        "Je repère les opérations interdites : dénominateur nul, racine carrée d'un nombre négatif, ou expression non autorisée.",
        "J'écris une condition pour chaque interdit : par exemple dénominateur ≠ 0 ou radicande ≥ 0.",
        "Je résous ces conditions séparément, sans mélanger les cas.",
        "Je conclus avec l'ensemble des valeurs autorisées et je cite clairement les valeurs interdites.",
      ],
      ["aucun dénominateur ne vaut 0", "les racines carrées portent sur un nombre positif ou nul", "la conclusion est écrite sous forme d'ensemble"]
    );
  }

  if (exerciseText.includes("equation") || exerciseText.includes("produit nul") || exerciseText.includes("resoudre")) {
    return correctionMethod(
      "Résoudre une équation consiste à transformer l'égalité sans changer ses solutions, puis à vérifier le résultat.",
      [
        "Je mets tous les termes dans le même membre quand c'est nécessaire.",
        "Je choisis la technique adaptée : isoler l'inconnue, factoriser, utiliser une identité remarquable ou appliquer le produit nul.",
        "J'écris chaque transformation sur une nouvelle ligne pour éviter les erreurs de signe.",
        "Je remplace les solutions trouvées dans l'équation de départ pour confirmer qu'elles conviennent.",
      ],
      ["les signes ont été conservés", "toutes les solutions possibles sont listées", "la vérification se fait dans l'équation initiale"]
    );
  }

  if (exerciseText.includes("factor") || exerciseText.includes("develop") || exerciseText.includes("polynome") || exerciseText.includes("reduire")) {
    return correctionMethod(
      "Le calcul littéral demande de reconnaître la forme de l'expression avant de calculer.",
      [
        "Je cherche d'abord la structure : facteur commun, double distributivité, carré remarquable ou différence de deux carrés.",
        "Je développe ou je factorise en gardant les parenthèses tant que les signes ne sont pas sûrs.",
        "Je regroupe uniquement les termes semblables : x² avec x², x avec x, nombres avec nombres.",
        "Je contrôle le résultat en refaisant l'opération inverse mentalement ou sur brouillon.",
      ],
      ["les parenthèses ont été traitées", "les termes semblables seulement ont été regroupés", "le résultat final est ordonné"]
    );
  }

  if (exerciseText.includes("fonction") || exerciseText.includes("courbe") || exerciseText.includes("parabole") || exerciseText.includes("droite")) {
    return correctionMethod(
      "Une fonction se comprend en reliant trois représentations : formule, tableau et graphique.",
      [
        "Je précise ce qui est demandé : image, antécédent, intersection, signe ou comparaison graphique.",
        "Si une formule est donnée, je remplace x ou je résous l'équation correspondante.",
        "Si une courbe est donnée, je lis les abscisses et ordonnées avec l'échelle du repère.",
        "Je conclus avec une phrase : valeur, point, intervalle ou position de la courbe.",
      ],
      ["l'échelle du graphique est respectée", "les coordonnées sont dans le bon ordre", "les intervalles sont fermés ou ouverts correctement"]
    );
  }

  if (exerciseText.includes("vecteur") || exerciseText.includes("coordonne") || exerciseText.includes("repere") || exerciseText.includes("geometr")) {
    return correctionMethod(
      "En géométrie, la méthode consiste à nommer la propriété utilisée avant d'effectuer les calculs.",
      [
        "Je fais une figure ou un schéma de repérage pour visualiser les points et les segments.",
        "Je choisis la formule ou le théorème adapté : coordonnées d'un vecteur, milieu, distance, Chasles, Thalès ou parallélisme.",
        "J'applique la formule en respectant l'ordre des points.",
        "Je termine par une justification rédigée, pas seulement un calcul.",
      ],
      ["l'ordre des points est correct", "la propriété est citée", "la conclusion répond exactement à la question"]
    );
  }

  return correctionMethod(
    "On commence par identifier le type de question pour choisir la règle du chapitre.",
    [
      "Je lis la consigne et je souligne les données utiles.",
      "Je choisis la règle ou la formule du chapitre qui correspond aux mots-clés.",
      "J'applique la méthode étape par étape en écrivant les calculs intermédiaires.",
      "Je vérifie la cohérence du résultat avant de rédiger la conclusion.",
    ],
    ["les données utiles sont utilisées", "chaque ligne découle de la précédente", "la réponse finale est justifiée"]
  );
}

function physicsCorrectionMethod(exerciseText) {
  const electricity = exerciseText.includes("ohm") || exerciseText.includes("tension") || exerciseText.includes("resistance") || exerciseText.includes("puissance");
  return correctionMethod(
    electricity ? "En électricité, il faut d'abord identifier les grandeurs U, I, R ou P avant de choisir la relation." : "En physique, un calcul n'a de sens que si les grandeurs, les unités et le système étudié sont clairs.",
    [
      "Je repère le système étudié et les grandeurs données dans l'énoncé.",
      "Je convertis les unités si nécessaire pour travailler dans un système cohérent.",
      electricity ? "Je choisis la relation adaptée : U = R × I, P = U × I, ou la relation demandée par le chapitre." : "Je choisis la relation physique adaptée : vitesse, force, énergie ou interaction selon la question.",
      "Je remplace les symboles par les valeurs numériques, puis j'interprète le résultat avec son unité.",
    ],
    ["les unités sont cohérentes", "la formule choisie correspond à la grandeur cherchée", "la réponse explique le sens physique du résultat"]
  );
}

function chemistryCorrectionMethod(exerciseText) {
  const solution = exerciseText.includes("solution") || exerciseText.includes("concentration") || exerciseText.includes("mole");
  return correctionMethod(
    solution ? "Pour une solution, on relie masse, quantité de matière, volume et concentration dans le bon ordre." : "En chimie, on raisonne à partir des espèces chimiques, de l'équation et des quantités conservées.",
    [
      "Je liste les données avec leurs unités : masse, volume, quantité de matière, concentration ou charge.",
      solution ? "Je calcule d'abord la quantité de matière si elle n'est pas donnée, puis la concentration." : "J'identifie les réactifs, les produits et la relation chimique à utiliser.",
      "J'écris la formule ou l'équation avant de remplacer par les nombres.",
      "Je vérifie la conservation des atomes, des charges ou la cohérence des unités selon le type d'exercice.",
    ],
    ["les volumes sont en litre si on calcule une concentration", "l'équation est équilibrée si elle est utilisée", "la conclusion cite l'espèce ou la grandeur cherchée"]
  );
}

function documentCorrectionMethod(subjectName) {
  return correctionMethod(
    `En ${subjectName}, la réponse doit partir des documents ou des indices, pas seulement d'une idée mémorisée.`,
    [
      "Je lis le titre, la légende, la source, la date et les unités quand elles existent.",
      "Je relève deux ou trois indices précis dans le document.",
      "J'explique ces indices avec le vocabulaire du chapitre.",
      "Je rédige une conclusion courte qui répond directement à la consigne.",
    ],
    ["la réponse cite un indice concret", "le vocabulaire du chapitre est utilisé", "la conclusion n'ajoute pas d'information non justifiée"]
  );
}

function technologyCorrectionMethod() {
  return correctionMethod(
    "En technologie, comprendre la méthode revient à relier le besoin, la fonction et les composants du système.",
    [
      "Je commence par identifier le système et le besoin auquel il répond.",
      "Je distingue les fonctions : acquérir, traiter, communiquer, alimenter, convertir ou transmettre.",
      "J'associe chaque fonction à un composant réel ou à un bloc du schéma.",
      "Je décris le trajet de l'énergie ou de l'information dans l'ordre logique.",
    ],
    ["chaque fonction est liée à un composant", "l'ordre de fonctionnement est respecté", "la réponse distingue énergie et information"]
  );
}

function languageCorrectionMethod(subjectName) {
  return correctionMethod(
    `En ${subjectName}, une bonne réponse explique l'idée et montre sur quoi elle s'appuie.`,
    [
      "Je repère le type de travail : compréhension, vocabulaire, résumé ou production écrite.",
      "Je formule l'idée principale avec mes propres mots.",
      "J'ajoute un indice, une citation courte ou un exemple pour justifier.",
      "Je relis la ponctuation, les accords, les connecteurs et la clarté de la phrase.",
    ],
    ["la réponse est complète", "elle contient une justification", "la langue est relue avant validation"]
  );
}

function englishCorrectionMethod() {
  return correctionMethod(
    "In English, the method is to understand the task first, then build a short and correct answer.",
    [
      "I identify the task: reading, vocabulary, grammar or writing.",
      "I choose useful words from the text or the chapter.",
      "I write a complete sentence with subject, verb and complement.",
      "I check spelling, connectors and subject-verb agreement.",
    ],
    ["the answer matches the instruction", "one detail justifies the answer", "grammar and spelling are checked"]
  );
}

function arabicCorrectionMethod() {
  return correctionMethod(
    "تقوم الطريقة على فهم المطلوب أولا ثم الاستدلال من النص أو السند قبل صياغة الجواب.",
    [
      "أحدد نوع السؤال: فهم، لغة، تحليل أو إنتاج كتابي.",
      "أستخرج من السند قرائن واضحة تدعم الإجابة.",
      "أربط القرائن بمفاهيم الدرس وبالألفاظ المناسبة.",
      "أكتب جوابا منظما ثم أراجع سلامة الجمل وعلامات الترقيم.",
    ],
    ["الإجابة مرتبطة بالسند", "يوجد تعليل واضح", "الصياغة سليمة ومنظمة"]
  );
}

function genericCorrectionMethod(book, chapter, exercise) {
  return correctionMethod(
    `La méthode dépend de la matière ${displaySubject(book.subject)} et du chapitre ${chapter.title}.`,
    [
      "Je lis la consigne jusqu'au bout avant de commencer.",
      `Je repère les notions utiles : ${exercise.keywords?.join(", ") || exercise.title}.`,
      "Je réponds dans l'ordre des questions en justifiant chaque étape.",
      "Je termine par une phrase qui reprend clairement le résultat obtenu.",
    ],
    ["la réponse suit l'ordre des questions", "les mots-clés du chapitre apparaissent", "la conclusion est explicite"]
  );
}

function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function keywordChips(keywords, limit = 12) {
  return keywords
    .slice(0, limit)
    .map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`)
    .join("");
}

function bookSearchText(book) {
  const parts = book.parts.map((part) => part.label).join(" ");
  const chapters = book.chapters.map((chapter) => `${chapter.title} ${chapter.summary}`).join(" ");
  const exercises = book.chapters
    .flatMap((chapter) => chapterExercisesFor(book, chapter))
    .map((exercise) => `${exercise.title} ${exercise.prompt} ${exercise.correction}`)
    .join(" ");
  const officialExercises = book.chapters
    .flatMap((chapter) => officialManualExercisesFor(book, chapter, "all"))
    .map((exercise) => `${exercise.title} ${exercise.reference} ${exercise.correction} ${exercise.source} ${exercise.keywords.join(" ")}`)
    .join(" ");
  return normalize([book.title, book.subject, book.summary, parts, chapters, exercises, officialExercises, book.keywords.join(" ")].join(" "));
}

function officialBooksForSubject(subject) {
  const subjectKey = normalize(subject);
  return officialBooks.filter((book) => normalize(book.subject) === subjectKey);
}

function coursesForSubject(subject) {
  const subjectKey = normalize(subject);
  return interactiveCourses.filter((course) => normalize(course.subject) === subjectKey);
}

function personalDocumentsForSubject(subject) {
  const subjectKey = normalize(subject);
  return state.documents.filter((doc) => normalize(doc.subject) === subjectKey);
}

function syncStudyToSubject(subject) {
  const books = officialBooksForSubject(subject);
  if (!books.length) return;

  const hasSubjectOption = [...els.bookSubjectInput.options].some((option) => option.value === subject);
  if (hasSubjectOption) {
    els.bookSubjectInput.value = subject;
  }

  if (!books.some((book) => book.id === state.activeChapterBookId)) {
    state.activeChapterBookId = books[0].id;
    state.activeChapterIndex = 0;
  }

  setStudyView("books");
  state.studyStage = "chapters";
  renderStudyStage();
}

function renderSubjectOfficialContent() {
  if (!els.subjectOfficialContent) return;

  const subject = state.activeSubject;
  if (!subject) {
    els.subjectOfficialContent.innerHTML = "";
    return;
  }

  const books = officialBooksForSubject(subject);
  const courses = coursesForSubject(subject);
  const chapterCount = books.reduce((total, book) => total + book.chapters.length, 0);
  const officialExerciseCount = books.reduce(
    (total, book) =>
      total + book.chapters.reduce((count, chapter) => count + officialManualExercisesFor(book, chapter, "all").length, 0),
    0
  );

  const statCards = [
    { icon: "book-open-check", label: translate("subjectBooksCount", { count: books.length }) },
    { icon: "list-tree", label: translate("subjectChaptersCount", { count: chapterCount }) },
    { icon: "clipboard-check", label: translate("subjectOfficialExercisesCount", { count: officialExerciseCount }) },
  ]
    .map(
      (item) => `
        <span class="subject-data-stat">
          <i data-lucide="${item.icon}"></i>
          ${escapeHtml(item.label)}
        </span>
      `
    )
    .join("");

  const courseLinks = courses
    .map(
      (course) => `
        <button class="resource-link course-link" type="button" data-action="open-subject-course" data-course-id="${course.id}">
          <i data-lucide="sparkles"></i>
          ${escapeHtml(translate("openInteractiveCourse"))}
        </button>
      `
    )
    .join("");

  const bookSections = books
    .map((book) => {
      const parts = book.parts
        .map(
          (part) => `
            <a class="resource-link" href="${manualPath(part.file)}" target="_blank" rel="noopener">
              <i data-lucide="file-text"></i>
              ${escapeHtml(part.label)}
            </a>
          `
        )
        .join("");
      const videos = book.videoQueries
        .slice(0, 2)
        .map(
          (query, index) => `
            <a class="resource-link soft" href="${youtubeSearchUrl(query)}" target="_blank" rel="noopener">
              <i data-lucide="play-circle"></i>
              ${escapeHtml(translate("videoNumber", { number: index + 1 }))}
            </a>
          `
        )
        .join("");
      const matchingCourse = courseForBook(book);
      const bookCourseLink = matchingCourse
        ? `
          <button class="resource-link course-link" type="button" data-action="open-subject-course" data-course-id="${matchingCourse.id}">
            <i data-lucide="sparkles"></i>
            ${escapeHtml(translate("openInteractiveCourse"))}
          </button>
        `
        : "";
      const chapters = book.chapters
        .map((chapter, chapterIndex) => {
          const generatedCount = chapterExercisesFor(book, chapter).length;
          const officialCount = officialManualExercisesFor(book, chapter, "all").length;
          const officialPreview = officialManualExercisesFor(book, chapter, "all")
            .slice(0, 2)
            .map((exercise) => `<span class="tag">${escapeHtml(exercise.title)}</span>`)
            .join("");

          return `
            <li class="subject-chapter-row">
              <div>
                <strong>${escapeHtml(chapter.title)}</strong>
                <p>${escapeHtml(chapter.summary)}</p>
                ${officialPreview ? `<div class="doc-tags">${officialPreview}</div>` : ""}
              </div>
              <div class="subject-chapter-actions">
                <span>${escapeHtml(translate("subjectGeneratedExercisesCount", { count: generatedCount }))}</span>
                <span>${escapeHtml(translate("subjectOfficialChapterExercisesCount", { count: officialCount }))}</span>
                <button class="secondary-button compact-button" type="button" data-action="open-subject-chapter" data-book-id="${book.id}" data-chapter-index="${chapterIndex}">
                  <i data-lucide="arrow-up-right"></i>
                  ${escapeHtml(translate("openChapterData"))}
                </button>
              </div>
            </li>
          `;
        })
        .join("");

      return `
        <section class="subject-data-book">
          <div class="subject-data-book-head">
            <div>
              <p class="book-subject">${escapeHtml(displaySubject(book.subject))}</p>
              <h3>${escapeHtml(book.title)}</h3>
              <p>${escapeHtml(book.summary)}</p>
            </div>
            <span class="doc-icon"><i data-lucide="${iconForSubject(book.subject)}"></i></span>
          </div>
          <div class="doc-tags">${keywordChips(book.keywords, 10)}</div>
          <div class="resource-links">${parts}${bookCourseLink}${videos}</div>
          <ul class="subject-chapter-list">${chapters}</ul>
        </section>
      `;
    })
    .join("");

  els.subjectOfficialContent.innerHTML = `
    <section class="subject-data-overview">
      <div class="panel-title">
        <i data-lucide="database"></i>
        <div>
          <h2>${escapeHtml(translate("subjectDataTitle"))}</h2>
          <p>${escapeHtml(translate("subjectDataIntro"))}</p>
        </div>
      </div>
      <div class="subject-data-stats">${statCards}</div>
      ${courseLinks ? `<div class="resource-links">${courseLinks}</div>` : ""}
    </section>
    ${
      bookSections
        ? `<div class="subject-data-books" aria-label="${escapeHtml(translate("subjectManuals"))}">${bookSections}</div>`
        : `<p class="subject-data-empty">${escapeHtml(translate("noOfficialSubjectData"))}</p>`
    }
  `;

  renderLucide();
}

function courseForBook(book) {
  if (book.courseId) {
    return interactiveCourses.find((course) => course.id === book.courseId);
  }

  return interactiveCourses.find((course) => normalize(course.subject) === normalize(book.subject));
}

function chapterExercisesFor(book, chapter) {
  const authored = chapterContentFor(book, chapter);
  if (authored?.exercises?.length) {
    return completePracticeExercises(
      book,
      chapter,
      authored.exercises.map((exercise, index) => ({
        ...exercise,
        id: slugify(`${book.id}-${chapter.title}-${index + 1}`),
        difficulty: exercise.difficulty || "medium",
      }))
    );
  }

  const context = {
    subject: book.subject,
    topic: chapter.title,
    idea: chapter.summary,
  };
  const profiles = {
    math: [
      ({ topic, idea }) => ({
        title: "Comprendre la méthode",
        prompt: `Écris la règle principale du chapitre "${topic}", puis donne un exemple simple où tu l'utilises.`,
        correction: `La réponse doit rappeler l'idée du chapitre: ${idea} L'exemple doit montrer les étapes du calcul ou du raisonnement.`,
      }),
      ({ topic }) => ({
        title: "Application guidée",
        prompt: `Crée trois valeurs numériques simples pour un exercice de "${topic}", effectue le calcul et vérifie ton résultat.`,
        correction: "On attend des calculs écrits ligne par ligne, une vérification et une phrase finale qui interprète le résultat.",
      }),
      ({ topic }) => ({
        title: "Erreur à corriger",
        prompt: `Invente une erreur fréquente dans un exercice de "${topic}", puis explique comment la corriger.`,
        correction: "La correction doit nommer l'erreur, reprendre la bonne propriété et refaire l'étape correctement.",
      }),
    ],
    physique: [
      ({ topic, idea }) => ({
        title: "Observation",
        prompt: `Décris une situation réelle liée à "${topic}" et relève les grandeurs physiques importantes.`,
        correction: `Une bonne réponse cite les grandeurs, les unités et l'idée centrale: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Calcul court",
        prompt: `Propose des données numériques cohérentes pour "${topic}", puis réalise le calcul avec les unités.`,
        correction: "La correction doit contenir la formule, le remplacement numérique, l'unité et une phrase de conclusion.",
      }),
      ({ topic }) => ({
        title: "Schéma",
        prompt: `Fais un petit schéma ou un diagramme pour expliquer "${topic}", puis légende les éléments utiles.`,
        correction: "Le schéma doit être lisible, légendé et relié à la loi ou à la notion étudiée.",
      }),
    ],
    chimie: [
      ({ topic, idea }) => ({
        title: "Vocabulaire chimique",
        prompt: `Relève trois mots-clés du chapitre "${topic}" et explique chacun en une phrase.`,
        correction: `Les définitions doivent être précises et cohérentes avec l'idée: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Transformation",
        prompt: `Écris un exemple de transformation ou de situation chimique liée à "${topic}" avec réactifs et produits si possible.`,
        correction: "La correction doit distinguer clairement les espèces au départ et à l'arrivée, avec conservation de la matière si une équation est utilisée.",
      }),
      ({ topic }) => ({
        title: "Bilan",
        prompt: `Rédige un bilan de méthode pour résoudre un exercice de "${topic}".`,
        correction: "Le bilan doit contenir les données, la relation utilisée, le calcul ou l'équation, puis la conclusion.",
      }),
    ],
    science: [
      ({ topic, idea }) => ({
        title: "Lecture de document",
        prompt: `Imagine un document scientifique lié à "${topic}" et indique les informations qu'il faut observer en premier.`,
        correction: `Il faut citer le titre, la source, les grandeurs ou légendes, puis relier les observations à: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Hypothèse",
        prompt: `Formule une hypothèse pour expliquer une observation du chapitre "${topic}", puis propose comment la tester.`,
        correction: "Une hypothèse correcte est vérifiable et s'appuie sur une observation précise.",
      }),
      ({ topic }) => ({
        title: "Conclusion scientifique",
        prompt: `Rédige une conclusion de trois lignes pour un exercice de "${topic}".`,
        correction: "La conclusion doit répondre au problème, utiliser le vocabulaire scientifique et citer les indices du document.",
      }),
    ],
    technologie: [
      ({ topic, idea }) => ({
        title: "Identifier les fonctions",
        prompt: `Pour un système technique de ton choix, repère ce qui correspond au chapitre "${topic}".`,
        correction: `La réponse doit nommer le système, son besoin et les éléments liés à: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Compléter un schéma",
        prompt: `Dessine un schéma fonctionnel simple pour "${topic}" et ajoute les flèches utiles.`,
        correction: "Le schéma doit montrer les blocs principaux, le sens des échanges et les noms des fonctions.",
      }),
      ({ topic }) => ({
        title: "Diagnostic",
        prompt: `Imagine une panne possible dans un système lié à "${topic}" et propose une vérification.`,
        correction: "La correction doit associer la panne à une fonction précise et proposer un test logique.",
      }),
    ],
    francais: [
      ({ topic, idea }) => ({
        title: "Compréhension",
        prompt: `À partir d'un court texte, réponds aux questions: qui parle, de quoi parle-t-on, quelle est l'idée principale de "${topic}" ?`,
        correction: `La réponse doit identifier la situation et retrouver l'idée: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Langue",
        prompt: `Choisis cinq mots utiles pour "${topic}", puis construis une phrase correcte avec chacun.`,
        correction: "Les phrases doivent être grammaticalement correctes et montrer le sens exact des mots choisis.",
      }),
      ({ topic }) => ({
        title: "Production écrite",
        prompt: `Rédige un paragraphe de six lignes en utilisant la méthode du chapitre "${topic}".`,
        correction: "Le paragraphe doit avoir une idée directrice, des connecteurs, un exemple et une phrase de conclusion.",
      }),
    ],
    arabe: [
      ({ topic, idea }) => ({
        title: "فهم النص",
        prompt: `اقرأ نصا قصيرا ثم استخرج الفكرة العامة وثلاث كلمات مفاتيح مرتبطة بدرس "${topic}".`,
        correction: `الإجابة الجيدة تذكر الفكرة العامة وتربط الكلمات بالفكرة التالية: ${idea}`,
      }),
      ({ topic }) => ({
        title: "لغة وأساليب",
        prompt: `استخرج أسلوبين أو صورتين من النص، ثم اشرح دورهما في درس "${topic}".`,
        correction: "التصحيح يجب أن يحدد المثال من النص ثم يشرح أثره في المعنى أو الحجاج.",
      }),
      ({ topic }) => ({
        title: "إنتاج كتابي",
        prompt: `اكتب فقرة قصيرة ومنظمة تستعمل فيها مفردات درس "${topic}".`,
        correction: "الفقرة المقبولة تكون واضحة، مترابطة، وفيها أمثلة ولغة سليمة.",
      }),
    ],
    anglais: [
      ({ topic, idea }) => ({
        title: "Reading",
        prompt: `Read a short paragraph and write the main idea plus three details connected to "${topic}".`,
        correction: `A good answer gives the main idea, relevant details and matches this goal: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Language practice",
        prompt: `Write five sentences using vocabulary or grammar from "${topic}".`,
        correction: "The sentences should be clear, grammatically correct and connected to the lesson.",
      }),
      ({ topic }) => ({
        title: "Writing",
        prompt: `Write a short paragraph of five lines about "${topic}" with connectors.`,
        correction: "The paragraph needs a topic sentence, two supporting ideas, connectors and a final sentence.",
      }),
    ],
    histoire: [
      ({ topic, idea }) => ({
        title: "Repères",
        prompt: `Place trois faits ou notions liés à "${topic}" dans l'ordre chronologique ou logique.`,
        correction: `La réponse doit respecter l'ordre et expliquer le lien avec: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Analyse de source",
        prompt: `Imagine un document historique lié à "${topic}". Identifie sa nature, son auteur possible et son idée principale.`,
        correction: "La correction doit présenter la source, le contexte et l'information historique utile.",
      }),
      ({ topic }) => ({
        title: "Paragraphe argumenté",
        prompt: `Rédige un paragraphe qui explique l'importance de "${topic}".`,
        correction: "Le paragraphe doit contenir une idée, une preuve historique et une conclusion courte.",
      }),
    ],
    geographie: [
      ({ topic, idea }) => ({
        title: "Lire une carte",
        prompt: `Pour une carte liée à "${topic}", relève le titre, l'échelle, la légende et deux informations importantes.`,
        correction: `La réponse doit utiliser les éléments de la carte et retrouver l'idée: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Comparer des documents",
        prompt: `Compare deux documents possibles sur "${topic}" et écris deux points communs et une différence.`,
        correction: "La correction doit citer les documents, comparer précisément et éviter les réponses vagues.",
      }),
      ({ topic }) => ({
        title: "Synthèse",
        prompt: `Rédige une synthèse de cinq lignes sur "${topic}" avec les mots de géographie nécessaires.`,
        correction: "La synthèse doit être organisée, localisée et appuyée sur des informations du document.",
      }),
    ],
    civique: [
      ({ topic, idea }) => ({
        title: "Définir",
        prompt: `Définis la notion principale du chapitre "${topic}" et donne un exemple de la vie quotidienne.`,
        correction: `La définition doit être claire et reliée à: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Situation problème",
        prompt: `Imagine une situation de classe ou de société liée à "${topic}" et propose une solution responsable.`,
        correction: "La réponse doit respecter les droits, les devoirs et expliquer pourquoi la solution est juste.",
      }),
      ({ topic }) => ({
        title: "Argumenter",
        prompt: `Écris deux arguments pour défendre une idée importante du chapitre "${topic}".`,
        correction: "Chaque argument doit être clair, illustré par un exemple et relié à la notion étudiée.",
      }),
    ],
    default: [
      ({ topic, idea }) => ({
        title: "Retenir",
        prompt: `Écris les trois idées essentielles du chapitre "${topic}".`,
        correction: `Les idées doivent reprendre le vocabulaire du chapitre et expliquer: ${idea}`,
      }),
      ({ topic }) => ({
        title: "Appliquer",
        prompt: `Crée une petite situation d'exercice liée à "${topic}", puis résous-la.`,
        correction: "La réponse doit présenter les données, la méthode et la conclusion.",
      }),
      ({ topic }) => ({
        title: "S'entraîner",
        prompt: `Prépare une question de contrôle sur "${topic}" et donne la réponse attendue.`,
        correction: "La question doit être précise et la réponse doit utiliser les mots-clés du chapitre.",
      }),
    ],
  };

  const profile = profiles[subjectTone(book.subject)] || profiles.default;
  const baseExercises = profile.map((makeExercise) => makeExercise(context));
  const extraExercises = extraChapterExercisesFor(book, context);
  const orderedExercises = [baseExercises[0], extraExercises[0], baseExercises[1], baseExercises[2], extraExercises[1]].filter(Boolean);
  const difficulties = ["easy", "easy", "medium", "medium", "hard"];

  return completePracticeExercises(
    book,
    chapter,
    orderedExercises.map((exercise, index) => ({
      id: slugify(`${book.id}-${chapter.title}-${index + 1}`),
      difficulty: difficulties[index] || "medium",
      ...exercise,
    }))
  );
}

function completePracticeExercises(book, chapter, baseExercises) {
  const exercises = [...baseExercises];

  while (practiceProblemCount(exercises) < PRACTICE_MIN_PROBLEMS) {
    exercises.push(createGeneratedPracticeProblem(book, chapter, practiceProblemCount(exercises) + 1));
  }

  while (exercises.length < PRACTICE_MIN_EXERCISES) {
    exercises.push(createGeneratedPracticeExercise(book, chapter, exercises.length));
  }

  return exercises.map((exercise, index) => ({
    ...exercise,
    id: exercise.id || slugify(`${book.id}-${chapter.title}-practice-${index + 1}`),
    difficulty: exercise.difficulty || generatedPracticeDifficulty(index),
  }));
}

function practiceProblemCount(exercises) {
  return exercises.filter(isPracticeProblem).length;
}

function isPracticeProblem(exercise) {
  const text = normalize([exercise.kind, exercise.title, exercise.prompt].join(" "));
  return exercise.kind === "problem" || text.includes("probleme") || text.includes("problem") || text.includes("situation probleme") || text.includes("مسالة");
}

function generatedPracticeDifficulty(index) {
  return ["easy", "easy", "medium", "medium", "hard"][index % 5];
}

function createGeneratedPracticeExercise(book, chapter, index) {
  const number = index + 1;
  const profile = generatedPracticeProfile(book, chapter, number);
  return {
    id: slugify(`${book.id}-${chapter.title}-extra-${number}`),
    difficulty: generatedPracticeDifficulty(index),
    generated: true,
    ...profile,
  };
}

function createGeneratedPracticeProblem(book, chapter, number) {
  const profile = generatedPracticeProblemProfile(book, chapter, number);
  return {
    id: slugify(`${book.id}-${chapter.title}-problem-${number}`),
    difficulty: number % 2 === 0 ? "hard" : "medium",
    kind: "problem",
    generated: true,
    ...profile,
  };
}

function generatedPracticeProfile(book, chapter, number) {
  const tone = subjectTone(book.subject);
  const topic = chapter.title;
  const idea = chapter.summary || book.summary;
  const value = number + 2;

  if (tone === "math") {
    return {
      title: `Exercice ${number} - Application guidée`,
      prompt: `Dans le chapitre "${topic}", effectue le travail suivant : calcule, justifie puis vérifie avec une valeur simple liée à ${value}.`,
      correction: `On applique la règle du chapitre ${topic}, puis on vérifie le résultat obtenu avec les données de l'énoncé.`,
      steps: [
        `Je repère la notion du chapitre : ${idea}`,
        `Je choisis une valeur simple (${value}) pour éviter de compliquer le calcul inutilement.`,
        "J'applique la règle du cours en écrivant une seule transformation par ligne.",
        "Je vérifie le résultat dans l'expression ou la situation de départ.",
      ],
      keywords: ["application", "méthode", topic],
    };
  }

  if (tone === "physique") {
    return {
      title: `Exercice ${number} - Grandeurs et unités`,
      prompt: `Pour une situation de ${topic}, relève les grandeurs utiles, choisis la relation adaptée et donne le résultat avec son unité.`,
      correction: "La réponse correcte commence par les données, puis la formule, le remplacement numérique, l'unité et l'interprétation.",
      steps: [
        "Je liste les grandeurs données et je les associe à leurs symboles.",
        "Je convertis si nécessaire pour garder des unités cohérentes.",
        "Je choisis la relation physique qui contient la grandeur cherchée.",
        "Je conclus avec l'unité et le sens physique du résultat.",
      ],
      figure: topic.toLowerCase().includes("électricité") || topic.toLowerCase().includes("electricite") ? "phys-circuit" : "phys-motion-graph",
      keywords: ["physique", "unité", topic],
    };
  }

  if (tone === "chimie") {
    return {
      title: `Exercice ${number} - Méthode chimique`,
      prompt: `Dans le chapitre "${topic}", identifie les espèces chimiques, les données et la relation à utiliser.`,
      correction: "On distingue d'abord les espèces et les données, puis on applique la formule ou l'équation chimique adaptée.",
      steps: [
        "Je nomme les espèces chimiques ou les grandeurs présentes dans l'énoncé.",
        "Je vérifie les unités et je convertis le volume en litre si nécessaire.",
        "J'écris la formule ou l'équation avant de remplacer par les nombres.",
        "Je contrôle la conservation des atomes, des charges ou la cohérence de l'unité finale.",
      ],
      figure: topic.toLowerCase().includes("mati") ? "chem-atom" : undefined,
      keywords: ["chimie", "méthode", topic],
    };
  }

  if (tone === "science") {
    return {
      title: `Exercice ${number} - Analyse de document`,
      prompt: `À partir d'un document sur "${topic}", relève deux indices, explique-les et rédige une conclusion scientifique.`,
      correction: "La réponse doit partir des indices du document avant de donner l'explication scientifique.",
      steps: [
        "Je lis le titre, la légende, l'échelle et les unités du document.",
        "Je relève deux indices précis observables.",
        "J'interprète ces indices avec le vocabulaire du chapitre.",
        "Je termine par une conclusion courte qui répond au problème posé.",
      ],
      figure: "svt-cross-section",
      keywords: ["document", "indices", topic],
    };
  }

  if (tone === "technologie") {
    return {
      title: `Exercice ${number} - Système technique`,
      prompt: `Choisis un système lié à "${topic}" et identifie son besoin, sa fonction globale et deux fonctions techniques.`,
      correction: "Un bon schéma relie le besoin, la fonction globale, les composants et le résultat attendu.",
      steps: [
        "Je nomme le système et le besoin auquel il répond.",
        "Je formule la fonction globale avec un verbe d'action.",
        "Je classe les composants selon leur fonction technique.",
        "Je vérifie que les flux d'énergie ou d'information sont dans le bon ordre.",
      ],
      keywords: ["technologie", "système", topic],
    };
  }

  return {
    title: `Exercice ${number} - Comprendre et rédiger`,
    prompt: `Travaille le chapitre "${topic}" : relève l'idée principale, justifie-la avec deux indices et rédige une réponse organisée.`,
    correction: `La réponse doit rester liée à l'idée du chapitre : ${idea}`,
    steps: [
      "Je lis la consigne et je reformule ce qu'on me demande.",
      "Je relève deux indices ou deux idées utiles.",
      "J'organise ma réponse avec une idée, une justification et une phrase finale.",
      "Je relis pour vérifier la clarté, la langue et le lien avec le chapitre.",
    ],
    keywords: ["rédaction", "méthode", topic],
  };
}

function generatedPracticeProblemProfile(book, chapter, number) {
  const tone = subjectTone(book.subject);
  const topic = chapter.title;
  const idea = chapter.summary || book.summary;
  const firstValue = number + 6;
  const secondValue = number % 5 + 2;

  if (tone === "math") {
    return generatedMathProblemProfile(topic, number);
  }

  if (tone === "physique") {
    return {
      title: `Problème ${number} - Situation de mesure`,
      prompt: `Un mobile parcourt ${firstValue * 5} m en ${secondValue + 3} s. Calcule sa vitesse moyenne et explique si le résultat est cohérent.`,
      correction: "On utilise la relation v = d / t, puis on interprète l'unité m/s.",
      steps: [
        `Je relève les données : distance d = ${firstValue * 5} m et durée t = ${secondValue + 3} s.`,
        "Je choisis la formule de vitesse moyenne : v = d / t.",
        `Je remplace : v = ${firstValue * 5} / ${secondValue + 3} = ${(firstValue * 5 / (secondValue + 3)).toFixed(2)} m/s.`,
        "L'unité m/s signifie le nombre de mètres parcourus en une seconde.",
        "Je conclus en vérifiant que la vitesse est positive et cohérente avec un mouvement réel.",
      ],
      figure: "phys-motion-graph",
      keywords: ["problème", "vitesse", topic],
    };
  }

  if (tone === "chimie") {
    return {
      title: `Problème ${number} - Solution à préparer`,
      prompt: `On dissout ${firstValue} g de soluté dans ${secondValue / 10} L de solution. Calcule la concentration massique et interprète le résultat.`,
      correction: "La concentration massique se calcule par Cm = m / V avec m en grammes et V en litres.",
      steps: [
        `Je relève les données : m = ${firstValue} g et V = ${(secondValue / 10).toFixed(1)} L.`,
        "Je choisis la formule : Cm = m / V.",
        `Je remplace : Cm = ${firstValue} / ${(secondValue / 10).toFixed(1)} = ${(firstValue / (secondValue / 10)).toFixed(1)} g/L.`,
        "J'indique l'unité g/L car il s'agit d'une concentration massique.",
        "Je conclus : chaque litre de solution contient cette masse de soluté.",
      ],
      keywords: ["problème", "concentration", topic],
    };
  }

  if (tone === "science") {
    return {
      title: `Problème ${number} - Démarche scientifique`,
      prompt: `Un document lié à "${topic}" présente une observation inattendue. Formule le problème, propose une hypothèse et indique comment la tester.`,
      correction: "On transforme l'observation en question scientifique, puis on propose une hypothèse vérifiable.",
      steps: [
        "Je commence par décrire précisément l'observation du document.",
        "Je formule le problème sous forme de question claire.",
        "Je propose une hypothèse qui peut être testée par observation ou expérience.",
        "Je précise le test et le résultat attendu si l'hypothèse est correcte.",
        "Je conclus en reliant la réponse aux indices du document.",
      ],
      figure: "svt-cross-section",
      keywords: ["problème", "hypothèse", topic],
    };
  }

  if (tone === "technologie") {
    return {
      title: `Problème ${number} - Diagnostic d'un système`,
      prompt: `Un système lié à "${topic}" ne fonctionne plus correctement. Identifie le besoin, la fonction en panne et propose une vérification.`,
      correction: "On suit la chaîne fonctionnelle pour localiser la panne puis proposer un test simple.",
      steps: [
        "Je rappelle le besoin que le système doit satisfaire.",
        "Je découpe le fonctionnement en fonctions techniques.",
        "Je repère la fonction qui peut expliquer la panne observée.",
        "Je propose un test concret sur le composant correspondant.",
        "Je conclus en indiquant la réparation ou la vérification suivante.",
      ],
      keywords: ["problème", "diagnostic", topic],
    };
  }

  return {
    title: `Problème ${number} - Réponse argumentée`,
    prompt: `Situation : un élève doit expliquer "${topic}" à un camarade qui n'a pas compris. Rédige une réponse avec une idée, deux preuves ou exemples, puis une conclusion.`,
    correction: `La réponse doit expliquer l'idée centrale du chapitre : ${idea}`,
    steps: [
      "Je commence par reformuler la situation et le problème posé.",
      "J'écris l'idée principale avec des mots simples.",
      "J'ajoute deux preuves, exemples ou indices pour convaincre.",
      "J'organise la réponse avec des connecteurs : d'abord, ensuite, donc.",
      "Je conclus par une phrase qui répond directement au problème.",
    ],
    keywords: ["problème", "argumentation", topic],
  };
}

  function generatedMathProblemProfile(topic, number) {
    const normalizedTopic = normalize(topic);

    if (normalizedTopic.includes("fonction")) {
      return {
        title: `Problème ${number} - Étude complète d'une fonction`,
        prompt: `Soit f la fonction définie par :

  f(x) = (x² + 1) / (x² - 4)

  1. Déterminer l'ensemble de définition D_f de f.
  2. Étudier la parité de f.
  3. Soient u et v deux réels de l'intervalle ]2, +∞[ tels que u < v.
     a) Calculer et simplifier f(u) - f(v).
     b) En déduire le sens de variation de f sur ]2, +∞[.
  4. Montrer que f est bornée sur l'intervalle [3, 5], en précisant un majorant et un minorant.
  5. Soit g la fonction définie par g(x) = 1 / x.
     Déterminer g ∘ f ainsi que son ensemble de définition.`,
        correction: "On étudie d'abord le domaine, puis la symétrie, la variation, les bornes et enfin la composée.",
        steps: [
    `1) Ensemble de définition

  f(x) est définie si et seulement si le dénominateur est non nul.
  x² - 4 ≠ 0 ⇔ x ≠ 2 et x ≠ -2.

  Donc :
  D_f = R \\ {-2, 2}
  D_f = ]-∞, -2[ ∪ ]-2, 2[ ∪ ]2, +∞[`,
    `2) Parité

  Le domaine est symétrique : si x ∈ D_f, alors -x ∈ D_f.

  f(-x) = ((-x)² + 1) / ((-x)² - 4)
  f(-x) = (x² + 1) / (x² - 4)
  f(-x) = f(x)

  Donc f est paire.`,
    `3) Variation sur ]2, +∞[

  Pour u, v ∈ ]2, +∞[ avec u < v :

  f(u) - f(v) = (u² + 1)/(u² - 4) - (v² + 1)/(v² - 4)
  f(u) - f(v) = [(u² + 1)(v² - 4) - (v² + 1)(u² - 4)] / [(u² - 4)(v² - 4)]

  Numérateur :
  (u²v² - 4u² + v² - 4) - (u²v² - 4v² + u² - 4)
  = 5v² - 5u²
  = 5(v - u)(v + u)

  Donc :
  f(u) - f(v) = 5(v - u)(v + u) / [(u² - 4)(v² - 4)]

  Sur ]2, +∞[, on a v - u > 0, v + u > 0, u² - 4 > 0 et v² - 4 > 0.
  Donc f(u) - f(v) > 0, c'est-à-dire f(u) > f(v).

  Comme u < v entraîne f(u) > f(v), f est strictement décroissante sur ]2, +∞[.`,
    `4) Fonction bornée sur [3, 5]

  Comme [3, 5] ⊂ ]2, +∞[ et que f est décroissante sur ]2, +∞[, on a :
  f(5) ≤ f(x) ≤ f(3) pour tout x ∈ [3, 5].

  f(3) = (3² + 1)/(3² - 4) = 10/5 = 2
  f(5) = (5² + 1)/(5² - 4) = 26/21

  Donc :
  26/21 ≤ f(x) ≤ 2

  Un majorant est 2 et un minorant est 26/21.`,
    `5) Composée g ∘ f

  g(x) = 1/x, donc :
  (g ∘ f)(x) = g(f(x)) = 1 / f(x)
  (g ∘ f)(x) = (x² - 4)/(x² + 1)

  Domaine : il faut x ∈ D_f et f(x) ≠ 0.
  Or f(x) = 0 ⇔ x² + 1 = 0, impossible dans R.

  Donc aucune valeur n'est exclue en plus :
  D_{g ∘ f} = D_f = R \\ {-2, 2}.`,
        ],
        keywords: ["problème", "fonction", "ensemble de définition", "parité", "variation", topic],
      };
    }

    if (normalizedTopic.includes("geometr")) {
      return {
        title: `Problème ${number} - Repère et parallélogramme`,
        prompt: `Dans un repère orthonormé, on donne les points :

  A(1 ; 2), B(5 ; 4) et C(3 ; 8).

  1. Calculer les coordonnées des vecteurs AB et BC.
  2. Calculer les longueurs AB et BC.
  3. Montrer que le triangle ABC est rectangle en B.
  4. Déterminer les coordonnées du point D pour que ABCD soit un parallélogramme.
  5. Calculer l'aire du parallélogramme ABCD.`,
        correction: "On utilise les coordonnées des vecteurs, la formule de distance et la condition du parallélogramme.",
        steps: [
    `1) Coordonnées des vecteurs

  AB = (x_B - x_A ; y_B - y_A) = (5 - 1 ; 4 - 2) = (4 ; 2)
  BC = (x_C - x_B ; y_C - y_B) = (3 - 5 ; 8 - 4) = (-2 ; 4)`,
    `2) Longueurs

  AB = √(4² + 2²) = √20 = 2√5
  BC = √((-2)² + 4²) = √20 = 2√5`,
    `3) Triangle rectangle

  Produit scalaire :
  AB · BC = 4 × (-2) + 2 × 4 = -8 + 8 = 0

  Les vecteurs AB et BC sont orthogonaux.
  Donc le triangle ABC est rectangle en B.`,
    `4) Coordonnées de D

  Pour que ABCD soit un parallélogramme :
  D = A + C - B

  x_D = 1 + 3 - 5 = -1
  y_D = 2 + 8 - 4 = 6

  Donc D(-1 ; 6).`,
    `5) Aire

  Comme AB ⟂ BC, le parallélogramme ABCD est un rectangle.
  Aire = AB × BC = 2√5 × 2√5 = 20.

  L'aire du parallélogramme ABCD est 20 unités d'aire.`,
        ],
        figure: "math-vectors",
        keywords: ["problème", "géométrie", "repère", "vecteur", topic],
      };
    }

    if (normalizedTopic.includes("calcul") || normalizedTopic.includes("algeb")) {
      return {
        title: `Problème ${number} - Expression algébrique`,
        prompt: `Soit A(x) l'expression définie par :

  A(x) = (x - 3)(2x + 1) - (x - 3)²

  1. Développer et réduire A(x).
  2. Factoriser A(x).
  3. Résoudre l'équation A(x) = 0.
  4. Étudier le signe de A(x) selon les valeurs de x.
  5. Calculer A(4) de deux façons différentes et vérifier que les résultats sont identiques.`,
        correction: "On développe pour obtenir la forme réduite, puis on factorise pour résoudre et étudier le signe.",
        steps: [
    `1) Développement

  (x - 3)(2x + 1) = 2x² + x - 6x - 3 = 2x² - 5x - 3
  (x - 3)² = x² - 6x + 9

  A(x) = 2x² - 5x - 3 - (x² - 6x + 9)
  A(x) = x² + x - 12`,
    `2) Factorisation

  A(x) = (x - 3)(2x + 1) - (x - 3)²
  A(x) = (x - 3)[(2x + 1) - (x - 3)]
  A(x) = (x - 3)(x + 4)`,
    `3) Équation A(x) = 0

  (x - 3)(x + 4) = 0

  Un produit est nul si l'un des facteurs est nul.
  x - 3 = 0 ou x + 4 = 0
  x = 3 ou x = -4`,
    `4) Signe de A(x)

  A(x) = (x - 3)(x + 4).
  Les valeurs qui annulent A(x) sont -4 et 3.

  A(x) est positif sur ]-∞, -4] ∪ [3, +∞[.
  A(x) est négatif sur [-4, 3].`,
    `5) Vérification avec x = 4

  Avec la forme initiale :
  A(4) = (4 - 3)(2 × 4 + 1) - (4 - 3)² = 1 × 9 - 1 = 8

  Avec la forme factorisée :
  A(4) = (4 - 3)(4 + 4) = 1 × 8 = 8

  Les deux résultats sont identiques.`,
        ],
        keywords: ["problème", "calcul algébrique", "factorisation", "équation", topic],
      };
    }

    return {
      title: `Problème ${number} - Modélisation`,
      prompt: `Une association organise une sortie. Le transport coûte 120 dinars au total, puis chaque élève paie encore 8 dinars pour l'entrée.

  On note x le nombre d'élèves participants.

  1. Exprimer le coût total C(x) en fonction de x.
  2. Calculer C(15).
  3. Résoudre l'équation C(x) = 320.
  4. Interpréter le résultat dans la situation.
  5. Déterminer le nombre minimal d'élèves pour que le coût total dépasse 400 dinars.`,
      correction: "On traduit la situation par une expression affine, puis on résout les équations et l'inéquation obtenues.",
      steps: [
        `1) Expression du coût

  Le coût fixe est 120 dinars.
  Chaque élève ajoute 8 dinars.

  Donc C(x) = 120 + 8x.`,
        `2) Calcul de C(15)

  C(15) = 120 + 8 × 15
  C(15) = 120 + 120
  C(15) = 240

  Pour 15 élèves, le coût total est 240 dinars.`,
        `3) Équation C(x) = 320

  120 + 8x = 320
  8x = 200
  x = 25`,
        `4) Interprétation

  x = 25 signifie que le coût total est 320 dinars lorsque 25 élèves participent.`,
        `5) Coût supérieur à 400

  120 + 8x > 400
  8x > 280
  x > 35

  Le nombre minimal d'élèves est donc 36.`,
      ],
      keywords: ["problème", "modélisation", "équation", topic],
    };
  }

  function chapterExamsFor(book, chapter) {
    return Array.from({ length: EXAMS_PER_CHAPTER }, (_, index) => createGeneratedExam(book, chapter, index + 1));
  }

  function createGeneratedExam(book, chapter, number) {
    const tone = subjectTone(book.subject);
    const topic = chapter.title;
    const difficulty = number === 3 ? "hard" : "medium";
    return {
      id: slugify(`${book.id}-${topic}-exam-${number}`),
      kind: "exam",
      title: `${translate("examNumber", { number })} - ${topic}`,
      duration: number === 3 ? "1 h" : "45 min",
      scale: "20 pts",
      difficulty,
      prompt: generatedExamPrompt(tone, book, chapter, number),
      correction: generatedExamCorrectionIntro(tone, topic),
      steps: generatedExamCorrectionSteps(tone, topic, number),
      figure: generatedExamFigure(tone, topic),
      keywords: ["examen", topic, book.subject],
    };
  }

  function generatedExamPrompt(tone, book, chapter, number) {
    const topic = chapter.title;
    const idea = chapter.summary || book.summary;
    return generatedRichExamPrompt(tone, book, chapter, number);

    if (tone === "math") {
      if (normalize(topic).includes("fonction")) {
        return `Examen ${number} - Fonctions

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Cours et domaine (4 pts)
  Soit h(x) = (2x - 1) / (x + 3).
  1. Déterminer D_h.
  2. Calculer h(0) et h(1).
  3. Résoudre h(x) = 0.

  Exercice 2 : Étude d'une fonction paire (7 pts)
  Soit f(x) = (x² + 1) / (x² - 4).
  1. Déterminer D_f.
  2. Étudier la parité de f.
  3. Calculer f(3) et f(5).

  Problème : Variation et encadrement (9 pts)
  Soient u et v deux réels de ]2, +∞[ tels que u < v.
  1. Simplifier f(u) - f(v).
  2. Déduire le sens de variation de f sur ]2, +∞[.
  3. Montrer que f est bornée sur [3, 5].
  4. Soit g(x) = 1 / x. Déterminer g ∘ f et son domaine.`;
      }

      if (normalize(topic).includes("geometr")) {
        return `Examen ${number} - Géométrie dans un repère

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Coordonnées (5 pts)
  Dans un repère orthonormé, A(1 ; 2), B(5 ; 4) et C(3 ; 8).
  1. Calculer les coordonnées des vecteurs AB et BC.
  2. Calculer les longueurs AB et BC.

  Exercice 2 : Orthogonalité (6 pts)
  1. Calculer le produit scalaire AB · BC.
  2. En déduire la nature du triangle ABC.

  Problème : Parallélogramme (9 pts)
  1. Déterminer D pour que ABCD soit un parallélogramme.
  2. Calculer l'aire de ABCD.
  3. Rédiger une conclusion géométrique complète.`;
      }

      return `Examen ${number} - Calcul algébrique et raisonnement

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Développer et réduire (5 pts)
  Soit A(x) = (x - 3)(2x + 1) - (x - 3)².
  1. Développer A(x).
  2. Réduire l'expression obtenue.

  Exercice 2 : Factoriser et résoudre (7 pts)
  1. Factoriser A(x).
  2. Résoudre A(x) = 0.
  3. Calculer A(4) avec la forme factorisée.

  Problème : Signe et interprétation (8 pts)
  1. Étudier le signe de A(x).
  2. Donner les valeurs de x pour lesquelles A(x) est positif.
  3. Vérifier la cohérence avec la forme développée.`;
    }

    if (tone === "physique") {
      return `Examen ${number} - ${topic}

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Questions de cours (5 pts)
  1. Définir les grandeurs utiles du chapitre.
  2. Donner les unités et les symboles correspondants.
  3. Citer la relation principale utilisée dans ce chapitre.

  Exercice 2 : Application numérique (7 pts)
  Une situation expérimentale est liée à : ${idea}
  1. Relever les données utiles.
  2. Écrire la formule avant le calcul.
  3. Donner le résultat avec son unité.

  Problème : Analyse d'une mesure (8 pts)
  1. Interpréter le résultat obtenu.
  2. Vérifier la cohérence physique.
  3. Rédiger une conclusion courte et précise.`;
    }

    if (tone === "chimie") {
      return `Examen ${number} - ${topic}

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Vocabulaire chimique (5 pts)
  1. Définir les espèces ou grandeurs du chapitre.
  2. Donner les unités nécessaires.
  3. Expliquer la méthode de calcul attendue.

  Exercice 2 : Calcul guidé (7 pts)
  On travaille sur une situation liée à : ${idea}
  1. Relever les données.
  2. Convertir si nécessaire.
  3. Appliquer la formule adaptée.

  Problème : Interprétation (8 pts)
  1. Contrôler l'unité finale.
  2. Vérifier la cohérence chimique.
  3. Conclure avec une phrase scientifique.`;
    }

    if (tone === "arabe") {
      return `امتحان ${number} - ${topic}

  المدة : ${number === 3 ? "ساعة" : "45 دقيقة"} — السلم : 20 نقطة

  التمرين 1 : فهم النص (5 نقاط)
  1. استخرج الفكرة العامة للدرس.
  2. حدد كلمتين مفتاحيتين واشرحهما.
  3. اكتب إجابة قصيرة بلغة سليمة.

  التمرين 2 : تحليل (7 نقاط)
  1. بين العلاقة بين الفكرة والأسلوب.
  2. استخرج شاهدا مناسبا.
  3. علل إجابتك.

  الوضعية الإدماجية (8 نقاط)
  اكتب فقرة منظمة حول : ${idea}`;
    }

    if (tone === "anglais") {
      return `Exam ${number} - ${topic}

  Duration: ${number === 3 ? "1 hour" : "45 minutes"} — Mark: 20 points

  Exercise 1: Reading comprehension (5 pts)
  1. Identify the main idea.
  2. Pick two keywords and explain them.
  3. Answer with complete sentences.

  Exercise 2: Language (7 pts)
  1. Complete the sentences with suitable words.
  2. Transform two sentences correctly.
  3. Justify one answer.

  Writing task (8 pts)
  Write a short organized paragraph about: ${idea}`;
    }

    return `Examen ${number} - ${topic}

  Durée : ${number === 3 ? "1 h" : "45 min"} — Barème : 20 points

  Exercice 1 : Connaissances (5 pts)
  1. Donner l'idée principale du chapitre.
  2. Définir deux mots importants.
  3. Citer un exemple lié au cours.

  Exercice 2 : Analyse de document (7 pts)
  1. Relever deux indices précis.
  2. Expliquer chaque indice avec le vocabulaire du chapitre.
  3. Rédiger une réponse organisée.

  Sujet de synthèse (8 pts)
  Rédiger une réponse complète autour de : ${idea}`;
  }

  function generatedExamCorrectionIntro(tone, topic) {
    if (tone === "arabe") return `تصحيح نموذجي لامتحان حول ${topic}: أجيب بترتيب، أعلل، ثم أختم بجملة واضحة.`;
    if (tone === "anglais") return `Model correction for the ${topic} exam: answer in order, justify, then write a clear conclusion.`;
    return `Correction modèle de l'examen sur ${topic} : on répond dans l'ordre, on justifie chaque résultat et on conclut proprement.`;
  }

  function generatedExamCorrectionSteps(tone, topic, number) {
    return generatedRichExamCorrectionSteps(tone, topic, number);

    if (tone === "math") {
      return [
        "Je commence par écrire les conditions d'existence, les formules et les données avant tout calcul.",
        "Pour chaque exercice, je pose l'égalité ou la relation utilisée, puis je transforme une seule ligne à la fois.",
        "Dans la partie problème, je justifie le signe, la variation ou la propriété demandée avant de conclure.",
        "Je vérifie les résultats numériques avec une substitution simple ou une lecture de l'énoncé.",
        `Je termine par une rédaction complète : résultat, justification et phrase de conclusion pour le sujet ${number}.`,
      ];
    }

    if (tone === "physique" || tone === "chimie") {
      return [
        "Je relève les données de l'énoncé et je note les symboles avec leurs unités.",
        "Je convertis les unités si nécessaire avant d'utiliser une formule.",
        "J'écris la relation du cours, puis je remplace par les valeurs numériques.",
        "Je donne le résultat avec son unité et je vérifie l'ordre de grandeur.",
        "Je conclus en expliquant le sens physique ou chimique du résultat.",
      ];
    }

    if (tone === "arabe") {
      return [
        "أقرأ المطلوب جيدا وأحدد الفكرة الرئيسية قبل الإجابة.",
        "أستخرج شاهدا أو مؤشرا دقيقا من النص أو الدرس.",
        "أعلل الجواب باستعمال مفردات الدرس.",
        "أنظم الفقرة بجمل مترابطة وواضحة.",
        "أراجع اللغة والخاتمة حتى تكون الإجابة كاملة.",
      ];
    }

    if (tone === "anglais") {
      return [
        "I read the question carefully and identify the expected task.",
        "I use keywords from the lesson to build a complete answer.",
        "I justify each answer with a clear detail or example.",
        "I organize the writing task with an introduction, ideas and a conclusion.",
        "I check spelling, grammar and punctuation before finishing.",
      ];
    }

    return [
      "Je lis toutes les questions avant de commencer pour repérer les notions du chapitre.",
      "Je réponds d'abord aux questions de connaissances avec des définitions précises.",
      "J'analyse le document ou la situation avec deux indices clairement cités.",
      "Je rédige la synthèse avec une idée principale, des preuves et une conclusion.",
      `Je relis ma copie pour vérifier que chaque partie du sujet ${number} est traitée.`,
    ];
  }

  function generatedRichExamPrompt(tone, book, chapter, number) {
    const topic = chapter.title;
    const normalizedTopic = normalize(topic);
    const idea = chapter.summary || book.summary;
    const duration = number >= 4 ? "1 h" : "45 min";

    if (tone === "math") return generatedRichMathExamPrompt(normalizedTopic, topic, number, duration);
    if (tone === "physique") return generatedRichPhysicsExamPrompt(normalizedTopic, topic, number, duration);
    if (tone === "chimie") return generatedRichChemistryExamPrompt(normalizedTopic, topic, number, duration);
    if (tone === "science") return generatedRichScienceExamPrompt(topic, idea, number, duration);
    if (tone === "technologie") return generatedRichTechnologyExamPrompt(normalizedTopic, topic, number, duration);
    if (tone === "francais") return generatedRichFrenchExamPrompt(topic, number, duration);
    if (tone === "anglais") return generatedRichEnglishExamPrompt(topic, number, duration);
    if (tone === "arabe") return generatedRichArabicExamPrompt(topic, number, duration);
    return generatedRichHumanitiesExamPrompt(tone, topic, idea, number, duration);
  }

  function generatedRichMathExamPrompt(normalizedTopic, topic, number, duration) {
    if (normalizedTopic.includes("fonction")) {
      return `Examen ${number} - Fonctions

Durée : ${duration} — Barème : 20 points

Exercice 1 : Fonction rationnelle (5 pts)
Soit h(x) = (2x - 1) / (x + 3).
1. Déterminer D_h.
2. Calculer h(0) et h(1).
3. Résoudre h(x) = 0.

Exercice 2 : Parité (6 pts)
Soit f(x) = (x² + 1) / (x² - 4).
1. Déterminer D_f.
2. Montrer que f est paire.
3. Calculer f(3) et f(5).

Problème : Variation et composée (9 pts)
Soient u et v deux réels de ]2, +∞[ tels que u < v.
1. Simplifier f(u) - f(v).
2. En déduire le sens de variation de f sur ]2, +∞[.
3. Montrer que 26/21 ≤ f(x) ≤ 2 pour tout x ∈ [3, 5].
4. Soit g(x) = 1 / x. Déterminer g ∘ f et son ensemble de définition.`;
    }

    if (normalizedTopic.includes("geometr")) {
      return `Examen ${number} - Géométrie dans un repère

Durée : ${duration} — Barème : 20 points

Exercice 1 : Coordonnées et distances (6 pts)
Dans un repère orthonormé, A(1 ; 2), B(5 ; 4) et C(3 ; 8).
1. Calculer les coordonnées des vecteurs AB et BC.
2. Calculer AB et BC.

Exercice 2 : Orthogonalité (5 pts)
1. Calculer AB · BC.
2. En déduire la nature du triangle ABC.

Problème : Parallélogramme (9 pts)
1. Déterminer les coordonnées de D pour que ABCD soit un parallélogramme.
2. Calculer l'aire de ABCD.
3. Rédiger une conclusion géométrique complète.`;
    }

    if (normalizedTopic.includes("probleme")) {
      return `Examen ${number} - Mise en équation

Durée : ${duration} — Barème : 20 points

Situation : une classe prépare une sortie scientifique. Le transport coûte 120 dinars au total et chaque élève paie 8 dinars pour l'entrée.

Exercice 1 : Modélisation (6 pts)
On note x le nombre d'élèves participants et C(x) le coût total.
1. Exprimer C(x) en fonction de x.
2. Calculer C(15).

Exercice 2 : Équation (6 pts)
1. Résoudre C(x) = 320.
2. Interpréter le résultat.

Problème : Inéquation (8 pts)
1. Résoudre C(x) > 400.
2. Donner le nombre minimal d'élèves pour que le coût dépasse 400 dinars.
3. Vérifier la réponse par un calcul.`;
    }

    return `Examen ${number} - Calcul algébrique

Durée : ${duration} — Barème : 20 points

Soit A(x) = (x - 3)(2x + 1) - (x - 3)².

Exercice 1 : Développement (5 pts)
1. Développer (x - 3)(2x + 1).
2. Développer (x - 3)².
3. En déduire la forme réduite de A(x).

Exercice 2 : Factorisation (7 pts)
1. Factoriser A(x).
2. Résoudre A(x) = 0.

Problème : Signe et vérification (8 pts)
1. Étudier le signe de A(x).
2. Calculer A(4) avec la forme initiale et avec la forme factorisée.
3. Conclure sur la cohérence des deux formes.

Consigne de rédaction : chaque calcul doit être écrit sur une ligne séparée, avec la règle utilisée et une phrase de conclusion.`;
  }

  function generatedRichPhysicsExamPrompt(normalizedTopic, topic, number, duration) {
    if (normalizedTopic.includes("electric")) {
      return `Examen ${number} - Électricité

Durée : ${duration} — Barème : 20 points

Exercice 1 : Circuit simple (5 pts)
Un générateur alimente une lampe et un conducteur ohmique en série.
1. Nommer les dipôles du circuit.
2. Indiquer le sens conventionnel du courant.
3. Dire comment brancher un ampèremètre.

Exercice 2 : Loi d'Ohm (7 pts)
Un conducteur ohmique a une résistance R = 12 Ω. La tension à ses bornes est U = 6 V.
1. Écrire la relation entre U, R et I.
2. Calculer l'intensité I.
3. Convertir le résultat en mA.

Problème : Sécurité (8 pts)
La résistance est remplacée par R = 4 Ω sous la même tension.
1. Calculer la nouvelle intensité.
2. Comparer avec la valeur précédente.
3. Expliquer pourquoi une intensité trop grande peut être dangereuse pour un dipôle.`;
    }

    if (normalizedTopic.includes("mouvement")) {
      return `Examen ${number} - Mouvement

Durée : ${duration} — Barème : 20 points

Exercice 1 : Vocabulaire (5 pts)
1. Définir trajectoire, distance parcourue et vitesse moyenne.
2. Donner l'unité usuelle de la vitesse dans le système international.

Exercice 2 : Calcul de vitesse (7 pts)
Un mobile parcourt 120 m en 15 s.
1. Écrire la formule de la vitesse moyenne.
2. Calculer la vitesse en m/s.
3. Convertir cette vitesse en km/h.

Problème : Comparaison (8 pts)
Un second mobile parcourt 90 m en 10 s.
1. Calculer sa vitesse moyenne.
2. Dire lequel est le plus rapide.
3. Justifier avec une phrase complète.`;
    }

    return `Examen ${number} - Mesures

Durée : ${duration} — Barème : 20 points

Exercice 1 : Unités (5 pts)
1. Convertir 250 g en kg.
2. Convertir 200 mL en L.
3. Expliquer pourquoi il faut convertir avant un calcul.

Exercice 2 : Masse volumique (7 pts)
Un liquide a une masse m = 250 g et un volume V = 200 mL.
1. Écrire la formule de la masse volumique.
2. Calculer ρ en g/mL.
3. Convertir le résultat en g/L.

Problème : Cohérence (8 pts)
Un autre liquide a ρ = 0,8 g/mL et V = 500 mL.
1. Calculer sa masse.
2. Comparer les deux liquides.
3. Rédiger une conclusion expérimentale.`;
  }

  function generatedRichChemistryExamPrompt(normalizedTopic, topic, number, duration) {
    if (normalizedTopic.includes("reaction")) {
      return `Examen ${number} - Réaction chimique

Durée : ${duration} — Barème : 20 points

Exercice 1 : Conservation (5 pts)
1. Expliquer ce que signifie conserver les atomes.
2. Distinguer réactifs et produits.

Exercice 2 : Équilibrer (7 pts)
On considère la combustion du méthane : CH4 + O2 -> CO2 + H2O.
1. Compter les atomes dans chaque membre.
2. Équilibrer l'équation.
3. Vérifier la conservation des atomes.

Problème : Lecture de l'équation (8 pts)
Pour 1 mol de CH4 consommée :
1. Indiquer la quantité de O2 nécessaire.
2. Indiquer la quantité de CO2 formée.
3. Expliquer le rôle des coefficients stœchiométriques.`;
    }

    if (normalizedTopic.includes("solution")) {
      return `Examen ${number} - Solutions

Durée : ${duration} — Barème : 20 points

Exercice 1 : Vocabulaire (5 pts)
1. Définir soluté, solvant et solution.
2. Donner l'unité usuelle de la concentration massique.

Exercice 2 : Concentration (7 pts)
On dissout 8 g de sel dans de l'eau pour obtenir 0,40 L de solution.
1. Écrire la formule de la concentration massique.
2. Calculer C_m.
3. Interpréter le résultat.

Problème : Dilution simple (8 pts)
On prélève 100 mL d'une solution de concentration 20 g/L, puis on ajoute de l'eau pour obtenir 500 mL.
1. Dire si la masse de soluté change.
2. Calculer la masse de soluté prélevée.
3. Calculer la nouvelle concentration.`;
    }

    return `Examen ${number} - Matière

Durée : ${duration} — Barème : 20 points

Exercice 1 : Atome et ion (5 pts)
Un atome de sodium est noté 23/11 Na.
1. Donner son numéro atomique Z.
2. Donner son nombre de masse A.
3. Déterminer le nombre de protons, neutrons et électrons de l'atome.

Exercice 2 : Ion sodium (7 pts)
L'ion sodium est Na+.
1. Dire s'il a gagné ou perdu un électron.
2. Déterminer son nombre d'électrons.
3. Expliquer pourquoi il est chargé positivement.

Problème : Classification (8 pts)
On donne les espèces O2, H2O, Na+ et Cl-.
1. Classer atomes, molécules et ions.
2. Justifier chaque classement.
3. Rédiger une conclusion sur la diversité de la matière.`;
  }

  function generatedRichScienceExamPrompt(topic, idea, number, duration) {
    return `Examen ${number} - ${topic}

Durée : ${duration} — Barème : 20 points

Document original : une coupe géologique montre trois couches A, B et C. La couche A est au-dessus de B, la couche B est au-dessus de C. Une faille F coupe les trois couches. Un filon volcanique traverse C et B mais ne traverse pas A.

Exercice 1 : Lecture du document (5 pts)
1. Identifier les éléments visibles dans le document.
2. Donner deux indices utiles pour raisonner.

Exercice 2 : Datation relative (7 pts)
1. Classer les couches de la plus ancienne à la plus récente.
2. Placer la faille F dans l'ordre des événements.
3. Placer le filon volcanique dans l'ordre des événements.

Problème : Conclusion scientifique (8 pts)
1. Rédiger l'histoire géologique de la région en 5 lignes.
2. Expliquer pourquoi chaque événement est placé à cet endroit.
3. Relier la conclusion à l'idée du chapitre : ${idea}`;
  }

  function generatedRichTechnologyExamPrompt(normalizedTopic, topic, number, duration) {
    return `Examen ${number} - ${topic}

Durée : ${duration} — Barème : 20 points

Système étudié : porte automatique d'un établissement scolaire.

Exercice 1 : Analyse fonctionnelle (5 pts)
1. Identifier le besoin satisfait par le système.
2. Formuler la fonction globale avec un verbe d'action.
3. Donner deux contraintes de fonctionnement.

Exercice 2 : Chaînes du système (7 pts)
1. Compléter la chaîne d'énergie : alimenter, distribuer, convertir, transmettre.
2. Compléter la chaîne d'information : acquérir, traiter, communiquer.
3. Associer un composant à chaque fonction.

Problème : Diagnostic (8 pts)
La porte ne s'ouvre plus lorsqu'une personne s'approche.
1. Proposer deux causes possibles.
2. Indiquer la fonction technique concernée.
3. Proposer un test simple pour localiser la panne.`;
  }

  function generatedRichFrenchExamPrompt(topic, number, duration) {
    return `Examen ${number} - ${topic}

Durée : ${duration} — Barème : 20 points

Texte original : Le matin de l'examen, Sami relut ses notes sans paniquer. Il savait que comprendre valait mieux qu'apprendre des phrases par cœur. Dans la cour, ses camarades parlaient vite, mais lui préféra respirer, relire la consigne et organiser ses idées.

Exercice 1 : Compréhension (5 pts)
1. Identifier le personnage principal.
2. Relever deux attitudes positives face à l'examen.
3. Expliquer la phrase : comprendre valait mieux qu'apprendre par cœur.

Exercice 2 : Langue (7 pts)
1. Donner le temps du verbe « relut ».
2. Transformer la phrase « Sami relut ses notes » au présent.
3. Relever un connecteur logique ou temporel.

Production écrite (8 pts)
Rédiger un paragraphe de 8 lignes : comment bien se préparer à un devoir ?`;
  }

  function generatedRichEnglishExamPrompt(topic, number, duration) {
    return `Exam ${number} - ${topic}

Duration: ${duration === "1 h" ? "1 hour" : "45 minutes"} — Mark: 20 points

Text: Nour is a second-year science student. She uses a small notebook to write new words, formulas and questions. Before a test, she studies with two classmates. They explain lessons to each other and check their answers carefully.

Exercise 1: Reading comprehension (5 pts)
1. Who is Nour?
2. What does she write in her notebook?
3. Why does she study with classmates?

Exercise 2: Language (7 pts)
1. Put this sentence in the past: She uses a notebook.
2. Complete: They ... their answers carefully.
3. Give the opposite of new.

Writing task (8 pts)
Write a short paragraph about your best way to prepare for exams.`;
  }

  function generatedRichArabicExamPrompt(topic, number, duration) {
    return `امتحان ${number} - ${topic}

المدة : ${duration === "1 h" ? "ساعة" : "45 دقيقة"} — السلم : 20 نقطة

نص أصلي : دخلت ليلى إلى قاعة المراجعة وهي تحمل دفترا صغيرا. كانت تكتب فيه الكلمات الصعبة والأفكار الأساسية. قالت لصديقتها: إن الفهم الجيد يجعل الامتحان أسهل من الحفظ السريع.

التمرين 1 : الفهم (5 نقاط)
1. من الشخصية الرئيسية في النص؟
2. ماذا كانت تكتب في الدفتر؟
3. اشرح معنى العبارة: الفهم الجيد يجعل الامتحان أسهل.

التمرين 2 : اللغة (7 نقاط)
1. استخرج فعلا ماضيا من النص.
2. هات مرادف كلمة «أسهل».
3. ركب جملة مفيدة باستعمال كلمة «مراجعة».

الإنتاج الكتابي (8 نقاط)
اكتب فقرة قصيرة حول طريقة الاستعداد الجيد للامتحان.`;
  }

  function generatedRichHumanitiesExamPrompt(tone, topic, idea, number, duration) {
    return `Examen ${number} - ${topic}

Durée : ${duration} — Barème : 20 points

Document original : Dans une ville côtière, la population augmente rapidement. Les habitants demandent plus de transport, d'eau potable et d'espaces verts. Le conseil municipal prépare un plan pour mieux organiser les services et protéger l'environnement.

Exercice 1 : Compréhension du document (5 pts)
1. Identifier le thème principal du document.
2. Relever deux besoins de la population.
3. Définir un mot important du chapitre.

Exercice 2 : Analyse (7 pts)
1. Expliquer la relation entre population et services publics.
2. Donner un exemple de décision utile.
3. Justifier la réponse avec un indice du document.

Sujet de synthèse (8 pts)
Rédiger une réponse organisée autour de : ${idea}`;
  }

  function generatedRichExamCorrectionSteps(tone, topic, number) {
    const normalizedTopic = normalize(topic);

    if (tone === "math" && normalizedTopic.includes("fonction")) {
      return [
        `Exercice 1

D_h = R \\ {-3} car le dénominateur x + 3 ne doit pas être nul.
h(0) = -1/3 et h(1) = 1/4.
h(x) = 0 ⇔ 2x - 1 = 0 ⇔ x = 1/2.`,
        `Exercice 2

D_f = R \\ {-2, 2}.
Le domaine est symétrique et f(-x) = f(x), donc f est paire.
f(3) = 10/5 = 2 et f(5) = 26/21.`,
        `Problème

f(u) - f(v) = 5(v - u)(v + u) / [(u² - 4)(v² - 4)].
Sur ]2, +∞[, tous les facteurs sont positifs, donc f(u) - f(v) > 0.`,
        `Conclusion de variation

Si u < v, alors f(u) > f(v).
Donc f est strictement décroissante sur ]2, +∞[.
Sur [3, 5], on obtient 26/21 ≤ f(x) ≤ 2.`,
        `Composée

(g ∘ f)(x) = 1 / f(x) = (x² - 4)/(x² + 1).
Comme x² + 1 n'est jamais nul dans R, le domaine reste D_f = R \\ {-2, 2}.`,
      ];
    }

    if (tone === "math" && normalizedTopic.includes("geometr")) {
      return [
        "AB = (4 ; 2) et BC = (-2 ; 4). Ces coordonnées s'obtiennent en soustrayant les coordonnées des points.",
        "AB = √(4² + 2²) = √20 = 2√5 et BC = √((-2)² + 4²) = 2√5.",
        "AB · BC = 4 × (-2) + 2 × 4 = 0, donc AB et BC sont perpendiculaires.",
        "Le triangle ABC est rectangle en B. Pour le parallélogramme, D = A + C - B = (-1 ; 6).",
        "L'aire vaut AB × BC = 2√5 × 2√5 = 20 unités d'aire.",
      ];
    }

    if (tone === "math" && normalizedTopic.includes("probleme")) {
      return [
        "Le coût total est C(x) = 120 + 8x car 120 est fixe et chaque élève ajoute 8 dinars.",
        "C(15) = 120 + 8 × 15 = 240. Pour 15 élèves, le coût est 240 dinars.",
        "C(x) = 320 donne 120 + 8x = 320, donc 8x = 200 et x = 25.",
        "C(x) > 400 donne 120 + 8x > 400, donc x > 35.",
        "Le nombre minimal d'élèves est 36, et C(36) = 120 + 288 = 408 > 400.",
      ];
    }

    if (tone === "math") {
      return [
        "Développement : A(x) = 2x² - 5x - 3 - (x² - 6x + 9) = x² + x - 12.",
        "Factorisation : A(x) = (x - 3)[(2x + 1) - (x - 3)] = (x - 3)(x + 4).",
        "Équation : A(x) = 0 ⇔ (x - 3)(x + 4) = 0, donc x = 3 ou x = -4.",
        "Signe : A(x) est positif sur ]-∞, -4] ∪ [3, +∞[ et négatif sur [-4, 3].",
        "Vérification : A(4) = 8 avec la forme initiale et avec la forme factorisée.",
      ];
    }

    if (tone === "physique") {
      if (normalizedTopic.includes("electric")) {
        return [
          "Le circuit contient un générateur, une lampe, un conducteur ohmique et des fils de connexion.",
          "La loi d'Ohm est U = R × I. Donc I = U / R = 6 / 12 = 0,5 A = 500 mA.",
          "Avec R = 4 Ω, I = 6 / 4 = 1,5 A. L'intensité est trois fois plus grande.",
          "Une intensité trop grande peut échauffer le dipôle et l'endommager.",
          "La réponse complète doit toujours préciser la formule, le remplacement numérique et l'unité.",
        ];
      }
      if (normalizedTopic.includes("mouvement")) {
        return [
          "La vitesse moyenne se calcule par v = d / t.",
          "Pour le premier mobile : v = 120 / 15 = 8 m/s, soit 8 × 3,6 = 28,8 km/h.",
          "Pour le second mobile : v = 90 / 10 = 9 m/s.",
          "Le second mobile est plus rapide car 9 m/s > 8 m/s.",
          "La conclusion doit comparer les valeurs avec la même unité.",
        ];
      }
      return [
        "Conversions : 250 g = 0,250 kg et 200 mL = 0,200 L.",
        "La masse volumique se calcule par ρ = m / V = 250 / 200 = 1,25 g/mL.",
        "En g/L, 1,25 g/mL = 1250 g/L.",
        "Pour le second liquide : m = ρ × V = 0,8 × 500 = 400 g.",
        "La conclusion compare les liquides à partir des masses volumiques calculées.",
      ];
    }

    if (tone === "chimie") {
      if (normalizedTopic.includes("reaction")) {
        return [
          "Les réactifs sont CH4 et O2 ; les produits sont CO2 et H2O.",
          "Équation équilibrée : CH4 + 2O2 -> CO2 + 2H2O.",
          "Vérification : 1 C, 4 H et 4 O dans chaque membre.",
          "Pour 1 mol de CH4, il faut 2 mol de O2 et il se forme 1 mol de CO2.",
          "Les coefficients indiquent les proportions de réaction.",
        ];
      }
      if (normalizedTopic.includes("solution")) {
        return [
          "Le soluté est l'espèce dissoute, le solvant dissout le soluté, la solution est le mélange homogène.",
          "C_m = m / V = 8 / 0,40 = 20 g/L.",
          "Ce résultat signifie qu'un litre de solution contient 20 g de sel.",
          "Dans une dilution, la masse de soluté prélevée ne change pas lorsqu'on ajoute de l'eau.",
          "Masse prélevée : m = C × V = 20 × 0,100 = 2 g ; nouvelle concentration : 2 / 0,500 = 4 g/L.",
        ];
      }
      return [
        "Pour 23/11 Na, Z = 11 et A = 23.",
        "L'atome contient 11 protons, 11 électrons et 23 - 11 = 12 neutrons.",
        "Na+ a perdu un électron : il contient donc 10 électrons.",
        "O2 et H2O sont des molécules ; Na+ et Cl- sont des ions.",
        "La matière peut être constituée d'atomes, de molécules ou d'ions selon les espèces étudiées.",
      ];
    }

    if (tone === "science") {
      return [
        "Les éléments du document sont les couches A, B, C, la faille F et le filon volcanique.",
        "Principe de superposition : C est plus ancienne que B, et B est plus ancienne que A.",
        "La faille F coupe les trois couches, donc elle est postérieure aux couches A, B et C.",
        "Le filon traverse C et B mais pas A : il est postérieur à C et B, mais antérieur à A.",
        "L'histoire géologique doit être rédigée dans l'ordre : dépôt de C, dépôt de B, filon, dépôt de A, faille F.",
      ];
    }

    if (tone === "technologie") {
      return [
        "Le besoin est de permettre l'ouverture automatique d'une porte lorsqu'une personne arrive.",
        "La fonction globale peut être : ouvrir et fermer automatiquement l'accès à un lieu.",
        "Chaîne d'énergie : alimenter par secteur/batterie, distribuer, convertir avec moteur, transmettre au mécanisme.",
        "Chaîne d'information : acquérir avec capteur, traiter avec carte électronique, communiquer l'ordre au moteur.",
        "Si la porte ne s'ouvre plus, on teste d'abord le capteur puis l'alimentation et le moteur.",
      ];
    }

    if (tone === "francais") {
      return [
        "Le personnage principal est Sami. Le thème du texte est la préparation calme à l'examen.",
        "Deux attitudes positives : relire la consigne et organiser ses idées avant de répondre.",
        "La phrase signifie qu'il faut comprendre la leçon au lieu de mémoriser sans réfléchir.",
        "Le verbe « relut » est au passé simple ; au présent : Sami relit ses notes.",
        "La production écrite doit contenir une idée principale, deux conseils expliqués et une conclusion.",
      ];
    }

    if (tone === "anglais") {
      return [
        "Nour is a second-year science student.",
        "She writes new words, formulas and questions in her notebook.",
        "She studies with classmates because they explain lessons and check answers together.",
        "Past form: She used a notebook. Complete sentence: They check their answers carefully. Opposite of new: old.",
        "The writing task should include preparation habits, examples and a clear final sentence.",
      ];
    }

    if (tone === "arabe") {
      return [
        "الشخصية الرئيسية هي ليلى، وموضوع النص هو الاستعداد الجيد للامتحان.",
        "كانت تكتب الكلمات الصعبة والأفكار الأساسية في دفتر صغير.",
        "معنى العبارة أن الفهم يساعد التلميذ أكثر من الحفظ السريع دون وعي.",
        "فعل ماض من النص: دخلت أو كانت. مرادف أسهل: أيسر.",
        "في الإنتاج الكتابي أكتب فقرة مترابطة تتضمن فكرة ونصيحتين وخاتمة.",
      ];
    }

    return [
      "Idée principale : comprendre la relation entre les besoins de la population, les services publics et l'organisation de l'espace.",
      "Deux besoins cités : transport, eau potable ou espaces verts.",
      "Un exemple de décision utile : améliorer les transports publics ou protéger les espaces verts.",
      "La justification s'appuie sur un indice du document et sur le vocabulaire du chapitre.",
      `La synthèse doit répondre au thème « ${topic} » avec introduction courte, arguments et conclusion.`,
    ];
  }

  function generatedExamFigure(tone, topic) {
    const normalizedTopic = normalize(topic);
    if (tone === "math" && normalizedTopic.includes("geometr")) return "math-vectors";
    if (tone === "math" && normalizedTopic.includes("fonction")) return "math-parabola";
    if (tone === "math") return "math-affine";
    if (tone === "physique") return normalizedTopic.includes("electric") ? "phys-circuit" : "phys-motion-graph";
    if (tone === "chimie") return normalizedTopic.includes("mati") ? "chem-atom" : undefined;
    if (tone === "science") return "svt-cross-section";
    return undefined;
  }

function extraChapterExercisesFor(book, { topic, idea }) {
  const tone = subjectTone(book.subject);

  if (tone === "arabe") {
    return [
      {
        title: "تدريب سريع",
        prompt: `حضّر ثلاثة أسئلة قصيرة حول درس "${topic}" ثم أجب عنها بجمل واضحة.`,
        correction: "يجب أن تكون الأسئلة مرتبطة بالدرس، وأن تكون الأجوبة دقيقة ومستعملة لمفردات النص أو المحور.",
      },
      {
        title: "خلاصة مركزة",
        prompt: `اكتب خلاصة من أربعة أسطر حول "${topic}" تربط فيها بين الفكرة والمعجم والأساليب.`,
        correction: `الخلاصة الجيدة تستعمل فكرة الدرس: ${idea} مع لغة سليمة وترابط واضح بين الجمل.`,
      },
    ];
  }

  if (tone === "anglais") {
    return [
      {
        title: "Quick check",
        prompt: `Prepare three short questions about "${topic}" and answer them in complete sentences.`,
        correction: "The questions must be linked to the lesson, and the answers should be clear, accurate and complete.",
      },
      {
        title: "Mini summary",
        prompt: `Write a four-line summary about "${topic}" using at least three keywords from the lesson.`,
        correction: `A good summary uses the lesson idea: ${idea} It should be organized and written in correct English.`,
      },
    ];
  }

  return [
    {
      title: "Contrôle rapide",
      prompt: `Prépare trois questions courtes sur "${topic}", puis écris les réponses attendues.`,
      correction: "Les questions doivent couvrir les idées essentielles du chapitre et les réponses doivent utiliser le vocabulaire précis.",
    },
    {
      title: "Synthèse du chapitre",
      prompt: `Rédige une mini-synthèse de quatre lignes sur "${topic}" avec au moins trois mots-clés du chapitre.`,
      correction: `La synthèse doit reprendre l'idée centrale: ${idea} Elle doit être organisée, claire et conclure la notion.`,
    },
  ];
}

function renderSelectedFiles() {
  els.selectedFiles.innerHTML = "";
  state.selectedFiles.forEach((file) => {
    const chip = document.createElement("span");
    chip.className = "file-chip";
    chip.title = `${file.name} · ${formatBytes(file.size)}`;
    chip.textContent = `${file.name} · ${formatBytes(file.size)}`;
    els.selectedFiles.appendChild(chip);
  });
}

function loadList(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function saveCustomSubjects() {
  localStorage.setItem(CUSTOM_SUBJECTS_KEY, JSON.stringify(state.customSubjects));
}

function saveHiddenSubjects() {
  localStorage.setItem(HIDDEN_SUBJECTS_KEY, JSON.stringify(state.hiddenSubjects));
}

function isHiddenSubject(subject) {
  return state.hiddenSubjects.some((item) => normalize(item) === normalize(subject));
}

function allSubjects() {
  const documentSubjects = state.documents.map((doc) => doc.subject).filter(Boolean);
  return [...new Set([...defaultSubjects, ...state.customSubjects, ...documentSubjects])]
    .filter((subject) => !isHiddenSubject(subject))
    .sort((a, b) => a.localeCompare(b, "fr"));
}

function renderSubjectInput(selectedSubject = els.subjectInput.value) {
  const subjects = allSubjects();
  els.subjectInput.innerHTML = "";

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = displaySubject(subject);
    els.subjectInput.appendChild(option);
  });

  if (subjects.includes(selectedSubject)) {
    els.subjectInput.value = selectedSubject;
  } else if (subjects.length) {
    els.subjectInput.value = subjects[0];
  }
}

function renderSubjectQuickFilters(activeSubject = els.subjectFilter.value) {
  const subjects = allSubjects();
  els.subjectQuickFilters.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `subject-pill${activeSubject ? "" : " active"}`;
  allButton.dataset.subject = "";
  allButton.dataset.tone = "all";
  allButton.innerHTML = `<i data-lucide="layers-3"></i><span>${escapeHtml(translate("all"))}</span>`;
  els.subjectQuickFilters.appendChild(allButton);

  subjects.forEach((subject) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `subject-pill${subject === activeSubject ? " active" : ""}`;
    button.dataset.subject = subject;
    button.dataset.tone = subjectTone(subject);
    button.innerHTML = `<i data-lucide="${iconForSubject(subject)}"></i><span>${escapeHtml(displaySubject(subject))}</span>`;
    els.subjectQuickFilters.appendChild(button);
  });
}

function iconForSubject(subject) {
  const key = normalize(subject);
  if (key.includes("math")) return "calculator";
  if (key.includes("arabe")) return "languages";
  if (key.includes("anglais")) return "message-circle";
  if (key.includes("franc")) return "pen-line";
  if (key.includes("svt") || key.includes("vie") || key.includes("science")) return "microscope";
  if (key.includes("physique")) return "atom";
  if (key.includes("chimie")) return "flask-conical";
  if (key.includes("tech")) return "cpu";
  if (key.includes("histoire")) return "landmark";
  if (key.includes("geo")) return "map";
  if (key.includes("civique")) return "scale";
  if (key.includes("islam")) return "book-marked";
  return "book-open";
}

function subjectTone(subject) {
  const key = normalize(subject);
  if (key.includes("math")) return "math";
  if (key.includes("arabe")) return "arabe";
  if (key.includes("franc")) return "francais";
  if (key.includes("svt") || key.includes("vie") || key.includes("science")) return "science";
  if (key.includes("physique")) return "physique";
  if (key.includes("chimie")) return "chimie";
  if (key.includes("tech")) return "technologie";
  if (key.includes("histoire")) return "histoire";
  if (key.includes("geo")) return "geographie";
  if (key.includes("anglais")) return "anglais";
  if (key.includes("civique") || key.includes("islam")) return "civique";
  return "default";
}

function setActiveSubject(subject) {
  state.activeSubject = subject || "";
  els.subjectPage.hidden = !state.activeSubject;

  if (!state.activeSubject) {
    delete els.subjectPage.dataset.tone;
    return;
  }

  els.subjectPage.dataset.tone = subjectTone(state.activeSubject);
  els.subjectPageTitle.textContent = displaySubject(state.activeSubject);
  renderSubjectInput(state.activeSubject);
  els.subjectFilter.value = state.activeSubject;
  syncStudyToSubject(state.activeSubject);
  renderSubjectOfficialContent();
}

function closeActiveSubject() {
  state.activeSubject = "";
  els.subjectPage.hidden = true;
  delete els.subjectPage.dataset.tone;
  renderSubjectOfficialContent();
  els.subjectFilter.value = "";
  renderDocuments();
}

function runEditorCommand(event) {
  const button = event.target.closest("button[data-command]");
  if (!button) return;

  const value = button.dataset.value || null;
  els.sheetEditor.focus();
  document.execCommand(button.dataset.command, false, value);
}

function sanitizeEditorHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("script, iframe, object, embed, link, meta").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      if (attribute.name.toLowerCase().startsWith("on")) {
        node.removeAttribute(attribute.name);
      }
    });
  });
  return template.innerHTML.trim();
}

function plainTextFromHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent.trim();
}

function slugify(value) {
  const slug = normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "feuille";
}

function makeSheetHtml({ title, subject, lesson, body }) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { max-width: 820px; margin: 40px auto; padding: 0 20px; color: #17202a; font-family: Arial, sans-serif; line-height: 1.6; }
      header { border-bottom: 2px solid #0f766e; margin-bottom: 24px; padding-bottom: 16px; }
      h1 { margin: 0 0 8px; }
      .meta { color: #667085; }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHtml(title)}</h1>
      <div class="meta">${escapeHtml(subject)}${lesson ? ` · ${escapeHtml(lesson)}` : ""}</div>
    </header>
    <main>${body}</main>
  </body>
</html>`;
}

function updateFilters() {
  const currentSubject = els.subjectFilter.value;
  const currentType = els.typeFilter.value;
  const subjects = allSubjects();
  const types = [...new Set([...defaultTypes, ...state.documents.map((doc) => doc.type).filter(Boolean)])];

  renderSubjectInput();
  renderSubjectQuickFilters(currentSubject);
  renderDeleteSubjectOptions();
  els.subjectFilter.innerHTML = `<option value="">${escapeHtml(translate("allSubjects"))}</option>`;
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = displaySubject(subject);
    els.subjectFilter.appendChild(option);
  });
  els.subjectFilter.value = subjects.includes(currentSubject) ? currentSubject : "";

  els.typeFilter.innerHTML = `<option value="">${escapeHtml(translate("allTypes"))}</option>`;
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = displayType(type);
    els.typeFilter.appendChild(option);
  });
  els.typeFilter.value = types.includes(currentType) ? currentType : "";
}

function renderDeleteSubjectOptions() {
  const subjects = allSubjects();
  els.deleteSubjectInput.innerHTML = "";

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = displaySubject(subject);
    els.deleteSubjectInput.appendChild(option);
  });
}

function filteredDocuments() {
  const query = normalize(els.searchInput.value.trim());
  const subject = els.subjectFilter.value;
  const type = els.typeFilter.value;

  const docs = state.documents.filter((doc) => {
    const tags = Array.isArray(doc.tags) ? doc.tags.join(" ") : "";
    const haystack = normalize([
      doc.title,
      doc.fileName,
      doc.lesson,
      doc.subject,
      doc.type,
      doc.schoolYear,
      tags,
      doc.note,
      doc.bodyText,
    ].join(" "));

    return (!query || haystack.includes(query)) && (!subject || doc.subject === subject) && (!type || doc.type === type);
  });

  const sorted = [...docs];
  sorted.sort((a, b) => {
    if (els.sortInput.value === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (els.sortInput.value === "title") return a.title.localeCompare(b.title, "fr");
    if (els.sortInput.value === "subject") return a.subject.localeCompare(b.subject, "fr");
    if (els.sortInput.value === "size") return b.size - a.size;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return sorted;
}

function renderBookSubjectOptions() {
  const current = els.bookSubjectInput.value;
  const subjects = [...new Set(officialBooks.map((book) => book.subject))].sort((a, b) => a.localeCompare(b, "fr"));

  els.bookSubjectInput.innerHTML = `<option value="">${escapeHtml(translate("allSubjects"))}</option>`;
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = displaySubject(subject);
    els.bookSubjectInput.appendChild(option);
  });

  if (subjects.includes(current)) {
    els.bookSubjectInput.value = current;
  }
}

function filteredBooks() {
  const query = normalize(els.bookSearchInput.value.trim());
  const subject = els.bookSubjectInput.value;
  const resource = els.bookResourceInput.value;

  return officialBooks.filter((book) => {
    const hasVideo = book.videoQueries.length > 0;
    const resourceMatch =
      !resource ||
      resource === "pdf" ||
      resource === "summary" ||
      (resource === "exercise" && book.chapters.length > 0) ||
      (resource === "video" && hasVideo);

    return resourceMatch && (!subject || book.subject === subject) && (!query || bookSearchText(book).includes(query));
  });
}

function selectedChapterBook() {
  return officialBooks.find((book) => book.id === state.activeChapterBookId) || officialBooks[0];
}

function selectedChapter() {
  const book = selectedChapterBook();
  return book.chapters[state.activeChapterIndex] || book.chapters[0];
}

function bookOptionLabel(book) {
  return `${displaySubject(book.subject)} - ${book.title}`;
}

function renderChapterBookOptions() {
  if (!selectedChapterBook()) {
    state.activeChapterBookId = officialBooks[0]?.id || "";
  }

  setSelectOptions(
    els.chapterBookInput,
    officialBooks.map((book) => ({ value: book.id, label: bookOptionLabel(book) })),
    state.activeChapterBookId
  );
}

function renderChapterOptions() {
  const book = selectedChapterBook();
  const chapters = book?.chapters || [];

  if (state.activeChapterIndex >= chapters.length) {
    state.activeChapterIndex = 0;
  }

  setSelectOptions(
    els.chapterInput,
    chapters.map((chapter, index) => ({ value: index.toString(), label: `${index + 1}. ${chapter.title}` })),
    state.activeChapterIndex.toString()
  );
}

function renderChapterDetail() {
  const book = selectedChapterBook();
  const chapter = selectedChapter();
  if (!book || !chapter) return;

  const tab = state.activeChapterTab || "lesson";
  const authoredAll = chapterExercisesFor(book, chapter);
  const authoredExercises = authoredAll.filter((exercise) => !isPracticeProblem(exercise));
  const problemExercises = authoredAll.filter(isPracticeProblem);
  const authored = chapterContentFor(book, chapter);
  const practiceExercises =
    state.activeDifficulty === "all"
      ? authoredExercises
      : authoredExercises.filter((exercise) => exercise.difficulty === state.activeDifficulty);
  const selectedProblems =
    state.activeDifficulty === "all"
      ? problemExercises
      : problemExercises.filter((exercise) => exercise.difficulty === state.activeDifficulty);
  const officialExercises = officialManualExercisesFor(book, chapter, "all");
  const chapterExams = chapterExamsFor(book, chapter);

  const objectiveBlock = authored?.objective
    ? `
      <div class="chapter-objective">
        <i data-lucide="target"></i>
        <div>
          <strong>${escapeHtml(translate("objectiveTitle"))}</strong>
          <span>${escapeHtml(authored.objective)}</span>
        </div>
      </div>
    `
    : "";
  const essentialsBlock = authored?.essentials?.length
    ? `
      <section class="chapter-essentials">
        <div class="chapter-block-title">
          <i data-lucide="sparkles"></i>
          <strong>${escapeHtml(translate("essentialsTitle"))}</strong>
        </div>
        <ul>${authored.essentials.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </section>
    `
    : "";
  const keyTermsBlock = authored?.keyTerms?.length
    ? `
      <section class="chapter-keyterms">
        <div class="chapter-block-title">
          <i data-lucide="book-marked"></i>
          <strong>${escapeHtml(translate("keyTermsTitle"))}</strong>
        </div>
        <dl>${authored.keyTerms
          .map((item) => `<div><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.definition)}</dd></div>`)
          .join("")}</dl>
      </section>
    `
    : "";
  const pdfLinks = book.parts
    .map(
      (part) => `
        <a class="resource-link" href="${manualPath(part.file)}" target="_blank" rel="noopener">
          <i data-lucide="file-text"></i>
          ${escapeHtml(part.label)}
        </a>
      `
    )
    .join("");
  const videoBlock = book.videoQueries?.length
    ? `
      <section class="chapter-videos">
        <div class="chapter-block-title">
          <i data-lucide="play-circle"></i>
          <strong>${escapeHtml(translate("videosSectionTitle"))}</strong>
        </div>
        <div class="resource-links">
          ${book.videoQueries
            .slice(0, 3)
            .map(
              (query, index) => `
                <a class="resource-link soft" href="${youtubeSearchUrl(query)}" target="_blank" rel="noopener">
                  <i data-lucide="play-circle"></i>
                  ${escapeHtml(translate("videoNumber", { number: index + 1 }))}
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    `
    : "";

  const lessonPanel = `
    <p class="chapter-focus-label">${escapeHtml(translate("chapterFocus"))}</p>
    <p class="chapter-focus-summary">${escapeHtml(chapter.summary)}</p>
    ${objectiveBlock}
    <section class="chapter-booklinks">
      <div class="chapter-block-title">
        <i data-lucide="book-open-check"></i>
        <strong>${escapeHtml(translate("manualSectionTitle"))}</strong>
      </div>
      <div class="resource-links">${pdfLinks}</div>
    </section>
    ${essentialsBlock}
    ${keyTermsBlock}
    ${videoBlock}
  `;

  const officialExerciseCards = officialExercises
    .map((exercise, index) => {
      const part = manualExercisePart(book, exercise);
      const pageLabel = exercise.page ? translate("officialExercisePage", { page: exercise.page }) : part?.label || "";
      const content = officialExerciseFullContentFor(book, chapter, exercise);
      const correctionId = `official-correction-${book.id}-${state.activeChapterIndex}-${index}`;

      return `
        <article class="official-exercise-card">
          <div class="official-exercise-meta">
            <span class="official-exercise-label">${escapeHtml(translate("officialExerciseNumber", { number: index + 1 }))}</span>
            <em class="difficulty-badge" data-difficulty="${exercise.difficulty}">${escapeHtml(displayDifficulty(exercise.difficulty))}</em>
            ${pageLabel ? `<span class="official-page">${escapeHtml(pageLabel)}</span>` : ""}
          </div>
          <h4>${escapeHtml(exercise.title)}</h4>
          <p class="official-source">
            <strong>${escapeHtml(translate("officialExerciseSource"))}</strong>
            ${escapeHtml([part?.label, exercise.source].filter(Boolean).join(" · "))}
          </p>
          ${officialStatementBlock(content)}
          ${figureBlock(exercise.figure)}
          <div class="resource-links official-card-actions">
            <button class="resource-link correction-toggle" type="button" data-action="toggle-official-correction" aria-expanded="false" aria-controls="${escapeHtml(correctionId)}">
              <i data-lucide="check-circle-2"></i>
              <span>${escapeHtml(translate("showDetailedCorrection"))}</span>
            </button>
            <a class="resource-link" href="${manualExercisePath(book, exercise)}" target="_blank" rel="noopener">
              <i data-lucide="external-link"></i>
              ${escapeHtml(translate("openManualPage"))}
            </a>
          </div>
          ${officialCorrectionBlock(book, chapter, exercise, content, correctionId)}
        </article>
      `;
    })
    .join("");

  const manualPanel = `
    <div class="chapter-focus-header official-header">
      <strong>${escapeHtml(translate("officialExercisesTitle"))}</strong>
      <span>${escapeHtml(translate("officialExercisesIntro"))}</span>
    </div>
    ${
      officialExerciseCards
        ? `<div class="official-exercise-list">${officialExerciseCards}</div>`
        : `<p class="official-empty">${escapeHtml(translate("noOfficialExercise"))}</p>`
    }
  `;

  const difficultyChips = ["all", "easy", "medium", "hard"]
    .map(
      (level) => `
        <button type="button" class="difficulty-chip${state.activeDifficulty === level ? " active" : ""}" data-set-difficulty="${level}"${level === "all" ? "" : ` data-difficulty="${level}"`}>
          ${escapeHtml(level === "all" ? translate("allDifficulties") : displayDifficulty(level))}
        </button>
      `
    )
    .join("");

  const practiceCards = practiceExercises
    .map(
      (exercise, index) => `
        <details class="chapter-exercise chapter-focus-exercise">
          <summary>
            <span>${escapeHtml(translate("exerciseNumber", { number: index + 1 }))}</span>
            <em class="difficulty-badge" data-difficulty="${exercise.difficulty}">${escapeHtml(displayDifficulty(exercise.difficulty))}</em>
            ${isPracticeProblem(exercise) ? `<em class="problem-badge">${escapeHtml(translate("problemBadge"))}</em>` : ""}
            <strong class="exercise-title">${escapeHtml(exercise.title)}</strong>
          </summary>
          ${practicePromptBlock(exercise)}
          ${figureBlock(exercise.figure)}
          ${correctionBlock(exercise)}
        </details>
      `
    )
    .join("");

  const problemCards = selectedProblems
    .map(
      (exercise, index) => `
        <details class="chapter-exercise chapter-focus-exercise problem-exercise-card">
          <summary>
            <span>${escapeHtml(translate("problemBadge"))} ${index + 1}</span>
            <em class="difficulty-badge" data-difficulty="${exercise.difficulty}">${escapeHtml(displayDifficulty(exercise.difficulty))}</em>
            <strong class="exercise-title">${escapeHtml(exercise.title)}</strong>
          </summary>
          ${practicePromptBlock(exercise)}
          ${figureBlock(exercise.figure)}
          ${correctionBlock(exercise)}
        </details>
      `
    )
    .join("");

  const examCards = chapterExams
    .map(
      (exam, index) => `
        <details class="chapter-exercise chapter-focus-exercise exam-card">
          <summary>
            <span>${escapeHtml(translate("examNumber", { number: index + 1 }))}</span>
            <em class="difficulty-badge" data-difficulty="${exam.difficulty}">${escapeHtml(displayDifficulty(exam.difficulty))}</em>
            <strong class="exercise-title">${escapeHtml(exam.title)}</strong>
          </summary>
          <div class="exam-meta">
            <span><strong>${escapeHtml(translate("examDuration"))}</strong> ${escapeHtml(exam.duration)}</span>
            <span><strong>${escapeHtml(translate("examScale"))}</strong> ${escapeHtml(exam.scale)}</span>
          </div>
          ${examPromptBlock(exam)}
          ${figureBlock(exam.figure)}
          ${correctionBlock(exam, "exam-correction")}
        </details>
      `
    )
    .join("");

  const practicePanel = `
    <div class="chapter-focus-header">
      <strong>${escapeHtml(practiceSummaryLabel(practiceExercises))}</strong>
      <span>${escapeHtml(translate("practiceIntro"))}</span>
    </div>
    <div class="difficulty-filter" role="group" aria-label="${escapeHtml(translate("difficulty"))}">${difficultyChips}</div>
    ${
      practiceCards
        ? `<div class="chapter-focus-list">${practiceCards}</div>`
        : `<p class="official-empty">${escapeHtml(translate("noPracticeExercise"))}</p>`
    }
  `;

  const problemsPanel = `
    <div class="chapter-focus-header problems-header">
      <strong>${escapeHtml(problemsSummaryLabel(selectedProblems))}</strong>
      <span>${escapeHtml(translate("problemsIntro"))}</span>
    </div>
    <div class="difficulty-filter" role="group" aria-label="${escapeHtml(translate("difficulty"))}">${difficultyChips}</div>
    ${
      problemCards
        ? `<div class="chapter-focus-list problems-list">${problemCards}</div>`
        : `<p class="official-empty">${escapeHtml(translate("noProblemExercise"))}</p>`
    }
  `;

  const examsPanel = `
    <div class="chapter-focus-header exams-header">
      <strong>${escapeHtml(examsSummaryLabel(chapterExams))}</strong>
      <span>${escapeHtml(translate("examsIntro"))}</span>
    </div>
    <div class="chapter-focus-list exams-list">${examCards}</div>
  `;

  const panels = { lesson: lessonPanel, manual: manualPanel, practice: practicePanel, problems: problemsPanel, exams: examsPanel };
  const tabsBar = `
    <div class="chapter-tabs" role="tablist">
      <button type="button" class="chapter-tab${tab === "lesson" ? " active" : ""}" data-chapter-tab="lesson" role="tab" aria-selected="${tab === "lesson"}">
        <i data-lucide="book-open-check"></i>
        <span>${escapeHtml(translate("tabLesson"))}</span>
      </button>
      <button type="button" class="chapter-tab${tab === "manual" ? " active" : ""}" data-chapter-tab="manual" role="tab" aria-selected="${tab === "manual"}">
        <i data-lucide="file-text"></i>
        <span>${escapeHtml(translate("tabManual"))}</span>
        <em class="chapter-tab-count">${officialExercises.length}</em>
      </button>
      <button type="button" class="chapter-tab${tab === "practice" ? " active" : ""}" data-chapter-tab="practice" role="tab" aria-selected="${tab === "practice"}">
        <i data-lucide="list-checks"></i>
        <span>${escapeHtml(translate("tabPractice"))}</span>
        <em class="chapter-tab-count">${authoredExercises.length}</em>
      </button>
      <button type="button" class="chapter-tab${tab === "problems" ? " active" : ""}" data-chapter-tab="problems" role="tab" aria-selected="${tab === "problems"}">
        <i data-lucide="badge-alert"></i>
        <span>${escapeHtml(translate("tabProblems"))}</span>
        <em class="chapter-tab-count">${problemExercises.length}</em>
      </button>
      <button type="button" class="chapter-tab${tab === "exams" ? " active" : ""}" data-chapter-tab="exams" role="tab" aria-selected="${tab === "exams"}">
        <i data-lucide="clipboard-check"></i>
        <span>${escapeHtml(translate("tabExams"))}</span>
        <em class="chapter-tab-count">${chapterExams.length}</em>
      </button>
    </div>
  `;

  els.chapterDetail.dataset.tone = subjectTone(book.subject);
  els.chapterDetail.innerHTML = `
    <div class="chapter-detail-heading">
      <span class="doc-icon"><i data-lucide="${iconForSubject(book.subject)}"></i></span>
      <div>
        <p class="book-subject">${escapeHtml(displaySubject(book.subject))}</p>
        <h3>${escapeHtml(chapter.title)}</h3>
        <p>${escapeHtml(book.title)}</p>
      </div>
    </div>
    ${tabsBar}
    <div class="chapter-panel" role="tabpanel">${panels[tab] || lessonPanel}</div>
  `;

  renderLucide();
}

function figureBlock(figure) {
  const svg = figureSvg(figure);
  if (!svg) return "";
  return `
    <figure class="exercise-figure">
      ${svg}
      ${chapterFigureCaptions[figure] ? `<figcaption>${escapeHtml(chapterFigureCaptions[figure])}</figcaption>` : ""}
    </figure>
  `;
}

function correctionBlock(exercise, extraClass = "") {
  const methodSteps = practiceCorrectionMethodSteps(exercise);
  const method = methodSteps.length
    ? `
      <section class="correction-method">
        <strong>${escapeHtml(translate("correctionMethodTitle"))}</strong>
        <ol class="method-steps">${methodSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      </section>
    `
    : "";
  const text = exercise.correction ? `<p class="correction-text">${escapeHtml(cleanMultilineText(exercise.correction))}</p>` : "";
  const steps = teacherStepList(practiceApplicationSteps(exercise));
  const drawing = teacherDrawingBlock(null, null, exercise, { intro: exercise.prompt, correctionIntro: exercise.correction });
  return `
    <div class="chapter-correction ${extraClass}">
      <strong class="correction-heading">${escapeHtml(translate("correction"))}</strong>
      ${method}
      ${drawing}
      <section class="correction-application">
        <strong>${escapeHtml(translate("correctionApplicationTitle"))}</strong>
        ${text}
        ${steps}
      </section>
    </div>
  `;
}

function practicePromptBlock(exercise) {
  return `<div class="practice-statement${isPracticeProblem(exercise) ? " problem-statement" : ""}">${escapeHtml(cleanMultilineText(exercise.prompt))}</div>`;
}

function examPromptBlock(exam) {
  return `<div class="practice-statement exam-statement">${escapeHtml(cleanMultilineText(exam.prompt))}</div>`;
}

function practiceCorrectionMethodSteps(exercise) {
  const exerciseText = normalize([exercise.title, exercise.prompt, exercise.correction, ...(exercise.steps || [])].join(" "));
  if (exerciseText.includes("equation") || exerciseText.includes("resous")) {
    return [
      "Je transforme l'équation pour isoler l'inconnue ou obtenir un produit nul.",
      "Je garde une seule opération par ligne pour éviter les erreurs de signe.",
      "Je vérifie la solution dans l'équation de départ.",
    ];
  }
  if (exerciseText.includes("factor") || exerciseText.includes("develop") || exerciseText.includes("reduis")) {
    return [
      "Je repère d'abord la forme : facteur commun, distributivité ou identité remarquable.",
      "Je traite les parenthèses avec attention, puis je regroupe les termes semblables.",
      "Je contrôle le résultat en refaisant l'opération inverse.",
    ];
  }
  return [
    "Je repère les données, les mots importants et ce que la question demande exactement.",
    "Je choisis la règle, la formule ou la méthode du chapitre avant de calculer.",
    "Je rédige une conclusion claire avec unité, justification ou phrase complète selon la matière.",
  ];
}

function practiceGeneratedCorrectionSteps(exercise) {
  const exerciseText = normalize([exercise.title, exercise.prompt, exercise.correction].join(" "));
  if (exerciseText.includes("equation") || exerciseText.includes("resous")) {
    return [
      `Je pars de l'égalité donnée : ${exercise.prompt}`,
      "Je fais la même opération des deux côtés jusqu'à isoler l'inconnue ou obtenir un produit nul.",
      `J'obtiens la correction : ${exercise.correction}`,
      "Je remplace la valeur trouvée dans l'énoncé pour vérifier qu'elle convient.",
    ];
  }
  if (exerciseText.includes("factor") || exerciseText.includes("develop") || exerciseText.includes("reduis")) {
    return [
      `Je pars de l'expression de l'énoncé : ${exercise.prompt}`,
      "Je repère les termes communs ou les parenthèses à traiter avant de calculer.",
      `La transformation donne : ${exercise.correction}`,
      "Je vérifie en redéveloppant ou en recomparant avec l'expression de départ.",
    ];
  }
  return [
    `Je commence par reformuler la consigne : ${exercise.prompt}`,
    "J'applique la méthode indiquée dans le bloc précédent en gardant les données utiles visibles.",
    `La réponse attendue est : ${exercise.correction}`,
    "Je termine en vérifiant que la réponse correspond exactement à la question posée.",
  ];
}

function practiceApplicationSteps(exercise) {
  const authoredSteps = Array.isArray(exercise.steps) && exercise.steps.length ? [...exercise.steps] : [];
  const generatedSteps = practiceGeneratedCorrectionSteps(exercise);
  const steps = authoredSteps.length ? authoredSteps : [...generatedSteps];
  const minimumSteps = 5;

  for (const generatedStep of generatedSteps) {
    if (steps.length >= minimumSteps) break;
    if (!steps.some((step) => normalize(step) === normalize(generatedStep))) {
      steps.push(generatedStep);
    }
  }

  while (steps.length < minimumSteps) {
    steps.push("Je relis l'énoncé, je compare ma réponse avec la question posée et je corrige si une donnée n'a pas été utilisée.");
  }

  return steps;
}

function renderChapterPicker() {
  renderChapterBookOptions();
  renderChapterOptions();
  renderChapterDetail();
}

function renderStudyBreadcrumb() {
  if (!els.studyBreadcrumb) return;

  if (state.activeStudyView !== "books") {
    els.studyBreadcrumb.hidden = true;
    els.studyBreadcrumb.innerHTML = "";
    return;
  }

  const stage = state.studyStage || "subjects";
  const book = selectedChapterBook();
  const chapter = selectedChapter();
  const crumbs = [
    `<button type="button" class="crumb${stage === "subjects" ? " current" : ""}" data-action="study-go" data-stage="subjects">
      <i data-lucide="layout-grid"></i>${escapeHtml(translate("subjectsTitle"))}
    </button>`,
  ];

  if ((stage === "chapters" || stage === "chapter") && book) {
    crumbs.push(`<i data-lucide="chevron-right" class="crumb-sep"></i>`);
    crumbs.push(
      `<button type="button" class="crumb${stage === "chapters" ? " current" : ""}" data-action="study-go" data-stage="chapters">${escapeHtml(displaySubject(book.subject))}</button>`
    );
  }

  if (stage === "chapter" && chapter) {
    crumbs.push(`<i data-lucide="chevron-right" class="crumb-sep"></i>`);
    crumbs.push(`<span class="crumb current">${escapeHtml(chapter.title)}</span>`);
  }

  els.studyBreadcrumb.hidden = false;
  els.studyBreadcrumb.innerHTML = crumbs.join("");
  renderLucide();
}

function renderSubjectCards() {
  const books = filteredBooks();
  els.bookGrid.innerHTML = "";
  els.bookGrid.classList.remove("chapter-cards-mode");
  els.bookEmptyState.classList.toggle("visible", books.length === 0);

  books.forEach((book) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "subject-card";
    card.dataset.tone = subjectTone(book.subject);
    card.dataset.action = "open-subject";
    card.dataset.bookId = book.id;
    card.innerHTML = `
      <span class="doc-icon"><i data-lucide="${iconForSubject(book.subject)}"></i></span>
      <span class="subject-card-body">
        <span class="book-subject">${escapeHtml(displaySubject(book.subject))}</span>
        <strong>${escapeHtml(book.title)}</strong>
        <span class="subject-card-summary">${escapeHtml(book.summary)}</span>
        <span class="subject-card-meta"><i data-lucide="list-tree"></i>${escapeHtml(translate("chaptersCount", { count: book.chapters.length }))}</span>
      </span>
      <i data-lucide="chevron-right" class="subject-card-go"></i>
    `;
    els.bookGrid.appendChild(card);
  });

  renderLucide();
}

function renderChapterCards() {
  const book = selectedChapterBook();
  if (!book) return;

  els.bookEmptyState.classList.remove("visible");
  els.bookGrid.classList.add("chapter-cards-mode");

  const pdfLinks = book.parts
    .map(
      (part) => `
        <a class="resource-link" href="${manualPath(part.file)}" target="_blank" rel="noopener">
          <i data-lucide="file-text"></i>
          ${escapeHtml(part.label)}
        </a>
      `
    )
    .join("");

  const cards = book.chapters
    .map((chapter, index) => {
      const official = officialManualExercisesFor(book, chapter, "all").length;
      const other = chapterExercisesFor(book, chapter).length;
      return `
        <button type="button" class="chapter-card" data-action="open-chapter" data-chapter-index="${index}" data-tone="${subjectTone(book.subject)}">
          <span class="chapter-card-index">${index + 1}</span>
          <span class="chapter-card-body">
            <strong>${escapeHtml(chapter.title)}</strong>
            <span class="chapter-card-summary">${escapeHtml(chapter.summary)}</span>
            <span class="chapter-card-meta">
              <em class="chip-book"><i data-lucide="file-text"></i>${escapeHtml(translate("fromBookShort", { count: official }))}</em>
              <em class="chip-other"><i data-lucide="list-checks"></i>${escapeHtml(translate("otherShort", { count: other }))}</em>
            </span>
          </span>
          <i data-lucide="chevron-right" class="chapter-card-go"></i>
        </button>
      `;
    })
    .join("");

  els.bookGrid.innerHTML = `
    <div class="subject-header" data-tone="${subjectTone(book.subject)}">
      <span class="doc-icon"><i data-lucide="${iconForSubject(book.subject)}"></i></span>
      <div class="subject-header-body">
        <p class="book-subject">${escapeHtml(displaySubject(book.subject))}</p>
        <h3>${escapeHtml(book.title)}</h3>
        <p class="subject-card-summary">${escapeHtml(book.summary)}</p>
        <div class="resource-links">${pdfLinks}</div>
      </div>
    </div>
    <div class="chapter-card-grid">${cards}</div>
  `;

  renderLucide();
}

function renderStudyStage() {
  if (state.activeStudyView !== "books") return;

  const stage = state.studyStage || "subjects";
  const showChapter = stage === "chapter";

  if (els.chapterPicker) els.chapterPicker.hidden = !showChapter;
  els.booksView.hidden = showChapter;

  renderStudyBreadcrumb();

  if (showChapter) {
    renderChapterPicker();
  } else if (stage === "chapters") {
    renderChapterCards();
  } else {
    renderSubjectCards();
  }

  renderLucide();
}

function renderStudyResources() {
  renderBookSubjectOptions();
  renderChapterBookOptions();
  renderChapterOptions();
  renderStudyStage();
}

function setStudyView(view) {
  state.activeStudyView = view === "course" ? "course" : "books";
  const isCourse = state.activeStudyView === "course";

  els.courseView.hidden = !isCourse;

  els.studyTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.studyView === state.activeStudyView);
  });

  if (isCourse) {
    if (els.chapterPicker) els.chapterPicker.hidden = true;
    els.booksView.hidden = true;
    if (els.studyBreadcrumb) {
      els.studyBreadcrumb.hidden = true;
      els.studyBreadcrumb.innerHTML = "";
    }
  } else {
    renderStudyStage();
  }

  renderLucide();
}

function showAppView(view) {
  state.appView = view === "documents" ? "documents" : "programme";
  const isProgramme = state.appView === "programme";

  if (els.studyHub) els.studyHub.hidden = !isProgramme;
  if (els.statsBand) els.statsBand.hidden = isProgramme;
  if (els.subjectBand) els.subjectBand.hidden = isProgramme;
  if (els.documentLibrary) els.documentLibrary.hidden = isProgramme;
  if (els.subjectPage) els.subjectPage.hidden = isProgramme || !state.activeSubject;

  els.appNavTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.appView === state.appView);
  });

  if (isProgramme) {
    renderStudyStage();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderLucide();
}

function renderCourseMenu() {
  els.courseMenu.innerHTML = "";

  interactiveCourses.forEach((course) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `course-menu-button${course.id === state.activeCourseId ? " active" : ""}`;
    button.dataset.action = "select-course";
    button.dataset.courseId = course.id;
    button.dataset.tone = subjectTone(course.subject);
    button.innerHTML = `
      <i data-lucide="${iconForSubject(course.subject)}"></i>
      <span>${escapeHtml(displaySubject(course.subject))}</span>
      <strong>${escapeHtml(course.title)}</strong>
    `;
    els.courseMenu.appendChild(button);
  });

  renderLucide();
}

function renderCourseDetail(courseId = state.activeCourseId) {
  const course = interactiveCourses.find((item) => item.id === courseId) || interactiveCourses[0];
  state.activeCourseId = course.id;

  const steps = course.steps
    .map(
      (step, index) => `
        <li>
          <span>${index + 1}</span>
          <p>${escapeHtml(step)}</p>
        </li>
      `
    )
    .join("");

  const exercises = course.exercises
    .map((exercise, exerciseIndex) => {
      const choices = exercise.choices
        .map(
          (choice, choiceIndex) => `
            <label class="choice-row">
              <input type="radio" name="${exercise.id}" value="${choiceIndex}" />
              <span>${escapeHtml(choice)}</span>
            </label>
          `
        )
        .join("");

      return `
        <section class="exercise-card" data-exercise-id="${exercise.id}">
          <div class="exercise-number">${exerciseIndex + 1}</div>
          <div>
            <h4>${escapeHtml(exercise.question)}</h4>
            <div class="choice-list">${choices}</div>
            <div class="exercise-actions">
              <button class="secondary-button" type="button" data-action="check-exercise" data-exercise-id="${exercise.id}">
                <i data-lucide="check"></i>
                Corriger
              </button>
            </div>
            <div class="exercise-feedback" hidden></div>
          </div>
        </section>
      `;
    })
    .join("");

  const videos = course.videoQueries
    .map(
      (query, index) => `
          <a class="resource-link soft" href="${youtubeSearchUrl(query)}" target="_blank" rel="noopener">
            <i data-lucide="play-circle"></i>
          ${escapeHtml(translate("videoNumber", { number: index + 1 }))}
        </a>
      `
    )
    .join("");

  els.courseDetail.dataset.tone = subjectTone(course.subject);
  els.courseDetail.innerHTML = `
    <div class="course-heading">
      <div>
        <p class="book-subject">${escapeHtml(displaySubject(course.subject))}</p>
        <h3>${escapeHtml(course.title)}</h3>
      </div>
      <span class="course-badge">${escapeHtml(translate("exerciseCount", { count: course.exercises.length }))}</span>
    </div>
    <p class="course-goal">${escapeHtml(course.goal)}</p>
    <div class="doc-tags">${keywordChips(course.keywords)}</div>
    <ol class="course-steps">${steps}</ol>
    <div class="resource-links">${videos}</div>
    <div class="exercise-list">${exercises}</div>
  `;

  renderCourseMenu();
  renderLucide();
}

function handleStudyClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  if (action === "open-subject") {
    state.activeChapterBookId = button.dataset.bookId;
    state.activeChapterIndex = 0;
    state.studyStage = "chapters";
    renderStudyStage();
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "open-chapter") {
    state.activeChapterIndex = Number(button.dataset.chapterIndex) || 0;
    state.activeChapterTab = "lesson";
    state.studyStage = "chapter";
    renderStudyStage();
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "study-go") {
    state.studyStage = button.dataset.stage || "subjects";
    renderStudyStage();
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "open-course") {
    state.activeCourseId = button.dataset.courseId;
    setStudyView("course");
    renderCourseDetail(state.activeCourseId);
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleChapterDetailClick(event) {
  const tabButton = event.target.closest("[data-chapter-tab]");
  if (tabButton) {
    state.activeChapterTab = tabButton.dataset.chapterTab || "lesson";
    renderChapterDetail();
    return;
  }

  const correctionButton = event.target.closest('[data-action="toggle-official-correction"]');
  if (correctionButton) {
    const correction = document.getElementById(correctionButton.getAttribute("aria-controls"));
    if (!correction) return;

    const shouldOpen = correction.hidden;
    correction.hidden = !shouldOpen;
    correctionButton.setAttribute("aria-expanded", String(shouldOpen));
    const label = correctionButton.querySelector("span");
    if (label) label.textContent = translate(shouldOpen ? "hideDetailedCorrection" : "showDetailedCorrection");
    return;
  }

  const difficultyButton = event.target.closest("[data-set-difficulty]");
  if (difficultyButton) {
    state.activeDifficulty = difficultyButton.dataset.setDifficulty || "all";
    renderChapterDetail();
  }
}

function handleCourseClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (button.dataset.action === "select-course") {
    renderCourseDetail(button.dataset.courseId);
    return;
  }

  if (button.dataset.action === "check-exercise") {
    const exerciseCard = button.closest(".exercise-card");
    const course = interactiveCourses.find((item) => item.id === state.activeCourseId);
    const exercise = course?.exercises.find((item) => item.id === button.dataset.exerciseId);
    const checked = exerciseCard.querySelector("input[type='radio']:checked");
    const feedback = exerciseCard.querySelector(".exercise-feedback");

    if (!exercise || !feedback) return;

    if (!checked) {
      toast(translate("chooseAnswer"));
      return;
    }

    const isCorrect = Number(checked.value) === exercise.answer;
    feedback.hidden = false;
    feedback.className = `exercise-feedback ${isCorrect ? "correct" : "wrong"}`;
    feedback.innerHTML = `
      <strong>${escapeHtml(isCorrect ? translate("correct") : translate("toReview"))}</strong>
      <p>${escapeHtml(exercise.correction)}</p>
    `;
  }
}

function renderStats() {
  const totalSize = state.documents.reduce((sum, doc) => sum + (doc.size || 0), 0);
  const subjects = new Set(state.documents.map((doc) => doc.subject).filter(Boolean));
  els.docCount.textContent = state.documents.length.toString();
  els.totalSize.textContent = formatBytes(totalSize);
  els.subjectCount.textContent = subjects.size.toString();
}

function renderDocuments() {
  const docs = filteredDocuments();
  els.documentGrid.innerHTML = "";
  els.emptyState.classList.toggle("visible", docs.length === 0);
  els.visibleCount.textContent = translate("visibleCount", { count: docs.length, plural: docs.length > 1 ? "s" : "" });
  renderSubjectQuickFilters(els.subjectFilter.value);

  docs.forEach((doc) => {
    const kind = getKind(doc);
    const card = document.createElement("article");
    card.className = "document-card";
    card.dataset.kind = kind;
    card.dataset.tone = subjectTone(doc.subject);

    const date = new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(doc.createdAt));
    const lesson = doc.lesson ? `<span>${escapeHtml(translate("lessonMeta"))}: ${escapeHtml(doc.lesson)}</span><span>·</span>` : "";
    const tags = Array.isArray(doc.tags) && doc.tags.length ? `<div class="doc-tags">${keywordChips(doc.tags, 8)}</div>` : "";
    const note = doc.note ? `<p class="doc-note">${escapeHtml(doc.note)}</p>` : "";

    card.innerHTML = `
      <div class="document-accent"></div>
      <div class="document-body">
        <div class="document-title-row">
          <span class="doc-icon"><i data-lucide="${iconForKind(kind)}"></i></span>
          <div class="document-title">
            <h3>${escapeHtml(doc.title)}</h3>
            <p>${escapeHtml(doc.fileName)}</p>
          </div>
        </div>
        <div class="doc-meta">
          <span>${escapeHtml(displaySubject(doc.subject))}</span>
          <span>·</span>
          ${lesson}
          <span>${escapeHtml(displayType(doc.type))}</span>
          <span>·</span>
          <span>${escapeHtml(doc.schoolYear)}</span>
          <span>·</span>
          <span>${formatBytes(doc.size)}</span>
        </div>
        ${tags}
        ${note}
      </div>
      <div class="card-actions">
        <button type="button" data-action="open" data-id="${doc.id}" title="${escapeHtml(translate("open"))}"><i data-lucide="external-link"></i></button>
        <button type="button" data-action="download" data-id="${doc.id}" title="${escapeHtml(translate("download"))}"><i data-lucide="download"></i></button>
        <button class="delete-action" type="button" data-action="delete" data-id="${doc.id}" title="${escapeHtml(translate("delete"))}"><i data-lucide="trash-2"></i></button>
      </div>
    `;
    card.querySelector(".document-title p").title = `${doc.fileName} · ${translate("addedOn")} ${date}`;
    els.documentGrid.appendChild(card);
  });

  renderLucide();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function cleanMultilineText(value) {
  const lines = String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd());
  const contentLines = lines.filter((line) => line.trim());
  const codeIndentedLines = contentLines.filter((line) => line.startsWith("  ")).length;
  const displayLines = codeIndentedLines > contentLines.length / 2 ? lines.map((line) => (line.startsWith("  ") ? line.slice(2) : line)) : lines;
  return displayLines.join("\n").trim();
}

function getDocument(id) {
  return state.documents.find((doc) => doc.id === id);
}

function openBlob(doc, download = false) {
  const url = URL.createObjectURL(doc.blob);
  if (download) {
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return;
  }

  window.open(url, "_blank", "noopener");
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function refresh() {
  state.documents = await getAllDocuments();
  updateFilters();
  renderStats();
  renderDocuments();
  renderSubjectOfficialContent();
}

function setSelectedFiles(fileList) {
  state.selectedFiles = Array.from(fileList || []);
  renderSelectedFiles();
}

async function handleSubmit(event) {
  event.preventDefault();

  if (!state.selectedFiles.length) {
    toast(translate("chooseFileToast"));
    return;
  }

  const now = new Date().toISOString();
  const title = els.titleInput.value.trim();
  const lesson = els.lessonInput.value.trim();
  const subject = els.subjectInput.value;
  const type = els.typeInput.value;
  const schoolYear = els.yearInput.value.trim() || new Date().getFullYear().toString();
  const tags = parseTags(els.tagsInput.value);
  const note = els.noteInput.value.trim();

  for (const [index, file] of state.selectedFiles.entries()) {
    await saveDocument({
      id: crypto.randomUUID(),
      title: state.selectedFiles.length === 1 && title ? title : fileTitle(file.name),
      lesson,
      fileName: file.name,
      subject,
      type,
      schoolYear,
      tags,
      note,
      size: file.size,
      mime: file.type,
      blob: file,
      createdAt: new Date(Date.now() + index).toISOString(),
      updatedAt: now,
    });
  }

  els.uploadForm.reset();
  els.yearInput.value = new Date().getFullYear().toString();
  state.selectedFiles = [];
  renderSelectedFiles();
  await refresh();
  toast(translate("documentSaved"));
}

async function handleGridClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const doc = getDocument(button.dataset.id);
  if (!doc) return;

  if (button.dataset.action === "open") {
    openBlob(doc);
  }

  if (button.dataset.action === "download") {
    openBlob(doc, true);
  }

  if (button.dataset.action === "delete") {
    state.pendingDeleteId = doc.id;
    els.deleteTarget.textContent = doc.title;
    els.confirmDialog.showModal();
    renderLucide();
  }
}

async function handleDialogClose() {
  if (els.confirmDialog.returnValue !== "delete" || !state.pendingDeleteId) {
    state.pendingDeleteId = null;
    return;
  }

  await removeDocument(state.pendingDeleteId);
  state.pendingDeleteId = null;
  await refresh();
  toast(translate("documentDeleted"));
}

function clearFilters() {
  els.searchInput.value = "";
  els.subjectFilter.value = "";
  els.typeFilter.value = "";
  els.sortInput.value = "newest";
  renderDocuments();
}

function handleSubjectQuickFilter(event) {
  const button = event.target.closest("button[data-subject]");
  if (!button) return;

  const subject = button.dataset.subject;
  els.subjectFilter.value = subject;
  if (subject) {
    renderSubjectInput(subject);
    setActiveSubject(subject);
  } else {
    closeActiveSubject();
  }
  renderDocuments();
  if (subject) {
    els.subjectPage?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleSubjectDataClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (button.dataset.action === "open-subject-chapter") {
    state.activeChapterBookId = button.dataset.bookId;
    state.activeChapterIndex = Number(button.dataset.chapterIndex) || 0;
    state.activeChapterTab = "lesson";
    state.activeDifficulty = "all";
    state.studyStage = "chapter";
    setStudyView("books");
    showAppView("programme");
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.action === "open-subject-course") {
    state.activeCourseId = button.dataset.courseId;
    setStudyView("course");
    showAppView("programme");
    renderCourseDetail(state.activeCourseId);
    els.studyHub?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function saveCreatedSheet(event) {
  event.preventDefault();

  if (!state.activeSubject) {
    toast(translate("chooseSubjectFirst"));
    return;
  }

  const body = sanitizeEditorHtml(els.sheetEditor.innerHTML);
  const bodyText = plainTextFromHtml(body);
  const title = els.sheetTitleInput.value.trim() || "Feuille sans titre";
  const lesson = els.sheetLessonInput.value.trim();

  if (!bodyText) {
    toast(translate("writeSheetContent"));
    return;
  }

  const html = makeSheetHtml({
    title,
    subject: state.activeSubject,
    lesson,
    body,
  });
  const blob = new Blob([html], { type: "text/html" });
  const now = new Date().toISOString();

  await saveDocument({
    id: crypto.randomUUID(),
    title,
    lesson,
    fileName: `${slugify(title)}.html`,
    subject: state.activeSubject,
    type: "Feuille",
    schoolYear: new Date().getFullYear().toString(),
    tags: [state.activeSubject, lesson, title].filter(Boolean),
    note: bodyText.slice(0, 220),
    bodyText,
    size: blob.size,
    mime: blob.type,
    blob,
    createdAt: now,
    updatedAt: now,
  });

  els.sheetForm.reset();
  els.sheetEditor.innerHTML = "";
  await refresh();
  setActiveSubject(state.activeSubject);
  toast(translate("sheetSaved"));
}

function openWordImport() {
  if (!state.activeSubject) {
    toast(translate("chooseSubjectFirst"));
    return;
  }

  els.wordImportInput.value = "";
  els.wordImportInput.click();
}

async function importWordFiles() {
  if (!state.activeSubject || !els.wordImportInput.files.length) return;

  const now = new Date().toISOString();
  const files = Array.from(els.wordImportInput.files);

  for (const [index, file] of files.entries()) {
    await saveDocument({
      id: crypto.randomUUID(),
      title: fileTitle(file.name),
      lesson: "",
      fileName: file.name,
      subject: state.activeSubject,
      type: "Word",
      schoolYear: new Date().getFullYear().toString(),
      tags: [state.activeSubject, "word"],
      note: "",
      size: file.size,
      mime: file.type || "application/msword",
      blob: file,
      createdAt: new Date(Date.now() + index).toISOString(),
      updatedAt: now,
    });
  }

  els.wordImportInput.value = "";
  await refresh();
  setActiveSubject(state.activeSubject);
  toast(translate("wordAdded"));
}

function exportIndex() {
  const exportable = state.documents.map(({ blob, ...doc }) => doc);
  const file = new Blob([JSON.stringify(exportable, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "index-documents-lycee.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openSubjectDialog() {
  els.newSubjectInput.value = "";
  els.subjectDialog.showModal();
  window.setTimeout(() => els.newSubjectInput.focus(), 0);
  renderLucide();
}

function openDeleteSubjectDialog() {
  renderDeleteSubjectOptions();

  if (!els.deleteSubjectInput.options.length) {
    toast(translate("noSubjectDelete"));
    return;
  }

  els.deleteSubjectDialog.showModal();
  renderLucide();
}

function handleSubjectDialogClose() {
  if (els.subjectDialog.returnValue !== "add") return;

  const subject = els.newSubjectInput.value.trim();
  if (!subject) {
    toast(translate("writeSubjectName"));
    return;
  }

  const exists = allSubjects().some((item) => normalize(item) === normalize(subject));
  if (exists) {
    const existingSubject = allSubjects().find((item) => normalize(item) === normalize(subject));
    renderSubjectInput(existingSubject);
    toast(translate("subjectExists"));
    return;
  }

  state.hiddenSubjects = state.hiddenSubjects.filter((item) => normalize(item) !== normalize(subject));
  saveHiddenSubjects();
  state.customSubjects.push(subject);
  state.customSubjects.sort((a, b) => a.localeCompare(b, "fr"));
  saveCustomSubjects();
  updateFilters();
  renderSubjectInput(subject);
  toast(translate("subjectAdded"));
}

function handleDeleteSubjectDialogClose() {
  if (els.deleteSubjectDialog.returnValue !== "delete-subject") return;

  const subject = els.deleteSubjectInput.value;
  if (!subject) return;

  state.customSubjects = state.customSubjects.filter((item) => normalize(item) !== normalize(subject));

  if (!state.hiddenSubjects.some((item) => normalize(item) === normalize(subject))) {
    state.hiddenSubjects.push(subject);
  }

  saveCustomSubjects();
  saveHiddenSubjects();

  if (els.subjectFilter.value === subject) {
    els.subjectFilter.value = "";
  }

  if (state.activeSubject === subject) {
    state.activeSubject = "";
    els.subjectPage.hidden = true;
  }

  updateFilters();
  renderDocuments();
  toast(translate("subjectDeleted"));
}

async function installApp() {
  if (!state.installPrompt) {
    toast(translate("installHint"));
    return;
  }

  state.installPrompt.prompt();
  await state.installPrompt.userChoice;
  state.installPrompt = null;
  els.installApp.hidden = true;
}

function setupInstallFlow() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      toast(translate("offlineError"));
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    els.installApp.hidden = false;
    renderLucide();
  });

  window.addEventListener("appinstalled", () => {
    state.installPrompt = null;
    els.installApp.hidden = true;
    toast(translate("appInstalled"));
  });
}

function bindEvents() {
  els.fileInput.addEventListener("change", () => setSelectedFiles(els.fileInput.files));
  els.uploadForm.addEventListener("submit", handleSubmit);
  els.addSubjectButton.addEventListener("click", openSubjectDialog);
  els.addSubjectQuick.addEventListener("click", openSubjectDialog);
  els.deleteSubjectButton.addEventListener("click", openDeleteSubjectDialog);
  els.closeSubjectPage.addEventListener("click", closeActiveSubject);
  els.importWordButton.addEventListener("click", openWordImport);
  els.wordImportInput.addEventListener("change", importWordFiles);
  els.sheetForm.addEventListener("submit", saveCreatedSheet);
  els.sheetForm.querySelector(".editor-toolbar").addEventListener("click", runEditorCommand);
  els.subjectQuickFilters.addEventListener("click", handleSubjectQuickFilter);
  els.subjectOfficialContent.addEventListener("click", handleSubjectDataClick);
  els.subjectDialog.addEventListener("close", handleSubjectDialogClose);
  els.deleteSubjectDialog.addEventListener("close", handleDeleteSubjectDialogClose);
  els.documentGrid.addEventListener("click", handleGridClick);
  els.confirmDialog.addEventListener("close", handleDialogClose);
  els.clearFilters.addEventListener("click", clearFilters);
  els.exportBackup.addEventListener("click", exportIndex);
  els.installApp.addEventListener("click", installApp);
  els.bookGrid.addEventListener("click", handleStudyClick);
  els.studyBreadcrumb?.addEventListener("click", handleStudyClick);
  els.courseMenu.addEventListener("click", handleCourseClick);
  els.courseDetail.addEventListener("click", handleCourseClick);
  els.languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  els.studyTabs.forEach((tab) => {
    tab.addEventListener("click", () => setStudyView(tab.dataset.studyView));
  });

  els.appNavTabs.forEach((tab) => {
    tab.addEventListener("click", () => showAppView(tab.dataset.appView));
  });

  [els.bookSearchInput, els.bookSubjectInput, els.bookResourceInput].forEach((element) => {
    const onFilterChange = () => {
      state.studyStage = "subjects";
      renderStudyStage();
    };
    element.addEventListener("input", onFilterChange);
    element.addEventListener("change", onFilterChange);
  });

  els.chapterBookInput.addEventListener("change", () => {
    state.activeChapterBookId = els.chapterBookInput.value;
    state.activeChapterIndex = 0;
    renderStudyStage();
  });

  els.chapterInput.addEventListener("change", () => {
    state.activeChapterIndex = Number(els.chapterInput.value) || 0;
    renderStudyStage();
  });

  els.chapterDetail.addEventListener("click", handleChapterDetailClick);

  els.subjectFilter.addEventListener("change", () => {
    const subject = els.subjectFilter.value;
    if (subject) {
      setActiveSubject(subject);
      els.subjectPage?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      closeActiveSubject();
    }
    renderDocuments();
  });

  [els.searchInput, els.typeFilter, els.sortInput].forEach((element) => {
    element.addEventListener("input", renderDocuments);
    element.addEventListener("change", renderDocuments);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    els.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.dropZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    els.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.dropZone.classList.remove("drag-over");
    });
  });

  els.dropZone.addEventListener("drop", (event) => setSelectedFiles(event.dataTransfer.files));
}

async function init() {
  try {
    setupInstallFlow();
    state.language = loadLanguagePreference();
    state.customSubjects = loadList(CUSTOM_SUBJECTS_KEY);
    state.hiddenSubjects = loadList(HIDDEN_SUBJECTS_KEY);
    applyLanguage();
    renderStudyResources();
    renderCourseDetail(state.activeCourseId);
    setStudyView(state.activeStudyView);
    showAppView(state.appView);
    state.db = await openDatabase();
    bindEvents();
    await refresh();
    renderLucide();
  } catch (error) {
    console.error(error);
    toast(translate("storageError"));
  }
}

init();
