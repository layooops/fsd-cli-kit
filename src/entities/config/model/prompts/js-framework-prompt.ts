import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import { select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptJSFramework = async () =>
  select<FsdConfig["globalSettings"]["framework"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.FRAMEWORK,
    choices: [
      {
        name: "react",
        value: "react",
      },
      {
        name: "vue",
        value: "vue",
      },
      {
        name: "none",
        value: "none",
      },
      {
        name: "other",
        value: "other",
      },
    ],
  });
