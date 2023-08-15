import type { FolderStructure } from "../../lib/types/folder-structure.interface";
import type { FsdSegment } from "../../lib/types/fsd.interface";
import type { FsdConfig } from "~/entities/config/lib/types/fsd-config.interface";

import {
  findParentConfigFileInDirectory,
  processCustomFilesForSegment,
} from "../../lib/helpers/helpers";
import { fsdSegmentListWithTemplates } from "./segment-folders/segment-list-with-templates";

export const segmentSingleFolderStructure = async ({
  segmentName,
  config: configOptions,
}: {
  segmentName?: FsdSegment;
  config: FsdConfig;
}): Promise<FolderStructure> => {
  const resultObject: FolderStructure = {};

  if (segmentName) {
    const segment = fsdSegmentListWithTemplates({
      configOptions,
    })[segmentName];

    const customFilesBasePath = findParentConfigFileInDirectory(process.cwd());

    await processCustomFilesForSegment(
      configOptions,
      resultObject,
      segmentName,
      customFilesBasePath,
    );

    if (!resultObject[segmentName]) {
      resultObject[segmentName] = segment;
    }
  }

  return resultObject;
};
