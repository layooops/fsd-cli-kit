import type { Folder } from "../../../../lib/types/folder-structure.interface";
import type { FolderProps } from "./folder-with-template.interface";

import { formatTextByConvention } from "~/shared/lib/utils/case-text";

import { generatePublicApiFileName } from "../../../../lib/helpers/file-name-helpers";

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
