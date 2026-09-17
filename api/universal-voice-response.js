import universalAnswer from './universal-ai.js';
import approvedSpeech from './voice-speech.js';

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
  const answer = captureResponse();
  await universalAnswer(req, answer);
  const answerReadyAt = Date.now();
  for (const [name, value] of Object.entries(answer.headers)) res.setHeader(name, value);
  res.status(answer.statusCode);
  const result = answer.body;
  const requestBody = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : req.body;
  const text = typeof result?.answer === 'string' ? result.answer.trim() : '';
  // Longer answers retain the approved client chunking and playback path.
  if (req.method !== 'POST' || answer.statusCode !== 200 || !result?.ok ||
      requestBody?.responseMode !== 'voice' || text.length < 2 || text.length >= 260) {
    return result === undefined ? res.end() : res.json(result);
  }
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-transform');
  res.write(JSON.stringify({ type: 'answer', result }) + '\n');
  res.flushHeaders?.();
  try {
    const speech = captureResponse();
    await approvedSpeech({ method: 'POST', headers: req.headers, body: { text, language: 'es-419' } }, speech);
    console.info('universal-voice-timing', JSON.stringify({ answerMs: answerReadyAt - startedAt,
      speechMs: Date.now() - answerReadyAt, totalMs: Date.now() - startedAt, speechStatus: speech.statusCode }));
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
