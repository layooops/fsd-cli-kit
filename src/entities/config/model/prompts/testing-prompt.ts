import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import { confirm, select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptTestingPostfix = async () =>
  select<FsdConfig["globalSettings"]["testing"]["testFilePostfix"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.TESTING.POSTFIX,
    choices: [
      {
        name: "test",
        value: "test",
      },
      {
        name: "spec",
        value: "spec",
      },
      {
        name: "other",
        value: "other",
      },
      {
        name: "none",
        value: "none",
      },
    ],
  });

export const promptTesting = async () =>
  confirm({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.TESTING.ENABLED,
    default: true,
  });
