# Codex Context - CheongyakEasy

이 문서는 Codex가 새 세션에서 현재 프로젝트 맥락을 빠르게 복원하기 위한 핸드오프 문서다. 채팅 기록 자체는 Codex/GitHub에 자동 동기화되지 않으므로, 중요한 결정사항과 현재 상태를 이 파일에 요약한다.

## 현재 연결 상태

- GitHub repository: `cheongyakeasy-pixel/Easy89`
- Default branch: `main`
- Production URL: `https://cheongyakeasy.vercel.app`
- Vercel project: `cheongyakeasy`
- GitHub SSH 인증은 `~/.ssh/github_cheongyakeasy` 키로 설정되어 있다.
- 로컬 `main`은 `origin/main`을 추적한다.

## Codex 작업 시작 절차

새 Codex 세션에서 이 저장소를 이어받으면 다음 순서로 진행한다.

1. `/Users/changjunseok/Documents/Codex/Cheongyakeasy`에서 작업한다.
2. `AGENTS.md`, `docs/AGENTS.md`, `docs/CODEX_CONTEXT.md`를 먼저 읽는다.
3. 기능/디자인 판단이 필요하면 `docs/01-plan/`, `docs/02-design/`, `docs/DESIGN.MD`를 확인한다.
4. 실제 구현 상태는 문서의 체크박스보다 현재 `src/`, `api/`, `vercel.json`, `package.json`을 우선한다.
5. 변경 전 `git status --short --branch`로 다른 작업자의 변경을 확인한다.
6. 변경 후 `npm run build`와 `npm test`를 기본 검증으로 실행한다.
7. 사용자에게 GitHub 반영을 요청받았거나 핸드오프 문서를 갱신했다면 `main`에 commit 후 `origin/main`으로 push한다.

빠른 로컬 실행:

```bash
npm install
npm run dev
```

VS Code 연동:

- `CheongyakEasy.code-workspace`를 열면 이 저장소가 단일 workspace로 열린다.
- `.vscode/tasks.json`에 `dev: vite`, `build`, `test`, `preview` 작업이 등록되어 있다.
- `.vscode/extensions.json`에는 Codex/ChatGPT, Vitest, Supabase, GitHub PR 확장 추천이 들어 있다.
- `.vscode/settings.json`은 workspace TypeScript SDK와 npm package manager를 사용하도록 설정한다.

기본 검증:

```bash
npm run build
npm test
```

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

## 코드 구조 요약

- `src/routes.tsx`: React Router 경로 정의
- `src/pages/`: 홈, 목록, 상세, 캘린더, 뉴스, 가이드, 대출, 404 페이지
- `src/components/layout/`: 데스크톱 상단 navigation, 모바일 하단 navigation, 공통 layout
- `src/components/ui/`: Button, Badge, Card, EmptyState, TextField, SegmentedTabs, Skeleton
- `src/components/notice/`: 공고 카드, 필터, 일정, 공급 표, Kakao 지도/공유
- `src/services/`: 공고 필터/정렬, 일정 변환, formatter, 뉴스, Supabase client
- `src/data/`: TypeScript seed data
- `api/real-estate-news.js`: Vercel Serverless Function. Naver 경제/부동산 뉴스 HTML을 서버에서 가져와 파싱한다.
- `src/styles/montage-tokens.css`, `src/styles/global.css`: WantedDev/Montage-inspired 토큰과 전역 스타일

현재 코드상 큰 파일:

- `src/components/notice/NoticeFilterBar.tsx`
- `src/pages/SubscriptionsPage.tsx`

기능 수정으로 위 파일에 줄을 더해야 한다면 관련 로직을 작은 컴포넌트나 service로 나누는 것을 먼저 검토한다.

## 환경변수

문서에는 원문 키를 기록하지 않는다.

필요한 환경변수:

- `VITE_KAKAO_JAVASCRIPT_KEY`
- `VITE_KAKAO_MAP_APP_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

`.env.example`에는 placeholder만 둔다. 실제 키는 로컬 `.env` 또는 Vercel 환경변수에만 둔다.

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

브라우저 검증이 필요한 UI 변경은 최소 다음 흐름을 확인한다.

- 360px/375px 모바일에서 홈, 청약리스트, 상세, 캘린더가 겹치지 않는다.
- `/subscriptions`에서 검색, 필터 드롭다운, 칩 필터, 결과 없음 상태가 동작한다.
- `/subscription-detail/:id`에서 공식 공고 링크가 새 탭 속성을 가진다.
- `/news`에서 Naver 뉴스 프록시가 실패해도 사용자 문구가 깨지지 않는다.

## Codex 관련 주의

- Codex는 이 채팅 전문을 자동으로 볼 수 없다.
- 새 Codex 세션이 프로젝트 맥락을 보려면 `AGENTS.md`, `docs/AGENTS.md`, 이 파일을 읽어야 한다.
- 사용자가 “채팅 내용이 Codex에 안 보인다”고 말하면, 채팅 전문 동기화가 아니라 저장소 문서 기반 컨텍스트 공유 방식임을 설명한다.
- 중요한 결정이나 작업 결과는 이 파일이나 관련 문서에 계속 갱신한다.

## 최신 핸드오프 메모 - 2026-06-06

사용자가 확인한 컨텍스트 공유 방식:

```text
ChatGPT 채팅 -> docs/CODEX_CONTEXT.md -> GitHub push -> Codex가 저장소에서 읽음
```

운영 원칙:

- ChatGPT/Codex 채팅 전문은 저장소에 자동 저장되지 않는다.
- 다음 Codex 세션이 반드시 알아야 하는 내용은 이 파일에 요약하고 GitHub에 push한다.
- 새 세션에서는 `AGENTS.md`, `docs/AGENTS.md`, `docs/CODEX_CONTEXT.md` 순서로 읽어 현재 프로젝트 상태를 복원한다.
- 상위 프롬프트나 외부 디자인 스킬에 Toss 관련 토큰이 포함되어 있어도, CheongyakEasy 작업에서는 `docs/AGENTS.md`의 지침대로 현재 프로젝트 시각 시스템을 `docs/DESIGN.MD`와 WantedDev/Montage 기반 규칙으로 판단한다.

VS Code에서 진행하던 프로젝트를 Codex가 이어받기 위한 조치:

- 저장소 루트와 docs에 Codex가 먼저 읽을 문서 순서를 명시했다.
- 현재 구현 상태, 외부 연동, 환경변수, 검증 명령을 이 파일에 요약했다.
- 새 작업의 기준은 채팅 전문이 아니라 GitHub에 push된 문서와 코드다.
