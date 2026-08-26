import assert from "node:assert/strict";
import fs from "node:fs";
import artifacts from "./card-artifacts.js";
import fileExport from "./card-file-export.js";
import masterSync from "./master-data-sync.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/gscg-build" content="V330-R3-PHYSICAL-SINGLE-MODE-20260826"/);
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
assert.match(svg,/Tarjeta Global/);
assert.match(svg,/background:#000/);
assert.equal(fileExport.dimensions(cards.personal[0]).height,1300);

const jpegA=new Uint8Array([0xff,0xd8,0xff,0xdb,0x00,0x43,0xff,0xd9]),jpegB=new Uint8Array([0xff,0xd8,0xff,0xd9]);
const pdf=fileExport.pdfBytes([{bytes:jpegA,width:1600,height:900},{bytes:jpegB,width:1600,height:1300}]),pdfText=new TextDecoder("latin1").decode(pdf);
assert.match(pdfText,/^%PDF-1\.4/);
assert.match(pdfText,/\/Type \/Pages \/Count 2/);
assert.equal((pdfText.match(/\/Subtype \/Image/g)||[]).length,2);
assert.equal((pdfText.match(/\/Filter \/DCTDecode/g)||[]).length,2);
assert.match(pdfText,/xref\n0 9/);
assert.match(pdfText,/%%EOF\n$/);

console.log("PASS V278 · imagen PNG, PDF individual y PDF conjunto desde las tarjetas oficiales General/Stableford");
