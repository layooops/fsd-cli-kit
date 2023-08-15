import { Command } from "commander";

import { generateFsdStructureCommand } from "~/features/generate-fsd-structure-command/generate-fsd-structure-command";
import { initConfigCommand } from "~/features/init-config-command/model/init-config-command";

import { FSD_CLI_APP } from "../lib/constants";
import { getVersion } from "../lib/utils";

export const fsdCliProgram = new Command();

export interface InitCommandOptions {
  yes?: boolean;
}

export const runCli = async () => {
  fsdCliProgram
    .name(FSD_CLI_APP)
    .description(
      `A command-line tool for effortlessly generating folder structures using the Feature Sliced Design FSD methodology.`,
    )
    .version(getVersion(), "-v, --version", "Display the version number");

  fsdCliProgram
    .command("init")
    .alias("i")
    .option("-y, --yes", "Skip prompts and proceed with default options")
    .description("Initialize the initial FSD configuration")
    .action(async (options?: InitCommandOptions) => {
      await initConfigCommand(options);
    });

  fsdCliProgram
    .command("generate")
    .alias("g")
    .description("Generate the FSD Structure")
    .option(
      "-t, --template",
      "Auto generate files with templates for FSD Structure.",
    )
    .action(async () => {
      await generateFsdStructureCommand();
    });

  fsdCliProgram.command;

  fsdCliProgram
    .command("examples")
    .alias("e")
    .description("Generate the full FSD structure with example content");

  await fsdCliProgram.parseAsync(process.argv);

  if (process.argv.slice(2).length === 0) {
    fsdCliProgram.outputHelp();
  }
};
