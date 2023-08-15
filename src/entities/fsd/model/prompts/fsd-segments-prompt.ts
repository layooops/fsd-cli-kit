import type { FsdSegment } from "../../lib/types/fsd.interface";

import { checkbox, confirm, select } from "@inquirer/prompts";

import { FSD_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptFSDSegmentList = async (): Promise<FsdSegment[]> => {
  const answers = await checkbox<FsdSegment>({
    message: FSD_PROMPT_MESSAGES.segments.list,
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
    message: FSD_PROMPT_MESSAGES.segments.single,
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
    message: FSD_PROMPT_MESSAGES.segments.full,
    default: false,
  });

  return answer;
};
