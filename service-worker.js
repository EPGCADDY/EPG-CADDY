"use strict";

const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry-v369-cross-env-tournament-scores-r178-admin-ownership-recovery-even-result-audio-r179-prod-tournament-codes-red-delete";
// Preserves the approved v407-r18-live-points-header behavior in this successor cache.
const ACTIVE_CACHE_NAME=`${CACHE_NAME}-active-r147-2-4-20-registration-return`;
const APPROVED_CACHE_NAME=`${CACHE_NAME}-approved-r147-2-4-20-registration-return`;
const RELEASE_FALLBACK="20261006-R179";
let RELEASE=RELEASE_FALLBACK;
const UPDATE_DIAGNOSTICS={stage:"boot",resources:{}};
async function fetchPublishedRelease(){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
  try{
    const response=await fetch("/release.json?sw_release_check="+Date.now(),{cache:"no-store",signal:controller.signal});
    if(response.ok){
      const data=await response.json();
      if(data?.release)RELEASE=String(data.release);
    }
  }catch{}finally{clearTimeout(timeout)}
  return RELEASE;
}
const OFFLINE_ENTRY="/index-grupal.html";
const SHELL=[
  "/score-entry-contract.js",
  OFFLINE_ENTRY,
  "/manifest.webmanifest",
  "/gsc-design-system.css",
  "/manual.html",
  "/stableford-torneo.html",
  "/live.html",
  "/manual-torneos.html",
  "/manual.webmanifest",
  "/manual-search.js",
  "/device-closures.js",
  "/golf-rules-offline.js¶»§q«^