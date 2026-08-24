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
assert.match(html,/\.registration-method \.nr-mic\{width:120px;height:120px;/);
assert.match(html,/\.registration-method \.nr-mic\{width:112px;height:112px;/);
assert.match(html,/class="setup-mic-icon"/);
assert.doesNotMatch(html,/id="setupMicWrap"[^\n]*<div class="mic-visual">🎙<\/div>/);
assert.match(html,/class="newbie-guide-title">DICTA O ESCRIBE:<\/div>\s*<div>1-NOMBRE<\/div>\s*<div>2-HDCP<\/div>\s*<div>3-MARCAS<\/div>\s*<div class="newbie-guide-player">DE CADA JUGADOR<\/div>\s*<div>4-OK<\/div>/);
assert.match(html,/\.newbie-registration-guide\{text-align:left;/);
assert.match(html,/\.newbie-registration-guide,\.newbie-registration-guide \*\{font-size:13px!important\}/);
assert.match(html,/#setupOverlay\{padding-top:max\(8px,calc\(env\(safe-area-inset-top\) \+ 4px\)\)\}/);
assert.match(html,/#setupOverlay \.nr-head img\{width:100%;max-width:100%;height:auto;margin-left:0\}/);
assert.match(html,/id="normalRoundButton"[^>]*aria-pressed="true"[^>]*>[\s\S]*?<span>RONDA NORMAL<\/span>/);
assert.match(html,/id="provisionalScorecardButton"[^>]*>[\s\S]*?<span>SCORE CARD - PRÁCTICA<\/span>/);
assert.match(html,/REGISTRO DE TORNEO \(OPCIONAL\)/);
assert.match(html,/id="tournamentDescription"[^>]*placeholder="DESCRIPCIÓN DE TORNEO \(OPCIONAL\)"/);
assert.match(html,/return\{name:String\(value\.name\|\|""\)\.trim\(\),description:String\(value\.description\|\|""\)\.trim\(\)\}/);
assert.equal(packageJson.engines.node,"22.x");
assert.equal(apiPackage.type,"module");
assert.equal(release.buildNumber,301);
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
assert.match(worker,/const CACHE_NAME="gscg-mobile-v301"/);
assert.match(read("assets/official-logos/README.md"),/Logos oficiales · Golf Score Card GT/);

console.log("PASS V301 · tres modalidades y torneo opcional completos");
