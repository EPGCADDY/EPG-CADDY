import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const destination="https://epg-caddy-git-stableford-tournament-final-epgcaddys-projects.vercel.app/index-grupal.html?stableford_emergency=countryclub&emergency_clean=1&v=249";

assert.match(html,/V251-STABLEFORD-ISOLATED-ROUTE-20260822/);
assert.ok(html.includes(`const STABLEFORD_OFFICIAL_HOSTING_URL="${destination}"`));
assert.match(html,/id="stableCourseOption" href="\$\{STABLEFORD_OFFICIAL_HOSTING_URL\}"/);
assert.match(html,/aria-label="Abrir tarjeta oficial Stableford"/);
assert.match(html,/<span>STABLEFORD<\/span>/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,120}preventDefault\(\)/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,160}openStablefordSetup/);

console.log("PASS V251 · STABLE navega al alojamiento Stableford aislado");
