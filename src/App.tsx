import { useEffect, useMemo, useState } from "react";
import { course, projects, text, type CoreLanguage, type CourseModule, type Language } from "./course";
import { curriculum, type LearningUnit } from "./curriculum";
import { buildStudyGuideMarkdown, studyResources } from "./studyGuide";
import { getUiTranslations } from "./locales";

const STORAGE_KEY = "product-engineer-path-progress-v2";
const LEGACY_STORAGE_KEY = "product-engineer-path-progress-v1";
const DEFAULT_PROJECT_ID = "appointments";
const PASS_PERCENT = 80;

type CourseView = "learn" | "exam" | "result";
type View = "home" | "project" | "portfolio" | CourseView;

interface SavedProgress {
  language: Language;
  projectId: string;
  currentModuleId: string;
  view: View;
  resumeView: CourseView;
  passedExams: Record<string, number>;
  examAnswers: Record<string, (number | null)[]>;
  questionIndices: Record<string, number>;
  unitIndices: Record<string, number>;
  projectNotes: Record<string, string>;
  capstoneReflection: string;
}

interface Question {
  unit: LearningUnit;
  unitIndex: number;
  variant: number;
  options: LearningUnit[];
  answerIndex: number;
}

const copy = {
  es: {
    brand: "product engineer path",
    language: "Idioma",
    home: "Inicio",
    menu: "Menú del curso",
    closeMenu: "Cerrar menú",
    collapseSidebar: "Contraer menú del curso",
    expandSidebar: "Expandir menú del curso",
    courseLabel: "EL RECORRIDO",
    homeEyebrow: "DE LA IDEA AL PRODUCTO EN PRODUCCIÓN",
    headline: "De la idea al producto. Con fundamentos en cada paso.",
    introduction:
      "Un recorrido abierto para descubrir problemas, diseñar, programar, probar y operar productos reales. Aprendé el porqué de cada decisión, no solo a seguir recetas.",
    start: "Empezar el curso",
    continue: "Continuar donde quedaste",
    aboutLabel: "CÓMO APRENDEMOS",
    homeVisualLabel: "El recorrido de un producto, de principio a fin",
    homeVisualTitle: "Todo el ciclo del producto",
    homeStages: ["Entender", "Diseñar", "Construir", "Probar", "Lanzar", "Aprender"],
    modulesLabel: "áreas",
    lessonsLabel: "lecciones",
    fundamentals: "Fundamentos antes que herramientas.",
    fundamentalsText:
      "Aprendé por qué funcionan las cosas: producto, análisis, experiencia, datos, IA, código, calidad y operación.",
    projectTitle: "Construí sobre una idea propia.",
    projectText:
      "Elegí entre proyectos guía distintos y usá la misma ruta para convertir el que te importa en un producto pequeño.",
    aiTitle: "IA con criterio, no a ciegas.",
    aiText:
      "Primero entendé y practicá. Después usá IA, verificá el resultado y explicá las decisiones.",
    openSource: "Abierto para aprender, enseñar y mejorar en comunidad.",
    path: "Tu recorrido",
    webFlowTitle: "Qué pasa cuando una app web carga datos",
    webFlowClient: "Frontend",
    webFlowClientText: "La interfaz muestra información y envía la solicitud.",
    webFlowServer: "API + backend",
    webFlowServerText: "La API recibe la solicitud; el servidor aplica reglas y permisos.",
    webFlowDatabase: "Base de datos",
    webFlowDatabaseText: "Conserva y devuelve los datos solicitados.",
    webFlowResponse: "El resultado vuelve del servidor al navegador como una respuesta HTTP.",
    chooseProject: "Tu proyecto guía",
    projectSelectionTitle: "¿Qué te gustaría construir?",
    projectSelectionDescription: "Elegí una idea. La vas a usar para practicar lo que aprendés en cada módulo; podés cambiarla cuando quieras.",
    projectSelected: "Seleccionado",
    changeProject: "Cambiar proyecto",
    projectPrompt: "Problema inicial",
    module: "MÓDULO",
    lesson: "Lección",
    assessment: "Examen del módulo",
    examLabel: "EXAMEN",
    units: "lecciones",
    completed: "Aprobado",
    notStarted: "Sin empezar",
    inProgress: "En curso",
    unitLabel: (current: number, total: number) => `Lección ${current} de ${total}`,
    goToLesson: (current: number) => `Ir a la lección ${current}`,
    reflect: "Pensalo en una situación real",
    studyGuide: "Abrir guía de estudio ampliada",
    guideDescription: "Más contexto, preguntas para practicar y recursos confiables para seguir aprendiendo.",
    downloadGuide: "Descargar Markdown",
    printGuide: "Imprimir o guardar como PDF",
    apply: "Aplicalo a tu proyecto",
    checkUnderstanding: "Comprobá tu comprensión",
    commonMistake: "Error frecuente para evitar",
    furtherReading: "Recursos para profundizar",
    readTime: "Tomate el tiempo que necesites. Tu avance se guarda en este dispositivo.",
    outcome: "Al terminar este módulo",
    lessonNav: "CONTENIDO DEL MÓDULO",
    previous: "Anterior",
    next: "Siguiente",
    startExam: "Ir al examen",
    examIntro: "Comprobá lo que aprendiste aplicándolo a decisiones y situaciones reales.",
    examRule: (count: number, score: number) =>
      `${count} preguntas · necesitás ${score}% para aprobar · sin límite de tiempo`,
    question: (current: number, total: number) => `Pregunta ${current} de ${total}`,
    reviewPrompt: "Una persona del equipo afirma:",
    reviewQuestion: "¿Qué concepto ayuda a corregir esta idea?",
    selectAnswer: "Elegí la respuesta más adecuada.",
    questionMap: "PREGUNTAS",
    answered: (count: number, total: number) => `${count} de ${total} respondidas`,
    unanswered: "Quedan preguntas sin responder.",
    backToLesson: "Volver a la lección",
    submitExam: "Entregar examen",
    nextQuestion: "Siguiente pregunta",
    previousQuestion: "Pregunta anterior",
    resultTitle: "Resultado del examen",
    passed: "Módulo aprobado",
    failed: "Todavía no alcanzaste el puntaje necesario",
    score: (score: number, total: number) => `${score} de ${total} correctas`,
    passMark: (percent: number) => `Se aprueba con ${percent}% o más.`,
    passedMessage: "El aprendizaje se demuestra al aplicar los conceptos. ¡Buen trabajo!",
    failedMessage: "Repasá las respuestas y volvé a intentarlo. El progreso de la lección se conserva.",
    review: "Para repasar",
    retry: "Volver a rendir el examen",
    goNextModule: "Continuar al siguiente módulo",
    allDone: "Completaste todos los módulos",
    backHome: "Volver al inicio",
    reset: "Reiniciar mi recorrido",
    resetConfirm: "¿Seguro? Se borrarán el avance, las respuestas y los exámenes aprobados.",
    resetError: "No se pudo borrar el avance guardado.",
    saved: "Avance guardado en este dispositivo",
    saveError: "No se pudo guardar el avance. Revisá la configuración del navegador.",
    footer: "Un proyecto abierto. Aprendizaje para toda la comunidad.",
    github: "Código y aportes en GitHub",
    current: "ACTUAL",
    moduleProgress: (done: number, total: number) => `${done}/${total}`,
    projectInstructions: "Elegí una idea: el curso aplica los conceptos a tu contexto.",
    projectPortfolio: "Mi proyecto",
    portfolioTitle: "Tu proyecto, de principio a fin",
    portfolioIntro: "Usá este espacio para convertir lo aprendido en un caso de producto que puedas explicar y compartir.",
    portfolioProgress: "Entregables con notas",
    portfolioCapstone: "Proyecto final: una historia de producto completa",
    portfolioCapstoneBrief: "Reuní los entregables de cada área y contá cómo una necesidad se convirtió en una solución diseñada, construida, probada, lanzada y medida. No hace falta que el proyecto esté desplegado para explicar tus decisiones y aprendizajes.",
    capstoneRubric: [
      "Problema, personas usuarias y evidencia que justifican la oportunidad.",
      "Alcance y plan con prioridades, riesgos y decisiones explícitas.",
      "Experiencia diseñada, datos y arquitectura que responden a la necesidad.",
      "Estrategia de pruebas, seguridad y criterios de aceptación.",
      "Forma de lanzamiento, operación, métricas y próximos aprendizajes.",
    ],
    projectWorkTitle: "Llevalo a tu proyecto",
    projectWorkPrompt: "Resultado esperado",
    projectWorkPlaceholder: "Anotá tu decisión, evidencia o próximo paso. Se guarda en este dispositivo.",
    capstoneReflection: "Síntesis final",
    capstoneReflectionPlaceholder: "¿Qué problema resolviste, qué construiste, qué aprendiste y qué harías después?",
    portfolioDownload: "Descargar dossier del proyecto",
    portfolioBack: "Volver al recorrido",
    keyConcept: "Concepto clave",
    correctAnswer: "Respuesta correcta",
    reconsiderAnswer: "Revisá la respuesta y comparala con el concepto clave.",
  },
  en: {
    brand: "product engineer path",
    language: "Language",
    home: "Home",
    menu: "Course menu",
    closeMenu: "Close menu",
    collapseSidebar: "Collapse course menu",
    expandSidebar: "Expand course menu",
    courseLabel: "THE PATH",
    homeEyebrow: "FROM IDEA TO PRODUCT IN PRODUCTION",
    headline: "From idea to product. Fundamentals at every step.",
    introduction:
      "An open path to discover problems, design, code, test, and operate real products. Learn why each decision matters, not just how to follow recipes.",
    start: "Start the course",
    continue: "Continue where you left off",
    aboutLabel: "HOW WE LEARN",
    homeVisualLabel: "The product journey, from beginning to end",
    homeVisualTitle: "The full product lifecycle",
    homeStages: ["Discover", "Design", "Build", "Test", "Ship", "Learn"],
    modulesLabel: "areas",
    lessonsLabel: "lessons",
    fundamentals: "Fundamentals before tools.",
    fundamentalsText:
      "Learn why things work: product, analysis, experience, data, AI, code, quality, and operations.",
    projectTitle: "Build around an idea of your own.",
    projectText:
      "Choose from different guiding projects and use the same path to turn one that matters to you into a small product.",
    aiTitle: "Use AI with judgment, not blindly.",
    aiText:
      "Understand and practice first. Then use AI, verify the result, and explain your decisions.",
    openSource: "Open to learn, teach, and improve together.",
    path: "Your path",
    webFlowTitle: "What happens when a web app loads data",
    webFlowClient: "Frontend",
    webFlowClientText: "The interface displays information and sends the request.",
    webFlowServer: "API + backend",
    webFlowServerText: "The API receives it; the server applies rules and permissions.",
    webFlowDatabase: "Database",
    webFlowDatabaseText: "It stores and returns the requested data.",
    webFlowResponse: "The result travels back from the server to the browser as an HTTP response.",
    chooseProject: "Your guiding project",
    projectSelectionTitle: "What would you like to build?",
    projectSelectionDescription: "Choose an idea to practice what you learn in each module. You can change it whenever you like.",
    projectSelected: "Selected",
    changeProject: "Change project",
    projectPrompt: "Starting problem",
    module: "MODULE",
    lesson: "Lesson",
    assessment: "Module exam",
    examLabel: "EXAM",
    units: "lessons",
    completed: "Passed",
    notStarted: "Not started",
    inProgress: "In progress",
    unitLabel: (current: number, total: number) => `Lesson ${current} of ${total}`,
    goToLesson: (current: number) => `Go to lesson ${current}`,
    reflect: "Think it through in a real situation",
    studyGuide: "Open the extended study guide",
    guideDescription: "More context, practice questions, and trusted resources to keep learning.",
    downloadGuide: "Download Markdown",
    printGuide: "Print or save as PDF",
    apply: "Apply it to your project",
    checkUnderstanding: "Check your understanding",
    commonMistake: "Common mistake to avoid",
    furtherReading: "Resources to go deeper",
    readTime: "Take the time you need. Your progress is saved on this device.",
    outcome: "By the end of this module",
    lessonNav: "MODULE CONTENT",
    previous: "Previous",
    next: "Next",
    startExam: "Go to exam",
    examIntro: "Check what you learned by applying it to real decisions and situations.",
    examRule: (count: number, score: number) =>
      `${count} questions · ${score}% to pass · no time limit`,
    question: (current: number, total: number) => `Question ${current} of ${total}`,
    reviewPrompt: "A teammate claims:",
    reviewQuestion: "Which concept helps correct this idea?",
    selectAnswer: "Choose the best answer.",
    questionMap: "QUESTIONS",
    answered: (count: number, total: number) => `${count} of ${total} answered`,
    unanswered: "Some questions are still unanswered.",
    backToLesson: "Back to lesson",
    submitExam: "Submit exam",
    nextQuestion: "Next question",
    previousQuestion: "Previous question",
    resultTitle: "Exam result",
    passed: "Module passed",
    failed: "Not quite there yet",
    score: (score: number, total: number) => `${score} of ${total} correct`,
    passMark: (percent: number) => `${percent}% or higher to pass.`,
    passedMessage: "Learning means applying the concepts. Well done!",
    failedMessage: "Review the answers and try again. Your lesson progress is saved.",
    review: "Review these topics",
    retry: "Retake the exam",
    goNextModule: "Continue to the next module",
    allDone: "You've completed all modules",
    backHome: "Back to home",
    reset: "Reset my path",
    resetConfirm: "Are you sure? Your progress, answers, and passed exams will be erased.",
    resetError: "Saved progress could not be cleared.",
    saved: "Progress saved on this device",
    saveError: "Progress could not be saved. Check your browser settings.",
    footer: "An open project. Learning for the whole community.",
    github: "Code and contributions on GitHub",
    current: "CURRENT",
    moduleProgress: (done: number, total: number) => `${done}/${total}`,
    projectInstructions: "Choose an idea: the course applies concepts to your context.",
    projectPortfolio: "My project",
    portfolioTitle: "Your project, from start to finish",
    portfolioIntro: "Use this space to turn what you learn into a product case you can explain and share.",
    portfolioProgress: "Deliverables with notes",
    portfolioCapstone: "Final project: a complete product story",
    portfolioCapstoneBrief: "Bring together the deliverables from every area and explain how a need became a solution that was designed, built, tested, shipped, and measured. Your project does not need to be deployed to explain your decisions and learning.",
    capstoneRubric: [
      "Problem, users, and evidence that justify the opportunity.",
      "Scope and plan with priorities, risks, and explicit decisions.",
      "Experience, data, and architecture designed for the need.",
      "Testing strategy, security, and acceptance criteria.",
      "Release and operations approach, measures, and next learning steps.",
    ],
    projectWorkTitle: "Apply it to your project",
    projectWorkPrompt: "Expected outcome",
    projectWorkPlaceholder: "Capture a decision, evidence, or next step. Saved on this device.",
    capstoneReflection: "Final synthesis",
    capstoneReflectionPlaceholder: "What problem did you solve, what did you build, what did you learn, and what would you do next?",
    portfolioDownload: "Download project portfolio",
    portfolioBack: "Back to the learning path",
    keyConcept: "Key concept",
    correctAnswer: "Correct answer",
    reconsiderAnswer: "Review your answer and compare it with the key concept.",
  },
} satisfies Record<
CoreLanguage,
Record<string, string | string[] | ((...args: number[]) => string)>
>;

for (const locale of ["pt", "fr", "it"] as const) {
  getUiTranslations(locale, copy.en);
}

function emptyProgress(): SavedProgress {
  return {
    language: "es",
    projectId: DEFAULT_PROJECT_ID,
    currentModuleId: course[0].id,
    view: "home",
    resumeView: "learn",
    passedExams: {},
    examAnswers: {},
    questionIndices: {},
    unitIndices: {},
    projectNotes: {},
    capstoneReflection: "",
  };
}

function readProgress(): SavedProgress {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const previous = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!previous) return emptyProgress();

    const parsed: unknown = JSON.parse(previous);
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      const old = parsed as Record<string, unknown>;
      const migrated = emptyProgress();
      if (old.language === "es" || old.language === "en" || old.language === "pt" || old.language === "fr" || old.language === "it") migrated.language = old.language;
      if (typeof old.projectId === "string" && projects.some((project) => project.id === old.projectId)) {
        migrated.projectId = old.projectId;
      }
      return migrated;
    }
    return emptyProgress();
  }

  const parsed: unknown = JSON.parse(saved);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Saved course progress has an invalid format.");
  }

  const data = parsed as Record<string, unknown>;
  const validIds = new Set(course.map((module) => module.id));
  if (
    (data.language !== "es" && data.language !== "en" && data.language !== "pt" && data.language !== "fr" && data.language !== "it") ||
    typeof data.projectId !== "string" ||
    !projects.some((project) => project.id === data.projectId) ||
    typeof data.currentModuleId !== "string" ||
    !validIds.has(data.currentModuleId) ||
    (data.view !== "home" && data.view !== "project" && data.view !== "portfolio" && data.view !== "learn" && data.view !== "exam" && data.view !== "result") ||
    !isNumberRecord(data.passedExams) ||
    !isAnswerRecord(data.examAnswers) ||
    !isIndexRecord(data.questionIndices) ||
    !isIndexRecord(data.unitIndices) ||
    (data.projectNotes !== undefined && !isStringRecord(data.projectNotes)) ||
    (data.capstoneReflection !== undefined && typeof data.capstoneReflection !== "string")
  ) {
    throw new Error("Saved course progress has an invalid format.");
  }

  const resumeView =
    data.resumeView === "learn" || data.resumeView === "exam" || data.resumeView === "result"
      ? data.resumeView
      : data.view === "home" || data.view === "project" || data.view === "portfolio"
        ? "learn"
        : data.view;

  return {
    language: data.language as Language,
    projectId: data.projectId as string,
    currentModuleId: data.currentModuleId as string,
    view: data.view as View,
    resumeView,
    passedExams: data.passedExams as Record<string, number>,
    examAnswers: data.examAnswers as Record<string, (number | null)[]>,
    questionIndices: data.questionIndices as Record<string, number>,
    unitIndices: data.unitIndices as Record<string, number>,
    projectNotes: isStringRecord(data.projectNotes) ? data.projectNotes : {},
    capstoneReflection: typeof data.capstoneReflection === "string" ? data.capstoneReflection : "",
  };
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === "number" && Number.isFinite(item));
}

function isAnswerRecord(value: unknown): value is Record<string, (number | null)[]> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.values(value).every(
      (answers) =>
        Array.isArray(answers) &&
        answers.length <= 100 &&
        answers.every((answer) => answer === null || (Number.isInteger(answer) && answer >= 0 && answer < 4)),
    );
}

function isIndexRecord(value: unknown): value is Record<string, number> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.values(value).every((index) => Number.isInteger(index) && index >= 0);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === "string");
}

function getExamQuestions(module: CourseModule): Question[] {
  const units = curriculum[module.id].units;
  const questions = units.flatMap((unit, unitIndex) =>
    [0, 1, 2].map((variant) => {
      const distractors = [1, 3, 5]
        .map((offset) => units[(unitIndex + offset) % units.length])
        .filter((candidate) => candidate !== unit);
      const choices = [unit, ...distractors];
      const shift = (unitIndex * 3 + variant) % choices.length;
      const options = choices.map((_, index) => choices[(index + shift) % choices.length]);
      return {
        unit,
        unitIndex,
        variant,
        options,
        answerIndex: options.indexOf(unit),
      };
    }),
  );
  if (questions.length < 30) {
    throw new Error(`Module "${module.id}" must have enough learning units for at least 30 exam questions.`);
  }
  return questions;
}

function getOptionSummary(unit: LearningUnit, language: Language): string {
  const body = text(unit.body, language).replace(/\s+/g, " ").trim();
  const firstSentence = body.match(/^.*?[.!?](?:\s|$)/u)?.[0].trim() ?? body;
  if (firstSentence.length <= 180) return firstSentence;
  return `${firstSentence.slice(0, 177).trimEnd()}…`;
}

function App() {
  const [initial] = useState(() => {
    try {
      return { progress: readProgress(), error: false };
    } catch (error) {
      console.error("Could not read course progress from local storage.", error);
      return { progress: emptyProgress(), error: true };
    }
  });
  const [language, setLanguage] = useState(initial.progress.language);
  const [projectId, setProjectId] = useState(initial.progress.projectId);
  const [currentModuleId, setCurrentModuleId] = useState(initial.progress.currentModuleId);
  const [view, setView] = useState<View>(initial.progress.view);
  const [resumeView, setResumeView] = useState(initial.progress.resumeView);
  const [passedExams, setPassedExams] = useState(initial.progress.passedExams);
  const [examAnswers, setExamAnswers] = useState(initial.progress.examAnswers);
  const [questionIndices, setQuestionIndices] = useState(initial.progress.questionIndices);
  const [unitIndices, setUnitIndices] = useState(initial.progress.unitIndices);
  const [projectNotes, setProjectNotes] = useState(initial.progress.projectNotes);
  const [capstoneReflection, setCapstoneReflection] = useState(initial.progress.capstoneReflection);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [answerNotice, setAnswerNotice] = useState(false);
  const [storageError, setStorageError] = useState(initial.error);

  const t = getUiTranslations(language, copy[language === "es" ? "es" : "en"]);
  const activeModule = course.find((module) => module.id === currentModuleId) ?? course[0];
  const activeCurriculum = curriculum[activeModule.id];
  const activeProject = projects.find((project) => project.id === projectId) ?? projects[0];
  const questions = useMemo(() => getExamQuestions(activeModule), [activeModule]);
  const questionIndex = Math.min(questionIndices[activeModule.id] ?? 0, questions.length - 1);
  const answers = examAnswers[activeModule.id] ?? Array<Question["answerIndex"] | null>(questions.length).fill(null);
  const currentQuestion = questions[questionIndex];
  const currentAnswer = answers[questionIndex] ?? null;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const passedCount = Object.keys(passedExams).filter((id) => passedExams[id] >= PASS_PERCENT).length;
  const totalLessons = Object.values(curriculum).reduce((count, module) => count + module.units.length, 0);
  const notedDeliverables = course.filter((module) => (projectNotes[module.id] ?? "").trim().length > 0).length;
  const nextUnpassedModule = course.find((module) => (passedExams[module.id] ?? 0) < PASS_PERCENT);
  const activeModuleIndex = course.findIndex((module) => module.id === activeModule.id);
  const unitIndex = Math.min(unitIndices[activeModule.id] ?? 0, activeCurriculum.units.length - 1);
  const activeUnit = activeCurriculum.units[unitIndex];
  const isPassed = (passedExams[activeModule.id] ?? 0) >= PASS_PERCENT;
  const activeScore = passedExams[activeModule.id] ?? null;
  const examCount = questions.length;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    try {
      const progress: SavedProgress = {
        language,
        projectId,
        currentModuleId,
        view,
        resumeView,
        passedExams,
        examAnswers,
        questionIndices,
        unitIndices,
        projectNotes,
        capstoneReflection,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch (error) {
      console.error("Could not save course progress to local storage.", error);
      setStorageError(true);
    }
  }, [language, projectId, currentModuleId, view, resumeView, passedExams, examAnswers, questionIndices, unitIndices, projectNotes, capstoneReflection]);

  function showHome() {
    setView("home");
    setSidebarOpen(false);
  }

  function openModule(module: CourseModule, nextView: CourseView = "learn") {
    setCurrentModuleId(module.id);
    setView(nextView);
    setResumeView(nextView);
    setAnswerNotice(false);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProjectPicker(module: CourseModule, nextView: CourseView = "learn") {
    setCurrentModuleId(module.id);
    setResumeView(nextView);
    setView("project");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPortfolio() {
    setView("portfolio");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function downloadPortfolio() {
    const markdown = [
      `# ${t.portfolioTitle}`,
      "",
      `**${t.chooseProject}:** ${text(activeProject.title, language)}`,
      "",
      text(activeProject.prompt, language),
      "",
      `## ${t.portfolioCapstone}`,
      "",
      t.portfolioCapstoneBrief,
      "",
      ...course.flatMap((module, index) => [
        `## ${String(index + 1).padStart(2, "0")}. ${text(module.title, language)}`,
        "",
        `**${t.outcome}:** ${text(curriculum[module.id].outcome, language)}`,
        "",
        projectNotes[module.id]?.trim() || t.projectWorkPlaceholder,
        "",
      ]),
      `## ${t.capstoneReflection}`,
      "",
      capstoneReflection.trim() || t.capstoneReflectionPlaceholder,
      "",
    ].join("\n");
    const file = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `product-portfolio-${language}.md`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function setUnit(index: number) {
    setUnitIndices((current) => ({ ...current, [activeModule.id]: index }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function downloadStudyGuide() {
    const markdown = buildStudyGuideMarkdown({
      module: activeModule,
      curriculum: activeCurriculum,
      project: activeProject,
      language,
    });
    const file = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeModule.id}-${language}-study-guide.md`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function saveAnswer(answerIndex: number) {
    setExamAnswers((current) => {
      const moduleAnswers = [...(current[activeModule.id] ?? Array<number | null>(examCount).fill(null))];
      moduleAnswers[questionIndex] = answerIndex;
      return { ...current, [activeModule.id]: moduleAnswers };
    });
    setAnswerNotice(false);
  }

  function startExam() {
    setQuestionIndices((current) => ({
      ...current,
      [activeModule.id]: current[activeModule.id] ?? 0,
    }));
    setView("exam");
    setResumeView("exam");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function moveQuestion(index: number) {
    setQuestionIndices((current) => ({ ...current, [activeModule.id]: index }));
    setAnswerNotice(false);
  }

  function submitExam() {
    if (answeredCount !== examCount) {
      setAnswerNotice(true);
      return;
    }
    const correctCount = questions.reduce(
      (total, question, index) => total + (answers[index] === question.answerIndex ? 1 : 0),
      0,
    );
    const score = Math.round((correctCount / examCount) * 100);
    setPassedExams((current) => ({
      ...current,
      [activeModule.id]: Math.max(current[activeModule.id] ?? 0, score),
    }));
    setView("result");
    setResumeView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retryExam() {
    setExamAnswers((current) => ({
      ...current,
      [activeModule.id]: Array<number | null>(examCount).fill(null),
    }));
    setQuestionIndices((current) => ({ ...current, [activeModule.id]: 0 }));
    setView("exam");
    setResumeView("exam");
    setAnswerNotice(false);
  }

  function resetProgress() {
    if (!window.confirm(t.resetConfirm)) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      setLanguage("es");
      setProjectId(DEFAULT_PROJECT_ID);
      setCurrentModuleId(course[0].id);
      setResumeView("learn");
      setPassedExams({});
      setExamAnswers({});
      setQuestionIndices({});
      setUnitIndices({});
      setProjectNotes({});
      setCapstoneReflection("");
      setView("home");
      setStorageError(false);
    } catch (error) {
      console.error("Could not clear course progress from local storage.", error);
      setStorageError(true);
    }
  }

  function renderHome() {
    const savedModule = course.find((module) => module.id === currentModuleId);
    const continueModule =
      savedModule && (passedExams[savedModule.id] ?? 0) < PASS_PERCENT
        ? savedModule
        : nextUnpassedModule ?? course[course.length - 1];
    const continueView =
      savedModule && savedModule.id === continueModule.id && (passedExams[savedModule.id] ?? 0) < PASS_PERCENT
        ? resumeView
        : "learn";
    return (
      <div className="home-page">
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{t.homeEyebrow}</p>
            <h1>{t.headline}</h1>
            <p className="home-intro">{t.introduction}</p>
            <button
              className="button button-primary"
              onClick={() => passedCount > 0
                ? openModule(continueModule, continueView)
                : openProjectPicker(continueModule, continueView)}
            >
              {passedCount > 0 ? t.continue : t.start}
              <span aria-hidden="true">→</span>
            </button>
            {passedCount > 0 && (
              <p className="resume-line">
                {text(continueModule.title, language)} · {t.moduleProgress(passedCount, course.length)} {t.completed.toLowerCase()}
              </p>
            )}
          </div>
          <aside className="home-visual" aria-label={t.homeVisualLabel}>
            <div className="home-visual-heading">
              <span>{t.homeVisualTitle}</span>
              <span className="home-visual-signal"><i /> {language === "es" ? "PUNTA A PUNTA" : "END TO END"}</span>
            </div>
            <div className="home-visual-orbit" aria-hidden="true">
              <span className="home-orbit-ring home-orbit-ring-outer" />
              <span className="home-orbit-ring home-orbit-ring-inner" />
              <span className="home-orbit-core"><span>p</span></span>
              {t.homeStages.map((stage, index) => (
                <span className={`home-orbit-node home-orbit-node-${index + 1}`} key={stage}>
                  <i>{String(index + 1).padStart(2, "0")}</i>{stage}
                </span>
              ))}
            </div>
            <div className="home-visual-footer">
              <span>{language === "es" ? "Un proyecto real como hilo conductor" : "One real project, all the way through"}</span>
              <span aria-hidden="true">✦</span>
            </div>
          </aside>
        </section>
        <div className="home-bottom">
          <div className="home-stats" aria-label={language === "es" ? "Contenido del curso" : "Course content"}>
            <span><strong>{course.length}</strong> {t.modulesLabel}</span>
            <span><strong>{totalLessons}</strong> {t.lessonsLabel}</span>
          </div>
          <span>{t.openSource}</span>
          <span>{t.moduleProgress(passedCount, course.length)} {t.path.toLowerCase()}</span>
        </div>
      </div>
    );
  }

  function renderProjectPicker() {
    return (
      <main className="project-page">
        <button className="text-button project-back" onClick={showHome}>← {t.backHome}</button>
        <section className="project-picker" aria-labelledby="project-picker-title">
          <div className="project-page-intro">
            <p className="eyebrow">{t.chooseProject}</p>
            <h1 id="project-picker-title">{t.projectSelectionTitle}</h1>
            <p>{t.projectSelectionDescription}</p>
          </div>
          <div className="project-options">
            {projects.map((project) => {
              const selected = project.id === projectId;
              return (
                <button
                  type="button"
                  className={`project-option ${selected ? "project-option-selected" : ""}`}
                  key={project.id}
                  onClick={() => setProjectId(project.id)}
                  aria-pressed={selected}
                >
                  <span className="project-option-icon" aria-hidden="true">{project.icon}</span>
                  <span className="project-option-copy">
                    <strong>{text(project.title, language)}</strong>
                    <span>{text(project.description, language)}</span>
                  </span>
                  <span className="project-option-check" aria-hidden="true">{selected ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>
          <div className="project-picker-action">
            <div className="project-selection-summary">
              <strong>{text(activeProject.title, language)}</strong>
              <span>{text(activeProject.prompt, language)}</span>
            </div>
            <button className="button button-primary" onClick={() => openModule(activeModule, resumeView)}>
              {passedCount > 0 ? t.continue : t.start}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
    );
  }

  function renderSidebar() {
    return (
      <aside id="course-sidebar" className={`course-sidebar ${sidebarOpen ? "sidebar-open" : ""}`} aria-label={t.menu}>
        <div className="sidebar-heading">
          <span className="eyebrow">{t.path}</span>
          <span className="sidebar-count">{t.moduleProgress(passedCount, course.length)}</span>
        </div>
        <button className="sidebar-portfolio" onClick={openPortfolio}>
          <span>{t.projectPortfolio}</span>
          <strong>{t.moduleProgress(notedDeliverables, course.length)}</strong>
        </button>
        <nav className="module-nav" aria-label={t.menu}>
          {course.map((module, index) => {
            const score = passedExams[module.id];
            const current = module.id === activeModule.id;
            const moduleState = score >= PASS_PERCENT ? t.completed : current ? t.current : "";
            return (
              <button
                className={`module-nav-item ${current ? "nav-item-current" : ""} ${score >= PASS_PERCENT ? "nav-item-passed" : ""}`}
                key={module.id}
                onClick={() => openModule(module, "learn")}
                aria-current={current ? "step" : undefined}
              >
                <span className="nav-index">{score >= PASS_PERCENT ? "✓" : String(index + 1).padStart(2, "0")}</span>
                <span className="nav-item-copy">
                  <strong>{text(module.title, language)}</strong>
                  <span>{text(module.role, language)}</span>
                </span>
                <span className="nav-item-state">{moduleState}</span>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-project">
          <div className="sidebar-project-heading">
            <strong>{t.chooseProject}</strong>
            <button className="sidebar-project-change" onClick={() => openProjectPicker(activeModule, resumeView)}>{t.changeProject}</button>
          </div>
          <span className="sidebar-project-title">{activeProject.icon} {text(activeProject.title, language)}</span>
          <div className="sidebar-project-prompt">
            <strong>{t.projectPrompt}</strong>
            <span>{text(activeProject.prompt, language)}</span>
          </div>
        </div>
        <button className="sidebar-reset" onClick={resetProgress}>{t.reset}</button>
      </aside>
    );
  }

  function renderLesson() {
    return (
      <article className="learning-page">
        <div className="module-kicker">
          {t.module} {String(activeModuleIndex + 1).padStart(2, "0")} / {String(course.length).padStart(2, "0")}
          <span>{text(activeModule.role, language)}</span>
        </div>
        <div className="learning-title-row">
          <h1>{text(activeModule.title, language)}</h1>
          {isPassed && <span className="passed-badge">✓ {t.completed} · {activeScore}%</span>}
        </div>
        <div className="slide-progress">
          <nav className="slide-progress-nav" aria-label={t.lessonNav}>
            {activeCurriculum.units.map((unit, index) => (
              <button
                className={index === unitIndex ? "slide-progress-current" : ""}
                key={unit.term.es}
                onClick={() => setUnit(index)}
                aria-label={t.goToLesson(index + 1)}
                aria-current={index === unitIndex ? "step" : undefined}
              >
                <span className="sr-only">{text(unit.term, language)}</span>
              </button>
            ))}
          </nav>
          <span className="slide-progress-label">{t.unitLabel(unitIndex + 1, activeCurriculum.units.length)}</span>
        </div>

        <section className="unit-content slide-card" aria-live="polite" key={activeUnit.term.es}>
          <div className="study-card-heading">
            <p className="eyebrow">{t.lesson}</p>
            <span className="practice-step study-step" aria-hidden="true">01</span>
          </div>
          <h2>{text(activeUnit.term, language)}</h2>
          {text(activeUnit.body, language).split("\n\n").map((paragraph) => (
            <p className="unit-paragraph" key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="project-work-card" aria-labelledby="project-work-title">
          <header className="practice-card-heading">
            <div>
              <p className="eyebrow">{t.apply}</p>
              <h2 id="project-work-title">{t.projectWorkTitle}</h2>
            </div>
            <span className="practice-step" aria-hidden="true">02</span>
          </header>
          <div className="practice-project">
            <span aria-hidden="true">{activeProject.icon}</span>
            <div>
              <strong>{text(activeProject.title, language)}</strong>
              <p>{text(activeProject.prompt, language)}</p>
            </div>
          </div>
          <p className="practice-scenario">{text(activeUnit.scenario, language)}</p>
          <label>
            <span className="sr-only">{t.projectWorkTitle} — {text(activeModule.title, language)}</span>
            <textarea
              value={projectNotes[activeModule.id] ?? ""}
              onChange={(event) =>
                setProjectNotes((current) => ({ ...current, [activeModule.id]: event.target.value }))
              }
              placeholder={t.projectWorkPlaceholder}
              rows={4}
            />
          </label>
        </section>

        <div className="unit-pagination">
          <button
            className="text-button"
            onClick={() => setUnit(unitIndex - 1)}
            disabled={unitIndex === 0}
          >
            ← {t.previous}
          </button>
          <span>{unitIndex + 1} / {activeCurriculum.units.length}</span>
          {unitIndex < activeCurriculum.units.length - 1 ? (
            <button className="button button-primary" onClick={() => setUnit(unitIndex + 1)}>
              {t.next} <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className="button button-primary" onClick={startExam}>
              {t.startExam} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <details className="study-guide">
          <summary>{t.studyGuide}</summary>
          <div className="study-guide-content">
            <header className="study-guide-header">
              <div>
                <p className="eyebrow">{t.guideDescription}</p>
                <h2>{text(activeModule.title, language)}</h2>
              </div>
              <div className="study-guide-actions">
                <button className="guide-action" onClick={downloadStudyGuide}>{t.downloadGuide} ↓</button>
                <button className="guide-action" onClick={() => window.print()}>{t.printGuide} ↗</button>
              </div>
            </header>
            <p className="guide-overview">{text(activeCurriculum.overview, language)}</p>
            <div className="guide-outcome">
              <strong>{t.outcome}</strong>
              <p>{text(activeCurriculum.outcome, language)}</p>
            </div>
            {activeModule.id === "engineering" && (
              <section className="web-flow" aria-label={t.webFlowTitle}>
                <p className="eyebrow">{t.webFlowTitle}</p>
                <div className="web-flow-steps">
                  <article>
                    <span>01</span>
                    <strong>{t.webFlowClient}</strong>
                    <p>{t.webFlowClientText}</p>
                  </article>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <article>
                    <span>02</span>
                    <strong>{t.webFlowServer}</strong>
                    <p>{t.webFlowServerText}</p>
                  </article>
                  <span className="flow-arrow" aria-hidden="true">→</span>
                  <article>
                    <span>03</span>
                    <strong>{t.webFlowDatabase}</strong>
                    <p>{t.webFlowDatabaseText}</p>
                  </article>
                </div>
                <p className="web-flow-response">↶ {t.webFlowResponse}</p>
              </section>
            )}
            <div className="guide-project">
              <strong>{text(activeProject.title, language)}</strong>
              <p>{text(activeProject.prompt, language)}</p>
            </div>
            <div className="guide-units">
              {activeCurriculum.units.map((unit, index) => (
                <article key={unit.term.es}>
                  <p className="eyebrow">{t.unitLabel(index + 1, activeCurriculum.units.length)}</p>
                  <h3>{text(unit.term, language)}</h3>
                  <p>{text(unit.body, language)}</p>
                  <p><strong>{t.apply}:</strong> {text(unit.scenario, language)}</p>
                  <p><strong>{t.checkUnderstanding}:</strong> {text(unit.question, language)}</p>
                  <p><strong>{t.commonMistake}:</strong> {text(unit.misconception, language)}</p>
                </article>
              ))}
            </div>
            <section className="guide-resources">
              <h3>{t.furtherReading}</h3>
              <ul>
                {(studyResources[activeModule.id] ?? []).map((resource) => (
                  <li key={resource.url}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      {text(resource.title, language)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </details>
      </article>
    );
  }

  function renderExam() {
    const choices = currentQuestion.options;
    return (
      <article className="exam-page">
        <button className="text-button exam-back" onClick={() => { setView("learn"); setResumeView("learn"); }}>
          ← {t.backToLesson}
        </button>
        <div className="exam-heading">
          <p className="eyebrow">{t.examLabel} · {text(activeModule.title, language)}</p>
          <h1>{t.assessment}</h1>
          <p>{t.examIntro}</p>
          <div className="exam-rules">{t.examRule(examCount, PASS_PERCENT)}</div>
        </div>
        <div className="exam-layout">
          <section className="question-panel">
            <div className="question-progress">
              <strong>{t.question(questionIndex + 1, examCount)}</strong>
              <span>{t.answered(answeredCount, examCount)}</span>
              <div className="exam-progress-track">
                <span style={{ width: `${((questionIndex + 1) / examCount) * 100}%` }} />
              </div>
            </div>
            <h2>
              {currentQuestion.variant === 0
                ? text(currentQuestion.unit.question, language)
                : currentQuestion.variant === 1
                  ? text(currentQuestion.unit.scenario, language)
                  : `${t.reviewPrompt} “${text(currentQuestion.unit.misconception, language)}” ${t.reviewQuestion}`}
            </h2>
            <p className="select-answer">{t.selectAnswer}</p>
            <div className="exam-options">
              {choices.map((option, index) => (
                <label
                  className={`exam-option ${currentAnswer === index ? "option-selected" : ""}`}
                  key={option.term.es}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={currentAnswer === index}
                    onChange={() => saveAnswer(index)}
                  />
                  <span className="exam-option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="exam-option-copy">
                    <strong>{text(option.term, language)}</strong>
                    <small>{getOptionSummary(option, language)}</small>
                  </span>
                </label>
              ))}
            </div>
            {currentAnswer !== null && (
              <div className={`exam-explanation ${currentAnswer === currentQuestion.answerIndex ? "explanation-correct" : "explanation-review"}`} aria-live="polite">
                <strong>
                  {currentAnswer === currentQuestion.answerIndex
                    ? `${t.correctAnswer}: ${text(currentQuestion.unit.term, language)}`
                    : `${t.keyConcept}: ${text(currentQuestion.unit.term, language)}`}
                </strong>
                <p>{text(currentQuestion.unit.body, language)}</p>
                {currentAnswer !== currentQuestion.answerIndex && <p>{t.reconsiderAnswer}</p>}
              </div>
            )}
            <div className="question-controls">
              <button
                className="text-button"
                onClick={() => moveQuestion(questionIndex - 1)}
                disabled={questionIndex === 0}
              >
                ← {t.previousQuestion}
              </button>
              {questionIndex < examCount - 1 ? (
                <button className="button button-primary" onClick={() => moveQuestion(questionIndex + 1)}>
                  {t.nextQuestion} →
                </button>
              ) : (
                <button className="button button-primary" onClick={submitExam}>
                  {t.submitExam} ✓
                </button>
              )}
            </div>
            {answerNotice && <p className="exam-notice" role="alert">{t.unanswered}</p>}
          </section>
          <aside className="question-map">
            <p className="eyebrow">{t.questionMap}</p>
            <div className="question-map-grid">
              {questions.map((_, index) => (
                <button
                  className={`${index === questionIndex ? "map-current" : ""} ${answers[index] !== null ? "map-answered" : ""}`}
                  key={index}
                  onClick={() => moveQuestion(index)}
                  aria-label={t.question(index + 1, examCount)}
                  aria-current={index === questionIndex ? "step" : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className="submit-exam-link" onClick={submitExam}>{t.submitExam} →</button>
          </aside>
        </div>
      </article>
    );
  }

  function renderResult() {
    const correctCount = questions.reduce(
      (total, question, index) => total + (answers[index] === question.answerIndex ? 1 : 0),
      0,
    );
    const score = Math.round((correctCount / examCount) * 100);
    const passed = score >= PASS_PERCENT;
    const missedConcepts = questions
      .filter((question, index) => answers[index] !== question.answerIndex)
      .map((question) => question.unit)
      .filter((unit, index, units) => units.findIndex((item) => item.term.es === unit.term.es) === index);
    const nextModule = course[activeModuleIndex + 1];

    return (
      <article className="result-page">
        <button className="text-button" onClick={() => { setView("learn"); setResumeView("learn"); }}>← {t.backToLesson}</button>
        <section className={`result-card ${passed ? "result-passed" : "result-failed"}`}>
          <span className="result-icon" aria-hidden="true">{passed ? "✓" : "↻"}</span>
          <p className="eyebrow">{t.resultTitle}</p>
          <h1>{passed ? t.passed : t.failed}</h1>
          <strong className="result-score">{t.score(correctCount, examCount)} · {score}%</strong>
          <p className="result-message">{passed ? t.passedMessage : t.failedMessage}</p>
          <p className="pass-mark">{t.passMark(PASS_PERCENT)}</p>
          {missedConcepts.length > 0 && (
            <div className="review-topics">
              <strong>{t.review}</strong>
              <ul>
                {missedConcepts.map((unit) => (
                  <li key={unit.term.es}>
                    <strong>{text(unit.term, language)}</strong>
                    <p>{text(unit.body, language)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="result-actions">
            {passed ? (
              nextModule ? (
                <button className="button button-primary" onClick={() => openModule(nextModule, "learn")}>
                  {t.goNextModule} →
                </button>
              ) : (
                <button className="button button-primary" onClick={showHome}>{t.allDone} →</button>
              )
            ) : (
              <button className="button button-primary" onClick={retryExam}>{t.retry} ↻</button>
            )}
            <button className="text-button" onClick={() => { setUnit(0); setView("learn"); setResumeView("learn"); }}>
              {t.backToLesson}
            </button>
          </div>
        </section>
      </article>
    );
  }

  function renderPortfolio() {
    return (
      <main className="portfolio-page">
        <button
          className="text-button portfolio-back"
          onClick={() => {
            setView(resumeView);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ← {t.portfolioBack}
        </button>
        <header className="portfolio-heading">
          <p className="eyebrow">{t.projectPortfolio}</p>
          <h1>{t.portfolioTitle}</h1>
          <p>{t.portfolioIntro}</p>
          <div className="portfolio-project-summary">
            <span>{activeProject.icon}</span>
            <div>
              <strong>{text(activeProject.title, language)}</strong>
              <p>{text(activeProject.prompt, language)}</p>
            </div>
          </div>
        </header>
        <section className="portfolio-capstone">
          <p className="eyebrow">{t.portfolioCapstone}</p>
          <p>{t.portfolioCapstoneBrief}</p>
          <ul className="portfolio-rubric">
            {t.capstoneRubric.map((criterion) => <li key={criterion}>{criterion}</li>)}
          </ul>
          <div className="portfolio-progress">
            <strong>{t.moduleProgress(notedDeliverables, course.length)}</strong>
            <span>{t.portfolioProgress}</span>
          </div>
        </section>
        <div className="portfolio-deliverables">
          {course.map((module, index) => (
            <section className="portfolio-deliverable" key={module.id}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")} · {text(module.role, language)}</p>
              <h2>{text(module.title, language)}</h2>
              <p><strong>{t.outcome}:</strong> {text(curriculum[module.id].outcome, language)}</p>
              <label>
                <span className="sr-only">{t.projectWorkTitle} — {text(module.title, language)}</span>
                <textarea
                  value={projectNotes[module.id] ?? ""}
                  onChange={(event) =>
                    setProjectNotes((current) => ({ ...current, [module.id]: event.target.value }))
                  }
                  placeholder={t.projectWorkPlaceholder}
                  rows={4}
                />
              </label>
            </section>
          ))}
        </div>
        <section className="portfolio-synthesis">
          <label htmlFor="capstone-reflection">{t.capstoneReflection}</label>
          <p>{t.portfolioCapstoneBrief}</p>
          <textarea
            id="capstone-reflection"
            value={capstoneReflection}
            onChange={(event) => setCapstoneReflection(event.target.value)}
            placeholder={t.capstoneReflectionPlaceholder}
            rows={6}
          />
        </section>
        <div className="portfolio-actions">
          <button className="button button-primary" onClick={downloadPortfolio}>{t.portfolioDownload} ↓</button>
          <span>{t.saved}</span>
        </div>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={showHome} aria-label={`${t.home} — ${t.brand}`}>
          <span className="wordmark-mark" aria-hidden="true"><span>p</span></span>
          <span>{t.brand}</span>
        </button>
        <div className="topbar-actions">
          {view !== "home" && view !== "project" && view !== "portfolio" && (
            <button
              className="sidebar-collapse-button"
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
              aria-label={sidebarCollapsed ? t.expandSidebar : t.collapseSidebar}
              title={sidebarCollapsed ? t.expandSidebar : t.collapseSidebar}
              aria-expanded={!sidebarCollapsed}
              aria-controls="course-sidebar"
            >
              {sidebarCollapsed ? "›" : "‹"}
            </button>
          )}
          {view !== "home" && view !== "project" && view !== "portfolio" && (
            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-expanded={sidebarOpen}
              aria-controls="course-sidebar"
            >
              {sidebarOpen ? t.closeMenu : t.menu}
            </button>
          )}
          <label className="language-control">
            <span className="sr-only">{t.language}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label={t.language}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
            </select>
          </label>
        </div>
      </header>

      {view === "home" ? (
        renderHome()
      ) : view === "project" ? (
        renderProjectPicker()
      ) : view === "portfolio" ? (
        renderPortfolio()
      ) : (
        <div className={`course-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label={t.closeMenu} />}
          {renderSidebar()}
          <main className="course-main">
            {view === "learn" && renderLesson()}
            {view === "exam" && renderExam()}
            {view === "result" && renderResult()}
            <footer className="course-footer">
              <span className={storageError ? "storage-error" : ""}>
                <span aria-hidden="true">{storageError ? "!" : "●"}</span>
                {storageError ? t.saveError : t.saved}
              </span>
              <button onClick={openPortfolio}>{t.projectPortfolio}</button>
              <button onClick={showHome}>{t.home}</button>
            </footer>
          </main>
        </div>
      )}
      <footer className="site-footer">
        <span>{t.footer}</span>
        <span>{t.github}</span>
      </footer>
    </div>
  );
}

export default App;
