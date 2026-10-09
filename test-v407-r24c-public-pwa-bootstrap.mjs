import assert from "node:assert/strict";
import fs from "node:fs";

const middleware=fs.readFileSync("middleware.js","utf8");

for(const path of ["/service-worker.js","/manifest.webmanifest","/manual.webmanifest"]){
  assert.match(middleware,new RegExp(`"${path.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}"`),`${path} debe atravesar el acceso para que instalaciones antiguas puedan actualizarse`);
}
assert.match(middleware,/PUBLIC_PATHS\.has\(path\).*return next\(\)/s);

console.log("PASS bootstrap PWA público: service worker y manifiestos no son sustituidos por access.html");
