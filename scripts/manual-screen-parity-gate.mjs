import fs from "node:fs";
const read=p=>fs.readFileSync(new URL("../"+p,import.meta.url),"utf8");
const manual=read("manual.html");
const app=read("index-grupal.html");
const hub=read("live-hub.html");
const shortcuts=read("shortcuts-ui.js");
const cards=read("card-artifacts.js");
const fourBall=read("four-ball.js");
const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
const hasWord=(s,w)=>new RegExp("(^|[^a-záéíóúüñ0-9])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"([^a-záéíóúüñ0-9]|$)","i").test(s);
assert(manual.includes('id="portada"')&&manual.includes("/docs/manual/layout/page-00.png"),"Falta portada gráfica original");
assert(manual.indexOf('id="portada"')<manual.indexOf('id="indice"'),"La portada debe aparecer antes del índice");
assert(manual.includes('id="indice"')&&manual.includes("Toca cualquier tema para saltar directamente"),"Falta índice general clickable");
assert((manual.match(/href="#[^"]+"/g)||[]).length>=50,"Índice/navegación insuficiente");
assert((manual.match(/<section class="sheet(?: |")/g)||[]).length===74,"Debe haber exactamente 74 hojas vigentes: 51 base + 9 pantallas actuales + 10 Torneos + 4 pantallas reales LAB");
assert(manual.includes("/docs/manual/layout/page-03.png")&&manual.includes("/docs/manual/layout/page-45.png"),"Faltan hojas originales vigentes");
for(const p of [68,70,72]) assert(manual.includes("/docs/manual/layout/page-"+String(p).padStart(2,"0")+".png"),"Falta hoja original vigente page-"+p);
const current=["/docs/manual/current/CAMPO_MODALIDAD_REAL.webp","/docs/manual/current/REGISTRO_ATAJOS_REAL.webp","/docs/manual/current/SCORECARD_CONTROL_REAL.webp","/docs/manual/current/FOURBALL_ATAJOS_REAL.webp"];
for(const img of current) assert(manual.includes(img),"Falta pantalla real LAB: "+img);
const mountedCurrent=[
 "/docs/manual/current/APP_CATEGORIAS_OFICIALES.png",
 "/docs/manual/current/APP_CAMPEONATO_SCORECARD.png",
 "/docs/manual/current/APP_SCORECARD_ATAJOS.png",
 "/docs/manual/current/APP_ATAJOS_OVERLAY.png",
 "/docs/manual/current/APP_TARJETA_FINAL_ATAJOS.png",
 "/docs/manual/current/APP_CORRECCION_ATAJOS.png",
 "/docs/manual/current/APP_HISTORIAL_ATAJOS.png",
 "/docs/manual/current/APP_TORNEOS_HUB.png",
 "/docs/manual/current/APP_TORNEOS_ATAJOS.png"
];
for(const img of mountedCurrent) assert(manual.includes(img),"Falta pantalla física actual montada en manual: "+img);
for(const token of ["CAMPEONATO","SUPER SENIOR","PANTALLA PÚBLICA","AUDIO DE RESULTADOS","FRONT · 1 - 9","BACK · 10 - 18","TOTAL · 1 - 18","TARJETA DIGITAL FINAL","ABRIR GLOBAL","PDF GLOBAL","PDF TODAS","CORREGIR RONDA","HISTORIAL DE TARJETAS"]) {
  assert(app.includes(token)||hub.includes(token),"LAB actual no contiene control esperado: "+token);
}
assert(manual.includes("/docs/manual/current/MONITOR_TIEMPO_REAL_LAB.png"),"Falta captura física vigente del Monitor de Tiempo");
assert(manual.includes("/docs/manual/current/OPERACION_RONDA_INFERIOR_REAL_LAB.png"),"Falta captura física de la zona operativa inferior");
for(const token of ["AUDIO DE RESULTADOS","FRONT · 1 - 9","BACK · 10 - 18","TOTAL · 1 - 18","GROSS IN","GROSS OUT","GROSS TOTAL","NETO TOTAL","+/- NETO","TARJETA DIGITAL","HISTORIAL","NUEVA RONDA","ATRÁS","BORRAR SCORES","BORRAR TODO"]) assert(manual.includes(token),"Zona operativa inferior incompleta en manual: "+token);
assert(manual.includes('id="tiempo"')&&manual.includes('id="zona-operativa"'),"Faltan hojas vigentes de Monitor de Tiempo / zona operativa");
for(const token of ["INICIO","FINAL","TIMER","RESET","HH:MM:SS","pausar","reanudar","sin borrar jugadores ni scores"]) assert(manual.includes(token),"Monitor de Tiempo incompleto en manual: "+token);
assert(app.includes('id="roundTimerToggle"')&&app.includes('aria-label="Pausar o reanudar timer"'),"LAB debe mantener TIMER pulsable para pausar/reanudar");
assert(app.includes('id="resetClockButton"')&&app.includes("¿CONFIRMAS REINICIAR EL CRONÓMETRO A 00:00:00?"),"LAB debe mantener RESET con confirmación");
for(const id of ["torneos","torneos-01","torneos-02","torneos-03","torneos-04","torneos-05","torneos-06","torneos-07","torneos-08","torneos-09"]) assert(manual.includes('id="'+id+'"'),"Falta hoja del capítulo Torneos: "+id);
for(const token of ["CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MIS FAVORITOS","ATAJOS siempre contigo"]) assert(manual.includes(token),"Capítulo Torneos incompleto: "+token);
for(const removed of ["REGISTRO POR VOZ","DICTADO","CADDIE UNIVERSAL","INTELIGENCIA ARTIFICIAL","CLIMA","GPS","WOLF","VEGAS","DOTS"]) assert(!hasWord(manual,removed),"El manual reintroduce función retirada: "+removed);
for(const removed of ["MIC","MICRÓFONO","MICROFONO"]) assert(!hasWord(manual,removed),"El manual reintroduce control de micrófono retirado: "+removed);
assert(!manual.includes("/docs/manual/layout/page-20.png"),"No debe reintroducir Scores por voz");
for(let p=46;p<=67;p++) assert(!manual.includes("/docs/manual/layout/page-"+String(p).padStart(2,"0")+".png"),"No debe reintroducir hoja retirada page-"+p);
assert(app.includes("shortcuts-ui.js"),"Score Card debe cargar ATAJOS");
assert(hub.includes("shortcuts-ui.js"),"Torneos debe cargar ATAJOS");
for(const t of ["MI SCORE CARD","CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MIS FAVORITOS"]) assert(shortcuts.includes(t),"ATAJOS incompleto: "+t);
assert(manual.includes("Registro de jugadores + ATAJOS")&&manual.includes("Four Ball corregido + ATAJOS"),"Las pantallas reales deben documentar ATAJOS");
assert(cards.includes("fourBallTeamLabel")&&!cards.includes("TEAM 1")&&!cards.includes("TEAM 2")&&!cards.includes("TEAM 3"),"Tarjetas Four Ball no deben reintroducir TEAM numerado");
assert(!fourBall.includes('"TEAM 1"')&&!fourBall.includes('"TEAM 2"')&&!fourBall.includes('"TEAM 3"'),"Motor Four Ball no debe reintroducir TEAM numerado");
if(fail.length){console.error("MANUAL ORIGINAL PARITY: FAIL");for(const item of fail) console.error("- "+item);process.exit(1);}
console.log("MANUAL ORIGINAL PARITY: PASS");
console.log("Portada original → índice clickable → 74 hojas vigentes · 50 originales + Monitor de Tiempo + 10 Torneos + 4 pantallas reales LAB · 0 funciones retiradas");
