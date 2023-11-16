import type { InitCommandOptions } from "../lib/types/init-config-options.interface";

import fs from "fs";

import {
  defaultFsdConfig,
  promptAutoGeneration,
  promptConfigExist,
  promptCssFramework,
  promptCssInJsFramework,
  promptCssPreprocessor,
  promptDocumentation,
  promptDocumentationTypes,
  promptJSFramework,
  promptNamingConvention,
  promptScriptingLanguage,
  promptStateManagement,
  promptTesting,
  promptTestingPostfix,
} from "~/entities/config";
import { FSD_CONFIG_NAME } from "~/shared/lib/constants";
import { logger } from "~/shared/lib/utils";
import { formatJsonData } from "~/shared/lib/utils/format-json";
import { readFSDConfigFile } from "~/shared/lib/utils/read-config-file";

import { logNextStepsAfterInit } from "../lib/next-steps-after-init";

export const initConfigCommand = async (
  options?: InitCommandOptions,
): Promise<void> => {
  const configCliResults = { ...defaultFsdConfig };
  const targetDir = process.cwd();
  const config = await readFSDConfigFile({ directory: targetDir, init: true });
  let overwrite = true;
  if (config) {
    overwrite = await promptConfigExist();
  }
  if (!overwrite) {
    logger("Existing configuration will be preserved.", "success");
    return;
  }
  if (!options?.yes) {
    const { styles } = configCliResults.globalSettings;

    configCliResults.autogenerate = await promptAutoGeneration();
    configCliResults.namingConvention.file =
      await promptNamingConvention("files");
    configCliResults.namingConvention.folder =
      await promptNamingConvention("folder");

    if (configCliResults.autogenerate) {
      styles.cssFramework = await promptCssFramework();

      if (styles.cssFramework === "css-in-js") {
        styles.cssInJsFramework = await promptCssInJsFramework();
      }

      if (
        styles.cssFramework !== "css-in-js" &&
        styles.cssFramework !== "none"
      ) {
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
  }

  const formattedConfigData = formatJsonData(configCliResults);

  try {
    fs.writeFileSync(FSD_CONFIG_NAME, formattedConfigData);
    if (formattedConfigData) {
      logNextStepsAfterInit(formattedConfigData);
    }
  } catch (error) {
    console.error(
      "An error occurred while writing the configuration file:",
      error,
    );
  }
};
