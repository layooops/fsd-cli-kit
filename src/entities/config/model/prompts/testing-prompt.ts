import type { FsdConfig } from "~/entities/config/lib/types/fsd-config.interface";

import { confirm, select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptTestingPostfix = async () =>
  select<FsdConfig["globalSettings"]["testing"]["testFilePostfix"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.testing.testFilePostfix,
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
        name: "none",
        value: "none",
      },
    ],
  });

export const promptTesting = async () =>
  confirm({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.testing.enabled,
    default: true,
  });
