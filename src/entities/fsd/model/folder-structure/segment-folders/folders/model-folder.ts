import type {
  FsdConfig,
  ScriptingLanguageType,
} from "~/entities/config/lib/types/config.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { scriptingLanguageFileExtension } from "~/entities/fsd/lib/helpers/file-name-helpers";

interface ModelFolder {
  configOptions: FsdConfig["globalSettings"];
  sliceName?: string;
}

export const generateModelFileName = (
  sliceName = "slice",
  scriptingLanguage: ScriptingLanguageType,
): string => {
  return `${sliceName}.model.${scriptingLanguageFileExtension(
    scriptingLanguage,
  )}`;
};

export const modelFolderWithTemplates = ({
  configOptions,
  sliceName = "slice",
}: ModelFolder): Folder => {
  const modelFileName = generateModelFileName(
    sliceName,
    configOptions.scriptingLanguage,
  );

  return [modelFileName];
};
