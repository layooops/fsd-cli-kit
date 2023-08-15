import type {
  GlobalSettings,
  NamingConvention,
} from "~/entities/config/lib/types/fsd-config.interface";

export interface FolderProps {
  configOptions: GlobalSettings;
  namingConvention: NamingConvention;
  sliceName?: string;
}
