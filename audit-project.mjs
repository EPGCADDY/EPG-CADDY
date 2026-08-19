import {spawnSync} from 'node:child_process';

const checks=['test-player-registry.js','database/test-schema.mjs','test-no-automatic-x.mjs','test-course-catalog.mjs','test-score-engine.mjs','test-round-closure.mjs','test-card-artifacts.mjs','test-voice-continuity.mjs','test-round-clock.mjs','verify-manual-sync.mjs'];
for(const file of checks){
  const result=spawnSync(process.execPath,[file],{stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
console.log(`PASS auditoría maestra: ${checks.length} paquetes`);
