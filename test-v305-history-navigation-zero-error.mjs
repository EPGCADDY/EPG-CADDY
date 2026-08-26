import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root=path.dirname(new URL(import.meta.url).pathname);
const html=fs.readFileSync(path.join(root,"index-grupal.html"),"utf8");
const release=JSON.parse(fs.readFileSync(path.join(root,"mobile-release.json"),"utf8"));
const worker=fs.readFileSync(path.join(root,"service-worker.js"),"utf8");
const buttonText=id=>html.match(new RegExp(`id="${id}"[^>]*>([^<]+)<\\/button>`))?.[1]?.trim()||"";

assert.match(html,/gscg-build" content="V325-IDEAL-MICROPHONE-TIMINGS-20260826"/);
for(const id of ["openCardLibraryButton","openCardLibrarySetup","openCardLibraryStableford"]){
  assert.equal(buttonText(id),"HISTORIAL",`${id} debe usar el vocabulario común`);
}
assert.match(html,/<h1>HISTORIAL DE TARJETAS<\/h1>/);

const returnControls=[
  "backToRegistrationButton","closeFinalCard","cancelOfficialCorrection","closeCardLibrary",
  "closeHistoryInsights","cancelSetup","backSetup","backStablefordSetup",
  "cancelStablefordResult","closeAccountBackup","closeInstallApp"
];
for(const id of returnControls){
  assert.equal(buttonText(id),"ATRÁS",`${id} debe ser un ATRÁS visible y homogéneo`);
}
assert.equal(buttonText("cancelStablefordSetup"),"ATRÁS A LA RONDA");
for(const id of ["closeFinalCard","cancelOfficialCorrection","closeCardLibrary","closeHistoryInsights","cancelSetup","backSetup","backStablefordSetup","cancelStablefordSetup","cancelStablefordResult","closeAccountBackup","closeInstallApp"]){
  assert.match(html,new RegExp(`\\$\\("${id}"\\)[\\s\\S]{0,180}addEventListener\\("click"`),`${id} debe tener una ruta operativa`);
}
assert.match(html,/\.screen-back-row\{position:sticky;top:0;z-index:12;/);
assert.match(html,/\.screen-back-button\{[\s\S]*?min-height:44px[\s\S]*?border:1px solid var\(--lime\)/);

for(const id of ["accountBackupButton","accountBackupButtonSetup","accountBackupButtonStableford"]){
  assert.equal(buttonText(id),"REGÍSTRATE",`${id} debe decir REGÍSTRATE`);
  assert.match(html,new RegExp(`id="${id}"[^>]*data-account-entry`));
}
assert.doesNotMatch(html,/\.account-backup-button\{position:fixed/);
assert.match(html,/\.account-entry-control\{position:static;/);
assert.match(html,/document\.querySelectorAll\("\[data-account-entry\]"\)\.forEach\(button=>button\.addEventListener\("click",openCentralAccount\)\)/);
assert.match(html,/button\.textContent=signed\?"REGÍSTRATE ✓":"REGÍSTRATE"/);

assert.match(html,/stablefordSetupStatus"\)\.textContent=!stablefordSetupCourseKey\?"":!stablefordSetupCategory\?/);
assert.match(html,/if\(!GSCStableford\.isAllowedCourse\(stablefordSetupCourseKey\)\)return fail\("SELECCIONA EL CAMPO"\)/);

const retired=["BIBLIO","TECA"].join("");
const textExtensions=new Set([".html",".md",".mjs",".js",".json",".yml",".yaml"]);
function textFiles(directory){
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    if(entry.name===".git"||entry.name==="node_modules")return[];
    const target=path.join(directory,entry.name);
    if(entry.isDirectory())return textFiles(target);
    return textExtensions.has(path.extname(entry.name).toLowerCase())?[target]:[];
  });
}
for(const file of textFiles(root)){
  const source=fs.readFileSync(file,"utf8");
  assert.doesNotMatch(source,new RegExp(retired,"i"),`Vocabulario retirado en ${path.relative(root,file)}`);
}

assert.equal(release.buildNumber,307);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v325-ideal-microphone-timings"/);

console.log("PASS V305 · HISTORIAL, ATRÁS, REGÍSTRATE, Stableford limpio y cero vocabulario retirado");
