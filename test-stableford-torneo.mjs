import assert from "node:assert/strict";
import fs from "node:fs";
const html=fs.readFileSync(new URL("./stableford-torneo.html",import.meta.url),"utf8");
assert.match(html,/GOLF SCORE CARD GT · STABLEFORD/);
assert.match(html,/CLASIFICACIÓN CENTROAMERICANA · MEJORES 3 DE 4/);
for(const key of ["country_club","pulte","san_isidro","mayan_golf"])assert.match(html,new RegExp(`${key}:\\{name:`),`Falta ${key}`);
for(const label of ["CAMPEONATO","A","B","C","D","SENIOR","SUPER SENIOR","FEMENINA"])assert.match(html,new RegExp(`data-category="${label==="CAMPEONATO"?"championship":label==="SUPER SENIOR"?"super_senior":label==="FEMENINA"?"female":label.toLowerCase()}"[^>]*>${label}`),`Falta categoría ${label}`);
assert.match(html,/CAMPEONATO/);
assert.match(html,/Negro/);
assert.match(html,/NEGRAS/);
assert.match(html,/PUNTOS/);
assert.match(html,/GROSS OUT/);
assert.match(html,/PTS OUT/);
assert.match(html,/GROSS IN/);
assert.match(html,/PTS IN/);
assert.match(html,/MEJORES 3/);
assert.match(html,/raw==="X"/);
assert.match(html,/GSCStableford\.pointsFor|GSCStableford\.holeResult/);
assert.match(html,/state\.players=.*slice\(0,4\)/s);
assert.match(html,/NUEVA RONDA LIMPIA/);
const expected={
 sanBlack:[393,160,569,180,427,475,594,280,440,428,509,420,215,448,592,198,433,390],
 sanBlue:[380,149,552,173,399,466,584,270,430,418,491,408,206,420,579,169,409,378],
 sanWhite:[358,139,530,155,375,436,553,259,410,409,455,383,200,385,535,149,370,369],
 sanYellow:[335,132,500,134,369,429,543,230,377,371,419,354,165,364,522,128,360,356],
 sanRed:[306,113,473,129,352,408,524,215,357,360,409,328,156,346,511,119,300,316],
 mayanBlack:[412,218,392,476,624,469,195,423,529,417,466,435,192,571,422,460,173,549],
 mayanBlue:[403,139,357,415,604,429,189,370,523,402,415,399,166,582,397,414,167,541],
 mayanWhite:[390,132,348,397,583,418,179,357,515,388,405,392,157,566,384,394,160,530],
 mayanYellow:[377,120,324,380,573,407,168,345,506,334,395,385,151,562,370,387,154,519],
 mayanRed:[356,114,297,356,487,341,158,333,466,321,342,331,144,469,309,360,139,481]
};
for(const [name,values] of Object.entries(expected)){
  assert.equal(values.length,18,`${name}: deben existir 18 yardajes`);
  assert.match(html,new RegExp(values.join(",")),`${name}: no coincide con la transcripción autorizada`);
}
assert.equal(expected.sanWhite.slice(0,9).reduce((a,b)=>a+b,0),3215);
assert.equal(expected.sanWhite.slice(9).reduce((a,b)=>a+b,0),3255);
assert.equal(expected.sanWhite.reduce((a,b)=>a+b,0),6470);
assert.equal(expected.sanYellow.slice(0,9).reduce((a,b)=>a+b,0),3049);
assert.equal(expected.sanYellow.slice(9).reduce((a,b)=>a+b,0),3039);
assert.equal(expected.sanYellow.reduce((a,b)=>a+b,0),6088);
assert.equal(expected.mayanWhite.slice(0,9).reduce((a,b)=>a+b,0),3319);
assert.equal(expected.mayanWhite.slice(9).reduce((a,b)=>a+b,0),3376);
assert.equal(expected.mayanWhite.reduce((a,b)=>a+b,0),6695);
assert.equal(expected.mayanYellow.slice(0,9).reduce((a,b)=>a+b,0),3200);
assert.equal(expected.mayanYellow.slice(9).reduce((a,b)=>a+b,0),3257);
assert.equal(expected.mayanYellow.reduce((a,b)=>a+b,0),6457);
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
assert.ok(scripts.length>=1,"Falta script inline de la tarjeta");
for(const js of scripts)new Function(js);
console.log("Stableford torneo PASS estático: sintaxis, cuatro campos, ocho categorías, máximo cuatro jugadores, Gross/Puntos, X, totales, nueva ronda, ranking y matrices verificadas.");
