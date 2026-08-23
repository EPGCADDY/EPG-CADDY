(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.GSCCommerce=api})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const ENTITLEMENT_ID="gscg_pro";
  const PRODUCT_IDS={monthly:"gscg_pro_monthly",annual:"gscg_pro_annual",lifetime:"gscg_pro_lifetime"};
  let configured=false,currentCustomerInfo=null,currentAppUserId="";

  function platform(){return String(root?.GSC_NATIVE_PLATFORM||"").toLowerCase()}
  function purchases(){return root?.GSC_NATIVE_PURCHASES||null}
  function paywall(){return root?.GSC_NATIVE_PAYWALL||null}
  function config(){return root?.GSC_COMMERCE_CONFIG||{}}
  function apiKey(){const value=config();return platform()==="ios"?String(value.iosApiKey||""):platform()==="android"?String(value.androidApiKey||""):""}
  function customerInfo(value){return value?.customerInfo||value||null}
  function entitlementActive(value=currentCustomerInfo){return Boolean(value?.entitlements?.active?.[ENTITLEMENT_ID])}
  function snapshot(extra={}){return{available:configured,platform:platform(),entitlementId:ENTITLEMENT_ID,entitlementActive:entitlementActive(),appUserId:currentAppUserId,customerInfo:currentCustomerInfo,...extra}}

  async function status(){
    const plugin=purchases();if(!configured||!plugin)return snapshot({available:false,code:"COMMERCE_NOT_CONFIGURED"});
    try{currentCustomerInfo=customerInfo(await plugin.getCustomerInfo());return snapshot()}
    catch{return snapshot({code:"COMMERCE_STATUS_FAILED"})}
  }
  async function identify(appUserID){
    const value=String(appUserID||"").trim();if(!value||!configured||!purchases())return snapshot();
    if(value===currentAppUserId)return status();
    try{const result=await purchases().logIn({appUserID:value});currentAppUserId=value;currentCustomerInfo=customerInfo(result);return snapshot()}
    catch{return snapshot({code:"COMMERCE_IDENTIFY_FAILED"})}
  }
  async function configure(options={}){
    const plugin=purchases(),key=apiKey();
    if(!plugin||!key||!platform())return snapshot({available:false,code:!platform()?"NATIVE_APP_REQUIRED":!key?"COMMERCE_PUBLIC_KEY_PENDING":"COMMERCE_PLUGIN_MISSING"});
    try{
      if(!configured){currentAppUserId=String(options.appUserID||"").trim();await plugin.configure({apiKey:key,...(currentAppUserId?{appUserID:currentAppUserId}:{})});configured=true}
      else if(options.appUserID)await identify(options.appUserID);
      return status();
    }catch{return snapshot({available:false,code:"COMMERCE_CONFIGURE_FAILED"})}
  }
  async function presentPaywall(){
    if(!configured||!paywall())return snapshot({code:"PAYWALL_NOT_AVAILABLE"});
    try{const result=await paywall().presentPaywall({displayCloseButton:true});const next=await status();return{...next,paywallResult:result?.result||null}}
    catch{return snapshot({code:"PAYWALL_FAILED"})}
  }
  async function restore(){
    if(!configured||!purchases())return snapshot({code:"COMMERCE_NOT_CONFIGURED"});
    try{currentCustomerInfo=customerInfo(await purchases().restorePurchases());return snapshot({restored:true})}
    catch{return snapshot({code:"RESTORE_FAILED"})}
  }

  return{ENTITLEMENT_ID,PRODUCT_IDS,configure,identify,status,presentPaywall,restore,entitlementActive};
});
