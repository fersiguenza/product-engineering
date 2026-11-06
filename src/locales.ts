import { course, projects, type Language } from "./course";
import { curriculum } from "./curriculum";
import { studyResources } from "./studyGuide";
import { frLocale } from "./locales/fr";
import { itLocale } from "./locales/it";
import { ptLocale } from "./locales/pt";

type LocaleBundle = {
  ui: Record<string, unknown>;
  course: Record<string, Record<string, unknown>>;
  projects: Record<string, Record<string, unknown>>;
  curriculum: Record<string, Record<string, unknown>>;
  resources: Readonly<Record<string, readonly unknown[]>>;
};

const bundles: Record<Exclude<Language, "es" | "en">, LocaleBundle> = {
  pt: ptLocale,
  fr: frLocale,
  it: itLocale,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function findTranslationGaps(
  source: unknown,
  translation: unknown,
  path: string,
  gaps: string[],
): void {
  if (
    isRecord(source) &&
    typeof source.es === "string" &&
    typeof source.en === "string"
  ) {
    if (typeof translation !== "string" || translation.trim() === "") gaps.push(path);
    return;
  }
  if (
    isRecord(source) &&
    Array.isArray(source.es) &&
    Array.isArray(source.en)
  ) {
    if (!Array.isArray(translation) || translation.length !== source.es.length) {
      gaps.push(path);
      return;
    }
    translation.forEach((value, index) => {
      if (typeof value !== "string" || value.trim() === "") gaps.push(`${path}[${index}]`);
    });
    return;
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(translation) || translation.length !== source.length) {
      gaps.push(path);
      return;
    }
    source.forEach((value, index) =>
      findTranslationGaps(value, translation[index], `${path}[${index}]`, gaps),
    );
    return;
  }
  if (!isRecord(source)) return;
  for (const [key, value] of Object.entries(source)) {
    findTranslationGaps(value, isRecord(translation) ? translation[key] : undefined, `${path}.${key}`, gaps);
  }
}

function assertCourseTranslations(): void {
  const gaps: string[] = [];
  for (const [language, bundle] of Object.entries(bundles) as [Exclude<Language, "es" | "en">, LocaleBundle][]) {
    for (const [moduleId, module] of Object.entries(curriculum)) {
      findTranslationGaps(module, bundle.curriculum[moduleId], `${language}.curriculum.${moduleId}`, gaps);
    }
    for (const module of course) {
      findTranslationGaps(module, bundle.course[module.id], `${language}.course.${module.id}`, gaps);
    }
    for (const project of projects) {
      findTranslationGaps(project, bundle.projects[project.id], `${language}.projects.${project.id}`, gaps);
    }
    for (const [moduleId, resources] of Object.entries(studyResources)) {
      findTranslationGaps(resources, bundle.resources[moduleId], `${language}.resources.${moduleId}`, gaps);
    }
  }
  if (gaps.length > 0) {
    throw new Error(`Incomplete course translations (${gaps.length} fields): ${gaps.slice(0, 20).join(", ")}`);
  }
}

assertCourseTranslations();

function applyTranslation(source: unknown, translation: unknown, language: Language): void {
  if (Array.isArray(source)) {
    if (!Array.isArray(translation)) return;
    source.forEach((value, index) => applyTranslation(value, translation[index], language));
    return;
  }
  if (!isRecord(source)) return;

  if (typeof translation === "string" && typeof source.es === "string" && typeof source.en === "string") {
    source[language] = translation;
    return;
  }
  if (Array.isArray(translation) && Array.isArray(source.es) && Array.isArray(source.en)) {
    source[language] = translation;
    return;
  }
  if (!isRecord(translation)) return;

  for (const [key, value] of Object.entries(translation)) {
    applyTranslation(source[key], value, language);
  }
}

for (const [language, bundle] of Object.entries(bundles) as [Exclude<Language, "es" | "en">, LocaleBundle][]) {
  for (const module of course) {
    applyTranslation(module, bundle.course[module.id], language);
  }
  for (const project of projects) {
    applyTranslation(project, bundle.projects[project.id], language);
  }
  for (const [moduleId, module] of Object.entries(curriculum)) {
    applyTranslation(module, bundle.curriculum[moduleId], language);
  }
  for (const [moduleId, resources] of Object.entries(studyResources)) {
    applyTranslation(resources, bundle.resources[moduleId], language);
  }
}

export function getUiTranslations<T extends object>(language: Language, base: T): T {
  if (language === "es" || language === "en") return base;
  const incomplete = Object.keys(base).filter((key) => {
    const source = base[key as keyof T];
    const translation = bundles[language].ui[key];
    if (typeof source === "string") {
      return typeof translation !== "string" || translation.trim() === "";
    }
    if (Array.isArray(source)) {
      return !Array.isArray(translation) ||
        translation.length !== source.length ||
        translation.some((item) => typeof item !== "string" || item.trim() === "");
    }
    return typeof source === "function" && typeof translation !== "function";
  });
  if (incomplete.length > 0) {
    throw new Error(`Incomplete ${language} interface translations: ${incomplete.join(", ")}`);
  }
  return { ...base, ...bundles[language].ui } as T;
}
