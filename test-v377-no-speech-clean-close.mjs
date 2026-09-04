import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

const start=html.indexOf("function scheduleBrowserVoiceFirstResultTimeout");
const end=html.indexOf("\nfunction browserVoiceCombinedTranscript",start);
assert.ok(start>0&&end>start,"Falta watchdog de primera voz");
const watchdog=html.slice(start,end);
assert.match(watchdog,/browser_fallback_no_result_timeout/);
assert.match(watchdog,/stopBrowserVoiceRecognitionSafely\(recognition,context\)/);
assert.doesNotMatch(watchdog,/RECUPERANDO MICRÓFONO|browser_fallback_retry_scheduled|browserVoiceRetryTimer|beginBrowserVoiceRecognition\(context,"transport"\)/);

const transport=html.slice(html.indexOf("function scheduleBrowserVoiceTransportRetry"),html.indexOf("\nfunction beginBrowserVoiceRecognition"));
assert.match(transport,/recoverableBrowserVoiceTransportError\(event\)/);
assert.doesNotMatch(transport,/no_speech/);
assert.match(worker,/v377-no-speech-clean-close/);
assert.match(audit,/test-v377-no-speech-clean-close\.mjs/);

console.log("PASS V377 · silencio cierra limpio y nunca entra en RECUPERANDO MICRÓFONO");
