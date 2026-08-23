import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const source=path.join(root,"7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg");
const assets=path.join(root,"assets");
await fs.access(source).catch(()=>{throw new Error("OFFICIAL_LOGO_MISSING")});
await fs.mkdir(assets,{recursive:true});
await sharp(source)
  .resize(1024,1024,{fit:"contain",background:{r:0,g:0,b:0,alpha:1}})
  .flatten({background:"#000000"})
  .png({compressionLevel:9})
  .toFile(path.join(assets,"logo.png"));
console.log("MOBILE_OFFICIAL_ASSET_READY assets/logo.png 1024x1024");
