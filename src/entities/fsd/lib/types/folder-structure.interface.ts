export interface FileData {
  name: string | undefined;
  content?: string;
}

export type FolderFile = null | FileData | string;
export type Folder = FolderFile[];

export interface FolderStructure {
  [folderName: string]: Folder | FolderStructure;
}
