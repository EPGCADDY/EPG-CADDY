import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8"),storage=new Map();
const context={localStorage:{getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,String(value))},demoControlManual:false,DEMO_CONTROL_MANUAL_ARCHIVE_KEY:"demo-archive",ROUND_ARCHIVE_KEY:"archive",normalizeStoredRound:value=>value,console};
vm.createContext(context);
for(const name of ["activeRoundArchiveKey","activeRoundArchiveDeletedKey","readRoundArchiveDeleted","readRoundArchive","archiveRoundSnapshot","deleteRoundFromArchive"]){
  const match=html.match(new RegExp(`function ${name}\\([^\\n]+`));
  if(!match)throw new Error(`Falta ${name}`);
  vm.runInContext(`${match[0]};this.${name}=${name}`,context);
}
const round={id:"round-delete-test",configured:true,provisional:false,players:[{id:"p1"}],createdAt:"2026-09-06T00:00:00.000Z"};
if(!context.archiveRoundSnapshot(round))throw new Error("No archivó fixture");
if(!context.deleteRoundFromArchive(round.id))throw new Error("No eliminó fixture");
if(context.readRoundArchive().some(item=>item.id===round.id))throw new Error("La ronda permanece en historial");
if(context.archiveRoundSnapshot(round)!==false)throw new Error("La ronda eliminada reapareció al persistir");
for(const required of ["pointerdown","650","openCardLibraryDelete","confirmCardLibraryDelete","CANCELAR","ELIMINAR"]){if(!html.includes(required))throw new Error(`Falta UI ${required}`)}
console.log("PASS V398 · pulsación prolongada, confirmación y borrado persistente del historial");
