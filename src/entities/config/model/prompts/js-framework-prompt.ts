import type { FsdConfig } from "~/entities/config/lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptJSFramework = async () =>
  select<FsdConfig["globalSettings"]["framework"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.framework,
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
    ],
  });
