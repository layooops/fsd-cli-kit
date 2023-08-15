import type { FsdConfig } from "~/entities/config/lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptStateManagement = async () =>
  select<FsdConfig["globalSettings"]["stateManagement"]["type"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.stateManagement,
    choices: [
      {
        name: "none",
        value: "none",
      },
      {
        name: "redux",
        value: "redux",
      },
      {
        name: "effector",
        value: "effector",
      },
      {
        name: "zustand",
        value: "zustand",
      },
    ],
  });
