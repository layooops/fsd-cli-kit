import type { FolderProps } from "./folder-with-template.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { scriptingLanguageFileExtension } from "~/entities/fsd/lib/helpers/file-name-helpers";
import { formatTextByConvention } from "~/shared/lib/utils/case-text";

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
