import { select } from "@inquirer/prompts";

export type StartCommands = "generate" | "initConfig" | "help";

export async function promptStart() {
  return select<StartCommands>({
    message: "Initialize Config, Generate Structure, or Get Help",
    choices: [
      {
        name: "Generate",
        value: "generate",
      },
      {
        name: "Init Config",
        value: "initConfig",
      },
      {
        name: "Help",
        value: "help",
      },
    ],
  });
}
