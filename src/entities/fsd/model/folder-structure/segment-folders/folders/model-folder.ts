import type { FolderProps } from "./folder-with-template.interface";
import type { ScriptingLanguageType } from "~/entities/config/lib/types/fsd-config.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { scriptingLanguageFileExtension } from "~/entities/fsd/lib/helpers/file-name-helpers";
import { DEFAULT_SLICE_FILE_NAME } from "~/shared/lib/constants";

export const generateModelFileName = (
  sliceName = DEFAULT_SLICE_FILE_NAME,
  scriptingLanguage: ScriptingLanguageType,
): string => {
  return `${sliceName}.model.${scriptingLanguageFileExtension(
    scriptingLanguage,
  )}`;
};

export const modelFolderWithTemplates = ({
  configOptions,
  sliceName,
}: FolderProps): Folder => {
  const modelFileName = generateModelFileName(
    sliceName,
    configOptions.scriptingLanguage,
  );

  return [modelFileName];
};
