import type { FsdConfig } from "~/entities/config";

import fse from "fs-extra";
import path from "path";

import { FSD_CONFIG_NAME } from "../constants";
import { logger } from "./logger";
import { validateConfig } from "./validate-config";

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

export async function readFSDConfigFile({
  directory,
  validate = true,
  init = false,
}: {
  directory: string;
  validate?: boolean;
  init?: boolean;
}): Promise<FsdConfig | void> {
  try {
    const configFile = findConfigFileInDirectory(directory);

    if (!configFile) {
      throw new Error(
        "Config file not found. You need to create a config file first.",
      );
    }

    const configFileContent = await fse.readFile(configFile, "utf8");
    const config = JSON.parse(configFileContent) as FsdConfig;

    if (validate && !validateConfig()) {
      throw new Error("Invalid configuration.");
    }

    return config;
  } catch (error) {
    if (!init) {
      logger(error as Error, "error");
    }
  }
}
