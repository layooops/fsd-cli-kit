import type {
  FSDLayers,
  FsdSegment,
} from "~/entities/fsd/lib/types/fsd.interface";

import {
  promptChooseFSDLayer,
  promptFSDSegmentList,
  promptFSDSegmentsFull,
  promptFSDSingleSegment,
  promptSliceName,
} from "~/entities/fsd/model/prompts";
import { DEFAULT_FSD_LAYER } from "~/shared/lib/constants";

export interface CreateFSDLayerOptions {
  fsdLayer: FSDLayers;
  sliceName?: string;
  segments?: {
    full: boolean;
    list?: FsdSegment[];
    single?: FsdSegment;
  };
}

const createFSDLayerDefaultOptions: CreateFSDLayerOptions = {
  fsdLayer: DEFAULT_FSD_LAYER,
  sliceName: undefined,
  segments: {
    full: false,
    list: ["lib", "model", "api", "ui", "public-api"],
    single: undefined,
  },
};

export const generateFsdPrompts = async () => {
  const generateLayerCliResults = { ...createFSDLayerDefaultOptions };
  const fsdLayer = await promptChooseFSDLayer();

  generateLayerCliResults.fsdLayer = fsdLayer;

  const processSegmentList = async () => {
    if (!generateLayerCliResults.segments) return;

    const promptedSegments = await promptFSDSegmentsFull();
    // eslint-disable-next-line require-atomic-updates
    generateLayerCliResults.segments.full = promptedSegments;

    if (!generateLayerCliResults.segments.full) {
      // eslint-disable-next-line require-atomic-updates
      generateLayerCliResults.segments.list = await promptFSDSegmentList();
    }
  };

  const processSingleSegment = async () => {
    if (!generateLayerCliResults.segments) return;
    // eslint-disable-next-line require-atomic-updates
    generateLayerCliResults.segments.single = await promptFSDSingleSegment();
  };

  switch (fsdLayer) {
    case "slice":
      generateLayerCliResults.sliceName = await promptSliceName();
      if (generateLayerCliResults.segments) {
        await processSegmentList();
      }
      break;

    case "segments":
      if (generateLayerCliResults.segments) {
        await processSegmentList();
      }
      break;

    case "single-segment":
      if (generateLayerCliResults.segments) {
        await processSingleSegment();
      }
      break;

    default:
      break;
  }

  return generateLayerCliResults;
};
