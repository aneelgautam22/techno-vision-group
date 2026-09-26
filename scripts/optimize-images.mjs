import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve(process.argv[2] || "public/images");
const outputDir = path.resolve(process.argv[3] || "public/images/optimized");
const targetBytes = 55 * 1024;
const accepted = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const aliases = new Map([
  ["project-11.jpg", "project-11-site.webp"],
  ["project-11.png", "project-11-structure.webp"],
  ["project-12.jpg", "project-12-site.webp"],
]);

await mkdir(outputDir, { recursive: true });
const files = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && accepted.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort();

for (const file of files) {
  const source = path.join(sourceDir, file);
  const destination = path.join(
    outputDir,
    aliases.get(file) || `${path.parse(file).name}.webp`,
  );
  const metadata = await sharp(source).metadata();
  const portrait = (metadata.height || 0) > (metadata.width || 0);
  let best;

  for (const width of portrait
    ? [1000, 850, 720, 600, 500, 420]
    : [1400, 1200, 1000, 850, 720, 600, 500, 420]) {
    for (const quality of [76, 64, 54, 46, 38, 30, 24, 18]) {
      const buffer = await sharp(source)
        .rotate()
        .resize({ width, height: portrait ? 1300 : 900, fit: "inside", withoutEnlargement: true })
        .webp({ quality, effort: 4, smartSubsample: true })
        .toBuffer();
      best = buffer;
      if (buffer.length <= targetBytes) break;
    }
    if (best.length <= targetBytes) break;
  }

  await writeFile(destination, best);
  const result = await stat(destination);
  console.log(`${file} -> ${path.basename(destination)} (${Math.round(result.size / 1024)} KB)`);
}
