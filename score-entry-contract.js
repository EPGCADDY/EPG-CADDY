(function(root){
  "use strict";
  function parseManualScoreKey(raw){
    const key=String(raw??"").trim().toUpperCase();
    if(key==="X")return{ok:true,action:"delete"};
    if(key==="0")return{ok:true,action:"omit",gross:null,status:"x"};
    if(/^[1-9]$/.test(key))return{ok:true,action:"score",gross:Number(key),status:null};
    return{ok:false,action:"invalid"};
  }
  root.GSCScoreEntryContract={parseManualScoreKey};
})(typeof window!=="undefined"?window:globalThis);
