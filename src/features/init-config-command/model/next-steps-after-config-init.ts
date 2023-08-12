export const logNextStepsAfterConfigInit = (data: string) => {
  console.log("");
  console.log("FSD CLI Initialization Complete!\n");
  console.log(`${data}`);
  console.log("");
  console.log("Follow these steps to start using the FSD CLI:");
  console.log("\n1. Generate FSD Structure:");
  console.log("   Run: fsd-cli --generate");
  console.log("   Example: fsd-cli -g");

  console.log("\n2. Customize Your Structure:");
  console.log("   Edit the fsd.config.json file to fine-tune settings.");

  console.log("\n3. Explore FSD CLI Commands:");
  console.log("   - Generate FSD structure: fsd-cli --generate");
  console.log("   - Generate with examples: fsd-cli --examples");

  console.log("\n4. Get Help:");
  console.log("   For more information, refer to the README.md or visit:");
  console.log(
    "   - FSD Methodology Guide: https://your-fsd-methodology-guide-url.com",
  );
  console.log(
    "   - FSD CLI GitHub Repository: https://your-fsd-cli-github-repo-url.com",
  );

  console.log("\nHappy coding with FSD CLI!");
};
