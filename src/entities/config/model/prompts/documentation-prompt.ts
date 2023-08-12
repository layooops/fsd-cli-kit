import type { DocumentationType } from "~/entities/config/lib/types/config.interface";

import { checkbox, confirm } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptDocumentationTypes = async () =>
  checkbox<DocumentationType>({
    message:
      PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.DOCUMENTATION.DOCUMENT_TYPES,
    choices: [
      { name: "markdown", value: "markdown" },
      { name: "storybook", value: "storybook" },
      { name: "other", value: "other" },
      { name: "none", value: "none" },
    ],
  });

export const promptDocumentation = async () =>
  confirm({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.DOCUMENTATION.ENABLED,
    default: false,
  });
