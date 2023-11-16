import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";
const prebuild = process.env.npm_lifecycle_event === "prebuild";

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  treeshake: true,
  format: ["esm"],
  minify: !isDev,
  metafile: prebuild,
  sourcemap: true,
  splitting: true,
  target: "es2020",
  outDir: "dist",

  onSuccess: isDev ? "node dist/index.js" : undefined,
});
