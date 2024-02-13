import { generateFsdStructureCommand } from "~/widgets/generate-fsd-structure-command";
import { initConfigCommand } from "~/widgets/init-config-command";

import { promptStart } from "./prompts/start-prompts";

export const startCliAction = async (): Promise<void> => {
  const startOptions = await promptStart();
  try {
    switch (startOptions) {
      case "generate":
        return generateFsdStructureCommand();
      case "initConfig":
        return initConfigCommand();
      default:
        break;
    }
  } catch (error) {
    console.error("An error occurred while starting cli", error);
  }
};
