#!/usr/bin/env zx
import "zx/globals";

const webOSSDKPath = "/Users/matvp/Bins/webOS/bin";
const tmpPath = "./.tmp";

function aresCmd(name) {
  return `${webOSSDKPath}/ares-${name}`;
}

await $`pnpm exec rimraf ./.tmp`;
await $`mkdir ${tmpPath}`;
await $`mkdir ${tmpPath}/source`;

await $`pnpm run build`;

await $`cp -R ./packages/playground/dist/ ${tmpPath}/source`;
await $`cp -R ./scripts/targets/webos/ ${tmpPath}/source`;

await $`${aresCmd("package")} ${tmpPath}/source --outdir ${tmpPath}`;
await $`${aresCmd(
  "install"
)} -d home ${tmpPath}/be.matvp91.react-luma_1.0.0_all.ipk`;
await $`${aresCmd("launch")} -d home be.matvp91.react-luma`;
await $`${aresCmd("inspect")} -d home be.matvp91.react-luma`;
