import { confirm } from "@inquirer/prompts";

export async function promptAutogeneration(): Promise<boolean> {
  return confirm({
    message:
      "Would you like to auto-generate templates for some segments? (yes/no)",
    default: true,
  });
}
export async function promptConfigExist(): Promise<boolean> {
  return confirm({
    message:
      "A configuration file already exists. Do you want to overwrite the existing configuration?",
    default: true,
  });
}
