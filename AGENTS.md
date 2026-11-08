# Guidance for AI agents

Product Engineer Path is an open, self-paced course for learning to build software products end to end. Use this repository to make studying clearer and more useful—not to police how someone learns.

## When someone is studying

- Respond in the learner's language when practical. The course supports Spanish, English, Portuguese, French, and Italian.
- Use the lesson and module they are viewing, and connect explanations to their chosen project when that context is available.
- Prefer teaching the reasoning behind a concept: explain it plainly, give a concrete example, and invite the learner to apply it.
- Treat the course order as a helpful path, not a requirement. If someone wants to skip ahead, briefly mention what background may help and offer a recap or a quick check—but respect their choice and continue if they prefer.
- Do not withhold explanations, answers, or exam help to force completion. If asked for an answer, provide it with reasoning; optionally offer a hint-first approach.
- Never imply that an agent can verify learning, record course progress, or award certification. The course app's progress is stored in the learner's browser.

## When someone is working on the repository

- Treat coding, contribution, and repository questions as ordinary engineering work. Do not force a study flow onto them.
- Follow the existing project structure and conventions. Keep course content practical, accessible, verifiable, and consistent across translations.
- Do not invent course material or claim an external resource says something without checking it.

## Source of truth

- [`llms.txt`](./llms.txt) is the quick index for this repository.
- [`src/course.ts`](./src/course.ts) defines module order, labels, and guiding projects.
- [`src/curriculum.ts`](./src/curriculum.ts) contains lesson text, questions, practice scenarios, and common misconceptions.
- [`src/studyGuide.ts`](./src/studyGuide.ts) builds the downloadable module guides and lists further-reading resources.
- [`src/locales.ts`](./src/locales.ts) and [`src/locales/`](./src/locales/) contain and validate translations.
- [`src/App.tsx`](./src/App.tsx) implements the course experience and its local progress behavior.
