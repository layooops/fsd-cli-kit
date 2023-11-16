import type { FsdConfig } from "../lib/types/fsd-config.interface";

import { FSD_JSON_SCHEMA_LINK } from "~/shared/lib/constants";

export const defaultFsdConfig: FsdConfig = {
  $schema: FSD_JSON_SCHEMA_LINK,
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
