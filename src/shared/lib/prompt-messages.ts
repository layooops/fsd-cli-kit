// type ToScreamingSnakeCase<S extends string> = S extends `${infer Prefix}${infer Rest}`
//   ? Prefix extends Uppercase<Prefix>
//   ? `_${Uppercase<Prefix>}${ToScreamingSnakeCase<Rest>}`
//   : `${Uppercase<Prefix>}${ToScreamingSnakeCase<Rest>}`
//   : '';

export const PROMPT_MESSAGES = {
  CONFIG: {
    CONFIRM_AUTOGENERATE:
      "Would you like to auto-generate templates for some segments? (yes/no)",
    GLOBAL_SETTINGS: {
      STYLES: {
        CSS_FRAMEWORK:
          "How do you work with CSS? When creating the UI segment, a separate file for working with CSS will be either created or not.",
        CSS_PREPROCESSOR:
          "Do you use a CSS Preprocessor? If yes, please specify the preprocessor you use. If not, you can skip this question.",
        CSS_IN_JS_FRAMEWORK:
          "Which CSS-in-JS solution do you prefer? You can choose from the following options: none (default), styled-components, emotion, other.",
        OTHER_CSS_NAME:
          "If you chose 'other' for CSS framework, please specify the name of the framework:",
      },
      STATE_MANAGEMENT: "Which state management solution are you using?",
      SCRIPTING_LANGUAGE: "Do you work with TypeScript or JavaScript?",
      TESTING: {
        POSTFIX: "Do you want to add a postfix to your test files?",
        ENABLED: "Are you using tests in your project? (yes/no)",
      },
      FRAMEWORK: "Are you using any specific framework?",
      DOCUMENTATION: {
        DOCUMENT_TYPES:
          "Choose documentation formats ('markdown', 'storybook', 'other', 'none'). For 'markdown', a file will be created at the root. For 'storybook', a file will be added to the 'ui' folder. If 'none', no documentation files will be created.",
        ENABLED: "Are you using documentation in your project? (yes/no)",
      },
    },
  },
  FSD: {
    CHOOSE_LAYER: "Choose a FSD layer",
    ADD_EXAMPLES: "Do you want to add examples for FSD?",
    SEGMENTS: {
      LIST: "Choose segments",
      SINGLE: "Choose a segment",
      FULL: "Choose segments to include for the full structure (default: ui, model, api, lib, and public API)",
    },
    SLICE: "Enter the name of the Slice:",
  },
};
