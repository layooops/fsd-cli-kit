export type Other = "other" | "none";

export type ScriptingLanguageType = "javascript" | "typescript";

export type CssFrameworkType = "standard" | "css-modules" | "css-in-js" | Other;
export type CssInJsFrameworkType = "emotion" | "styled-components" | Other;
export type CssPreprocessorType = "scss" | "sass" | "css" | Other;

export interface StylesSettings {
  cssFramework: CssFrameworkType | string;
  cssInJsFramework: CssInJsFrameworkType;
  cssPreprocessor: CssPreprocessorType;
}
export type FrameworkType = "react" | "vue" | Other;
export type StateManagementType = "redux" | "effector" | "zustand" | Other;
export type DocumentationType = "markdown" | "storybook" | Other;

interface TestingConfig {
  enabled: boolean;
  testFilePostfix: string;
}

interface StateManagementConfig {
  type: StateManagementType;
  templateFile?: string;
}

interface DocumentationConfig {
  enabled: boolean;
  documentTypes: DocumentationType[];
}

export interface GlobalSettings {
  scriptingLanguage: ScriptingLanguageType;
  styles: StylesSettings;
  testing: TestingConfig;
  framework: FrameworkType;
  stateManagement: StateManagementConfig;
  documentation: DocumentationConfig;
}

export interface CustomFile {
  segment: "ui" | "api" | "model" | "lib" | "public-api";
  files: string[];
}

export interface FsdConfig {
  autogenerate: boolean;
  globalSettings: GlobalSettings;
  customFiles?: CustomFile[];
}
