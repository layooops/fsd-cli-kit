import type { FolderProps } from "./folder-with-template.interface";
import type { StylesSettings } from "~/entities/config/lib/types/fsd-config.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { scriptingLanguageFileExtension } from "~/entities/fsd/lib/helpers/file-name-helpers";
import {
  cssTemplate,
  rfcTemplate,
  storyBookTemplate,
  testTemplate,
} from "~/entities/templates/model/ui";
import { DEFAULT_SLICE_FILE_NAME } from "~/shared/lib/constants";
import { formatTextByConvention } from "~/shared/lib/utils/case-text";

export function generateUiCSSFileName(
  css: StylesSettings,
  sliceNameCased = DEFAULT_SLICE_FILE_NAME,
): string | undefined {
  if (css.cssFramework === "none") {
    return undefined;
  }
  if (css.cssFramework === "css-modules") {
    return `${sliceNameCased}.module.${css.cssPreprocessor}`;
  }
  if (css.cssFramework === "standard") {
    return `${sliceNameCased}.${css.cssPreprocessor}`;
  }
  return undefined;
}

export const uiFolderWithTemplates = ({
  configOptions,
  namingConvention,
  sliceName = DEFAULT_SLICE_FILE_NAME,
}: FolderProps): Folder => {
  const {
    styles: css,
    scriptingLanguage,
    testing,
    documentation,
  } = configOptions;

  const fileName = formatTextByConvention(sliceName, namingConvention.file);

  const uiCSSFileName = generateUiCSSFileName(css, fileName);

  const testingName = `${fileName}.${
    testing.testFilePostfix
  }.${scriptingLanguageFileExtension(scriptingLanguage, true)}`;

  const storybookName = `${fileName}.stories.${scriptingLanguageFileExtension(
    scriptingLanguage,
    true,
  )}`;

  const rfcName = `${fileName}.${scriptingLanguageFileExtension(
    scriptingLanguage,
    true,
  )}`;

  const folder: Folder = [
    css.cssFramework === "none" || css.cssInJsFramework !== "none"
      ? null
      : {
          name: uiCSSFileName,
          content: cssTemplate({ sliceName }),
        },
    testing.enabled
      ? {
          name: testingName,
          content: testTemplate,
        }
      : null,
    documentation.enabled && documentation.documentTypes.includes("storybook")
      ? {
          name: storybookName,
          content: storyBookTemplate({
            sliceName,
            scriptingLanguage,
            namingConvention,
          }),
        }
      : null,
    {
      name: rfcName,
      content: rfcTemplate({
        sliceName,
        namingConvention,
        configOptions,
      }).trim(),
    },
  ];

  return folder;
};
