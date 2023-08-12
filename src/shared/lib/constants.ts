import type { FSDLayers } from "~/entities/fsd/lib/types/fsd.interface";

import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const srcCliPath = path.dirname(filename);
export const CLI_ROOT = path.join(srcCliPath);

export const FSD_CONFIG_NAME = "fsd.config.json";
export const DEFAULT_FSD_LAYER: FSDLayers = "layer";
