import fs from "node:fs";

const read=p=>fs.readFileSync(new URL("../"+p,import.meta.url),"utf8");
const app=read("index-grupal.html");
const manual=read("manual.html");
const liveHub=read("live-hub.html");
const auth=read("auth-gate.js");
const shortcuts=read("shortcuts-ui.js");
const cards=read("card-artifacts.js");
const fourBall=read("four-ball.js");

const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
const page=id=>{
  const m=manual.match(new RegExp('<section class="page(?: [^"]*)?" id="p'+id+'"[\\s\\S]*?<\\/section>'));
  return m?m[0]:"";
};

const pages={
 "01":["GOLF SCORE CARD GT","Bienvenido","CONTINUAR CON GOOGLE · EN CONFIGURACIÓN","CONTINUAR CON APPLE · PRÓXIMAMENTE","O ENTRA CON TU CORREO","Nombre · sólo al crear cuenta","Correo","Contraseña · mínimo 8 caracteres","INICIAR SESIÓN","CREAR CUENTA"],
 "03":["REGISTRO DE JUGADORES","DATO FALTANTE","CORREGIR","IGNORAR","SIN CATEGORÍA","PARA CAMBIAR MODALIDAD DESPUÉS DE REGISTRAR SCORES, INICIA UNA NUEVA RONDA"],
 "08":["RESULTADO FOUR BALL","TEAM ·","GROSS","NETO","GROSS TEAM","NETO TEAM","MEJOR NETO DEL TEAM"],
 "13":["TARJETA DE PUNTUACIÓN","YDS","HDCP","GROSS","NETO","+ / -","TARJETA DIGITAL","HISTORIAL","NUEVA RONDA","ATRÁS","BORRAR SCORES","BORRAR TODO"],
 "19":["AUDIO DE RESULTADOS","FRONT · 1 - 9","BACK · 10 - 18","TOTAL · 1 - 18"],
 "20":["MONITOR DE TIEMPO","INICIO","FINAL","TIMER","RESET"],
 "22":["TORNEOS","GENERAL","CATEGORÍAS","BUSCAR POR NOMBRE","MIS FAVORITOS"],
 "29":["TARJETA DIGITAL","COMPARTIR LIVE","FINALIZAR RONDA","ATRÁS","RONDA EN CURSO","SOLO CONSULTA"],
 "30":["TARJETA DIGITAL FINAL","COMPARTIR LIVE","FINALIZAR RONDA","ATRÁS","SOLO CONSULTA"],
 "33":["ABRIR GLOBAL","IMAGEN GLOBAL","PDF GLOBAL","CORREO / WHATSAPP GLOBAL"],
 "34":["ABRIR PERSONAL","IMAGEN PERSONAL","PDF PERSONAL","CORREO / WHATSAPP PERSONAL","PDF TODAS"],
 "36":["CORRECCIÓN OFICIAL","JUGADOR","HOYO","SCORE ACTUAL","NUEVO GROSS","MOTIVO","RESPONSABLE","GUARDAR CORRECCIÓN","ATRÁS"],
 "38":["HISTORIAL DE TARJETAS","TODAS LAS MODALIDADES","TODOS LOS CAMPOS","JUGADOR / TORNEO / FECHA","ANTERIOR","SIGUIENTE","ATRÁS"],
 "45":["VERIFICAR ACTUALIZACIÓN","ACTUALIZAR","ACTUALIZADO"],
 "49":["ATAJOS","MI SCORE CARD","CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MIS FAVORITOS","+ SEGUIR OTRO TORNEO","SALIR DE ESTE TORNEO","DEJAR DE SEGUIR MIS FAVORITOS"]
};

const sourceByPage={
 "01":auth,"03":app,"08":app,"13":app,"19":app,"20":app,"22":app+"\n"+liveHub,"29":app,"30":app,"33":app,"34":app,"36":app,"38":app,"45":app,"49":shortcuts
};

for(const [id,tokens] of Object.entries(pages)){
 const p=page(id);
 assert(Boolean(p),`P${id}: página ausente`);
 assert(p.includes('screen-replica'),`P${id}: réplica ausente`);
 for(const token of tokens){
   assert(p.includes(token),`P${id}: manual no contiene "${token}"`);
   assert(sourceByPage[id].includes(token),`P${id}: LAB no contiene "${token}"`);
 }
}

const forbidden=["MIC","MICRÓFONO","MICROFONO","REGISTRO POR VOZ","DICTADO","CADDIE UNIVERSAL","INTELIGENCIA ARTIFICIAL","CLIMA","GPS","WOLF","VEGAS","DOTS"];
const countWord=(s,w)=>{
 const e=w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const re=new RegExp("(^|[^a-záéíóúüñ0-9])"+e+"([^a-záéíóúüñ0-9]|$)","g");
 return (s.toLowerCase().match(re)||[]).length;
};
for(const word of forbidden) assert(countWord(manual,word)===0,`Manual contiene función retirada: ${word}`);

assert((manual.match(/class="page"/g)||[]).length===50,"Manual base debe conservar 50 páginas");
assert((manual.match(/class="page tutorial-page"/g)||[]).length===11,"Manual debe incluir 11 páginas tutorial R4");
assert(manual.includes('id="count">00 / 61</span>'),"Contador editorial debe marcar 61 páginas");
assert((manual.match(/class="screen-replica"/g)||[]).length===15,"Manual debe tener 15 réplicas clave");
assert(manual.includes("TUTORIAL TORNEOS · 01")&&manual.includes("TUTORIAL TORNEOS · 09")&&manual.includes("TUTORIAL VISUAL · 10 · PANTALLAS REALES"),"Capítulo tutorial R4 debe incluir torneos y pantallas reales");
assert(manual.includes("MIS FAVORITOS")&&manual.includes("REVISADO 100% · PLANTILLA ÚNICA"),"Capítulo tutorial R3 incompleto");
assert(manual.includes("ATAJOS siempre contigo")&&manual.includes("ATAJOS UNIVERSAL · LAB R3"),"Falta tutorial universal ATAJOS");
assert(page("60").includes("MANUAL_GOLF_SCORE_CARD_GT_IPHONE_01_INICIO_4K.png")&&page("60").includes("MANUAL_GOLF_SCORE_CARD_GT_IPHONE_02_REGISTRO_4K.png"),"P60 debe usar capturas reales de iPhone del repositorio");
assert(manual.includes("golf-score-card-gt-horizontal-original.webp"),"Las guías deben usar el logo horizontal original en ATAJOS");
assert(page("49").includes("/assets/official-logos/golf-score-card-gt-horizontal-original.webp")&&page("49").includes("logo horizontal original"),"P49 debe documentar el launcher ATAJOS con el logo horizontal original del repositorio");
assert(shortcuts.includes("/assets/official-logos/golf-score-card-gt-horizontal-original.webp")&&shortcuts.includes("<span>ATAJOS</span>"),"LAB debe usar el logo horizontal original del repositorio + etiqueta ATAJOS en el launcher universal");
assert(!shortcuts.includes("/assets/official-logos/golf-score-card-gt-pwa-v345-192.png"),"ATAJOS no debe usar el icono PWA cuadrado");
assert(app.includes('href="/manual"')&&app.includes(">GUÍA DE USUARIO</a>"),"GUÍA DE USUARIO debe apuntar a /manual");
assert(!page("41").includes("Cuenta opcional"),"P41 conserva la cuenta opcional retirada");
assert(page("41").includes("Cuenta personal"),"P41 debe documentar la cuenta personal");
assert(page("03").includes("CAMBIO DE MODALIDAD")&&app.includes("canChangeConfiguredRoundMode"),"P03 debe documentar cambio de modalidad únicamente antes de registrar scores");
assert(page("08").includes("TEAM ·")&&page("08").includes("GROSS TEAM")&&page("08").includes("NETO TEAM")&&!page("08").includes("TEAM 1"),"P08 debe documentar Four Ball con TEAM sin numeración y resumen actual");
assert(app.includes("TEAM · NETO")&&app.includes("function fourBallTeamLabel")&&!app.includes("return`TEAM ${teamIndex+1}"),"LAB Four Ball debe mostrar TEAM sin numeración visible");
assert(cards.includes("fourBallTeamLabel")&&cards.includes("<th>TEAM</th>")&&!cards.includes("TEAM 1")&&!cards.includes("TEAM 2")&&!cards.includes("TEAM 3"),"Tarjetas exportadas Four Ball deben usar TEAM + nombres sin numeración");
assert(!fourBall.includes('"TEAM 1"')&&!fourBall.includes('"TEAM 2"')&&!fourBall.includes('"TEAM 3"')&&fourBall.includes("TEAM${names.length?"),"Motor Four Ball debe producir TEAM + nombres sin numeración");
assert(!app.includes('pairName=["TEAM 1","TEAM 2","TEAM 3"]'),"Registro Four Ball no debe reintroducir TEAM numerado");

assert(app.includes('.mandatory-update{display:none;')&&app.includes('.mandatory-update.available{display:block}'),"ACTUALIZAR debe permanecer oculto cuando LAB está al día y mostrarse sólo cuando hay versión nueva");
assert(page("45").includes("control de actualización permanece oculto")&&page("45").includes("no debe quedar superpuesto"),"P45 debe documentar la visibilidad condicional de ACTUALIZAR");

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
console.log("61 pages · 50 base + 11 tutorial R4 · 15 replicas · pre-score mode edit · Four Ball TEAM unnumbered · universal Atajos · 0 retired features · current LAB controls matched");
