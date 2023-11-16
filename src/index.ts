#!/usr/bin/env node

import { runCli } from "./app/run-cli";
import { logger } from "./shared/lib/utils";

const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;

const main = async () => {
  try {
    await runCli();

    process.exit(EXIT_SUCCESS);
  } catch (error) {
    logger("Installation aborted due to an error:", "error");

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error has occurred.";
    logger(errorMessage, "error");

    process.exit(EXIT_FAILURE);
  }
};

main();
