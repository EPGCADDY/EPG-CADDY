import {execFileSync} from 'node:child_process';
execFileSync('sh',['-c',"SKIP_MANUAL_PNG=1 python3 scripts/rebuild-manual-bets-live-data.py 19 20 21 && python3 scripts/rebuild-inventory-pdfs.py && node audit-project.mjs && node scripts/build-r34-voice-review.mjs && node scripts/run-engine-100-isolation.mjs"],{stdio:'inherit'});
execFileSync(process.execPath,['test-r35-weather-location.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/run-r36-targeted.mjs'],{stdio:'inherit'});

execFileSync(process.execPath,['scripts/run-r36-audio-sequential.mjs'],{stdio:'inherit'});
