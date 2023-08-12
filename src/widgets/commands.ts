import { generateFsdStructureCommand } from "../features/generate-fsd-structure-command/generate-fsd-structure-command";
import { initConfigCommand } from "../features/init-config-command/model/init-config-command";
import { fsdCliOptions, fsdCliProgram } from "../shared/api/fsd-cli-program";

export const useFsdCliCommands = async (): Promise<void> => {
  if (JSON.stringify(fsdCliOptions) === "{}") {
    fsdCliProgram.help();
  }
  if (fsdCliOptions.generate) {
    await generateFsdStructureCommand();
  }
  if (fsdCliOptions.init) {
    await initConfigCommand();
  }
};
