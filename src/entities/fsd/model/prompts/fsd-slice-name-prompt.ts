import { input } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptSliceName = async (): Promise<string> => {
  const slice = await input({
    message: PROMPT_MESSAGES.FSD.SLICE,
    default: "slice",
  });

  return slice;
};
