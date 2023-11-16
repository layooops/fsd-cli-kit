export type ScriptingLanguageType = "javascript" | "typescript";

export type CssFrameworkType =
  | "standard"
  | "css-modules"
  | "css-in-js"
  | "none";
export type CssInJsFrameworkType = "emotion" | "styled-components" | "none";
export type CssPreprocessorType = "scss" | "sass" | "css" | "none";

export interface StylesSettings {
  cssFramework: CssFrameworkType;
  cssInJsFramework: CssInJsFrameworkType;
  cssPreprocessor: CssPreprocessorType;
}
export type FrameworkType = "react" | "vue" | "none";
export type StateManagementType = "redux" | "effector" | "zustand" | "none";
export type DocumentationType = "markdown" | "storybook" | "none";

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

export type NamingConventionTypes =
  | "pascalCase"
  | "camelCase"
  | "snakeCase"
  | "kebabCase";

export interface NamingConvention {
  file: NamingConventionTypes;
  folder: NamingConventionTypes;
  component: NamingConventionTypes;
}

export interface FsdConfig {
  $schema?: string;
  autogenerate: boolean;
  namingConvention: NamingConvention;
  globalSettings: GlobalSettings;
  customFiles?: CustomFile[];
}
