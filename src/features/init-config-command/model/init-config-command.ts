import { confirm, input } from "@inquirer/prompts";
import fs from "fs";

import { defaultFsdConfig } from "~/entities/config/model/default-fsd-config";
import {
  promptCssFramework,
  promptCssInJsFramework,
  promptCssPreprocessor,
  promptDocumentation,
  promptDocumentationTypes,
  promptJSFramework,
  promptScriptingLanguage,
  promptStateManagement,
  promptTesting,
  promptTestingPostfix,
} from "~/entities/config/model/prompts";
import { FSD_CONFIG_NAME } from "~/shared/lib/constants";

import { logNextStepsAfterConfigInit } from "./next-steps-after-config-init";

export const otherPrompt = async (message: string): Promise<string> => {
  const slice = await input({
    message,
  });

  return slice;
};

async function promptAutogeneration(): Promise<boolean> {
  return confirm({
    message:
      "Would you like to auto-generate templates for some segments? (yes/no)",
    default: false,
  });
}

export const initConfigCommand = async (): Promise<void> => {
  const configCliResults = { ...defaultFsdConfig };
  const { styles } = configCliResults.globalSettings;

  configCliResults.autogenerate = await promptAutogeneration();

  if (configCliResults.autogenerate) {
    styles.cssFramework = await promptCssFramework();

    if (styles.cssFramework === "other") {
      styles.cssFramework = await otherPrompt("Other css name:");
    }

    if (styles.cssFramework === "css-in-js") {
      styles.cssInJsFramework = await promptCssInJsFramework();
    }

    if (styles.cssFramework !== "css-in-js" && styles.cssFramework !== "none") {
      styles.cssPreprocessor = await promptCssPreprocessor();
    }

    configCliResults.globalSettings.scriptingLanguage =
      await promptScriptingLanguage();
    configCliResults.globalSettings.framework = await promptJSFramework();
    configCliResults.globalSettings.testing.enabled = await promptTesting();

    if (configCliResults.globalSettings.testing.enabled) {
      configCliResults.globalSettings.testing.testFilePostfix =
        await promptTestingPostfix();
    }

    configCliResults.globalSettings.documentation.enabled =
      await promptDocumentation();

    if (configCliResults.globalSettings.documentation.enabled) {
      configCliResults.globalSettings.documentation.documentTypes =
        await promptDocumentationTypes();
    }

    if (configCliResults.globalSettings.framework === "react") {
      configCliResults.globalSettings.stateManagement.type =
        await promptStateManagement();
    }
  }

  const data = JSON.stringify(configCliResults, null, 2);
  fs.writeFileSync(FSD_CONFIG_NAME, data);

  if (data) {
    logNextStepsAfterConfigInit(data);
  }
};
