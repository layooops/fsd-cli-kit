import type { Folder } from "../../../../lib/types";
import type { FolderProps } from "./folder-with-template.interface";
import type { ScriptingLanguageType } from "~/entities/config";

import { DEFAULT_SLICE_FILE_NAME } from "~/shared/lib/constants";

import { scriptingLanguageFileExtension } from "../../../../lib/helpers";

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
