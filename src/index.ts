#!/usr/bin/env node

import { logger } from "./shared/lib/utils";
import { useFsdCliCommands } from "./widgets/commands";

const main = async () => {
  await useFsdCliCommands();

  process.exit(0);
};

main().catch((error) => {
  logger("Aborting installation...", "error");
  if (error instanceof Error) {
    logger(error.message, "error");
  } else {
    logger(
      "An unknown error has occurred.Please open an issue on GitHub with the below:",
      "error",
    );
    console.log(error);
  }
  process.exit(1);
});
