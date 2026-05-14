import { useState } from "react";
const S=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const B=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SE=['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water'];
const BE=['Water','Earth','Wood','Wood','Earth','Fire','Fire','Earth','Metal','Metal','Earth','Water'];
const SY=['Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin'];
const SKO=['갑','을','병','정','무','기','경','신','임','계'];
const BKO=['자','축','인','묘','진','사','오','미','신','유','술','해'];
const EC={Wood:'#B38B8B',Fire:'#B38B8B',Earth:'#B38B8B',Metal:'#B38B8B',Water:'#B38B8B'};
const ECH={Wood:'木',Fire:'火',Earth:'土',Metal:'金',Water:'水'};
const EBG={Wood:'#F0EDE8',Fire:'#F5EDEC',Earth:'#F2EDE8',Metal:'#F2EEE6',Water:'#EBF0F5'};
const PM={'甲':{m:'己',f:'辛'},'乙':{m:'戊',f:'庚'},'丙':{m:'辛',f:'癸'},'丁':{m:'庚',f:'壬'},'戊':{m:'癸',f:'乙'},'己':{m:'壬',f:'甲'},'庚':{m:'乙',f:'丁'},'辛':{m:'甲',f:'丙'},'壬':{m:'丁',f:'己'},'癸':{m:'丙',f:'戊'}};
const V={bg:'#F9F7F2',s:'#F2EEE6',tx:'#1A1A1A',mu:'#555555',am:'#B38B8B',br:'#E0DCD0',go:'#B38B8B'};
const FF="'Cormorant Garamond',Georgia,serif";
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const COMPAT={
  nourish_give:{title:'You light them up',score:92,tag:'Deeply Complementary',desc:'Your element naturally feeds and energizes theirs. You bring out the best in each other. This is the kind of connection that grows stronger with time.'},
  nourish_receive:{title:'They light you up',score:88,tag:'Beautifully Supportive',desc:'Their element feeds and energizes yours. They inspire you to grow, and you absorb their energy beautifully. Together you move forward.'},
  control_give:{title:'You challenge them',score:74,tag:'Intensely Magnetic',desc:'Your element keeps theirs in check. Electric tension, the kind that becomes transformation or turbulence. Deeply magnetic. Needs awareness.'},
  control_receive:{title:'They challenge you',score:70,tag:'Powerfully Transformative',desc:'Their element challenges yours. Friction creates heat. If both stay open, this becomes the relationship that changes everything.'},
  same:{title:'You mirror each other',score:80,tag:'Mirror Souls',desc:'You share the same element. You understand each other on a level words cannot reach, but two of the same can amplify both the light and the shadow.'},
};
function getCompat(e1,e2){const ch=['Wood','Fire','Earth','Metal','Water'],i=ch.indexOf(e1),j=ch.indexOf(e2);if(e1===e2)return COMPAT.same;if((i+1)%5===j)return COMPAT.nourish_give;if((j+1)%5===i)return COMPAT.nourish_receive;if((i+2)%5===j)return COMPAT.control_give;if((j+2)%5===i)return COMPAT.control_receive;return COMPAT.same;}
const SD={
  '甲':{el:'Wood',ko:'목',sym:'木',color:'#B38B8B',bg:'#F0EDE8',name:'The Ancient Forest',nameKo:'숲',tag:'Born to grow beyond what anyone expected.',p1:'You are the tallest tree in the forest, roots deep, branches wide, always reaching for light others cannot yet see. A natural trailblazer who quietly transforms every room you enter.',p2:'But forests feel every storm. You carry the weight of always being expected to rise, even when the ground beneath you is shaking. You hold others up so often you forget: who holds you?',p3:'2026 brings your most powerful growth phase in years. The seeds you planted in solitude are finally breaking ground.'},
  '乙':{el:'Wood',ko:'목',sym:'木',color:'#B38B8B',bg:'#F0EDE8',name:'The Wildflower',nameKo:'들꽃',tag:'You bloom in places others said nothing could grow.',p1:'Wood is the vine that finds its way through stone. Adaptable, alive, quietly beautiful. You make any space warmer simply by being in it. People are drawn to you without knowing why.',p2:'The shadow of this energy is over-giving. You have bent yourself into shapes to fit others and wondered why you felt empty. Your softness is not weakness, it is your greatest power.',p3:'2026 requires your full, uncompromised self, and it will be magnetically drawn to exactly that.'},
  '丙':{el:'Fire',ko:'화',sym:'火',color:'#B38B8B',bg:'#F5EDEC',name:'The Sun',nameKo:'태양',tag:'Wherever you go, the temperature rises.',p1:'You are daytime fire, generous, radiant, magnetic. People gather around you the way they gather around sunlight: not because they have to, but because it simply feels good to be near you.',p2:'But the sun cannot hide. You have felt the exhaustion of always being the one who shows up, who shines, who keeps everyone warm, while quietly burning yourself out.',p3:'2026 is the year you direct that warmth inward first. The right people are already on their way.'},
  '丁':{el:'Fire',ko:'화',sym:'火',color:'#B38B8B',bg:'#F5EDEC',name:'The Candleflame',nameKo:'촛불',tag:'Small. Intimate. Impossible to ignore.',p1:'Fire is the candle in a dark room, focused, personal. You illuminate things one person, one moment at a time. That kind of warmth changes lives in ways a bonfire never could.',p2:'Candles burn from both ends when asked to light too many rooms at once. You have given your warmth to people who did not protect the flame. Learning which rooms truly deserve your light is the art.',p3:'An unexpected connection arrives in 2026, someone who cups their hands around you. This one is different.'},
  '戊':{el:'Earth',ko:'토',sym:'土',color:'#B38B8B',bg:'#F2EDE8',name:'The Mountain',nameKo:'산',tag:'When everything moves, you remain.',p1:'You are the mountain, ancient, patient, unmoved by weather that sends the valley into panic. You carry a quiet authority that others feel before you have spoken a word.',p2:'But mountains carry the weight of everything that rests on them. You have held others together so many times that you forgot to ask: who holds me?',p3:'2026 asks you to be still. Your power this year is not in action, it is in presence.'},
  '己':{el:'Earth',ko:'토',sym:'土',color:'#B38B8B',bg:'#F2EDE8',name:'The Garden',nameKo:'대지',tag:'You make everything you touch grow.',p1:'Earth is fertile soil, nurturing, receptive, life-giving. Your emotional intelligence is extraordinary. You read rooms, people, and unspoken needs with almost supernatural precision.',p2:'Gardens can be over-cultivated. You have absorbed the pain of others as your own. Your sensitivity is a superpower, but it requires boundaries to flourish.',p3:'2026 asks you one question: whose garden are you tending? The answer should include your own.'},
  '庚':{el:'Metal',ko:'금',sym:'金',color:'#B38B8B',bg:'#F2EEE6',name:'The Great Boulder',nameKo:'큰 바위',tag:'Carved by fire. Unmovable by force.',p1:'Metal is raw iron ore, powerful, unrefined, forged through immense pressure into something extraordinary. You carry a quiet, unshakeable confidence. When you make a decision, it is final.',p2:'The boulder can become a prison. You have held on, to principles, to old wounds, long past the point they served you. The hardest thing for this energy is letting go. But it is the most transformative.',p3:'2026 is the year of refinement. Something that needed to break finally does. What remains is the clearest, truest version of you.'},
  '辛':{el:'Metal',ko:'금',sym:'金',color:'#B38B8B',bg:'#F2EEE6',name:'The Jewel',nameKo:'보석',tag:'Precious. Sharp. Rare.',p1:'Metal has already been through the fire and emerged refined. You are not raw ore, you are the finished gem. Exacting standards, sophisticated taste, an eye for quality that others simply do not possess.',p2:'Jewels cut. Your sharpness, of mind, of words, has wounded people you loved. The precision that makes you extraordinary can make you devastating when left unguarded.',p3:'This year, let someone see the jewel without the cut. Vulnerability will not diminish you. It will make you luminous.'},
  '壬':{el:'Water',ko:'수',sym:'水',color:'#B38B8B',bg:'#EBF0F5',name:'The Ocean',nameKo:'바다',tag:'Vast. Deep. Moving everything in your current.',p1:'Water is the ocean, enormous, powerful, in constant motion. You think on a scale that most people never dare. Your inner world is as deep as the sea.',p2:'Oceans can overwhelm coastlines. Your emotional depth and ambition can sweep people away before they are ready. Moving at the pace of others sometimes is the highest art.',p3:'2026 brings a shore finally worthy of your tide. Someone, or something, that can hold the full force of you.'},
  '癸':{el:'Water',ko:'수',sym:'水',color:'#B38B8B',bg:'#EBF0F5',name:'The Rain',nameKo:'빗물',tag:'Quiet. Pervasive. Necessary for everything to live.',p1:'Water is rain, soft, persistent, life-giving. You have a quiet influence that moves slowly and leaves everything transformed. Your intuition is almost supernatural.',p2:'Rain becomes a flood when it has nowhere to go. Your emotions, unprocessed, overwhelm. You were made to flow, not to hold still.',p3:'Let it rain in 2026. The feelings you have been holding, release them. What grows from that release will genuinely surprise you.'},
};
const IDOLS={
  '甲':[{name:'Jin',group:'BTS'},{name:'Rose',group:'BLACKPINK'},{name:'Kylie Jenner',group:'Media'},{name:'Olivia Rodrigo',group:'Singer'}],
  '乙':[{name:'G-Dragon',group:'BIGBANG'},{name:'V',group:'BTS'},{name:'Beyonce',group:'Singer'},{name:'Rihanna',group:'Singer'},{name:'Billie Eilish',group:'Singer'},{name:'Dua Lipa',group:'Singer'}],
  '丙':[{name:'Jungkook',group:'BTS'},{name:'Nayeon',group:'TWICE'},{name:'Justin Bieber',group:'Singer'},{name:'Post Malone',group:'Singer'}],
  '丁':[{name:'Jimin',group:'BTS'},{name:'IU',group:'Solo Artist'},{name:'Kim Kardashian',group:'Media'},{name:'Taylor Swift',group:'Singer'},{name:'Sydney Sweeney',group:'Actor'}],
  '戊':[{name:'Lisa',group:'BLACKPINK'},{name:'Ariana Grande',group:'Singer'},{name:'Harry Styles',group:'Singer'},{name:'Kendall Jenner',group:'Model'}],
  '己':[{name:'Suga',group:'BTS'},{name:'Karina',group:'aespa'},{name:'Selena Gomez',group:'Singer'}],
  '庚':[{name:'Lee Junho',group:'2PM'},{name:'Sabrina Carpenter',group:'Singer'},{name:'Cardi B',group:'Singer'}],
  '辛':[{name:'RM',group:'BTS'},{name:'Hyun Bin',group:'Actor'},{name:'Zendaya',group:'Actor'},{name:'Drake',group:'Singer'}],
  '壬':[{name:'Jennie',group:'BLACKPINK'},{name:'Baekhyun',group:'EXO'},{name:'Timothee Chalamet',group:'Actor'},{name:'The Weeknd',group:'Singer'}],
  '癸':[{name:'Zico',group:'Block B'},{name:'Taeyang',group:'BIGBANG'},{name:'Hailey Bieber',group:'Model'}],
};
function calcYear(y){const si=((y-4)%10+10)%10,bi=((y-4)%12+12)%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function calcMonth(y,m,d){const ySI=((y-4)%10+10)%10,base=[2,4,6,8,0][ySI%5],cuts=[6,4,6,5,6,6,7,8,8,8,7,7],mi=m-1,sol=d>=cuts[mi]?(mi-1+12)%12:(mi-2+12)%12,si=(base+sol)%10,bi=(sol+2)%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function calcDay(y,m,d){const diff=Math.round((Date.UTC(y,m-1,d)-Date.UTC(2000,0,1))/86400000),idx=((54+diff)%60+60)%60,si=idx%10,bi=idx%12;return{s:S[si],b:B[bi],se:SE[si],be:BE[bi],yy:SY[si],ko:SKO[si]+BKO[bi],si,bi};}
function dominant(ps){const c={};ps.forEach(p=>{c[p.se]=(c[p.se]||0)+1;c[p.be]=(c[p.be]||0)+1;});return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0];}
function buildPrompt(type,YP,MP,DP,gender){
  const dom=dominant([YP,MP,DP]),ps=PM[DP.s][gender==='male'?'m':'f'],pe=SE[S.indexOf(ps)];
  const pts={Wood:'growth-oriented, creative, idealistic, gentle',Fire:'passionate, charismatic, magnetically warm',Earth:'stable, loyal, nurturing',Metal:'principled, precise, quietly disciplined',Water:'wise, adaptable, emotionally profound'};
  const eW={Wood:'ancient jade forests, bamboo groves, mountains brushing the morning sky',Fire:'a kingdom of eternal flame, golden temples, blazing skies',Earth:'vast mountain kingdoms, ancient stone fortresses',Metal:'crystalline peaks, silver rivers under a full moon',Water:'moonlit seas, mist-covered rivers where all wisdom flows'};
  const trials={Wood:'the trial of loss, watching something nurtured wither before it bloomed',Fire:'the trial of consuming passion, burned by the fire inside',Earth:'the trial of endurance, holding steady while the world shifted',Metal:'the trial of severance, refined through what was cut away',Water:'the trial of deep solitude, searching the depths for something to hold'};
  const resols={Wood:'a love like spring, tender, unstoppable, full of new beginning',Fire:'a love like starfire, blazing, triumphant, illuminating everything',Earth:'deep roots at last, belonging, home, love that outlasts all seasons',Metal:'crystal clarity, your truest self finally recognized',Water:'flowing into peace, wisdom fulfilled, love found in stillness'};
  const idols=IDOLS[DP.s]||[];
  const idolLine=idols.length?`\nK-pop idols with Day Master ${DP.s}: ${idols.map(i=>`${i.name} (${i.group})`).join(' and ')}. Mention this warmly in WHO YOU ARE.`:'';
  const base=`Korean SAJU Birth Chart:\n- Year: ${YP.s}${YP.b} (${YP.se}/${YP.be})\n- Month: ${MP.s}${MP.b} (${MP.se}/${MP.be})\n- Day Master: ${DP.s}${DP.b} (${DP.yy} ${DP.se})\n- Dominant: ${dom}\n`;
  if(type==='basic')return`You are a master of Korean Four Pillars astrology. Write a deeply personal destiny reading in English using "you". Poetic, warm, specific. Every sentence should feel written for this exact person.\n\n${base}${idolLine}\n\n4 sections with ### headers:\n\n### WHO YOU ARE\n6-7 sentences. Vivid portrait of the ${DP.s} Day Master. Include the K-pop idol connection warmly.\n\n### YOUR ELEMENTAL NATURE\n5-6 sentences. The dominant element ${dom}: superpower, shadow, how it shows up daily.\n\n### YOUR LIFE PATH\n6-7 sentences. Weave all three pillars into a complete destiny narrative.\n\n### 2026 FORECAST\n5-6 sentences. Fire Horse year meets this chart. Be specific and encouraging.\n\nProse only. No bullets. Every line should surprise them.`;
  if(type==='love')return`You are a Korean SAJU love reader. Write a deeply personal love reading in English using "you". Romantic, luminous, specific.\n\n${base}Ideal partner element: ${pe} (${pts[pe]})\n\n4 sections with ### headers:\n\n### YOUR ROMANTIC NATURE\n5-6 sentences. How does this person love? What do they give? What do they secretly need?\n\n### YOUR IDEAL PARTNER\n6-7 sentences. Describe the ${pe} person. The feeling of being with them.\n\n### WHERE LOVE FINDS YOU\n5-6 sentences. The specific moment and place where this heart opens.\n\n### 2026 LOVE FORECAST\n5-6 sentences. What arrives for this chart in Fire Horse year?\n\nProse only. Romantic and luminous.`;
  if(type==='career')return`You are a Korean SAJU career oracle. Write a deeply personal career reading in English using "you". Confident, specific, empowering.\n\n${base}4 sections with ### headers:\n\n### YOUR NATURAL GIFTS\n5-6 sentences. What can this person do that most people struggle with?\n\n### DESTINED PATHS\n6-7 sentences. 5-6 specific career titles that match this chart. Explain why each one fits.\n\n### YOUR POWER DECADE\n5-6 sentences. When does this career peak? What age range? What to build now.\n\n### 2026 CAREER FORECAST\n5-6 sentences. What arrives for this chart in Fire Horse year?\n\nProse only. Confident and empowering.`;
  if(type==='story'){
    const hero=gender==='male'?'Knight':'Princess';
    const heroVerb=gender==='male'?'He sets out':'She leaves';
    return`You are writing a Korean fairy tale. The reader IS the main character. Write in second person: "you."
BIRTH CHART:
${base}
WRITE THIS EXACT STORY IN THREE PARTS:
PART 1 - WHO YOU ARE (about 250 words):
Open in this world: ${eW[YP.se]}.
You are a ${hero}. You have one great gift. Describe it using the ${YP.se} element as metaphor without naming it. You want one thing: someone who truly sees you. Just you.
One day a sign arrives. ${heroVerb}.
Write 3 short paragraphs. Simple sentences.
PART 2 - THE HARDEST MOMENT (about 300 words):
Show this trial: ${trials[MP.se]}.
Something concrete breaks. You are alone. You almost stop.
Then one small impossible thing appears and you choose to keep going.
Write 4 paragraphs.
PART 3 - THE ARRIVAL (about 300 words):
Resolution: ${resols[DP.se]}.
Write the meeting as a real scene.
You understand: everything that broke you led you exactly here.
End with three short sentences. The last is the most beautiful.
RULES: Every paragraph contains something that HAPPENS. Sentences 8-12 words. Korean details: lanterns, stone gates, cherry blossoms, moonlight, silk robes, jade mountains. NO markdown. Blank line between paragraphs. Do NOT name elements directly.`;}
}
async function callClaude(p,maxTok=1200){const r=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:p}],max_tokens:maxTok})});const d=await r.json();if(d.error)throw new Error(d.error.message);return d.content[0].text;}
function parseSections(text){const m=[...text.matchAll(/###\s+(.+?)\n([\s\S]+?)(?=\n###|$)/g)];return m.map(x=>({title:x[1].trim(),body:x[2].trim()}));}
const TABS=[{id:'basic',ko:'Basic Fortune',icon:'命'},{id:'love',ko:'The Relationship Decoder',icon:'♡'},{id:'career',ko:'The Success Compass',icon:'↑'},{id:'story',ko:'The Life Script',icon:'✦'}];
const PRODUCTS={basic:'drqcvf',love:'yqbcw',career:'lfvmx',story:'nuxbbx',bundle:'vhtko',combo:'hjazzy'};
function polarCheckout(productId,onSuccess,birthDate,gender){
  const isTest=typeof window!=='undefined'&&window.location.search.includes('test=true');
  if(isTest){if(onSuccess)onSuccess();return;}
  let url=`https://bornfromco.gumroad.com/l/${productId}?wanted=true`;
  if(birthDate)url+=`&birth_date=${encodeURIComponent(birthDate)}`;
  if(gender)url+=`&gender=${encodeURIComponent(gender==='male'?'male':'female')}`;
  window.open(url,'_blank');
}
function IllusPentagon(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><line x1="100" y1="16" x2="158" y2="62" stroke="#C4B0B0" strokeWidth="1"/><line x1="158" y1="62" x2="134" y2="106" stroke="#C4B0B0" strokeWidth="1"/><line x1="134" y1="106" x2="66" y2="106" stroke="#C4B0B0" strokeWidth="1"/><line x1="66" y1="106" x2="42" y2="62" stroke="#C4B0B0" strokeWidth="1"/><line x1="42" y1="62" x2="100" y2="16" stroke="#C4B0B0" strokeWidth="1"/><circle cx="100" cy="16" r="14" fill="#E8F0E8"/><text x="100" y="22" textAnchor="middle" fontSize="13" fill="#B38B8B" fontFamily="serif">木</text><circle cx="158" cy="62" r="14" fill="#F2EEE6"/><text x="158" y="68" textAnchor="middle" fontSize="13" fill="#B38B8B" fontFamily="serif">火</text><circle cx="134" cy="106" r="14" fill="#F2EEE6"/><text x="134" y="112" textAnchor="middle" fontSize="13" fill="#B38B8B" fontFamily="serif">土</text><circle cx="66" cy="106" r="14" fill="#F2EEE6"/><text x="66" y="112" textAnchor="middle" fontSize="13" fill="#B38B8B" fontFamily="serif">金</text><circle cx="42" cy="62" r="14" fill="#E8ECF5"/><text x="42" y="68" textAnchor="middle" fontSize="13" fill="#B38B8B" fontFamily="serif">水</text><circle cx="100" cy="62" r="18" fill="none" stroke="#B38B8B" strokeWidth=".8" strokeDasharray="4 3"/><text x="100" y="68" textAnchor="middle" fontSize="12" fill="#B38B8B" fontFamily="serif">命</text></svg>);}
function IllusPerson(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><circle cx="100" cy="20" r="2.5" fill="#B38B8B" opacity=".95"/><circle cx="45" cy="36" r="2" fill="#B38B8B" opacity=".85"/><line x1="100" y1="20" x2="45" y2="36" stroke="#B38B8B" strokeWidth=".5" opacity=".6"/><rect x="0" y="84" width="200" height="31" fill="#F2EEE6"/><line x1="0" y1="84" x2="200" y2="84" stroke="#C4B0B0" strokeWidth=".5"/><circle cx="100" cy="68" r="8" fill="#B38B8B"/><rect x="97" y="55" width="6" height="15" fill="#B38B8B" rx="1"/><line x1="100" y1="76" x2="94" y2="84" stroke="#B38B8B" strokeWidth="5" strokeLinecap="round"/><line x1="100" y1="76" x2="106" y2="84" stroke="#B38B8B" strokeWidth="5" strokeLinecap="round"/></svg>);}
function IllusMoons(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><path d="M62 57 Q62 24 82 24 Q102 24 102 57 Q102 80 82 90 Q62 80 62 57Z" fill="none" stroke="#B38B8B" strokeWidth="1.2"/><path d="M98 57 Q98 24 118 24 Q138 24 138 57 Q138 80 118 90 Q98 80 98 57Z" fill="none" stroke="#B38B8B" strokeWidth="1.2"/><circle cx="82" cy="57" r="16" fill="#F2EEE6"/><text x="82" y="63" textAnchor="middle" fontSize="16" fill="#B38B8B">♡</text><circle cx="118" cy="57" r="16" fill="#F2EEE6"/><text x="118" y="63" textAnchor="middle" fontSize="16" fill="#B38B8B">♡</text></svg>);}
function IllusMountain(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><polygon points="100,14 142,76 58,76" fill="none" stroke="#B38B8B" strokeWidth="1"/><polygon points="100,30 130,74 70,74" fill="#EDF0F5"/><rect x="86" y="74" width="28" height="22" fill="#EDF0F5"/><rect x="0" y="90" width="200" height="2" fill="#C4B0B0"/></svg>);}
function StoryIllus1(){return(<svg viewBox="0 0 500 180" width="100%" style={{display:'block',margin:'24px 0'}}><rect width="500" height="180" fill="#F9F7F2"/>{[[40,18,1.2],[90,10,1],[160,26,1.5],[230,7,1],[310,16,1.2],[380,9,1],[440,22,1.5]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#1A1A1A" opacity={.55+i%3*.15}/>))}<circle cx="420" cy="35" r="20" fill="#B38B8B" opacity=".2"/><path d="M400 31 Q410 21 420 35 Q410 49 400 41 Q393 35 400 31Z" fill="#B38B8B" opacity=".42"/><rect x="0" y="118" width="500" height="62" fill="#F2EEE6"/><rect x="60" y="100" width="380" height="22" fill="#EEF0F5"/><path d="M55 100 Q180 76 250 73 Q320 76 445 100" fill="none" stroke="#B38B8B" strokeWidth="2" opacity=".85"/><path d="M215 120 L215 98 Q215 86 228 86 L272 86 Q285 86 285 98 L285 120Z" fill="#B38B8B" opacity=".35"/>{[[140,90],[185,78],[315,78],[360,90]].map(([x,y],i)=>(<g key={i}><line x1={x} y1={y-9} x2={x} y2={y-2} stroke="#B38B8B" strokeWidth=".8"/><ellipse cx={x} cy={y+4} rx="5.5" ry="8.5" fill="#B38B8B" opacity=".85"/></g>))}</svg>);}
function StoryIllus2(){return(<svg viewBox="0 0 500 160" width="100%" style={{display:'block',margin:'24px 0'}}><rect width="500" height="160" fill="#F9F7F2"/>{[[30,13,1],[100,7,1.3],[180,18,1],[260,5,1.2],[340,12,1],[420,8,1.3]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#1A1A1A" opacity={.5+i%3*.2}/>))}<rect x="42" y="112" width="8" height="48" fill="#F2EEE6"/><polygon points="46,60 28,105 64,105" fill="#F2EEE6"/><polygon points="46,82 24,118 68,118" fill="#F2EEE6"/><rect x="452" y="112" width="8" height="48" fill="#F2EEE6"/><polygon points="456,60 438,105 474,105" fill="#F2EEE6"/><polygon points="456,82 434,118 478,118" fill="#F2EEE6"/><path d="M0 138 Q125 118 250 126 Q375 118 500 132 L500 160 L0 160Z" fill="#F2EEE6"/><rect x="247" y="94" width="6" height="60" fill="#555555"/>{[[215,84,7],[285,80,6],[250,63,7]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#B38B8B" opacity={.5+i%2*.25}/>))}</svg>);}
function StoryIllus3(){return(<svg viewBox="0 0 500 160" width="100%" style={{display:'block',margin:'24px 0'}}><rect width="500" height="160" fill="#F9F7F2"/>{[[25,13,1.5],[60,7,1],[95,18,1.5],[140,4,1.2],[180,16,1.8],[230,9,1],[275,20,1.5],[320,6,1.2],[365,14,1.8],[410,10,1],[450,18,1.5]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill={i%5===0?'#B38B8B':'#1A1A1A'} opacity={.6+i%3*.15}/>))}<circle cx="250" cy="45" r="28" fill="#B38B8B" opacity=".1"/>{[[100,65,.9],[150,52,.85],[200,62,.95],[250,38,.9],[300,58,.9],[360,52,.8]].map(([x,y,o],i)=>(<g key={i} opacity={o}><line x1={x} y1={y-9} x2={x} y2={y-2} stroke="#B38B8B" strokeWidth=".7"/><ellipse cx={x} cy={y+4} rx="5.5" ry="8" fill="#B38B8B"/></g>))}<path d="M0 138 Q250 120 500 130 L500 160 L0 160Z" fill="#F2EEE6"/></svg>);}
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
  const[showCompat,setShowCompat]=useState(false);
  const[cM,setCM]=useState('');const[cD,setCD]=useState('');const[cY,setCY]=useState('');
  const[compatResult,setCompatResult]=useState(null);
  const handleReveal=()=>{
    if(!month||!dayNum||!year){setErr('Please fill in your complete birthday');return;}
    const y=parseInt(year),m=parseInt(month),d=parseInt(dayNum);
    if(y<1920||y>2010){setErr('Please enter a birth year between 1920 and 2010');return;}
    setSaju({year:calcYear(y),month:calcMonth(y,m,d),day:calcDay(y,m,d)});
    setView('reveal');setErr('');
    if(typeof window!=='undefined')window.scrollTo(0,0);
  };
  const generate=async(type)=>{
    setTab(type);if(readings[type]){setView('reading');return;}
    setView('loading');
    try{const maxT=type==='story'?4000:2500;const text=await callClaude(buildPrompt(type,saju.year,saju.month,saju.day,gender),maxT);setReadings(r=>({...r,[type]:text}));setView('reading');}
    catch(e){setErr('Connection error. Please check Vercel environment variables.');setView('saju');}
  };
  const checkCompat=()=>{
    if(!cM||!cD||!cY)return;
    const td=calcDay(parseInt(cY),parseInt(cM),parseInt(cD));
    setCompatResult({theirEl:td.se,myEl:saju.day.se,result:getCompat(saju.day.se,td.se)});
  };
  const shareCompat=()=>{
    if(!compatResult)return;
    const ECH2={Wood:'木',Fire:'火',Earth:'土',Metal:'金',Water:'水'};
    const EC2={Wood:'#B38B8B',Fire:'#B38B8B',Earth:'#B38B8B',Metal:'#B38B8B',Water:'#B38B8B'};
    const canvas=document.createElement('canvas');
    const dpr=window.devicePixelRatio||2;
    canvas.width=1080*dpr;canvas.height=1080*dpr;
    canvas.style.width='1080px';canvas.style.height='1080px';
    const ctx=canvas.getContext('2d');
    ctx.scale(dpr,dpr);
    ctx.fillStyle='#F9F7F2';ctx.fillRect(0,0,1080,1080);
    ctx.strokeStyle='#B38B8B';ctx.lineWidth=3;ctx.strokeRect(36,36,1008,1008);
    ctx.fillStyle='#B38B8B';ctx.font='bold 48px Georgia';ctx.textAlign='center';
    ctx.fillText('BORN FROM',540,140);
    ctx.fillStyle='#555555';ctx.font='24px Georgia';
    ctx.fillText('COMPATIBILITY',540,220);
    const myCol=EC2[compatResult.myEl]||'#B38B8B';
    const thCol=EC2[compatResult.theirEl]||'#B38B8B';
    const mySym=ECH2[compatResult.myEl]||'?';
    const thSym=ECH2[compatResult.theirEl]||'?';
    ctx.font='bold 200px Georgia';
    ctx.fillStyle=myCol;ctx.textAlign='center';ctx.fillText(mySym,290,540);
    ctx.fillStyle='#B38B8B';ctx.font='80px Georgia';ctx.fillText('♡',540,500);
    ctx.fillStyle=thCol;ctx.font='bold 200px Georgia';ctx.fillText(thSym,790,540);
    ctx.fillStyle='#555555';ctx.font='26px Georgia';
    ctx.fillText('You',290,590);ctx.fillText('Them',790,590);
    ctx.fillStyle='#E0DCD0';ctx.fillRect(190,630,700,12);
    ctx.fillStyle='#B38B8B';ctx.fillRect(190,630,700*(compatResult.result.score/100),12);
    ctx.fillStyle='#B38B8B';ctx.font='bold 26px Georgia';
    ctx.fillText(compatResult.result.tag.toUpperCase()+' '+compatResult.result.score+'%',540,690);
    ctx.fillStyle='#1A1A1A';ctx.font='52px Georgia';
    ctx.fillText(compatResult.result.title,540,770);
    ctx.fillStyle=myCol;ctx.font='22px Georgia';
    ctx.fillText(compatResult.myEl.toUpperCase(),290,630);
    ctx.fillStyle=thCol;ctx.fillText(compatResult.theirEl.toUpperCase(),790,630);
    ctx.fillStyle='#1A1A1A';ctx.font='bold 22px Georgia';ctx.fillText('bornfrom.co',540,870);
    ctx.fillStyle='#B38B8B';ctx.font='bold 26px Georgia';ctx.fillText('@bornfrom.official',540,910);
    ctx.fillStyle='#888888';ctx.font='18px Georgia';ctx.fillText('2026 Born From. All rights reserved.',540,955);
    canvas.toBlob(blob=>{
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download='bornfrom-compatibility.png';a.click();
      URL.revokeObjectURL(url);
    },'image/png');
  };
  const base={background:V.bg,color:V.tx,fontFamily:FF,minHeight:'100vh'};
  const SS={background:V.bg,border:`1px solid ${V.br}`,color:V.tx,fontFamily:FF,fontSize:16,padding:'12px 8px',outline:'none',cursor:'pointer',width:'100%',WebkitAppearance:'none',appearance:'none'};
  const DateInputComp=()=>(
    <div style={{maxWidth:400,margin:'0 auto'}}>
      <style>{`.hvr-fill:hover{background:#9A7070!important;color:#FFFFFF!important} select:focus{border-color:${V.am}!important;outline:none}`}</style>
      <label style={{display:'block',fontSize:12,letterSpacing:5,color:V.am,marginBottom:10,textAlign:'left'}}>DATE OF BIRTH</label>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 2fr',gap:6,marginBottom:16}}>
        <select value={month} onChange={e=>setMonth(e.target.value)} style={SS}>
          <option value="">Month</option>{MONTHS.map((mn,i)=><option key={i+1} value={i+1}>{mn}</option>)}
        </select>
        <select value={dayNum} onChange={e=>setDayNum(e.target.value)} style={SS}>
          <option value="">Day</option>{Array.from({length:31},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
        <select value={year} onChange={e=>setYear(e.target.value)} style={SS}>
          <option value="">Year</option>{Array.from({length:76},(_,i)=>{const y=2005-i;return <option key={y} value={y}>{y}</option>;})}
        </select>
      </div>
      <label style={{display:'block',fontSize:12,letterSpacing:5,color:V.am,marginBottom:10,textAlign:'left'}}>GENDER</label>
      <div style={{display:'flex',gap:8,marginBottom:24}}>
        <button onClick={()=>setGender('female')} style={{...SS,flex:1,background:gender==='female'?V.am:'none',color:gender==='female'?'#FFFFFF':V.mu,border:`1px solid ${gender==='female'?V.am:V.br}`,padding:'10px'}}>Female</button>
        <button onClick={()=>setGender('male')} style={{...SS,flex:1,background:gender==='male'?V.am:'none',color:gender==='male'?'#FFFFFF':V.mu,border:`1px solid ${gender==='male'?V.am:V.br}`,padding:'10px'}}>Male</button>
      </div>
      {err&&<p style={{color:'#E05050',fontSize:14,marginBottom:12,textAlign:'center'}}>{err}</p>}
      <button className="hvr-fill" onClick={handleReveal} style={{width:'100%',background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'16px',fontFamily:FF,fontSize:19,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s'}}>REVEAL MY ELEMENT FREE</button>
      <p style={{fontSize:12,color:V.mu,textAlign:'center',marginTop:8,letterSpacing:1}}>Full Relationship Report available for $4.90 after your free reading.</p>
    </div>
  );
  if(view==='landing') return(
    <div style={base}>
      <style>{`@keyframes tw{0%,100%{opacity:.8}50%{opacity:.2}} @keyframes tw2{0%,100%{opacity:.45}50%{opacity:.95}} .el-item:hover{background:#EDE8E0} .hvr-fill:hover{background:#9A7070!important;color:#FFFFFF!important} @media(max-width:600px){.hero-h1{font-size:36px!important}.why-grid{grid-template-columns:1fr!important}.sp{padding:56px 20px!important}}`}</style>
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:`1px solid ${V.br}`,position:'sticky',top:0,background:V.bg,zIndex:50}}>
        <div style={{display:'flex',gap:16,flexShrink:0}}>
          <button onClick={()=>document.getElementById('about-section')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:'none',fontSize:11,letterSpacing:2,color:V.mu,cursor:'pointer',fontFamily:FF,padding:0,whiteSpace:'nowrap'}}>ABOUT</button>
        </div>
        <div style={{fontSize:14,letterSpacing:4,fontWeight:600,color:V.tx,textAlign:'center',flexShrink:0,margin:'0 12px'}}>BORN FROM</div>
        <a href="#saju-form" onClick={e=>{e.preventDefault();document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'});}} style={{fontSize:11,letterSpacing:2,color:'#FFFFFF',background:V.am,padding:'6px 12px',textDecoration:'none',fontWeight:600,whiteSpace:'nowrap',flexShrink:0}}>FREE</a>
      </nav>
      <section style={{position:'relative',width:'100%',overflow:'hidden'}}>
        <img src="/hero_prism.png" alt="Born From" style={{width:'100%',display:'block',maxHeight:'65vh',objectFit:'cover',objectPosition:'center'}}/>
      </section>
      <section style={{position:'relative',overflow:'hidden'}}>
        <div className="sp" style={{position:'relative',zIndex:3,textAlign:'center',padding:'72px 40px 32px'}}>
          <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:-1}} viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice">
            {[[42,28,1,'tw',2.8,0],[112,14,1.5,'tw2',3.4,.5],[198,44,1,'tw',2.2,.2],[278,11,1,'tw2',3.8,.8],[354,34,1.5,'tw',2.5,.3],[432,7,1,'tw2',3,.1],[512,26,1,'tw',2.8,.6],[594,17,1.5,'tw2',3.2,1],[664,38,1,'tw',2.6,.4],[754,20,1,'tw2',2.9,.9]].map(([cx,cy,r,a,d,dl],i)=>(<circle key={i} cx={cx} cy={cy} r={r} fill={i%9===4?'#B38B8B':'#1A1A1A'} style={{animation:`${a} ${d}s ${dl}s infinite`}}/>))}
          </svg>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:16}}>KOREAN ELEMENTAL ASTROLOGY · SAJU</p>
          <h1 className="hero-h1" style={{fontSize:56,lineHeight:1.1,fontWeight:600,marginBottom:16}}>Stop Wandering.<br/><span style={{color:V.am}}>Get the Truth About<br/>Your Relationship.</span></h1>
          <p style={{fontSize:18,color:V.mu,lineHeight:2,maxWidth:480,margin:'0 auto 16px'}}>Tired of mixed signals?<br/>Still in a situationship going nowhere?<br/>Your birth date holds the answer.<br/>Korean elemental astrology has mapped love patterns for 3,000 years.</p>
          <p style={{fontSize:15,color:V.mu,lineHeight:1.6,maxWidth:440,margin:'0 auto 28px',fontStyle:'italic'}}>"Stop crying at 2AM. End the situationship spiral."</p>

          <button className="hvr-fill" onClick={()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'15px 44px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s',marginBottom:18}}>DISCOVER YOUR ELEMENT FREE</button>
        </div>

      </section>
      <section className="sp" id='about-section' style={{padding:'80px 40px',borderTop:`1px solid ${V.br}`,borderBottom:`1px solid ${V.br}`}}>
        <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:20}}>WHY BORN FROM?</p>
          <h2 style={{fontSize:40,fontWeight:400,lineHeight:1.25,marginBottom:24}}>Tarot gave you symbols.<br/>Astrology gave you archetypes.<br/><span style={{color:V.am}}>BORN FROM gives you yourself.</span></h2>
          <p style={{fontSize:16,color:V.mu,lineHeight:1.8,maxWidth:560,margin:'0 auto 20px'}}>K-pop idols and Korean celebrities have used Saju for generations. G-Dragon, IU, BTS — they all consult Saju before major decisions. Built by a Korean with 10+ years of Saju study. People are shocked by how personal it reads.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:36}}>
            {['As seen on Korean TV','G-Dragon consults Saju','IU reads her chart yearly','BTS knows their elements'].map((t,i)=>(
              <div key={i} style={{background:V.s,border:`1px solid ${V.br}`,padding:'6px 14px',fontSize:12,color:V.mu,letterSpacing:1}}>{t}</div>
            ))}
          </div>
          <div className="why-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,textAlign:'left',marginBottom:48}}>
            {[{icon:'木',title:'You were born from nature',body:'From the moment of your first breath, one of the Five Elements became the core of who you are. This is not a personality test. This is the record the universe made of you.'},{icon:'地',title:'The code, decoded',body:'SAJU reads from the same elemental forces that govern the natural world. Live in alignment with your element, and happiness is not a hope, it is a certainty.'},{icon:'命',title:'Your path to happiness exists',body:'Tarot shows you cards. Astrology shows you planets. Born From shows you you. Your exact elemental makeup, with precision developed over 3,000 years of Eastern wisdom.'},{icon:'✦',title:'Oldest Statistical Science',body:'From K-pop to K-beauty to K-drama, Korea has been showing the world something real. Born From is that system, 3,000 years of mapping who people truly are, now in English.'}].map((c,i)=>(<div key={i} style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px'}}><div style={{fontSize:28,color:V.am,marginBottom:10}}>{c.icon}</div><h3 style={{fontSize:19,marginBottom:10,fontWeight:400}}>{c.title}</h3><p style={{fontSize:16,color:V.mu,lineHeight:1.7}}>{c.body}</p></div>))}
          </div>
        </div>
      </section>
      <div style={{display:'flex',borderBottom:`1px solid ${V.br}`,flexWrap:'wrap'}}>
        {[['木','WOOD','Growth · Vision'],['火','FIRE','Passion · Power'],['土','EARTH','Stability · Trust'],['金','METAL','Precision · Will'],['水','WATER','Flow · Wisdom']].map(([ch,nm,tr])=>(<div key={nm} className="el-item" style={{flex:'1 1 60px',textAlign:'center',padding:'24px 8px',borderRight:`1px solid ${V.br}`,transition:'background .25s'}}><div style={{fontSize:30,color:V.am,marginBottom:6}}>{ch}</div><div style={{fontSize:11,letterSpacing:4,color:V.mu}}>{nm}</div><div style={{fontSize:13,color:V.mu,marginTop:4}}>{tr}</div></div>))}
      </div>
      <section style={{padding:'48px 24px',background:'#F5F2EC'}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <p style={{fontSize:11,letterSpacing:5,color:V.am,marginBottom:10,fontWeight:700}}>HOW IT WORKS</p>
          <h2 style={{fontSize:26,fontWeight:700,color:'#1A1A1A',marginBottom:10,lineHeight:1.3}}>800 Years of Pattern Recognition.<br/>Now Running as an Algorithm.</h2>
          <p style={{fontSize:15,color:'#555555',lineHeight:1.75,maxWidth:520,margin:'0 auto'}}>Saju is not mysticism. It is a statistical model that has mapped human behavioral patterns across millions of birth charts over centuries. Your birth date is the input. Your elemental frequency is the output.</p>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center',marginBottom:44}}>
          {['Elemental Frequency Analysis','3-Pillar Pattern Recognition','Ancestral Data · 3,000+ Years','Delivered as Personal Report'].map((pill,i)=>(
            <div key={i} style={{background:'#F2EEE6',border:`1px solid ${V.br}`,padding:'8px 16px',fontSize:12,color:'#555555',letterSpacing:1,borderRadius:2}}>{pill}</div>
          ))}
        </div>
        <p style={{fontSize:11,letterSpacing:5,color:V.am,textAlign:'center',marginBottom:24,fontWeight:700}}>WHAT PEOPLE ARE SAYING</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14,maxWidth:860,margin:'0 auto'}}>
          {[
            {q:'It named the exact pattern I have been running for years.',name:'Riley M.',loc:'Toronto, CA'},
            {q:'None of them said the thing. This said the thing.',name:'Jess K.',loc:'London, UK'},
            {q:'The 2026 forecast described someone who entered my life two weeks later.',name:'Maya L.',loc:'Sydney, AU'},
            {q:'Sent it to my therapist. She asked me to send her the link.',name:'Hannah V.',loc:'New York, US'},
          ].map((r,i)=>(
            <div key={i} style={{background:'#F2EEE6',border:`1px solid ${V.br}`,padding:'20px',position:'relative'}}>
              <div style={{fontSize:24,color:V.am,lineHeight:1,marginBottom:10,opacity:.6}}>"</div>
              <p style={{fontSize:14,color:'#333333',lineHeight:1.75,marginBottom:14,fontStyle:'italic'}}>{r.q}</p>
              <div style={{fontSize:12,color:V.am,letterSpacing:1,fontWeight:700}}>{r.name}</div>
              <div style={{fontSize:11,color:'#888888',letterSpacing:1}}>{r.loc}</div>
              <div style={{position:'absolute',top:16,right:16,display:'flex',gap:2}}>
                {'★★★★★'.split('').map((s,j)=><span key={j} style={{color:V.am,fontSize:12}}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:'32px 24px',background:V.am,textAlign:'center'}}>
        <p style={{fontSize:14,color:'#FFFFFF',letterSpacing:2,marginBottom:6,fontWeight:700}}>FULL 5-PAGE LOVE REPORT · $4.90</p>
        <p style={{fontSize:18,color:'#FFFFFF',lineHeight:1.6}}>Why your love life has been hard. What to do. Who is coming.<br/>K-beauty 팩 한 장 값. 이메일로 즉시 발송.</p>
      </section>
      <section id="saju-form" style={{padding:'80px 32px',borderTop:`1px solid ${V.br}`,textAlign:'center',background:V.s}}>
        <p style={{fontSize:13,letterSpacing:5,color:V.am,marginBottom:12,fontWeight:700}}>ELEMENTAL FREQUENCY ANALYSIS</p>
        <h2 style={{fontSize:28,fontWeight:700,color:'#1A1A1A',marginBottom:10,lineHeight:1.3}}>Decode Your Identity.<br/><span style={{color:V.am}}>Free.</span></h2>
        <p style={{fontSize:15,color:'#555555',lineHeight:1.7,marginBottom:20,maxWidth:440,margin:'0 auto 20px'}}>Your birth date is the input. Your elemental frequency is the output. All you need is your birthday.</p>
        <DateInputComp/>
      </section>
      <footer style={{borderTop:`1px solid ${V.br}`,padding:'28px 20px',textAlign:'center',background:V.bg}}>
        <div style={{fontSize:11,letterSpacing:4,color:'#999999',marginBottom:8}}>BORN FROM</div>
        <div style={{display:'flex',justifyContent:'center',gap:20,marginBottom:10,flexWrap:'wrap'}}>
          <a href="/legal" style={{fontSize:11,color:'#999999',letterSpacing:2,textDecoration:'none'}}>Terms</a>
          <span style={{color:'#E0DCD0'}}>·</span>
          <a href="/legal" style={{fontSize:11,color:'#999999',letterSpacing:2,textDecoration:'none'}}>Refund Policy</a>
          <span style={{color:'#E0DCD0'}}>·</span>
          <a href="mailto:hello@bornfrom.co" style={{fontSize:11,color:'#999999',letterSpacing:2,textDecoration:'none'}}>Contact</a>
        </div>
        <div style={{fontSize:10,color:'#AAAAAA',letterSpacing:2}}>2026 Born From. All rights reserved.</div>
      </footer>
    </div>
  );
  if(view==='reveal'&&saju){
    const d=SD[saju.day.s]||SD['甲'];
    const idols=IDOLS[saju.day.s]||[];
    return(
      <div style={{...base,minHeight:'100vh'}}>
        <style>{`@keyframes glow{0%,100%{opacity:.6}50%{opacity:1}} @keyframes rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}} .ri{animation:rise .8s ease forwards} .ri2{animation:rise .8s .15s ease both} .ri3{animation:rise .8s .3s ease both} .ri4{animation:rise .8s .45s ease both} .ri5{animation:rise .8s .6s ease both} .hvr-fill:hover{background:#9A7070!important;color:#FFFFFF!important}`}</style>
        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:`1px solid ${V.br}`,background:V.bg}}>
          <div style={{fontSize:16,letterSpacing:4,fontWeight:400}}>BORN <span style={{color:V.am}}>FROM</span></div>
          <button onClick={()=>setView('landing')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'7px 16px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2}}>Back</button>
        </nav>
        <div style={{maxWidth:580,margin:'0 auto',padding:'56px 24px 80px',textAlign:'center'}}>
          <div className="ri" style={{marginBottom:28}}>
            <p style={{fontSize:12,letterSpacing:7,color:d.color,marginBottom:18,opacity:.8}}>{d.el.toUpperCase()} · {d.ko.toUpperCase()}</p>
            <div style={{fontSize:120,lineHeight:1,color:d.color,marginBottom:8,animation:'glow 3s infinite'}}>{d.sym}</div>
            <div style={{fontSize:44,fontWeight:600,marginBottom:6}}>{d.nameKo}</div>
            <div style={{fontSize:22,color:d.color,letterSpacing:2,marginBottom:14}}>{d.name}</div>
            <p style={{fontSize:18,color:V.mu,fontStyle:'italic'}}>{d.tag}</p>
          </div>
          <div className="ri2" style={{background:d.bg,border:`1px solid ${d.color}44`,padding:'12px 22px',marginBottom:36,display:'inline-block'}}>
            <span style={{fontSize:13,color:V.mu,letterSpacing:3}}>DAY MASTER · </span>
            <span style={{fontSize:18,color:d.color,letterSpacing:2}}>{saju.day.s}{saju.day.b} · {saju.day.ko}일주</span>
          </div>
          <div className="ri3" style={{textAlign:'left',marginBottom:44}}>
            <p style={{fontSize:18,lineHeight:1.95,color:V.tx,marginBottom:22,borderLeft:`3px solid ${d.color}`,paddingLeft:18}}>{d.p1}</p>
            <p style={{fontSize:18,lineHeight:1.95,color:V.mu,marginBottom:22}}>{d.p2}</p>
            <p style={{fontSize:18,lineHeight:1.95,color:d.color,fontStyle:'italic'}}>{d.p3}</p>
          </div>
          <div className="ri4" style={{marginBottom:40}}>
            {!showCompat
              ?<button onClick={()=>setShowCompat(p=>!p)} style={{width:'100%',background:'#F2EEE6',border:`2px solid ${V.am}`,padding:'20px 24px',cursor:'pointer',textAlign:'center',marginBottom:0}}>
                <p style={{fontSize:11,letterSpacing:5,color:V.am,marginBottom:8,fontFamily:FF}}>COMPATIBILITY</p>
                <p style={{fontSize:20,color:V.tx,fontWeight:400,marginBottom:6,fontFamily:FF}}>Is someone special compatible with you?</p>
                <div style={{display:'inline-block',background:V.am,color:'#FFFFFF',padding:'10px 28px',fontSize:13,letterSpacing:3,fontWeight:700,fontFamily:FF}}>CHECK COMPATIBILITY</div>
              </button>
              :<div style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px',textAlign:'left'}}>
                {!compatResult
                  ?<>
                    <p style={{fontSize:15,color:V.mu,marginBottom:14,lineHeight:1.6,textAlign:'center'}}>Enter their birthday to see how your elements connect.</p>
                    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 2fr',gap:6,marginBottom:12}}>
                      {[['Month',cM,setCM,MONTHS.map((mn,i)=>({v:i+1,l:mn}))],['Day',cD,setCD,Array.from({length:31},(_,i)=>({v:i+1,l:i+1}))],['Year',cY,setCY,Array.from({length:76},(_,i)=>({v:2005-i,l:2005-i}))]].map(([lbl,val,setter,opts])=>(
                        <select key={lbl} value={val} onChange={e=>setter(e.target.value)} style={{background:V.bg,border:`1px solid ${V.br}`,color:V.tx,fontFamily:FF,fontSize:15,padding:'11px 6px',outline:'none',width:'100%'}}>
                          <option value="">{lbl}</option>{opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
                      ))}
                    </div>
                    <button onClick={checkCompat} style={{width:'100%',background:V.am,color:'#FFFFFF',border:'none',padding:'13px',fontFamily:FF,fontSize:16,cursor:'pointer',letterSpacing:2,fontWeight:700}}>CHECK COMPATIBILITY</button>
                  </>
                  :<>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:24,marginBottom:18}}>
                      <div style={{textAlign:'center'}}><div style={{fontSize:50,color:EC[compatResult.myEl]}}>{ECH[compatResult.myEl]}</div><div style={{fontSize:12,color:V.mu,marginTop:4}}>You</div></div>
                      <div style={{fontSize:30,color:V.am}}>♡</div>
                      <div style={{textAlign:'center'}}><div style={{fontSize:50,color:EC[compatResult.theirEl]}}>{ECH[compatResult.theirEl]}</div><div style={{fontSize:12,color:V.mu,marginTop:4}}>Them</div></div>
                    </div>
                    <div style={{background:'#F2EEE6',height:6,borderRadius:3,marginBottom:18,overflow:'hidden'}}><div style={{background:V.am,height:'100%',width:`${compatResult.result.score}%`,borderRadius:3}}/></div>
                    <p style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:8,textAlign:'center'}}>{compatResult.result.tag.toUpperCase()} · {compatResult.result.score}%</p>
                    <h3 style={{fontSize:22,marginBottom:10,fontWeight:400,textAlign:'center'}}>{compatResult.result.title}</h3>
                    <p style={{fontSize:16,color:V.tx,lineHeight:1.75,marginBottom:20}}>{compatResult.result.desc}</p>
                    <button onClick={()=>polarCheckout(PRODUCTS.love,null,`${year}-${String(month).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`,gender)} style={{width:'100%',background:V.am,color:'#FFFFFF',border:'none',padding:'14px',fontFamily:FF,fontSize:15,cursor:'pointer',letterSpacing:2,fontWeight:700,marginBottom:10}}>UNLOCK THE RELATIONSHIP DECODER · $27</button>
                    <button onClick={shareCompat} style={{width:'100%',background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'11px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2}}>SAVE YOUR RESULT</button>
                    <div style={{marginTop:14,textAlign:'center'}}>
                      <button onClick={()=>{setCompatResult(null);setCM('');setCD('');setCY('');}} style={{background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'8px 20px',fontFamily:FF,fontSize:12,cursor:'pointer',letterSpacing:2}}>CHECK ANOTHER PERSON</button>
                    </div>
                  </>
                }
              </div>
            }
          </div>
          {idols.length>0&&(
            <div className="ri4" style={{background:V.s,border:`1px solid ${V.br}`,padding:'22px',marginBottom:36,textAlign:'left'}}>
              <p style={{fontSize:12,letterSpacing:5,color:V.go,marginBottom:12}}>YOUR ENERGY IN K-POP</p>
              <p style={{fontSize:16,color:V.mu,lineHeight:1.7}}><span style={{color:V.tx}}>{idols.map(i=>`${i.name} (${i.group})`).join(' and ')}</span> share your exact Day Master.</p>
            </div>
          )}
          <div className="ri5" style={{marginBottom:40}}>
            <div style={{background:V.s,border:`2px solid ${V.am}`,padding:'28px 24px',textAlign:'center'}}>
              <p style={{fontSize:11,letterSpacing:5,color:V.am,marginBottom:8,fontWeight:700}}>YOUR FULL SAJU REPORT</p>
              <p style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:12,fontWeight:700}}>YOUR LOVE READING · 5 PAGES</p>
              <div style={{textAlign:'left',marginBottom:20}}>
                {['Why your love life has been so hard','The pattern you keep running','What you need to do right now','The person you should be with','Who is coming to you','Your 2026 love forecast'].map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <div style={{width:6,height:6,background:V.am,borderRadius:'50%',flexShrink:0}}></div>
                    <span style={{fontSize:14,color:V.tx}}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{fontSize:13,color:V.mu,fontStyle:'italic',marginBottom:20}}>Korean girl들은 이미 다 하고 있다. K-beauty 팩 한 장 값에 당신의 연애 고민을 해결하세요.</p>
              <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:8,marginBottom:6}}>
                <span style={{fontSize:16,color:'#AAAAAA',textDecoration:'line-through'}}>$27</span>
                <span style={{fontSize:44,color:V.am,fontWeight:700,lineHeight:1}}>$4.9</span>
              </div>
              <p style={{fontSize:12,color:V.mu,marginBottom:20}}>The price of one coffee. Delivered to your email in minutes.</p>
              <button onClick={()=>polarCheckout(PRODUCTS.combo,null,`${year}-${String(month).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`,gender)} style={{width:'100%',background:V.am,color:'#FFFFFF',border:'none',padding:'16px',fontFamily:FF,fontSize:17,cursor:'pointer',letterSpacing:2,fontWeight:700,marginBottom:10}}>GET MY FULL REPORT · $4.9</button>
              <p style={{fontSize:11,color:V.mu}}>Delivered to your email instantly. Yours to keep forever.</p>
            </div></div>
        </div>
      </div>
    );
  }
  if(view==='saju'&&saju){
    const dom=dominant([saju.year,saju.month,saju.day]);
    return(
      <div style={{...base,padding:'40px 24px'}}>
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
            </div>
          ))}
        </div>
        <p style={{fontSize:14,color:V.mu,textAlign:'center',marginBottom:14}}>Select a reading to generate</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,maxWidth:440,margin:'0 auto 14px'}}>
          {TABS.map(t=>(<button key={t.id} onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.tx,padding:'16px 12px',fontFamily:FF,cursor:'pointer',textAlign:'left'}}><div style={{fontSize:22,color:V.am,marginBottom:4}}>{t.icon}</div><div style={{fontSize:16,letterSpacing:1}}>{t.ko}</div></button>))}
        </div>
        {err&&<p style={{color:'#E05050',fontSize:13,marginBottom:10,textAlign:'center'}}>{err}</p>}
        <div style={{textAlign:'center',marginTop:10}}>
          <button onClick={()=>setView('reveal')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'7px 18px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3}}>My Element</button>
        </div>
      </div>
    );
  }
  if(view==='loading') return(
    <div style={{...base,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'40px 20px',textAlign:'center'}}>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.15}50%{opacity:1}}`}</style>
      <div style={{fontSize:88,color:V.am,animation:'spin 4s linear infinite',display:'inline-block',marginBottom:28,lineHeight:1}}>命</div>
      <p style={{fontSize:22,color:V.tx,marginBottom:10,fontStyle:'italic',lineHeight:1.6,maxWidth:320}}>The sky is writing your fate.</p>
      <p style={{fontSize:13,letterSpacing:5,color:V.mu,marginBottom:32}}>PLEASE WAIT</p>
    </div>
  );
  if(view==='reading'){
    const reading=readings[tab];
    if(!reading)return <div style={{...base,padding:40,textAlign:'center',color:V.mu}}>loading...</div>;
    const isStory=tab==='story',sections=isStory?null:parseSections(reading),tabInfo=TABS.find(t=>t.id===tab),dom=saju?dominant([saju.year,saju.month,saju.day]):'';
    return(
      <div style={{...base,padding:'28px 20px'}}>
        <div style={{display:'flex',borderBottom:`1px solid ${V.br}`,marginBottom:28,overflowX:'auto'}}>
          {TABS.map(t=>(<button key={t.id} onClick={()=>generate(t.id)} style={{flex:'0 0 auto',padding:'10px 12px',background:'none',border:'none',borderBottom:tab===t.id?`2px solid ${V.am}`:'2px solid transparent',color:tab===t.id?V.am:V.mu,fontFamily:FF,fontSize:12,cursor:'pointer',letterSpacing:1,marginBottom:'-1px',whiteSpace:'nowrap'}}>{t.ko}</button>))}
        </div>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontSize:32,color:V.am,lineHeight:1,marginBottom:8}}>{tabInfo?.icon}</div>
          <h2 style={{fontSize:28,fontWeight:400}}>{tabInfo?.ko}</h2>
        </div>
        {isStory
          ?<div style={{background:V.s,border:`1px solid ${V.go}`,padding:'28px 24px',maxWidth:600,margin:'0 auto'}}>
            <StoryIllus1/>
            {(()=>{
              const paras=reading.split(/\n\s*\n/).filter(p=>p.trim());
              const t1=Math.floor(paras.length/3),t2=Math.floor(paras.length*2/3);
              return(<>
                {paras.slice(0,t1).map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
                <StoryIllus2/>
                {paras.slice(t1,t2).map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
                <StoryIllus3/>
                {paras.slice(t2).map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
              </>);
            })()}
            <div style={{textAlign:'center',marginTop:20,fontSize:11,letterSpacing:5,color:V.go}}>THE END</div>
          </div>
          :<div style={{maxWidth:600,margin:'0 auto'}}>
            {sections&&sections.length>0
              ?sections.map((sec,i)=>(<div key={i} style={{marginBottom:24,paddingBottom:24,borderBottom:i<sections.length-1?`1px solid ${V.br}`:'none'}}><h3 style={{fontSize:12,letterSpacing:5,color:V.am,marginBottom:12}}>{sec.title}</h3><p style={{fontSize:17,lineHeight:2,color:V.tx}}>{sec.body}</p></div>))
              :<p style={{fontSize:17,lineHeight:2,color:V.tx,whiteSpace:'pre-wrap'}}>{reading}</p>}
          </div>
        }
        <div style={{maxWidth:600,margin:'32px auto 0',background:'#F2EEE6',border:`2px solid ${V.am}`,padding:'28px',textAlign:'center'}}>
          <h3 style={{fontSize:22,fontWeight:400,marginBottom:12}}>Go deeper.</h3>
          <p style={{fontSize:14,color:V.mu,marginBottom:20,lineHeight:1.6}}>Get all 4 readings. Your elemental nature, love, career, and your personal story.</p>
          <button onClick={()=>polarCheckout(PRODUCTS.bundle,null,`${year}-${String(month).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`,gender)} style={{width:'100%',background:V.am,color:'#FFFFFF',border:'none',padding:'16px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:2,fontWeight:700}}>GET ALL 4 READINGS · $97</button>
        </div>
        <div style={{textAlign:'center',marginTop:24,display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setView('saju')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'9px 18px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3}}>My Chart</button>
          {TABS.filter(t=>t.id!==tab).map(t=>(<button key={t.id} onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.mu,padding:'9px 14px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2,opacity:readings[t.id]?1:.65}}>{readings[t.id]?t.ko:`${t.ko} +`}</button>))}
        </div>
      </div>
    );
  }
  return <div style={base}/>;
}
