import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import fse from "fs-extra";
import path from "path";

import { FSD_CONFIG_NAME } from "../constants";
import { logger } from "./logger";
import { validateConfig } from "./validate-config";

const configCache: { [key: string]: FsdConfig | undefined } = {};

function findConfigFileInDirectory(directory: string): string | undefined {
  const configFile = path.join(directory, FSD_CONFIG_NAME);
  if (fse.existsSync(configFile)) {
    return configFile;
  }
  const parentDir = path.dirname(directory);
  if (parentDir !== directory) {
    return findConfigFileInDirectory(parentDir);
  }
  return undefined;
}

export async function readFSDConfigFile(
  directory: string,
  validate = true,
): Promise<FsdConfig | undefined> {
  if (configCache[directory]) {
    return configCache[directory];
  }

  try {
    const configFile = findConfigFileInDirectory(directory);

    if (configFile) {
      const configFileContent = await fse.readFile(configFile, "utf8");
      const config = JSON.parse(configFileContent) as FsdConfig;

      if (validate && !validateConfig()) {
        throw new Error("Invalid configuration.");
      }

      const cachedConfig = configCache[directory];
      if (!cachedConfig) {
        configCache[directory] = config;
      }

      return config;
    }

    logger(
      "Config file not found. You need to create a config file first.",
      "error",
    );
    return undefined;
  } catch (error) {
    logger("Error reading config file:", "error");
    return undefined;
  }
}
