import type { StylesSettings } from "../../lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export async function promptCssFramework() {
  return select<StylesSettings["cssFramework"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.styles.cssFramework,
    choices: [
      {
        name: "standard (default)",
        value: "standard",
      },
      {
        value: "css-modules",
      },
      {
        value: "css-in-js",
      },
      {
        value: "none",
      },
    ],
  });
}
export async function promptCssPreprocessor() {
  return select<StylesSettings["cssPreprocessor"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.styles.cssPreprocessor,
    choices: [
      {
        name: "none (default)",
        value: "css",
      },
      {
        value: "scss",
      },
      {
        value: "sass",
      },
    ],
  });
}
export async function promptCssInJsFramework() {
  return select<StylesSettings["cssInJsFramework"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.styles.cssInJsFramework,
    choices: [
      {
        name: "none (default)",
        value: "none",
      },
      {
        value: "styled-components",
      },
      {
        value: "emotion",
      },
    ],
  });
}
