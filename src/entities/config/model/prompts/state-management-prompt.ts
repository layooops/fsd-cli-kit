import type { FsdConfig } from "../../lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptStateManagement = async () =>
  select<FsdConfig["globalSettings"]["stateManagement"]["type"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.stateManagement,
    choices: [
      {
        name: "none (default)",
        value: "none",
      },
      {
        value: "redux",
      },
      {
        value: "effector",
      },
      {
        value: "zustand",
      },
    ],
  });
