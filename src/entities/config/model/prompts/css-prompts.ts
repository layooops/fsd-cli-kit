import type { StylesSettings } from "~/entities/config/lib/types/config.interface";

import { select } from "@inquirer/prompts";

import { PROMPT_MESSAGES } from "../../../../shared/lib/prompt-messages";

export async function promptCssFramework() {
  return select<StylesSettings["cssFramework"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.STYLES.CSS_FRAMEWORK,
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
        name: "other",
        value: "other",
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
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.STYLES.CSS_PREPROCESSOR,
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
      {
        name: "other",
        value: "other",
      },
    ],
  });
}
export async function promptCssInJsFramework() {
  return select<StylesSettings["cssInJsFramework"]>({
    message: PROMPT_MESSAGES.CONFIG.GLOBAL_SETTINGS.STYLES.CSS_IN_JS_FRAMEWORK,
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
      {
        name: "other",
        value: "other",
      },
    ],
  });
}
