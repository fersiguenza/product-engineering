export type CoreLanguage = "es" | "en";
export type Language = CoreLanguage | "pt" | "fr" | "it";
export type LocalizedValue = Record<CoreLanguage, string> & Partial<Record<Language, string>>;
export type LocalizedOptions = Record<CoreLanguage, string[]> & Partial<Record<Language, string[]>>;

export function text(value: LocalizedValue, language: Language): string {
  return value[language] ?? value.en;
}

export function optionsText(value: LocalizedOptions, language: Language): string[] {
  return value[language] ?? value.en;
}

export interface ProjectOption {
  id: string;
  icon: string;
  title: LocalizedValue;
  description: LocalizedValue;
  prompt: LocalizedValue;
}

export interface CourseModule {
  id: string;
  icon: string;
  color: string;
  title: LocalizedValue;
  role: LocalizedValue;
  duration: LocalizedValue;
  lessonTitle: LocalizedValue;
  lesson: LocalizedValue;
  practiceTitle: LocalizedValue;
  practice: LocalizedValue;
  question: LocalizedValue;
  options: LocalizedOptions;
  answer: number;
  feedback: LocalizedValue;
}

export const projects: ProjectOption[] = [
  {
    id: "local-business",
    icon: "⌂",
    title: { es: "Web para un negocio", en: "Small business website" },
    description: { es: "Presencia y contacto para un negocio local.", en: "A local business's online presence and contact." },
    prompt: { es: "Ayudar a clientes a entender la oferta y dar el siguiente paso.", en: "Help customers understand the offer and take the next step." },
  },
  {
    id: "appointments",
    icon: "◷",
    title: { es: "Turnos y reservas", en: "Appointments and bookings" },
    description: { es: "Reservas para un servicio o profesional.", en: "Bookings for a service or independent professional." },
    prompt: { es: "Hacer fácil encontrar un horario y confirmar una reserva.", en: "Make it easy to find a time and confirm a booking." },
  },
  {
    id: "shop-orders",
    icon: "▣",
    title: { es: "Catálogo y pedidos", en: "Shop catalog and orders" },
    description: { es: "Productos y pedidos para una tienda pequeña.", en: "Products and orders for a small shop." },
    prompt: { es: "Mostrar productos disponibles y explicar cómo comprarlos.", en: "Show available products and explain how to buy them." },
  },
  {
    id: "workshops",
    icon: "◇",
    title: { es: "Talleres y eventos", en: "Workshops and events" },
    description: { es: "Publicación e inscripción a actividades.", en: "Promote activities and manage registrations." },
    prompt: { es: "Ayudar a encontrar una actividad y reservar un lugar.", en: "Help people find an activity and reserve a spot." },
  },
  {
    id: "local-directory",
    icon: "⌖",
    title: { es: "Guía de servicios", en: "Local services directory" },
    description: { es: "Un directorio para descubrir servicios cercanos.", en: "A directory to discover nearby services." },
    prompt: { es: "Conectar a personas con una opción confiable cerca suyo.", en: "Connect people with a trusted option nearby." },
  },
  {
    id: "habits",
    icon: "↗",
    title: { es: "Hábitos y aprendizaje", en: "Habits and learning" },
    description: { es: "Seguimiento de hábitos o metas de aprendizaje.", en: "Track habits or learning goals." },
    prompt: { es: "Ayudar a sostener una rutina sin castigar las interrupciones.", en: "Help people maintain a routine without punishing interruptions." },
  },
  {
    id: "budget",
    icon: "$",
    title: { es: "Gastos personales", en: "Personal expenses" },
    description: { es: "Registro simple de gastos y presupuesto.", en: "Simple expense and budget tracking." },
    prompt: { es: "Entender en qué se va el dinero y tomar una decisión útil.", en: "Understand where money goes and make a useful decision." },
  },
  {
    id: "meal-planning",
    icon: "◒",
    title: { es: "Comidas y recetas", en: "Meals and recipes" },
    description: { es: "Planificación de comidas para la semana.", en: "Plan meals for the week." },
    prompt: { es: "Elegir qué cocinar según tiempo, preferencias e ingredientes.", en: "Choose what to cook based on time, preferences, and ingredients." },
  },
  {
    id: "secondhand",
    icon: "⇄",
    title: { es: "Compra y venta local", en: "Local secondhand marketplace" },
    description: { es: "Publicación de artículos usados en una comunidad.", en: "List used items within a community." },
    prompt: { es: "Encontrar un artículo relevante y acordar un intercambio seguro.", en: "Find a relevant item and arrange a safe exchange." },
  },
  {
    id: "volunteers",
    icon: "♡",
    title: { es: "Organizar voluntariado", en: "Volunteer coordination" },
    description: { es: "Coordinar personas y tareas para una causa.", en: "Coordinate people and tasks for a cause." },
    prompt: { es: "Encontrar una forma concreta de ayudar y confirmar la participación.", en: "Find a concrete way to help and confirm participation." },
  },
];

export const course: CourseModule[] = [
  {
    id: "product",
    icon: "◉",
    color: "coral",
    title: { es: "Pensar en producto", en: "Think in products" },
    role: { es: "Product owner", en: "Product owner" },
    duration: { es: "8 min", en: "8 min" },
    lessonTitle: { es: "Empezá por el problema", en: "Start with the problem" },
    lesson: {
      es: "Antes de pensar en funcionalidades, entendé qué intenta hacer una persona hoy, en qué contexto y qué le cuesta. Empezá por el problema real, no por una lista de pantallas.",
      en: "Before thinking about features, understand what someone is trying to do today, in what context, and what gets in their way. Start with the real problem, not a list of screens.",
    },
    practiceTitle: { es: "Tu primer paso", en: "Your first move" },
    practice: {
      es: "Escribí quién tiene el problema, qué quiere lograr y qué obstáculo encuentra. Anotá también si ya existe una solución útil; para coordinar tareas, por ejemplo, compará construir con usar Jira, Asana o ClickUp.",
      en: "Write down who has the problem, what they want to achieve, and what gets in their way. Also note whether a useful solution already exists; for team task management, compare building with using Jira, Asana, or ClickUp.",
    },
    question: {
      es: "¿Cuál es un buen primer paso al iniciar un producto?",
      en: "What's a good first step when starting a product?",
    },
    options: {
      es: [
        "Entender cómo resuelven hoy esa necesidad las personas usuarias.",
        "Elegir los colores y diseñar el logo.",
        "Pedirle a la IA que programe una app completa.",
      ],
      en: [
        "Understand how users solve that need today.",
        "Choose colors and design the logo.",
        "Ask AI to code a complete app.",
      ],
    },
    answer: 0,
    feedback: {
      es: "¡Exacto! Primero investigamos el problema actual. Así podemos decidir si conviene construir, adaptar o usar algo que ya existe.",
      en: "Exactly! First we investigate the current problem. Then we can decide whether to build, adapt, or use something that already exists.",
    },
  },
  {
    id: "product-strategy",
    icon: "◈",
    color: "coral",
    title: { es: "Definir estrategia de producto", en: "Define product strategy" },
    role: { es: "Product strategy", en: "Product strategy" },
    duration: { es: "22 min", en: "22 min" },
    lessonTitle: { es: "Conectá necesidades con valor sostenible", en: "Connect needs to sustainable value" },
    lesson: {
      es: "Una estrategia de producto explica para quién creamos valor, qué problema priorizamos, cómo nos diferenciaremos y qué capacidades necesitamos para sostenerlo. Une evidencia de usuarios, contexto de mercado y objetivos del negocio.",
      en: "A product strategy explains for whom we create value, which problem we prioritize, how we will differentiate, and which capabilities sustain it. It connects user evidence, market context, and business goals.",
    },
    practiceTitle: { es: "Una apuesta explícita", en: "Make the bet explicit" },
    practice: {
      es: "Escribí una estrategia en una página: segmento, necesidad, propuesta de valor, alternativas, resultado para el negocio, capacidades, riesgos y evidencia para revisar la apuesta.",
      en: "Write a one-page strategy: segment, need, value proposition, alternatives, business outcome, capabilities, risks, and evidence for revisiting the bet.",
    },
    question: {
      es: "¿Qué diferencia una estrategia de producto de una lista de funcionalidades?",
      en: "What distinguishes a product strategy from a feature list?",
    },
    options: {
      es: [
        "Explica elecciones, usuarios, valor, diferenciación y resultados esperados.",
        "Enumera cada función solicitada sin priorizar ni explicar por qué.",
        "Garantiza que un plan detallado no necesitará revisiones.",
      ],
      en: [
        "It explains choices, users, value, differentiation, and intended outcomes.",
        "It lists every requested feature without prioritizing or explaining why.",
        "It guarantees a detailed plan will never need revision.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Así es. La estrategia enfoca decisiones y trade-offs; no es una promesa de que el futuro será predecible.",
      en: "That's right. Strategy focuses choices and trade-offs; it does not promise a predictable future.",
    },
  },
  {
    id: "analysis",
    icon: "⌕",
    color: "gold",
    title: { es: "Analizar y descubrir", en: "Analyze and discover" },
    role: { es: "Business analyst", en: "Business analyst" },
    duration: { es: "8 min", en: "8 min" },
    lessonTitle: { es: "Convertí necesidades en acuerdos", en: "Turn needs into agreements" },
    lesson: {
      es: "Una historia de usuario explica quién necesita algo y para qué. Los criterios de aceptación hacen que el equipo pueda comprobar si lo resolvió.",
      en: "A user story explains who needs something and why. Acceptance criteria let the team check whether it solved the need.",
    },
    practiceTitle: { es: "Una necesidad en una frase", en: "A need in one sentence" },
    practice: {
      es: "Probá este formato con tu proyecto: «Como [persona], quiero [acción] para [resultado]». Después agregá una condición que se pueda verificar.",
      en: "Try this format with your project: “As a [person], I want to [action] so I can [outcome].” Then add a condition that can be verified.",
    },
    question: {
      es: "¿Qué hace que un criterio de aceptación sea útil?",
      en: "What makes an acceptance criterion useful?",
    },
    options: {
      es: [
        "Se puede comprobar de forma clara con un ejemplo.",
        "Usa palabras técnicas para sonar profesional.",
        "Describe todas las ideas futuras del producto.",
      ],
      en: [
        "It can be clearly checked with an example.",
        "It uses technical words to sound professional.",
        "It describes every future product idea.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Sí. Un criterio comprobable alinea al equipo y hace posible probar el resultado.",
      en: "Yes. A verifiable criterion aligns the team and makes the result testable.",
    },
  },
  {
    id: "project-planning",
    icon: "▤",
    color: "lilac",
    title: { es: "Planificar proyectos", en: "Plan projects" },
    role: { es: "Project planning", en: "Project planning" },
    duration: { es: "24 min", en: "24 min" },
    lessonTitle: { es: "Convertí una idea en un plan adaptable", en: "Turn an idea into an adaptable plan" },
    lesson: {
      es: "Planificar no es adivinar una fecha ni dibujar un Gantt perfecto. Es acordar resultados, alcance, riesgos, dependencias, capacidad y cómo aprenderemos y ajustaremos el camino.",
      en: "Planning is not guessing a date or drawing a perfect Gantt chart. It is agreeing on outcomes, scope, risks, dependencies, capacity, and how to learn and adapt along the way.",
    },
    practiceTitle: { es: "Un plan que se pueda revisar", en: "A plan you can revisit" },
    practice: {
      es: "Prepará un brief de una página: problema y resultado, alcance y exclusiones, entregables, responsables, supuestos, riesgos, dependencias, hitos y señales de avance. Marcá qué es una estimación y qué evidencia la cambiaría.",
      en: "Draft a one-page brief: problem and outcome, scope and exclusions, deliverables, owners, assumptions, risks, dependencies, milestones, and progress signals. Mark estimates as estimates and note what evidence would change them.",
    },
    question: {
      es: "¿Qué hace que un plan de proyecto sea útil cuando aparecen cambios?",
      en: "What makes a project plan useful when changes arise?",
    },
    options: {
      es: [
        "Explicita resultados, supuestos, riesgos y decisiones que se revisan con evidencia.",
        "Promete una fecha fija aunque cambien alcance y capacidad.",
        "Incluye cada tarea detallada antes de hablar con quienes harán el trabajo.",
      ],
      en: [
        "It makes outcomes, assumptions, risks, and evidence-based decisions explicit.",
        "It promises a fixed date even when scope and capacity change.",
        "It details every task before speaking with the people doing the work.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Exacto. Un plan da contexto y permite decidir; no elimina la incertidumbre ni debe ocultarla.",
      en: "Exactly. A plan provides context for decisions; it does not eliminate uncertainty or hide it.",
    },
  },
  {
    id: "analytics",
    icon: "⌁",
    color: "blue",
    title: { es: "Medir y aprender", en: "Measure and learn" },
    role: { es: "Product analytics", en: "Product analytics" },
    duration: { es: "18 min", en: "18 min" },
    lessonTitle: { es: "Medí decisiones, no clics", en: "Measure decisions, not clicks" },
    lesson: {
      es: "Seguí el recorrido del dato desde sus fuentes hasta modelos confiables en capas bronze, silver y gold. Diseñá dashboards para decisiones reales con herramientas como Tableau o Power BI; tracking, calidad y privacidad importan en cada etapa.",
      en: "Follow data from its sources through trusted bronze, silver, and gold models. Design dashboards for real decisions with tools such as Tableau or Power BI; tracking, quality, and privacy matter at every step.",
    },
    practiceTitle: { es: "Un plan de tracking responsable", en: "A responsible tracking plan" },
    practice: {
      es: "Para tu proyecto, elegí un objetivo y armá una fila del plan: evento, cuándo se dispara, parámetro estrictamente necesario y qué decisión informa. Ejemplo: `booking_completed`, al confirmar el turno, `service_type`, para entender qué servicios se reservan. Nunca envíes nombres, emails ni información sensible a Analytics. Antes de instrumentar, revisá consentimiento, privacidad y requisitos aplicables.",
      en: "For your project, choose a goal and draft one row in a tracking plan: event, when it fires, strictly necessary parameter, and the decision it informs. Example: `booking_completed`, when an appointment is confirmed, `service_type`, to learn which services people book. Never send names, emails, or sensitive information to Analytics. Before instrumenting, review consent, privacy, and applicable requirements.",
    },
    question: {
      es: "¿Qué plan de tracking aporta información útil y respeta la privacidad?",
      en: "Which tracking plan is useful and respects privacy?",
    },
    options: {
      es: [
        "Registrar `booking_completed` al confirmar una reserva y medir cuántas se completan, sin datos personales.",
        "Enviar a GA4 cada clic junto con el nombre y el email de la persona.",
        "Agregar Analytics primero y decidir después qué datos recoger.",
      ],
      en: [
        "Record `booking_completed` when a booking is confirmed and measure how many complete, without personal data.",
        "Send every click to GA4 along with the person's name and email.",
        "Add Analytics first and decide later which data to collect.",
      ],
    },
    answer: 0,
    feedback: {
      es: "¡Exacto! Un evento ligado a un objetivo ayuda a tomar decisiones; minimizar los datos y cuidar el consentimiento protege a las personas.",
      en: "Exactly! An event tied to a goal helps you make decisions; minimizing data and respecting consent protects people.",
    },
  },
  {
    id: "design",
    icon: "✳",
    color: "lilac",
    title: { es: "Diseñar la experiencia", en: "Design the experience" },
    role: { es: "UX / UI", en: "UX / UI" },
    duration: { es: "10 min", en: "10 min" },
    lessonTitle: { es: "Diseñá el camino, no solo la pantalla", en: "Design the journey, not just the screen" },
    lesson: {
      es: "La experiencia incluye cada paso: encontrar una herramienta, entender si está disponible y acordar el préstamo. Un flujo simple revela problemas antes de escribir código.",
      en: "The experience includes every step: finding a tool, understanding its availability, and arranging the loan. A simple flow reveals problems before you write code.",
    },
    practiceTitle: { es: "Un buen diseño", en: "Good design" },
    practice: {
      es: "Primero dibujá los pasos con cajas y flechas. No necesitás una herramienta de diseño para pensar con claridad.",
      en: "First sketch the steps with boxes and arrows. You don't need a design tool to think clearly.",
    },
    question: {
      es: "¿Qué conviene hacer antes de pulir colores y tipografía?",
      en: "What should you do before polishing colors and typography?",
    },
    options: {
      es: [
        "Comprobar que el flujo principal sea entendible.",
        "Agregar animaciones a todos los botones.",
        "Elegir un framework de interfaz.",
      ],
      en: [
        "Check that the main flow is understandable.",
        "Add animations to every button.",
        "Choose a UI framework.",
      ],
    },
    answer: 0,
    feedback: {
      es: "¡Bien! Una interfaz atractiva no arregla un flujo confuso. Primero, claridad y accesibilidad.",
      en: "Right! An attractive interface can't fix a confusing flow. Clarity and accessibility come first.",
    },
  },
  {
    id: "engineering",
    icon: "⌘",
    color: "blue",
    title: { es: "Construir con fundamentos", en: "Build with fundamentals" },
    role: { es: "Software engineer", en: "Software engineer" },
    duration: { es: "14 min", en: "14 min" },
    lessonTitle: { es: "Entendé antes de automatizar", en: "Understand before automating" },
    lesson: {
      es: "El navegador presenta la interfaz; la lógica define qué ocurre; los datos guardan herramientas y préstamos. Separar estas responsabilidades ayuda a entender y cambiar el sistema.",
      en: "The browser presents the interface; logic defines what happens; data stores tools and loans. Separating these responsibilities helps you understand and change the system.",
    },
    practiceTitle: { es: "La IA como copiloto", en: "AI as a copilot" },
    practice: {
      es: "Pedile a la IA una explicación del código y un caso límite. Revisá la respuesta y probala: vos seguís siendo responsable de lo que entregás.",
      en: "Ask AI to explain the code and suggest an edge case. Review and test its answer: you're still responsible for what you ship.",
    },
    question: {
      es: "La IA genera una función que no entendés. ¿Qué hacés?",
      en: "AI generates a function you don't understand. What do you do?",
    },
    options: {
      es: [
        "Pedir una explicación, revisar el código y probarlo.",
        "Publicarlo porque parece correcto.",
        "Pedirle que agregue más código encima.",
      ],
      en: [
        "Ask for an explanation, review the code, and test it.",
        "Ship it because it looks right.",
        "Ask it to add more code on top.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Exacto. La IA acelera el trabajo, pero no reemplaza entender ni verificar el resultado.",
      en: "Exactly. AI can speed up work, but it doesn't replace understanding or verifying the result.",
    },
  },
  {
    id: "architecture",
    icon: "⌘",
    color: "lilac",
    title: { es: "Diseñar arquitectura", en: "Design architecture" },
    role: { es: "Software architecture", en: "Software architecture" },
    duration: { es: "25 min", en: "25 min" },
    lessonTitle: { es: "Elegí límites antes que modas", en: "Choose boundaries before trends" },
    lesson: {
      es: "La arquitectura define cómo se separan responsabilidades y cómo colaboran las partes de un sistema. Las decisiones dependen del contexto, los riesgos y los cambios esperados; no existe una arquitectura universalmente mejor.",
      en: "Architecture defines how responsibilities are separated and how system parts collaborate. Decisions depend on context, risks, and expected change; there is no universally best architecture.",
    },
    practiceTitle: { es: "Registrá una decisión", en: "Record a decision" },
    practice: {
      es: "Escribí un ADR breve: contexto y problema, decisión, alternativas consideradas, consecuencias, riesgos y evidencia que motivaría revisarla.",
      en: "Write a short ADR: context and problem, decision, alternatives considered, consequences, risks, and evidence that would trigger a review.",
    },
    question: {
      es: "¿Qué hace valiosa una decisión de arquitectura para el equipo?",
      en: "What makes an architecture decision valuable to a team?",
    },
    options: {
      es: [
        "Explicita contexto, trade-offs y consecuencias para que pueda revisarse.",
        "Usa el patrón más popular para evitar hablar del problema.",
        "Se oculta en el código para impedir que alguien la cuestione.",
      ],
      en: [
        "It makes context, trade-offs, and consequences explicit so it can be revisited.",
        "It uses the most popular pattern to avoid discussing the problem.",
        "It is hidden in code to prevent anyone from questioning it.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Exacto. Una decisión explícita permite entender por qué se eligió un camino y cuándo conviene revisarlo.",
      en: "Exactly. An explicit decision explains why a path was chosen and when it may need review.",
    },
  },
  {
    id: "security",
    icon: "⬡",
    color: "coral",
    title: { es: "Construir con seguridad", en: "Build securely" },
    role: { es: "Application security", en: "Application security" },
    duration: { es: "24 min", en: "24 min" },
    lessonTitle: { es: "Diseñá para reducir daño", en: "Design to reduce harm" },
    lesson: {
      es: "La seguridad protege a personas, datos y servicios frente a abuso, errores y exposición. Se integra desde el diseño hasta la operación y la respuesta a incidentes.",
      en: "Security protects people, data, and services from abuse, mistakes, and exposure. It belongs in design, delivery, operations, and incident response.",
    },
    practiceTitle: { es: "Un threat model inicial", en: "A first threat model" },
    practice: {
      es: "Para tu proyecto, identificá activos, límites de confianza, actores, amenazas plausibles, controles preventivos, señales de detección y respuesta. Priorizá por impacto y probabilidad, no por miedo.",
      en: "For your project, identify assets, trust boundaries, actors, plausible threats, preventive controls, detection signals, and response. Prioritize by impact and likelihood, not fear.",
    },
    question: {
      es: "¿Qué aporta modelar amenazas antes de implementar una funcionalidad?",
      en: "What does threat modeling before implementation provide?",
    },
    options: {
      es: [
        "Ayuda a anticipar abuso y elegir controles proporcionales al riesgo.",
        "Demuestra que el producto no puede tener vulnerabilidades.",
        "Permite delegar toda la seguridad a una herramienta automática.",
      ],
      en: [
        "It helps anticipate abuse and choose controls proportional to risk.",
        "It proves the product cannot have vulnerabilities.",
        "It lets a team delegate all security to an automated tool.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Correcto. Modelar amenazas orienta decisiones y revisión, pero no sustituye pruebas, monitoreo ni respuesta.",
      en: "Correct. Threat modeling guides decisions and review, but it does not replace testing, monitoring, or response.",
    },
  },
  {
    id: "quality",
    icon: "✓",
    color: "green",
    title: { es: "Asegurar la calidad", en: "Build quality in" },
    role: { es: "QA engineer", en: "QA engineer" },
    duration: { es: "9 min", en: "9 min" },
    lessonTitle: { es: "Probá lo esperado y lo inesperado", en: "Test the expected and unexpected" },
    lesson: {
      es: "Una prueba útil confirma un comportamiento observable. Además del camino feliz, pensá qué pasa si falta información, el recurso ya no está disponible o una acción se repite.",
      en: "A useful test confirms observable behavior. Alongside the happy path, consider what happens if information is missing, a resource is no longer available, or an action is repeated.",
    },
    practiceTitle: { es: "Pensar como tester", en: "Think like a tester" },
    practice: {
      es: "Si el préstamo falla, el usuario necesita saber qué pasó y qué puede hacer ahora.",
      en: "If a loan fails, the user needs to know what happened and what they can do next.",
    },
    question: {
      es: "¿Qué caso conviene probar además del flujo exitoso?",
      en: "Which case should you test in addition to the successful flow?",
    },
    options: {
      es: [
        "Completar el flujo con un dato requerido que falta.",
        "Cambiar el color del logo.",
        "Repetir exactamente el mismo préstamo.",
      ],
      en: [
        "Complete the flow with a required detail missing.",
        "Change the logo color.",
        "Repeat the exact same loan.",
      ],
    },
    answer: 0,
    feedback: {
      es: "¡Sí! Probar estados y errores reales evita sorpresas para las personas usuarias.",
      en: "Yes! Testing real states and errors prevents surprises for users.",
    },
  },
  {
    id: "delivery",
    icon: "↗",
    color: "orange",
    title: { es: "Entregar y operar", en: "Ship and operate" },
    role: { es: "DevOps engineer", en: "DevOps engineer" },
    duration: { es: "14 min", en: "14 min" },
    lessonTitle: { es: "Publicar es el comienzo", en: "Shipping is the beginning" },
    lesson: {
      es: "Un despliegue lleva el producto a las personas usuarias. Después, necesitás observar si funciona, entender errores y poder volver atrás si algo sale mal.",
      en: "A deployment brings the product to users. After that, you need to observe whether it works, understand errors, and be able to roll back if something goes wrong.",
    },
    practiceTitle: { es: "Pensá en el día después", en: "Think about the day after" },
    practice: {
      es: "Un buen despliegue incluye una forma de detectar problemas, no solo un botón de publicar.",
      en: "A good deployment includes a way to detect problems, not just a publish button.",
    },
    question: {
      es: "¿Qué conviene tener listo antes de desplegar?",
      en: "What should be ready before you deploy?",
    },
    options: {
      es: [
        "Una forma de verificar que funciona y revertir si falla.",
        "Una promesa de que nunca habrá errores.",
        "Un cambio de diseño de último momento.",
      ],
      en: [
        "A way to verify it works and roll back if it fails.",
        "A promise that there will never be errors.",
        "A last-minute design change.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Correcto. Operar el producto también es aprender y responder cuando algo cambia.",
      en: "Correct. Operating the product also means learning and responding when things change.",
    },
  },
  {
    id: "ai",
    icon: "✳",
    color: "violet",
    title: { es: "Trabajar con IA y especificaciones", en: "Work with AI and specifications" },
    role: { es: "Práctica transversal", en: "Cross-functional practice" },
    duration: { es: "18 min", en: "18 min" },
    lessonTitle: { es: "IA como herramienta, no como autoridad", en: "AI as a tool, not an authority" },
    lesson: {
      es: "Aprendé cómo funcionan los modelos generativos, cuándo confiar —y cuándo no— en sus resultados, cómo sumar contexto con RAG y cómo colaborar mediante especificaciones verificables antes de pedirle cambios a la IA.",
      en: "Learn how generative models work, when to trust—and not trust—their output, how to add context with RAG, and how to collaborate through verifiable specifications before asking AI to make changes.",
    },
    practiceTitle: { es: "Un flujo responsable y comprobable", en: "A responsible, verifiable workflow" },
    practice: {
      es: "Elegí un cambio pequeño del proyecto. Escribí el problema, los actores, los escenarios y las restricciones; pedile a una IA que proponga un plan, cuestioná sus supuestos, definí pruebas y revisá la implementación contra la especificación.",
      en: "Choose a small change in your project. Write the problem, actors, scenarios, and constraints; ask AI for a plan, challenge its assumptions, define tests, and review the implementation against the specification.",
    },
    question: {
      es: "¿Qué mantiene al equipo en control cuando usa IA para cambiar un producto?",
      en: "What keeps a team in control when using AI to change a product?",
    },
    options: {
      es: [
        "Contexto explícito, especificaciones comprobables, revisión humana y pruebas.",
        "Confiar en la respuesta porque fue generada con mucha seguridad.",
        "Entregar al modelo la decisión de alcance, calidad y publicación.",
      ],
      en: [
        "Explicit context, verifiable specifications, human review, and tests.",
        "Trusting the answer because it was generated confidently.",
        "Delegating scope, quality, and release decisions to the model.",
      ],
    },
    answer: 0,
    feedback: {
      es: "Exacto. La IA acelera partes del trabajo; los objetivos, límites y responsabilidad siguen siendo del equipo.",
      en: "Exactly. AI can accelerate parts of the work; goals, boundaries, and responsibility still belong to the team.",
    },
  },
];
