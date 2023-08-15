import type { StylesSettings } from "~/entities/config/lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

import { CONFIG_PROMPT_MESSAGES } from "~/shared/lib/prompt-messages";

export async function promptCssFramework() {
  return select<StylesSettings["cssFramework"]>({
    message: CONFIG_PROMPT_MESSAGES.globalSettings.styles.cssFramework,
    choices: [
      {
        name: "standard",
        value: "standard",
      },
      {
        name: "css-modules",
        value: "css-modules",
      },
      {
        name: "css-in-js",
        value: "css-in-js",
      },
      {
        name: "none",
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
        name: "none",
        value: "css",
      },
      {
        name: "scss",
        value: "scss",
      },
      {
        name: "sass",
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
        name: "none",
        value: "none",
      },
      {
        name: "styled",
        value: "styled-components",
      },
      {
        name: "emotion",
        value: "emotion",
      },
    ],
  });
}
