import type {
  FsdConfig,
  StylesSettings,
} from "~/entities/config/lib/types/config.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

import { scriptingLanguageFileExtension } from "~/entities/fsd/lib/helpers/file-name-helpers";

interface UiFolder {
  configOptions: FsdConfig["globalSettings"];
  sliceName?: string;
}

export function generateUiCSSFileName(
  css: StylesSettings,
  sliceName = "slice",
): string | undefined {
  if (css.cssFramework === "none") {
    return undefined;
  }
  if (css.cssFramework === "css-modules") {
    return `${sliceName}.module.${css.cssPreprocessor}`;
  }
  if (css.cssFramework === "standard") {
    return `${sliceName}.module.${css.cssPreprocessor}`;
  }
  return undefined;
}

export const cssInJSContent = (
  cssInJs?: StylesSettings["cssInJsFramework"],
): string | undefined => {
  if (cssInJs === "styled-components" || cssInJs === "emotion") {
    return `import styled from "${
      cssInJs === "emotion" ? "@emotion/styled" : "styled-components"
    }";\n\nconst /* COMPONENT_TEMPLATE */Styled = styled\`  \n\``;
  }
  return undefined;
};

export const uiFolderWithTemplates = ({
  configOptions,
  sliceName = "slice",
}: UiFolder): Folder => {
  const { styles: css, scriptingLanguage } = configOptions;
  const uiCSSFileName = generateUiCSSFileName(css, sliceName);

  const folder = [
    css.cssFramework === "none" || css.cssInJsFramework !== "none"
      ? null
      : {
          name: uiCSSFileName,

          template: "styles_template.css",
        },
    {
      name: `${sliceName}.${scriptingLanguageFileExtension(
        scriptingLanguage,
      )}x`,
      content: cssInJSContent(css.cssInJsFramework),
      template: `rc_template.${scriptingLanguageFileExtension(
        scriptingLanguage,
      )}x`,
    },
  ];

  return folder;
};
