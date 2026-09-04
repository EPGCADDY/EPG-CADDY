import {spawnSync} from 'node:child_process';

for(const [command,args] of [
  [process.execPath,['scripts/project-quality-gate.mjs']],
  [process.execPath,['Intocables/intocables-gate.mjs']],
  [process.execPath,['test-project-quality-gate.mjs']],
  ['python3',['scripts/manual-editorial-qc.py']],
  ['python3',['scripts/manual-visual-qc.py']]
]){
  const gate=spawnSync(command,args,{stdio:'inherit'});
  if(gate.status!==0)process.exit(gate.status||1);
}

const roadmapGate=spawnSync(process.execPath,['scripts/roadmap-gate.mjs'],{stdio:'inherit'});
if(roadmapGate.status!==0)process.exit(roadmapGate.status||1);

const inventoryGate=spawnSync(process.execPath,['scripts/inventory-gate.mjs'],{stdio:'inherit'});
if(inventoryGate.status!==0)process.exit(inventoryGate.status||1);

const checks=['test-player-registry.js','database/test-schema.mjs','database/test-player-profile-schema.mjs','database/test-master-data-platform-schema.mjs','test-no-automatic-x.mjs','test-course-catalog.mjs','test-country-club-official.mjs','test-v273-san-isidro-alta-vista.mjs','test-v274-complete-courses-voice-operations.mjs','test-v275-stable-live-voice-turns.mjs','test-v276-manual-hole-navigation.mjs','test-score-engine.mjs','test-round-closure.mjs','test-card-artifacts.mjs','test-historical-analytics.mjs','test-sync-queue.mjs','test-sync-api.mjs','test-sync-auth.mjs','test-master-data-sync.mjs','test-voice-continuity.mjs','test-v265-first-nine-automatic-result.mjs','test-v266-stableford-segment-gross-points.mjs','test-v267-one-operational-line.mjs','test-v267-scorecard-combination-matrix.mjs','test-v269-operational-matrix-demo.mjs','test-v270-consecutive-hole-voice-blocks.mjs','test-v271-realtime-prompt-limit.mjs','test-v272-definitive-operational-release.mjs','test-round-clock.mjs','test-round-information.mjs','test-stableford.mjs','test-stableford-ui.mjs','test-stableford-clean-roster-history.mjs','test-stableford-manual.mjs','test-v250-stableford-delivery-matrix.mjs','test-v252-stableford-persistence-category-course.mjs','test-v253-live-previous-round.mjs','test-v254-remove-registration-guide.mjs','test-v255-player-registration-boxes-codes.mjs','test-v256-master-data-platform.mjs','test-v257-stableford-course-selector-title.mjs','test-v258-stableford-readonly-manual-plan-b.mjs','test-v259-stableford-hide-unused-player-rows.mjs','test-v260-round-points-player-return.mjs','test-v261-registration-stableford-modality.mjs','test-v262-provisional-optional-profile.mjs','test-v263-compact-players-back-button.mjs','test-project-control-matrix.mjs','verify-manual-sync.mjs'];
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v277-official-round-corrections.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v278-card-image-pdf-export.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v279-local-card-library.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v280-local-history-insights.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v281-pwa-installation.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v282-optional-account-backup.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v283-native-commercial-readiness.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v284-native-package-generation.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v285-stableford-back-navigation.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v286-stableford-back-restores-home.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v287-stableford-back-controls-clear.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v289-stableford-new-round-empty.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v290-brand-icons-cleanup.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v304-homogeneous-registration-actions.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v305-history-navigation-zero-error.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v305-registration-guides-parser-truth.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v306-match-play.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v307-match-arrows-format.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v309-four-ball.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-neutral-match-home-link.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-manual-hosting.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-manual-semantic-coverage.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-manual-voice-map.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-manual-search.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-voice-assistant.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-timer-inactivity.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v311-live-support-link.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v312-general-caddie.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v320-universal-100-domains.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v321-ai-universal-infinity.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v322-real-sustained-caddie.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v323-long-multitopic-context.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v324-real-traffic.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v325-ideal-microphone-timings.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v326-no-silent-conversation.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v327-tool-followup-no-silence.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v328-official-golf-rules.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v328-offline-official-rules.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v335-response-caliber.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v336-microphone-transport.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v337-universal-weather.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v345-home-icons.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v329-skins.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v330-side-games.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v352-live.mjs','test-v353-live-hub.mjs','test-v354-voice-fallback.mjs','test-v355-ios-audio-dictation.mjs','test-v356-voice-only-cedar-quality.mjs','test-v356-traffic-weather-accuracy.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v357-ios-voice-transport-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v358-active-round-reopen.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v358-ios-score-universal-physical-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v359-ios-score-parser-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v357-synchronized-progressive-voice.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v361-synchronized-voice.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v362-physical-voice-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v364-vercel-oidc-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v363-recorded-mobile-behavior.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v363-intocables-behavior.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v364-explicit-new-round-entry.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v365-active-round-empty-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v366-principal-entry-recovery.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v367-universal-voice-in-place.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v368-canonical-home-entry.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v369-physical-voice-weather-traffic-recovery.mjs','test-v370-native-spanish-fast-close.mjs','test-v371-spanish-only-universal.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v373-server-voice-transcription.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v375-fast-universal-sensitive-score.mjs');
checks.splice(checks.indexOf('test-score-engine.mjs'),0,'test-v376-native-mic-first.mjs');
for(const file of checks){
  const result=spawnSync(process.execPath,[file],{stdio:'inherit'});
  if(result.status!==0)process.exit(result.status||1);
}
console.log(`PASS auditoría maestra: ${checks.length} paquetes`);
