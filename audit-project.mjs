import {spawnSync} from 'node:child_process';

const checks=['test-player-registry.js','database/test-schema.mjs','test-no-automatic-x.mjs','test-course-catalog.mjs','test-country-club-official.mjs','test-score-engine.mjs','test-round-closure.mjs','test-card-artifacts.mjs','test-historical-analytics.mjs','test-sync-queue.mjs','test-sync-api.mjs','test-voice-continuity.mjs','test-round-clock.mjs','test-round-information.mjs','test-stableford.mjs','test-stableford-ui.mjs','test-stableford-clean-roster-history.mjs','test-stableford-manual.mjs','test-v250-stableford-delivery-matrix.mjs','test-v252-stableford-persistence-category-course.mjs','test-v253-live-previous-round.mjs','verify-manual-sync.mjs'];
for(const file of checks){
  const result=spawnSync(process.execPath,[file],{stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
console.log(`PASS auditoría maestra: ${checks.length} paquetes`);
