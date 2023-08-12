export interface FileData {
  name: string | undefined;
  content?: string;
  template?: string;
}

export interface FolderStructure {
  [folderName: string]: (string | FileData | null)[] | FolderStructure;
}

export type Folder = (null | FileData | string)[];
