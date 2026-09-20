import fs from "node:fs";

const read=p=>fs.readFileSync(new URL("../"+p,import.meta.url),"utf8");
const app=read("index-grupal.html");
const manual=read("manual.html");
const liveHub=read("live-hub.html");
const auth=read("auth-gate.js");
const shortcuts=read("shortcuts-ui.js");

const fail=[];
const assert=(ok,msg)=>{if(!ok)fail.push(msg)};
const page=id=>{
  const m=manual.match(new RegExp('<section class="page(?: [^"]*)?" id="p'+id+'"[\\s\\S]*?<\\/section>'));
  return m?m[0]:"";
};

const pages={
 "01":["GOLF SCORE CARD GT","Bienvenido","CONTINUAR CON GOOGLE · EN CONFIGURACIÓN","CONTINUAR CON APPLE · PRÓXIMAMENTE","O ENTRA CON TU CORREO","Nombre · sólo al crear cuenta","Correo","Contraseña · mínimo 8 caracteres","INICIAR SESIÓN","CREAR CUENTA"],
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
 "38":["HISTORIAL DE TARJETAS","TODAS LAS MODALIDADES","TODOS LOS CAMPOS","JUGADOR / TORNEO / FECHA","ANTERIOR","SIGUIENTE","ATRÁS"],
 "45":["VERIFICAR ACTUALIZACIÓN","ACTUALIZAR","ACTUALIZADO"],
 "49":["ATAJOS","MI SCORE CARD","CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MI TABLERO","+ SEGUIR OTRO TORNEO","SALIR DE ESTE TORNEO","DEJAR DE SEGUIR MI TABLERO"]
};

const sourceByPage={
 "01":auth,"03":app,"13":app,"19":app,"20":app,"22":app+"\n"+liveHub,"29":app,"30":app,"33":app,"34":app,"36":app,"38":app,"45":app,"49":shortcuts
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

const tutorialPages={
 "50":["ÍNDICE DE TORNEOS","8 TUTORIALES","Abrir Atajos","Ir al Centro de Torneos","Elegir un torneo","Ver General","Categorías y jugadores","Mis Favoritos","Gestionar Mis Favoritos","Volver a mi Score Card"],
 "51":["TUTORIAL TORNEOS · 01","Abrir Atajos","ATAJOS","MI SCORE CARD","CENTRO DE TORNEOS"],
 "52":["TUTORIAL TORNEOS · 02","Ir al Centro de Torneos","ATAJOS","CENTRO DE TORNEOS"],
 "53":["TUTORIAL TORNEOS · 03","Elegir un torneo","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MIS FAVORITOS"],
 "54":["TUTORIAL TORNEOS · 04","Ver General","GENERAL","ATAJOS"],
 "55":["TUTORIAL TORNEOS · 05","Buscar categorías y jugadores","CATEGORÍAS","BUSCAR JUGADOR","SEGUIR"],
 "56":["TUTORIAL TORNEOS · 06","Abrir Mis Favoritos","MIS FAVORITOS","JUGADORES","GRUPOS"],
 "57":["TUTORIAL TORNEOS · 07","Gestionar Mis Favoritos","SEGUIR","DEJAR DE SEGUIR"],
 "58":["TUTORIAL TORNEOS · 08","Volver a mi Score Card","ATAJOS","MI SCORE CARD"]
};
for(const [id,tokens] of Object.entries(tutorialPages)){
 const p=page(id);
 assert(Boolean(p),`P${id}: tutorial ausente`);
 assert(p.includes('tutorial-page'),`P${id}: plantilla tutorial R2 ausente`);
 for(const token of tokens) assert(p.includes(token),`P${id}: tutorial no contiene "${token}"`);
 assert(p.includes("MATRIZ TÉCNICA DE REVISIÓN"),`P${id}: matriz técnica ausente`);
 assert(p.includes("REVISADO 100% · PLANTILLA ÚNICA"),`P${id}: certificación R2 ausente`);
}

const forbidden=["MIC","MICRÓFONO","MICROFONO","REGISTRO POR VOZ","DICTADO","CADDIE UNIVERSAL","INTELIGENCIA ARTIFICIAL","CLIMA","GPS","WOLF","VEGAS","DOTS"];
const countWord=(s,w)=>{
 const e=w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 const re=new RegExp("(^|[^a-záéíóúüñ0-9])"+e+"([^a-záéíóúüñ0-9]|$)","g");
 return (s.toLowerCase().match(re)||[]).length;
};
for(const word of forbidden) assert(countWord(manual,word)===0,`Manual contiene función retirada: ${word}`);

assert((manual.match(/class="page(?: [^"]*)?"/g)||[]).length===59,"Manual debe tener 59 páginas");
assert((manual.match(/class="screen-replica"/g)||[]).length===14,"Manual debe tener 14 réplicas clave");
assert((manual.match(/class="page tutorial-page"/g)||[]).length===9,"Manual debe tener 9 páginas tutorial R2");
assert(manual.includes('id="count">00 / 59</span>'),"Contador editorial debe marcar 59 páginas");
assert(app.includes('href="/manual"')&&app.includes(">GUÍA DE USUARIO</a>"),"GUÍA DE USUARIO debe apuntar a /manual");
assert(!page("41").includes("Cuenta opcional"),"P41 conserva la cuenta opcional retirada");
assert(page("41").includes("Cuenta personal"),"P41 debe documentar la cuenta personal");

assert(app.includes('.mandatory-update{display:none;')&&app.includes('.mandatory-update.available{display:block}'),"ACTUALIZAR debe permanecer oculto cuando LAB está al día y mostrarse sólo cuando hay versión nueva");
assert(page("45").includes("control de actualización permanece oculto")&&page("45").includes("no debe quedar superpuesto"),"P45 debe documentar la visibilidad condicional de ACTUALIZAR");

const cssContracts=[
 ["registro","#p03 .screen-replica","min-height:52px"],
 ["audio","#p19 .screen-replica","min-height:58px"],
 ["tiempo","#p20 .screen-replica","min-height:48px"],
 ["live","#p22 .screen-replica","min-height:42px"],
 ["tarjeta-final","#p30 .screen-replica","font-size:24px"],
 ["historial","#p38 .screen-replica","min-height:52px"],
 ["tutorial-r2",".tutorial-page h1","--tut-h1:44px"]
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
console.log("59 pages · 14 replicas · 9 tutorial pages R2 · 0 retired features · current LAB controls matched");
