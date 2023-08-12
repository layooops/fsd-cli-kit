import type { FSDLayers } from "../../lib/types/fsd.interface";

import { select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptFSDLayer = async (): Promise<FSDLayers> => {
  const fsdLayer = await select<FSDLayers>({
    message: PROMPT_MESSAGES.FSD.CHOOSE_LAYER,
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
