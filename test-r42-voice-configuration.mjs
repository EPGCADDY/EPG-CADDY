import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Actual R42 handler; auth and provider are simulated. This does not test
// microphone capture, voice identity, pronunciation, vocabulary or live latency.
const source = readFileSync(new URL('./api/voice-speech.js', import.meta.url), 'utf8')
  .replace(/^import .*cors.js";$/m, 'const handleAppPreflight=()=>false,isAllowedAppOrigin=()=>true;')
  .replace(/^import .*vercel-gateway-auth.js";$/m, 'const resolveGatewayToken=async()=>"test-token";');
const { default: handler } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const originalFetch = globalThis.fetch;
const originalInfo = console.info;
const requests = [];
globalThis.fetch = async (url, options) => {
  requests.push({ url, headers: options.headers, body: JSON.parse(options.body) });
  return { ok: true, status: 200, json: async () => ({ audio: Buffer.from('SIMULATED_AUDIO').toString('base64') }) };
};
try {
  console.info = () => {};
  for (let turn = 1; turn <= 100; turn++) {
    const res = {
      headers: {}, code: 200,
      setHeader(key, value) { this.headers[key] = value; },
      status(code) { this.code = code; return this; },
      json(body) { this.body = body; return this; },
      send(body) { this.body = body; return this; }
    };
    await handler({ method: 'POST', body: { text: `Respuesta del turno ${turn}.` } }, res);
    assert.equal(res.code, 200, `turn ${turn}`);
    assert.equal(res.body.toString(), 'SIMULATED_AUDIO');
    const request = requests.at(-1);
    assert.equal(request.headers['ai-model-id'], 'fish-audio/s2.1-pro-free');
    assert.equal(request.body.language, 'es-419');
    assert.equal(request.body.speed, 0.9);
    assert.equal(Object.hasOwn(request.body, 'voice'), false, 'R42 has no fixed speaker ID');
    assert.equal(res.headers['X-GSCG-Voice'], 's2.1-es-419');
  }
  assert.equal(requests.length, 100);
} finally {
  globalThis.fetch = originalFetch;
  console.info = originalInfo;
}
console.log('PASS: 100 simulated TTS turns preserve R42 model, es-419 and speed 0.90.');
console.log('NOT VERIFIED: microphone, audible identity, live provider, latency, universal answers.');
