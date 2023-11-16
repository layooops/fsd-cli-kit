import type { FSDLayers } from "~/entities/fsd";

import { select } from "@inquirer/prompts";

import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptChooseFSDLayer = async (): Promise<FSDLayers> => {
  const fsdLayer = await select<FSDLayers>({
    message: FSD_PROMPT_MESSAGES.chooseLayer,
    choices: [
      {
        value: "layer",
      },
      {
        value: "slice",
      },
      {
        value: "segments",
      },
      {
        value: "single-segment",
      },
    ],
  });
  return fsdLayer;
};
