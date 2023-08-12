import { Command } from "commander";

import { getVersion } from "../lib/utils";

export const fsdCliProgram = new Command().name("init-fsd");

fsdCliProgram
  .description(
    `A command-line tool for effortlessly generating folder structures using the Feature Sliced Design FSD methodology.`,
  )
  .option("-i, --init", "Initialize the initial FSD configuration")
  .option("-g, --generate", "Generate the FSD Structure")
  .option(
    "-t, --template",
    "Auto generate files with templates for FSD Structure.",
  )
  .option("-e, --examples", "Generate the FSD structure with example content")
  .version(getVersion(), "-v, --version", "Display the version number")
  .parse(process.argv);

export const fsdCliOptions = fsdCliProgram.opts<{
  init: boolean;
  generate: boolean;
  template: boolean;
  examples: boolean;
}>();
