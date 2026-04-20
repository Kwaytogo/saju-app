# SAJU — Korean Fate Reading

## 배포 순서 (A to Z)

### 1단계 — 이 파일들을 GitHub에 올리기

1. GitHub에서 새 repository 만들기 (이름 예: `saju-app`)
2. "uploading an existing file" 클릭
3. 이 폴더 안의 **모든 파일** 드래그 앤 드롭
   - `app/` 폴더 전체
   - `components/` 폴더 전체
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - ⚠️ `.env.local` 은 올리지 말 것 (API 키 노출됨)
4. "Commit changes" 클릭

---

### 2단계 — Vercel에 배포하기

1. [vercel.com](https://vercel.com) 가입 (GitHub 계정으로 로그인)
2. "New Project" → GitHub repository 선택
3. **Environment Variables** 섹션에서:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Anthropic API 키 붙여넣기
4. "Deploy" 클릭
5. 2-3분 후 `your-project.vercel.app` URL 생성 완료 🎉

---

### 3단계 — Anthropic API 키 발급

1. [console.anthropic.com](https://console.anthropic.com) 가입
2. "API Keys" → "Create Key"
3. 키 복사 → Vercel Environment Variables에 붙여넣기

---

### 도메인 연결 (선택사항)

1. [namecheap.com](https://namecheap.com) 에서 도메인 구매 (~$10-15/년)
2. Vercel → Project Settings → Domains → 도메인 추가

---

### 로컬 테스트 방법

```bash
npm install
# .env.local에 실제 API 키 입력 후:
npm run dev
# http://localhost:3000 에서 확인
```
