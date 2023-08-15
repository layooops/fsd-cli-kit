import type { FolderStructure } from "~/entities/fsd/lib/types/folder-structure.interface";

import { fsdLayerStructure } from "~/entities/fsd/model/folder-structure/layer-folder-structure";
import { segmentListFolderStructure } from "~/entities/fsd/model/folder-structure/segment-list-folder-structure";
import { segmentSingleFolderStructure } from "~/entities/fsd/model/folder-structure/segment-single-folder-structure";
import { fsdCliProgram } from "~/shared/api/fsd-cli-program";
import { logger } from "~/shared/lib/utils";
import { formatTextByConvention } from "~/shared/lib/utils/case-text";
import { readFSDConfigFile } from "~/shared/lib/utils/read-config-file";

import { createFolderStructure } from "../create-folder-structure/create-folder-structure";
import { generateFsdPrompts } from "../generate-fsd-prompts/model/generate-fsd-prompts";

export const generateFsdStructureCommand = async (): Promise<void> => {
  try {
    const targetDir = process.cwd();
    const config = await readFSDConfigFile({ directory: targetDir });

    if (!config) {
      fsdCliProgram.help();
      return undefined;
    }
    const cliResults = await generateFsdPrompts();

    const fsdLayer = cliResults.fsdLayer;
    let folderStructure: FolderStructure | undefined;

    if (fsdLayer === "layer") {
      folderStructure = fsdLayerStructure();
    } else if (fsdLayer === "segments" || fsdLayer === "slice") {
      folderStructure = await segmentListFolderStructure({
        segments: cliResults.segments?.list,
        config,
        sliceName: cliResults.sliceName,
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (fsdLayer === "single-segment") {
      folderStructure = await segmentSingleFolderStructure({
        segmentName: cliResults.segments?.single,
        config,
      });
    }
    const folderName = cliResults.sliceName
      ? formatTextByConvention(
          cliResults.sliceName,
          config.namingConvention.folder,
        )
      : cliResults.sliceName;

    try {
      await createFolderStructure({
        data: folderStructure,
        baseDir: folderName ?? undefined,
      });
      logger(`Folder structure for FSD ${fsdLayer} created successfully.`);
    } catch (error) {
      console.error("Error:", error);
    }
  } catch (error) {
    logger(`Error: ${(error as Error).message}`, "error");
  }
};
