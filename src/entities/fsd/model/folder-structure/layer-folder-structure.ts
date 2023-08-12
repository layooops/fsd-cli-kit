import type { FolderStructure } from "../../lib/types/folder-structure.interface";

export const fsdLayerStructure = (): FolderStructure => {
  return {
    app: [],
    widgets: [],
    features: [],
    pages: [],
    entities: [],
    shared: [],
  };
};
