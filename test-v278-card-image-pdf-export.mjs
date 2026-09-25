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
assert.equal(dims.height,1280);
assert.match(svg,/width="1920"/,"La tarjeta MEDAL PLAY exportable debe conservar 1920 px de ancho nativo");
assert.match(svg,/golf-score-card-gt-horizontal-original\.webp/,"La tarjeta exportable debe conservar el logo oficial");
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
assert.match(source,/canvas\.width=width;canvas\.height=height/,"R106-H9 renderer must render natively at 1920×1080");
assert.doesNotMatch(source,/IMAGE_FALLBACK_TIMEOUT|IMAGE_FALLBACK_FAILED/,"R106-H3 must not retain legacy fallback raster path");
assert.match(source,/mode==="match_play"\|\|mode==="four_ball"\|\|mode==="normal"\|\|mode==="medal_play"/,"MEDAL PLAY, MATCH PLAY y FOUR BALL deben salir al raster nativo aprobado sin reescalado de recorte");

assert.match(source,/function trimCanvas\(canvas,margin=24\)/,"El exportador conserva render Full HD y recorta únicamente la salida PNG compartida");

assert.deepEqual(fileExport.dimensions({mode:"match_play"}),{width:1920,height:960});
assert.deepEqual(fileExport.dimensions({mode:"four_ball"}),{width:1920,height:960});
assert.deepEqual(fileExport.dimensions({mode:"normal"}),{width:1920,height:1280});
