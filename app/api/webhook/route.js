// app/api/webhook/route.js
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ELEMENTS = {'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const ELEM_SYM = {Wood:'木',Fire:'火',Earth:'土',Metal:'金',Water:'水'};
const ELEM_COLOR = {Wood:'#4CAF50',Fire:'#E84012',Earth:'#C8A020',Metal:'#AAAAAA',Water:'#B38B8B'};
const ELEM_KO = {Wood:'목(木)',Fire:'화(火)',Earth:'토(土)',Metal:'금(金)',Water:'수(水)'};

function calcSaju(year, month, day) {
  const yS = ((year-4)%10+10)%10;
  const yB = ((year-4)%12+12)%12;
  const ref = new Date(Date.UTC(2000,0,1));
  const cur = new Date(Date.UTC(year,month-1,day));
  const diff = Math.round((cur-ref)/86400000);
  const dS = ((54+diff)%10+10)%10;
  const dB = ((54+diff)%12+12)%12;
  const mBase = (yS%5)*2;
  const mS = (mBase+(month-1))%10;
  const mB = ((month+1)%12);
  return {
    year:{stem:STEMS[yS],branch:BRANCHES[yB]},
    month:{stem:STEMS[mS],branch:BRANCHES[mB]},
    day:{stem:STEMS[dS],branch:BRANCHES[dB]},
  };
}

const PROMPTS = {
  basic: (s, gender='female') => `You are Born From, a master of Korean Four Pillars astrology. Write in poetic, precise English.

This person: ${gender === 'male' ? 'Male' : 'Female'}
Complete birth chart:
- Year Pillar ${s.year.stem}${s.year.branch}: The world they were born into, their public face, ancestral energy
- Month Pillar ${s.month.stem}${s.month.branch}: Their drive, work ethic, how they pursue goals, emotional patterns
- Day Pillar ${s.day.stem}${s.day.branch}: Their true self, core identity, how they love, the most personal pillar
- Day Master Element: ${ELEMENTS[s.day.stem]} (their dominant energy)

Analyze the INTERPLAY between all three pillars, tensions, harmonies, contradictions. This person is not just their day master. Write THE CORE ENERGY AUDIT with 4 sections, 6-7 sentences each. Pure flowing prose.

WHO YOU ARE
[The full picture from all three pillars, who they are publicly vs privately, what tension they carry between their year pillar inheritance and their day master identity]

ELEMENTAL NATURE
[Their day master ${ELEMENTS[s.day.stem]} in depth, but show how their month pillar ${ELEMENTS[s.month.stem]} modifies and complicates it. The interesting friction between the two.]

LIFE PATH
[Weave all three pillars into a destiny narrative. Year as origin, month as engine, day as destination. What pattern runs through the whole chart?]

2026 FORECAST
[2026 is 丙午 Fire Horse, how does this specific three-pillar chart interact with this year's energy? Be precise and personal.]

End with: "This is your cosmic signature, ${s.day.stem}${s.day.branch}, born from ${ELEMENTS[s.day.stem]}."`,

  love: (s, gender='female') => `You are a Korean SAJU love reader. Write a deeply personal love reading in English using "you". Specific, honest, illuminating. Every section should make the reader feel finally understood.

Birth chart:
- Year: ${s.year.stem}${s.year.branch} (${s.year.se}/${s.year.be})
- Month: ${s.month.stem}${s.month.branch} (${s.month.se}/${s.month.be})
- Day Master: ${s.day.stem}${s.day.branch} (${s.day.se})

6 sections with ### headers:

### WHY YOUR LOVE LIFE HAS BEEN SO HARD
5-6 sentences. Name the exact elemental pattern causing repeated pain. Be specific — not generic. This should feel like someone who finally sees the truth about them.

### THE PATTERN YOU KEEP RUNNING
4-5 sentences. The specific situationship or loop this person returns to. Why they attract who they attract. What their chart is broadcasting without them knowing.

### WHAT YOU NEED TO DO RIGHT NOW
5-6 sentences. Concrete, elemental guidance. Not generic advice. Specific to this chart. The inner shift that changes everything.

### THE PERSON YOU SHOULD BE WITH
6-7 sentences. Their ideal partner in vivid detail. How they move, how they communicate, how they make this person feel. Make the reader feel they already know this person.

### WHO IS COMING TO YOU
5-6 sentences. The specific energy arriving in love. When. What circumstances. What this connection will feel like. End with something beautiful.

### YOUR 2026 LOVE FORECAST
5-6 sentences. Fire Horse year meets this chart. Specific timing, specific energy. What to watch for. What to finally let go.

Prose only. No bullets. Every line should make them want to share this reading.\`
  career: (s, gender='female') => `You are Born From, writing THE SUCCESS COMPASS. English, empowering, visionary, precise.

This person: ${gender === 'male' ? 'Male' : 'Female'}
Complete birth chart:
- Year Pillar ${s.year.stem}${s.year.branch} (${ELEMENTS[s.year.stem]}): Their inherited work ethic, the career expectations they were born into
- Month Pillar ${s.month.stem}${s.month.branch} (${ELEMENTS[s.month.stem]}): Their ambition engine, how they perform and produce, their professional rhythm
- Day Pillar ${s.day.stem}${s.day.branch} (${ELEMENTS[s.day.stem]}): Their authentic work self, what they build when no one is watching

Find the friction and harmony across these three pillars. The month pillar is especially important for career, it governs professional drive and output.

Write 5 sections, 6-7 sentences each. Empowering, specific, forward-looking.

NATURAL GIFTS
[What talent emerges from the combination of their month pillar's engine and day master's depth, not just what they're good at, but what they do that nobody else does]

DESTINED PATHS
[Based on all three pillars together, specific industries, roles, environments. Not a list. A vivid portrait of where they thrive]

THE SHADOW AT WORK
[The month pillar reveals the professional pattern that holds them back. Name it exactly. The shadow of ${ELEMENTS[s.month.stem]} in professional settings]

POWER DECADE
[When does this specific chart peak? Which years and what to build toward. Be bold and specific]

2026 CAREER FORECAST
[Fire Horse 丙午 meets this chart. What professional opportunity or shift arrives? What must they act on now? End with one powerful sentence]`,

  story: (s, gender='female') => `You are Born From, writing THE LIFE SCRIPT, a personal mythological story.

Born as ${s.day.stem}${s.day.branch}, the ${ELEMENTS[s.day.stem]} archetype.
Their year pillar ${s.year.stem}${s.year.branch} is the world they came from.
Their month pillar ${s.month.stem}${s.month.branch} is the force that drives them.

Write a 950-1000 word personal story in 3 parts. No markdown, no headers. Pure flowing prose paragraphs separated by blank lines. Second person "you". Ancient Korea filtered through elemental metaphor. Use all three pillars to make this completely specific, not a generic element story.

PART 1, THE BIRTH (250 words)
The year pillar ${ELEMENTS[s.year.stem]} shaped the world you entered. Describe that world and what it asked of you before you were ready. Introduce who you are at your core, the ${ELEMENTS[s.day.stem]} that runs underneath everything.

PART 2, THE TRIAL (350 words)
The month pillar ${ELEMENTS[s.month.stem]} is your engine, and your adversary. The moment it overrides your true self becomes the central trial. A specific scene. The darkest moment. The choice.

PART 3, THE ARRIVAL (350 words)
Resolution between all three pillars. The moment you became all three at once. A meeting or encounter that changes everything. End on the most beautiful sentence you have ever written.`,
};

const TITLES = {
  basic: 'The Core Energy Audit',
  love: 'The Relationship Decoder',
  career: 'The Success Compass',
  story: 'The Life Script: Your Origin',
  bundle: 'Complete Bundle: Full Access',
};

const PRODUCT_MAP = {
  'hjazzy': 'combo',
  'drqcvf': 'basic',
  'yqbcw': 'love',
  'lfvmx': 'career',
  'nuxbbx': 'story',
  'vhtko': 'bundle',
};

function buildPDFHTML(productId, readings, saju, birthDate) {
  const elem = ELEMENTS[saju.day.stem];
  const color = ELEM_COLOR[elem] || '#E88C12';
  const sym = elem.substring(0,1).toUpperCase();

  const readingSections = readings.map(({type, text}) => {
    const sectionTitle = TITLES[type] || TITLES.basic;
    const paragraphs = text.split('\n\n').filter(p=>p.trim()).map(p => {
      const trimmed = p.trim();
      if (trimmed === trimmed.toUpperCase() && trimmed.length < 40 && !trimmed.includes('.')) {
        return `<div style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:6px;color:${color};margin:36px 0 16px;opacity:.9">${trimmed}</div>`;
      }
      return `<p style="font-size:17px;color:#444444;line-height:1.9;margin-bottom:20px;font-style:italic">${trimmed}</p>`;
    }).join('');

    return `
    <div style="padding:80px 80px 60px;min-height:100vh;background:#F9F7F2;position:relative;page-break-after:always">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,transparent,${color},transparent)"></div>
      <div style="font-size:10px;letter-spacing:5px;color:#B38B8B;opacity:.6;margin-bottom:16px">BORN FROM · COSMIC PERSONAL ANALYSIS</div>
      <h2 style="font-family:'Cinzel',serif;font-size:38px;font-weight:300;color:#1A1A1A;margin-bottom:20px;line-height:1.2">${sectionTitle}</h2>
      <div style="width:60px;height:1px;background:${color};opacity:.4;margin-bottom:40px"></div>
      <div style="max-width:680px">${paragraphs}</div>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#F9F7F2; color:#1A1A1A; font-family:'Cormorant Garamond',Georgia,serif; }
</style>
</head>
<body>

<!-- COVER -->
<div style="width:100%;min-height:100vh;background:#F9F7F2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px;position:relative;page-break-after:always">
  <div style="position:absolute;inset:30px;border:1px solid ${color}33;pointer-events:none"></div>
  <div style="position:absolute;inset:42px;border:1px solid ${color}18;pointer-events:none"></div>
  <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:8px;color:#B38B8B;opacity:.7;margin-bottom:60px">BORN FROM</div>
  <div style="font-size:110px;color:${color};line-height:1;margin-bottom:16px;text-shadow:0 0 80px ${color}44">${sym}</div>
  <div style="font-size:11px;letter-spacing:7px;color:${color};margin-bottom:48px">${elem.toUpperCase()} · ${ELEM_KO[elem]}</div>
  <div style="width:80px;height:1px;background:#E88C12;opacity:.4;margin:0 auto 48px"></div>
  <div style="font-size:10px;letter-spacing:6px;color:#4A6080;margin-bottom:16px">YOUR PERSONAL ANALYSIS</div>
  <div style="font-family:'Cinzel',serif;font-size:42px;font-weight:300;color:#1A1A1A;line-height:1.2;margin-bottom:40px">${TITLES[productId]}</div>
  <div style="font-size:14px;color:#666666;font-style:italic;margin-bottom:8px">Born: ${birthDate}</div>
  <div style="font-size:20px;color:${color};letter-spacing:4px;margin-bottom:60px">${saju.year.stem}${saju.year.branch} · ${saju.month.stem}${saju.month.branch} · ${saju.day.stem}${saju.day.branch}</div>
  <div style="position:absolute;bottom:48px;left:0;right:0;text-align:center;font-size:10px;letter-spacing:5px;color:#999999">BORNFROM.CO · @bornfrom.official · © 2026 Born From. All rights reserved. · For personal use only.</div>
</div>

${readingSections}

<!-- FINAL -->
<div style="min-height:50vh;background:#F9F7F2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px">
  <div style="font-size:60px;color:${color};margin-bottom:24px">${sym}</div>
  <div style="font-size:18px;color:#666666;font-style:italic;line-height:1.8;max-width:500px;margin-bottom:32px">You were born from ${elem}.<br/>This is your cosmic signature.<br/>Carry it well.</div>
          <div style="font-size:10px;color:#999999;letter-spacing:3px;margin-top:20px">© 2026 Born From · All rights reserved · For personal use only<br/>bornfrom.co · @bornfrom.official</div>
  <div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:5px;color:#999999">BORNFROM.CO · @bornfrom.official · © 2026 Born From. All rights reserved. · For personal use only.</div>
</div>

</body>
</html>`;
}

function buildReadingEmail(readings, saju, birthDate, productId) {
  const elem = ELEMENTS[saju.day.stem];
  const color = ELEM_COLOR[elem] || '#E88C12';
  const sym = ELEM_SYM[elem] || '命';
  const title = TITLES[productId] || TITLES.basic;

  const readingSections = readings.map(({type, text}) => {
    const sectionTitle = TITLES[type] || title;
    const paragraphs = text.split(/\n\n/).filter(p => p.trim()).map(p => {
      const trimmed = p.trim();
      if (trimmed === trimmed.toUpperCase() && trimmed.length < 40 && !trimmed.includes('.')) {
        return `<div style="font-family:Georgia,serif;font-size:11px;letter-spacing:6px;color:${color};margin:36px 0 14px;opacity:.9">${trimmed}</div>`;
      }
      return `<p style="font-size:17px;color:#444444;line-height:1.95;margin-bottom:20px;font-style:italic;font-family:Georgia,serif">${trimmed}</p>`;
    }).join('');

    return `
    <div style="padding:48px 48px 36px;background:#F9F7F2;margin-bottom:2px">
      <div style="position:relative;padding-top:3px;margin-bottom:0">
        <div style="height:3px;background:linear-gradient(to right,transparent,${color},transparent);margin-bottom:24px"></div>
      </div>
      <div style="font-size:10px;letter-spacing:5px;color:#B38B8B;opacity:.6;margin-bottom:14px">BORN FROM · COSMIC PERSONAL ANALYSIS</div>
      <h2 style="font-family:Georgia,serif;font-size:32px;font-weight:400;color:#1A1A1A;margin:0 0 10px;line-height:1.2">${sectionTitle}</h2>
      <p style="font-size:12px;color:${color};letter-spacing:4px;margin:0 0 28px">${saju.day.stem}${saju.day.branch} · ${elem} Element</p>
      <div style="width:48px;height:1px;background:${color};opacity:.4;margin-bottom:36px"></div>
      <div style="max-width:620px">${paragraphs}</div>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#F9F7F2;font-family:Georgia,serif">
<div style="max-width:680px;margin:0 auto">

  <!-- COVER SECTION -->
  <div style="background:#F9F7F2;padding:60px 48px;text-align:center;border-bottom:1px solid #E0DCD0;position:relative">
    <div style="height:3px;background:linear-gradient(to right,transparent,${color},transparent);margin-bottom:40px"></div>
    <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:8px;color:#B38B8B;opacity:.7;margin-bottom:40px">BORN FROM</div>
    <div style="font-size:100px;color:${color};line-height:1;margin-bottom:16px;text-shadow:0 0 60px ${color}44">${sym}</div>
    <div style="font-size:11px;letter-spacing:6px;color:${color};margin-bottom:40px">${elem.toUpperCase()} · ${ELEM_KO[elem]}</div>
    <div style="width:60px;height:1px;background:#E88C12;opacity:.3;margin:0 auto 36px"></div>
    <div style="font-size:10px;letter-spacing:6px;color:#4A6080;margin-bottom:16px">YOUR PERSONAL ANALYSIS</div>
    <h1 style="font-family:Georgia,serif;font-size:34px;font-weight:400;color:#1A1A1A;line-height:1.2;margin:0 0 32px">${title}</h1>
    <div style="font-size:14px;color:#666666;font-style:italic;margin-bottom:8px">Born: ${birthDate}</div>
    <div style="font-size:18px;color:${color};letter-spacing:4px">${saju.year.stem}${saju.year.branch} · ${saju.month.stem}${saju.month.branch} · ${saju.day.stem}${saju.day.branch}</div>
    <div style="height:3px;background:linear-gradient(to right,transparent,${color},transparent);margin-top:40px"></div>
  </div>

  <!-- READING SECTIONS -->
  ${readingSections}

  <!-- FINAL SECTION -->
  <div style="background:#F9F7F2;padding:60px 48px;text-align:center;border-top:1px solid #E0DCD0">
    <div style="font-size:60px;color:${color};margin-bottom:24px;opacity:.8">${sym}</div>
    <div style="font-size:18px;color:#666666;font-style:italic;line-height:1.9;max-width:400px;margin:0 auto 24px">You were born from ${elem}.<br/>This is your cosmic signature.<br/>Carry it well.</div>
    <div style="width:40px;height:1px;background:#E88C12;opacity:.3;margin:0 auto 24px"></div>
    <div style="font-size:9px;letter-spacing:5px;color:#999999;margin-bottom:6px">BORNFROM.CO · @bornfrom.official</div>
    <div style="font-size:8px;letter-spacing:2px;color:#CCCCCC">© 2026 Born From · All rights reserved · For personal use only</div>
  </div>

</div>
</body>
</html>`;
}


async function generateReading(productId, saju, gender='female') {
  const prompt = PROMPTS[productId] || PROMPTS.basic;
  const promptText = prompt(saju, gender);
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: productId === 'story' ? 4000 : productId === 'basic' ? 2500 : 3200,
    messages: [{ role: 'user', content: promptText }],
  });
  return msg.content[0].text;
}

export async function POST(req) {
  try {
    const body = await req.text();

    const email = new URLSearchParams(body).get('email');
    const productPermalink = new URLSearchParams(body).get('product_permalink') || '';

    let birthDate = '';
    // Gumroad sends custom fields URL-encoded
    // "Birth Date (YYYY-MM-DD)" becomes "Birth+Date+%28YYYY-MM-DD%29" or similar
    console.log('Gumroad ping body:', body.substring(0, 500));
    const decodedBody = decodeURIComponent(body.replace(/\+/g, ' '));
    console.log('Decoded body:', decodedBody.substring(0, 500));
    
    // Try multiple patterns to find birth date
    const bdPatterns = [
      /Birth Date \(YYYY-MM-DD\)[=:]([^&\n]+)/i,
      /birth_date[=:]([^&\n]+)/i,
      /Birthday[=:]([^&\n]+)/i,
      /birth.date[=:]([^&\n]+)/i,
    ];
    for (const pat of bdPatterns) {
      const m = decodedBody.match(pat) || body.match(pat);
      if (m) { birthDate = m[1].trim().replace(/[^0-9-]/g, ''); break; }
    }

    const gender = 'female'; // gender removed from checkout

    if (!email || !birthDate) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    const [year, month, day] = birthDate.split(/[-\/]/).map(Number);
    if (!year || !month || !day) return NextResponse.json({ error: 'Invalid date' }, { status: 400 });

    const saju = calcSaju(year, month, day);

    let productId = 'basic';
    for (const [key, val] of Object.entries(PRODUCT_MAP)) {
      if (productPermalink.includes(key) || body.includes(key)) { productId = val; break; }
    }

    let readings = [];
    if (productId === 'combo') {
      const [basic, love, career] = await Promise.all([
        generateReading('basic', saju, gender),
        generateReading('love', saju, gender),
        generateReading('career', saju, gender),
      ]);
      readings = [{type:'basic',text:basic},{type:'love',text:love},{type:'career',text:career}];
    } else if (productId === 'bundle') {
      const [basic, love, career, story] = await Promise.all([
        generateReading('basic', saju),
        generateReading('love', saju),
        generateReading('career', saju),
        generateReading('story', saju),
      ]);
      readings = [{type:'basic',text:basic},{type:'love',text:love},{type:'career',text:career},{type:'story',text:story}];
    } else {
      readings = [{type: productId, text: await generateReading(productId, saju)}];
    }

    const pdfHTML = buildPDFHTML(productId, readings, saju, birthDate);
    // Email HTML built from readings

    const emailHTML = buildReadingEmail(readings, saju, birthDate, productId);

    await resend.emails.send({
      from: 'Born From <hello@bornfrom.co>',
      replyTo: 'hello@bornfrom.co',
      to: email,
      subject: `${TITLES[productId]}, Born From`,
      html: emailHTML,
    });
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const testBirth = searchParams.get('birth');
  const testEmail = searchParams.get('email');
  const testProduct = searchParams.get('product') || 'love';
  const testGender = searchParams.get('gender') || 'female';
  
  if (!testBirth || !testEmail) {
    return NextResponse.json({ 
      status: 'Born From webhook active',
      test_usage: '?birth=1990-05-15&email=your@email.com&product=love&gender=female'
    });
  }
  
  try {
    const [year, month, day] = testBirth.split('-').map(Number);
    const saju = calcSaju(year, month, day);
    const text = await generateReading(testProduct, saju, testGender);
    const readings = [{ type: testProduct, text }];
    const emailHTML = buildReadingEmail(readings, saju, testBirth, testProduct);
    
    await resend.emails.send({
      from: 'Born From <hello@bornfrom.co>',
      replyTo: 'hello@bornfrom.co',
      to: testEmail,
      subject: `[TEST] ${TITLES[testProduct]}, Born From`,
      html: emailHTML,
    });
    
    return NextResponse.json({ success: true, message: `Test email sent to ${testEmail}`, element: ELEMENTS[saju.day.stem] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
