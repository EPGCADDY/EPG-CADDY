import universalAnswer from './universal-ai.js';
import approvedSpeech from './voice-speech.js';
import { firstUniversalSpeechChunk } from './_lib/universal-response-stream.js';

export const config = { maxDuration: 60 };

// Compose the existing, authorized handlers. No new provider or voice policy.
function captureResponse() {
  return {
    statusCode: 200, headers: {}, body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    send(body) { this.body = body; return this; },
    end(body) { this.body = body; return this; }
  };
}

export default async function handler(req, res) {
  const startedAt = Date.now();
  const requestBody = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : req.body;
  const synthesize = async text => {
    const speech = captureResponse(),speechStartedAt=Date.now();
    try { await approvedSpeech({ method: 'POST', headers: req.headers, body: { text, language: 'es-419' } }, speech); }
    catch { speech.statusCode=502; }
    return {speech,speechStartedAt};
  };
  let prefix='',prefetched=null;
  const answerRequest=Object.create(req);
  if(req.method==='POST'&&requestBody?.responseMode==='voice')answerRequest.onUniversalTextDelta=delta=>{
    if(prefetched||res.destroyed)return;
    prefix=(prefix+delta).slice(0,8000);
    if(prefix.trim().length<300)return;
    const text=firstUniversalSpeechChunk(prefix.trim());
    if(text.length>240)return;
    prefetched={text,promise:synthesize(text)};
  };
  const answer = captureResponse();
  await universalAnswer(answerRequest, answer);
  const answerReadyAt = Date.now();
  for (const [name, value] of Object.entries(answer.headers)) res.setHeader(name, value);
  res.status(answer.statusCode);
  const result = answer.body;
  const text = typeof result?.answer === 'string' ? result.answer.trim() : '';
  console.info('universal-answer-timing', JSON.stringify({ answerMs: answerReadyAt - startedAt,
    status: answer.statusCode, answerChars: text.length, mode: requestBody?.responseMode === 'voice' ? 'voice' : 'text' }));
  // Send the full verified answer; only reuse audio that exactly matches its first fragment.
  if (req.method !== 'POST' || answer.statusCode !== 200 || !result?.ok ||
      requestBody?.responseMode !== 'voice' || text.length < 2) {
    return result === undefined ? res.end() : res.json(result);
  }
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-transform');
  const speechText=firstUniversalSpeechChunk(text);
  res.write(JSON.stringify({ type: 'answer', result, speechText }) + '\n');
  res.flushHeaders?.();
  try {
    const reused=!!prefetched&&prefetched.text===speechText;
    const {speech,speechStartedAt}=await (reused?prefetched.promise:synthesize(speechText));
    console.info('universal-voice-timing', JSON.stringify({ answerMs: answerReadyAt - startedAt,
      speechMs: Date.now() - speechStartedAt, speechStartedMs:speechStartedAt-startedAt,
      prefetched:reused, audioAfterAnswerMs:Date.now()-answerReadyAt,
      totalMs: Date.now() - startedAt, speechStatus: speech.statusCode }));
    if (res.destroyed) return;
    if (speech.statusCode !== 200 || !Buffer.isBuffer(speech.body) || !speech.body.length) {
      res.write(JSON.stringify({ type: 'audio', ok: false, status: speech.statusCode }) + '\n');
    } else {
      res.write(JSON.stringify({ type: 'audio', ok: true, audio: speech.body.toString('base64'),
        voice: speech.headers['x-gscg-voice'], mimeType: 'audio/mpeg' }) + '\n');
    }
  } catch {
    if (!res.destroyed) res.write(JSON.stringify({ type: 'audio', ok: false, status: 502 }) + '\n');
  } finally {
    if (!res.destroyed) res.end();
  }
}
