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
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const COMPAT={
  nourish_give:{title:'You light them up ✦',score:92,tag:'Deeply Complementary',desc:'Your element naturally feeds and energizes theirs. You bring out the best in each other. This is the kind of connection that grows stronger with time.'},
  nourish_receive:{title:'They light you up ✦',score:88,tag:'Beautifully Supportive',desc:'Their element feeds and energizes yours. They inspire you to grow, and you absorb their energy beautifully. Together you move forward.'},
  control_give:{title:'You challenge them ✦',score:74,tag:'Intensely Magnetic',desc:'Your element keeps theirs in check. Electric tension — the kind that becomes transformation or turbulence. Deeply magnetic. Needs awareness.'},
  control_receive:{title:'They challenge you ✦',score:70,tag:'Powerfully Transformative',desc:'Their element challenges yours. Friction creates heat. If both stay open, this becomes the relationship that changes everything.'},
  same:{title:'You mirror each other ✦',score:80,tag:'Mirror Souls',desc:'You share the same element. You understand each other on a level words cannot reach — but two of the same can amplify both the light and the shadow.'},
};
function getCompat(e1,e2){const ch=['Wood','Fire','Earth','Metal','Water'],i=ch.indexOf(e1),j=ch.indexOf(e2);if(e1===e2)return COMPAT.same;if((i+1)%5===j)return COMPAT.nourish_give;if((j+1)%5===i)return COMPAT.nourish_receive;if((i+2)%5===j)return COMPAT.control_give;if((j+2)%5===i)return COMPAT.control_receive;return COMPAT.same;}

const SD={
  '甲':{el:'Wood',ko:'목',sym:'木',color:'#4CAF50',bg:'#071208',name:'The Ancient Forest',nameKo:'숲',tag:'Born to grow beyond what anyone expected.',p1:'You are the tallest tree in the forest — roots deep, branches wide, always reaching for light others cannot yet see. A natural trailblazer who quietly transforms every room you enter.',p2:'But forests feel every storm. You carry the weight of always being expected to rise, even when the ground beneath you is shaking. You hold others up so often you forget: who holds you?',p3:'2026 brings your most powerful growth phase in years. The seeds you planted in solitude are finally breaking ground.'},
  '乙':{el:'Wood',ko:'목',sym:'木',color:'#81C784',bg:'#071208',name:'The Wildflower',nameKo:'들꽃',tag:'You bloom in places others said nothing could grow.',p1:'乙 Wood is the vine that finds its way through stone. Adaptable, alive, quietly beautiful. You make any space warmer simply by being in it. People are drawn to you without knowing why.',p2:'The shadow of 乙 is over-giving. You have bent yourself into shapes to fit others and wondered why you felt empty. Your softness is not weakness — it is your greatest power.',p3:"What's coming in 2026 requires your full, uncompromised self — and it will be magnetically drawn to exactly that."},
  '丙':{el:'Fire',ko:'화',sym:'火',color:'#FF7043',bg:'#180A04',name:'The Sun',nameKo:'태양',tag:'Wherever you go, the temperature rises.',p1:'You are daytime fire — generous, radiant, magnetic. People gather around you the way they gather around sunlight: not because they have to, but because it simply feels good to be near you.',p2:'But the sun cannot hide. You have felt the exhaustion of always being the one who shows up, who shines, who keeps everyone warm — while quietly burning yourself out.',p3:'2026 is the year you direct that warmth inward first. The right people are already on their way.'},
  '丁':{el:'Fire',ko:'화',sym:'火',color:'#FFB74D',bg:'#180A04',name:'The Candleflame',nameKo:'촛불',tag:'Small. Intimate. Impossible to ignore.',p1:'丁 Fire is the candle in a dark room — focused, personal. You illuminate things one person, one moment at a time. That kind of warmth changes lives in ways a bonfire never could.',p2:'Candles burn from both ends when asked to light too many rooms at once. You have given your warmth to people who did not protect the flame. Learning which rooms truly deserve your light is the art.',p3:'An unexpected connection arrives in 2026 — someone who cups their hands around you. This one is different.'},
  '戊':{el:'Earth',ko:'토',sym:'土',color:'#C8A020',bg:'#181308',name:'The Mountain',nameKo:'산',tag:'When everything moves, you remain.',p1:'You are the mountain — ancient, patient, unmoved by weather that sends the valley into panic. You carry a quiet authority that others feel before you have spoken a word.',p2:'But mountains carry the weight of everything that rests on them. You have held others together so many times that you forgot to ask: who holds me?',p3:'2026 asks you to be still. Your power this year is not in action — it is in presence.'},
  '己':{el:'Earth',ko:'토',sym:'土',color:'#D4A853',bg:'#181308',name:'The Garden',nameKo:'대지',tag:'You make everything you touch grow.',p1:'己 Earth is fertile soil — nurturing, receptive, life-giving. Your emotional intelligence is extraordinary. You read rooms, people, and unspoken needs with almost supernatural precision.',p2:'Gardens can be over-cultivated. You have absorbed others\' pain as your own. Your sensitivity is a superpower — but it requires boundaries to flourish.',p3:'2026 asks you one question: whose garden are you tending? The answer should include your own.'},
  '庚':{el:'Metal',ko:'금',sym:'金',color:'#BBBBBB',bg:'#101010',name:'The Great Boulder',nameKo:'큰 바위',tag:'Carved by fire. Unmovable by force.',p1:'庚 Metal is raw iron ore — powerful, unrefined, forged through immense pressure into something extraordinary. You carry a quiet, unshakeable confidence. When you make a decision, it is final.',p2:'The boulder can become a prison. You have held on — to principles, to old wounds — long past the point they served you. The hardest thing for 庚 is letting go. But it is the most transformative.',p3:'2026 is the year of refinement. Something that needed to break finally does. What remains is the clearest, truest version of you.'},
  '辛':{el:'Metal',ko:'금',sym:'金',color:'#E8E8E8',bg:'#101010',name:'The Jewel',nameKo:'보석',tag:'Precious. Sharp. Rare.',p1:'辛 Metal has already been through the fire and emerged refined. You are not raw ore — you are the finished gem. Exacting standards, sophisticated taste, an eye for quality that others simply do not possess.',p2:'Jewels cut. Your sharpness — of mind, of words — has wounded people you loved. The precision that makes you extraordinary can make you devastating when left unguarded.',p3:'This year, let someone see the jewel without the cut. Vulnerability will not diminish you. It will make you luminous.'},
  '壬':{el:'Water',ko:'수',sym:'水',color:'#4090E0',bg:'#060D1A',name:'The Ocean',nameKo:'바다',tag:'Vast. Deep. Moving everything in your current.',p1:'壬 Water is the ocean — enormous, powerful, in constant motion. You think on a scale that most people never dare. Your inner world is as deep as the sea.',p2:'Oceans can overwhelm coastlines. Your emotional depth and ambition can sweep people away before they are ready. Moving at the pace of others sometimes is the highest art.',p3:'2026 brings a shore finally worthy of your tide. Someone, or something, that can hold the full force of you.'},
  '癸':{el:'Water',ko:'수',sym:'水',color:'#64B5F6',bg:'#060D1A',name:'The Rain',nameKo:'빗물',tag:'Quiet. Pervasive. Necessary for everything to live.',p1:'癸 Water is rain — soft, persistent, life-giving. You have a quiet influence that moves slowly and leaves everything transformed. Your intuition is almost supernatural.',p2:'Rain becomes a flood when it has nowhere to go. Your emotions, unprocessed, overwhelm. You were made to flow, not to hold still.',p3:'Let it rain in 2026. The feelings you have been holding — release them. What grows from that release will genuinely surprise you.'},
};

const IDOLS={
  '甲':[{name:'Jin',group:'BTS'},{name:'Rosé',group:'BLACKPINK'},{name:'Kylie Jenner',group:'Media'},{name:'Olivia Rodrigo',group:'Singer'}],
  '乙':[{name:'G-Dragon',group:'BIGBANG'},{name:'V',group:'BTS'},{name:'Beyoncé',group:'Singer'},{name:'Rihanna',group:'Singer'},{name:'Billie Eilish',group:'Singer'},{name:'Dua Lipa',group:'Singer'}],
  '丙':[{name:'Jungkook',group:'BTS'},{name:'Nayeon',group:'TWICE'},{name:'Justin Bieber',group:'Singer'},{name:'Post Malone',group:'Singer'}],
  '丁':[{name:'Jimin',group:'BTS'},{name:'IU',group:'Solo Artist'},{name:'Kim Kardashian',group:'Media'},{name:'Taylor Swift',group:'Singer'},{name:'Sydney Sweeney',group:'Actor'}],
  '戊':[{name:'Lisa',group:'BLACKPINK'},{name:'Ariana Grande',group:'Singer'},{name:'Harry Styles',group:'Singer'},{name:'Kendall Jenner',group:'Model'}],
  '己':[{name:'Suga',group:'BTS'},{name:'Karina',group:'aespa'},{name:'Selena Gomez',group:'Singer'}],
  '庚':[{name:'Lee Junho',group:'2PM'},{name:'Sabrina Carpenter',group:'Singer'},{name:'Cardi B',group:'Singer'}],
  '辛':[{name:'RM',group:'BTS'},{name:'Hyun Bin',group:'Actor'},{name:'Zendaya',group:'Actor'},{name:'Drake',group:'Singer'}],
  '壬':[{name:'Jennie',group:'BLACKPINK'},{name:'Baekhyun',group:'EXO'},{name:'Timothée Chalamet',group:'Actor'},{name:'The Weeknd',group:'Singer'}],
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
  const trials={Wood:'the trial of loss — watching something nurtured wither before it bloomed',Fire:'the trial of consuming passion — burned by the fire inside',Earth:'the trial of endurance — holding steady while the world shifted',Metal:'the trial of severance — refined through what was cut away',Water:'the trial of deep solitude — searching the depths for something to hold'};
  const resols={Wood:'a love like spring — tender, unstoppable, full of new beginning',Fire:'a love like starfire — blazing, triumphant, illuminating everything',Earth:'deep roots at last — belonging, home, love that outlasts all seasons',Metal:'crystal clarity — your truest self finally recognized',Water:'flowing into peace — wisdom fulfilled, love found in stillness'};
  const idols=IDOLS[DP.s]||[];
  const idolLine=idols.length?`\nK-pop idols with Day Master ${DP.s}: ${idols.map(i=>`${i.name} (${i.group})`).join(' and ')}. Mention this warmly in WHO YOU ARE.`:'';
  const base=`Korean SAJU Birth Chart:\n- Year: ${YP.s}${YP.b} · ${YP.se}/${YP.be}\n- Month: ${MP.s}${MP.b} · ${MP.se}/${MP.be}\n- Day Master: ${DP.s}${DP.b} · ${DP.yy} ${DP.se}\n- Dominant: ${dom} · Gender: ${gender}\n`;
  if(type==='basic')return`Mystical Korean SAJU astrologer. Write a deeply personal destiny reading in English using "you". Poetic, warm, specific — every sentence should feel written for this exact person.\n\n${base}${idolLine}\n\n4 sections with ### headers. Each section should be rich and substantial:\n\n### WHO YOU ARE\n6-7 sentences. Paint a vivid portrait of the Day Master ${DP.s} personality. What makes this person magnetic? What do people notice first? What gift do they carry without realizing it? Include the K-pop idol connection warmly — explain WHY they share this energy.\n\n### YOUR ELEMENTAL NATURE\n5-6 sentences. The dominant element ${dom}: what superpower it gives this person, how it shows up in daily life, the shadow side that challenges them, and what happens when they learn to work with it rather than against it.\n\n### YOUR LIFE PATH\n6-7 sentences. Weave all three pillars together into a complete destiny narrative. Year pillar as the world they came from, month pillar as the journey they are on, day pillar as who they truly are at the core. What patterns have shaped them? What are they moving toward?\n\n### 2026 FORECAST\n5-6 sentences. 2026 is 丙午 Fire Horse year — fierce, passionate, transformative energy meets this specific chart. What shifts? What opportunities arrive? What should this person pay attention to? Be specific and encouraging.\n\nProse paragraphs only. No bullets. No generic statements — every line should surprise them.`;
  if(type==='love')return`Korean SAJU love reader. Write a deeply personal love reading in English using "you". Romantic, luminous, specific — this should feel like a love letter from the universe.\n\n${base}Ideal partner element: ${pe} — ${pts[pe]}\n\n4 sections with ### headers:\n\n### YOUR ROMANTIC NATURE\n5-6 sentences. How does this person love? What do they give that others can't? What do they secretly need but rarely ask for? What makes loving them extraordinary — and what makes it complicated?\n\n### YOUR IDEAL PARTNER\n6-7 sentences. The ${pe} person. Don't just list traits — describe the feeling of being with them. How do they move through a room? What do they say that nobody else says? Why is this element the missing piece for this specific chart? Make the reader feel like they already know this person.\n\n### WHERE LOVE FINDS YOU\n5-6 sentences. Not just seasons — circumstances, situations, the specific kind of moment where this person's heart opens. What environment? What kind of conversation? What unexpected place?\n\n### 2026 LOVE FORECAST\n5-6 sentences. Fire Horse 丙午 — bold encounters, magnetic connections, fated meetings. What specifically arrives for this chart this year? Timing, energy, what to watch for. End with something beautiful and hopeful.\n\nProse only. Romantic and luminous. Every line should make them want to share this.`;
  if(type==='career')return`Korean SAJU career oracle. Write a deeply personal career reading in English using "you". Confident, specific, empowering — this should make them see their professional life in a completely new way.\n\n${base}4 sections with ### headers:\n\n### YOUR NATURAL GIFTS\n5-6 sentences. What can this person do that most people struggle with? Not just skills — the specific way their mind works, how they see problems differently, what they bring to any room they enter professionally. Be precise. Name the gift clearly.\n\n### DESTINED PATHS\n6-7 sentences. 5-6 specific career titles or domains — not generic categories like "creative fields" but actual roles: e.g. "brand strategist," "documentary filmmaker," "UX researcher," "forensic accountant." Explain WHY each one matches this chart specifically. What about this path would feel natural to them?\n\n### YOUR POWER DECADE\n5-6 sentences. Based on the element cycle and chart structure — when does this person's career peak? What age range? What happens in that window? What should they be building now to be ready?\n\n### 2026 CAREER FORECAST\n5-6 sentences. Fire Horse year brings bold visibility and breakthrough opportunities. What specifically arrives for this chart? New direction, recognition, a pivotal decision? What should they move toward — and what should they finally leave behind?\n\nProse only. Confident and empowering. Make them feel seen professionally.`;
  if(type==='story'){
  const hero=gender==='male'?'Knight':'Princess';
  const heroVerb=gender==='male'?'He sets out':'She leaves';
  return`You are writing a Korean fairy tale. The reader IS the main character. Write in second person: "you."

BIRTH CHART:
${base}

WRITE THIS EXACT STORY IN THREE PARTS:

PART 1 - WHO YOU ARE (about 250 words):
Open in this world: ${eW[YP.se]}.
You are a ${hero}. You have one great gift — describe it using the ${YP.se} element as a metaphor, but DO NOT name the element. You want one specific thing: someone who truly sees you, not your title or your power. Just you.
One day a sign arrives — a crane, a letter, a falling lantern — that tells you to go. ${heroVerb}.
Write 3 short paragraphs. Simple sentences. Make the reader feel they know this person already.

PART 2 - THE HARDEST MOMENT (about 300 words):
Show this trial as a real scene: ${trials[MP.se]}.
Something concrete breaks or is taken. A sword. A promise. A person leaves. You are alone in a harsh place — cold mountain, ash plain, empty road.
You hit bottom. You almost stop.
Then one small impossible thing appears — a green shoot through stone, a warm light in darkness — and you choose to keep going. You stand up. You walk.
Write 4 paragraphs. Make the reader's chest tighten, then breathe again at the end.

PART 3 - THE ARRIVAL (about 300 words):
Resolution: ${resols[DP.se]}.
You arrive somewhere — or someone arrives to you. Write the meeting as a real scene. What do they look like? What do they say that no one has ever said to you before?
You understand: everything that broke you led you exactly here.
End with three short sentences. The last sentence is the most beautiful in the story.

STRICT RULES:
- Every paragraph must contain something that HAPPENS, not just feelings.
- Sentences: 8-12 words each. No long sentences.
- Korean details: lanterns, stone gates, cherry blossoms, moonlight, silk robes, jade mountains, incense.
- NO markdown symbols: no # no --- no ** no bullets.
- Blank line between paragraphs.
- Do NOT name the five elements directly. Weave them as imagery only.`;}
}
async function callClaude(p,maxTok=1200){const r=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:p}],max_tokens:maxTok})});const d=await r.json();if(d.error)throw new Error(d.error.message);return d.content[0].text;}
function parseSections(text){const m=[...text.matchAll(/###\s+(.+?)\n([\s\S]+?)(?=\n###|$)/g)];return m.map(x=>({title:x[1].trim(),body:x[2].trim()}));}

const TABS=[{id:'basic',ko:'Basic Fortune',icon:'命'},{id:'love',ko:'The Relationship Decoder',icon:'♡'},{id:'career',ko:'The Success Compass',icon:'↑'},{id:'story',ko:'The Life Script',icon:'✦'}];
// ── POLAR PRODUCT IDs ─────────────────────────────────────
const POLAR_ORG = 'born-from';
const PRODUCTS = {
  basic:   'drqcvf',
  love:    'yqbcw',
  career:  'lfvmx',
  story:   'nuxbbx',
  bundle:  'vhtko',
};
function polarCheckout(productId, onTestSuccess){
  const isTest = typeof window !== 'undefined' && window.location.search.includes('test=true');
  if(isTest){
    if(onTestSuccess) onTestSuccess();
    return;
  }
  window.open(`https://bornfromco.gumroad.com/l/${productId}`,'_blank');
}



function IllusPentagon(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><line x1="100" y1="16" x2="158" y2="62" stroke="#1E3352" strokeWidth="1"/><line x1="158" y1="62" x2="134" y2="106" stroke="#1E3352" strokeWidth="1"/><line x1="134" y1="106" x2="66" y2="106" stroke="#1E3352" strokeWidth="1"/><line x1="66" y1="106" x2="42" y2="62" stroke="#1E3352" strokeWidth="1"/><line x1="42" y1="62" x2="100" y2="16" stroke="#1E3352" strokeWidth="1"/><circle cx="100" cy="16" r="14" fill="#0D2010"/><text x="100" y="22" textAnchor="middle" fontSize="13" fill="#4CAF50" fontFamily="serif">木</text><circle cx="158" cy="62" r="14" fill="#2A0E08"/><text x="158" y="68" textAnchor="middle" fontSize="13" fill="#E84012" fontFamily="serif">火</text><circle cx="134" cy="106" r="14" fill="#2A2410"/><text x="134" y="112" textAnchor="middle" fontSize="13" fill="#C8A020" fontFamily="serif">土</text><circle cx="66" cy="106" r="14" fill="#1A1A1A"/><text x="66" y="112" textAnchor="middle" fontSize="13" fill="#CCCCCC" fontFamily="serif">金</text><circle cx="42" cy="62" r="14" fill="#0A1530"/><text x="42" y="68" textAnchor="middle" fontSize="13" fill="#4090E0" fontFamily="serif">水</text><circle cx="100" cy="62" r="18" fill="none" stroke="#C8A055" strokeWidth=".8" strokeDasharray="4 3"/><text x="100" y="68" textAnchor="middle" fontSize="12" fill="#C8A055" fontFamily="serif">命</text></svg>);}
function IllusPerson(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><circle cx="140" cy="10" r="2" fill="#EDE5D3" opacity=".8"/><circle cx="80" cy="14" r="1.5" fill="#EDE5D3" opacity=".9"/><circle cx="50" cy="28" r="1.5" fill="#EDE5D3" opacity=".7"/><circle cx="168" cy="30" r="1.5" fill="#EDE5D3" opacity=".7"/><circle cx="100" cy="20" r="2.5" fill="#E88C12" opacity=".95"/><circle cx="45" cy="36" r="2" fill="#C8A055" opacity=".85"/><line x1="100" y1="20" x2="45" y2="36" stroke="#C8A055" strokeWidth=".5" opacity=".6"/><line x1="100" y1="20" x2="140" y2="10" stroke="#C8A055" strokeWidth=".5" opacity=".6"/><rect x="0" y="84" width="200" height="31" fill="#050C18"/><line x1="0" y1="84" x2="200" y2="84" stroke="#1E3352" strokeWidth=".5"/><circle cx="100" cy="68" r="8" fill="#E88C12"/><rect x="97" y="55" width="6" height="15" fill="#E88C12" rx="1"/><line x1="100" y1="76" x2="94" y2="84" stroke="#E88C12" strokeWidth="5" strokeLinecap="round"/><line x1="100" y1="76" x2="106" y2="84" stroke="#E88C12" strokeWidth="5" strokeLinecap="round"/><line x1="98" y1="60" x2="88" y2="54" stroke="#E88C12" strokeWidth="4" strokeLinecap="round"/><line x1="102" y1="60" x2="112" y2="54" stroke="#E88C12" strokeWidth="4" strokeLinecap="round"/></svg>);}
function IllusMoons(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><path d="M62 57 Q62 24 82 24 Q102 24 102 57 Q102 80 82 90 Q62 80 62 57Z" fill="none" stroke="#E88C12" strokeWidth="1.2"/><path d="M98 57 Q98 24 118 24 Q138 24 138 57 Q138 80 118 90 Q98 80 98 57Z" fill="none" stroke="#C8A055" strokeWidth="1.2"/><circle cx="82" cy="57" r="16" fill="#1A1020"/><text x="82" y="63" textAnchor="middle" fontSize="16" fill="#E88C12">♡</text><circle cx="118" cy="57" r="16" fill="#1A1020"/><text x="118" y="63" textAnchor="middle" fontSize="16" fill="#C8A055">♡</text><circle cx="100" cy="10" r="3" fill="#E88C12" opacity=".9"/></svg>);}
function IllusMountain(){return(<svg viewBox="0 0 200 115" width="100%" height="110"><polygon points="100,14 142,76 58,76" fill="none" stroke="#C8A055" strokeWidth="1"/><polygon points="100,30 130,74 70,74" fill="#0A1220"/><rect x="86" y="74" width="28" height="22" fill="#0A1220"/><rect x="0" y="90" width="200" height="2" fill="#1E3352"/><circle cx="100" cy="5" r="9" fill="#0A1220" stroke="#E88C12" strokeWidth="1"/><text x="100" y="10" textAnchor="middle" fontSize="10" fill="#E88C12" fontFamily="serif">日</text></svg>);}

function StoryIllus1(){return(<svg viewBox="0 0 500 180" width="100%" style={{display:'block',margin:'24px 0',borderRadius:4}}><rect width="500" height="180" fill="#060C18"/>{[[40,18,1.2],[90,10,1],[160,26,1.5],[230,7,1],[310,16,1.2],[380,9,1],[440,22,1.5],[70,50,1],[200,42,1.2],[350,38,1]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#EDE5D3" opacity={.55+i%3*.15}/>))}<circle cx="420" cy="35" r="20" fill="#C8A055" opacity=".2"/><circle cx="428" cy="33" r="17" fill="#060C18"/><path d="M400 31 Q410 21 420 35 Q410 49 400 41 Q393 35 400 31Z" fill="#C8A055" opacity=".42"/><rect x="0" y="118" width="500" height="62" fill="#0A1628"/><rect x="60" y="100" width="380" height="22" fill="#0D1A28"/><path d="M55 100 Q180 76 250 73 Q320 76 445 100" fill="none" stroke="#C8A055" strokeWidth="2" opacity=".85"/><path d="M55 100 Q30 91 18 102" fill="none" stroke="#E88C12" strokeWidth="2.2" opacity=".85"/><path d="M445 100 Q470 91 482 102" fill="none" stroke="#E88C12" strokeWidth="2.2" opacity=".85"/><path d="M215 120 L215 98 Q215 86 228 86 L272 86 Q285 86 285 98 L285 120Z" fill="#E88C12" opacity=".35"/><path d="M215 120 L215 98 Q215 86 228 86 L272 86 Q285 86 285 98 L285 120Z" fill="none" stroke="#E88C12" strokeWidth="1.8" opacity=".75"/>{[[140,90],[185,78],[315,78],[360,90]].map(([x,y],i)=>(<g key={i}><line x1={x} y1={y-9} x2={x} y2={y-2} stroke="#C8A055" strokeWidth=".8"/><ellipse cx={x} cy={y+4} rx="5.5" ry="8.5" fill="#E88C12" opacity=".85"/></g>))}{['#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A'].map((col,i)=>(<rect key={i} x={65+i*22} y="101" width="15" height="6" fill={col} opacity=".7"/>))}</svg>);}
function StoryIllus2(){return(<svg viewBox="0 0 500 160" width="100%" style={{display:'block',margin:'24px 0',borderRadius:4}}><rect width="500" height="160" fill="#060C18"/>{[[30,13,1],[100,7,1.3],[180,18,1],[260,5,1.2],[340,12,1],[420,8,1.3],[80,35,1.2],[380,28,1.2]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#EDE5D3" opacity={.5+i%3*.2}/>))}<rect x="42" y="112" width="8" height="48" fill="#07111C"/><polygon points="46,60 28,105 64,105" fill="#07111C"/><polygon points="46,82 24,118 68,118" fill="#08131E"/><rect x="452" y="112" width="8" height="48" fill="#07111C"/><polygon points="456,60 438,105 474,105" fill="#07111C"/><polygon points="456,82 434,118 478,118" fill="#08131E"/><path d="M0 138 Q125 118 250 126 Q375 118 500 132 L500 160 L0 160Z" fill="#091420"/><path d="M0 148 Q125 134 250 138 Q375 134 500 143 L500 160 L0 160Z" fill="#0A1628"/><rect x="247" y="94" width="6" height="60" fill="#1A1A28"/><path d="M250 94 Q230 76 215 84" fill="none" stroke="#1A1A28" strokeWidth="3"/><path d="M250 94 Q270 70 285 80" fill="none" stroke="#1A1A28" strokeWidth="3"/>{[[215,84,7],[285,80,6],[240,70,6],[262,67,5],[250,63,7],[230,78,4],[272,78,4]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#FFB7C5" opacity={.5+i%2*.25}/>))}{[[190,106,2.5],[320,98,2],[160,122,2],[350,115,2.5]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill="#FFB7C5" opacity=".3"/>))}</svg>);}
function StoryIllus3(){return(<svg viewBox="0 0 500 160" width="100%" style={{display:'block',margin:'24px 0',borderRadius:4}}><rect width="500" height="160" fill="#060C18"/>{[[25,13,1.5],[60,7,1],[95,18,1.5],[140,4,1.2],[180,16,1.8],[230,9,1],[275,20,1.5],[320,6,1.2],[365,14,1.8],[410,10,1],[450,18,1.5],[50,35,1],[210,38,1],[390,36,1.5]].map(([x,y,r],i)=>(<circle key={i} cx={x} cy={y} r={r} fill={i%5===0?'#C8A055':i%7===0?'#E88C12':'#EDE5D3'} opacity={.6+i%3*.15}/>))}<circle cx="250" cy="45" r="28" fill="#C8A055" opacity=".1"/><circle cx="250" cy="45" r="18" fill="#C8A055" opacity=".1"/><circle cx="250" cy="45" r="10" fill="#C8A055" opacity=".16"/>{[[100,65,.9],[150,52,.85],[200,62,.95],[250,38,.9],[300,58,.9],[360,52,.8],[130,86,.7],[370,82,.7]].map(([x,y,o],i)=>(<g key={i} opacity={o}><line x1={x} y1={y-9} x2={x} y2={y-2} stroke="#C8A055" strokeWidth=".7"/><ellipse cx={x} cy={y+4} rx="5.5" ry="8" fill="#E88C12"/><ellipse cx={x} cy={y} rx="5.5" ry="2.5" fill="#C8A055" opacity=".5"/></g>))}<path d="M0 138 Q250 120 500 130 L500 160 L0 160Z" fill="#091420"/><path d="M0 147 Q250 132 500 140 L500 160 L0 160Z" fill="#0A1628"/><circle cx="228" cy="132" r="4.5" fill="#C8A055" opacity=".55"/><rect x="225" y="137" width="6" height="12" rx="2" fill="#C8A055" opacity=".45"/><circle cx="244" cy="130" r="4.5" fill="#E88C12" opacity=".55"/><rect x="241" y="135" width="6" height="12" rx="2" fill="#E88C12" opacity=".45"/><ellipse cx="236" cy="144" rx="18" ry="7" fill="#E88C12" opacity=".07"/></svg>);}

function KoreanNight(){
  const dc=['#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A','#1A3A8B','#8B1A1A','#1A5A1A','#8B5A1A'];
  return(<svg style={{position:'absolute',bottom:0,left:0,width:'100%',pointerEvents:'none'}} viewBox="0 0 800 380" preserveAspectRatio="xMidYMax meet">
    <path d="M0 248 Q90 215 180 232 Q270 205 360 222 Q430 200 510 216 Q590 202 680 218 Q740 208 800 222 L800 248Z" fill="#0C1B2C"/>
    <path d="M0 268 Q70 238 150 252 Q240 228 330 244 Q420 220 500 238 Q590 224 680 236 Q740 226 800 240 L800 268Z" fill="#091420"/>
    <rect x="52" y="282" width="10" height="50" fill="#070E1A"/><polygon points="57,202 38,262 76,262" fill="#07111C"/><polygon points="57,228 34,278 80,278" fill="#08121E"/><polygon points="57,255 30,292 84,292" fill="#09141F"/>
    <rect x="738" y="282" width="10" height="50" fill="#070E1A"/><polygon points="743,202 724,262 762,262" fill="#07111C"/><polygon points="743,228 720,278 766,278" fill="#08121E"/><polygon points="743,255 716,292 770,292" fill="#09141F"/>
    {[{x:148,y:224,o:.88},{x:192,y:196,o:.72},{x:238,y:218,o:.8},{x:560,y:208,o:.82},{x:606,y:182,o:.68},{x:650,y:212,o:.78}].map(({x,y,o},i)=>(<g key={i} opacity={o}><line x1={x} y1={y-12} x2={x} y2={y-3} stroke="#C8A055" strokeWidth=".8"/><ellipse cx={x} cy={y+5} rx="7" ry="10" fill="#E88C12"/><ellipse cx={x} cy={y} rx="7" ry="3" fill="#C8A055" opacity=".5"/></g>))}
    <ellipse cx="400" cy="378" rx="210" ry="22" fill="#E88C12" opacity=".12"/>
    <rect x="8" y="272" width="784" height="108" fill="#111F30"/>
    <line x1="8" y1="292" x2="792" y2="292" stroke="#0C1826" strokeWidth=".7"/><line x1="8" y1="312" x2="792" y2="312" stroke="#0C1826" strokeWidth=".6"/>
    {Array.from({length:19},(_,i)=><line key={i} x1={50+i*40} y1="272" x2={50+i*40} y2="292" stroke="#0C1826" strokeWidth=".4"/>)}
    <path d="M325 272 L325 230 Q325 210 344 210 L456 210 Q475 210 475 230 L475 272Z" fill="#E88C12" opacity=".38"/><path d="M325 272 L325 230 Q325 210 344 210 L456 210 Q475 210 475 230 L475 272Z" fill="none" stroke="#E88C12" strokeWidth="2.2" opacity=".82"/>
    <path d="M148 272 L148 257 Q148 246 159 246 L218 246 Q229 246 229 257 L229 272Z" fill="#E88C12" opacity=".2"/><path d="M148 272 L148 257 Q148 246 159 246 L218 246 Q229 246 229 257 L229 272Z" fill="none" stroke="#E88C12" strokeWidth="1.1" opacity=".48"/>
    <path d="M571 272 L571 257 Q571 246 582 246 L641 246 Q652 246 652 257 L652 272Z" fill="#E88C12" opacity=".2"/><path d="M571 272 L571 257 Q571 246 582 246 L641 246 Q652 246 652 257 L652 272Z" fill="none" stroke="#E88C12" strokeWidth="1.1" opacity=".48"/>
    <rect x="308" y="206" width="19" height="68" fill="#0C1820"/><rect x="473" y="206" width="19" height="68" fill="#0C1820"/>
    <rect x="52" y="210" width="696" height="34" fill="#0D1725"/>
    {[[88,215,50,24],[196,215,50,24],[558,215,50,24],[666,215,50,24]].map(([x,y,w,h],i)=>(<g key={i} opacity=".45"><rect x={x} y={y} width={w} height={h} fill="none" stroke="#E88C12" strokeWidth=".7"/><line x1={x+16} y1={y} x2={x+16} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x+33} y1={y} x2={x+33} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x} y1={y+h/2} x2={x+w} y2={y+h/2} stroke="#E88C12" strokeWidth=".4"/></g>))}
    <line x1="309" y1="206" x2="309" y2="214" stroke="#C8A055" strokeWidth=".8" opacity=".7"/><ellipse cx="309" cy="221" rx="5" ry="7.5" fill="#E88C12" opacity=".92"/>
    <line x1="491" y1="206" x2="491" y2="214" stroke="#C8A055" strokeWidth=".8" opacity=".7"/><ellipse cx="491" cy="221" rx="5" ry="7.5" fill="#E88C12" opacity=".92"/>
    {[370,400,430].map((x,i)=>(<g key={i}><line x1={x} y1="210" x2={x} y2="218" stroke="#C8A055" strokeWidth=".7" opacity=".6"/><ellipse cx={x} cy="225" rx="4" ry="6.5" fill="#E88C12" opacity=".86"/></g>))}
    <rect x="52" y="193" width="696" height="18" fill="#0F1C10"/>{dc.slice(0,24).map((col,i)=><rect key={i} x={58+i*28} y="194" width="18" height="8" fill={col} opacity=".78"/>)}<line x1="52" y1="193" x2="748" y2="193" stroke="#C8A055" strokeWidth=".9" opacity=".65"/>
    <rect x="82" y="156" width="636" height="38" fill="#0D1620"/>
    {[[128,161,46,26],[250,161,46,26],[377,161,48,26],[504,161,46,26],[624,161,46,26]].map(([x,y,w,h],i)=>(<g key={i} opacity=".38"><rect x={x} y={y} width={w} height={h} fill="none" stroke="#E88C12" strokeWidth=".7"/><line x1={x+w/3} y1={y} x2={x+w/3} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x+2*w/3} y1={y} x2={x+2*w/3} y2={y+h} stroke="#E88C12" strokeWidth=".4"/><line x1={x} y1={y+h/2} x2={x+w} y2={y+h/2} stroke="#E88C12" strokeWidth=".4"/></g>))}
    <rect x="82" y="138" width="636" height="18" fill="#0F1C10"/>{dc.slice(0,22).map((col,i)=><rect key={i} x={88+i*28} y="139" width="18" height="8" fill={col} opacity=".70"/>)}<line x1="82" y1="138" x2="718" y2="138" stroke="#C8A055" strokeWidth=".85" opacity=".58"/>
    <path d="M48 138 Q200 114 400 110 Q600 114 752 138 L754 142 L46 142Z" fill="#080E1A"/>
    <path d="M48 138 Q200 114 400 110 Q600 114 752 138" fill="none" stroke="#C8A055" strokeWidth="2.2" opacity=".93"/>
    <path d="M48 138 Q20 128 4 140" fill="none" stroke="#E88C12" strokeWidth="2.8" opacity=".88"/>
    <path d="M752 138 Q780 128 796 140" fill="none" stroke="#E88C12" strokeWidth="2.8" opacity=".88"/>
    <rect x="106" y="66" width="588" height="17" fill="#0F1C10"/>{dc.slice(0,20).map((col,i)=><rect key={i} x={112+i*28} y="67" width="17" height="7.5" fill={col} opacity=".62"/>)}<line x1="106" y1="66" x2="694" y2="66" stroke="#C8A055" strokeWidth=".75" opacity=".52"/>
    <path d="M88 66 Q250 34 400 30 Q550 34 712 66 L716 70 L84 70Z" fill="#060C16"/>
    <path d="M88 66 Q250 34 400 30 Q550 34 712 66" fill="none" stroke="#C8A055" strokeWidth="2.6" opacity=".97"/>
    <path d="M88 66 Q54 52 28 66" fill="none" stroke="#C8A055" strokeWidth="3.2" opacity=".95"/>
    <path d="M712 66 Q746 52 772 66" fill="none" stroke="#C8A055" strokeWidth="3.2" opacity=".95"/>
    <rect x="362" y="26" width="76" height="8" rx="2" fill="#13101A" stroke="#C8A055" strokeWidth="1.3" opacity=".94"/>
    <path d="M362 30 Q346 20 354 30" fill="none" stroke="#C8A055" strokeWidth="2" opacity=".9"/>
    <path d="M438 30 Q454 20 446 30" fill="none" stroke="#C8A055" strokeWidth="2" opacity=".9"/>
  </svg>);}

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
    const EC2={Wood:'#4CAF50',Fire:'#E84012',Earth:'#C8A020',Metal:'#AAAAAA',Water:'#4090E0'};
    const canvas=document.createElement('canvas');
    canvas.width=1080;canvas.height=1080;
    const ctx=canvas.getContext('2d');
    // Background
    ctx.fillStyle='#060C18';ctx.fillRect(0,0,1080,1080);
    // Border
    ctx.strokeStyle='#E88C12';ctx.lineWidth=3;ctx.strokeRect(36,36,1008,1008);
    ctx.strokeStyle='#1B2E48';ctx.lineWidth=1;ctx.strokeRect(52,52,976,976);
    // BORN FROM
    ctx.fillStyle='#E88C12';ctx.font='bold 48px Georgia';ctx.textAlign='center';
    ctx.fillText('BORN FROM',540,140);
    // Divider
    ctx.strokeStyle='#E88C12';ctx.lineWidth=1;ctx.globalAlpha=0.4;
    ctx.beginPath();ctx.moveTo(360,165);ctx.lineTo(720,165);ctx.stroke();ctx.globalAlpha=1;
    // COMPATIBILITY
    ctx.fillStyle='#8A9BAB';ctx.font='24px Georgia';
    ctx.fillText('COMPATIBILITY · 궁합',540,220);
    // Element symbols
    const myCol=EC2[compatResult.myEl]||'#E88C12';
    const thCol=EC2[compatResult.theirEl]||'#4090E0';
    const mySym=ECH2[compatResult.myEl]||'?';
    const thSym=ECH2[compatResult.theirEl]||'?';
    ctx.font='bold 200px Georgia';
    ctx.fillStyle=myCol;ctx.textAlign='center';ctx.fillText(mySym,290,540);
    ctx.fillStyle='#E88C12';ctx.font='80px Georgia';ctx.fillText('♡',540,500);
    ctx.fillStyle=thCol;ctx.font='bold 200px Georgia';ctx.fillText(thSym,790,540);
    // Labels
    ctx.fillStyle='#8A9BAB';ctx.font='26px Georgia';
    ctx.fillText('You',290,590);ctx.fillText('Them',790,590);
    // Score bar
    const bW=700,bX=190;
    ctx.fillStyle='#1B2E48';ctx.fillRect(bX,630,bW,12);
    ctx.fillStyle='#E88C12';ctx.fillRect(bX,630,bW*(compatResult.result.score/100),12);
    // Score
    ctx.fillStyle='#E88C12';ctx.font='bold 26px Georgia';
    ctx.fillText((compatResult.result.tag||'').toUpperCase()+' · '+compatResult.result.score+'%',540,690);
    // Title
    ctx.fillStyle='#EDE5D3';ctx.font='52px Georgia';
    ctx.fillText(compatResult.result.title,540,770);
    // CTA
    ctx.fillStyle='#8A9BAB';ctx.font='26px Georgia';
    ctx.fillText('Find your match at bornfrom.co',540,860);
    ctx.fillStyle='#E88C12';ctx.font='24px Georgia';
    ctx.fillText('@bornfrom.official',540,910);
    // Download
    canvas.toBlob(blob=>{
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download='bornfrom-compatibility.png';a.click();
      URL.revokeObjectURL(url);
      setTimeout(()=>{
        const txt=`${compatResult.myEl} meets ${compatResult.theirEl} — ${compatResult.result.score}% compatible ✦ Check yours: bornfrom.co @bornfrom.official`;
        if(navigator.share)navigator.share({text:txt,files:[]}).catch(()=>{});
      },500);
    },'image/png');
  };

  const base={background:V.bg,color:V.tx,fontFamily:FF,minHeight:'100vh'};
  const SS={background:V.bg,border:`1px solid ${V.br}`,color:V.tx,fontFamily:FF,fontSize:16,padding:'12px 8px',outline:'none',cursor:'pointer',width:'100%',WebkitAppearance:'none',appearance:'none'};

  const DateInputComp=()=>(
    <div style={{maxWidth:400,margin:'0 auto'}}>
      <style>{`.hvr-fill:hover{background:${V.am}!important;color:${V.bg}!important} .g-btn:hover{opacity:.85} select:focus{border-color:${V.am}!important;outline:none}`}</style>
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
      <div style={{display:'flex',marginBottom:24}}>
        {['female','male'].map(g=>(<button key={g} className="g-btn" onClick={()=>setGender(g)} style={{flex:1,padding:'12px',background:gender===g?V.am:V.bg,color:gender===g?V.bg:V.mu,border:`1px solid ${gender===g?V.am:V.br}`,fontFamily:FF,fontSize:15,cursor:'pointer',letterSpacing:2,transition:'all .2s'}}>{g==='female'?'♀ FEMALE':'♂ MALE'}</button>))}
      </div>
      {err&&<p style={{color:'#E05050',fontSize:14,marginBottom:12,textAlign:'center'}}>{err}</p>}
      <button className="hvr-fill" onClick={handleReveal} style={{width:'100%',background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'16px',fontFamily:FF,fontSize:19,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s'}}>REVEAL MY ELEMENT ✦</button>
    </div>
  );

  const DiscountPopup=()=>(
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(6,12,24,.95)',zIndex:999,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:V.s,border:`1px solid ${V.am}`,padding:'40px 32px',maxWidth:440,width:'100%',textAlign:'center',position:'relative'}}>
        <button onClick={()=>setPopup(false)} style={{position:'absolute',top:14,right:18,background:'none',border:'none',color:V.mu,fontSize:20,cursor:'pointer'}}>✕</button>
        <p style={{fontSize:11,letterSpacing:6,color:V.am,marginBottom:14}}>WAIT · 잠깐만요</p>
        <h2 style={{fontSize:26,fontWeight:600,lineHeight:1.2,marginBottom:10}}>Don't leave your fate unread</h2>
        <p style={{fontSize:15,color:V.mu,marginBottom:24,lineHeight:1.6}}>Your destiny is one birthday away.</p>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:12,marginBottom:24}}>
          <span style={{fontSize:16,color:'#3A5070',textDecoration:'line-through'}}>$47</span>
          <span style={{fontSize:44,color:V.am,fontWeight:700,lineHeight:1}}>$27</span>
        </div>
        <button onClick={()=>{setPopup(false);document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'});}} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'15px',fontFamily:FF,fontSize:17,cursor:'pointer',letterSpacing:3,fontWeight:700,marginBottom:10}}>YES — CLAIM MY READING ✦</button>
        <p style={{fontSize:11,color:'#2A4060'}}>* expires when you close this window</p>
      </div>
    </div>
  );

  // ── LANDING ───────────────────────────────────────────────
  if(view==='landing') return(
    <div style={base}>
      <style>{`@keyframes tw{0%,100%{opacity:.8}50%{opacity:.2}} @keyframes tw2{0%,100%{opacity:.45}50%{opacity:.95}} .el-item:hover{background:#0A1628} .pkg-card:hover{border-color:#E88C12!important} .hvr-fill:hover{background:#E88C12!important;color:#060C18!important} @media(max-width:600px){.hero-h1{font-size:36px!important}.pkg-grid{grid-template-columns:1fr!important}.why-grid{grid-template-columns:1fr!important}.bundle-inner{flex-direction:column!important}.sp{padding:56px 20px!important}}`}</style>
      {popup&&<DiscountPopup/>}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:`1px solid ${V.br}`,position:'sticky',top:0,background:'rgba(6,12,24,.97)',zIndex:50}}>
        <div style={{fontSize:16,letterSpacing:4,fontWeight:400}}>BORN <span style={{color:V.am}}>FROM</span></div>
        <button className="hvr-fill" onClick={()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'9px 22px',fontFamily:FF,fontSize:14,cursor:'pointer',letterSpacing:3,transition:'all .2s'}}>GET READING</button>
      </nav>
      <section style={{position:'relative',overflow:'hidden'}}>
        <div className="sp" style={{position:'relative',zIndex:3,textAlign:'center',padding:'72px 40px 32px'}}>
          <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:-1}} viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice">
            {[[42,28,1,'tw',2.8,0],[112,14,1.5,'tw2',3.4,.5],[198,44,1,'tw',2.2,.2],[278,11,1,'tw2',3.8,.8],[354,34,1.5,'tw',2.5,.3],[432,7,1,'tw2',3,.1],[512,26,1,'tw',2.8,.6],[594,17,1.5,'tw2',3.2,1],[664,38,1,'tw',2.6,.4],[754,20,1,'tw2',2.9,.9],[68,72,1,'tw',3.6,.7],[164,86,1.5,'tw2',2.4,.2],[244,64,1,'tw',3.1,.5],[484,68,1.5,'tw',3.3,.8],[720,60,1.5,'tw',3,.9]].map(([cx,cy,r,a,d,dl],i)=>(<circle key={i} cx={cx} cy={cy} r={r} fill={i%9===4?'#C8A055':i%13===7?'#E88C12':'#EDE5D3'} style={{animation:`${a} ${d}s ${dl}s infinite`}}/>))}
            <circle cx="680" cy="55" r="28" fill="#C8A055" opacity=".14"/><circle cx="690" cy="53" r="24" fill="#060C18"/><path d="M658 50 Q668 40 680 56 Q668 72 658 62 Q650 56 658 50Z" fill="#C8A055" opacity=".30"/>
          </svg>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:20}}>COSMIC PERSONAL ANALYSIS · WHAT ELEMENT WERE YOU BORN FROM?</p>
          <h1 className="hero-h1" style={{fontSize:64,lineHeight:1.08,fontWeight:600,marginBottom:20}}>You Were Born<br/>From The <span style={{color:V.am}}>Elements.</span><br/><span style={{fontSize:'0.55em',fontWeight:400,color:V.mu,letterSpacing:2}}>Ancient Korea knew exactly who you are.</span></h1>
          <p style={{fontSize:19,color:V.mu,lineHeight:1.7,maxWidth:500,margin:'0 auto 36px'}}>Your birthdate contains a precise cosmic signature — one of five elemental forces that shapes your personality, relationships, and path. <span style={{color:V.tx}}>This is your personal analysis.</span> Not a horoscope. Not a personality test. The ancient Korean system that has mapped human nature for 3,000 years.</p>
          <button className="hvr-fill" onClick={()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'})} style={{background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'15px 44px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s',marginBottom:18}}>DISCOVER YOUR ELEMENT ✦</button>
          <p style={{fontSize:13,color:V.mu,letterSpacing:3,fontWeight:600}}>✦ TRUSTED BY 40,000+ SEEKERS WORLDWIDE ✦</p>
        </div>
        <div style={{position:'relative',height:380,overflow:'hidden',marginTop:-40}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:60,background:`linear-gradient(to bottom,${V.bg},transparent)`,zIndex:2,pointerEvents:'none'}}/>
          <KoreanNight/>
        </div>
      </section>
      <section className="sp" style={{padding:'80px 40px',borderTop:`1px solid ${V.br}`,borderBottom:`1px solid ${V.br}`}}>
        <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:20}}>WHY BORN FROM?</p>
          <h2 style={{fontSize:40,fontWeight:400,lineHeight:1.25,marginBottom:36}}>Tarot gave you symbols.<br/>Astrology gave you archetypes.<br/><span style={{color:V.am}}>Born From gives you yourself.</span></h2>
          <div className="why-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,textAlign:'left',marginBottom:48}}>
            {[{icon:'木',title:'You were born from nature',body:"From the moment of your first breath, one of the Five Elements became the core of who you are. This isn't a personality test. This is the universe's own record of you."},{icon:'地',title:"The Earth's code, decoded",body:"SAJU reads from the same elemental forces that govern the natural world. Live in alignment with your element, and happiness is not a hope — it is a certainty."},{icon:'命',title:'Your path to happiness exists',body:"Tarot shows you cards. Astrology shows you planets. Born From shows you you — your exact elemental makeup, with precision developed over 3,000 years of Eastern wisdom."},{icon:'✦',title:"Korea's oldest science",body:"From K-pop to K-beauty to K-drama, Korea has been showing the world something real. Born From is Korea's oldest system — 3,000 years of mapping who people truly are, now available in English for the first time."}].map((c,i)=>(<div key={i} style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px'}}><div style={{fontSize:28,color:V.am,marginBottom:10}}>{c.icon}</div><h3 style={{fontSize:19,marginBottom:10,fontWeight:400}}>{c.title}</h3><p style={{fontSize:16,color:V.mu,lineHeight:1.7}}>{c.body}</p></div>))}
          </div>
          <p style={{fontSize:20,color:V.tx,lineHeight:1.9,maxWidth:580,margin:'0 auto',fontStyle:'italic'}}>"당신이 행복해질 길이 있다."<br/><span style={{fontSize:16,color:V.mu,fontStyle:'normal'}}>Your path to happiness exists — and it was written the day you were born.</span></p>
        </div>
      </section>
      <div style={{display:'flex',borderBottom:`1px solid ${V.br}`,flexWrap:'wrap'}}>
        {[['木','WOOD','Growth · Vision','#4CAF50'],['火','FIRE','Passion · Power','#E84012'],['土','EARTH','Stability · Trust','#C8A020'],['金','METAL','Precision · Will','#CCCCCC'],['水','WATER','Flow · Wisdom','#4090E0']].map(([ch,nm,tr,cl])=>(<div key={nm} className="el-item" style={{flex:'1 1 60px',textAlign:'center',padding:'24px 8px',borderRight:`1px solid ${V.br}`,transition:'background .25s'}}><div style={{fontSize:30,color:cl,marginBottom:6}}>{ch}</div><div style={{fontSize:11,letterSpacing:4,color:V.mu}}>{nm}</div><div style={{fontSize:13,color:V.mu,marginTop:4}}>{tr}</div></div>))}
      </div>
      <section className="sp" style={{padding:'80px 32px'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:14}}>CHOOSE YOUR READING</p>
          <h2 style={{fontSize:40,fontWeight:400,lineHeight:1.2}}>Your Fate, Your Choice</h2>
          <p style={{fontSize:17,color:V.mu,marginTop:10}}>Every reading generated uniquely from your birth data</p>
        </div>
        <div className="pkg-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,maxWidth:800,margin:'0 auto'}}>
          {[{id:'basic',ko:'Basic Fortune',en:'FULL SAJU READING',desc:'4,000+ characters · Your elemental identity, life path & 2026 forecast.',orig:null,price:'$27',badge:null,bl:true,feat:false,il:<IllusPentagon/>},{id:'story',ko:'The Life Script',en:'BORN FROM SIGNATURE',desc:'A Korean fairy tale written in the stars with you as the hero. Love, trial, and triumph.',orig:'$97',price:'$47',badge:'BORN FROM ONLY ✦',bl:false,feat:true,il:<IllusPerson/>},{id:'love',ko:'The Relationship Decoder',en:'LOVE READING',desc:'5,000+ characters · Who loves you, where they find you & 2026 love.',orig:null,price:'$37',badge:'MOST POPULAR',bl:false,il:<IllusMoons/>},{id:'career',ko:'The Success Compass',en:'CAREER READING',desc:'Your natural talents, destined career paths, and the exact decade your power peaks.',orig:null,price:'$37',badge:null,il:<IllusMountain/>}].map(pkg=>(<div key={pkg.id} className="pkg-card" onClick={()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'})} style={{background:V.s,border:`1px solid ${V.br}`,padding:'28px',cursor:'pointer',transition:'border-color .25s .2s',position:'relative'}}>{pkg.badge&&<span style={{position:'absolute',top:-1,[pkg.bl?'left':'right']:22,background:pkg.feat?V.go:V.am,color:V.bg,fontSize:10,letterSpacing:2,padding:'4px 12px',fontWeight:700}}>{pkg.badge}</span>}<div style={{height:110,marginBottom:20}}>{pkg.il}</div><div style={{fontSize:22,letterSpacing:1,marginBottom:4}}>{pkg.ko}</div><div style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:10}}>{pkg.en}</div><div style={{fontSize:15,color:V.mu,lineHeight:1.6,marginBottom:18}}>{pkg.desc}</div><div style={{display:'flex',alignItems:'baseline',gap:10}}>{pkg.orig&&<span style={{fontSize:14,color:'#2A4070',textDecoration:'line-through'}}>{pkg.orig}</span>}<span style={{fontSize:28,color:V.am,fontWeight:600}}>{pkg.price}</span></div>
              <button onClick={(e)=>{e.stopPropagation();polarCheckout(PRODUCTS[pkg.id],()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'}));}} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'11px',fontFamily:FF,fontSize:14,cursor:'pointer',letterSpacing:2,fontWeight:700,marginTop:12}}>GET THIS READING →</button>
            </div>))}
        </div>
        <div className="bundle-inner" onClick={()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'})} style={{background:V.s,border:`1px solid ${V.go}`,padding:'32px',maxWidth:800,margin:'18px auto 0',cursor:'pointer',position:'relative',display:'flex',alignItems:'center',gap:28}}>
          <span style={{position:'absolute',top:-1,left:28,background:V.am,color:V.bg,fontSize:10,letterSpacing:2,padding:'4px 14px',fontWeight:700}}>BEST VALUE</span>
          <svg viewBox="0 0 120 90" width="110" height="83" style={{flexShrink:0}}><circle cx="60" cy="45" r="30" fill="none" stroke="#C8A055" strokeWidth=".8" strokeDasharray="3 3"/><circle cx="60" cy="45" r="18" fill="none" stroke="#E88C12" strokeWidth=".8" strokeDasharray="2 4"/><text x="60" y="52" textAnchor="middle" fontSize="22" fill="#E88C12" fontFamily="serif">命</text>{[[60,13,'#0D2010','#4CAF50','木'],[88,30,'#2A0E08','#E84012','火'],[78,62,'#2A2410','#C8A020','土'],[42,62,'#1A1A1A','#CCCCCC','金'],[32,30,'#0A1530','#4090E0','水']].map(([cx,cy,bg,cl,ch],i)=>(<g key={i}><circle cx={cx} cy={cy} r="7" fill={bg} stroke={cl} strokeWidth=".8"/><text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill={cl} fontFamily="serif">{ch}</text></g>))}</svg>
          <div style={{flex:1}}><div style={{fontSize:22,letterSpacing:1,marginBottom:4}}>Complete Destiny Bundle</div><div style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:8}}>ALL FOUR READINGS</div><div style={{fontSize:15,color:V.mu,lineHeight:1.5,marginBottom:4}}>Your complete personal report — 4 readings, ~3,000 words.</div>
              <div style={{fontSize:13,color:V.mu,lineHeight:1.6,marginBottom:12}}>✦ Your elemental nature &nbsp;✦ Love &nbsp;✦ Career<br/>✦ The Life Script (BORN FROM exclusive) &nbsp;✦ PDF download</div><div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:14}}><span style={{fontSize:14,color:'#2A4070',textDecoration:'line-through'}}>$148</span><span style={{fontSize:30,color:V.am,fontWeight:600}}>$97</span></div><button onClick={()=>polarCheckout(PRODUCTS.bundle,()=>document.getElementById('saju-form')?.scrollIntoView({behavior:'smooth'}))} style={{background:V.am,color:V.bg,border:'none',padding:'12px 24px',fontFamily:FF,fontSize:15,cursor:'pointer',letterSpacing:2,fontWeight:700}}>GET BUNDLE →</button></div>
        </div>
      </section>
      <section id="saju-form" style={{padding:'80px 32px',borderTop:`1px solid ${V.br}`,textAlign:'center',background:V.s}}>
        <p style={{fontSize:12,letterSpacing:7,color:V.am,marginBottom:16}}>BEGIN YOUR READING</p>
        <h2 style={{fontSize:44,fontWeight:600,marginBottom:14,lineHeight:1.1}}>Discover Your<br/><span style={{color:V.am}}>Cosmic Signature</span></h2>
        <p style={{fontSize:17,color:V.mu,lineHeight:1.6,maxWidth:400,margin:'0 auto 40px'}}>Enter your birthday. Your personal elemental analysis — free, instant, and unlike anything you've seen before.</p>
        <DateInputComp/>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${V.br}`,marginTop:60,padding:'28px 20px',textAlign:'center'}}>
        <div style={{fontSize:11,letterSpacing:4,color:'#2A4060',marginBottom:8}}>BORN FROM · COSMIC PERSONAL ANALYSIS</div>
        <div style={{display:'flex',justifyContent:'center',gap:20,marginBottom:10,flexWrap:'wrap'}}>
          <a href="/legal" style={{fontSize:11,color:'#2A4060',letterSpacing:2,textDecoration:'none'}}>Terms of Service</a>
          <span style={{color:'#1B2E48'}}>·</span>
          <a href="/legal" style={{fontSize:11,color:'#2A4060',letterSpacing:2,textDecoration:'none'}}>Refund Policy</a>
          <span style={{color:'#1B2E48'}}>·</span>
          <a href="mailto:bornfrom.co@gmail.com" style={{fontSize:11,color:'#2A4060',letterSpacing:2,textDecoration:'none'}}>Contact</a>
        </div>
        <div style={{fontSize:10,color:'#1B2E48',letterSpacing:2}}>© 2026 Born From. All rights reserved.</div>
      </footer>
    </div>
  );

  // ── FREE REVEAL ───────────────────────────────────────────
  if(view==='reveal'&&saju){
    const d=SD[saju.day.s]||SD['甲'];
    const idols=IDOLS[saju.day.s]||[];
    return(
      <div style={{...base,minHeight:'100vh'}}>
        <style>{`@keyframes glow{0%,100%{opacity:.6}50%{opacity:1}} @keyframes rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}} .ri{animation:rise .8s ease forwards} .ri2{animation:rise .8s .15s ease both} .ri3{animation:rise .8s .3s ease both} .ri4{animation:rise .8s .45s ease both} .ri5{animation:rise .8s .6s ease both} .hvr-fill:hover{background:#E88C12!important;color:#060C18!important}`}</style>
        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:`1px solid ${V.br}`,background:V.bg}}>
          <div style={{fontSize:16,letterSpacing:4,fontWeight:400}}>BORN <span style={{color:V.am}}>FROM</span></div>
          <button onClick={()=>setView('landing')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'7px 16px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2}}>← Back</button>
        </nav>
        <div style={{maxWidth:580,margin:'0 auto',padding:'56px 24px 80px',textAlign:'center'}}>
          <div className="ri" style={{marginBottom:28}}>
            <p style={{fontSize:12,letterSpacing:7,color:d.color,marginBottom:18,opacity:.8}}>{d.el.toUpperCase()} · {d.ko.toUpperCase()}</p>
            <div style={{fontSize:120,lineHeight:1,color:d.color,marginBottom:8,animation:'glow 3s infinite',textShadow:`0 0 60px ${d.color}44`}}>{d.sym}</div>
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

          {/* COMPATIBILITY */}
          <div className="ri4" style={{marginBottom:40}}>
            {!showCompat
              ?<button onClick={()=>setShowCompat(true)} style={{width:'100%',background:`${V.am}18`,border:`2px solid ${V.am}`,color:V.tx,padding:'20px',fontFamily:FF,fontSize:18,cursor:'pointer',lineHeight:1.6,transition:'all .2s'}} onMouseOver={e=>{e.currentTarget.style.background=V.am;e.currentTarget.style.color=V.bg;}} onMouseOut={e=>{e.currentTarget.style.background=`${V.am}18`;e.currentTarget.style.color=V.tx;}}>
                ♡ Is someone special compatible with you?<br/>
                <span style={{fontSize:13,letterSpacing:3,color:V.am}}>ENTER THEIR BIRTHDAY →</span>
              </button>
              :<div style={{background:V.s,border:`1px solid ${V.br}`,padding:'24px',textAlign:'left'}}>
                <p style={{fontSize:12,letterSpacing:5,color:V.am,marginBottom:16,textAlign:'center'}}>COMPATIBILITY · 궁합</p>
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
                    <button onClick={checkCompat} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'13px',fontFamily:FF,fontSize:16,cursor:'pointer',letterSpacing:2,fontWeight:700}}>CHECK COMPATIBILITY ♡</button>
                  </>
                  :<>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:24,marginBottom:18}}>
                      <div style={{textAlign:'center'}}><div style={{fontSize:50,color:EC[compatResult.myEl]}}>{ECH[compatResult.myEl]}</div><div style={{fontSize:12,color:V.mu,marginTop:4}}>You</div></div>
                      <div style={{fontSize:30,color:V.am}}>♡</div>
                      <div style={{textAlign:'center'}}><div style={{fontSize:50,color:EC[compatResult.theirEl]}}>{ECH[compatResult.theirEl]}</div><div style={{fontSize:12,color:V.mu,marginTop:4}}>Them</div></div>
                    </div>
                    <div style={{background:'#0A1628',height:6,borderRadius:3,marginBottom:18,overflow:'hidden'}}><div style={{background:V.am,height:'100%',width:`${compatResult.result.score}%`,borderRadius:3}}/></div>
                    <p style={{fontSize:11,letterSpacing:4,color:V.am,marginBottom:8,textAlign:'center'}}>{compatResult.result.tag.toUpperCase()} · {compatResult.result.score}%</p>
                    <h3 style={{fontSize:22,marginBottom:10,fontWeight:400,textAlign:'center'}}>{compatResult.result.title}</h3>
                    <p style={{fontSize:16,color:V.tx,lineHeight:1.75,marginBottom:20}}>{compatResult.result.desc}</p>
                    <div style={{borderTop:`1px solid ${V.br}`,paddingTop:16}}>
                      <div style={{padding:'18px',background:'#081420',border:`2px solid ${V.am}`,textAlign:'center',marginBottom:10}}>
                        <div style={{fontSize:10,letterSpacing:5,color:V.am,marginBottom:8}}>THE RELATIONSHIP DECODER</div>
                        <div style={{fontSize:20,color:V.tx,fontWeight:300,lineHeight:1.4,marginBottom:8}}>Want to know exactly what<br/>this connection means?</div>
                        <p style={{fontSize:13,color:V.mu,lineHeight:1.65,marginBottom:14}}>Timing · Who to look for · What 2026 brings for this connection — your full love destiny.</p>
                        <button onClick={()=>polarCheckout(PRODUCTS.love)} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'14px',fontFamily:FF,fontSize:15,cursor:'pointer',letterSpacing:2,fontWeight:700,boxShadow:'0 0 24px #E88C1266'}}>🔓 UNLOCK THE RELATIONSHIP DECODER · $37 →</button>
                      </div>
                      <button onClick={shareCompat} style={{width:'100%',background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'11px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2}}>📲 SAVE & SHARE YOUR RESULT ✦</button>
                    </div>
                    <div style={{marginTop:14,padding:'12px',background:V.s,border:`1px solid ${V.br}`,textAlign:'center'}}>
                      <p style={{fontSize:13,color:V.mu,marginBottom:8,lineHeight:1.6}}>Want to check more connections?</p>
                      <p style={{fontSize:15,color:V.tx,fontStyle:'italic',marginBottom:10}}>"Enter your crush's birthday — find out if they're your match."</p>
                      <button onClick={()=>{setCompatResult(null);setCM('');setCD('');setCY('');}} style={{background:'none',border:`1px solid ${V.am}`,color:V.am,padding:'8px 20px',fontFamily:FF,fontSize:12,cursor:'pointer',letterSpacing:2}}>CHECK ANOTHER PERSON ✦</button>
                    </div>
                  </>
                }
              </div>
            }
          </div>

          {idols.length>0&&(
            <div className="ri4" style={{background:V.s,border:`1px solid ${V.br}`,padding:'22px',marginBottom:36,textAlign:'left'}}>
              <p style={{fontSize:12,letterSpacing:5,color:V.go,marginBottom:12}}>YOUR ENERGY IN K-POP</p>
              <p style={{fontSize:16,color:V.mu,lineHeight:1.7,marginBottom:10}}><span style={{color:V.tx}}>{idols.map(i=>`${i.name} (${i.group})`).join(' and ')}</span> share your exact Day Master — {saju.day.s}, {d.name}.</p>
              <p style={{fontSize:14,color:V.mu,lineHeight:1.6}}>In your <span style={{color:V.am}}>Full Basic Reading</span>, discover which K-drama stars, K-pop idols, and historical figures share your exact 사주 pillars — and what that says about your fate.</p>
            </div>
          )}

          {/* INLINE PACKAGE CARDS on reveal page */}
          <div className="ri5" style={{marginBottom:40}}>
            <p style={{fontSize:13,letterSpacing:5,color:V.am,marginBottom:20,textAlign:'center'}}>CHOOSE YOUR READING</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10,gridAutoRows:'1fr'}}>
              {[
                {id:'basic',ko:'Basic Fortune',price:'$27',orig:null,desc:'4,000+ characters · Your elemental identity, life path & 2026 forecast',icon:'命',hot:false},
                {id:'story',ko:'The Life Script',price:'$47',orig:null,desc:'7,000+ characters · A Korean fairy tale written with you as the hero',icon:'✦',hot:false,sig:true},
                {id:'love',ko:'The Relationship Decoder',price:'$37',orig:null,desc:'5,000+ characters · Who loves you, where they find you & 2026 love',icon:'♡',hot:true},
                {id:'career',ko:'The Success Compass',price:'$37',orig:null,desc:'5,000+ characters · Your destined paths, power decade & 2026 career',icon:'山',hot:false},
              ].map(pkg=>(
                <div key={pkg.id}
                  style={{background:V.s,border:`1px solid ${V.br}`,padding:'16px 12px',textAlign:'left',position:'relative',transition:'border-color .2s',display:'flex',flexDirection:'column',justifyContent:'space-between'}}
                  onMouseOver={e=>e.currentTarget.style.borderColor=V.am}
                  onMouseOut={e=>e.currentTarget.style.borderColor=pkg.hot?V.am:V.br}>
                  {pkg.hot&&<span style={{position:'absolute',top:-1,left:0,right:0,textAlign:'center',background:V.am,color:V.bg,fontSize:9,letterSpacing:2,padding:'2px 8px',fontWeight:700}}>POPULAR</span>}
                  {pkg.sig&&<span style={{position:'absolute',top:-1,left:0,right:0,textAlign:'center',background:V.go,color:V.bg,fontSize:9,letterSpacing:2,padding:'2px 8px',fontWeight:700}}>BORN FROM ONLY ✦</span>}
                  <div style={{fontSize:20,color:V.am,marginBottom:6,marginTop:(pkg.hot||pkg.sig)?14:0}}>{pkg.icon}</div>
                  <div style={{fontSize:14,letterSpacing:1,marginBottom:4}}>{pkg.ko}</div>
                  <div style={{fontSize:12,color:V.mu,lineHeight:1.4,marginBottom:8}}>{pkg.desc}</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:10}}>
                    {pkg.orig&&<span style={{fontSize:11,color:'#2A4070',textDecoration:'line-through'}}>{pkg.orig}</span>}
                    <span style={{fontSize:18,color:V.am,fontWeight:600}}>{pkg.price}</span>
                  </div>
                  <button onClick={()=>polarCheckout(PRODUCTS[pkg.id],()=>setView('saju'))} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'9px',fontFamily:FF,fontSize:12,cursor:'pointer',letterSpacing:2,fontWeight:700}}>BUY →</button>
                </div>
              ))}
            </div>
            {/* Bundle row */}
            <div style={{background:'#081420',border:`1px solid ${V.go}`,padding:'16px 20px',color:V.tx}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <div>
                  <span style={{background:V.am,color:V.bg,fontSize:9,letterSpacing:2,padding:'2px 8px',fontWeight:700,marginRight:8}}>BEST VALUE</span>
                  <span style={{fontSize:15,letterSpacing:1}}>Complete Bundle: Full Access · All 4 Readings</span>
                </div>
                <div style={{display:'flex',alignItems:'baseline',gap:8,flexShrink:0}}>
                  <span style={{fontSize:13,color:'#2A4070',textDecoration:'line-through'}}>$148</span>
                  <span style={{fontSize:22,color:V.am,fontWeight:700}}>$97</span>
                </div>
              </div>
              <button onClick={()=>polarCheckout(PRODUCTS.bundle,()=>setView('saju'))} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'11px',fontFamily:FF,fontSize:14,cursor:'pointer',letterSpacing:2,fontWeight:700}}>GET ALL 4 READINGS →</button>
            </div>
          </div>

          <div className="ri5">
            <p style={{fontSize:16,color:V.mu,marginBottom:18,lineHeight:1.6}}>This is your element. Your full destiny — love, career, your story — goes so much deeper.</p>
            <button className="hvr-fill" onClick={()=>polarCheckout(PRODUCTS.bundle,()=>setView('saju'))} style={{width:'100%',background:'none',border:`2px solid ${V.am}`,color:V.am,padding:'18px',fontFamily:FF,fontSize:20,cursor:'pointer',letterSpacing:3,fontWeight:600,transition:'all .2s',marginBottom:10}}>UNLOCK MY FULL READING ✦</button>
            
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
        <p style={{fontSize:14,color:V.mu,textAlign:'center',marginBottom:14}}>Select a reading to generate</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,maxWidth:440,margin:'0 auto 14px'}}>
          {TABS.map(t=>(<button key={t.id} className="pg" onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.tx,padding:'16px 12px',fontFamily:FF,cursor:'pointer',textAlign:'left',transition:'border-color .2s'}}><div style={{fontSize:22,color:V.am,marginBottom:4}}>{t.icon}</div><div style={{fontSize:16,letterSpacing:1}}>{t.ko}</div></button>))}
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
    <div style={{...base,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'40px 20px',textAlign:'center'}}>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.15}50%{opacity:1}}`}</style>
      <div style={{fontSize:88,color:V.am,animation:'spin 4s linear infinite',display:'inline-block',marginBottom:28,lineHeight:1,textShadow:'0 0 40px #E88C1244'}}>命</div>
      <p style={{fontSize:22,color:V.tx,marginBottom:10,fontStyle:'italic',lineHeight:1.6,maxWidth:320}}>하늘이 당신의 운명을<br/>적어 내려가고 있습니다</p>
      <p style={{fontSize:13,letterSpacing:5,color:V.mu,marginBottom:32}}>THE SKY IS WRITING YOUR FATE</p>
      <div style={{display:'flex',gap:22,marginBottom:12}}>
        {['목','화','토','금','수'].map((ch,i)=>(<div key={ch} style={{fontSize:26,color:[EC.Wood,EC.Fire,EC.Earth,EC.Metal,EC.Water][i],fontWeight:600,animation:`pulse 1.5s ${i*0.28}s infinite`}}>{ch}</div>))}
      </div>
      <p style={{fontSize:13,color:'#2A4070',letterSpacing:2,marginTop:8}}>잠시만 기다려 주세요 · please wait</p>
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
          ?<div style={{background:V.s,border:`1px solid ${V.go}`,padding:'28px 24px',maxWidth:600,margin:'0 auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${V.br}`}}><span style={{fontSize:10,letterSpacing:5,color:V.go}}>YOUR STORY</span><span style={{fontSize:10,letterSpacing:5,color:V.go}}>당신의 이야기 ✦</span></div>
            <StoryIllus1/>
            {(()=>{
  const paras=reading.split(/\n\s*\n/).filter(p=>p.trim());
  const t1=Math.floor(paras.length/3);
  const t2=Math.floor(paras.length*2/3);
  const sec1=paras.slice(0,t1);
  const sec2=paras.slice(t1,t2);
  const sec3=paras.slice(t2);
  return(<>
    {sec1.map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
    <StoryIllus2/>
    {sec2.map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
    <StoryIllus3/>
    {sec3.map((p,i)=><p key={i} style={{fontSize:17,lineHeight:2.0,color:V.tx,fontStyle:'italic',marginBottom:20}}>{p.trim()}</p>)}
  </>);
})()}
            <div style={{textAlign:'center',marginTop:20,fontSize:11,letterSpacing:5,color:V.go}}>✦ THE END · 끝 ✦</div>
            <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${V.br}`,textAlign:'center'}}>
              <button onClick={()=>{
                const el=document.getElementById('story-content');
                const win=window.open('','_blank');
                win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>The Life Script — SAJU</title><style>
                  body{font-family:'Georgia',serif;max-width:680px;margin:60px auto;padding:0 40px;color:#1a1a1a;line-height:2.2;background:#fff;}
                  h1{font-size:28px;font-weight:400;margin-bottom:8px;color:#1a1a1a;}
                  .sub{font-size:13px;color:#888;letter-spacing:3px;margin-bottom:48px;}
                  p{font-size:17px;margin-bottom:24px;text-align:justify;}
                  .end{text-align:center;margin-top:48px;font-size:12px;letter-spacing:5px;color:#888;}
                  .footer{margin-top:60px;padding-top:20px;border-top:1px solid #eee;font-size:11px;color:#aaa;text-align:center;letter-spacing:2px;}
                </style></head><body>
                <h1>The Life Script</h1>
                <div class="sub">당신의 이야기 · SAJU READING</div>
                ${reading.split('\n').filter(l=>l.trim()).map(p=>`<p>${p}</p>`).join('')}
                <div class="end">✦ THE END · 끝 ✦</div>
                <div class="footer">Generated by SAJU · Your Korean Fate Reading</div>
                </body></html>`);
                win.document.close();
                setTimeout(()=>win.print(),500);
              }} style={{background:V.s,border:`1px solid ${V.br}`,color:V.mu,padding:'11px 28px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3,transition:'all .2s',marginRight:8}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=V.am;e.currentTarget.style.color=V.tx;}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=V.br;e.currentTarget.style.color=V.mu;}}>
                ↓ SAVE AS PDF
              </button>
              <p style={{fontSize:11,color:'#2A4070',marginTop:10,letterSpacing:1}}>Print → Save as PDF · works on iPhone too</p>
            </div>
          </div>
          :<div style={{maxWidth:600,margin:'0 auto'}}>
            {sections&&sections.length>0
              ?sections.map((sec,i)=>(<div key={i} style={{marginBottom:24,paddingBottom:24,borderBottom:i<sections.length-1?`1px solid ${V.br}`:'none'}}><h3 style={{fontSize:12,letterSpacing:5,color:V.am,marginBottom:12}}>{sec.title}</h3><p style={{fontSize:17,lineHeight:2,color:V.tx}}>{sec.body}</p></div>))
              :<p style={{fontSize:17,lineHeight:2,color:V.tx,whiteSpace:'pre-wrap'}}>{reading}</p>}
          </div>
        }

        {/* BUNDLE UPSELL */}
        <div style={{maxWidth:600,margin:'32px auto 0',background:'#081420',border:`2px solid ${V.am}`,padding:'28px'}}>
          <div style={{textAlign:'center',marginBottom:16}}>
            <span style={{background:V.am,color:V.bg,fontSize:11,letterSpacing:3,padding:'5px 16px',fontWeight:700}}>🔥 LIMITED · THIS WINDOW ONLY</span>
          </div>
          <h3 style={{fontSize:24,fontWeight:400,textAlign:'center',marginBottom:8,lineHeight:1.4}}>놀라셨나요?<br/><span style={{color:V.am}}>더 놀랄 준비 하세요.</span></h3>
          <p style={{fontSize:15,color:V.mu,textAlign:'center',marginBottom:6,lineHeight:1.6}}>Surprised? You haven't seen anything yet.</p>
          <p style={{fontSize:14,color:V.mu,textAlign:'center',lineHeight:1.6,marginBottom:20}}>Get your <strong style={{color:V.tx}}>complete personal report</strong> — ~3,000 words across 4 readings. Your elemental nature, love, career, and your BORN FROM story. <strong style={{color:V.am}}>PDF download included.</strong></p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:8}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:13,color:V.mu,letterSpacing:2,marginBottom:4}}>regular price</div>
              <span style={{fontSize:28,color:'#4A6070',textDecoration:'line-through',fontWeight:400}}>$47</span>
            </div>
            <span style={{fontSize:28,color:V.am}}>→</span>
            <div style={{textAlign:'center'}}>
              
              <span style={{fontSize:56,color:V.am,fontWeight:700,lineHeight:1}}>$97</span>
            </div>
          </div>
          <p style={{fontSize:12,color:V.am,textAlign:'center',letterSpacing:3,marginBottom:16}}>✦ 지금 이 창에서만 · THIS PAGE ONLY ✦</p>
          <button onClick={()=>polarCheckout(PRODUCTS.bundle,()=>{})} style={{width:'100%',background:V.am,color:V.bg,border:'none',padding:'16px',fontFamily:FF,fontSize:18,cursor:'pointer',letterSpacing:2,fontWeight:700}}>YES — GET ALL 4 READINGS · $97 ✦</button>
          <p style={{fontSize:12,color:'#2A4060',marginTop:10,textAlign:'center',letterSpacing:1}}>* this price disappears when you leave this page</p>
        </div>

        <div style={{textAlign:'center',marginTop:24,display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setView('saju')} style={{background:'none',border:`1px solid ${V.br}`,color:V.mu,padding:'9px 18px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:3}}>← My Chart</button>
          {TABS.filter(t=>t.id!==tab).map(t=>(<button key={t.id} className="r-more" onClick={()=>generate(t.id)} style={{background:V.s,border:`1px solid ${V.br}`,color:V.mu,padding:'9px 14px',fontFamily:FF,fontSize:13,cursor:'pointer',letterSpacing:2,transition:'all .2s',opacity:readings[t.id]?1:.65}}>{readings[t.id]?t.ko:`${t.ko} +`}</button>))}
        </div>
      </div>
    );
  }
  return <div style={base}/>;
}
