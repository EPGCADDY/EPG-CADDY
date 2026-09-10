"use strict";

(function installApprovedVoice(global){
  const STORAGE_KEY="gscg.approved.female.voice-uri.v1";
  const LATIN_SPANISH=/^es-(419|MX|GT|US)/i;
  const SPANISH=/^es(?:-|$)/i;

  function voices(){return global.speechSynthesis?.getVoices?.()||[]}
  function storedUri(){try{return String(global.localStorage?.getItem(STORAGE_KEY)||"")}catch{return""}}
  function remember(voice){try{if(voice?.voiceURI)global.localStorage?.setItem(STORAGE_KEY,String(voice.voiceURI))}catch{}return voice||null}
  function select(list=voices()){
    const available=Array.from(list||[]),saved=storedUri();
    if(saved){const exact=available.find(voice=>String(voice.voiceURI||"")===saved);if(exact)return exact}
    return remember(available.find(voice=>LATIN_SPANISH.test(String(voice.lang||"")))||available.find(voice=>SPANISH.test(String(voice.lang||"")))||null);
  }
  function wait(timeoutMs=1600){
    const first=select();if(first)return Promise.resolve(first);
    if(!global.speechSynthesis)return Promise.resolve(null);
    return new Promise(resolve=>{let done=false,timer;const finish=()=>{if(done)return;done=true;clearTimeout(timer);global.speechSynthesis.removeEventListener?.("voiceschanged",probe);resolve(select())};const probe=()=>{if(select())finish()};global.speechSynthesis.addEventListener?.("voiceschanged",probe);global.speechSynthesis.getVoices?.();timer=setTimeout(finish,timeoutMs)});
  }
  global.GSCApprovedVoice=Object.freeze({STORAGE_KEY,select,wait});
})(window);
