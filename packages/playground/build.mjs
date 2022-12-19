import esbuild from "esbuild";
import htmlPlugin from "@chialab/esbuild-plugin-html";

await esbuild.build({
  entryPoints: ["./src/index.html"],
  outdir: "./dist",
  assetNames: "[name]",
  chunkNames: "[ext]/[name]",
  format: "cjs",
  bundle: true,
  plugins: [htmlPlugin()],
});
