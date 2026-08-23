import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V(?:257-STABLEFORD-COURSE-SELECTOR-TITLE|258-STABLEFORD-READONLY-MANUAL-PLAN-B|259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS|260-STABLEFORD-ROUND-POINTS-PLAYER-RETURN|261-REGISTRATION-SIMPLIFIED-STABLEFORD-LABELS|262-REGISTRATION-MODALITIES|263-COMPACT-PLAYERS-BACK-BUTTON)-20260822/);
assert.match(html,/<h1 id="stablefordSetupTitle">RONDA STABLEFORD<\/h1>/);
assert.doesNotMatch(html,/NUEVA RONDA STABLEFORD|DATOS DE RONDA STABLEFORD/);
assert.match(html,/<select class="course-select" id="stablefordSetupCourse"[^>]*aria-hidden="true"[^>]*tabindex="-1"[^>]*>/);
assert.match(html,/#stablefordSetupCourse\{display:none!important\}/,"El selector técnico duplicado no debe ser visible");
for(const [key,label] of [["pulte","EL PULTÉ"],["country_club","COUNTRY CLUB"],["san_isidro","SAN ISIDRO"],["mayan_golf","MAYAN GOLF"]]){
  assert.match(html,new RegExp(`<option value="${key}">${label}<\\/option>`),`Falta opción operativa ${label}`);
}
assert.match(html,/\$\("stablefordSetupCourse"\)\.value=stablefordSetupCourseKey\|\|""/);
assert.match(html,/document\.querySelectorAll\("\[data-stableford-course\]"\)[\s\S]*selectStablefordSetupCourse\(button\.dataset\.stablefordCourse\)/);
assert.match(html,/function selectStablefordSetupCourse\(courseKey\)[\s\S]*GSCStableford\.isAllowedCourse\(courseKey\)[\s\S]*stablefordSetupCourseKey=courseKey[\s\S]*renderStablefordSetup\(\)/);

function extractFunction(name){
  const start=html.indexOf(`function ${name}(`);
  assert.notEqual(start,-1,`Falta función ${name}`);
  const bodyStart=html.indexOf("{",start);
  let depth=0;
  for(let i=bodyStart;i<html.length;i++){
    if(html[i]==="{")depth++;
    if(html[i]==="}"&&--depth===0)return html.slice(start,i+1);
  }
  throw new Error(`Función incompleta ${name}`);
}

function element(dataset={}){
  const classes=new Set();
  return {
    dataset,
    value:"",
    textContent:"",
    attributes:{},
    listeners:{},
    classList:{
      toggle(name,active){active?classes.add(name):classes.delete(name)},
      add(name){classes.add(name)},
      remove(name){classes.delete(name)},
      contains(name){return classes.has(name)}
    },
    setAttribute(name,value){this.attributes[name]=value},
    addEventListener(name,handler){this.listeners[name]=handler},
    dispatch(name,event={target:this}){assert.ok(this.listeners[name],`Falta listener ${name}`);this.listeners[name](event)}
  };
}

const keys=["pulte","country_club","san_isidro","mayan_golf"];
const courseButtons=keys.map(key=>element({stablefordCourse:key}));
const categoryButtons=[element({stablefordCategory:"senior"}),element({stablefordCategory:"super_senior"})];
const ui={
  stablefordSetupTitle:element(),
  stablefordSetupFacts:element(),
  stablefordSetupCourse:element(),
  stablefordSetupStatus:element(),
  cancelStablefordSetup:element()
};
const documentFixture={
  querySelectorAll(selector){
    if(selector==="[data-stableford-course]")return courseButtons;
    if(selector==="[data-stableford-category]")return categoryButtons;
    return [];
  }
};
const bindings=html.match(/document\.querySelectorAll\("\[data-stableford-course\]"\)\.forEach\(button=>button\.addEventListener\("click",\(\)=>selectStablefordSetupCourse\(button\.dataset\.stablefordCourse\)\)\);/)?.[0];
assert.ok(bindings,"Faltan enlaces operativos de los botones únicos de campo");
const runHarness=new Function("$","document","GSCStableford","COURSE_CATALOG","round","stablefordTeeLabel",`
  let stablefordSetupCategory=null,stablefordSetupCourseKey=null,draftCourse=null;
  const updateStablefordSetupValidity=()=>({ready:false});
  ${extractFunction("renderStablefordSetup")}
  ${extractFunction("selectStablefordSetupCourse")}
  ${bindings}
  return {state:()=>({stablefordSetupCourseKey,draftCourse}),renderStablefordSetup};
`);
const harness=runHarness(
  id=>ui[id],
  documentFixture,
  {isAllowedCourse:key=>keys.includes(key),categoryConfig:()=>null},
  Object.fromEntries(keys.map(key=>[key,{configured:true}])),
  {configured:false},
  ()=>"BLANCAS"
);

for(const key of keys){
  const button=courseButtons.find(item=>item.dataset.stablefordCourse===key);
  button.dispatch("click");
  assert.deepEqual(harness.state(),{stablefordSetupCourseKey:key,draftCourse:key});
  assert.equal(ui.stablefordSetupCourse.value,key);
  assert.equal(button.classList.contains("active"),true);
  assert.equal(button.attributes["aria-pressed"],"true");
  assert.equal(courseButtons.filter(item=>item.classList.contains("active")).length,1);
}
assert.equal(ui.stablefordSetupTitle.textContent,"RONDA STABLEFORD");

console.log("PASS V257/V267 · botones únicos de campo y título RONDA STABLEFORD");
