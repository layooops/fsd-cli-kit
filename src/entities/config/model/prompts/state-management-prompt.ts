import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import { select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptStateManagement = async () =>
  select<FsdConfig["globalSettings"]["stateManagement"]["type"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.STATE_MANAGEMENT,
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
      {
        name: "other",
        value: "other",
      },
    ],
  });
