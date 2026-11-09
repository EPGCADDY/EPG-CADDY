(function(root){
  "use strict";
  function parseManualScoreKey(raw){
    const key=String(raw??"").trim().toUpperCase();
    if(key==="X")return{ok:true,action:"delete"};
    if(key==="0")return{ok:true,action:"omit",gross:null,status:"x"};
    if(/^[1-9]$/.test(key))return{ok:true,action:"score",gross:Number(key),status:null};
    return{ok:false,action:"invalid"};
  }
  // Only 1 waits: selecting another cell confirms 1; a second digit completes 10–19.
  function nextManualScoreInput(value,raw){
    const key=String(raw??"").trim().toUpperCase();
    if(key==="X")return{ok:true,action:"delete"};
    if(!/^[0-9]$/.test(key))return{ok:false,action:"invalid"};
    if(value){
      const gross=Number(String(value)+key);
      return Number.isInteger(gross)&&gross>=10&&gross<=19
        ?{ok:true,action:"score",gross,status:null,twoDigits:true}
        :{ok:false,action:"invalid"};
    }
    if(key==="1")return{ok:true,action:"pending",value:key};
    return parseManualScoreKey(key);
  }
  root.GSCScoreEntryContract={parseManualScoreKey,nextManualScoreInput};
})(typeof window!=="undefined"?window:globalThis);
