import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const release=JSON.parse(await fs.readFile(path.join(root,"mobile-release.json"),"utf8"));
if(!/^\d+\.\d+\.\d+$/.test(release.versionName)||!Number.isInteger(release.buildNumber)||release.buildNumber<1)throw new Error("MOBILE_RELEASE_VERSION_INVALID");

async function configureIOS(){
  const file=path.join(root,"native/ios/App/App/Info.plist");
  let value;
  try{value=await fs.readFile(file,"utf8")}catch{return false}
  const entries=[];
  if(!value.includes("NSMicrophoneUsageDescription"))entries.push("\t<key>NSMicrophoneUsageDescription</key>\n\t<string>Golf Score Card GT necesita el micrófono para registrar scores por voz durante la ronda.</string>");
  if(!value.includes("WKAppBoundDomains"))entries.push("\t<key>WKAppBoundDomains</key>\n\t<array>\n\t\t<string>epg-caddy.vercel.app</string>\n\t</array>");
  if(!value.includes("ITSAppUsesNonExemptEncryption"))entries.push("\t<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>");
  if(entries.length){
    value=value.replace("</dict>",`${entries.join("\n")}\n</dict>`);
    await fs.writeFile(file,value);
  }
  const projectFile=path.join(root,"native/ios/App/App.xcodeproj/project.pbxproj");
  let project=await fs.readFile(projectFile,"utf8");
  project=project
    .replace(/MARKETING_VERSION = [^;]+;/g,`MARKETING_VERSION = ${release.versionName};`)
    .replace(/CURRENT_PROJECT_VERSION = [^;]+;/g,`CURRENT_PROJECT_VERSION = ${release.buildNumber};`);
  await fs.writeFile(projectFile,project);
  return true;
}

async function configureAndroid(){
  const file=path.join(root,"native/android/app/src/main/AndroidManifest.xml");
  let value;
  try{value=await fs.readFile(file,"utf8")}catch{return false}
  if(!value.includes("android.permission.RECORD_AUDIO"))value=value.replace(/(<manifest[^>]*>)/,`$1\n    <uses-permission android:name="android.permission.RECORD_AUDIO" />`);
  value=value.replace(/android:launchMode="(?:singleTask|singleInstance|singleInstancePerTask)"/g,'android:launchMode="singleTop"');
  if(!/android:launchMode=/.test(value))value=value.replace(/(<activity\b[^>]*android:name="\.MainActivity")/,`$1 android:launchMode="singleTop"`);
  await fs.writeFile(file,value);
  const gradleFile=path.join(root,"native/android/app/build.gradle");
  let gradle=await fs.readFile(gradleFile,"utf8");
  gradle=gradle
    .replace(/versionCode\s+\d+/,`versionCode ${release.buildNumber}`)
    .replace(/versionName\s+["'][^"']+["']/,`versionName "${release.versionName}"`);
  await fs.writeFile(gradleFile,gradle);
  return true;
}

const [ios,android]=await Promise.all([configureIOS(),configureAndroid()]);
console.log(`MOBILE_NATIVE_CONFIGURED ios=${ios} android=${android} version=${release.versionName} build=${release.buildNumber}`);
