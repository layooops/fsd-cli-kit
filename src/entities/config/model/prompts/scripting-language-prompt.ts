import type { FsdConfig } from "~/entities/config/lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptScriptingLanguage = async () =>
  select<FsdConfig["globalSettings"]["scriptingLanguage"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.scriptingLanguage,
    choices: [
      {
        name: "typescript (default)",
        value: "typescript",
      },
      {
        value: "javascript",
      },
    ],
  });
