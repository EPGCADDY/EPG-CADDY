import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('event-administration-ui.js','utf8');
const helpers=source.slice(source.indexOf('function administrationRows('),source.indexOf('function scoresHref('))+
  source.slice(source.indexOf('function scoresHref('),source.indexOf('let refreshSequence='));
const context=vm.createContext({
  cachedLocal:{source:'lab'},
  escape:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
});
vm.runInContext(helpers,context);

const rows=context.administrationRows(
  {ok:true,source:'lab',events:[
    {id:'lab-tour',name:'Torneo LAB',event_kind:'tournament',canAdminister:true},
    {id:'lab-group',name:'Grupo LAB',event_kind:'private',canAdminister:true},
  ]},
  {ok:true,events:[
    {id:'prod-tour',name:'Torneo Producción',event_kind:'tournament',source:'production',status:'active',joinCode:'ABC123'},
    {id:'prod-group',name:'Grupo Producción',event_kind:'private',source:'production',status:'active'},
    {id:'prod-finished',name:'Grupo finalizado',event_kind:'private',source:'production',status:'finished'},
  ],groups:[{id:'ordinary-round',group_label:'Ronda ordinaria',source:'production',event_kind:'private'}]},
);
assert.deepEqual(Array.from(rows,row=>row.id).sort(),['lab-group','lab-tour','prod-group','prod-tour']);
for(const event of rows){
  assert.match(context.administrationCard(event),/SCORES · GENERAL/);
  assert.match(context.administrationCard(event),/SCORES · CATEGORÍAS/);
  assert.match(context.administrationCard(event),/data-delete=/);
}
assert.match(context.administrationCard(rows.find(row=>row.id==='prod-tour')),/ABC123/);

assert.match(source,/JSON\.stringify\(\{action:'list',withCodes:true,includeGroups:true\}\)/,'directory request lists tournaments, rounds/groups and codes');
assert.match(source,/innerHTML='<h2>TORNEOS Y RONDAS<\/h2>'\+rows\.map\(e=>administrationCard\(e\)\)\.join\(''\)/);
assert.doesNotMatch(source,/RONDAS GLOBALES EN CURSO|globalRoundCard|removeRound|data-delete-round|ELIMINAR RONDA/);
assert.match(source,/NO HAY TORNEOS NI RONDAS ACTIVAS DISPONIBLES PARA TU CUENTA/);
console.log('PASS Administration lists tournaments and ordinary rounds/groups again; General, Categories, ID/share code, and delete controls retained.');
