export function isValidFolderPathOrFile(path: string): boolean {
  const regex = /[\\/][^/\\][^./\\]*\.[^/\\]+$/;

  return regex.test(path);
}

export const folderValidate = (path?: string): boolean => {
  if (!path || isValidFolderPathOrFile(path)) {
    return false;
  }
  const invalidChars = /[<>:"/\\|?*]/;
  return invalidChars.test(path);
};

export const getLastWordFromValidFolder = (
  folderPath?: string,
): string | undefined => {
  if (!folderPath) {
    return undefined;
  }
  if (folderValidate(folderPath)) {
    const parts = folderPath.split(/[\\/]/);
    return parts[parts.length - 1];
  }
  return undefined;
};
