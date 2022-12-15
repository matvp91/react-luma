import esbuild from "esbuild";

await esbuild.serve(
  {
    servedir: "./",
  },
  {
    entryPoints: ["./src/index.tsx"],
    outdir: "./dist",
    format: "cjs",
    bundle: true,
  }
);
