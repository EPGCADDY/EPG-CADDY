import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const npmCommand=process.platform==="win32"?"npm.cmd":"npm";
const npxCommand=process.platform==="win32"?"npx.cmd":"npx";

function run(command,args){
  console.log(`MOBILE_RUN ${command} ${args.join(" ")}`);
  const result=spawnSync(command,args,{cwd:root,stdio:"inherit",env:process.env});
  if(result.error)throw result.error;
  if(result.status!==0)throw new Error(`MOBILE_COMMAND_FAILED ${command} ${args.join(" ")} exit=${result.status}`);
}

function exists(relativePath){
  return fs.existsSync(path.join(root,relativePath));
}

run(npmCommand,["run","mobile:web"]);
if(!exists("native/ios/App"))run(npxCommand,["cap","add","ios"]);
if(!exists("native/android/app"))run(npxCommand,["cap","add","android"]);
run(npxCommand,["cap","sync"]);
run(npmCommand,["run","mobile:configure"]);
run(npmCommand,["run","mobile:assets"]);

const required=[
  "mobile-www/index.html",
  "mobile-www/native-runtime.js",
  "mobile-www/commerce.js",
  "native/ios/App/App.xcodeproj/project.pbxproj",
  "native/ios/App/App/Info.plist",
  "native/android/app/build.gradle",
  "native/android/app/src/main/AndroidManifest.xml"
];
const missing=required.filter(relativePath=>!exists(relativePath));
if(missing.length)throw new Error(`MOBILE_PACKAGE_INCOMPLETE ${missing.join(",")}`);

const html=await fsp.readFile(path.join(root,"mobile-www/index.html"),"utf8");
const build=html.match(/<meta name="gscg-build" content="([^"]+)"/)?.[1]||"unknown";
const readiness={
  appId:"com.epgcaddy.app",
  appName:"Golf Score Card GT",
  build,
  generatedAt:new Date().toISOString(),
  platforms:["ios","android"],
  monetization:"revenuecat-ready",
  signing:"pending-store-accounts"
};
await fsp.writeFile(path.join(root,"mobile-www/native-readiness.json"),`${JSON.stringify(readiness,null,2)}\n`);
console.log(`MOBILE_NATIVE_PACKAGE_READY build=${build} ios=true android=true monetization=revenuecat-ready`);
