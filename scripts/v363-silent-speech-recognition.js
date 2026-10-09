// V363 browser-evidence fixture: Safari can accept stop() without emitting onend.
// This intentionally silent transport proves that the independent stop guard
// releases ESCUCHANDO even when that browser event never arrives.
class V363SilentSpeechRecognition {
  constructor(){
    this.lang="es-GT";
    this.continuous=true;
    this.interimResults=true;
    this.maxAlternatives=5;
  }
  start(){setTimeout(()=>this.onstart?.(),40)}
  stop(){}
  abort(){}
}
Object.defineProperty(window,"SpeechRecognition",{configurable:true,value:V363SilentSpeechRecognition});
Object.defineProperty(window,"webkitSpeechRecognition",{configurable:true,value:V363SilentSpeechRecognition});
