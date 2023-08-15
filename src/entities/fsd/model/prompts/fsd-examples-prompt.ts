import { confirm } from "@inquirer/prompts";

import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const useExamplesForFSDPrompt = async (): Promise<boolean> => {
  const example = await confirm({
    message: FSD_PROMPT_MESSAGES.addExamples,
    default: false,
  });

  return example;
};
