# Codex Context - CheongyakEasy

이 문서는 Codex가 새 세션에서 현재 프로젝트 맥락을 빠르게 복원하기 위한 핸드오프 문서다. 채팅 기록 자체는 Codex/GitHub에 자동 동기화되지 않으므로, 중요한 결정사항과 현재 상태를 이 파일에 요약한다.

## 현재 연결 상태

- GitHub repository: `cheongyakeasy-pixel/Easy89`
- Default branch: `main`
- Production URL: `https://cheongyakeasy.vercel.app`
- Vercel project: `cheongyakeasy`
- GitHub SSH 인증은 `~/.ssh/github_cheongyakeasy` 키로 설정되어 있다.
- 로컬 `main`은 `origin/main`을 추적한다.

## 제품 방향

청약이지는 주택청약 공고, 청약 일정, 자격 확인 포인트, 준비 서류, 대출 준비 정보, 부동산뉴스를 제공하는 모바일 우선 반응형 웹앱이다.

중요한 원칙:

- 공식 정보를 대신 판단하지 않는다.
- 개인별 자격 판정, 청약 신청 대행, 금융 상품 추천은 하지 않는다.
- 사용자가 확인해야 할 핵심 정보를 정리해 보여준다.
- 발급 키 원문은 저장소와 문서에 남기지 않는다. 환경변수 이름만 기록한다.

## 기술 스택

- Vite
- React
- TypeScript
- React Router
- CSS variables + 일반 CSS
- Vitest
- lucide-react
- Vercel Serverless Function
- Supabase JS/SSR packages
- Kakao JavaScript SDK

## 주요 구현 상태

구현된 라우트:

- `/`: 홈
- `/subscriptions`: 청약리스트
- `/subscription-detail/:id`: 공고 상세
- `/calendar`: 청약 일정 캘린더
- `/news`: 부동산뉴스
- `/guide`: 청약 가이드
- `/loan`: 대출/자금 준비 정보

주요 기능:

- 청약리스트 상단 캘린더
- 날짜 재클릭 시 날짜 선택 초기화
- 검색 아이콘 클릭 시 검색 필드 열림
- 검색 필드는 청약리스트 제목 오른쪽에 위치
- 필터: 지역, 모집유형, 전용면적, 분양유형, 분양가, 규제조건
- 필터 드롭다운은 한 번에 하나만 열림
- 칩 필터: 전체, 접수중, 접수예정, 접수마감, 발표완료
- 칩 필터는 `전체 (n)` 형식으로 현재 조건 기준 수량 표시
- 데스크톱에서는 카드형/리스트형 토글 표시
- 모바일에서는 카드형/리스트형 토글 미노출, 항상 리스트형으로 표시
- 청약 상세 하단 Kakao 지도 영역
- Kakao 공유 버튼
- 네이버 경제/부동산 뉴스 프록시 API 및 1분 갱신 UI
- Supabase 클라이언트 설정

## 환경변수

문서에는 원문 키를 기록하지 않는다.

필요한 환경변수:

- `VITE_KAKAO_JAVASCRIPT_KEY`
- `VITE_KAKAO_MAP_APP_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 검증 명령

변경 후 기본 검증:

```bash
npm run build
npm test
```

프로덕션 배포:

```bash
npx --yes vercel --prod --yes
curl -I https://cheongyakeasy.vercel.app/subscriptions
```

GitHub 푸시:

```bash
git status --short --branch
git push -u origin main
```

## Codex 관련 주의

- Codex는 이 채팅 전문을 자동으로 볼 수 없다.
- 새 Codex 세션이 프로젝트 맥락을 보려면 `AGENTS.md`, `docs/AGENTS.md`, 이 파일을 읽어야 한다.
- 사용자가 “채팅 내용이 Codex에 안 보인다”고 말하면, 채팅 전문 동기화가 아니라 저장소 문서 기반 컨텍스트 공유 방식임을 설명한다.
- 중요한 결정이나 작업 결과는 이 파일이나 관련 문서에 계속 갱신한다.
