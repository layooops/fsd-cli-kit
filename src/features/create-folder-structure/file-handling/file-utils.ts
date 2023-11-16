import type { FolderFile } from "~/entities/fsd";

import fs from "fs";
import path from "path";

export async function createFolder(dirPath?: string): Promise<void> {
  try {
    dirPath && (await fs.promises.mkdir(dirPath, { recursive: true }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  return fs.promises.writeFile(filePath, content);
}

export async function readTemplateFile(
  filePath: string,
): Promise<string | null> {
  try {
    const file = await fs.promises.readFile(filePath, "utf8");
    return file;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function processFile(
  fileOrData: FolderFile | undefined,
  folderPath: string,
): Promise<void> {
  if (!fileOrData) {
    return;
  }

  const filePath = path.join(
    folderPath,
    typeof fileOrData === "string"
      ? path.basename(fileOrData)
      : fileOrData.name ?? "",
  );

  if (typeof fileOrData !== "string") {
    await writeFile(filePath, fileOrData.content ?? "");
  }
}
