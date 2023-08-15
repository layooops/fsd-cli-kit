import { input } from "@inquirer/prompts";

import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptSliceName = async (): Promise<string> => {
  const slice = await input({
    message: FSD_PROMPT_MESSAGES.slice,
    default: "slice",
  });

  return slice;
};
