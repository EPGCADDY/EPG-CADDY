const SOURCE_URL = "https://raw.githubusercontent.com/EPGCADDY/EPG-CADDY/c8f0a4afb14e590a0b4f45981dc8efb9da21db56/index-grupal.html";

function replaceOnce(source, oldText, newText, label) {
  const first = source.indexOf(oldText);
  if (first < 0 || source.indexOf(oldText, first + oldText.length) >= 0) {
    throw new Error(`V96 anchor inválido: ${label}`);
  }
  return source.slice(0, first) + newText + source.slice(first + oldText.length);
}

function patchV96(source) {
  let s = source;
  s = replaceOnce(
    s,
    '<meta name="gscg-build" content="V94-ENDPOINT-GRUPAL-AISLADO-20260817">',
    '<meta name="gscg-build" content="V96-MIC-CONTEXT-ISOLATION-20260817">',
    "build"
  );

  s = replaceOnce(
    s,
`function closeSetup(){
  if(!round.configured)return;
  rosterEditMode=false;handicapRectificationMode=false;nameCorrectionMode=false;profileCorrectionMode=false;rosterAddMode=false;rosterEditJoinHole=1;
  resetSetupCapture();
  $("setupOverlay").classList.remove("visible");
  setVoice(false);
}function showStep1()`,
`function closeSetup(){
  if(!round.configured)return;
  if(listening)setVoice(false);
  if(activeResponseId||stopMonitorActive)stopAuthorizedSpeech();
  teardownRealtime();
  voiceContext="round";
  rosterEditMode=false;handicapRectificationMode=false;nameCorrectionMode=false;profileCorrectionMode=false;rosterAddMode=false;rosterEditJoinHole=1;
  resetSetupCapture();
  $("setupOverlay").classList.remove("visible");
}function showStep1()`,
    "closeSetup"
  );

  s = replaceOnce(
    s,
`function invalidateRealtimeForResume(){
  if(listening)setVoice(false);
  teardownRealtime();
  voiceContext=round.configured?"round":"setup";
}
function recoverRealtimeAfterResumeSync(){
  const hiddenFor=appHiddenAt?Date.now()-appHiddenAt:0;
  const returnedFromBackground=appWasBackgrounded||hiddenFor>=1500;
  const stale=realtimeLooksStale();
  appHiddenAt=0;appWasBackgrounded=false;
  if(returnedFromBackground){
    abortTransientCaptureForResume();
    invalidateRealtimeForResume();
  }else if(stale){
    invalidateRealtimeForResume();
  }
  if(round.configured)$("status").textContent=roundIdleStatus();
  else if(voiceContext==="setup")$("setupStatus").textContent=draftPlayers.length?"LISTO · PRESIONA OK PARA CONFIRMAR":"";
  return true;
}`,
`function invalidateRealtimeForResume(){
  if(listening)setVoice(false);
  teardownRealtime();
  const setupVisible=$("setupOverlay")?.classList?.contains?.("visible");
  voiceContext=setupVisible||!round.configured?"setup":"round";
}
function recoverRealtimeAfterResumeSync(){
  const hiddenFor=appHiddenAt?Date.now()-appHiddenAt:0;
  const returnedFromBackground=appWasBackgrounded||hiddenFor>=1500;
  const stale=realtimeLooksStale();
  appHiddenAt=0;appWasBackgrounded=false;
  if(returnedFromBackground){
    abortTransientCaptureForResume();
    invalidateRealtimeForResume();
  }else if(stale){
    invalidateRealtimeForResume();
  }
  const setupVisible=$("setupOverlay")?.classList?.contains?.("visible");
  if(setupVisible&&voiceContext==="setup")$("setupStatus").textContent=draftPlayers.length?"LISTO · PRESIONA OK PARA CONFIRMAR":"";
  else if(round.configured)$("status").textContent=roundIdleStatus();
  return true;
}`,
    "resume-context"
  );

  s = replaceOnce(
    s,
`  voiceActivationPromise=(async()=>{
    voiceContext=context;
    try{
      await ensureSession();`,
`  voiceActivationPromise=(async()=>{
    voiceContext=context;
    try{
      // Cada nueva activación arranca con transporte Realtime fresco.
      // teardownRealtime() es solo transporte: no borra captura/transcripción pendiente.
      teardownRealtime();
      voiceContext=context;
      setMicConnecting(context,true);
      await ensureSession();`,
    "fresh-transport"
  );

  s = replaceOnce(
    s,
`    }catch(err){
      console.error("Activación de micrófono:",err);
      teardownRealtime();
      voiceContext=context;
      setMicConnecting(context,false);
      if(context==="setup")$("setupStatus").textContent="ERROR";
      else $("status").textContent="ERROR";
      return false;
    }`,
`    }catch(err){
      console.error("Activación de micrófono:",err);
      const sameContext=voiceContext===context;
      teardownRealtime();
      setMicConnecting(context,false);
      if(sameContext){
        voiceContext=context;
        if(context==="setup")$("setupStatus").textContent="ERROR";
        else $("status").textContent="ERROR";
      }
      return false;
    }`,
    "activation-catch"
  );
  return s;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }
  try {
    const upstream = await fetch(SOURCE_URL, { cache: "no-store" });
    if (!upstream.ok) throw new Error(`Fuente grupal ${upstream.status}`);
    const html = patchV96(await upstream.text());
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.setHeader("X-GSCG-Preview-Build", "V96-MIC-CONTEXT-ISOLATION-20260817");
    if (req.method === "HEAD") return res.status(200).end();
    return res.status(200).send(html);
  } catch (error) {
    console.error("v96-preview error", error);
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).send("V96 preview unavailable");
  }
}
