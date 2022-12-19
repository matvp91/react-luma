import esbuild from "esbuild";
import htmlPlugin from "@chialab/esbuild-plugin-html";

await esbuild.serve(
  {
    servedir: "./dist",
  },
  {
    entryPoints: ["./src/index.html"],
    outdir: "./dist",
    assetNames: "[name]",
    chunkNames: "[ext]/[name]",
    format: "cjs",
    bundle: true,
    plugins: [htmlPlugin()],
  }
);
