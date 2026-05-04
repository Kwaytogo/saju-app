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
const ELEM_COLOR = {Wood:'#4CAF50',Fire:'#E84012',Earth:'#C8A020',Metal:'#AAAAAA',Water:'#4090E0'};
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
  basic: (s) => `You are Born From, a master of Korean Four Pillars astrology writing in poetic, precise English.
Birth chart — Year: ${s.year.stem}${s.year.branch} · Month: ${s.month.stem}${s.month.branch} · Day: ${s.day.stem}${s.day.branch} · Element: ${ELEMENTS[s.day.stem]}
Write a CORE ENERGY AUDIT with exactly 4 sections. Each: 6-7 sentences. Pure prose, no bullets.
WHO YOU ARE
ELEMENTAL NATURE
LIFE PATH
2026 FORECAST
End: "This is your cosmic signature — ${s.day.stem}${s.day.branch}, born from ${ELEMENTS[s.day.stem]}."`,

  love: (s) => `You are Born From. Day Master: ${s.day.stem}${s.day.branch} (${ELEMENTS[s.day.stem]})
Full: Year ${s.year.stem}${s.year.branch} · Month ${s.month.stem}${s.month.branch} · Day ${s.day.stem}${s.day.branch}
Write THE RELATIONSHIP DECODER with 4 sections. Each: 5-6 sentences. Intimate, honest, poetic.
ROMANTIC NATURE
IDEAL PARTNER
WHERE LOVE FINDS YOU
2026 LOVE FORECAST`,

  career: (s) => `You are Born From. Day Master: ${s.day.stem}${s.day.branch} (${ELEMENTS[s.day.stem]})
Full: Year ${s.year.stem}${s.year.branch} · Month ${s.month.stem}${s.month.branch} · Day ${s.day.stem}${s.day.branch}
Write THE SUCCESS COMPASS with 4 sections. Each: 5-6 sentences. Empowering, specific.
NATURAL GIFTS
DESTINED PATHS
POWER DECADE
2026 CAREER FORECAST`,

  story: (s) => `You are Born From, writing THE LIFE SCRIPT for someone born as ${s.day.stem}${s.day.branch} — the ${ELEMENTS[s.day.stem]} archetype.
Write a 950-1000 word story in 3 parts. No markdown, no headers. Pure prose paragraphs separated by blank lines. Second person "you". Ancient Korea filtered through elemental metaphor.
PART 1 — THE BIRTH (250 words): The elemental world they entered. Who they are at their core. What they long for most.
PART 2 — THE TRIAL (350 words): The element shadow becomes the trial. Specific scene. The darkest moment. The choice to continue.
PART 3 — THE ARRIVAL (350 words): Resolution. A moment that changes everything. End on the most beautiful sentence you can write.`,
};

const TITLES = {
  basic: 'The Core Energy Audit',
  love: 'The Relationship Decoder',
  career: 'The Success Compass',
  story: 'The Life Script: Your Origin',
  bundle: 'Complete Bundle: Full Access',
};

const PRODUCT_MAP = {
  'drqcvf': 'basic',
  'yqbcw': 'love',
  'lfvmx': 'career',
  'nuxbbx': 'story',
  'vhtko': 'bundle',
};

function buildPDFHTML(productId, readings, saju, birthDate) {
  const elem = ELEMENTS[saju.day.stem];
  const color = ELEM_COLOR[elem] || '#E88C12';
  const sym = ELEM_SYM[elem] || '命';

  const readingSections = readings.map(({type, text}) => {
    const sectionTitle = TITLES[type] || TITLES.basic;
    const paragraphs = text.split('\n\n').filter(p=>p.trim()).map(p => {
      const trimmed = p.trim();
      if (trimmed === trimmed.toUpperCase() && trimmed.length < 40 && !trimmed.includes('.')) {
        return `<div style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:6px;color:${color};margin:36px 0 16px;opacity:.9">${trimmed}</div>`;
      }
      return `<p style="font-size:17px;color:#C8D8E8;line-height:1.9;margin-bottom:20px;font-style:italic">${trimmed}</p>`;
    }).join('');

    return `
    <div style="padding:80px 80px 60px;min-height:100vh;background:#060C18;position:relative;page-break-after:always">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,transparent,${color},transparent)"></div>
      <div style="font-size:10px;letter-spacing:5px;color:#E88C12;opacity:.6;margin-bottom:16px">BORN FROM · COSMIC PERSONAL ANALYSIS</div>
      <h2 style="font-family:'Cinzel',serif;font-size:38px;font-weight:300;color:#EDE5D3;margin-bottom:20px;line-height:1.2">${sectionTitle}</h2>
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
body { background:#060C18; color:#EDE5D3; font-family:'Cormorant Garamond',Georgia,serif; }
</style>
</head>
<body>

<!-- COVER -->
<div style="width:100%;min-height:100vh;background:#060C18;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px;position:relative;page-break-after:always">
  <div style="position:absolute;inset:30px;border:1px solid ${color}33;pointer-events:none"></div>
  <div style="position:absolute;inset:42px;border:1px solid ${color}18;pointer-events:none"></div>
  <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:8px;color:#E88C12;opacity:.7;margin-bottom:60px">BORN FROM</div>
  <div style="font-size:110px;color:${color};line-height:1;margin-bottom:16px;text-shadow:0 0 80px ${color}44">${sym}</div>
  <div style="font-size:11px;letter-spacing:7px;color:${color};margin-bottom:48px">${elem.toUpperCase()} · ${ELEM_KO[elem]}</div>
  <div style="width:80px;height:1px;background:#E88C12;opacity:.4;margin:0 auto 48px"></div>
  <div style="font-size:10px;letter-spacing:6px;color:#4A6080;margin-bottom:16px">YOUR PERSONAL ANALYSIS</div>
  <div style="font-family:'Cinzel',serif;font-size:42px;font-weight:300;color:#EDE5D3;line-height:1.2;margin-bottom:40px">${TITLES[productId]}</div>
  <div style="font-size:14px;color:#8A9BAB;font-style:italic;margin-bottom:8px">Born: ${birthDate}</div>
  <div style="font-size:20px;color:${color};letter-spacing:4px;margin-bottom:60px">${saju.year.stem}${saju.year.branch} · ${saju.month.stem}${saju.month.branch} · ${saju.day.stem}${saju.day.branch}</div>
  <div style="position:absolute;bottom:48px;left:0;right:0;text-align:center;font-size:10px;letter-spacing:5px;color:#2A4060">BORNFROM.CO · @bornfrom.official · © 2026 Born From. All rights reserved. · For personal use only.</div>
</div>

${readingSections}

<!-- FINAL -->
<div style="min-height:50vh;background:#060C18;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px">
  <div style="font-size:60px;color:${color};margin-bottom:24px">${sym}</div>
  <div style="font-size:18px;color:#8A9BAB;font-style:italic;line-height:1.8;max-width:500px;margin-bottom:32px">You were born from ${elem}.<br/>This is your cosmic signature.<br/>Carry it well.</div>
          <div style="font-size:10px;color:#2A4060;letter-spacing:3px;margin-top:20px">© 2026 Born From · All rights reserved · For personal use only<br/>bornfrom.co · @bornfrom.official</div>
  <div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:5px;color:#2A4060">BORNFROM.CO · @bornfrom.official · © 2026 Born From. All rights reserved. · For personal use only.</div>
</div>

</body>
</html>`;
}

async function generatePDF(html) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  return pdf;
}

async function generateReading(productId, saju) {
  const prompt = PROMPTS[productId] || PROMPTS.basic;
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: productId === 'story' ? 4000 : 2500,
    messages: [{ role: 'user', content: prompt(saju) }],
  });
  return msg.content[0].text;
}

export async function POST(req) {
  try {
    const body = await req.text();

    const email = new URLSearchParams(body).get('email');
    const productPermalink = new URLSearchParams(body).get('product_permalink') || '';

    let birthDate = '';
    const bdMatch = body.match(/Birth[_+]?Date[^=]*=([^&]+)/i) || body.match(/birthday=([^&]+)/i);
    if (bdMatch) birthDate = decodeURIComponent(bdMatch[1]).replace(/\+/g,' ').trim();

    if (!email || !birthDate) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    const [year, month, day] = birthDate.split(/[-\/]/).map(Number);
    if (!year || !month || !day) return NextResponse.json({ error: 'Invalid date' }, { status: 400 });

    const saju = calcSaju(year, month, day);

    let productId = 'basic';
    for (const [key, val] of Object.entries(PRODUCT_MAP)) {
      if (productPermalink.includes(key) || body.includes(key)) { productId = val; break; }
    }

    let readings = [];
    if (productId === 'bundle') {
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
    const pdfBuffer = await generatePDF(pdfHTML);

    await resend.emails.send({
      from: 'Born From <hello@bornfrom.co>',
      to: email,
      subject: `✦ ${TITLES[productId]} — Born From`,
      html: `<div style="background:#060C18;color:#EDE5D3;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:22px;letter-spacing:6px;color:#E88C12">BORN FROM</div>
        </div>
        <p style="font-size:17px;color:#C8D8E8;line-height:1.8;margin-bottom:20px">Your reading is attached as a beautifully designed PDF.</p>
        <p style="font-size:15px;color:#8A9BAB;line-height:1.8;margin-bottom:24px">Open <strong style="color:#EDE5D3">${TITLES[productId]}</strong> in the attachment. Save it — it's yours forever.</p>
        <p style="font-size:13px;color:#4A6080">On mobile: tap the attachment → share → save to Files.</p>
        <div style="margin-top:40px;text-align:center;font-size:10px;letter-spacing:4px;color:#2A4060">BORNFROM.CO · @bornfrom.official · © 2026 Born From. All rights reserved. · For personal use only.</div>
      </div>`,
      attachments: [{
        filename: `BornFrom_${TITLES[productId].replace(/[^a-z0-9]/gi,'_')}.pdf`,
        content: Buffer.from(pdfBuffer).toString('base64'),
        content_type: 'application/pdf',
      }],
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Born From webhook active' });
}
