import fs from "node:fs";

const read=p=>fs.readFileSync(new URL("../"+p,import.meta.url),"utf8");
const app=read("index-grupal.html");
const manual=read("manual.html");
const live=read("live-control.js");

const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
const page=id=>{
  const m=manual.match(new RegExp('<section class="page" id="p'+id+'"[\\s\\S]*?<\\/section>'));
  return m?m[0]:"";
};

const pages={
 "03":["REGISTRO DE JUGADORES","DATO FALTANTE","CORREGIR","IGNORAR","SIN CATEGORÍA"],
 "13":["TARJETA DE PUNTUACIÓN","YDS","HDCP","GROSS","NETO","+ / -","TARJETA DIGITAL","HISTORIAL","NUEVA RONDA","ATRÁS","BORRAR SCORES","BORRAR TODO"],
 "19":["AUDIO DE RESULTADOS","FRONT · 1 - 9","BACK · 10 - 18","TOTAL · 1 - 18"],
 "20":["MONITOR DE TIEMPO","INICIO","FINAL","TIMER","RESET"],
 "22":["TORNEOS","GENERAL","CATEGORÍAS","BUSCAR POR NOMBRE","ARMAR MI TABLERO","MI TABLERO"],
 "29":["TARJETA DIGITAL","COMPARTIR LIVE","FINALIZAR RONDA","ATRÁS","RONDA EN CURSO","SOLO CONSULTA"],
 "30":["TARJETA DIGITAL FINAL","COMPARTIR LIVE","FINALIZAR RONDA","ATRÁS","SOLO CONSULTA"],
 "33":["ABRIR GLOBAL","IMAGEN GLOBAL","PDF GLOBAL","CORREO / WHATSAPP GLOBAL"],
 "34":["ABRIR PERSONAL","IMAGEN PERSONAL","PDF PERSONAL","CORREO / WHATSAPP PERSONAL","PDF TODAS"],
 "36":["CORRECCIÓN OFICIAL","JUGADOR","HOYO","SCORE ACTUAL","NUEVO GROSS","MOTIVO","RESPONSABLE","GUARDAR CORRECCIÓN","ATRÁS"],
 "38":["HISTORIAL DE TARJETAS","TODAS LAS MODALIDADES","TODOS LOS CAMPOS","JUGADOR / TORNEO / FECHA","ANTERIOR","SIGUIENTE","ATRÁS"]
};

const sourceByPage={
 "03":app,"13":app,"19":app,"20":app,"22":app+"\n"+live,"29":app,"30":app,"33":app,"34":app,"36":app,"38":app
};

for(const [id,tokens] of Object.entries(pages)){
 const p=page(id);
 assert(Boolean(p),`P${id}: página ausente`);
 assert(p.includes('screen-replica'),`P${id}: réplica ausente`);
 for(const token of tokens){
   assert(p.includes(token),`P${id}: manual no contiene "${token}"`);
   assert(sourceByPage[id].includes(token),`P${id}: producción no contiene "${token}"`);
 }
}

const forbidden=["MIC","MICRÓFONO","MICROFONO","REGISTRO POR VOZ","DICTADO","CADDIE UNIVERSAL","INTELIGENCIA ARTIFICIAL","CLIMA","GPS","WOLF","VEGAS","DOTS"];
const countWord=(s,w)=>{
 const e=w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const re=new RegExp("(^|[^a-záéíóúüñ0-9])"+e+"([^a-záéíóúüñ0-9]|$)","g");
 return (s.toLowerCase().match(re)||[]).length;
};
for(const word of forbidden) assert(countWord(manual,word)===0,`Manual contiene función retirada: ${word}`);

assert((manual.match(/class="page"/g)||[]).length===50,"Manual debe tener 50 páginas");
assert((manual.match(/class="screen-replica"/g)||[]).length===11,"Manual debe tener 11 réplicas clave");
assert(app.includes('href="/manual"')&&app.includes(">GUÍA DE USUARIO</a>"),"GUÍA DE USUARIO debe apuntar a /manual");

const cssContracts=[
 ["registro","#p03 .screen-replica","min-height:52px"],
 ["audio","#p19 .screen-replica","min-height:58px"],
 ["tiempo","#p20 .screen-replica","min-height:48px"],
 ["live","#p22 .screen-replica","min-height:42px"],
 ["tarjeta-final","#p30 .screen-replica","font-size:24px"],
 ["historial","#p38 .screen-replica","min-height:52px"]
];
for(const [name,selector,needle] of cssContracts){
 assert(manual.includes(selector)&&manual.includes(needle),`Contrato visual ausente: ${name}`);
}

if(fail.length){
 console.error("MANUAL SCREEN PARITY: FAIL");
 for(const item of fail) console.error("- "+item);
 process.exit(1);
}
console.log("MANUAL SCREEN PARITY: PASS");
console.log("50 pages · 11 replicas · 0 retired features · current production controls matched");
