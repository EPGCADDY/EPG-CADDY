(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCManualSearch=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const STOP_WORDS=new Set([
    "a","al","algo","como","con","cual","cuando","de","del","donde","el","en","es","esta","este",
    "hacer","la","las","lo","los","me","mi","no","para","por","puedo","que","quiero","se","si","un","una","y"
  ]);

  const INTENTS=[
    {name:"jugar stableford",match:/\bstableford\b/,pages:[4,37,38],weight:110},
    {name:"jugar match play",match:/\bmatch(?: play)?\b/,pages:[8,39],weight:110},
    {name:"jugar four ball",match:/\bfour ?ball\b|\bpareja(?:s)?\b/,pages:[9,40],weight:110},
    {name:"apuesta Vegas",match:/\bvegas\b|\bvolteo\b/,pages:[49,50,51],weight:180},
    {name:"apuesta Wolf",match:/\bwolf\b|\blobo\b/,pages:[46,47,48],weight:180},
    {name:"apuesta Skins",match:/\bskins?\b|\barrastre\b/,pages:[43,44,45],weight:180},
    {name:"apuesta Dots",match:/\bdots?\b|\bamigo\b|\btres putts\b|\bsand save\b/,pages:[52,53,54,55],weight:180},
    {name:"otras apuestas",match:/\bnassau\b|\bbingo bango bongo\b|\bsnake\b/,pages:[56],weight:180},
    {name:"tráfico",match:/\btrafico\b|\beta\b|\bdemora\b|\bruta\b/,pages:[64,65],weight:180},
    {name:"clima",match:/\bclima\b|\bpronostico\b|\blluvia\b|\bviento\b/,pages:[66,67],weight:180},
    {name:"práctica",match:/\bpractica\b|\bsin perfil\b|\bsin registro\b/,pages:[5,41],weight:65},
    {name:"comenzar ronda",match:/\bjugar\b|\bempezar\b|\bcomenzar\b|\biniciar\b|\bnueva ronda\b/,pages:[1,3,17,18,27,72],weight:35},
    {name:"elegir campo",match:/\bcampo\b|\bmodalidad\b|\btorneo\b/,pages:[1,3],weight:45},
    {name:"registrar jugadores",match:/\bregistr|\bagregar jugador\b|\bnombre\b.*\bhandicap\b|\bmarcas\b/,pages:[2,18,19,28],weight:50},
    {name:"score por voz",match:/\bdict|\bhabl|\bmicrofono\b|\bvoz\b/,pages:[20,57,58,59,60,61],weight:35},
    {name:"conversación universal",match:/\bplatic|\bconvers|\bcualquier tema\b|\bcambia(?:r)? de tema\b|\bmedicina\b|\bvuelo\b|\baerolinea\b|\bcultura\b|\btodos? los microfonos\b/,pages:[62,63],weight:170},
    {name:"corregir un resultado",match:/\b(corr(?:eg|ig|ij)|rectific|equivoc)\w*\b.*\b(score|gross|golpe|aguila|birdie|par|bogey)\b|\b(score|gross|golpe|aguila|birdie|par|bogey)\b.*\b(corr(?:eg|ig|ij)|rectific|equivoc)\w*\b/,pages:[21],weight:350},
    {name:"vocabulario de score",match:/\baguila\b|\bbirdie\b|\bpar\b|\bbogey\b|\bdoble par\b/,pages:[59,57],weight:68},
    {name:"corregir un score",match:/\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b.*\b(score|gross|golpe|aguila|birdie|par|bogey)\b|\b(score|gross|golpe|aguila|birdie|par|bogey)\b.*\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b/,pages:[7,21,32,58],weight:150},
    {name:"borrar todos los scores",match:/\bborrar\b.*\b(todo|todos|scores|ronda)\b|\breiniciar\b.*\bscores\b/,pages:[27],weight:75},
    {name:"score ausente",match:/\bequis\b|\bsin score\b|\bsin resultado\b|\bmarcar x\b|\bfalta score\b/,pages:[21,59],weight:70},
    {name:"control manual",match:/\bmanual\b|\benter\b|\bteclado\b|\bescribir\b/,pages:[7,21],weight:65},
    {name:"hoyo no avanza",match:/\bno avanza\b|\bno pasa\b.*\bhoyo\b|\batascad\w*\b.*\bhoyo\b/,pages:[20,21,30],weight:85},
    {name:"preguntar un hoyo",match:/\b(cuanto|score|resultado)\b.*\bhoyo\b|\brepite\b.*\bhoyo\b/,pages:[24],weight:75},
    {name:"acumulado",match:/\bacumulad\w*\b|\bmarcador\b|\bcomo (voy|vamos|va)\b|\btotal actual\b|\bresultado actual\b/,pages:[23,24],weight:150},
    {name:"primera o segunda vuelta",match:/\bprimera vuelta\b|\bsegunda vuelta\b|\bida\b|\bregreso\b|\bhasta el hoyo\b/,pages:[17,23,24],weight:175},
    {name:"líder o posiciones",match:/\bganando\b|\blider\b|\bprimero\b|\bposicion\w*\b|\bcompara\w*\b|\bdiferencia\b/,pages:[24,34],weight:80},
    {name:"birdies y estadísticas de ronda",match:/\bcuantos\b.*\b(birdie|par|bogey|aguila)\w*\b|\bmejor hoyo\b|\bpeor hoyo\b/,pages:[24,34,59],weight:80},
    {name:"datos pendientes",match:/\bpendiente\w*\b|\bfalta\w*\b|\bomitid\w*\b/,pages:[20,21,30],weight:65},
    {name:"tiros de handicap",match:/\b(recib|tiro|golpe)\w*\b.*\bhandicap\b|\bhandicap\b.*\bhoyo\b/,pages:[22],weight:75},
    {name:"tarjeta digital",match:/\btarjeta\b.*\b(digital|global|personal|final)\b/,pages:[29,30,31],weight:70},
    {name:"finalizar ronda",match:/\bfinaliz|\bcerrar ronda\b|\bno (me )?deja\b.*\b(finalizar|cerrar)\b/,pages:[30],weight:150},
    {name:"corrección oficial",match:/\bcorreccion oficial\b|\bronda cerrada\b|\babrir original\b|\bversion corregida\b/,pages:[32],weight:85},
    {name:"descargar y compartir",match:/\bpdf\b|\bimagen\b|\bdescarg\w*\b|\bwhatsapp\b|\bcorreo\b|\bcompart\w*\b/,pages:[31,29],weight:70},
    {name:"historial",match:/\bhistorial\b|\bronda anterior\b|\bronda previa\b|\btarjeta guardada\b/,pages:[33,26],weight:65},
    {name:"estadísticas históricas",match:/\bpromedio\b|\btendencia\b|\bconsistencia\b|\brecord\b|\bestadistica\w*\b|\bmejor y peor\b/,pages:[34],weight:75},
    {name:"respaldo",match:/\bcuenta\b|\bregistrate\b|\brespald\w*\b|\brecuperar respaldo\b|\biniciar sesion\b/,pages:[35],weight:70},
    {name:"instalar o actualizar",match:/\binstal\w*\b|\bacceso directo\b|\bpantalla de inicio\b|\bactualiz\w*\b|\bsin conexion\b|\boffline\b/,pages:[36,70],weight:70},
    {name:"información de campos",match:/\byard\w*\b|\bslope\b|\brating\b|\binformacion del campo\b|\bscorecard del campo\b/,pages:[10,11,12,13,14,15,16],weight:60},
    {name:"mapa de voz",match:/\bque puedo decir(?:le)?\b|\bque entiende\b|\bvocabulario\b|\bfunciones de voz\b|\bmapa\b/,pages:[57,58,59,60,61,69],weight:80},
    {name:"error de voz",match:/\berror\b|\bno entiende\b|\bno reconoce\b|\bno responde\b|\bse trabo\b|\bse traba\b/,pages:[61],weight:75}
  ];

  function normalize(value){
    return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
  }

  function tokens(value){
    return normalize(value).split(" ").filter(token=>token.length>1&&!STOP_WORDS.has(token));
  }

  function search(query,entries,{limit=8}={}){
    const text=normalize(query),wanted=tokens(text);
    if(!text)return[];
    const intentScores=new Map();
    for(const intent of INTENTS){
      if(!intent.match.test(text))continue;
      intent.pages.forEach((page,index)=>intentScores.set(String(page).padStart(2,"0"),(intentScores.get(String(page).padStart(2,"0"))||0)+intent.weight-index*3));
    }
    return (entries||[]).map(entry=>{
      const number=String(entry.number).padStart(2,"0"),haystack=normalize([entry.title,entry.label,entry.searchText,entry.category].join(" "));
      let score=intentScores.get(number)||0,matched=[];
      if(haystack.includes(text)){score+=90;matched.push("frase exacta")}
      for(const token of wanted){
        if(haystack.includes(token)){score+=token.length>=7?14:9;matched.push(token)}
      }
      if(normalize(entry.title).split(" ").some(token=>wanted.includes(token)))score+=18;
      return{...entry,number,score,matched:[...new Set(matched)]};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||Number(a.number)-Number(b.number)).slice(0,limit);
  }

  return Object.freeze({INTENTS,normalize,tokens,search});
});
