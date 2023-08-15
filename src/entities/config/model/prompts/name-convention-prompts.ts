import type { NamingConvention } from "~/entities/config/lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export async function promptNamingConventionFile() {
  return select<NamingConvention["file"]>({
    message: CONFIG_PROMPT_MESSAGES.namingConvention.file,
    choices: [
      {
        name: "kebab-case (default)",
        value: "kebabCase",
      },
      {
        name: "camelCase",
        value: "camelCase",
      },
      {
        name: "PascalCase",
        value: "pascalCase",
      },
    ],
  });
}
export async function promptNamingConventionComponent() {
  return select<NamingConvention["component"]>({
    message: CONFIG_PROMPT_MESSAGES.namingConvention.file,
    choices: [
      {
        value: "camelCase",
      },
      {
        value: "pascalCase",
      },
    ],
  });
}
