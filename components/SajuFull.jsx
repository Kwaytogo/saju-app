import { useState } from "react";

const S=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const B=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SE=['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water'];
const BE=['Water','Earth','Wood','Wood','Earth','Fire','Fire','Earth','Metal','Metal','Earth','Water'];
const SY=['Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin'];
const SKO=['갑','을','병','정','무','기','경','신','임','계'];
const BKO=['자','축','인','묘','진','사','오','미','신','유','술','해'];
const EC={Wood:'#4CAF50',Fire:'#E84012',Earth:'#C8A020',Metal:'#CCCCCC',Water:'#4090E0'};
const ECH={Wood:'木',Fire:'火',Earth:'土',Metal:'金',Water:'水'};
const EBG={Wood:'#081508',Fire:'#180905',Earth:'#181308',Metal:'#101010',Water:'#060D1A'};
const PM={'甲':{m:'己',f:'辛'},'乙':{m:'戊',f:'庚'},'丙':{m:'辛',f:'癸'},'丁':{m:'庚',f:'壬'},'戊':{m:'癸',f:'乙'},'己':{m:'壬',f:'甲'},'庚':{m:'乙',f:'丁'},'辛':{m:'甲',f:'丙'},'壬':{m:'丁',f:'己'},'癸':{m:'丙',f:'戊'}};
const V={bg:'#060C18',s:'#0A1628',am:'#E88C12',go:'#C8A055',tx:'#EDE5D3',mu:'#8A9BAB',br:'#1B2E48'};
const FF="'Cormorant Garamond',Georgia,serif";

// ── STEM DATA ─────────────────────────────────────────────
const SD={
  '甲':{el:'Wood',ko:'목',sym:'木',color:'#4CAF50',bg:'#071208',name:'The Ancient Forest',nameKo:'숲',tag:'Born to grow beyond what anyone expected.',p1:'You are the tallest tree in the forest — roots deep, branches wide, always reaching for light others cannot yet see. A natural trailblazer who quietly transforms every room you enter.',p2:'But forests feel every storm. You have carried the weight of always being expected to rise, even when the ground beneath you was shaking. You hold others up so often that you forget: who holds you?',p3:'2026 brings your most powerful growth phase in years. The seeds you planted in solitude are finally breaking ground.'},
  '乙':{el:'Wood',ko:'목',sym:'木',color:'#81C784',bg:'#071208',name:'The Wildflower',nameKo:'들꽃',tag:'You bloom in places others said nothing could grow.',p1:'乙 Wood is not the towering oak — it is the vine that finds its way through stone. Adaptable, alive, quietly beautiful. You make any space warmer simply by being in it. People are drawn to you without knowing why.',p2:'The shadow of 乙 is over-giving. You have bent yourself into shapes to fit others, and wondered why you felt empty. Your softness is not weakness — it is your greatest power, and it has been misused.',p3:"What's coming in 2026 requires your full, uncompromised self — and it will be magnetically drawn to exactly that."},
  '丙':{el:'Fire',ko:'화',sym:'火',color:'#FF7043',bg:'#180A04',name:'The Sun',nameKo:'태양',tag:'Wherever you go, the temperature rises.',p1:'You are daytime fire — generous, radiant, magnetic. People gather around 丙 Fire the way they gather around sunlight: not because they have to, but because it simply feels good to be near you. Your warmth is a gift you give without thinking.',p2:'But the sun cannot hide. You have felt the exhaustion of always being the one who shows up, who shines, who keeps everyone warm — while quietly burning yourself out.',p3:'2026 is the year you direct that warmth inward first. The right people — those who can truly receive your light — are already on their way.'},
  '丁':{el:'Fire',ko:'화',sym:'火',color:'#FFB74D',bg:'#180A04',name:'The Candleflame',nameKo:'촛불',tag:'Small. Intimate. Impossible to ignore.',p1:'丁 Fire is not the sun — it is the candle in a dark room. More focused. More personal. You illuminate things one person, one moment at a time, and that kind of warmth changes lives in ways a bonfire never could.',p2:'Candles burn from both ends when asked to light too many rooms at once. You have given your warmth to people who did not protect the flame. The art is learning which rooms truly deserve your light.',p3:'An unexpected connection arrives in 2026 — someone who cups their hands around you. This one is different. Protect it.'},
  '戊':{el:'Earth',ko:'토',sym:'土',color:'#C8A020',bg:'#181308',name:'The Mountain',nameKo:'산',tag:'When everything moves, you remain.',p1:'You are the mountain — ancient, patient, unmoved by weather that sends the valley into panic. You carry a quiet authority that others feel before you have spoken a word. You are the person everyone calls when the world falls apart.',p2:'But mountains carry the weight of everything that rests on them. You have held others together so many times that you forgot to ask: who holds me? Your steadiness is real. Your need for rest is equally real.',p3:'2026 asks you to be still. Your power this year is not in action — it is in presence.'},
  '己':{el:'Earth',ko:'토',sym:'土',color:'#D4A853',bg:'#181308',name:'The Garden',nameKo:'대지',tag:'You make everything you touch grow.',p1:'己 Earth is fertile soil — nurturing, receptive, life-giving. Where 戊 is the mountain, you are the garden: the ground that makes flowers possible. Your emotional intelligence is extraordinary. You read rooms, people, and unspoken needs with almost supernatural precision.',p2:'Gardens can be over-cultivated. You have absorbed others\' pain as your own, taken on what should not have been yours to carry. Your sensitivity is a superpower — but it requires boundaries to flourish.',p3:'2026 asks you one question: whose garden are you tending? The answer should include your own.'},
  '庚':{el:'Metal',ko:'금',sym:'金',color:'#BBBBBB',bg:'#101010',name:'The Great Boulder',nameKo:'큰 바위',tag:'Carved by fire. Unmovable by force.',p1:'庚 Metal is raw iron ore — powerful, unrefined, forged through immense pressure into something extraordinary. You carry a quiet, unshakeable confidence that some find intimidating and others find deeply magnetic. When you make a decision, it is final.',p2:'The boulder can become a prison. You have held on — to principles, to old wounds, to versions of yourself — long past the point they served you. The hardest thing for 庚 is letting go. But it is the most transformative.',p3:'2026 is the year of refinement. Something that needed to break finally does. What remains is the clearest, truest version of you.'},
  '辛':{el:'Metal',ko:'금',sym:'金',color:'#E8E8E8',bg:'#101010',name:'The Jewel',nameKo:'보석',tag:'Precious. Sharp. Rare.',p1:'辛 Metal has already been through the fire and emerged refined. You are not raw ore — you are the finished gem. Exacting standards, sophisticated taste, an eye for quality that others simply do not possess. You hold yourself to an excellence that can feel solitary.',p2:'Jewels cut. Your sharpness — of mind, of words, of expectations — has wounded people you loved. The precision that makes you extraordinary can make you devastating when left unguarded.',p3:'This year, let someone see the jewel without the cut. Vulnerability will not diminish you. It will make you luminous.'},
  '壬':{el:'Water',ko:'수',sym:'水',color:'#4090E0',bg:'#060D1A',name:'The Ocean',nameKo:'바다',tag:'Vast. Deep. Moving everything in your current.',p1:'壬 Water is the ocean — enormous, powerful, in constant motion. You think on a scale that most people never dare. Your inner world is as deep as the sea, with dimensions that most people only ever glimpse the surface of.',p2:'Oceans can overwhelm coastlines. Your emotional depth and ambition can sweep people away before they are ready. Learning to move at the pace of others, sometimes, is not a small thing — it is the highest art.',p3:'2026 brings a shore finally worthy of your tide. Someone, or something, that can hold the full force of you.'},
  '癸':{el:'Water',ko:'수',sym:'水',color:'#64B5F6',bg:'#060D1A',name:'The Rain',nameKo:'빗물',tag:'Quiet. Pervasive. Necessary for everything to live.',p1:'癸 Water is rain — soft, persistent, life-giving. You have a quiet influence that moves slowly and leaves everything transformed. Your intuition is almost supernatural. You know things you were never told, feel things before they happen.',p2:'Rain becomes a flood when it has nowhere to go. Your emotions, unprocessed, overwhelm. Your intuition, turned inward without expression, becomes anxiety. You were made to flow, not to hold still.',p3:'Let it rain in 2026. The feelings you have been holding — release them. What grows from that release will genuinely surprise you.'},
};

// ── IDOL DATABASE ─────────────────────────────────────────
const IDOLS={
  '甲':[{name:'Jin',group:'BTS'},{name:'Rosé',group:'BLACKPINK'}],
  '乙':[{name:'V',group:'BTS'},{name:'Wonwoo',group:'SEVENTEEN'}],
  '丙':[{name:'Nayeon',group:'TWICE'}],
  '丁':[{name:'IU',group:'Solo Artist'},{name:'Jimin',group:'BTS'}],
  '戊':[{name:'Lisa',group:'BLACKPINK'},{name:'Bang Chan',group:'Stray Kids'}],
  '己':[{name:'Karina',group:'aespa'}],
  '庚':[{name:'G-Dragon',group:'BIGBANG'}],
  '辛':[{name:'RM',group:'BTS'}],
  '壬':[{name:'Baekhyun',group:'EXO'}],
  '癸':[{name:'Jennie',group:'BLACKPINK'}],
};

// ── CALCULATION ───────────────────────────────────────────
function calcYear(y){const si=((y-4)%10+10)%10,bi=((y-4)%12+12)%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function calcMonth(y,m,d){const ySI=((y-4)%10+10)%10,base=[2,4,6,8,0][ySI%5],cuts=[6,4,6,5,6,6,7,8,8,8,7,7],mi=m-1,sol=d>=cuts[mi]?(mi-1+12)%12:(mi-2+12)%12,si=(base+sol)%10,bi=(sol+2)%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function calcDay(y,m,d){const diff=Math.round((Date.UTC(y,m-1,d)-Date.UTC(2000,0,1))/86400000),idx=((54+diff)%60+60)%60,si=idx%10,bi=idx%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function dominant(ps){const c={};ps.forEach(p=>{c[p.se]=(c[p.se]||0)+1;c[p.be]=(c[p.be]||0)+1;});return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];}

// ── PROMPTS ───────────────────────────────────────────────
function buildPrompt(type,YP,MP,DP,gender){
  const dom=dominant([YP,MP,DP]),ps=PM[DP.s][gender==='male'?'m':'f'],pe=SE[S.indexOf(ps)];
  const pts={Wood:'growth-oriented, creative, idealistic, gentle, deeply visionary',Fire:'passionate, charismatic, magnetically warm',Earth:'profoundly stable, loyal, nurturing — someone you can always come home to',Metal:'principled, precise, quietly disciplined, unshakeably honest',Water:'wise, adaptable, emotionally profound and intuitive'};
  const eW={Wood:'ancient jade forests, bamboo groves, mountains brushing the morning sky',Fire:'a kingdom of eternal flame, golden temples, blazing skies',Earth:'vast mountain kingdoms, ancient stone fortresses, fertile heartland',Metal:'crystalline peaks, silver rivers under a full moon',Water:'moonlit seas, mist-covered rivers where all wisdom flows'};
  const trials={Wood:'the trial of loss — watching something nurtured wither before it bloomed',Fire:'the trial of consuming passion — burned by the fire inside',Earth:'the trial of endurance — holding steady while the world shifted',Metal:'the trial of severance — refined through what was cut away',Water:'the trial of deep solitude — searching the depths for something to hold'};
  const resols={Wood:'a love like spring — tender, unstoppable, full of new beginning',Fire:'a love like starfire — blazing, triumphant, illuminating everything',Earth:'deep roots at last — belonging, home, a love that outlasts all seasons',Metal:'crystal clarity — your truest self finally recognized',Water:'flowing into peace at last — wisdom fulfilled, love found in stillness'};
  const idols=IDOLS[DP.s]||[];
  const idolLine=idols.length?`\n\nNote: K-pop idols who share the same Day Master (${DP.s}) include ${idols.map(i=>`${i.name} (${i.group})`).join(' and ')}. Include this as a warm, fun fact in the WHO YOU ARE section.`:'';
  const base=`Korean SAJU Birth Chart:\n- Year: ${YP.s}${YP.b} · ${YP.se}/${YP.be}\n- Month: ${MP.s}${MP.b} · ${MP.se}/${MP.be}\n- Day Master: ${DP.s}${DP.b} · ${DP.yy} ${DP.se}\n- Dominant: ${dom} · Gender: ${gender}\n\n`;
  if(type==='basic')return`Mystical Korean SAJU astrologer. Personal destiny reading in English using "you". Poetic, specific, warm.\n\n${base}${idolLine}\n\n4 sections with ### headers:\n### WHO YOU ARE\n4 sentences. Day Master ${DP.s} core personality. Include the K-pop idol connection warmly.\n### YOUR ELEMENTAL NATURE\n3 sentences. ${dom} gifts and the shadow it casts.\n### YOUR LIFE PATH\n3-4 sentences. All three pillars woven into destiny.\n### 2026 FORECAST\n3 sentences. 丙午 Fire Horse year — fierce, transformative. Specific to this chart.\nProse only. No bullets. Mystical and warm.`;
  if(type==='love')return`Korean SAJU love reader. Personalized love fortune in English using "you".\n\n${base}Ideal partner: ${pe} element — ${pts[pe]}\n\n4 sections:\n### YOUR ROMANTIC NATURE\n3 sentences. How ${DP.yy} ${DP.se} loves.\n### YOUR IDEAL PARTNER\n4 sentences. ${pe} person. Romantic, vivid, specific — not just traits but how they feel to be around.\n### WHERE LOVE FINDS YOU\n3 sentences. Seasons and circumstances for this chart.\n### 2026 LOVE FORECAST\n3 sentences. Fire Horse 丙午 — bold encounters.\nProse. Romantic and luminous.`;
  if(type==='career')return`Korean SAJU career oracle. Career fortune in English using "you".\n\n${base}4 sections:\n### YOUR NATURAL GIFTS\n3 sentences. Day Master ${DP.s} and ${dom} strengths.\n### DESTINED PATHS\n3-4 sentences. 4-5 very specific career titles, not generic categories.\n### YOUR POWER DECADE\n3 sentences. When career peaks based on element cycle.\n### 2026 CAREER FORECAST\n3 sentences. Fire Horse — bold visibility, breakthroughs.\nProse. Confident.`;
  if(type==='story'){const hero=gender==='male'?'a Knight on a quest for love and destiny':'a Princess awakening to her true power';return`Master storyteller. Korean mystical fairy tale, reader is ${hero}.\n\n${base}Structure (no labels in story):\nRising: ${eW[YP.se]}\nJourney: ${trials[MP.se]}\nDestiny: ${resols[DP.se]} — MUST end happily.\n\n290-310 words. Second person "you". Korean imagery: lanterns, jade mountains, ancient gates, cherry blossoms, moonlight. Happy ending. Written for this exact person.`;}
}
async function callClaude(p){const r=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:p}]})});const d=await r.json();if(d.error)throw new Error(d.error.message);return d.content[0].text;}
function parseSections(text){const m=[...text.matchAll(/###\s+(.+?)\n([\s\S]+?)(?=\n###|$)/g)];return m.map(x=>({title:x[1].trim(),body:x[2].trim()}));}

const TABS=[{id:'basic',ko:'Basic Fortune',icon:'命'},{id:'love',ko:'Love Fortune',icon:'♡'},{id:'career',ko:'Career Fortune',icon:'山'},{id:'story',ko:'Your Story',icon:'✦'}];
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── ILLUSTRATIONS ─────────────────────────────────────────
function IllusPentagon(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><line x1="100" y1="16" x2="158" y2="62" stroke="#1E3352" strokeWidth="1"/><line x1="158" y1="62" x2="134" y2="106" stroke="#1E3352" strokeWidth="1"/><line x1="134" y1="106" x2="66" y2="106" stroke="#1E3352" strokeWidth="1"/><line x1="66" y1="106" x2="42" y2="62" stroke="#1E3352" strokeWidth="1"/><line x1="42" y1="62" x2="100" y2="16" stroke="#1E3352" strokeWidth="1"/><circle cx="100" cy="16" r="14" fill="#0D2010"/><text x="100" y="22" textAnchor="middle" fontSize="13" fill="#4CAF50" fontFamily="serif">木</text><circle cx="158" cy="62" r="14" fill="#2A0E08"/><text x="158" y="68" textAnchor="middle" fontSize="13" fill="#E84012" fontFamily="serif">火</text><circle cx="134" cy="106" r="14" fill="#2A2410"/><text x="134" y="112" textAnchor="middle" fontSize="13" fill="#C8A020" fontFamily="serif">土</text><circle cx="66" cy="106" r="14" fill="#1A1A1A"/><text x="66" y="112" textAnchor="middle" fontSize="13" fill="#CCCCCC" fontFamily="serif">金</text><circle cx="42" cy="62" r="14" fill="#0A1530"/><text x="42" y="68" textAnchor="middle" fontSize="13" fill="#4090E0" fontFamily="serif">水</text><circle cx="100" cy="62" r="18" fill="none" stroke="#C8A055" strokeWidth=".8" strokeDasharray="4 3"/><text x="100" y="68" textAnchor="middle" fontSize="12" fill="#C8A055" fontFamily="serif">命</text></svg>);}
function IllusPerson(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><circle cx="140" cy="10" r="2" fill="#EDE5D3" opacity=".8"/><circle cx="80" cy="14" r="1.5" fill="#EDE5D3" opacity=".9"/><circle cx="50" cy="28" r="1.5" fill="#EDE5D3" opacity=".7"/><circle cx="168" cy="30" r="1.5" fill="#EDE5D3" opacity=".7"/><circle cx="100" cy="20" r="2.5" fill="#E88C12" opacity=".95"/><circle cx="45" cy="36" r="2" fill="#C8A055" opacity=".85"/><line x1="100" y1="20" x2="45" y2="36" stroke="#C8A055" strokeWidth=".5" opacity=".6"/><line x1="100" y1="20" x2="140" y2="10" stroke="#C8A055" strokeWidth=".5" opacity=".6"/><rect x="0" y="84" width="200" height="31" fill="#050C18"/><line x1="0" y1="84" x2="200" y2="84" stroke="#1E3352" strokeWidth=".5"/><circle cx="100" cy="68" r="8" fill="#E88C12"/><rect x="97" y="55" width="6" height="15" fill="#E88C12" rx="1"/><line x1="100" y1="76" x2="94" y2="84" stroke="#E88C12" strokeWidth="5" strokeLinecap="round"/><line x1="100" y1="76" x2="106" y2="84" stroke="#E88C12" strokeWidth="5" strokeLinecap="round"/><line x1="98" y1="60" x2="88" y2="54" stroke="#E88C12" strokeWidth="4" strokeLinecap="round"/><line x1="102" y1="60" x2="112" y2="54" stroke="#E88C12" strokeWidth="4" strokeLinecap="round"/></svg>);}
function IllusMoons(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><path d="M62 57 Q62 24 82 24 Q102 24 102 57 Q102 80 82 90 Q62 80 62 57Z" fill="none" stroke="#E88C12" strokeWidth="1.2"/><path d="M98 57 Q98 24 118 24 Q138 24 138 57 Q138 80 118 90 Q98 80 98 57Z" fill="none" stroke="#C8A055" strokeWidth="1.2"/><circle cx="82" cy="57" r="16" fill="#1A1020"/><text x="82" y="63" textAnchor="middle" fontSize="16" fill="#E88C12">♡</text><circle cx="118" cy="57" r="16" fill="#1A1020"/><text x="118" y="63" textAnchor="middle" fontSize="16" fill="#C8A055">♡</text><circle cx="100" cy="10" r="3" fill="#E88C12" opacity=".9"/></svg>);}
function IllusMountain(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><polygon points="100,14 142,76 58,76" fill="none" stroke="#C8A055" strokeWidth="1"/><polygon points="100,30 130,74 70,74" fill="#0A1220"/><rect x="86" y="74" width="28" height="22" fill="#0A1220"/><rect x="0" y="90" width="200" height="2" fill="#1E3352"/><circle cx="100" cy="5" r="9" fill="#0A1220" stroke="#E88C12" strokeWidth="1"/><text x="100" y="10" textAnchor="middle" fontSize="10" fill="#E88C12" fontFamily="serif">日</text></svg>);}

// ── GWANGHWAMUN SCENE ─────────────────────────────────────
function KoreanNight(){
  const dc=['#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A'];
  return(<svg style={{position:'absolute',bottom:0,left:0,width:'100%',pointerEvents:'none'}} viewBox="0 0 800 380" preserveAspectRatio="xMidYMax meet">
    <path d="M0 248 Q90 215 180 232 Q270 205 360 222 Q430 200 510 216 Q590 202 680 218 Q740 208 800 222 L800 248Z" fill="#0C1B2C"/>
    <path d="M0 268 Q70 238 150 252 Q240 228 330 244 Q420 220 500 238 Q590 224 680 236 Q740 226 800 240 L800 268Z" fill="#091420"/>
    <rect x="52" y="282" width="10" height="50" fill="#070E1A"/><polygon points="57,202 38,262 76,262" fill="#07111C"/><polygon points="57,228 34,278 80,278" fill="#08121E"/><polygon points="57,255 30,292 84,292" fill="#09141F"/>
    <rect x="738" y="282" width="10" height="50" fill="#070E1A"/><polygon points="743,202 724,262 762,262" fill="#07111C"/><polygon points="743,228 720,278 766,278" fill="#08121E"/><polygon points="743,255 716,292 770,292" fill="#09141F"/>
    {[{x:148,y:224,o:.88},{x:192,y:196,o:.72},{x:238,y:218,o:.8},{x:560,y:208,o:.82},{x:606,y:182,o:.68},{x:650,y:212,o:.78}].map(({x,y,o},i)=>(
      <g key={i} opacity={o}><line x1={x} y1={y-12} x2={x} y2={y-3} stroke="#C8A055" strokeWidth=".8"/><ellipse cx={x} cy={y+5} rx="7" ry="10" fill="#E88C12"/><ellipse cx={x} cy={y} rx="7" ry="3" fill="#C8A055" opacity=".5"/><line x1={x-2} y1={y+15} x2={x-3.5} y2={y+21} stroke="#E88C12" strokeWidth=".7" opacity=".4"/><line x1={x+2} y1={y+15} x2={x+3.5} y2={y+21} stroke="#E88C12" strokeWidth=".7" opacity=".4"/></g>
    ))}
    <ellipse cx="400" cy="378" rx="210" ry="22" fill="#E88C12" opacity=".12"/>
    <rect x="8" y="272" width="784" height="108" fill="#111F30"/>
    <line x1="8" y1="292" x2="792" y2="292" stroke="#0C1826" strokeWidth=".7"/>
    <line x1="8" y1="312" x2="792" y2="312" stroke="#0C1826" strokeWidth=".6"/>
    {Array.from({length:19},(_,i)=><line key={i} x1={50+i*40} y1="272" x2={50+i*40} y2="292" stroke="#0C1826" strokeWidth=".4"/>)}
    <path d="M325 272 L325 230 Q325 210 344 210 L456 210 Q475 210 475 230 L475 272Z" fill="#E88C12" opacity=".38"/><path d="M325 272 L325 230 Q325 210 344 210 L456 210 Q475 210 475 230 L475 272Z" fill="none" stroke="#E88C12" strokeWidth="2.2" opacity=".82"/>
    <path d="M148 272 L148 257 Q148 246 159 246 L218 246 Q229 246 229 257 L229 272Z" fill="#E88C12" opacity=".2"/><path d="M148 272 L148 257 Q148 246 159 246 L218 246 Q229 246 229 257 L229 272Z" fill="none" stroke="#E88C12" strokeWidth="1.1" opacity=".48"/>
    <path d="M571 272 L571 257 Q571 246 582 246 L641 246 Q652 246 652 257 L652 272Z" fill="#E88C12" opacity=".2"/><path d="M571 272 L571 257 Q571 246 582 246 L641 246 Q652 246 652 257 L652 272Z" fill="none" stroke="#E88C12" strokeWidth="1.1" opacity=".48"/>
    <rect x="308" y="206" width="19" height="68" fill="#0C1820"/><rect x="473" y="206" width="19" height="68" fill="#0C1820"/>
    <rect x="52" y="210" width="696" height="34" fill="#0D1725"/>
    {[[88,215,50,24],[196,215,50,24],[558,215,50,24],[666,215,50,24]].map(([x,y,w,h],i)=>(<g key={i} opacity=".48"><rect x={x} y={y} width={w} height={h} fill="none" stroke="#E88C12" strokeWidth=".7"/><line x1={x+16} y1={y} x2={x+16} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x+33} y1={y} x2={x+33} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x} y1={y+h/2} x2={x+w} y2={y+h/2} stroke="#E88C12" strokeWidth=".4"/></g>))}
    <line x1="309" y1="206" x2="309" y2="214" stroke="#C8A055" strokeWidth=".8" opacity=".7"/><ellipse cx="309" cy="221" rx="5" ry="7.5" fill="#E88C12" opacity=".92"/>
    <line x1="491" y1="206" x2="491" y2="214" stroke="#C8A055" strokeWidth=".8" opacity=".7"/><ellipse cx="491" cy="221" rx="5" ry="7.5" fill="#E88C12" opacity=".92"/>
    {[370,400,430].map((x,i)=>(<g key={i}><line x1={x} y1="210" x2={x} y2="218" stroke="#C8A055" strokeWidth=".7" opacity=".6"/><ellipse cx={x} cy="225" rx="4" ry="6.5" fill="#E88C12" opacity=".86"/></g>))}
    <rect x="52" y="193" width="696" height="18" fill="#0F1C10"/>
    {dc.slice(0,24).map((col,i)=><rect key={i} x={58+i*28} y="194" width="18" height="8" fill={col} opacity=".78"/>)}
    <line x1="52" y1="193" x2="748" y2="193" stroke="#C8A055" strokeWidth=".9" opacity=".65"/>
    <rect x="82" y="156" width="636" height="38" fill="#0D1620"/>
    {[[128,161,46,26],[250,161,46,26],[377,161,48,26],[504,161,46,26],[624,161,46,26]].map(([x,y,w,h],i)=>(<g key={i} opacity=".4"><rect x={x} y={y} width={w} height={h} fill="none" stroke="#E88C12" strokeWidth=".7"/><line x1={x+w/3} y1={y} x2={x+w/3} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x+2*w/3} y1={y} x2={x+2*w/3} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x} y1={y+h/2} x2={x+w} y2={y+h/2} stroke="#E88C12" strokeWidth=".4"/></g>))}
    <rect x="82" y="138" width="636" height="18" fill="#0F1C10"/>
    {dc.slice(0,22).map((col,i)=><rect key={i} x={88+i*28} y="139" width="18" height="8" fill={col} opacity=".70"/>)}
    <line x1="82" y1="138" x2="718" y2="138" stroke="#C8A055" strokeWidth=".85" opacity=".58"/>
    <path d="M48 138 Q200 114 400 110 Q600 114 752 138 L754 142 L46 142Z" fill="#080E1A"/>
    <path d="M48 138 Q200 114 400 110 Q600 114 752 138" fill="none" stroke="#C8A055" strokeWidth="2.2" opacity=".93"/>
    <path d="M48 138 Q20 128 4 140" fill="none" stroke="#E88C12" strokeWidth="2.8" opacity=".88"/>
    <path d="M752 138 Q780 128 796 140" fill="none" stroke="#E88C12" strokeWidth="2.8" opacity=".88"/>
    <rect x="106" y="66" width="588" height="17" fill="#0F1C10"/>
    {dc.slice(0,20).map((col,i)=><rect key={i} x={112+i*28} y="67" width="17" height="7.5" fill={col} opacity=".62"/>)}
    <line x1="106" y1="66" x2="694" y2="66" stroke="#C8A055" strokeWidth=".75" opacity=".52"/>
    <path d="M88 66 Q250 34 400 30 Q550 34 712 66 L716 70 L84 70Z" fill="#060C16"/>
    <path d="M88 66 Q250 34 400 30 Q550 34 712 66" fill="none" stroke="#C8A055" strokeWidth="2.6" opacity=".97"/>
    <path d="M88 66 Q54 52 28 66" fill="none" stroke="#C8A055" strokeWidth="3.2" opacity=".95"/>
    <path d="M712 66 Q746 52 772 66" fill="none" stroke="#C8A055" strokeWidth="3.2" opacity=".95"/>
    <rect x="362" y="26" width="76" height="8" rx="2" fill="#13101A" stroke="#C8A055" strokeWidth="1.3" opacity=".94"/>
    <path d="M362 30 Q346 20 354 30" fill="none" stroke="#C8A055" strokeWidth="2" opacity=".9"/>
    <path d="M438 30 Q454 20 446 30" fill="none" stroke="#C8A055" strokeWidth="2" opacity=".9"/>
    <circle cx="400" cy="30" r="3" fill="none" stroke="#C8A055" strokeWidth="1" opacity=".7"/>
  </svg>);
}

// ── MAIN APP ──────────────────────────────────────────────
export default function SajuFull(){
  const[view,setView]=useState('landing');
  const[month,setMonth]=useState('');
  const[dayNum,setDayNum]=useState('');
  const[year,setYear]=useState('');
  const[gender,setGender]=useState('female');
  const[saju,setSaju]=useState(null);
  const[tab,setTab]=useState('basic');
  const[readings,setReadings]=useState({});
  const[err,setErr]=useState('');
  const[popup,setPopup]=useState(false);
  const[popupDone,setPopupDone]=useState(false);

  const handleReveal=()=>{
    if(!month||!dayNum||!year||year.length<4){setErr('Please enter your complete birthday');return;}
    const y=parseInt(year),m=parseInt(month),d=parseInt(dayNum);
    if(isNaN(y)||isNaN(m)||isNaN(d)||y<1920||y>2010){setErr('Please enter a valid birth year (1920–2010)');return;}
    setSaju({year:calcYear(y),month:calcMonth(y,m,d),day:calcDay(y,m,d)});
    setView('reveal');setErr('');
    if(typeof window!=='undefined')window.scrollTo(0,0);
  };

  const generate=async(type)=>{
    setTab(type);
    if(readings[type]){setView('reading');return;}
    setView('loading');
    try{const text=await callClaude(buildPrompt(type,saju.year,saju.month,saju.day,gender));setReadings(r=>({...r,[type]:text}));setView('reading');}
    catch(e){setErr('Could not connect. Make sure the API key is set in Vercel environment variables.');setView('saju');}
  };

  const base={background:V.bg,color:V.tx,fontFamily:FF,minHeight:'100vh'};

  // ── EXIT INTENT POPUP ────────────────────────────────────
  const DiscountPopup=()=>(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(6,12,24,.95)',zIndex:999,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:V.s,border:`1px solid ${V.am}`,padding:'44px 36px',maxWidth:460,width:'100%',textAlign:'center',position:'relative'}}>
        <button onClick={()=>setPopup(false)} style={{position:'absolute',top:14,right:18,background:'none',border:'none',color:V.mu,fontSize:20,cursor:'pointer',fontFamily:FF}}>✕</button>
        <p style={{fontSize:11,letterSpacing:6,color:V.am,marginBottom:14}}>WAIT · 잠깐만요</p>
        <h2 style={{fontSize:28,fontWeight:600,lineHeight:1.2,marginBottom:10}}>Don't leave your<br/>fate unread</h2>
        <p style={{fontSize:15,color:V.mu,marginBottom:28,lineHeight:1.6}}>Your destiny is one birthday away.</p>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:12,marginBottom:28}}>
          <span style={{fontSize:16,color:'#3A5070',textDecoration:'line-through'}}>₩33,000</span>
          <span style={{fontSize:14,color:V.mu}}>→</span>
          <span style={{fontSize:48,color:V.am,fontWeight:700,lineHeight:1}}>₩20,000</span>
        </div>
        <button onClick={()=>{setPopup(false);const el=document.getElementById('saju-form');if(el)el.scrollIntoView({behavior:'smooth'});}}
          style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'16px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:3,fontWeight:700,marginBottom:10}}>
          YES — CLAIM MY READING ✦
        </button>
        <p style={{fontSize:11,color:'#2A4060'}}>* limited time · expires when you close</p>
      </div>
    </div>
  );

  // ── DATE INPUT ───────────────────────────────────────────
  const DateInput=()=>(
    <div style={{maxWidth:400,margin:'0 auto'}}>
      <style>{`
        .sj-sel{background:#060C18;border:1px solid #1B2E48;color:#EDE5D3;font-family:${FF};font-size:17px;padding:13px 10px;outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;}
        .sj-sel:focus{border-color:#E88C12;}
        .sj-inp{background:#060C18;border:1px solid #1B2E48;color:#EDE5D3;font-family:${FF};font-size:17px;padding:13px 14px;outline:none;width:100%;box-sizing:border-box;}
        .sj-inp:focus{border-color:#E88C12;}
        .sj-inp::placeholder{color:#3A5070;}
        .g-btn{transition:all .2s;}
        .g-btn:hover{opacity:.85}
        .hvr-fill:hover{background:#E88C12!important;color:#060C18!important;}
      `}</style>
      <label style={{display:'block',fontSize:12,letterSpacing:5,color:V.am,marginBottom:10,textAlign:'left'}}>DATE OF BIRTH</label>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 2fr',gap:6,marginBottom:8}}>
        <select className="sj-sel" value={month} onChange={e=>setMonth(e.target.value)}>
          <option value="">Month</option>
          {MONTHS.map((mn,i)=><option key={i+1} value={i+1}>{mn}</option>)}
        </select>
        <select className="sj-sel" value={dayNum} onChange={e=>setDayNum(e.target.value)}>
          <option value="">Day</option>
          {Array.from({length:31},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
        <input className="sj-inp" type="number" value={year} onChange={e=>setYear(e.target.value)} placeholder="Year" min="1920" max="2010"/>
      </div>
      <label style={{display:'block',fontSize:12,letterSpacing:5,color:V.am,marginBottom:10,marginTop:16,textAlign:'left'}}>GENDER</label>
      <div style={{display:'flex',marginBottom:24}}>
        {['female','male'].map(g=>(
          <button key={g} className="g-btn" onClick={()=>setGender(g)}
            style={{flex:1,padding:'12px',background:gender===g?V.am:V.bg,color:gender===g?V.bg:V.mu,border:`1px solid ${gender===g?V.am:V.br}`,fontFamily:FF,fontSize:16,cursor:'pointer',letterSpacing:2}}>
            {g==='female'?'♀ FEMALE':'♂ MALE'}
          </button>
        ))}
      </div>
      {err&&<p style={{color:'#E05050',fontSize:14,marginBottom:12,textAlign:'center'}}>{err}</p>}
      <button className="hvr-fill" onClick={handleReveal}
        style={{width:'100%',background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'16px',fontFamily:FF,fontSize:20,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s'}}>
        REVEAL MY ELEMENT ✦
      </button>
    </div>
  );

  // ── LANDING PAGE ─────────────────────────────────────────
  if(view==='landing') return(
    <div style={base}>
      <style>{`
        @keyframes tw{0%,100%{opacity:.8}50%{opacity:.2}}
        @keyframes tw2{0%,100%{opacity:.45}50%{opacity:.95}}
        .hvr-fill:hover{background:#E88C12!important;color:#060C18!important}
        .el-item:hover{background:#0A1628}
        .pkg-card:hover{border-color:#E88C12!important}
        @media(max-width:600px){
          .hero-h1{font-size:38px!important;line-height:1.15!important}
          .hero-sub{font-size:16px!important}
          .pkg-grid{grid-template-columns:1fr!important}
          .why-grid{grid-template-columns:1fr!important}
          .el-strip{flex-wrap:wrap}
          .el-strip>div{min-width:33%}
          .bundle-inner{flex-direction:column!important;align-items:flex-start!important}
          .hero-pad{padding:56px 20px 20px!important}
          .section-pad{padding:56px 20px!important}
        }
      `}</style>
      {popup&&<DiscountPopup/>}

      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:`1px solid ${V.br}`,position:'sticky',top:0,background:'rgba(6,12,24,.97)',zIndex:50}}>
        <div style={{fontSize:18,letterSpacing:5}}><span style={{color:V.am,fontSize:22}}>사</span>주 SAJU</div>
        <button className="hvr-fill" onClick={()=>document.getElementById('saju-form').scrollIntoView({behavior:'smooth'})}
          style={{background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'9px 22px',fontFamily:FF,fontSize:14,cursor:'pointer',letterSpacing:3,transition:'all .2s'}}>
          GET READING
        </button>
      </nav>

      {/* HERO */}
      <section style={{position:'relative',overflow:'hidden'}}>
        <div className="hero-pad" style={{position:'relative',zIndex:3,textAlign:'center',padding:'72px 40px 32px'}}>
          <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:-1}} viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice">
            {[[42,28,1,'tw',2.8,0],[112,14,1.5,'tw2',3.4,.5],[198,44,1,'tw',2.2,.2],[278,11,1,'tw2',3.8,.8],[354,34,1.5,'tw',2.5,.3],[432,7,1,'tw2',3,.1],[512,26,1,'tw',2.8,.6],[594,17,1.5,'tw2',3.2,1],[664,38,1,'tw',2.6,.4],[754,20,1,'tw2',2.9,.9],[68,72,1,'tw',3.6,.7],[164,86,1.5,'tw2',2.4,.2],[244,64,1,'tw',3.1,.5],[484,68,1.5,'tw',3.3,.8],[720,60,1.5,'tw',3,.9],[34,126,1,'tw2',3.7,.2],[394,116,1,'tw2',3.4,.5],[544,130,1,'tw',2.2,.1]].map(([cx,cy,r,a,d,dl],i)=>(
              <circle key={i} cx={cx} cy={cy} r={r} fill={i%9===4?'#C8A055':i%13===7?'#E88C12':'#EDE5D3'} style={{animation:`${a} ${d}s ${dl}s infinite`}}/>
            ))}
            <circle cx="680" cy="55" r="28" fill="#C8A055" opacity=".14"/><circle cx="690" cy="53" r="24" fill="#060C18"/><path d="M658 50 Q668 40 680 56 Q668 72 658 62 Q650 56 658 50Z" fill="#C8A055" opacity=".30"/>
          </svg>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:20}}>K-ASTROLOGY · SAJU · KOREAN FATE READING</p>
          <h1 className="hero-h1" style={{fontSize:64,lineHeight:1.08,fontWeight:600,marginBottom:20}}>
            You Were Born<br/>From The <span style={{color:V.am}}>Elements</span>
          </h1>
          <p className="hero-sub" style={{fontSize:20,color:V.mu,lineHeight:1.65,maxWidth:480,margin:'0 auto 36px'}}>
            Ancient Korean SAJU reveals whether fire, water, wood, earth, or metal shapes your destiny.
          </p>
          <button className="hvr-fill" onClick={()=>document.getElementById('saju-form').scrollIntoView({behavior:'smooth'})}
            style={{background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'15px 44px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s',marginBottom:18}}>
            DISCOVER YOUR ELEMENT ✦
          </button>
          <p style={{fontSize:12,color:'#2A4060',letterSpacing:3}}>✦ TRUSTED BY 40,000+ SEEKERS WORLDWIDE ✦</p>
        </div>
        <div style={{position:'relative',height:380,overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:60,background:`linear-gradient(to bottom,${V.bg},transparent)`,zIndex:2,pointerEvents:'none'}}/>
          <KoreanNight/>
        </div>
      </section>

      {/* WHY SAJU */}
      <section className="section-pad" style={{padding:'80px 40px',borderTop:`1px solid ${V.br}`,borderBottom:`1px solid ${V.br}`}}>
        <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:20}}>WHY SAJU?</p>
          <h2 style={{fontSize:40,fontWeight:400,lineHeight:1.25,marginBottom:36}}>Tarot told you nothing.<br/>Astrology left you guessing.<br/><span style={{color:V.am}}>SAJU actually answers.</span></h2>
          <div className="why-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,textAlign:'left',marginBottom:48}}>
            {[
              {icon:'木',title:'You were born from nature',body:"From the moment of your first breath, one of the Five Elements became the core of who you are. This isn't a personality test. This is the universe's own record of you."},
              {icon:'地',title:"The Earth's code, decoded",body:"SAJU reads from the same elemental forces that govern the natural world. Live in alignment with your element, and happiness is not a hope — it is a certainty."},
              {icon:'命',title:'Your path to happiness exists',body:'Tarot shows you cards. Astrology shows you planets. SAJU shows you you — with precision born from thousands of years of Eastern wisdom.'},
              {icon:'✦',title:'The K-way to go',body:"From K-pop to K-beauty, Korea has been showing the world a better way to live. SAJU is Korea's oldest gift — the ancient science of living aligned with your true nature."},
            ].map((c,i)=>(
              <div key={i} style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px'}}>
                <div style={{fontSize:28,color:V.am,marginBottom:10,lineHeight:1}}>{c.icon}</div>
                <h3 style={{fontSize:19,marginBottom:10,fontWeight:400}}>{c.title}</h3>
                <p style={{fontSize:16,color:V.mu,lineHeight:1.7}}>{c.body}</p>
              </div>
            ))}
          </div>
          <p style={{fontSize:20,color:V.tx,lineHeight:1.9,maxWidth:580,margin:'0 auto',fontStyle:'italic'}}>
            "당신이 행복해질 길이 있다. 그것을 알려준다."<br/>
            <span style={{fontSize:16,color:V.mu,fontStyle:'normal'}}>Your path to happiness exists. We will show it to you.</span>
          </p>
        </div>
      </section>

      {/* 5 ELEMENTS */}
      <div className="el-strip" style={{display:'flex',borderBottom:`1px solid ${V.br}`}}>
        {[['木','WOOD','Growth · Vision','#4CAF50'],['火','FIRE','Passion · Power','#E84012'],['土','EARTH','Stability · Trust','#C8A020'],['金','METAL','Precision · Will','#CCCCCC'],['水','WATER','Flow · Wisdom','#4090E0']].map(([ch,nm,tr,cl])=>(
          <div key={nm} className="el-item" style={{flex:1,textAlign:'center',padding:'26px 8px',borderRight:`1px solid ${V.br}`,transition:'background .25s'}}>
            <div style={{fontSize:32,color:cl,marginBottom:6}}>{ch}</div>
            <div style={{fontSize:11,letterSpacing:4,color:V.mu}}>{nm}</div>
            <div style={{fontSize:13,color:V.mu,marginTop:4}}>{tr}</div>
          </div>
        ))}
      </div>

      {/* PACKAGES — Basic | Story top / Love | Career bottom */}
      <section className="section-pad" style={{padding:'80px 32px'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:14}}>CHOOSE YOUR READING</p>
          <h2 style={{fontSize:40,fontWeight:400,lineHeight:1.2}}>Your Fate, Your Choice</h2>
          <p style={{fontSize:17,color:V.mu,marginTop:10}}>Every reading generated uniquely from your birth data</p>
        </div>
        <div className="pkg-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,maxWidth:800,margin:'0 auto'}}>
          {[
            {id:'basic',ko:'Basic Fortune',en:'FULL SAJU READING',desc:'Your five elements, your chart, complete destiny reading — plus the K-pop idol who shares your exact energy.',orig:'₩33,000',price:'₩20,000',badge:'MOST POPULAR',badgePos:'left',il:<IllusPentagon/>},
            {id:'story',ko:'Your Story',en:'DESTINY STORY',desc:'A Korean fairy tale written in the stars with you as the hero. Your birth chart becomes a story of love, trial, and triumph.',orig:'₩40,000',price:'₩30,000',badge:'SIGNATURE ✦',badgePos:'right',featured:true,il:<IllusPerson/>},
            {id:'love',ko:'Love Fortune',en:'LOVE READING',desc:'Your ideal partner element, timing of love, and what the cosmos says about your romantic destiny.',orig:null,price:'₩10,000',badge:null,il:<IllusMoons/>},
            {id:'career',ko:'Career Fortune',en:'CAREER READING',desc:'Your natural talents, destined career paths, and the exact decade your power peaks.',orig:null,price:'₩10,000',badge:null,il:<IllusMountain/>},
          ].map(pkg=>(
            <div key={pkg.id} className="pkg-card" onClick={()=>document.getElementById('saju-form').scrollIntoView({behavior:'smooth'})}
              style={{background:V.s,border:`1px solid ${pkg.featured?V.go:V.br}`,padding:'28px',cursor:'pointer',transition:'border-color .25s',position:'relative'}}>
              {pkg.badge&&<span style={{position:'absolute',top:-1,[pkg.badgePos==='left'?'left':'right']:22,background:pkg.featured?V.go:V.am,color:V.bg,fontSize:10,letterSpacing:2,padding:'4px 12px',fontWeight:700}}>{pkg.badge}</span>}
              <div style={{height:110,marginBottom:20}}>{pkg.il}</div>
              <div style={{fontSize:22,letterSpacing:1,marginBottom:4}}>{pkg.ko}</div>
              <div style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:10}}>{pkg.en}</div>
              <div style={{fontSize:15,color:V.mu,lineHeight:1.6,marginBottom:18}}>{pkg.desc}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:10}}>
                {pkg.orig&&<span style={{fontSize:14,color:'#2A4070',textDecoration:'line-through'}}>{pkg.orig}</span>}
                <span style={{fontSize:28,color:V.am,fontWeight:600}}>{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Bundle */}
        <div onClick={()=>document.getElementById('saju-form').scrollIntoView({behavior:'smooth'})}
          style={{background:V.s,border:`1px solid ${V.go}`,padding:'32px',maxWidth:800,margin:'18px auto 0',cursor:'pointer',position:'relative'}}>
          <span style={{position:'absolute',top:-1,left:28,background:V.am,color:V.bg,fontSize:10,letterSpacing:2,padding:'4px 14px',fontWeight:700}}>BEST VALUE</span>
          <div className="bundle-inner" style={{display:'flex',alignItems:'center',gap:32}}>
            <svg viewBox="0 0 140 100" width="120" height="86" style={{flexShrink:0}}>
              <circle cx="70" cy="50" r="34" fill="none" stroke="#C8A055" strokeWidth=".8" strokeDasharray="3 3"/><circle cx="70" cy="50" r="21" fill="none" stroke="#E88C12" strokeWidth=".8" strokeDasharray="2 4"/>
              <text x="70" y="57" textAnchor="middle" fontSize="25" fill="#E88C12" fontFamily="serif">命</text>
              {[[70,15,'#0D2010','#4CAF50','木'],[100,33,'#2A0E08','#E84012','火'],[90,70,'#2A2410','#C8A020','土'],[50,70,'#1A1A1A','#CCCCCC','金'],[40,33,'#0A1530','#4090E0','水']].map(([cx,cy,bg,cl,ch],i)=>(<g key={i}><circle cx={cx} cy={cy} r="7" fill={bg} stroke={cl} strokeWidth=".8"/><text x={cx} y={cy+4} textAnchor="middle" fontSize="9" fill={cl} fontFamily="serif">{ch}</text></g>))}
            </svg>
            <div>
              <div style={{fontSize:24,letterSpacing:1,marginBottom:4}}>Complete Destiny Bundle</div>
              <div style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:10}}>ALL FOUR READINGS</div>
              <div style={{fontSize:15,color:V.mu,lineHeight:1.6,marginBottom:14}}>Basic + Love + Career + Your Story — everything revealed in one.</div>
              <div style={{display:'flex',alignItems:'baseline',gap:10}}>
                <span style={{fontSize:15,color:'#2A4070',textDecoration:'line-through'}}>₩50,000</span>
                <span style={{fontSize:32,color:V.am,fontWeight:600}}>₩45,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="saju-form" style={{padding:'80px 32px',borderTop:`1px solid ${V.br}`,textAlign:'center',background:V.s}}>
        <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:16}}>BEGIN YOUR READING</p>
        <h2 style={{fontSize:44,fontWeight:600,marginBottom:14,lineHeight:1.1}}>What Element<br/><span style={{color:V.am}}>Are You?</span></h2>
        <p style={{fontSize:17,color:V.mu,lineHeight:1.6,maxWidth:380,margin:'0 auto 40px'}}>Enter your birthday. Find out which of the Five Elements you were born from — instantly, for free.</p>
        <DateInput/>
      </section>
    </div>
  );

  // ── FREE ELEMENT REVEAL ───────────────────────────────────
  if(view==='reveal'&&saju){
    const d=SD[saju.day.s]||SD['甲'];
    const idols=IDOLS[saju.day.s]||[];
    return(
      <div style={{...base,minHeight:'100vh'}}>
        <style>{`
          @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
          @keyframes rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
          .ri{animation:rise .8s ease forwards}
          .ri2{animation:rise .8s .2s ease both}
          .ri3{animation:rise .8s .4s ease both}
          .ri4{animation:rise .8s .6s ease both}
          .ri5{animation:rise .8s .8s ease both}
          .hvr-fill:hover{background:#E88C12!important;color:#060C18!important}
        `}</style>
        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:`1px solid ${V.br}`,background:V.bg}}>
          <div style={{fontSize:18,letterSpacing:5}}><span style={{color:V.am,fontSize:22}}>사</span>주 SAJU</div>
          <button onClick={()=>setView('landing')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'7px 16px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2}}>← Back</button>
        </nav>

        <div style={{maxWidth:600,margin:'0 auto',padding:'60px 28px 80px',textAlign:'center'}}>
          {/* Big element reveal */}
          <div className="ri" style={{marginBottom:32}}>
            <p style={{fontSize:12,letterSpacing:7,color:d.color,marginBottom:20,opacity:.8}}>YOUR ELEMENT · {d.ko.toUpperCase()} · {d.el.toUpperCase()}</p>
            <div style={{fontSize:140,lineHeight:1,color:d.color,marginBottom:8,animation:'glow 3s infinite',textShadow:`0 0 60px ${d.color}44`}}>{d.sym}</div>
            <div style={{fontSize:52,fontWeight:600,marginBottom:6}}>{d.nameKo}</div>
            <div style={{fontSize:26,color:d.color,letterSpacing:2,marginBottom:16}}>{d.name}</div>
            <p style={{fontSize:20,color:V.mu,fontStyle:'italic',letterSpacing:1}}>{d.tag}</p>
          </div>

          {/* Day stem display */}
          <div className="ri2" style={{background:d.bg,border:`1px solid ${d.color}44`,padding:'14px 24px',marginBottom:40,display:'inline-block'}}>
            <span style={{fontSize:13,color:V.mu,letterSpacing:3}}>DAY MASTER · </span>
            <span style={{fontSize:20,color:d.color,letterSpacing:2}}>{saju.day.s} {saju.day.b} · {saju.day.ko}일주</span>
          </div>

          {/* 3 paragraphs */}
          <div className="ri3" style={{textAlign:'left',marginBottom:48}}>
            <p style={{fontSize:19,lineHeight:1.9,color:V.tx,marginBottom:24,borderLeft:`3px solid ${d.color}`,paddingLeft:20}}>{d.p1}</p>
            <p style={{fontSize:19,lineHeight:1.9,color:V.mu,marginBottom:24}}>{d.p2}</p>
            <p style={{fontSize:19,lineHeight:1.9,color:d.color,fontStyle:'italic'}}>{d.p3}</p>
          </div>

          {/* K-pop idol match teaser */}
          {idols.length>0&&(
            <div className="ri4" style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px',marginBottom:40,textAlign:'left'}}>
              <p style={{fontSize:12,letterSpacing:5,color:V.go,marginBottom:14}}>YOUR ENERGY IN K-POP</p>
              <p style={{fontSize:17,color:V.mu,lineHeight:1.7,marginBottom:12}}>
                <span style={{color:V.tx}}>{idols.map(i=>`${i.name} (${i.group})`).join(' and ')}</span> share your exact Day Master energy — {saju.day.s}, {d.name}.
              </p>
              <p style={{fontSize:15,color:V.mu,lineHeight:1.6}}>
                In your <span style={{color:V.am}}>Full Basic Reading</span>, discover which K-drama actors, K-pop idols, and historical figures share your exact 사주 pillars — and what that reveals about your destiny.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="ri5">
            <p style={{fontSize:16,color:V.mu,marginBottom:20,lineHeight:1.6}}>This is your element. But your full destiny — love, career, your story — goes so much deeper.</p>
            <button className="hvr-fill" onClick={()=>setView('saju')}
              style={{width:'100%',background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'18px',fontFamily:FF,fontSize:20,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s',marginBottom:12}}>
              UNLOCK MY FULL READING ✦
            </button>
            <p style={{fontSize:13,color:'#2A4060',letterSpacing:2}}>Basic Fortune from ₩20,000 · Complete Bundle ₩45,000</p>
          </div>
        </div>
      </div>
    );
  }

  // ── SAJU CHART ────────────────────────────────────────────
  if(view==='saju'&&saju){
    const dom=dominant([saju.year,saju.month,saju.day]);
    const elCnt={};[saju.year,saju.month,saju.day].forEach(p=>{elCnt[p.se]=(elCnt[p.se]||0)+1;elCnt[p.be]=(elCnt[p.be]||0)+1;});
    return(
      <div style={{...base,padding:'40px 24px'}}>
        <style>{`.pg:hover{border-color:#E88C12!important}`}</style>
        <div style={{textAlign:'center',marginBottom:28}}>
          <p style={{fontSize:11,letterSpacing:6,color:V.am,marginBottom:10}}>YOUR SAJU · FOUR PILLARS</p>
          <h2 style={{fontSize:28,fontWeight:400,marginBottom:8}}>Your Cosmic Blueprint</h2>
          <p style={{fontSize:14,color:V.mu}}><span style={{color:EC[dom]}}>{ECH[dom]} {dom}</span> dominant</p>
        </div>
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {[{p:saju.year,l:'Year Pillar'},{p:saju.month,l:'Month Pillar'},{p:saju.day,l:'Day Master'}].map(({p,l})=>(
            <div key={l} style={{background:EBG[p.se],border:`1px solid ${EC[p.se]}55`,padding:'16px 10px',textAlign:'center',flex:1,minWidth:0}}>
              <div style={{fontSize:10,letterSpacing:3,color:V.mu,marginBottom:10}}>{l}</div>
              <div style={{fontSize:38,color:EC[p.se],lineHeight:1,marginBottom:2}}>{p.s}</div>
              <div style={{fontSize:28,color:EC[p.be],lineHeight:1,marginBottom:10}}>{p.b}</div>
              <div style={{fontSize:11,color:V.mu,marginBottom:8}}>{p.ko}</div>
              <div style={{fontSize:10,padding:'2px 7px',background:`${EC[p.se]}22`,color:EC[p.se],border:`1px solid ${EC[p.se]}44`,display:'inline-block',marginBottom:3}}>{ECH[p.se]} {p.se}</div><br/>
              <div style={{fontSize:10,padding:'2px 7px',background:`${EC[p.be]}22`,color:EC[p.be],border:`1px solid ${EC[p.be]}44`,display:'inline-block',marginTop:3}}>{ECH[p.be]} {p.be}</div>
            </div>
          ))}
        </div>
        <div style={{background:V.s,border:`1px solid ${V.br}`,padding:'12px',marginBottom:16}}>
          <p style={{fontSize:10,letterSpacing:5,color:V.mu,marginBottom:8,textAlign:'center'}}>ELEMENTAL BALANCE</p>
          <div style={{display:'flex',justifyContent:'center',gap:16}}>{['Wood','Fire','Earth','Metal','Water'].map(el=>{const n=elCnt[el]||0;return n>0&&(<div key={el} style={{textAlign:'center'}}><div style={{fontSize:20,color:EC[el]}}>{ECH[el]}</div><div style={{display:'flex',gap:3,marginTop:2,justifyContent:'center'}}>{Array(n).fill(0).map((_,i)=><div key={i} style={{width:4,height:4,background:EC[el]}}/>)}</div></div>);})}</div>
        </div>
        {(()=>{const ps=PM[saju.day.s][gender==='male'?'m':'f'],pe=SE[S.indexOf(ps)];return(<div style={{background:EBG[pe],border:`1px solid ${EC[pe]}44`,padding:'9px',marginBottom:20,textAlign:'center'}}><span style={{fontSize:12,letterSpacing:3,color:V.mu}}>Ideal Partner: </span><span style={{fontSize:15,color:EC[pe]}}>{ECH[pe]} {pe} · {ps}</span></div>);})()}
        <p style={{fontSize:14,color:V.mu,textAlign:'center',marginBottom:14,letterSpacing:1}}>Select a reading to generate</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,maxWidth:440,margin:'0 auto 14px'}}>
          {TABS.map(t=>(<button key={t.id} className="pg" onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.tx,padding:'16px 12px',fontFamily:FF,cursor:'pointer',textAlign:'left',transition:'border-color .2s'}}><div style={{fontSize:22,color:V.am,marginBottom:4}}>{t.icon}</div><div style={{fontSize:16,letterSpacing:1,marginBottom:2}}>{t.ko}</div></button>))}
        </div>
        {err&&<p style={{color:'#E05050',fontSize:13,marginBottom:10,textAlign:'center'}}>{err}</p>}
        <div style={{textAlign:'center',marginTop:10}}>
          <button onClick={()=>setView('reveal')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'7px 18px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3}}>← My Element</button>
        </div>
      </div>
    );
  }

  // ── LOADING ───────────────────────────────────────────────
  if(view==='loading') return(
    <div style={{...base,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.15}50%{opacity:1}}`}</style>
      <div style={{fontSize:80,color:V.am,animation:'spin 4s linear infinite',display:'inline-block',marginBottom:28,lineHeight:1}}>命</div>
      <p style={{fontSize:12,letterSpacing:7,color:V.mu,marginBottom:24}}>CONSULTING THE ELEMENTS</p>
      <div style={{display:'flex',gap:18}}>{['木','火','土','金','水'].map((c,i)=>(<span key={c} style={{fontSize:26,color:[EC.Wood,EC.Fire,EC.Earth,EC.Metal,EC.Water][i],animation:`pulse 1.5s ${i*0.28}s infinite`}}>{c}</span>))}</div>
    </div>
  );

  // ── READING ───────────────────────────────────────────────
  if(view==='reading'){
    const reading=readings[tab];
    if(!reading)return <div style={{...base,padding:40,textAlign:'center',color:V.mu}}>loading...</div>;
    const isStory=tab==='story',sections=isStory?null:parseSections(reading),tabInfo=TABS.find(t=>t.id===tab),dom=saju?dominant([saju.year,saju.month,saju.day]):'';
    return(
      <div style={{...base,padding:'28px 20px'}}>
        <style>{`.r-tab:hover{color:#EDE5D3!important} .r-more:hover{border-color:#E88C12!important;color:#E88C12!important}`}</style>
        <div style={{display:'flex',borderBottom:`1px solid ${V.br}`,marginBottom:28,overflowX:'auto'}}>
          {TABS.map(t=>(<button key={t.id} className="r-tab" onClick={()=>generate(t.id)} style={{flex:'0 0 auto',padding:'10px 12px',background:'none',border:'none',borderBottom:tab===t.id?`2px solid ${V.am}`:'2px solid transparent',color:tab===t.id?V.am:V.mu,fontFamily:FF,fontSize:12,cursor:'pointer',letterSpacing:1,transition:'color .2s',marginBottom:'-1px',whiteSpace:'nowrap'}}>{t.ko}</button>))}
        </div>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontSize:32,color:V.am,lineHeight:1,marginBottom:8}}>{tabInfo?.icon}</div>
          <h2 style={{fontSize:28,fontWeight:400}}>{tabInfo?.ko}</h2>
          {saju&&<p style={{fontSize:12,color:V.mu,marginTop:6,letterSpacing:2}}>{saju.day.s} Day Master · <span style={{color:EC[dom]}}>{ECH[dom]} {dom}</span></p>}
        </div>
        {isStory
          ?<div style={{background:V.s,border:`1px solid ${V.go}`,padding:'28px 24px',maxWidth:600,margin:'0 auto'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${V.br}`}}><span style={{fontSize:10,letterSpacing:5,color:V.go}}>YOUR STORY</span><span style={{fontSize:10,letterSpacing:5,color:V.go}}>당신의 이야기 ✦</span></div><p style={{fontSize:17,lineHeight:2.1,color:V.tx,fontStyle:'italic',whiteSpace:'pre-wrap'}}>{reading}</p><div style={{textAlign:'center',marginTop:16,fontSize:11,letterSpacing:5,color:V.go}}>✦ THE END · 끝 ✦</div></div>
          :<div style={{maxWidth:600,margin:'0 auto'}}>{sections&&sections.length>0?sections.map((sec,i)=>(<div key={i} style={{marginBottom:24,paddingBottom:24,borderBottom:i<sections.length-1?`1px solid ${V.br}`:'none'}}><h3 style={{fontSize:12,letterSpacing:5,color:V.am,marginBottom:12}}>{sec.title}</h3><p style={{fontSize:17,lineHeight:2,color:V.tx}}>{sec.body}</p></div>)):<p style={{fontSize:17,lineHeight:2,color:V.tx,whiteSpace:'pre-wrap'}}>{reading}</p>}</div>
        }
        <div style={{textAlign:'center',marginTop:32,display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setView('saju')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'9px 18px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3}}>← My Chart</button>
          {TABS.filter(t=>t.id!==tab).map(t=>(<button key={t.id} className="r-more" onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.mu,padding:'9px 14px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2,transition:'all .2s',opacity:readings[t.id]?1:.65}}>{readings[t.id]?t.ko:`${t.ko} +`}</button>))}
        </div>
      </div>
    );
  }
  return <div style={base}/>;
}
