import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import { select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptScriptingLanguage = async () =>
  select<FsdConfig["globalSettings"]["scriptingLanguage"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.SCRIPTING_LANGUAGE,
    choices: [
      {
        name: "typescript",
        value: "typescript",
      },
      {
        name: "javascript",
        value: "javascript",
      },
    ],
  });
