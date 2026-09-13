# R34: FAIL físico 2026-09-13 08:31–08:32 Guatemala
Evidencias del propietario: IMG_3624.jpeg tarjeta, IMG_3625.jpeg Registro. No se aprueba f32a0b9 como solución física.
Vercel main epg-caddy: 14:31:05 audio_capture, reintento; 14:31:31 started -> 14:31:39 no_result_timeout; otro intento 14:31:47 started -> 14:31:51 transcript_ready -> 14:31:55 speech_started -> 14:32:09 ended.
Vercel Preview dpl_CxoyKWrKHn31fPjHoFELxFkTnJBs: 14:32:27 started setup -> 14:32:35 no_result_timeout. No transcripción, sin solicitud a IA.
El cierre de ocho segundos está confirmado; la causa anterior (señal de micrófono vs servicio de reconocimiento) no está determinada. Los eventos actuales no registran entrada de audio. No cambiar plataforma, voz, diseño o esperas sobre una suposición.
Diagnóstico aislado assets/official-logos/iphone-microphone.html: mide RMS local cinco segundos; cierra pista y AudioContext; después inicia SpeechRecognition hasta doce segundos y muestra callbacks y conteo de resultados sin texto. No registra, almacena ni envía audio a la aplicación. El servicio del navegador puede procesarlo. Detener y pagehide liberan recursos. Un RMS alto acredita señal, no necesariamente voz humana. Requiere hardware iPhone para completar la evidencia faltante.
Main y la tarjeta no se modifican. La corrección del clima conserva su PASS independiente; continuidad de voz sigue FAIL físico.
