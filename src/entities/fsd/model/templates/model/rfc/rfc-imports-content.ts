import { GlobalSettings } from "~/entities/config";
import { generateUiCSSFileName } from "../../../folder-structure/segment-folders/folders";

export const reactImportContent = ({
  fileName,
  options,
}: {
  fileName: string;
  options: GlobalSettings;
}): string => {
  const { styles } = options;
  const { cssInJsFramework, cssFramework } = styles;
  const cssFileName = generateUiCSSFileName(styles, fileName);
  let importText: string = "";
  if (
    cssInJsFramework === "styled-components" ||
    cssInJsFramework === "emotion"
  ) {
    importText += `import styled from "${
      cssInJsFramework === "emotion" ? "@emotion/styled" : "styled-components"
    }"`;
  }
  if (cssFramework === "css-modules") {
    importText += `import styles from './${cssFileName}'`;
  }
  if (cssFramework === "standard") {
    importText += `import './${cssFileName}'`;
  }

  return importText;
};
