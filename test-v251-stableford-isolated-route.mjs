import assert from "node:assert/strict";
import fs from "node:fs";
import stableford from "./stableford.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const destination="https://epg-caddy-git-stableford-tournament-final-epgcaddys-projects.vercel.app/index-grupal.html?stableford_emergency=countryclub&emergency_clean=1&v=249";

assert.match(html,/V251-STABLEFORD-ISOLATED-ROUTE-20260822/);
assert.ok(html.includes(`const STABLEFORD_OFFICIAL_HOSTING_URL="${destination}"`));
assert.match(html,/id="stableCourseOption" href="\$\{STABLEFORD_OFFICIAL_HOSTING_URL\}"/);
assert.match(html,/aria-label="Abrir tarjeta oficial Stableford"/);
assert.match(html,/<span>STABLEFORD<\/span>/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,120}preventDefault\(\)/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,160}openStablefordSetup/);

const officialPoints=[
  {gross:6,par:4,points:0,label:"doble bogey o más"},
  {gross:5,par:4,points:1,label:"bogey"},
  {gross:4,par:4,points:2,label:"par"},
  {gross:3,par:4,points:3,label:"birdie"},
  {gross:2,par:4,points:4,label:"eagle/albatros o mejor"}
];
for(const item of officialPoints)assert.equal(stableford.pointsFor(item.gross,item.par),item.points,item.label);
assert.equal(stableford.pointsFor(1,5),4,"el máximo por hoyo es cuatro");
assert.equal(stableford.pointsFor(null,4,"x"),0,"levanta/X suma cero");

console.log("PASS V251 · STABLEFORD navega aislado y conserva la matriz oficial de puntos");
