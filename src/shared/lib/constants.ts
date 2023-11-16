import type { FSDLayers } from "~/entities/fsd";

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const srcCliPath = path.dirname(filename);
export const CLI_ROOT = path.join(srcCliPath);

export const FSD_CONFIG_NAME_NO_EXT = "fsd.config";
export const FSD_CONFIG_NAME = "fsd.config.json";

export const DEFAULT_FSD_LAYER: FSDLayers = "layer";
export const DEFAULT_SLICE_FILE_NAME = "slice";

export const CAMEL_CASE_REGEX = /(?:^|-|_)(\w)/g;
export const JSON_INDENTATION = 2;
export const FILE_NOT_FOUND_CODE = "ENOENT";
export const FSD_CLI_APP = "fsd-cli-kit";

export const FSD_DOCUMENTATION_LINK = "https://feature-sliced.design";
export const FSD_CLI_GITHUB_LINK =
  "https://github.com/vitaliiastakhov/fsd-cli-kit";

export const FSD_JSON_SCHEMA_LINK =
  "https://layooops.com/schemas/fsd-cli-schema.json";
