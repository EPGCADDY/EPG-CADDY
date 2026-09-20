// LAB-only profile: microphone/AI contracts were retired by owner's 2026-09-19 instruction.
// This does not certify iPhone speech or visual acceptance and must not promote main.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const html=fs.readFileSync('index-grupal.html','utf8');
assert(!/getUserMedia|SpeechRecognition|MediaRecorder|\/api\/(?:universal-ai|voice-|session|research|golf-rules)/.test(html),'Mic/AI entry remains');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))if(m[1].trim())new vm.Script(m[1]);
for(const m of html.matchAll(/<script\b[^>]*src="\.\/([^"?]+)/gi))assert(fs.existsSync(m[1]),`Missing script ${m[1]}`);
for(const file of ['device-closures.js','service-worker.js','auth-gate.js'])new vm.Script(fs.readFileSync(file,'utf8'));
for(const test of ['test-owner-invitation-ui.mjs','test-manual-no-assistant.mjs','test-manual-startup-sharing.mjs','test-device-closures.mjs','test-score-engine.mjs','test-round-closure.mjs','test-player-registry.js','test-stableford.mjs','test-stableford-manual.mjs','test-v398-manual-opening-hole.mjs','test-v306-match-play.mjs','test-v309-four-ball.mjs','test-v329-skins.mjs','test-lab-account-gate.mjs','test-lab-user-shortcuts.mjs','test-lab-shortcuts-navigation.mjs'])execFileSync(process.execPath,[test],{stdio:'inherit'});
console.log('PASS LAB manual technical profile; account + shortcuts guards active; visual/device acceptance remains separate');
