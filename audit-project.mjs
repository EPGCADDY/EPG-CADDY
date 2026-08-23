import {spawnSync} from 'node:child_process';

const checks=['test-player-registry.js','database/test-schema.mjs','database/test-player-profile-schema.mjs','database/test-master-data-platform-schema.mjs','test-no-automatic-x.mjs','test-course-catalog.mjs','test-country-club-official.mjs','test-v273-san-isidro-alta-vista.mjs','test-v274-complete-courses-voice-operations.mjs','test-v275-stable-live-voice-turns.mjs','test-v276-manual-hole-navigation.mjs','test-score-engine.mjs','test-round-closure.mjs','test-card-artifacts.mjs','test-historical-analytics.mjs','test-sync-queue.mjs','test-sync-api.mjs','test-sync-auth.mjs','test-master-data-sync.mjs','test-voice-continuity.mjs','test-v265-first-nine-automatic-result.mjs','test-v266-stableford-segment-gross-points.mjs','test-v267-one-operational-line.mjs','test-v267-scorecard-combination-matrix.mjs','test-v269-operational-matrix-demo.mjs','test-v270-consecutive-hole-voice-blocks.mjs','test-v271-realtime-prompt-limit.mjs','test-v272-definitive-operational-release.mjs','test-round-clock.mjs','test-round-information.mjs','test-stableford.mjs','test-stableford-ui.mjs','test-stableford-clean-roster-history.mjs','test-stableford-manual.mjs','test-v250-stableford-delivery-matrix.mjs','test-v252-stableford-persistence-category-course.mjs','test-v253-live-previous-round.mjs','test-v254-remove-registration-guide.mjs','test-v255-player-registration-boxes-codes.mjs','test-v256-master-data-platform.mjs','test-v257-stableford-course-selector-title.mjs','test-v258-stableford-readonly-manual-plan-b.mjs','test-v259-stableford-hide-unused-player-rows.mjs','test-v260-round-points-player-return.mjs','test-v261-registration-stableford-modality.mjs','test-v262-provisional-optional-profile.mjs','test-v263-compact-players-back-button.mjs','test-project-control-matrix.mjs','verify-manual-sync.mjs'];
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v277-official-round-corrections.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v278-card-image-pdf-export.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v279-local-card-library.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v280-local-history-insights.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v281-pwa-installation.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v282-optional-account-backup.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v283-native-commercial-readiness.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v284-native-package-generation.mjs');
for(const file of checks){
  const result=spawnSync(process.execPath,[file],{stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
console.log(`PASS auditoría maestra: ${checks.length} paquetes`);
