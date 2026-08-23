import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/name="gscg-hotfix" content="V264-PREVIOUS-ROUND-RESPONSIVE-NAMES-20260823"/);

// RONDA PREVIA remains present in every configured scorecard. If the device has
// no prior round yet, it stays visible but disabled instead of disappearing.
assert.match(html,/setPreviousRoundControl\("previousRoundButton",main,round\.configured,true\)/);
assert.match(html,/!visible\|\|\(!showWhenUnavailable&&!state\.available\)/);
assert.match(html,/control\.disabled=!state\.available/);
assert.match(html,/control\.setAttribute\("aria-disabled",String\(!state\.available\)\)/);

const controlSource=html.slice(
  html.indexOf("function setPreviousRoundControl"),
  html.indexOf("function renderPreviousRoundControls")
);
const makeControl=()=>({
  textContent:"",
  disabled:false,
  attributes:{},
  hidden:false,
  classList:{toggle(name,value){if(name==="hidden")this.owner.hidden=value},owner:null},
  setAttribute(name,value){this.attributes[name]=value}
});
const visibleWithoutHistory=makeControl();
visibleWithoutHistory.classList.owner=visibleWithoutHistory;
const renderControl=new Function("$",`${controlSource};return (state,visible,showWhenUnavailable)=>setPreviousRoundControl("previousRoundButton",state,visible,showWhenUnavailable)`)(()=>visibleWithoutHistory);
renderControl({label:"RONDA PREVIA",available:false},true,true);
assert.equal(visibleWithoutHistory.hidden,false);
assert.equal(visibleWithoutHistory.disabled,true);
assert.equal(visibleWithoutHistory.textContent,"RONDA PREVIA");
assert.equal(visibleWithoutHistory.attributes["aria-disabled"],"true");

const visibleWithHistory=makeControl();
visibleWithHistory.classList.owner=visibleWithHistory;
const renderActiveControl=new Function("$",`${controlSource};return (state,visible,showWhenUnavailable)=>setPreviousRoundControl("previousRoundButton",state,visible,showWhenUnavailable)`)(()=>visibleWithHistory);
renderActiveControl({label:"RONDA PREVIA",available:true},true,true);
assert.equal(visibleWithHistory.hidden,false);
assert.equal(visibleWithHistory.disabled,false);

// Hole 10 repeats the player alias in a narrow mobile cell. Seven-letter names
// such as EDUARDO and longer aliases receive deterministic fit classes.
assert.match(html,/if\(length>=9\)return" alias-very-long"/);
assert.match(html,/if\(length>=7\)return" alias-long"/);
assert.match(html,/@media\(max-width:800px\)\{[\s\S]*?\.scorecard \.yds10-name\.alias-long\{font-size:6px;letter-spacing:-\.3px\}[\s\S]*?\.scorecard \.yds10-name\.alias-very-long\{font-size:4\.9px;letter-spacing:-\.4px\}/);

const aliasSource=html.slice(
  html.indexOf("function playerHole10Label"),
  html.indexOf("function yds10NameSafe")
);
const classify=new Function("round","canonicalPlayerNameKey",`${aliasSource};return name=>playerHole10AliasClass({name}).trim()`)(
  {players:[]},
  value=>String(value||"").trim().toUpperCase()
);
assert.equal(classify("JAIME"),"long-alias");
assert.equal(classify("EDUARDO"),"alias-long");
assert.equal(classify("CHRISTIAN"),"alias-very-long");

console.log("PASS V264 · RONDA PREVIA siempre visible y nombres completos en la celda móvil del hoyo 10");
