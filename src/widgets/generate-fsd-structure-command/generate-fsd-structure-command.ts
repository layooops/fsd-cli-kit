import type { GenerateFsdPromptsOptions } from "~/features/generate-fsd-prompts";

import path from "path";

import {
  type FolderStructure,
  fsdLayerStructure,
  segmentListFolderStructure,
  segmentSingleFolderStructure,
} from "~/entities/fsd";
import { createFolderStructure } from "~/features/create-folder-structure/create-folder-structure";
import { generateFsdPrompts } from "~/features/generate-fsd-prompts";
import { fsdxCommand } from "~/shared/api/fsdx-command";
import { logger } from "~/shared/lib/utils";
import { formatTextByConvention } from "~/shared/lib/utils/case-text";
import { readFSDConfigFile } from "~/shared/lib/utils/read-config-file";
import {
  folderValidate,
  getLastWordFromValidFolder,
} from "~/shared/lib/utils/valid-folder";

export const generateFsdStructureCommand = async (
  customPath?: string,
  options?: GenerateFsdPromptsOptions,
): Promise<void> => {
  try {
    const targetDir = process.cwd();
    const config = await readFSDConfigFile({ directory: targetDir });

    if (!config) {
      fsdxCommand.help();
      return undefined;
    }
    let folderStructure: FolderStructure | undefined;
    const isValidFolder = folderValidate(customPath);

    if (!isValidFolder && customPath) {
      await createFolderStructure({
        customPath,
      });
      return;
    }

    const cliResults = await generateFsdPrompts(isValidFolder, options);
    const validFolderName = getLastWordFromValidFolder(customPath);

    const fsdLayer = cliResults.fsdLayer;

    const folderName = cliResults.sliceName
      ? formatTextByConvention(
          cliResults.sliceName,
          config.namingConvention.folder,
        )
      : cliResults.sliceName;

    if (fsdLayer === "layer") {
      folderStructure = fsdLayerStructure();
    } else if (fsdLayer === "segments" || fsdLayer === "slice") {
      folderStructure = await segmentListFolderStructure({
        segments: cliResults.segments?.list,
        config,
        sliceName: validFolderName ?? folderName,
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (fsdLayer === "single-segment") {
      folderStructure = await segmentSingleFolderStructure({
        segmentName: cliResults.segments?.single,
        config,
      });
    }

    try {
      await createFolderStructure({
        data: folderStructure,
        customPath:
          (customPath && folderName && path.join(customPath, folderName)) ??
          customPath ??
          folderName ??
          undefined,
      });
      logger(`Folder structure for FSD ${fsdLayer} created successfully.`);
    } catch (error) {
      console.error("Error:", error);
    }
  } catch (error) {
    logger(`Error: ${(error as Error).message}`, "error");
  }
};
