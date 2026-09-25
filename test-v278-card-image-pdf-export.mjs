import assert from "node:assert/strict";
import fs from "node:fs";
import artifacts from "./card-artifacts.js";
import fileExport from "./card-file-export.js";
import masterSync from "./master-data-sync.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const source=fs.readFileSync(new URL("./card-file-export.js",import.meta.url),"utf8");
assert.match(html,/gscg-build" content="V\d{3}[^"]*"/);
assert.match(html,/V278-PNG-PDF-PACKAGE-20260823/);
assert.match(html,/card-file-export\.js/);
assert.match(html,/id="imageGlobalCard">IMAGEN GLOBAL/);
assert.match(html,/id="pdfGlobalCard">PDF GLOBAL/);
assert.match(html,/id="imagePersonalCard">IMAGEN PERSONAL/);
assert.match(html,/id="pdfPersonalCard">PDF PERSONAL/);
assert.match(html,/id="downloadAllCards">PDF TODAS/);
assert.match(html,/GSCCardFileExport\.shareImage/);
assert.match(html,/GSCCardFileExport\.downloadPdf/);
assert.match(html,/GSCCardFileExport\.downloadPackage\(all\.all/);
assert.match(html,/appVersion:"V307"/);
assert.equal(masterSync.APP_VERSION,"V283");

const holes=Object.fromEntries(Array.from({length:18},(_,index)=>{const hole=index+1,par=hole%3===0?3:hole%3===1?4:5;return[hole,{hole,par,gross:par,strokes:0,net:par,diff:0}]}));
const snapshot={roundId:"round-v278",status:"officially_closed",sha256:"c".repeat(64),version:1,course:"El Pulté",playedAt:"2026-08-23T12:00:00Z",players:[{id:"p1",name:"JAIME",handicap:0,tee:"Blanco",holes}]};
const cards=artifacts.build(snapshot),svg=fileExport.artifactSvg(cards.global);
assert.match(svg,/^<svg/);
assert.match(svg,/foreignObject/);
assert.match(svg,/MODALIDAD · MEDAL PLAY NORMAL/);
assert.match(svg,/background:#000/);
const dims=fileExport.dimensions(cards.personal[0]);
assert.equal(dims.width,1920);
assert.equal(dims.height,1080);
assert.match(svg,/width="7680"/,"La tarjeta exportable debe rasterizarse nativamente a 8K");
assert.match(svg,/data:image\/webp;base64/,"La tarjeta exportable debe llevar el logo oficial embebido, sin depender de red");
assert.doesNotMatch(cards.global.html,/<h2 class="score-card-title">SCORE CARD<\/h2>/,"El texto SCORE CARD no debe ocupar el lugar del logo");

const jpegA=new Uint8Array([0xff,0xd8,0xff,0xdb,0x00,0x43,0xff,0xd9]),jpegB=new Uint8Array([0xff,0xd8,0xff,0xd9]);
const pdf=fileExport.pdfBytes([{bytes:jpegA,width:1600,height:900},{bytes:jpegB,width:1600,height:1300}]),pdfText=new TextDecoder("latin1").decode(pdf);
assert.match(pdfText,/^%PDF-1\.4/);
assert.match(pdfText,/\/Type \/Pages \/Count 2/);
assert.equal((pdfText.match(/\/Subtype \/Image/g)||[]).length,2);
assert.equal((pdfText.match(/\/Filter \/DCTDecode/g)||[]).length,2);
assert.match(pdfText,/xref\n0 9/);
assert.match(pdfText,/%%EOF\n$/);

console.log("PASS V278 · imagen PNG, PDF individual y PDF conjunto desde las tarjetas oficiales General/Stableford");

assert.match(source,/async function renderFullHd\(item\)/,"R106-H9 must use native Full HD renderer");
assert.match(source,/canvas\.width=width;canvas\.height=height/,"El renderer debe usar las dimensiones 4K nativas");
assert.deepEqual(fileExport.renderDimensions(),{width:7680,height:4320});
assert.doesNotMatch(source,/IMAGE_FALLBACK_TIMEOUT|IMAGE_FALLBACK_FAILED/,"R106-H3 must not retain legacy fallback raster path");
assert.match(source,/const exportDimensions=\(\)=>\(\{width:7680,height:4320\}\)/,"PNG compartido debe entregarse en 8K exacto");
assert.deepEqual(fileExport.exportDimensions(),{width:7680,height:4320});
assert.match(source,/FINAL_PNG_LOGO_NOT_VISIBLE/,"El exportador debe bloquear cualquier PNG cuyo logo no sea físicamente visible");
assert.match(source,/FINAL_PNG_CARD_NOT_FILLED/,"El exportador debe bloquear cualquier PNG con tarjeta vacía o incompleta");
assert.match(source,/OFFICIAL_LOGO_PNG_REQUIRED/,"El raster final exige logo PNG embebido antes de dibujar");
assert.match(source,/async function png\(item\)\{const canvas=await canvasFor\(item\);assertRenderedCard\(canvas\);return canvasBlob\(canvas,"image\/png"\)\}/,"PNG final debe salir directamente del master 8K, sin segundo canvas ni reescalado");
assert.match(source,/ctx\.drawImage\(logo,80,64,1600,528\)/,"El logo oficial debe pintarse directamente sobre el canvas 8K final para evitar el fallo foreignObject de Safari/iOS");
assert.match(source,/box-sizing:border-box!important/,"El viewport 1920 debe incluir padding sin recorte ni reescalado accidental");

assert.match(source,/function trimCanvas\(canvas,margin=24\)/,"El recortador legado puede conservarse para compatibilidad, pero PNG no debe invocarlo");
assert.doesNotMatch(source,/async function png\(item\)[^\n]*trimCanvas/,"PNG no debe recortar ni reescalar el master 8K");
assert.match(source,/shape-rendering="geometricPrecision"/,"SVG 8K debe solicitar precisión geométrica");
assert.match(source,/text-rendering="geometricPrecision"/,"SVG 8K debe solicitar precisión tipográfica");

assert.deepEqual(fileExport.dimensions({mode:"match_play"}),{width:1920,height:1080});
assert.deepEqual(fileExport.dimensions({mode:"four_ball"}),{width:1920,height:1080});
assert.deepEqual(fileExport.dimensions({mode:"normal"}),{width:1920,height:1080});
