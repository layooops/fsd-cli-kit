import type { FsdConfig } from "../../lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptJSFramework = async () =>
  select<FsdConfig["globalSettings"]["framework"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.framework,
    choices: [
      {
        name: "react (default)",
        value: "react",
      },
      {
        value: "vue",
      },
      {
        value: "none",
      },
    ],
  });
