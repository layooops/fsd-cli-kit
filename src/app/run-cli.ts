import type { GenerateFsdPromptsOptions } from "~/features/generate-fsd-prompts";
import type { InitCommandOptions } from "~/widgets/init-config-command";

import { fsdCliProgram } from "~/shared/api/fsd-cli-program";
import { FSD_CLI_APP } from "~/shared/lib/constants";
import { getVersion } from "~/shared/lib/utils";
import { generateFsdStructureCommand } from "~/widgets/generate-fsd-structure-command";
import { initConfigCommand } from "~/widgets/init-config-command";

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

  fsdCliProgram
    .command("examples")
    .alias("e")
    .description("Generate the full FSD structure with example content");

  await fsdCliProgram.parseAsync(process.argv);

  if (process.argv.slice(2).length === 0) {
    fsdCliProgram.outputHelp();
  }
};
