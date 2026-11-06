import { text, type CourseModule, type Language, type ProjectOption } from "./course";
import type { LearningModule } from "./curriculum";

export interface StudyResource {
  title: Record<"es" | "en", string> & Partial<Record<Language, string>>;
  url: string;
}

export const studyResources: Record<string, StudyResource[]> = {
  product: [
    { title: { es: "Product Talk: discovery continua", en: "Product Talk: continuous discovery" }, url: "https://www.producttalk.org/" },
    { title: { es: "SVPG: gestión de producto", en: "SVPG: product management" }, url: "https://www.svpg.com/product-management/" },
  ],
  "product-strategy": [
    { title: { es: "Strategyzer: Business Model Canvas", en: "Strategyzer: Business Model Canvas" }, url: "https://www.strategyzer.com/library/the-business-model-canvas" },
    { title: { es: "Strategyzer: Value Proposition Canvas", en: "Strategyzer: Value Proposition Canvas" }, url: "https://www.strategyzer.com/library/the-value-proposition-canvas" },
    { title: { es: "SVPG: estrategia de producto", en: "SVPG: product strategy" }, url: "https://www.svpg.com/product-strategy/" },
  ],
  analysis: [
    { title: { es: "IIBA: modelo de conceptos de análisis de negocio", en: "IIBA: business analysis core concept model" }, url: "https://www.iiba.org/business-analysis-blogs/business-analysis-core-concept-model/" },
    { title: { es: "Atlassian: historias de usuario", en: "Atlassian: user stories" }, url: "https://www.atlassian.com/agile/project-management/user-stories" },
  ],
  "project-planning": [
    { title: { es: "Atlassian: guía de gestión de proyectos", en: "Atlassian: project management guide" }, url: "https://www.atlassian.com/work-management/project-management" },
    { title: { es: "PMI: fundamentos de gestión de proyectos", en: "PMI: project management basics" }, url: "https://www.pmi.org/learning/library/project-management-basics-what-why-9090" },
    { title: { es: "Scrum Guide", en: "Scrum Guide" }, url: "https://scrumguides.org/" },
  ],
  analytics: [
    { title: { es: "Google Analytics: eventos", en: "Google Analytics: events" }, url: "https://support.google.com/analytics/answer/9322688" },
    { title: { es: "Google Analytics: privacidad y controles de datos", en: "Google Analytics: privacy and data controls" }, url: "https://support.google.com/analytics/answer/9019185" },
    { title: { es: "Databricks: arquitectura Medallion", en: "Databricks: medallion architecture" }, url: "https://docs.databricks.com/en/lakehouse/medallion.html" },
    { title: { es: "Microsoft Learn: crear dashboards de Power BI", en: "Microsoft Learn: create Power BI dashboards" }, url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards" },
    { title: { es: "Tableau: crear dashboards", en: "Tableau: build dashboards" }, url: "https://help.tableau.com/current/pro/desktop/en-us/dashboards.htm" },
  ],
  design: [
    { title: { es: "W3C: consejos para diseñar accesibilidad web", en: "W3C: designing for web accessibility" }, url: "https://www.w3.org/WAI/tips/designing/" },
    { title: { es: "MDN: accesibilidad web", en: "MDN: web accessibility" }, url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
    { title: { es: "Figma Learn: recursos y tutoriales", en: "Figma Learn: resources and tutorials" }, url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design" },
  ],
  engineering: [
    { title: { es: "MDN: aprender desarrollo web", en: "MDN: learn web development" }, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development" },
    { title: { es: "PostgreSQL: tutorial de SQL", en: "PostgreSQL: SQL tutorial" }, url: "https://www.postgresql.org/docs/current/tutorial.html" },
    { title: { es: "MongoDB: fundamentos de bases de documentos", en: "MongoDB: document database fundamentals" }, url: "https://www.mongodb.com/docs/manual/introduction/" },
    { title: { es: "OpenID Foundation: OpenID Connect", en: "OpenID Foundation: OpenID Connect" }, url: "https://openid.net/developers/how-connect-works/" },
    { title: { es: "Android Developers: fundamentos de desarrollo", en: "Android Developers: development fundamentals" }, url: "https://developer.android.com/develop" },
    { title: { es: "Apple Developer: desarrollo para plataformas Apple", en: "Apple Developer: develop for Apple platforms" }, url: "https://developer.apple.com/tutorials/" },
    { title: { es: "Google Play Console: publicar una app", en: "Google Play Console: publish an app" }, url: "https://support.google.com/googleplay/android-developer/answer/9859152" },
    { title: { es: "Apple: enviar una app para revisión", en: "Apple: submit an app for review" }, url: "https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app/" },
    { title: { es: "Pro Git: libro gratuito", en: "Pro Git: free book" }, url: "https://git-scm.com/book/en/v2" },
  ],
  architecture: [
    { title: { es: "C4 model: diagramas de arquitectura", en: "C4 model: architecture diagrams" }, url: "https://c4model.com/" },
    { title: { es: "Martin Fowler: decisiones de arquitectura", en: "Martin Fowler: architecture decisions" }, url: "https://martinfowler.com/architecture/" },
    { title: { es: "Microsoft: patrones de arquitectura", en: "Microsoft: architecture patterns" }, url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/" },
  ],
  security: [
    { title: { es: "OWASP Top 10", en: "OWASP Top 10" }, url: "https://owasp.org/www-project-top-ten/" },
    { title: { es: "OWASP Application Security Verification Standard", en: "OWASP Application Security Verification Standard" }, url: "https://owasp.org/www-project-application-security-verification-standard/" },
    { title: { es: "NIST: Secure Software Development Framework", en: "NIST: Secure Software Development Framework" }, url: "https://csrc.nist.gov/Projects/ssdf" },
  ],
  quality: [
    { title: { es: "Playwright: primeros pasos", en: "Playwright: getting started" }, url: "https://playwright.dev/docs/intro" },
    { title: { es: "ISTQB: certificación de fundamentos de testing", en: "ISTQB: foundation-level testing certification" }, url: "https://www.istqb.org/certifications/certified-tester-foundation-level" },
  ],
  delivery: [
    { title: { es: "DORA: capacidades de entrega de software", en: "DORA: software delivery capabilities" }, url: "https://dora.dev/capabilities/" },
    { title: { es: "GitHub Actions: documentación", en: "GitHub Actions: documentation" }, url: "https://docs.github.com/en/actions" },
    { title: { es: "Microsoft Learn: conceptos de computación en la nube", en: "Microsoft Learn: cloud computing concepts" }, url: "https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/" },
    { title: { es: "Kubernetes: conceptos", en: "Kubernetes: concepts" }, url: "https://kubernetes.io/docs/concepts/" },
    { title: { es: "MDN: caché HTTP", en: "MDN: HTTP caching" }, url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching" },
    { title: { es: "Cloudflare: conceptos básicos de CDN", en: "Cloudflare: CDN fundamentals" }, url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" },
    { title: { es: "Amazon CloudFront: documentación", en: "Amazon CloudFront: documentation" }, url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" },
  ],
  ai: [
    { title: { es: "OpenAI: guía de ingeniería de prompts", en: "OpenAI: prompt engineering guide" }, url: "https://platform.openai.com/docs/guides/prompt-engineering" },
    { title: { es: "OpenAI: recuperación de información", en: "OpenAI: retrieval guide" }, url: "https://platform.openai.com/docs/guides/retrieval" },
    { title: { es: "Microsoft Learn: RAG en Azure AI Search", en: "Microsoft Learn: RAG in Azure AI Search" }, url: "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview" },
    { title: { es: "OpenSpec: desarrollo guiado por especificaciones", en: "OpenSpec: spec-driven development" }, url: "https://github.com/Fission-AI/OpenSpec" },
  ],
};

interface StudyGuideContent {
  module: CourseModule;
  curriculum: LearningModule;
  project: ProjectOption;
  language: Language;
}

export function buildStudyGuideMarkdown({
  module,
  curriculum,
  project,
  language,
}: StudyGuideContent): string {
  const labels = {
    es: {
        course: "Ruta Product Engineer",
        outcome: "Resultado del módulo",
        project: "Conectalo con tu proyecto",
        apply: "Aplicá el concepto",
        check: "Comprobá tu comprensión",
        avoid: "Error frecuente para evitar",
        resources: "Para profundizar",
        flow: "Flujo web básico",
        flowDescription: "El frontend envía una solicitud HTTP a una API. El backend valida permisos y reglas, consulta o modifica la base de datos y devuelve una respuesta al navegador.",
    },
    en: {
        course: "Product Engineer Path",
        outcome: "Module outcome",
        project: "Connect it to your project",
        apply: "Apply the concept",
        check: "Check your understanding",
        avoid: "Common mistake to avoid",
        resources: "Go deeper",
        flow: "A basic web request",
        flowDescription: "The frontend sends an HTTP request to an API. The backend checks permissions and business rules, reads or changes the database, and returns a response to the browser.",
    },
    pt: {
        course: "Trilha Product Engineer",
        outcome: "Resultado do módulo",
        project: "Conecte ao seu projeto",
        apply: "Aplique o conceito",
        check: "Verifique sua compreensão",
        avoid: "Erro comum a evitar",
        resources: "Para aprofundar",
        flow: "Fluxo básico da web",
        flowDescription: "O frontend envia uma solicitação HTTP para uma API. O backend verifica permissões e regras de negócio, consulta ou altera o banco de dados e devolve uma resposta ao navegador.",
    },
    fr: {
        course: "Parcours Product Engineer",
        outcome: "Résultat du module",
        project: "Reliez-le à votre projet",
        apply: "Appliquez le concept",
        check: "Vérifiez votre compréhension",
        avoid: "Erreur fréquente à éviter",
        resources: "Pour approfondir",
        flow: "Requête web de base",
        flowDescription: "Le frontend envoie une requête HTTP à une API. Le backend vérifie les autorisations et les règles métier, lit ou modifie la base de données, puis renvoie une réponse au navigateur.",
    },
    it: {
        course: "Percorso Product Engineer",
        outcome: "Risultato del modulo",
        project: "Collegalo al tuo progetto",
        apply: "Applica il concetto",
        check: "Verifica la comprensione",
        avoid: "Errore comune da evitare",
        resources: "Per approfondire",
        flow: "Richiesta web di base",
        flowDescription: "Il frontend invia una richiesta HTTP a un'API. Il backend verifica permessi e regole aziendali, legge o modifica il database e restituisce una risposta al browser.",
    },
  }[language];
  const lines = [
    `# ${text(module.title, language)}`,
    "",
    `> ${labels.course} · ${text(module.role, language)}`,
    "",
    text(curriculum.overview, language),
    "",
    `## ${labels.outcome}`,
    "",
    text(curriculum.outcome, language),
    "",
    `## ${labels.project}`,
    "",
    `**${text(project.title, language)}:** ${text(project.prompt, language)}`,
    "",
  ];

  if (module.id === "engineering") {
    lines.push(`## ${labels.flow}`, "", labels.flowDescription, "");
  }

  curriculum.units.forEach((unit) => {
    lines.push(
      `## ${text(unit.term, language)}`,
      "",
      text(unit.body, language),
      "",
      `**${labels.apply}:** ${text(unit.scenario, language)}`,
      "",
      `**${labels.check}:** ${text(unit.question, language)}`,
      "",
      `**${labels.avoid}:** ${text(unit.misconception, language)}`,
      "",
    );
  });

  lines.push(`## ${labels.resources}`, "");
  for (const resource of studyResources[module.id] ?? []) {
    lines.push(`- [${text(resource.title, language)}](${resource.url})`);
  }
  lines.push("", "---", "", labels.course, "");

  return lines.join("\n");
}
