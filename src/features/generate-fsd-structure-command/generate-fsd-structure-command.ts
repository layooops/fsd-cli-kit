import type { FolderStructure } from "~/entities/fsd/lib/types/folder-structure.interface";

import { fsdLayerStructure } from "~/entities/fsd/model/folder-structure/layer-folder-structure";
import { segmentListFolderStructure } from "~/entities/fsd/model/folder-structure/segment-list-folder-structure";
import { segmentSingleFolderStructure } from "~/entities/fsd/model/folder-structure/segment-single-folder-structure";
import { fsdCliProgram } from "~/shared/api/fsd-cli-program";
import { logger } from "~/shared/lib/utils";
import { readFSDConfigFile } from "~/shared/lib/utils/read-config-file";

import { createFolderStructure } from "../create-folder-structure/create-folder-structure";
import { generateFsdPrompts } from "../generate-fsd-prompts/model/generate-fsd-prompts";
import { baseTemplateDir } from "./lib/helpers/base-template-dir";

export const generateFsdStructureCommand = async (): Promise<
  FolderStructure | undefined
> => {
  const targetDir = process.cwd();

  try {
    const config = await readFSDConfigFile(targetDir);

    if (!config) {
      logger("Config not loaded.", "error");
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
    } else if (fsdLayer === "single-segment") {
      folderStructure = await segmentSingleFolderStructure({
        segmentName: cliResults.segments?.single,
        config,
      });
    }

    try {
      await createFolderStructure({
        data: folderStructure,
        baseDir: cliResults.sliceName ?? undefined,
        baseTemplateDir,
      });
      logger(`Folder structure for FSD ${fsdLayer} created successfully.`);
    } catch (error) {
      console.error("Error:", error);
    }

    return folderStructure;
  } catch (error) {
    logger(`Error: ${(error as Error).message}`, "error");
    return undefined;
  }
};
