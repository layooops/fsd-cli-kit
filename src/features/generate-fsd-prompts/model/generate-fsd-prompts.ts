import type { GenerateFsdPromptsOptions } from "../lib";
import type { FSDLayers, FsdSegment } from "~/entities/fsd";

import {
  promptChooseFSDLayer,
  promptFSDSegmentList,
  promptFSDSegmentsFull,
  promptFSDSingleSegment,
  promptSliceName,
} from "~/entities/fsd";
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

export const generateFsdPrompts = async (
  isValidFolder?: boolean,
  options?: GenerateFsdPromptsOptions,
) => {
  const generateLayerCliResults = { ...createFSDLayerDefaultOptions };

  const processSegmentList = async () => {
    const isFullSegmentList = await promptFSDSegmentsFull();
    if (generateLayerCliResults.segments) {
      generateLayerCliResults.segments.full = isFullSegmentList;
      if (!isFullSegmentList) {
        // eslint-disable-next-line require-atomic-updates
        generateLayerCliResults.segments.list = await promptFSDSegmentList();
      }
    }
  };

  const processSingleSegment = async () => {
    if (generateLayerCliResults.segments) {
      // eslint-disable-next-line require-atomic-updates
      generateLayerCliResults.segments.single = await promptFSDSingleSegment();
    }
  };

  const handleSlicePrompt = async () => {
    generateLayerCliResults.sliceName = await promptSliceName();
    await processSegmentList();
  };

  const handleSegmentsPrompt = async () => {
    await processSegmentList();
  };

  if (options?.slice) {
    await handleSlicePrompt();
    generateLayerCliResults.fsdLayer = "slice";
  } else if (options?.segment) {
    await processSingleSegment();
    generateLayerCliResults.fsdLayer = "single-segment";
  } else if (options?.segments) {
    await handleSegmentsPrompt();
    generateLayerCliResults.fsdLayer = "segments";
  } else if (isValidFolder) {
    await handleSegmentsPrompt();
    generateLayerCliResults.fsdLayer = "slice";
  } else {
    const fsdLayer = await promptChooseFSDLayer();
    generateLayerCliResults.fsdLayer = fsdLayer;

    if (fsdLayer === "slice") {
      await handleSlicePrompt();
    } else if (fsdLayer === "segments") {
      await handleSegmentsPrompt();
    } else if (fsdLayer === "single-segment") {
      await processSingleSegment();
    }
  }

  return generateLayerCliResults;
};
