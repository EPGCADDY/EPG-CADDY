import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const source=path.join(root,"7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg");
const assets=path.join(root,"assets");
const official=path.join(assets,"official-logos");
await fs.access(source).catch(()=>{throw new Error("OFFICIAL_LOGO_MISSING")});
await fs.mkdir(assets,{recursive:true});
await fs.mkdir(official,{recursive:true});
await fs.copyFile(source,path.join(official,"golf-score-card-gt-official-master-1254.jpeg"));

const pngTargets=[
  [path.join(assets,"logo.png"),1024],
  [path.join(official,"golf-score-card-gt-app-store-1024.png"),1024],
  [path.join(official,"golf-score-card-gt-google-play-512.png"),512],
  [path.join(official,"golf-score-card-gt-pwa-512.png"),512],
  [path.join(official,"golf-score-card-gt-pwa-192.png"),192],
  [path.join(official,"golf-score-card-gt-apple-touch-180.png"),180]
];
for(const [target,size] of pngTargets){
  await sharp(source)
    .resize(size,size,{fit:"contain",background:{r:0,g:0,b:0,alpha:1}})
    .flatten({background:"#000000"})
    .png({compressionLevel:9})
    .toFile(target);
}
console.log("MOBILE_OFFICIAL_ASSETS_READY app-store=1024 google-play=512 pwa=512,192 apple-touch=180");
