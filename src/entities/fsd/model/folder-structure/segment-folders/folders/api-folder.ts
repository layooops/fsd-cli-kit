import type { Folder } from "../../../../lib/types/folder-structure.interface";
import type { FolderProps } from "./folder-with-template.interface";

import { formatTextByConvention } from "~/shared/lib/utils/case-text";

import { scriptingLanguageFileExtension } from "../../../../lib/helpers/file-name-helpers";

export const apiFolderWithTemplates = ({
  sliceName,
  namingConvention,
  configOptions,
}: FolderProps): Folder => {
  const { scriptingLanguage } = configOptions;

  const fileName = formatTextByConvention(
    `${sliceName}Api`,
    namingConvention.file,
  );

  const folder: Folder = [
    {
      name: `${fileName}.${scriptingLanguageFileExtension(scriptingLanguage)}`,
    },
  ];
  return folder;
};
