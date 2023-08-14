import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { execSync } from "child_process";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

import { logger } from "./logger";

const isGitInstalled = (dir: string): boolean => {
  try {
    execSync("git --version", { cwd: dir });
    return true;
  } catch (error) {
    return false;
  }
};

/** @returns Whether or not the provided directory has a `.git` subdirectory in it. */
const isRootGitRepo = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, ".git"));
};

/** @returns Whether or not this directory or a parent directory has a `.git` directory. */
const isInsideGitRepo = async (dir: string): Promise<boolean> => {
  try {
    // If this command succeeds, we're inside a git repo
    await execa("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: dir,
      stdout: "ignore",
    });
    return true;
  } catch (error) {
    // Else, it will throw a git-error and we return false
    return false;
  }
};

const getGitVersion = () => {
  const stdout = execSync("git --version").toString().trim();
  const gitVersionTag = stdout.split(" ")[2]; // TODO: Убрать этот magic number. Пока не знаю, что это такое.
  const versionComponents = gitVersionTag?.split(".");

  const majorIndex = 0;
  const minorIndex = 1;

  const major = versionComponents?.[majorIndex];
  const minor = versionComponents?.[minorIndex];
  return { major: Number(major), minor: Number(minor) };
};

/** @returns The git config value of "init.defaultBranch". If it is not set, returns "main". */
const getDefaultBranch = () => {
  const stdout = execSync("git config --global init.defaultBranch || echo main")
    .toString()
    .trim();

  return stdout;
};

// Версия git, в которой добавили --initial-branch
const messages = {
  gitInitialized: `${chalk.green(
    "Successfully initialized and staged",
  )} ${chalk.green.bold("git")}\n`,
  gitFailed: `${chalk.bold.red(
    "Failed:",
  )} could not initialize git. Update git to the latest version!\n`,
  gitAlreadyInitialized: (dirName: string) =>
    `${chalk.redBright.bold(
      "Warning:",
    )} Git is already initialized in "${dirName}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
  gitInsideWorktree: (dirName: string) =>
    `${chalk.redBright.bold(
      "Warning:",
    )} "${dirName}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
};

interface GitVersion {
  major: number;
  minor: number;
}
const GIT_MAJOR_MIN_VERSION: GitVersion = { major: 2, minor: 28 };

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger("Initializing Git...");

  if (!isGitInstalled(projectDir)) {
    logger("Git is not installed. Skipping Git initialization.", "warn");
    return;
  }

  const spinner = ora("Creating a new git repo...\n").start();

  const isRoot = isRootGitRepo(projectDir);
  const isInside = await isInsideGitRepo(projectDir);
  const dirName = path.parse(projectDir).name; // Пропускаем полный путь для логгирования

  if (isInside && isRoot) {
    // Директория является корневым git-репозиторием
    spinner.stop();
    const overwriteGit = await confirm({
      message: messages.gitAlreadyInitialized(dirName),
      default: false,
    });
    if (!overwriteGit) {
      spinner.info("Skipping Git initialization.");
      return;
    }
    // Удаляем папку .git
    fs.removeSync(path.join(projectDir, ".git"));
  } else if (isInside && !isRoot) {
    // Директория находится внутри git worktree
    spinner.stop();
    const initializeChildGitRepo = await confirm({
      message: messages.gitInsideWorktree(dirName),
      default: false,
    });
    if (!initializeChildGitRepo) {
      spinner.info("Skipping Git initialization.");
      return;
    }
  }

  // Инициализация git-репозитория
  try {
    const branchName = getDefaultBranch();

    // Проверка версии git для использования --initial-branch
    const currentGitVersion = getGitVersion();
    const shouldUseInitialBranch =
      currentGitVersion.major > GIT_MAJOR_MIN_VERSION.major ||
      (currentGitVersion.major === GIT_MAJOR_MIN_VERSION.major &&
        currentGitVersion.minor >= GIT_MAJOR_MIN_VERSION.minor);

    if (shouldUseInitialBranch) {
      await execa("git", ["init", `--initial-branch=${branchName}`], {
        cwd: projectDir,
      });
    } else {
      await execa("git", ["init"], { cwd: projectDir });
      // symbolic-ref используется здесь из-за отсутствия refs/heads/master
      // Он создается только после первого коммита
      // https://superuser.com/a/1419674
      await execa("git", ["symbolic-ref", "HEAD", `refs/heads/${branchName}`], {
        cwd: projectDir,
      });
    }
    await execa("git", ["add", "."], { cwd: projectDir });
    spinner.succeed(messages.gitInitialized);
  } catch (error) {
    spinner.fail(messages.gitFailed);
  }
};
