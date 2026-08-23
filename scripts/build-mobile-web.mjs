import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const output=path.join(root,"mobile-www");
const apiOrigin=String(process.env.GSC_MOBILE_API_ORIGIN||"https://epg-caddy.vercel.app").replace(/\/$/,"");
const assets=[
  "manifest.webmanifest",
  "7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg",
  "assets/official-logos/golf-score-card-gt-pwa-192.png",
  "assets/official-logos/golf-score-card-gt-pwa-512.png",
  "assets/official-logos/golf-score-card-gt-apple-touch-180.png",
  "player-registry.js",
  "round-closure.js",
  "card-artifacts.js",
  "card-file-export.js",
  "card-library.js",
  "historical-analytics.js",
  "sync-queue.js",
  "master-data-sync.js",
  "account-backup.js",
  "commerce.js",
  "stableford.js",
  "round-navigation.js"
];

await fs.rm(output,{recursive:true,force:true});
await fs.mkdir(output,{recursive:true});
for(const relative of assets){
  const source=path.join(root,relative),target=path.join(output,relative);
  await fs.access(source).catch(()=>{throw new Error(`MOBILE_ASSET_MISSING:${relative}`)});
  await fs.mkdir(path.dirname(target),{recursive:true});
  await fs.copyFile(source,target);
}

let html=await fs.readFile(path.join(root,"index-grupal.html"),"utf8");
const anchor='<script src="./master-data-sync.js"></script>';
if(!html.includes(anchor))throw new Error("MOBILE_RUNTIME_ANCHOR_MISSING");
html=html.replace(anchor,`${anchor}<script src="./native-runtime.js"></script><script src="./commerce.js"></script>`);
await fs.writeFile(path.join(output,"index.html"),html);

await build({
  entryPoints:[path.join(root,"mobile/native-runtime-entry.js")],
  outfile:path.join(output,"native-runtime.js"),
  bundle:true,
  format:"iife",
  platform:"browser",
  target:["ios16","chrome109"],
  minify:true,
  legalComments:"none",
  define:{
    __GSC_API_ORIGIN__:JSON.stringify(apiOrigin),
    __GSC_REVENUECAT_IOS_PUBLIC_KEY__:JSON.stringify(String(process.env.GSC_REVENUECAT_IOS_PUBLIC_KEY||"")),
    __GSC_REVENUECAT_ANDROID_PUBLIC_KEY__:JSON.stringify(String(process.env.GSC_REVENUECAT_ANDROID_PUBLIC_KEY||"")),
    "process.env.NODE_ENV":JSON.stringify("production")
  }
});

console.log(`MOBILE_WEB_READY ${output}`);
