(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCPlayerRegistry=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const SCHEMA_VERSION=2;
  const DELIVERY_PREFERENCES=new Set(["email","whatsapp","both","none"]);
  const DELIVERY_STATES=new Set(["NOT_AUTHORIZED","NO_DESTINATION","PENDING","PREPARED","SENDING","DELIVERED","FAILED","CANCELLED"]);

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
  function stableId(name,legacyId){return text(legacyId)||`player_${keyForName(name).replace(/\s+/g,"_")||"unknown"}`}
  function unique(values){return [...new Set((values||[]).map(text).filter(Boolean))]}
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
      firstName,lastName,fullName,shortName,
      email:normalizeEmail(value?.email)||null,
      whatsapp:nationalNumber?{countryCode,nationalNumber,e164:`+${countryCode}${nationalNumber}`}:{countryCode,nationalNumber:"",e164:null},
      deliveryPreference:preference,
      consent:normalizeConsent(value?.consent),
      roundIds:unique(value?.roundIds),
      coursesPlayed:unique(value?.coursesPlayed),
      lastSentAt:text(value?.lastSentAt)||null,
      lastDelivery:normalizeDelivery(value?.lastDelivery),
      createdAt:text(value?.createdAt)||new Date(0).toISOString(),
      updatedAt:text(value?.updatedAt)||null
    };
  }
  function migrateDirectory(raw){return Array.isArray(raw)?raw.filter(Boolean).map(normalizeProfile):[]}
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
    const profiles=migrateDirectory(raw),byKey=new Map(profiles.map(p=>[p.identityKey,p]));
    for(const [index,player] of (players||[]).entries()){
      const incoming=normalizeProfile({...player,fullName:player?.name||player?.fullName,whatsapp:{countryCode:player?.countryCode||"502",nationalNumber:player?.whatsapp?.nationalNumber||player?.whatsapp||""}},index);
      const previous=byKey.get(incoming.identityKey);
      const merged=normalizeProfile({...previous,...incoming,id:previous?.id||incoming.id,email:previous?.email||incoming.email,deliveryPreference:previous?.deliveryPreference||"none",consent:previous?.consent||incoming.consent,roundIds:unique([...(previous?.roundIds||[]),context.roundId]),coursesPlayed:unique([...(previous?.coursesPlayed||[]),context.course]),createdAt:previous?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()},index);
      byKey.set(merged.identityKey,merged);
    }
    return[...byKey.values()];
  }
  function withdrawConsent(profile,at=new Date().toISOString()){
    const p=normalizeProfile(profile);
    return normalizeProfile({...p,deliveryPreference:"none",consent:{...p.consent,active:false,withdrawnAt:at},updatedAt:at});
  }
  function deliveryKey({roundId,cardVersion,playerId,cardType,channel}){return[roundId,cardVersion,playerId,cardType,channel].map(text).join(":")}

  return{SCHEMA_VERSION,normalizeProfile,migrateDirectory,upsertProfiles,canDeliver,withdrawConsent,deliveryKey,keyForName,normalizeEmail,normalizeCountryCode,normalizeNationalNumber};
});
