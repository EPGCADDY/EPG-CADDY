import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import fs from "node:fs";
import {inflateSync} from "node:zlib";

const read=path=>fs.readFileSync(path);
const text=path=>read(path).toString("utf8");
const pngSize=path=>{
  const png=read(path);
  assert.equal(png.toString("ascii",1,4),"PNG",`${path} debe ser PNG`);
  assert.equal(png[25],2,`${path} debe ser RGB sin transparencia`);
  return [png.readUInt32BE(16),png.readUInt32BE(20)];
};
const sha=path=>createHash("sha256").update(read(path)).digest("hex");
const whiteRatio=path=>{
  const png=read(path);
  const width=png.readUInt32BE(16);
  const height=png.readUInt32BE(20);
  const idat=[];
  for(let offset=8;offset<png.length;){
    const length=png.readUInt32BE(offset);
    const type=png.toString("ascii",offset+4,offset+8);
    if(type==="IDAT")idat.push(png.subarray(offset+8,offset+8+length));
    offset+=12+length;
  }
  const raw=inflateSync(Buffer.concat(idat));
  const stride=width*3;
  let cursor=0;
  let previous=Buffer.alloc(stride);
  let white=0;
  const paeth=(a,b,c)=>{
    const p=a+b-c;
    const pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);
    return pa<=pb&&pa<=pc?a:pb<=pc?b:c;
  };
  for(let y=0;y<height;y+=1){
    const filter=raw[cursor++];
    const row=Buffer.alloc(stride);
    for(let x=0;x<stride;x+=1){
      const value=raw[cursor++];
      const left=x>=3?row[x-3]:0;
      const up=previous[x];
      const upperLeft=x>=3?previous[x-3]:0;
      const predictor=filter===0?0:filter===1?left:filter===2?up:filter===3?Math.floor((left+up)/2):paeth(left,up,upperLeft);
      row[x]=(value+predictor)&255;
    }
    for(let x=0;x<stride;x+=3)if(row[x]>240&&row[x+1]>240&&row[x+2]>240)white+=1;
    previous=row;
  }
  return white/(width*height);
};

const appHtml=text("index-grupal.html");
const manualHtml=text("manual.html");
const appManifest=JSON.parse(text("manifest.webmanifest"));
const manualManifest=JSON.parse(text("manual.webmanifest"));
const worker=text("service-worker.js");
const vercel=JSON.parse(text("vercel.json"));

const appIcons={
  touch:"assets/official-logos/golf-score-card-gt-apple-touch-v345-180.png",
  small:"assets/official-logos/golf-score-card-gt-pwa-v345-192.png",
  large:"assets/official-logos/golf-score-card-gt-pwa-v345-512.png"
};
const manualIcons={
  touch:"docs/manual/v311/manual-scg-apple-touch-v345-180.png",
  small:"docs/manual/v311/manual-scg-pwa-v345-192.png",
  large:"docs/manual/v311/manual-scg-pwa-v345-512.png"
};

assert.deepEqual(pngSize(appIcons.touch),[180,180]);
assert.deepEqual(pngSize(appIcons.small),[192,192]);
assert.deepEqual(pngSize(appIcons.large),[512,512]);
assert.deepEqual(pngSize(manualIcons.touch),[180,180]);
assert.deepEqual(pngSize(manualIcons.small),[192,192]);
assert.deepEqual(pngSize(manualIcons.large),[512,512]);
assert.notEqual(sha(appIcons.touch),sha(manualIcons.touch),"App y Manual deben tener iconos visualmente distintos");
assert.ok(whiteRatio(manualIcons.touch)<0.55,"El icono del Manual debe conservar un logo visible, no una miniatura casi blanca");

assert.match(appHtml,/gscg-home-icons" content="V345-DISTINCT-VERSIONED-HOME-ICONS-20260827"/);
assert.match(appHtml,/rel="icon" type="image\/png" sizes="192x192" href="\/assets\/official-logos\/golf-score-card-gt-pwa-v345-192\.png"/);
assert.match(appHtml,/rel="apple-touch-icon" sizes="180x180" href="\/assets\/official-logos\/golf-score-card-gt-apple-touch-v345-180\.png"/);
assert.match(manualHtml,/manual-home-icons" content="V345-DISTINCT-VERSIONED-HOME-ICONS-20260827"/);
assert.match(manualHtml,/rel="icon" type="image\/png" sizes="192x192" href="\/docs\/manual\/v311\/manual-scg-pwa-v345-192\.png"/);
assert.match(manualHtml,/rel="apple-touch-icon" sizes="180x180" href="\/docs\/manual\/v311\/manual-scg-apple-touch-v345-180\.png"/);
assert.doesNotMatch(manualHtml,/apple-touch-icon[^>]+manual-scg-escritorio-4k/);

assert.equal(appManifest.id,"/index-grupal.html");
assert.equal(manualManifest.id,"/manual-scg");
for(const [manifest,prefix] of [[appManifest,"/assets/official-logos/golf-score-card-gt-pwa-v345-"],[manualManifest,"/docs/manual/v311/manual-scg-pwa-v345-"]]){
  assert.ok(manifest.icons.some(icon=>icon.src===`${prefix}192.png`&&icon.sizes==="192x192"&&icon.purpose==="any"));
  assert.ok(manifest.icons.some(icon=>icon.src===`${prefix}512.png`&&icon.sizes==="512x512"&&icon.purpose==="any"));
}

for(const icon of [...Object.values(appIcons),...Object.values(manualIcons)]){
  assert.match(worker,new RegExp(icon.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
}
assert.ok(vercel.headers.some(rule=>rule.source==="/manual.webmanifest"&&rule.headers.some(header=>header.key==="Cache-Control"&&header.value.includes("no-cache"))));
assert.ok(vercel.headers.some(rule=>rule.source.includes("v345")&&rule.headers.some(header=>header.value.includes("immutable"))));

console.log("PASS V345: iconos visibles, distintos y versionados para Golf Score y Manual SCG");
