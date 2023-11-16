import { input } from "@inquirer/prompts";
import fs from "fs";
import path from "path";

import { CLI_ROOT } from "~/shared/lib/constants";
import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";
import { logger } from "~/shared/lib/utils";
import { formatJsonData } from "~/shared/lib/utils/format-json";

const cacheFilePath = path.join(CLI_ROOT, "cache.json");

const readCache = async () => {
  try {
    const cacheData = await fs.promises.readFile(cacheFilePath, "utf-8");
    return JSON.parse(cacheData);
  } catch (error) {
    return null; // Если возникла ошибка, просто вернем null
  }
};

const writeCache = async (data: Record<string, string>) => {
  try {
    await fs.promises.writeFile(cacheFilePath, formatJsonData(data), "utf-8");
  } catch (error) {
    logger(`Error writing cache: ${(error as Error).message}`, "error");
    // Обработка ошибки записи, если необходимо
  }
};

export const promptSliceName = async () => {
  let cachedSliceName = null;

  const cacheData = await readCache();
  if (cacheData && typeof cacheData.sliceName === "string") {
    cachedSliceName = cacheData.sliceName;
  }

  const sliceName = await input({
    message: FSD_PROMPT_MESSAGES.sliceName,
    default: cachedSliceName || "slice",
  });

  await writeCache({ sliceName });

  return sliceName;
};
