(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCPlayerRegistry=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const SCHEMA_VERSION=3;
  const DELIVERY_PREFERENCES=new Set(["email","whatsapp","both","none"]);
  const DELIVERY_STATES=new Set(["NOT_AUTHORIZED","NO_DESTINATION","PENDING","PREPARED","SENDING","DELIVERED","FAILED","CANCELLED"]);
  const TEE_KEYS=new Set(["Negro","Azul","Blanco","Rojo","Amarillo"]);

  function text(value){return String(value??"").trim()}
  function keyForName(value){return text(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim()}
  function normalizeEmail(value){const email=text(value).toLowerCase();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:""}
  function normalizeCountryCode(value){const digits=String(value??"").replace(/\D/g,"");return digits||"502"}
  function normalizeNationalNumber(value,countryCode="502"){
    let digits=String(value??"").replace(/\D/g,"");
    const cc=normalizeCountryCode(countryCode);
    if(digits.startsWith(cc)&&digits.length>8)digits=digits.slice(cc.length);
    return digits.slice(0,15);
  }
  function normalizeRegistrationCode(value){return text(value).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,7)}
  function normalizeHandicap(value){if(value===null||value===undefined||text(value)==="")return null;const n=Number(value);return Number.isInteger(n)&&n>=0&&n<=54?n:null}
  function normalizeTee(value){const q=text(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");const aliases={negro:"Negro",negra:"Negro",negros:"Negro",negras:"Negro",azul:"Azul",azules:"Azul",blanco:"Blanco",blanca:"Blanco",blancos:"Blanco",blancas:"Blanco",rojo:"Rojo",roja:"Rojo",rojos:"Rojo",rojas:"Rojo",amarillo:"Amarillo",amarilla:"Amarillo",amarillos:"Amarillo",amarillas:"Amarillo"};const tee=aliases[q]||text(value);return TEE_KEYS.has(tee)?tee:null}
  function stableId(name,legacyId){return text(legacyId)||`player_${keyForName(name).replace(/\s+/g,"_")||"unknown"}`}
  function unique(values){return [...new Set((values||[]).map(text).filter(Boolean))]}
  function hashCode(value){let hash=2166136261;for(const char of String(value||"player")){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
  function generateRegistrationCode(seed,taken=[]){
    const used=new Set(Array.from(taken||[]).map(normalizeRegistrationCode).filter(Boolean));
    const base=keyForName(seed)||"player";
    for(let attempt=0;attempt<1000;attempt++){
      const body=hashCode(`${base}:${attempt}`).toString(36).toUpperCase().padStart(6,"0").slice(-6);
      const code=`G${body}`;
      if(!used.has(code))return code;
    }
    throw new Error("PLAYER_CODE_EXHAUSTED");
  }
  function normalizeConsent(value){
    const active=value?.active===true;
    return{
      active,
      grantedAt:active?text(value?.grantedAt)||null:text(value?.grantedAt)||null,
      withdrawnAt:active?null:text(value?.withdrawnAt)||null,
      scope:active?text(value?.scope)||"round-cards":text(value?.scope)||null,
      policyVersion:active?text(value?.policyVersion)||null:text(value?.policyVersion)||null
    };
  }
  function normalizeDelivery(value){
    const state=DELIVERY_STATES.has(value?.state)?value.state:"NOT_AUTHORIZED";
    return{state,channel:text(value?.channel)||null,providerMessageId:text(value?.providerMessageId)||null,attemptedAt:text(value?.attemptedAt)||null,deliveredAt:text(value?.deliveredAt)||null,error:text(value?.error)||null};
  }
  function normalizeProfileEvent(value,index=0){
    const countryCode=normalizeCountryCode(value?.whatsapp?.countryCode||value?.countryCode||"502");
    const nationalNumber=normalizeNationalNumber(value?.whatsapp?.nationalNumber||value?.whatsappNationalNumber||value?.whatsapp||"",countryCode);
    return{
      id:text(value?.id)||`profile_event_${index+1}`,
      occurredAt:text(value?.occurredAt)||new Date(0).toISOString(),
      source:text(value?.source)||"registration",
      fullName:text(value?.fullName),
      registrationCode:normalizeRegistrationCode(value?.registrationCode)||null,
      handicap:normalizeHandicap(value?.handicap),
      tee:normalizeTee(value?.tee),
      whatsapp:nationalNumber?{countryCode,nationalNumber,e164:`+${countryCode}${nationalNumber}`}:{countryCode,nationalNumber:"",e164:null}
    };
  }
  function normalizeHistory(value){return Array.isArray(value)?value.filter(Boolean).map(normalizeProfileEvent):[]}
  function snapshotForProfile(profile,source="registration",occurredAt=new Date().toISOString()){
    return normalizeProfileEvent({id:`profile_event_${hashCode(`${profile.id}:${occurredAt}:${profile.updatedAt||""}`).toString(36)}`,occurredAt,source,fullName:profile.fullName,registrationCode:profile.registrationCode,handicap:profile.handicap,tee:profile.tee,whatsapp:profile.whatsapp});
  }
  function snapshotKey(value){const event=normalizeProfileEvent(value);return JSON.stringify({fullName:keyForName(event.fullName),registrationCode:event.registrationCode,handicap:event.handicap,tee:event.tee,whatsapp:event.whatsapp.e164})}
  function normalizeProfile(value,index=0){
    const fullName=text(value?.fullName||value?.name||`Jugador ${index+1}`);
    const firstName=text(value?.firstName)||fullName.split(/\s+/)[0]||"";
    const lastName=text(value?.lastName)||fullName.split(/\s+/).slice(1).join(" ");
    const shortName=text(value?.shortName)||firstName||fullName;
    const countryCode=normalizeCountryCode(value?.whatsapp?.countryCode||value?.countryCode||"502");
    const nationalNumber=normalizeNationalNumber(value?.whatsapp?.nationalNumber||value?.whatsapp||"",countryCode);
    const preference=DELIVERY_PREFERENCES.has(value?.deliveryPreference)?value.deliveryPreference:"none";
    return{
      schemaVersion:SCHEMA_VERSION,
      id:stableId(fullName,value?.id),
      identityKey:keyForName(fullName),
      registrationCode:normalizeRegistrationCode(value?.registrationCode)||null,
      firstName,lastName,fullName,shortName,
      handicap:normalizeHandicap(value?.handicap),
      tee:normalizeTee(value?.tee),
      email:normalizeEmail(value?.email)||null,
      whatsapp:nationalNumber?{countryCode,nationalNumber,e164:`+${countryCode}${nationalNumber}`}:{countryCode,nationalNumber:"",e164:null},
      deliveryPreference:preference,
      consent:normalizeConsent(value?.consent),
      roundIds:unique(value?.roundIds),
      coursesPlayed:unique(value?.coursesPlayed),
      profileHistory:normalizeHistory(value?.profileHistory),
      lastSentAt:text(value?.lastSentAt)||null,
      lastDelivery:normalizeDelivery(value?.lastDelivery),
      createdAt:text(value?.createdAt)||new Date(0).toISOString(),
      updatedAt:text(value?.updatedAt)||null
    };
  }
  function migrateDirectory(raw){return Array.isArray(raw)?raw.filter(Boolean).map(normalizeProfile):[]}
  function findByRegistrationCode(raw,code){const key=normalizeRegistrationCode(code);return key?migrateDirectory(raw).find(profile=>profile.registrationCode===key)||null:null}
  function canDeliver(profile,channel){
    const p=normalizeProfile(profile),allowed=p.consent.active===true;
    if(!allowed)return{ok:false,reason:"NOT_AUTHORIZED"};
    if(channel==="email"&&!p.email)return{ok:false,reason:"NO_DESTINATION"};
    if(channel==="whatsapp"&&!p.whatsapp.e164)return{ok:false,reason:"NO_DESTINATION"};
    if(!["email","whatsapp"].includes(channel))return{ok:false,reason:"INVALID_CHANNEL"};
    if(p.deliveryPreference==="none")return{ok:false,reason:"NOT_AUTHORIZED"};
    if(p.deliveryPreference!=="both"&&p.deliveryPreference!==channel)return{ok:false,reason:"CHANNEL_NOT_SELECTED"};
    return{ok:true,reason:null};
  }
  function upsertProfiles(raw,players,context={}){
    const profiles=migrateDirectory(raw),byKey=new Map(profiles.map(p=>[p.identityKey,p])),taken=new Set(profiles.map(p=>p.registrationCode).filter(Boolean));
    for(const [index,player] of (players||[]).entries()){
      const incoming=normalizeProfile({...player,fullName:player?.name||player?.fullName,whatsapp:{countryCode:player?.countryCode||"502",nationalNumber:player?.whatsapp?.nationalNumber||player?.whatsapp||""}},index);
      const previous=byKey.get(incoming.identityKey);
      let registrationCode=normalizeRegistrationCode(player?.registrationCode)||previous?.registrationCode;
      if(!registrationCode)registrationCode=generateRegistrationCode(incoming.identityKey,taken);
      if(previous?.registrationCode!==registrationCode&&taken.has(registrationCode))registrationCode=previous?.registrationCode||generateRegistrationCode(`${incoming.identityKey}:${index}`,taken);
      taken.add(registrationCode);
      const whatsapp=incoming.whatsapp.nationalNumber?incoming.whatsapp:previous?.whatsapp||incoming.whatsapp;
      const handicap=incoming.handicap??previous?.handicap??null,tee=incoming.tee||previous?.tee||null;
      const now=text(context.occurredAt)||new Date().toISOString(),history=normalizeHistory(previous?.profileHistory);
      if(previous&&!history.length)history.push(snapshotForProfile(previous,"migration",previous.updatedAt||previous.createdAt||now));
      let merged=normalizeProfile({...previous,...incoming,id:previous?.id||incoming.id,registrationCode,handicap,tee,whatsapp,email:previous?.email||incoming.email,deliveryPreference:previous?.deliveryPreference||"none",consent:previous?.consent||incoming.consent,roundIds:unique([...(previous?.roundIds||[]),context.roundId]),coursesPlayed:unique([...(previous?.coursesPlayed||[]),context.course]),profileHistory:history,createdAt:previous?.createdAt||now,updatedAt:now},index);
      const latest=history[history.length-1],snapshot=snapshotForProfile(merged,text(context.source)||"registration",now);
      if(!latest||snapshotKey(latest)!==snapshotKey(snapshot))merged=normalizeProfile({...merged,profileHistory:[...history,snapshot]},index);
      byKey.set(merged.identityKey,merged);
    }
    return[...byKey.values()];
  }
  function withdrawConsent(profile,at=new Date().toISOString()){
    const p=normalizeProfile(profile);
    return normalizeProfile({...p,deliveryPreference:"none",consent:{...p.consent,active:false,withdrawnAt:at},updatedAt:at});
  }
  function deliveryKey({roundId,cardVersion,playerId,cardType,channel}){return[roundId,cardVersion,playerId,cardType,channel].map(text).join(":")}

  return{SCHEMA_VERSION,normalizeProfile,normalizeProfileEvent,migrateDirectory,upsertProfiles,findByRegistrationCode,generateRegistrationCode,normalizeRegistrationCode,canDeliver,withdrawConsent,deliveryKey,keyForName,normalizeEmail,normalizeCountryCode,normalizeNationalNumber};
});
