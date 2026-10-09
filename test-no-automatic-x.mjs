import fs from 'node:fs';

const html=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
for(const forbidden of ['function markMissingScoresBefore','function markUnreportedPlayersOnHole','markMissingScoresBefore(checked.hole)','for(const h of holes)markMissingScoresBefore(h)','isOmittedScore(previous)&&segmentClosedForHole']){
  if(html.includes(forbidden))throw new Error(`Regresión de X automática: ${forbidden}`);
}
if(!html.includes('gscg-v155-automatic-x-repair'))throw new Error('Falta reparación V155 de X históricas');
if(!html.includes('if(isOmittedScore(p.holes[raw])){delete p.holes[raw];changed=true}'))throw new Error('La reparación V155 no elimina X inventadas');
console.log('PASS cero X automáticas y reparación V155');
