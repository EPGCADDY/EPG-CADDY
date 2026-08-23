import assert from "node:assert/strict";
import fs from "node:fs";

const read=file=>fs.readFileSync(file,"utf8");
const html=read("index-grupal.html");
const manifest=JSON.parse(read("manifest.webmanifest"));
const worker=read("service-worker.js");
const packageJson=JSON.parse(read("package.json"));
const apiPackage=JSON.parse(read("api/package.json"));
const release=JSON.parse(read("mobile-release.json"));
const vercel=JSON.parse(read("vercel.json"));

assert.match(html,/V290-GOLF-SCORE-CARD-GT-BRAND-ICONS-CLEANUP-20260823/);
assert.match(html,/apple-touch-icon" href="\/assets\/official-logos\/golf-score-card-gt-apple-touch-180\.png"/);
assert.equal(packageJson.engines.node,"22.x");
assert.equal(apiPackage.type,"module");
assert.equal(release.buildNumber,290);
assert.equal(vercel.installCommand,"npm install --omit=dev");
assert.equal(manifest.name,"Golf Score Card GT");
for(const size of ["192x192","512x512"])assert.ok(manifest.icons.some(icon=>icon.sizes===size&&icon.type==="image/png"&&icon.purpose==="any"));
for(const icon of [
  "assets/official-logos/golf-score-card-gt-app-store-1024.png",
  "assets/official-logos/golf-score-card-gt-google-play-512.png",
  "assets/official-logos/golf-score-card-gt-pwa-512.png",
  "assets/official-logos/golf-score-card-gt-pwa-192.png",
  "assets/official-logos/golf-score-card-gt-apple-touch-180.png"
])assert.ok(fs.existsSync(icon),icon);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v290"/);
assert.match(read("assets/official-logos/README.md"),/Logos oficiales · Golf Score Card GT/);

console.log("PASS V290 · marca Golf Score Card GT, iconos oficiales y paquete comercial");
