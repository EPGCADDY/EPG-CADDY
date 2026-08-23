import assert from "node:assert/strict";
import fs from "node:fs";

const read=path=>fs.readFileSync(new URL(path,import.meta.url),"utf8");
const html=read("./index-grupal.html");
const accountBackup=read("./account-backup.js");
const accountApi=read("./api/account.js");
const accountAuth=read("./api/_lib/account-auth.js");
const backupApi=read("./api/backup.js");
const syncApi=read("./api/sync.js");
const sessionApi=read("./api/session-grupal.js");
const cors=read("./api/_lib/cors.js");
const mobileBuild=read("./scripts/build-mobile-web.mjs");
const nativeConfig=JSON.parse(read("./capacitor.config.json"));
const packageJson=JSON.parse(read("./package.json"));

assert.match(html,/V287-STABLEFORD-BACK-CONTROLS-CLEAR-20260823/);
assert.match(html,/V283-CAPACITOR-REVENUECAT-READY-20260823/);
assert.match(html,/id="commercialProButton"/);
assert.match(html,/window\.gscgApiUrl/);
assert.match(html,/fetch\(window\.gscgApiUrl\("\/api\/sync"\)/);
assert.match(html,/fetch\(window\.gscgApiUrl\("\/api\/session-grupal"\)/);
assert.match(html,/!window\.GSC_NATIVE_PLATFORM&&"serviceWorker"/);
assert.match(accountBackup,/credentials:"include"/);
assert.match(accountBackup,/GSC_API_ORIGIN/);

assert.equal(nativeConfig.appId,"com.epgcaddy.app");
assert.equal(nativeConfig.appName,"Golf Score Card GT");
assert.equal(nativeConfig.webDir,"mobile-www");
assert.equal(nativeConfig.ios.path,"native/ios");
assert.equal(nativeConfig.android.path,"native/android");
assert.equal(nativeConfig.plugins.CapacitorCookies.enabled,true);
assert.equal(nativeConfig.plugins.CapacitorHttp.enabled,true);
for(const dependency of ["@capacitor/core","@capacitor/ios","@capacitor/android","@revenuecat/purchases-capacitor","@revenuecat/purchases-capacitor-ui"])assert.ok(packageJson.dependencies[dependency],dependency);
for(const script of ["mobile:web","mobile:add:ios","mobile:add:android","mobile:sync","mobile:assets"])assert.ok(packageJson.scripts[script],script);
assert.match(mobileBuild,/7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2\.jpeg/);
assert.match(mobileBuild,/native-runtime\.js/);
assert.match(mobileBuild,/GSC_REVENUECAT_IOS_PUBLIC_KEY/);
assert.match(mobileBuild,/GSC_REVENUECAT_ANDROID_PUBLIC_KEY/);

for(const source of [accountApi,backupApi,syncApi,sessionApi])assert.match(source,/handleAppPreflight/);
assert.match(cors,/capacitor:\/\/localhost/);
assert.match(cors,/Access-Control-Allow-Credentials/);
assert.match(accountAuth,/SameSite=/);
assert.match(accountAuth,/native\?"None":"Lax"/);

globalThis.GSC_NATIVE_PLATFORM="ios";
globalThis.GSC_COMMERCE_CONFIG={iosApiKey:"appl_test_public_key"};
globalThis.GSC_NATIVE_PURCHASES={
  configure:async()=>{},
  getCustomerInfo:async()=>({customerInfo:{entitlements:{active:{gscg_pro:{identifier:"gscg_pro"}}}}}),
  logIn:async()=>({customerInfo:{entitlements:{active:{gscg_pro:{identifier:"gscg_pro"}}}}}),
  logOut:async()=>({customerInfo:{entitlements:{active:{}}}}),
  restorePurchases:async()=>({customerInfo:{entitlements:{active:{gscg_pro:{identifier:"gscg_pro"}}}}})
};
globalThis.GSC_NATIVE_PAYWALL={presentPaywall:async()=>({result:"PURCHASED"})};
const commerce=(await import("./commerce.js")).default;
const configured=await commerce.configure({appUserID:"account-1"});
assert.equal(configured.available,true);
assert.equal(configured.entitlementActive,true);
assert.equal(commerce.ENTITLEMENT_ID,"gscg_pro");
assert.equal(commerce.PRODUCT_IDS.annual,"gscg_pro_annual");
assert.equal((await commerce.presentPaywall()).paywallResult,"PURCHASED");
assert.equal((await commerce.restore()).restored,true);

console.log("PASS V283 · preparación nativa iOS/Android y monetización comercial");
