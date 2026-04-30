// app/api/webhook/route.js
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── 만세력 계산 ───────────────────────────────────────────────────────
const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ELEMENTS = { '甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water' };
const ELEMENT_KO = { Wood:'목(木)',Fire:'화(火)',Earth:'토(土)',Metal:'금(金)',Water:'수(水)' };

function calcSaju(year, month, day) {
  const yS = ((year-4)%10+10)%10;
  const yB = ((year-4)%12+12)%12;
  const ref = new Date(Date.UTC(2000,0,1));
  const cur = new Date(Date.UTC(year,month-1,day));
  const diff = Math.round((cur-ref)/86400000);
  const dayIdx = ((54+diff)%10+10)%10;
  const dayBIdx = ((54+diff)%12+12)%12;
  const mBase = (yS%5)*2;
  const mCount = (month-1);
  const mS = (mBase+mCount)%10;
  const mB = ((month+1)%12);
  return {
    year:  { stem: STEMS[yS],  branch: BRANCHES[yB]  },
    month: { stem: STEMS[mS],  branch: BRANCHES[mB]  },
    day:   { stem: STEMS[dayIdx], branch: BRANCHES[dayBIdx] },
  };
}

// ─── 프롬프트 ────────────────────────────────────────────────────────
const PROMPTS = {
  basic: (saju) => `You are Born From, a master of Korean Four Pillars astrology writing in poetic, precise English.

The person's birth chart:
- Year Pillar: ${saju.year.stem}${saju.year.branch}
- Month Pillar: ${saju.month.stem}${saju.month.branch}  
- Day Pillar (Core Self): ${saju.day.stem}${saju.day.branch}
- Day Master Element: ${ELEMENTS[saju.day.stem]}

Write a BASIC FORTUNE reading with exactly these 4 sections. Each section: 6-7 sentences. Poetic but grounded. No bullet points. Pure prose paragraphs.

WHO YOU ARE
[Their elemental identity, core nature, how they show up in the world]

ELEMENTAL NATURE  
[Deep dive into their day master element — strengths, shadows, how they process the world]

LIFE PATH
[The arc of their life, what they are here to do, their natural gifts]

2026 FORECAST
[What the elemental energies of 2026 bring for them specifically]

End with one final sentence: "This is your cosmic signature — ${saju.day.stem}${saju.day.branch}, born from ${ELEMENTS[saju.day.stem]}."`,

  love: (saju) => `You are Born From, a master of Korean Four Pillars astrology writing in poetic, precise English.

Birth chart — Day Master: ${saju.day.stem}${saju.day.branch} (${ELEMENTS[saju.day.stem]})
Full pillars: Year ${saju.year.stem}${saju.year.branch} · Month ${saju.month.stem}${saju.month.branch} · Day ${saju.day.stem}${saju.day.branch}

Write a LOVE FORTUNE reading with exactly these 4 sections. Each section: 5-6 sentences. Intimate, honest, poetic.

ROMANTIC NATURE
[How they love, what they need, how they show up in relationships]

IDEAL PARTNER
[The elemental profile of their perfect match — what energy completes them]

WHERE LOVE FINDS YOU
[The circumstances, timing, and type of connection that opens their heart]

2026 LOVE FORECAST
[What the energies of 2026 bring to their romantic life]`,

  career: (saju) => `You are Born From, a master of Korean Four Pillars astrology writing in poetic, precise English.

Birth chart — Day Master: ${saju.day.stem}${saju.day.branch} (${ELEMENTS[saju.day.stem]})
Full pillars: Year ${saju.year.stem}${saju.year.branch} · Month ${saju.month.stem}${saju.month.branch} · Day ${saju.day.stem}${saju.day.branch}

Write a CAREER FORTUNE reading with exactly these 4 sections. Each section: 5-6 sentences. Empowering, specific, poetic.

NATURAL GIFTS
[Their innate talents and how their element shapes their working style]

DESTINED PATHS
[The careers and callings that align with their elemental nature]

POWER DECADE
[When their career energy peaks and what that looks like]

2026 CAREER FORECAST
[What 2026 brings professionally — opportunities, challenges, shifts]`,

  story: (saju) => `You are Born From, writing a personal mythological story for someone born as ${saju.day.stem}${saju.day.branch} — the ${ELEMENTS[saju.day.stem]} archetype.

Write a 950-1000 word personal story in 3 parts. No markdown, no headers. Pure flowing prose paragraphs separated by blank lines. The protagonist is "you" (second person). The world is ancient Korea filtered through elemental metaphor.

PART 1 — THE BIRTH (250 words)
You are born into a world made of five forces. Describe the elemental world they entered. Introduce who they are at their core. What is the thing they long for most.

PART 2 — THE TRIAL (350 words)  
The element's greatest shadow becomes the trial. Specific scene. The darkest moment. The choice to continue anyway.

PART 3 — THE ARRIVAL (350 words)
Resolution. A meeting or moment that changes everything. End on the most beautiful sentence you can write — something they will remember forever.

This is their BORN FROM SIGNATURE story. Make it worthy of that name.`
};

// ─── HTML 이메일 템플릿 ──────────────────────────────────────────────
function buildEmail(productId, readingText, saju, birthDate) {
  const elem = ELEMENTS[saju.day.stem];
  const elemColors = { Wood:'#4CAF50', Fire:'#FF7043', Earth:'#C8A020', Metal:'#AAAAAA', Water:'#4090E0' };
  const color = elemColors[elem] || '#E88C12';

  const titles = {
    basic: 'Your Elemental Profile',
    love: 'Your Love Fortune',
    career: 'Your Career Fortune',
    story: 'Your Born From Signature Story',
    bundle: 'Your Complete Born From Reading'
  };

  const paragraphs = readingText.split('\n\n').filter(p => p.trim()).map(p =>
    `<p style="font-size:16px;color:#C8D8E8;line-height:1.85;margin:0 0 18px;font-style:italic">${p.trim()}</p>`
  ).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#060C18;font-family:Georgia,serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px">
    
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;padding-bottom:32px;border-bottom:1px solid #1B2E48">
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:300;letter-spacing:6px;color:#E88C12;margin-bottom:4px">BORN</div>
      <div style="width:40px;height:1px;background:#E88C12;opacity:.4;margin:4px auto"></div>
      <div style="font-family:Georgia,serif;font-size:28px;font-weight:300;letter-spacing:6px;color:#EDE5D3">FROM</div>
      <div style="font-size:11px;letter-spacing:4px;color:#4A6080;margin-top:8px;font-style:italic">cosmic personal analysis</div>
    </div>

    <!-- Element badge -->
    <div style="text-align:center;margin-bottom:32px">
      <div style="font-size:56px;color:${color};line-height:1;margin-bottom:8px">${saju.day.stem}${saju.day.branch}</div>
      <div style="font-size:12px;letter-spacing:5px;color:${color};margin-bottom:4px">${elem.toUpperCase()} · ${ELEMENT_KO[elem]}</div>
      <div style="font-size:13px;color:#8A9BAB;font-style:italic">Born: ${birthDate}</div>
    </div>

    <!-- Title -->
    <div style="text-align:center;margin-bottom:32px;padding:20px;background:#0A1628;border:1px solid #1B2E48">
      <div style="font-size:10px;letter-spacing:5px;color:#E88C12;margin-bottom:8px">YOUR READING</div>
      <div style="font-size:22px;color:#EDE5D3;font-weight:300">${titles[productId] || 'Your Born From Reading'}</div>
    </div>

    <!-- Reading content -->
    <div style="padding:8px 0">
      ${paragraphs}
    </div>

    <!-- Footer -->
    <div style="margin-top:48px;padding-top:32px;border-top:1px solid #1B2E48;text-align:center">
      <div style="font-size:11px;letter-spacing:4px;color:#2A4060;margin-bottom:8px">BORNFROM.CO</div>
      <div style="font-size:13px;color:#4A6080;font-style:italic">Save this email — your reading lives here.</div>
      <div style="font-size:11px;color:#2A4060;margin-top:16px">
        You can print this email as PDF: File → Print → Save as PDF
      </div>
    </div>

  </div>
</body>
</html>`;
}

// ─── 메인 웹훅 핸들러 ───────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const email = params.get('email');
    const productPermalink = params.get('product_permalink') || '';
    const customFields = params.get('custom_fields') || '{}';

    // custom field에서 생년월일 파싱
    let birthDate = '';
    try {
      const fields = JSON.parse(customFields);
      birthDate = fields['Birth Date'] || fields['birth_date'] || fields['Birthday'] || '';
    } catch {
      // URL encoded custom fields
      const fieldMatch = body.match(/Birth\+Date=([^&]+)/);
      if (fieldMatch) birthDate = decodeURIComponent(fieldMatch[1]).replace(/\+/g,' ');
    }

    if (!email || !birthDate) {
      return NextResponse.json({ error: 'Missing email or birth date' }, { status: 400 });
    }

    // 날짜 파싱
    const [year, month, day] = birthDate.split(/[-\/]/).map(Number);
    if (!year || !month || !day) {
      return NextResponse.json({ error: 'Invalid birth date format' }, { status: 400 });
    }

    const saju = calcSaju(year, month, day);

    // 상품 ID 매핑
    const PRODUCT_MAP = {
      'drqcvf': 'basic',
      'yqbcw': 'love',
      'lfvmx': 'career',
      'nuxbbx': 'story',
      'vhtko': 'bundle',
    };

    // permalink로 productId 찾기
    let productId = 'basic';
    for (const [key, val] of Object.entries(PRODUCT_MAP)) {
      if (productPermalink.includes(key) || body.includes(key)) {
        productId = val;
        break;
      }
    }

    // 번들이면 4개 리딩 모두 생성
    let readingText = '';
    if (productId === 'bundle') {
      const [basic, love, career, story] = await Promise.all([
        generateReading('basic', saju),
        generateReading('love', saju),
        generateReading('career', saju),
        generateReading('story', saju),
      ]);
      readingText = `═══ ELEMENTAL PROFILE ═══\n\n${basic}\n\n═══ LOVE FORTUNE ═══\n\n${love}\n\n═══ CAREER FORTUNE ═══\n\n${career}\n\n═══ YOUR BORN FROM STORY ═══\n\n${story}`;
    } else {
      readingText = await generateReading(productId, saju);
    }

    // 이메일 발송
    const emailHtml = buildEmail(productId, readingText, saju, birthDate);

    const titles = {
      basic: 'Your Elemental Profile',
      love: 'Your Love Fortune',
      career: 'Your Career Fortune',
      story: 'Your Born From Signature Story',
      bundle: 'Your Complete Born From Reading'
    };

    await resend.emails.send({
      from: 'Born From <hello@bornfrom.co>',
      to: email,
      subject: `✦ ${titles[productId] || 'Your Reading'} — Born From`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function generateReading(productId, saju) {
  const prompt = PROMPTS[productId] || PROMPTS.basic;
  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: productId === 'story' ? 4000 : 2500,
    messages: [{ role: 'user', content: prompt(saju) }],
  });
  return message.content[0].text;
}

// GET for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Born From webhook active' });
}

