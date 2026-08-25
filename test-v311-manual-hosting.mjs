import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("manual.html","utf8");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const manualDir="docs/manual/v311";
const pdf=`${manualDir}/Manual_Golf_Score_Card_GT_COMPLETO.pdf`;
const manifest=JSON.parse(fs.readFileSync("manual.webmanifest","utf8"));

assert.match(html,/Manual de Funciones/);
assert.match(html,/MATCH PLAY/);
assert.match(html,/FOUR BALL/);
assert.match(html,/INFORMACIÓN DE CAMPOS/i);
assert.match(html,/BUSCAR UNA FUNCIÓN, PANTALLA O DUDA/);
assert.match(html,/ÍNDICE RÁPIDO/);
assert.match(html,/manual-search\.js/);
assert.match(html,/Cómo corrijo un bogey que fue par/);
assert.match(html,/apple-mobile-web-app-title" content="MANUAL SCG"/);
assert.match(html,/page-\$\{item\.number\}\.png/);
assert.ok(fs.statSync(pdf).size>100000,"El PDF completo debe estar alojado en el proyecto");
assert.match(fs.readFileSync(pdf,"latin1"),/\/Count\s+73\b/,"El PDF debe contener portada más 72 páginas funcionales");
assert.match(fs.readFileSync(pdf,"latin1"),/\/Outlines\b/,"El PDF debe contener navegación interna por páginas");

for(let page=0;page<=72;page+=1){
  const number=String(page).padStart(2,"0");
  const image=`${manualDir}/page-${number}.png`;
  assert.ok(fs.statSync(image).size>50000,`Falta la página visual ${number}`);
  const png=fs.readFileSync(image);
  assert.equal(png.toString("ascii",1,4),"PNG",`La página ${number} debe ser PNG`);
  assert.equal(png.readUInt32BE(16),2160,`La página ${number} debe tener ancho 4K de 2160 px`);
  assert.equal(png.readUInt32BE(20),4320,`La página ${number} debe tener alto 4K de 4320 px`);
}

assert.ok(vercel.redirects.some(item=>item.source==="/manual"&&item.destination==="/manual.html"));
assert.ok(vercel.redirects.some(item=>item.source==="/manual-scg"&&item.destination==="/manual.html"));
assert.ok(vercel.redirects.some(item=>item.source==="/manual.pdf"&&item.destination.endsWith("Manual_Golf_Score_Card_GT_COMPLETO.pdf")));
assert.ok(vercel.headers.some(item=>item.source==="/manual.html"&&item.headers.some(header=>header.value.includes("no-store"))));
assert.equal(manifest.start_url,"/manual-scg");
assert.equal(manifest.display,"standalone");
assert.equal(manifest.icons[0].src,"/docs/manual/v311/manual-scg-escritorio-4k.png");

console.log("PASS V311 · manual web directo, PDF, portada y 72 páginas alojadas");
