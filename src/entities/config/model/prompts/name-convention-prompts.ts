import type { NamingConventionTypes } from "../../lib/types/fsd-config.interface";

import { select } from "@inquirer/prompts";

export async function promptNamingConvention(type: "files" | "folder") {
  return select<NamingConventionTypes>({
    message: `What naming convention do you prefer for ${type}?`,
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
