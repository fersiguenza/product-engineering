# Product Engineer Path

> **ES:** Un curso abierto e interactivo para aprender a construir productos de software de punta a punta, con fundamentos sólidos y criterio para usar IA.<br>
> **EN:** An open, interactive course for learning to build software products end to end, with strong fundamentals and sound judgment when using AI.

The course supports Spanish, English, Portuguese, French, and Italian, works in the browser, and saves each learner's progress locally. It is built with React, TypeScript, and Vite.

## What you'll learn

Twelve modules take learners from product discovery to delivery and responsible AI:

1. Product thinking and discovery
2. Product strategy, market context, business models, pricing, unit economics, distribution, and ethics
3. Business analysis and requirements
4. Project planning: scope, deliverables, estimation, capacity, dependencies, risk, budget, roadmap, communication, and learning
5. UX, UI, accessibility, Figma components, prototypes, and design handoff
6. Software engineering fundamentals: frontend, backend, APIs, HTTP, authentication, relational and NoSQL databases, mobile apps, and app-store releases
7. Software architecture: quality attributes, modularity, system boundaries, APIs, messaging, consistency, resilience, performance, and technical debt
8. Application security, threat modeling, identity, authorization, privacy, dependency risk, and incident response
9. Quality engineering and testing
10. DevOps, cloud fundamentals, containers and Kubernetes, CI/CD, observability, incident response, and CDN caching
11. Product analytics, data quality, bronze/silver/gold layers, and BI dashboards with Tableau or Power BI
12. AI fundamentals, prompt design, evaluation, RAG, spec-driven development, and OpenSpec

Lessons are short and slide-like. Each module has an extended guide that can be read in the course, downloaded as Markdown, or printed/saved as PDF. Learners can record a project deliverable in every module, synthesize the work into a final product case, and download the portfolio as Markdown. Exams contain at least 30 applied questions, show the key concept after each answer, and require 80% to pass. Lesson position, language, project choice, deliverables, capstone reflection, answers, and scores are saved in browser `localStorage`.

The AI module teaches verifiable, cross-functional workflows; it does not treat generated output as authoritative. The analytics and DevOps modules also include curated links to primary documentation and vendor-neutral concepts.

## AI assistants

[`llms.txt`](./llms.txt) is a quick index of the course content for AI assistants, and [`AGENTS.md`](./AGENTS.md) explains how they can support learners. The suggested course order is guidance, not a restriction: assistants should offer explanations, examples, and optional recaps while respecting each learner's choices. These files guide agents but cannot enforce their behavior.

## Run locally

Requirements: Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

## Publish on GitHub Pages

This repository includes [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). After pushing the project to a GitHub repository:

1. Make sure the deployment branch is named `main`, or update the workflow trigger to match your branch.
2. In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` or run **Actions → Deploy course to GitHub Pages → Run workflow**.
4. Once the workflow succeeds, GitHub Pages shows the published URL under **Settings → Pages**. For a project repository, it is typically `https://<owner>.github.io/<repository>/`.

The workflow builds with Node.js 22, uploads the generated `dist/` site, and deploys it with the official GitHub Pages actions. Vite uses relative asset paths so the site works both at a project URL and at a user or organization URL.

## Privacy and analytics

Progress stays in the learner's browser; the course has no progress backend and does not transmit lesson activity. Google Analytics 4 is taught as a topic, but this course site does **not** load Google Analytics or send learner behavior to an analytics provider.

## Guiding projects

Learners choose one of ten project ideas, such as a small business website, appointment booking, personal learning, or volunteer coordination. The same learning path applies to each project.

## Contributing and licenses

Issues and pull requests are welcome. Keep lessons practical, consistent across all five languages, accessible, and grounded in verifiable concepts.

- Application code: [MIT License](./LICENSE)
- Course content: [CC BY-SA 4.0](./CONTENT_LICENSE.md)
