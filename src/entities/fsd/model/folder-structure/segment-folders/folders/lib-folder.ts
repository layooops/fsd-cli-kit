import type { FsdConfig } from "~/entities/config/lib/types/config.interface";
import type { Folder } from "~/entities/fsd/lib/types/folder-structure.interface";

interface LibFolder {
  configOptions: FsdConfig["globalSettings"];
  sliceName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const libFolderWithTemplates = (props: LibFolder): Folder => {
  return [];
};
