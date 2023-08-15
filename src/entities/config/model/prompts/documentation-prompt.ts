import type { DocumentationType } from "~/entities/config/lib/types/fsd-config.interface";

import { checkbox, confirm } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export const promptDocumentationTypes = async () =>
  checkbox<DocumentationType>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.documentation.documentTypes,
    choices: [
      { name: "markdown", value: "markdown" },
      { name: "storybook", value: "storybook" },
      { name: "none", value: "none" },
    ],
  });

export const promptDocumentation = async () =>
  confirm({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.documentation.enabled,
    default: false,
  });
