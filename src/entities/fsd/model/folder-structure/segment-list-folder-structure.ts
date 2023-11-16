import type { FolderStructure } from "../../lib/types/folder-structure.interface";
import type { FsdSegment } from "../../lib/types/fsd.interface";
import type { FsdConfig } from "~/entities/config";

import {
  findParentConfigFileInDirectory,
  processCustomFilesForSegment,
} from "../../lib/helpers/helpers";
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

  if (segments && segments.length > 0) {
    const validSegments = segments.filter(
      (segment) => segment in defaultFolderStructure,
    );

    const customFilesBasePath = findParentConfigFileInDirectory(process.cwd());

    await Promise.all(
      validSegments.map(async (segment) => {
        folderStructure[segment] = defaultFolderStructure[segment];

        await processCustomFilesForSegment(
          config,
          folderStructure,
          segment,
          customFilesBasePath,
        );
      }),
    );
  }

  return folderStructure;
};
