import { GlobalSettings } from "~/entities/config";

import { FolderProps } from "~/entities/fsd/model/folder-structure/segment-folders/folders";
import { useRfcContent } from "./use-rfc-content";

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
