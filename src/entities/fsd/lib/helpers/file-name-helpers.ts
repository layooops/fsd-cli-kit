import type { ScriptingLanguageType } from "~/entities/config/lib/types/config.interface";

export const scriptingLanguageFileExtension = (type: ScriptingLanguageType) =>
  type === "typescript" ? "ts" : "js";

export const generatePublicApiFileName = (
  scriptingLanguage: ScriptingLanguageType,
): string => {
  return `index.${scriptingLanguageFileExtension(scriptingLanguage)}`;
};
