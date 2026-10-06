(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root&&root.document)api.start()})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const STORAGE_KEY="golf-score-card-gt-live-hub-v1",POLL_MS=3000,DISPLAY_MS=10000,TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
  let state={version:2,generalToken:"",tournaments:[],follows:[]},general=null,generalRevision=null,generalStreams=new Map(),tournamentStreams=new Map(),externalStreams=new Map(),pendingImportToken="",timer=null,loading=false,categoryCardOpen=false,tournamentPortalOpen=false,registeredTournamentsOpen=false,enterExistingTournament=false,activeMonitor="general",pendingMonitor="overview",tournamentEntryOpen=false,displayTimer=null,displayCountdownTimer=null,displaySceneIndex=0;
  const expandedFavorites=new Set();
  let administrationEvents=[],directoryPartial=false;
  const ROUND_TOURNAMENTS_KEY="gsc-round-tournament-tokens-v1";
  function isRoundTournament(token){try{const values=JSON.parse(root.localStorage.getItem(ROUND_TOURNAMENTS_KEY)||"[]");return Array.isArray(values)&&values.includes(String(token))}catch{return false}}
  const $=id=>root&&root.document?root.document.getElementById(id):null;
  const text=(value,max=120)=>String(value==null?"":value).trim().replace(/\s+/g," ").slice(0,max);
  const escapeHtml=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#3¶»§q«^