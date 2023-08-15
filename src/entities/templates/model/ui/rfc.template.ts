import { formatTextByConvention } from "../../../../shared/lib/utils/case-text";
import { generateUiCSSFileName } from "~/entities/fsd/model/folder-structure/segment-folders/folders";
import { GlobalSettings } from "~/entities/config/lib/types/fsd-config.interface";
import { FolderProps } from "~/entities/fsd/model/folder-structure/segment-folders/folders/folder-with-template.interface";

export const cssInJSContent = ({
  cssInJs,
  componentName,
}: {
  cssInJs?: GlobalSettings["styles"]["cssInJsFramework"];
  componentName: string;
}): string => {
  if (cssInJs === "styled-components" || cssInJs === "emotion") {
    return `\n\nconst ${componentName}Div = styled.div\`\``;
  }

  return "";
};

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

const useRfcContent = ({
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
    cssFramework === "css-modules" ? `className={styles.${fileName}}` : ""
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

export const rfcTemplate = (props: FolderProps) => {
  const { scriptingLanguage } = props.configOptions;

  const {
    importContent,
    cssInJsContent,
    componentName,
    defaultHtmlTag,
    cssModulesClass,
  } = useRfcContent(props);

  if (scriptingLanguage === "typescript")
    return `${importContent}${cssInJsContent}

interface ${componentName}Props { }

export const ${componentName} = (props: ${componentName}Props) => {
  return (
    <${defaultHtmlTag} ${cssModulesClass}>

    </${defaultHtmlTag}>
  )
}
`;
  return `${importContent}${cssInJsContent}

export const ${componentName} = (props: ${componentName}Props) => {
  return (
    <${defaultHtmlTag} ${cssModulesClass}>

    </${defaultHtmlTag}>
  )
}`;
};
