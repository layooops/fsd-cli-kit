import chalk from "chalk";

import {
  FSD_CLI_GITHUB_LINK,
  FSD_DOCUMENTATION_LINK,
} from "~/shared/lib/constants";

export const logNextStepsAfterInit = (data: string) => {
  console.log("");
  console.log(`${chalk.bold("FSD CLI Initialization Complete!")}\n`);
  console.log(`${data}`);
  console.log("");
  console.log(
    `${chalk.bold("-----------------------------------------------")}`,
  );
  console.log("");
  console.log("Follow these steps to start using the FSD CLI:");
  console.log(`\n${chalk.bold("1. Generate FSD Structure:")}`);
  console.log("   Run: fsdx g");
  console.log("   Example: fsdx -g");

  console.log(`\n${chalk.bold("2. Customize Your Structure:")}`);
  console.log("   Edit the fsd.config.json file to fine-tune settings.");

  console.log(`\n${chalk.bold("3. Get Help:")}`);
  console.log("   For more information, refer to the README.md or visit:");
  console.log(
    `   - FSD Methodology Guide: ${chalk.bold(FSD_DOCUMENTATION_LINK)}`,
  );
  console.log(
    `   - FSD CLI GitHub Repository: ${chalk.bold(FSD_CLI_GITHUB_LINK)}`,
  );

  console.log("\nHappy coding with FSD CLI!");
};
