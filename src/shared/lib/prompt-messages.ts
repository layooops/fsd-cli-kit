export const CONFIG_PROMPT_MESSAGES = {
  autogenerate:
    "Would you like to auto-generate templates for some segments? (yes/no)",
  globalSettings: {
    styles: {
      cssFramework:
        "How do you work with CSS? When creating the UI segment, a separate file for working with CSS will be either created or not.",
      cssPreprocessor:
        "Do you use a CSS Preprocessor? If yes, please specify the preprocessor you use. If not, you can skip this question.",
      cssInJsFramework:
        "Which CSS-in-JS solution do you prefer? You can choose from the following options: none (default), styled-components, emotion.",
    },
    stateManagement: "Which state management solution are you using?",
    scriptingLanguage: "Do you work with TypeScript or JavaScript?",
    testing: {
      testFilePostfix: "Do you want to add a postfix to your test files?",
      enabled: "Are you using tests in your project? (yes/no)",
    },
    framework: "Are you using any specific framework?",
    documentation: {
      documentTypes:
        "Choose documentation formats ('markdown', 'storybook', 'none'). For 'markdown', a file will be created at the root. For 'storybook', a file will be added to the 'ui' folder. If 'none', no documentation files will be created.",
      enabled: "Are you using documentation in your project? (yes/no)",
    },
  },
  namingConvention: {
    component: "What naming convention do you prefer for components?",
    file: "What naming convention do you prefer for files?",
  },
};

export const FSD_PROMPT_MESSAGES = {
  chooseLayer: "Choose a FSD layer",
  addExamples: "Do you want to add examples for FSD?",
  segments: {
    list: "Choose segments",
    single: "Choose a segment",
    full: "Choose segments to include for the full structure (default: ui, model, api, lib, and public API)",
  },
  slice: "Enter the name of the Slice:",
};
