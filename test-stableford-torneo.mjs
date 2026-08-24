import assert from "node:assert/strict";
import fs from "node:fs";
const html=fs.readFileSync(new URL("./stableford-torneo.html",import.meta.url),"utf8");
assert.match(html,/GOLF SCORE CARD GT · STABLEFORD/);
assert.match(html,/CLASIFICACIÓN CENTROAMERICANA · MEJORES 3 DE 4/);
for(const key of ["country_club","pulte","san_isidro","mayan_golf","hacienda_nueva","alta_vista","la_reunion"])assert.match(html,new RegExp(`${key}:\\{name:`),`Falta ${key}`);
assert.match(html,/SENIOR · BLANCAS · HCP 0/);
assert.match(html,/id="superBtn"[^>]*>S\. SENIOR/);
assert.match(html,/PUNTOS/);
assert.match(html,/GROSS OUT/);
assert.match(html,/PTS OUT/);
assert.match(html,/GROSS IN/);
assert.match(html,/PTS IN/);
assert.match(html,/MEJORES 3/);
assert.match(html,/raw==="X"/);
assert.match(html,/GSCStableford\.pointsFor|GSCStableford\.holeResult/);
assert.match(html,/state\.players=.*slice\(0,6\)/s);
assert.match(html,/NUEVA RONDA LIMPIA/);
const expected={
 sanWhite:[358,139,530,155,375,436,553,259,410,409,455,383,200,385,535,149,370,369],
 sanYellow:[338,129,500,144,360,410,525,228,377,374,419,354,173,374,503,131,348,349],
 mayanWhite:[390,132,348,397,583,418,179,357,515,388,405,392,157,566,384,394,160,530],
 mayanYellow:[377,120,324,380,573,407,168,345,506,334,395,385,151,562,370,387,154,519]
};
for(const [name,values] of Object.entries(expected)){
  assert.equal(values.length,18,`${name}: deben existir 18 yardajes`);
  assert.match(html,new RegExp(values.join(",")),`${name}: no coincide con la transcripción autorizada`);
}
assert.equal(expected.sanWhite.slice(0,9).reduce((a,b)=>a+b,0),3215);
assert.equal(expected.sanWhite.slice(9).reduce((a,b)=>a+b,0),3255);
assert.equal(expected.sanWhite.reduce((a,b)=>a+b,0),6470);
assert.equal(expected.sanYellow.slice(0,9).reduce((a,b)=>a+b,0),3011);
assert.equal(expected.sanYellow.slice(9).reduce((a,b)=>a+b,0),3025);
assert.equal(expected.sanYellow.reduce((a,b)=>a+b,0),6036);
assert.equal(expected.mayanWhite.slice(0,9).reduce((a,b)=>a+b,0),3319);
assert.equal(expected.mayanWhite.slice(9).reduce((a,b)=>a+b,0),3376);
assert.equal(expected.mayanWhite.reduce((a,b)=>a+b,0),6695);
assert.equal(expected.mayanYellow.slice(0,9).reduce((a,b)=>a+b,0),3200);
assert.equal(expected.mayanYellow.slice(9).reduce((a,b)=>a+b,0),3257);
assert.equal(expected.mayanYellow.reduce((a,b)=>a+b,0),6457);
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
assert.ok(scripts.length>=1,"Falta script inline de la tarjeta");
for(const js of scripts)new Function(js);
console.log("Stableford torneo PASS estático: sintaxis, siete campos, categorías, máximo seis jugadores, Gross/Puntos, X, IN/OUT/TOTAL, nueva ronda, ranking y matrices verificadas.");
