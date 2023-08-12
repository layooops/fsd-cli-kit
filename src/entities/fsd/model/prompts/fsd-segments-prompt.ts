import type { FsdSegment } from "../../lib/types/fsd.interface";

import { checkbox, confirm, select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptFSDSegmentList = async (): Promise<FsdSegment[]> => {
  const answers = await checkbox<FsdSegment>({
    message: PROMPT_MESSAGES.FSD.SEGMENTS.LIST,
    choices: [
      { name: "ui", value: "ui" },
      { name: "model", value: "model" },
      { name: "api", value: "api" },
      { name: "lib", value: "lib" },
      { name: "public api", value: "public-api" },
    ],
  });
  return answers;
};

export const promptFSDSingleSegment = async (): Promise<FsdSegment> => {
  const answer = await select<FsdSegment>({
    message: PROMPT_MESSAGES.FSD.SEGMENTS.SINGLE,
    choices: [
      { name: "ui", value: "ui" },
      { name: "model", value: "model" },
      { name: "api", value: "api" },
      { name: "lib", value: "lib" },
    ],
  });
  return answer;
};

export const promptFSDSegmentsFull = async (): Promise<boolean> => {
  const answer = await confirm({
    message: PROMPT_MESSAGES.FSD.SEGMENTS.FULL,
    default: false,
  });

  return answer;
};
