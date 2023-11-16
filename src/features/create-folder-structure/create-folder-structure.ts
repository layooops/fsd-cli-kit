import type { Folder, FolderStructure } from "~/entities/fsd";

import { select } from "@inquirer/prompts";
import fse from "fs-extra";
import path from "path";

import { isValidFolderPathOrFile } from "~/shared/lib/utils/valid-folder";

import { createFolder, processFile } from "./file-handling/file-utils";

const dirAlreadyExistPrompt = async (dir?: string) => {
  const answer = await select<"yes" | "no">({
    message: `${dir} dir already exists. Overwrite it?`,
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
  });

  return answer;
};

export async function createFolderStructure({
  data,
  customPath = "",
}: {
  data?: FolderStructure;
  customPath?: string;
}): Promise<void> {
  const isFile = isValidFolderPathOrFile(customPath);

  if (isFile && customPath) {
    await fse.createFile(customPath);
    return;
  }
  const filesInIndex: Folder = [];

  const baseDirExists = await fse.promises.stat(customPath).catch(() => null);

  if (baseDirExists) {
    const answer = await dirAlreadyExistPrompt(customPath);

    if (answer === "no") {
      return undefined;
    }
  }

  async function createOrUpdateFolder(folderPath: string): Promise<void> {
    const folderExists = await fse.promises.stat(folderPath).catch(() => null);

    if (!baseDirExists && folderExists) {
      const answer = await dirAlreadyExistPrompt(folderPath);

      if (answer === "no") {
        return;
      }
    }

    if (!folderExists?.isDirectory()) {
      await createFolder(folderPath);
    } else {
      await fse.emptyDir(folderPath);
    }
  }

  async function processFilesOrSubfolders(
    filesOrSubfolders: Folder,
    folderPath: string,
  ): Promise<void> {
    for (const fileOrData of filesOrSubfolders) {
      if (fileOrData !== null) {
        await processFile(fileOrData, folderPath);
      }
    }
  }

  await createOrUpdateFolder(customPath);

  if (data) {
    for (const [folderName, filesOrSubfolders] of Object.entries(data)) {
      if (folderName === "public-api") {
        Array.isArray(filesOrSubfolders) &&
          filesInIndex.push(...filesOrSubfolders);
      } else {
        const folderPath = path.join(customPath, folderName);
        await createOrUpdateFolder(folderPath);

        Array.isArray(filesOrSubfolders)
          ? await processFilesOrSubfolders(filesOrSubfolders, folderPath)
          : await createFolderStructure({
              data: filesOrSubfolders,
              customPath: folderPath,
            });
      }
    }
  }

  await processFilesOrSubfolders(filesInIndex, customPath);
}
