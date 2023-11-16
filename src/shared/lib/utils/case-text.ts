import type { NamingConventionTypes } from "~/entities/config";

import changeCase from "change-case";

export const camelCasedText = (text: string) => changeCase.camelCase(text);
export const pascalCasedText = (text: string) => changeCase.pascalCase(text);
export const snakeCasedText = (text: string) => changeCase.snakeCase(text);
export const kebabCasedText = (text: string) => changeCase.kebabCase(text);

export const formatTextByConvention = (
  text = "",
  naming: NamingConventionTypes,
): string => {
  switch (naming) {
    case "camelCase":
      return camelCasedText(text);
    case "pascalCase":
      return pascalCasedText(text);
    case "snakeCase":
      return snakeCasedText(text);
    case "kebabCase":
      return kebabCasedText(text);
    default:
      return "";
  }
};
