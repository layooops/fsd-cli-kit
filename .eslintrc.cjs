const { configure, presets } = require("eslint-kit");

module.exports = configure({
  mode: "only-errors",
  presets: [
    presets.imports(),
    presets.typescript(),
    presets.prettier(),
    presets.node(),
  ],
  extend: {
    rules: {
      "no-console": "off",
      "@typescript-eslint/naming-convention": "warn",
      "no-magic-numbers": "warn",
      "no-useless-catch": "error",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [["^.*\\u0000$"], ["^\\u0000"], ["^node:"], ["^@?\\w"], ["^"], ["^\\."]],
        }
      ]
    },
    extends: ["plugin:regexp/recommended"],
    plugins: ["regexp"],
  },
});
