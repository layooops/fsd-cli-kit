import type { FsdConfig } from "../../lib/types/fsd-config.interface";

import { confirm, select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptTestingPostfix = async () =>
  select<FsdConfig["globalSettings"]["testing"]["testFilePostfix"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.testing.testFilePostfix,
    choices: [
      {
        name: "test (default)",
        value: "test",
      },
      {
        value: "spec",
      },
      {
        value: "none",
      },
    ],
  });

export const promptTesting = async () =>
  confirm({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.testing.enabled,
    default: true,
  });
