import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "assets", "official-logos", "golf-score-card-gt-app-store-1024.png");

async function filesBelow(directory) {
  const found = [];
  async function visit(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true }).catch(() => [])) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(target);
      else found.push(target);
    }
  }
  await visit(directory);
  return found;
}

const iosRoot = path.join(root, "native", "ios", "App", "App", "Assets.xcassets");
const androidRoot = path.join(root, "native", "android", "app", "src", "main", "res");
const iosTargets = (await filesBelow(iosRoot)).filter(file => /\.(?:png|jpg|jpeg)$/i.test(file) && /(?:AppIcon|Splash)/i.test(file));
const androidTargets = (await filesBelow(androidRoot)).filter(file => /\.(?:png|webp)$/i.test(file) && /(?:ic_launcher|splash)/i.test(path.basename(file)));
if (!iosTargets.length || !androidTargets.length) throw new Error(`NATIVE_ASSET_TARGETS_MISSING ios=${iosTargets.length} android=${androidTargets.length}`);

for (const target of [...iosTargets, ...androidTargets]) {
  const metadata = await sharp(target).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`NATIVE_ASSET_DIMENSIONS_MISSING ${path.relative(root, target)}`);
  const extension = path.extname(target).toLowerCase();
  const temporary = `${target}.gscg${extension}`;
  let pipeline = sharp(source)
    .resize(metadata.width, metadata.height, { fit: "contain", background: "#000000" })
    .flatten({ background: "#000000" });
  pipeline = extension === ".webp" ? pipeline.webp({ lossless: true }) : pipeline.png({ compressionLevel: 9 });
  await pipeline.toFile(temporary);
  await fs.rename(temporary, target);
}

console.log(`NATIVE_OFFICIAL_ASSETS_APPLIED ios=${iosTargets.length} android=${androidTargets.length}`);
