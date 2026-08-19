import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const gameDir = path.resolve("public/game");
const partsDir = path.join(gameDir, "wasm-parts");
const outputPath = path.join(gameDir, "index.wasm");
const tempPath = `${outputPath}.tmp`;
const expectedSize = 39_513_091;

try {
  const current = await stat(outputPath);
  if (current.size === expectedSize) process.exit(0);
} catch {}

await mkdir(gameDir, { recursive: true });
const parts = (await readdir(partsDir)).filter((name) => name.endsWith(".part")).sort();
if (!parts.length) throw new Error("Godot WASM parts are missing");

const chunks = await Promise.all(parts.map((part) => readFile(path.join(partsDir, part))));
await writeFile(tempPath, Buffer.concat(chunks));
const assembled = await stat(tempPath);
if (assembled.size !== expectedSize) {
  await rm(tempPath, { force: true });
  throw new Error(`Godot WASM size mismatch: ${assembled.size}`);
}
await rm(outputPath, { force: true });
await rename(tempPath, outputPath);
