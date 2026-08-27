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
assert.match(html,/\.manual-page img\{[^}]*aspect-ratio:1 \/ 2/,"Las páginas deben reservar su altura 2160×4320 antes de cargar para que el enlace exacto no salte");
assert.match(html,/\.manual-page\{[^}]*aspect-ratio:1 \/ 2/,"La sección completa debe reservar la geometría 1:2 y no depender de la descarga de la imagen");
assert.match(html,/\.manual-page img\{[^}]*height:100%[^}]*object-fit:contain/,"La imagen debe ocupar la geometría estable de su sección");
assert.ok(html.indexOf('<main class="manual" id="manual">')<html.indexOf('<section class="intro">'),"La portada visual debe aparecer antes del compendio");
assert.match(html,/index===0\?"":`<span class="label">\$\{item\.label\}<\/span>`/,"La portada no debe mostrar la etiqueta PORTADA");
assert.match(html,/title\.textContent=current===0\?"":/,"La portada no debe mostrar un título superpuesto");
assert.match(html,/counter\.textContent=current===0\?"":/,"La portada no debe mostrar PORTADA en el pie");
assert.doesNotMatch(html,/<strong id="pageTitle">[^<]*PORTADA/i);
assert.doesNotMatch(html,/<strong id="pageCounter">[^<]*PORTADA/i);
assert.doesNotMatch(html,/indexLinks\[[^\]]+\]\?\.scrollIntoView/,"El índice horizontal nunca debe desplazar la página completa");
assert.match(html,/pageIndex\.scrollTo\(\{left:Math\.max\(0,left\),behavior:"smooth"\}\)/,"El índice activo sólo debe centrarse horizontalmente");
assert.match(html,/history\.replaceState\(null,"",`#\$\{pageId\(destination\)\}`\)/,"Cada destino debe quedar fijado por su ancla");
assert.match(html,/searchInput\.blur\(\);[\s\S]*?requestAnimationFrame\(\(\)=>go\(destination\)\)/,"El buscador debe soltar el teclado antes de navegar");
assert.match(html,/initialMatch=location\.hash\.match\(\/\^#pagina-\(\\d\{2\}\)\$\//,"Un enlace directo debe abrir la página indicada");
assert.match(html,/function syncCurrentToViewport\(\)/,"El indicador debe sincronizarse con la página visible completa");
assert.match(html,/getBoundingClientRect\(\)\.bottom>reference/,"El indicador no debe conservar la página anterior por un residuo visual");
assert.ok(fs.statSync(pdf).size>100000,"El PDF completo debe estar alojado en el proyecto");
assert.match(fs.readFileSync(pdf,"latin1"),/\/Count\s+74\b/,"El PDF debe contener portada más 73 páginas funcionales");
assert.match(fs.readFileSync(pdf,"latin1"),/\/Outlines\b/,"El PDF debe contener navegación interna por páginas");

for(let page=0;page<=73;page+=1){
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

console.log("PASS V334 · manual web directo, anclas estables, PDF, portada y 73 páginas alojadas");
