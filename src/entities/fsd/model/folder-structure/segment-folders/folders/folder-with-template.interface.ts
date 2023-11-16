import type { GlobalSettings, NamingConvention } from "~/entities/config";

export interface FolderProps {
  configOptions: GlobalSettings;
  namingConvention: NamingConvention;
  sliceName?: string;
}
