import { formatTextByConvention } from "~/shared/lib/utils/case-text";
import { FolderProps } from "../../../folder-structure/segment-folders/folders";
import { reactImportContent } from "./rfc-imports-content";
import { cssInJSContent } from "./rfc.template";

export const useRfcContent = ({
  sliceName,
  namingConvention,
  configOptions,
}: FolderProps) => {
  const { styles } = configOptions;
  const { cssFramework, cssInJsFramework } = styles;
  const fileName = formatTextByConvention(sliceName, namingConvention.file);
  const componentName = formatTextByConvention(
    sliceName,
    namingConvention.component,
  );

  const importContent = reactImportContent({
    fileName: fileName,
    options: configOptions,
  }).trim();

  const cssInJsContent = cssInJSContent({
    cssInJs: cssInJsFramework,
    componentName: componentName,
  }).trim();

  const cssModulesClass = `${
    cssFramework === "css-modules" ? `className={styles['${fileName}']}` : ""
  }`;
  const defaultHtmlTag =
    cssInJsFramework === "styled-components" || cssInJsFramework === "emotion"
      ? `${componentName}Div`
      : "div";

  return {
    cssModulesClass,
    cssInJsContent,
    importContent,
    defaultHtmlTag,
    fileName,
    componentName,
  };
};
