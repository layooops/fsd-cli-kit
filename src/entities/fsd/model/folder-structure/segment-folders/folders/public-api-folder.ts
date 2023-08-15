import type { FolderProps } from "./folder-with-template.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { generatePublicApiFileName } from "~/entities/fsd/lib/helpers/file-name-helpers";
import { formatTextByConvention } from "~/shared/lib/utils/case-text";

export const publicApiFolderWithTemplates = ({
  configOptions,
  namingConvention,
  sliceName,
}: FolderProps): Folder => {
  const { scriptingLanguage, documentation } = configOptions;
  const publicApiFileName = generatePublicApiFileName(scriptingLanguage);

  const fileName = formatTextByConvention(sliceName, namingConvention.file);

  const mdFileName = `${fileName}.md`;
  const folder: Folder = [
    { name: publicApiFileName, content: "export {}" },
    documentation.enabled && documentation.documentTypes.includes("markdown")
      ? {
          name: mdFileName,
          content: `# ${sliceName}`,
        }
      : null,
  ];
  return folder;
};
