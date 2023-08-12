import type { FileData } from "~/entities/fsd/lib/types/folder-structure.interface";

import fs from "fs";
import path from "path";

const COMPONENT_TEMPLATE_REGEX = /\/\*\sCOMPONENT_TEMPLATE\s\*\//g;
const CAMEL_CASE_REGEX = /(?:^|-|_)(\w)/g;
const DEFAULT_COMPONENT_NAME = "Slice";

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
  fileOrData: string | FileData | null | undefined,
  folderPath: string,
  baseTemplateDir: string,
  baseDir: string | null = null,
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

  if (typeof fileOrData === "string") {
    await processStringFile(fileOrData, filePath, baseTemplateDir);
  } else {
    await processFileData(fileOrData, filePath, baseTemplateDir, baseDir);
  }
}

async function processStringFile(
  filePathOrData: string,
  filePath: string,
  baseTemplateDir: string,
): Promise<void> {
  const templatePath = path.join(
    baseTemplateDir,
    path.basename(filePathOrData),
  );
  const templateContent = await readTemplateFile(templatePath);

  if (!templateContent) {
    await writeFile(filePath, "");
    console.warn(
      `Warning: Template file "${templatePath}" not found. Created an empty file "${filePath}".`,
    );
    return;
  }

  await writeFile(filePath, templateContent);
}

async function processFileData(
  fileData: FileData,
  filePath: string,
  baseTemplateDir: string,
  baseDir: string | null,
): Promise<void> {
  const { content, template } = fileData;

  if (!template) {
    await writeFile(filePath, content ?? "");
    return;
  }

  const templatePath = path.join(baseTemplateDir, template);
  const templateContent = await readTemplateFile(templatePath);

  if (!templateContent) {
    console.warn(
      `Warning: Template file "${templatePath}" not found. Created an empty file "${filePath}".`,
    );
    await writeFile(filePath, content ?? "");
    return;
  }

  let finalContent = templateContent
    .replace("{{content}}", content ?? "")
    .trim();

  if (finalContent) {
    const componentName = baseDir || DEFAULT_COMPONENT_NAME;
    const camelCasedComponentName = componentName.replace(
      CAMEL_CASE_REGEX,
      (_, char) => char.toUpperCase(),
    );
    finalContent = finalContent.replace(
      COMPONENT_TEMPLATE_REGEX,
      camelCasedComponentName,
    );

    await writeFile(filePath, finalContent);
  } else {
    console.warn(
      `Warning: Template file "${templatePath}" is empty. Created an empty file "${filePath}".`,
    );
    await writeFile(filePath, "");
  }
}
