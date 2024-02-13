import type { GenerateFsdPromptsOptions } from "~/features/generate-fsd-prompts";
import type { InitCommandOptions } from "~/widgets/init-config-command";

import { fsdxCommand } from "~/shared/api/fsdx-command";
import { PACKAGE_NAME } from "~/shared/lib/constants";
import { getVersion } from "~/shared/lib/utils";
import { generateFsdStructureCommand } from "~/widgets/generate-fsd-structure-command";
import { initConfigCommand } from "~/widgets/init-config-command";

import { startCliAction } from "./start-cli-action";

export const runCli = async () => {
  fsdxCommand
    .name(PACKAGE_NAME)
    .description(
      `A command-line tool for effortlessly generating folder structures using the Feature Sliced Design FSD methodology.`,
    )
    .version(getVersion(), "-v, --version", "Display the version number");

  fsdxCommand.action(startCliAction);

  fsdxCommand
    .command("init")
    .alias("i")
    .option("-y, --yes", "Skip prompts and proceed with default options")
    .description("Initialize the initial FSD configuration")
    .action(async (options?: InitCommandOptions) => {
      await initConfigCommand(options);
    });

  fsdxCommand
    .command("generate")
    .alias("g")
    .description("Generate the Feature Sliced Design (FSD) Structure")
    .argument(
      "[path]",
      "Specify the target path for generating the FSD Structure.",
    )
    .option(
      "-t, --template",
      "Automatically generate files with templates for the FSD Structure.",
    )
    .option("-s, --slice", "slice")
    .option("-sg, --segment", "segment")
    .option("-sgs, --segments", "segments")
    .action(async (path?: string, options?: GenerateFsdPromptsOptions) => {
      await generateFsdStructureCommand(path, options);
    });

  fsdxCommand
    .command("examples")
    .alias("e")
    .description("Generate the full FSD structure with example content");

  await fsdxCommand.parseAsync(process.argv);

  if (process.argv.slice(2).length === 0) {
    fsdxCommand.outputHelp();
  }
};
