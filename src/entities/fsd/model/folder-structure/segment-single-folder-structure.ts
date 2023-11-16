import type { FolderStructure, FsdSegment } from "../../lib/types";
import type { FsdConfig } from "~/entities/config";

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
