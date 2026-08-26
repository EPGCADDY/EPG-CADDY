import assert from "node:assert/strict";
import fs from "node:fs";

const read=file=>fs.readFileSync(file,"utf8");
const packageJson=JSON.parse(read("package.json"));
const prepare=read("scripts/prepare-native-release.mjs");
const configure=read("scripts/configure-native-projects.mjs");
const workflow=read(".github/workflows/mobile-native-package.yml");
const html=read("index-grupal.html");
const worker=read("service-worker.js");
const release=JSON.parse(read("mobile-release.json"));

assert.equal(packageJson.scripts["mobile:prepare"],"node scripts/prepare-native-release.mjs");
assert.match(prepare,/cap","add","ios/);
assert.match(prepare,/cap","add","android/);
assert.match(prepare,/cap","sync/);
assert.match(prepare,/mobile:configure/);
assert.match(prepare,/mobile:assets/);
assert.match(prepare,/native\/ios\/App\/App\.xcodeproj\/project\.pbxproj/);
assert.match(prepare,/native\/android\/app\/build\.gradle/);
assert.match(prepare,/revenuecat-ready/);
assert.match(configure,/MARKETING_VERSION/);
assert.match(configure,/CURRENT_PROJECT_VERSION/);
assert.match(configure,/versionCode/);
assert.match(configure,/versionName/);
assert.equal(release.versionName,"0.9.0");
assert.equal(release.buildNumber,307);
assert.match(workflow,/runs-on: macos-latest/);
assert.match(workflow,/npm run mobile:prepare/);
assert.match(workflow,/\.\/gradlew bundleRelease/);
assert.match(workflow,/xcodebuild/);
assert.match(workflow,/actions\/upload-artifact@v4/);
assert.match(workflow,/golf-score-card-gt-native-unsigned/);
assert.match(html,/V290-GOLF-SCORE-CARD-GT-BRAND-ICONS-CLEANUP-20260823/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v325-ideal-microphone-timings"/);

console.log("PASS V284 · paquetes nativos reproducibles para Xcode y Android Studio");
