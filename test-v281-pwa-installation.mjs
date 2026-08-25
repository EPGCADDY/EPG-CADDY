import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("manifest.webmanifest","utf8"));

assert.equal(manifest.name,"Golf Score Card GT");
assert.equal(manifest.display,"standalone");
assert.equal(manifest.scope,"/");
assert.match(manifest.start_url,/index-grupal\.html/);
assert.ok(manifest.icons.some(icon=>icon.sizes==="192x192"&&icon.type==="image/png"&&icon.purpose==="any"));
assert.ok(manifest.icons.some(icon=>icon.sizes==="512x512"&&icon.type==="image/png"&&icon.purpose==="any"));
assert.match(html,/rel="manifest" href="\/manifest\.webmanifest"/);
assert.match(html,/apple-mobile-web-app-capable/);
assert.match(html,/V281-INSTALLABLE-IOS-ANDROID-OFFLINE/);
assert.match(html,/id="installAppButton"/);
assert.match(html,/serviceWorker\.register\("\/service-worker\.js"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v319-universal-intent-routing"/);
assert.match(worker,/url\.pathname\.startsWith\("\/api\/"\)/);
assert.match(worker,/request\.mode==="navigate"/);
assert.ok(vercel.headers.some(rule=>rule.source==="/service-worker.js"&&rule.headers.some(header=>header.key==="Service-Worker-Allowed"&&header.value==="/")));

console.log("PASS V281: instalación oficial iPhone/Android, shell offline y actualización de red");
