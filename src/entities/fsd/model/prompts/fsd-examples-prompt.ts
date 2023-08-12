import { confirm } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const useExamplesForFSDPrompt = async (): Promise<boolean> => {
  const example = await confirm({
    message: PROMPT_MESSAGES.FSD.ADD_EXAMPLES,
    default: false,
  });

  return example;
};
