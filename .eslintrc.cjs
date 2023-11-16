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
    extends: [
      "plugin:regexp/recommended",
      "plugin:@conarti/feature-sliced/recommended",
    ],
    plugins: ["regexp", "check-file"],
    rules: {
      "no-console": "off",
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/*.{js,ts,jsx,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "no-magic-numbers": "warn",
      "no-useless-catch": "error",
      "@typescript-eslint/naming-convention": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": 2,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "import/order": 'off',
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^.*\\u0000$"],
            ["^react", "^@?\\w"],
            ["^next", "^@?\\w"],
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
          ],
        },
      ],
    },
    env: {
      jest: true,
    },
  },
});
