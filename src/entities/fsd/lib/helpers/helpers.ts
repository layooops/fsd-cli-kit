import type {
  Folder,
  FolderFile,
  FolderStructure,
} from "../types/folder-structure.interface";
import type { FsdSegment } from "../types/fsd.interface";
import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import fse from "fs-extra";
import path from "path";

import { FILE_NOT_FOUND_CODE, FSD_CONFIG_NAME } from "~/shared/lib/constants";
import { logger } from "~/shared/lib/utils";

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
}): Promise<FolderFile> => {

  const SLICE_START = 1;
  const customFilePath = path.join(
    customFilesBasePath || "",
    filePath.slice(SLICE_START),
  );
  try {
    const content = await fse.promises.readFile(customFilePath, "utf8");
    return {
      name: path.basename(customFilePath),
      content,
    };
  } catch (error) {
    const errnoCode = (error as NodeJS.ErrnoException).code;
    if (errnoCode === FILE_NOT_FOUND_CODE) {
      logger(`Warning: Custom file "${customFilePath}" not found.`, "error");
      return null;
    }
    throw error;
  }
};

const findCustomFilesForSegment = (config: FsdConfig, segment: FsdSegment) => {
  return config.customFiles?.find((file) => file.segment === segment) || null;
};

const processCustomFiles = async (
  customFilesBasePath: string | undefined,
  filePath: string,
) => {
  return readCustomFile({ customFilesBasePath, filePath });
};

export async function processCustomFilesForSegment(
  config: FsdConfig,
  resultObject: FolderStructure,
  segment: FsdSegment,
  customFilesBasePath?: string,
): Promise<void> {
  const customFilesSegment = findCustomFilesForSegment(config, segment);

  if (customFilesSegment) {
    const segmentFilesPromises = customFilesSegment.files.map((filePath) =>
      processCustomFiles(customFilesBasePath, filePath),
    );

    const segmentFiles: Folder = await Promise.all(segmentFilesPromises);

    const filteredSegmentFiles = segmentFiles.filter((file) => file !== null);

    if (filteredSegmentFiles.length > 0) {
      resultObject[segment] = filteredSegmentFiles;
    }
  }
}
