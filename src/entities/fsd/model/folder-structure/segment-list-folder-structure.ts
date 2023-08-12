import type {
  FileData,
  FolderStructure,
} from "../../lib/types/folder-structure.interface";
import type { FsdSegment } from "../../lib/types/fsd.interface";
import type { FsdConfig } from "~/entities/config/lib/types/config.interface";

import {
  findParentConfigFileInDirectory,
  processCustomFilesForSegment,
} from "../../lib/helpers/helpers";
import { uiFolderWithTemplates } from "./segment-folders/folders";
import { fsdSegmentListWithTemplates } from "./segment-folders/segment-list-with-templates";

export const segmentListFolderStructure = async ({
  config,
  segments,
  sliceName,
}: {
  config: FsdConfig;
  sliceName?: string;
  segments?: FsdSegment[] | null;
}): Promise<FolderStructure> => {
  const defaultFolderStructure = fsdSegmentListWithTemplates({
    configOptions: config,
    sliceName,
  });

  const folderStructure: FolderStructure = {};

  try {
    if (segments?.length) {
      const validSegments = segments.filter(
        (segment) => defaultFolderStructure[segment],
      );
      const segmentHandlers: Partial<
        Record<FsdSegment, () => (FileData | null | string)[]>
      > = {
        ui: () =>
          config.autogenerate
            ? uiFolderWithTemplates({
                configOptions: config.globalSettings,
                sliceName,
              })
            : [],
      };
      for (const segment of validSegments) {
        const handler = segmentHandlers[segment];
        if (handler) {
          folderStructure[segment] = handler();
        } else {
          folderStructure[segment] = defaultFolderStructure[segment] || [];
        }

        const customFilesBasePath = findParentConfigFileInDirectory(
          process.cwd(),
        );

        await processCustomFilesForSegment(
          config,
          folderStructure,
          segment,
          customFilesBasePath,
        );
      }
    }
  } catch (error) {
    console.error("Error processing custom files:", error);
  }

  return folderStructure;
};
