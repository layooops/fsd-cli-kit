import type { ScriptingLanguageType } from "~/entities/config/lib/types/fsd-config.interface";

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
