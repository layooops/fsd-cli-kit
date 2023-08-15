import type { FsdConfig } from "../lib/types/fsd-config.interface";

export const defaultFsdConfig: FsdConfig = {
  autogenerate: true,
  namingConvention: {
    file: "kebabCase",
    folder: "kebabCase",
    component: "pascalCase",
  },
  globalSettings: {
    scriptingLanguage: "typescript",
    styles: {
      cssFramework: "standard",
      cssInJsFramework: "none",
      cssPreprocessor: "css",
    },
    framework: "react",
    testing: {
      enabled: false,
      testFilePostfix: "test",
    },
    stateManagement: {
      type: "none",
    },
    documentation: {
      enabled: false,
      documentTypes: [],
    },
  },
};
