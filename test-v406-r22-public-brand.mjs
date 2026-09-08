import assert from "node:assert/strict";
import fs from "node:fs";

const files=["index.html","live.html","live-hub.html","api/score.js","api/session.js"];
const publicText=files.map(file=>fs.readFileSync(file,"utf8")).join("\n");

assert.doesNotMatch(publicText,/EPG CADDY|EPG Caddy/,"ninguna superficie pública conserva la marca anterior");
assert.match(fs.readFileSync("live-hub.html","utf8"),/og:site_name" content="Golf Score Card GT"/);
assert.match(fs.readFileSync("live-hub.html","utf8"),/General, categorías y tablero personalizado/);
assert.match(fs.readFileSync("live.html","utf8"),/og:title" content="Golf Score Card GT · Live"/);
console.log("PASS V406-R22 PUBLIC BRAND");
