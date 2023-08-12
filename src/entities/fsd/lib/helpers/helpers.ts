import type {
  FileData,
  FolderStructure,
} from "../types/folder-structure.interface";
import type { FsdSegment } from "../types/fsd.interface";
import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import fse from "fs-extra";
import path from "path";

import { FSD_CONFIG_NAME } from "~/shared/lib/constants";

export function findParentConfigFileInDirectory(
  directory: string,
): string | undefined {
  const configFile = path.join(directory, FSD_CONFIG_NAME);
  if (fse.existsSync(configFile)) {
    return path.dirname(configFile);
  }

  const parentDir = path.dirname(directory);
  if (parentDir !== directory) {
    return findParentConfigFileInDirectory(parentDir);
  }

  return undefined;
}

export const readCustomFile = async ({
  customFilesBasePath,
  filePath,
}: {
  customFilesBasePath?: string;
  filePath: string;
}): Promise<FileData | null> => {
  const customFilePath = customFilesBasePath + filePath.slice(1);
  try {
    const content = await fse.promises.readFile(customFilePath, "utf8");
    return {
      name: path.basename(customFilePath),
      content,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`Warning: Custom file "${customFilePath}" not found.`);
      return null;
    }
    throw error;
  }
};

export async function processCustomFilesForSegment(
  config: FsdConfig,
  resultObject: FolderStructure,
  segment: FsdSegment,
  customFilesBasePath?: string,
): Promise<void> {
  const customFilesSegment = config.customFiles?.find(
    (file) => file.segment === segment,
  );

  if (customFilesSegment) {
    const segmentFiles: (FileData | null)[] = await Promise.all(
      customFilesSegment.files.map(async (filePath) =>
        readCustomFile({ customFilesBasePath, filePath }),
      ),
    );

    const filteredSegmentFiles = segmentFiles.filter((file) => file !== null);

    if (filteredSegmentFiles.length > 0) {
      resultObject[segment] = filteredSegmentFiles;
    }
  }
}
