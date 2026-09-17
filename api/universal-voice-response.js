import universalAnswer from './universal-ai.js';
import approvedSpeech from './voice-speech.js';
import {streamUniversalPcm} from './_lib/universal-pcm.js';

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
  const turnId=/^ptt_[0-9]{1,16}_[0-9]{1,8}$/.test(String(requestBody?.turnId||""))?requestBody.turnId:null;
  const synthesize = async text => {
    const speech = captureResponse(),speechStartedAt=Date.now();
    try { await approvedSpeech({ method: 'POST', headers: req.headers, body: { text, language: 'es-419' } }, speech); }
    catch { speech.statusCode=502; }
    return {speech,speechStartedAt};
  };
  const answer = captureResponse();
  await universalAnswer(req, answer);
  const answerReadyAt = Date.now();
  for (const [name, value] of Object.entries(answer.headers)) res.setHeader(name, value);
  res.status(answer.statusCode);
  const result = answer.body;
  const text = typeof result?.answer === 'string' ? result.answer.trim() : '';
  console.info('universal-answer-timing', JSON.stringify({ turnId, answerMs: answerReadyAt - startedAt,
    status: answer.statusCode, answerChars: text.length, mode: requestBody?.responseMode === 'voice' ? 'voice' : 'text' }));
  // One synthesis per complete answer: never splice independently generated speakers.
  if (req.method !== 'POST' || answer.statusCode !== 200 || !result?.ok ||
      requestBody?.responseMode !== 'voice' || text.length < 2 || text.length > 4000) {
    return result === undefined ? res.end() : res.json(result);
  }
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-transform');
  const speechText=text;
  const pcm=requestBody?.progressiveAudio===true;
  res.write(JSON.stringify({ type: 'answer', result, speechText, ...(pcm?{pcm:true}:{}) }) + '\n');
  res.flushHeaders?.();
  if(pcm){
    const controller=new AbortController(),abort=()=>controller.abort();
    const timeout=setTimeout(abort,22500);res.on?.('close',abort);
    let firstAudioMs=null;
    try{
      const delivery=await streamUniversalPcm(speechText,{signal:controller.signal,emit:record=>{
        if(res.destroyed||controller.signal.aborted)throw new Error('ABORTED');
        if(record.type==='audio_chunk'&&firstAudioMs===null)firstAudioMs=Date.now()-startedAt;
        res.write(JSON.stringify(record)+'\n');
      }});
      console.info('universal-pcm-timing',JSON.stringify({turnId,answerMs:answerReadyAt-startedAt,firstAudioMs,totalMs:Date.now()-startedAt,...delivery}));
    }catch{
      if(!res.destroyed)res.write(JSON.stringify({type:'audio_error',code:'UNIVERSAL_PCM_UNAVAILABLE'})+'\n');
    }finally{clearTimeout(timeout);res.off?.('close',abort);if(!res.destroyed)res.end()}
    return;
  }
  try {
    const {speech,speechStartedAt}=await synthesize(speechText);
    console.info('universal-voice-timing', JSON.stringify({ turnId, answerMs: answerReadyAt - startedAt,
      speechMs: Date.now() - speechStartedAt, speechStartedMs:speechStartedAt-startedAt,
      prefetched:false, singleAudio:true, audioAfterAnswerMs:Date.now()-answerReadyAt,
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
