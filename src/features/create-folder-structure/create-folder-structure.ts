import type {
  Folder,
  FolderStructure,
} from "~/entities/fsd/lib/types/folder-structure.interface";

import { select } from "@inquirer/prompts";
import fse from "fs-extra";
import path from "path";

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
  baseDir = "",
  baseTemplateDir = "",
}: {
  data?: FolderStructure;
  baseDir?: string;
  baseTemplateDir: string;
}): Promise<void> {
  const filesInIndex: Folder = [];

  const baseDirExists = await fse.promises.stat(baseDir).catch(() => null);

  if (baseDirExists) {
    const answer = await dirAlreadyExistPrompt(baseDir);

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
      // Если папка существует, удаляем все ее содержимое
      await fse.emptyDir(folderPath);
    }
  }

  async function processFilesOrSubfolders(
    filesOrSubfolders: Folder,
    folderPath: string,
  ): Promise<void> {
    for (const fileOrData of filesOrSubfolders) {
      if (fileOrData !== null) {
        await processFile(fileOrData, folderPath, baseTemplateDir, baseDir);
      }
    }
  }

  await createOrUpdateFolder(baseDir);

  if (data) {
    for (const [folderName, filesOrSubfolders] of Object.entries(data)) {
      if (folderName === "public-api") {
        Array.isArray(filesOrSubfolders) &&
          filesInIndex.push(...filesOrSubfolders);
      } else {
        const folderPath = path.join(baseDir, folderName);
        await createOrUpdateFolder(folderPath);

        Array.isArray(filesOrSubfolders)
          ? await processFilesOrSubfolders(filesOrSubfolders, folderPath)
          : await createFolderStructure({
              data: filesOrSubfolders,
              baseDir: folderPath,
              baseTemplateDir,
            });
      }
    }
  }

  await processFilesOrSubfolders(filesInIndex, baseDir);
}
