import type { ScriptingLanguageType } from "~/entities/config";

export const scriptingLanguageFileExtension = (
  type: ScriptingLanguageType,
  jsx = false,
) => {
  if (type === "typescript") {
    return jsx ? "tsx" : "ts";
  }
  return jsx ? "jsx" : "js";
};

export const generatePublicApiFileName = (
  scriptingLanguage: ScriptingLanguageType,
): string => {
  return `index.${scriptingLanguageFileExtension(scriptingLanguage)}`;
};
