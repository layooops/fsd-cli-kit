import type { FSDLayers } from "../../lib/types/fsd.interface";

import { select } from "@inquirer/prompts";

import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptChooseFSDLayer = async (): Promise<FSDLayers> => {
  const fsdLayer = await select<FSDLayers>({
    message: FSD_PROMPT_MESSAGES.chooseLayer,
    choices: [
      {
        name: "layer",
        value: "layer",
      },
      {
        name: "slice",
        value: "slice",
      },
      {
        name: "segments",
        value: "segments",
      },
      {
        name: "single-segment",
        value: "single-segment",
      },
    ],
  });
  return fsdLayer;
};
