# AGENTS.md - CheongyakEasy 작업 지침

이 문서는 청약이지 프로젝트에서 작업하는 에이전트가 먼저 읽어야 할 운영 지침이다. 현재 프로젝트는 주택청약 공고, 일정, 가이드, 대출 준비 정보, 부동산뉴스를 제공하는 Vite + React + TypeScript 반응형 웹앱으로 구현되어 Vercel 프로덕션에 배포되어 있다.

## 1. 프로젝트 맥락

청약이지는 사용자가 주택청약 공고와 일정을 쉽게 탐색하고, 자격 확인 포인트와 준비 서류, 대출 관련 주의사항을 한 곳에서 확인하도록 돕는 정보형 웹 서비스다.

v1은 다음 성격을 가진다.

- 로그인 없는 공개 정보 사이트
- 모바일 우선 반응형 웹
- Vite + React + TypeScript 기반 구현
- TypeScript seed data 기반으로 시작
- Vercel 프로덕션 배포
- Kakao 지도 API와 카카오톡 공유 API 연결
- 네이버 뉴스 경제/부동산 섹션 프록시 API와 1분 갱신 UI
- Supabase 클라이언트와 프로덕션 환경변수 설정
- 이후 공식 공고 데이터 동기화, 즐겨찾기, 알림 기능으로 확장 가능하게 설계
- 개인별 자격 판정, 청약 신청 대행, 금융 상품 추천은 하지 않음

이 프로젝트의 가장 중요한 태도는 “공식 정보를 대신 판단하지 않고, 사용자가 확인해야 할 핵심을 정리해 주는 것”이다.

## 2. 현재 상태

현재 저장소는 앱 구현과 운영 배포가 진행된 상태다. `src/`에는 라우트, 페이지, 컴포넌트, seed data, 서비스 로직이 있으며 `api/real-estate-news.js`는 Vercel Serverless Function으로 동작한다.

주요 문서:

- Plan: `docs/01-plan/features/cheongyakeasy-responsive-site.plan.md`
- Design: `docs/02-design/features/cheongyakeasy-responsive-site.design.md`
- Do Guide: `docs/02-design/features/cheongyakeasy-responsive-site.do.md`
- Design System: `docs/DESIGN.MD`
- Root Design Summary: `Design.md`
- Skills Inventory: `Skills.md`
- Hooks Inventory: `Hooks.md`
- PDCA status: `docs/.pdca-status.json`

PDCA 흐름상 문서에는 `do` 단계 기록이 남아 있을 수 있다. 실제 코드 기준으로는 홈, 청약리스트, 상세, 캘린더, 가이드, 대출, 부동산뉴스, Kakao/Supabase/Vercel 연동이 구현되어 있다. Check/Analyze 단계로 넘어갈 때는 현재 코드와 배포 상태를 기준으로 판단한다.

## 3. 문서 우선순위

작업 전 다음 순서로 문서를 참고한다.

1. `docs/01-plan/features/cheongyakeasy-responsive-site.plan.md`
2. `docs/02-design/features/cheongyakeasy-responsive-site.design.md`
3. `docs/02-design/features/cheongyakeasy-responsive-site.do.md`
4. `docs/DESIGN.MD`
5. `Design.md`
6. `Skills.md`
7. `Hooks.md`
8. `docs/.pdca-status.json`

설계와 구현이 충돌하면 Design 문서를 우선하되, 디자인 토큰/시각 규칙은 `docs/DESIGN.MD`를 따른다. 기존 문서에 오래된 Toss 관련 표현이 남아 있어도, 현재 프로젝트의 시각 시스템은 WantedDev/Montage 기반으로 본다.

## 4. 기술 스택

기본 구현 스택:

- Vite
- React
- TypeScript
- React Router
- CSS variables + 일반 CSS
- TypeScript seed data
- Vitest
- lucide-react
- Vercel Serverless Function
- Supabase JS/SSR packages
- Kakao JavaScript SDK

Montage WDS 직접 설치는 선택 사항이다. GitHub Packages 인증이나 registry 이슈가 있으면 `docs/DESIGN.MD`의 토큰을 CSS 변수로 재현하고 자체 컴포넌트를 구현한다.

패키지 설치가 필요한 경우 먼저 일반 npm 패키지로 진행한다.

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install @supabase/supabase-js @supabase/ssr
```

## 5. 목표 페이지

v1에서 구현할 주요 경로:

| 경로 | 역할 |
|------|------|
| `/` | 홈, 주요 공고와 마감 임박 일정, 가이드/대출 진입점 |
| `/subscriptions` | 청약리스트, 검색, 필터 |
| `/subscription-detail/:id` | 공고 상세, 일정, 자격, 공급 정보, 서류, 공식 링크 |
| `/calendar` | 캘린더, 접수 시작/마감/당첨 발표/계약 일정 |
| `/news` | 부동산뉴스, 네이버 뉴스 경제/부동산 최신 기사 |
| `/guide` | 청약 기본, 자격, 가점, 서류, 절차 가이드 |
| `/loan` | 대출/자금 준비 정보와 주의사항 |
| `*` | 찾을 수 없음 |

## 6. 권장 파일 구조

구현 시 다음 구조를 우선 사용한다.

```text
src/
  main.tsx
  App.tsx
  routes.tsx
  data/
    notices.ts
    guides.ts
    loanGuides.ts
  types/
    notice.ts
    guide.ts
    loan.ts
    news.ts
  services/
    noticeService.ts
    calendarService.ts
    guideService.ts
    formatters.ts
    newsService.ts
    supabaseClient.ts
  components/
    layout/
      AppLayout.tsx
      MobileBottomNavigation.tsx
      DesktopTopNavigation.tsx
      PageHeader.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      EmptyState.tsx
      TextField.tsx
      SegmentedTabs.tsx
      Skeleton.tsx
    notice/
      NoticeCard.tsx
      NoticeFilterBar.tsx
      NoticeStatusBadge.tsx
      NoticeSummary.tsx
      ScheduleTimeline.tsx
      UnitSummaryTable.tsx
      SubscriptionCalendarPreview.tsx
      KakaoLocationMap.tsx
      KakaoShareButton.tsx
    news/
      RealEstateNewsList.tsx
    guide/
      GuideCard.tsx
      ChecklistBlock.tsx
    loan/
      LoanGuideCard.tsx
  pages/
    HomePage.tsx
    SubscriptionsPage.tsx
    SubscriptionDetailPage.tsx
    CalendarPage.tsx
    GuidePage.tsx
    LoanPage.tsx
    RealEstateNewsPage.tsx
    NotFoundPage.tsx
  styles/
    montage-tokens.css
    global.css
api/
  real-estate-news.js
supabase/
  config.toml
```

## 7. 코딩 규칙

- 컴포넌트 파일과 컴포넌트명은 PascalCase를 사용한다.
- 함수와 변수는 camelCase를 사용한다.
- 상수는 필요한 경우 UPPER_SNAKE_CASE를 사용한다.
- 도메인 타입은 `src/types`에 둔다.
- seed data는 `src/data`에 둔다.
- 필터링, 정렬, 일정 변환은 컴포넌트가 아니라 `src/services`에서 처리한다.
- 페이지 컴포넌트는 라우트 구성과 화면 조합에 집중한다.
- UI 컴포넌트는 도메인 데이터에 과하게 결합하지 않는다.
- 날짜는 v1에서 `YYYY-MM-DD` 문자열로 저장하고, 표시할 때 formatter를 사용한다.

## 8. 데이터 모델 핵심

청약 공고는 최소 다음 필드를 가져야 한다.

- `id`
- `title`
- `organization`
- `region`
- `district`
- `housingType`
- `supplyType`
- `status`
- `applicationStartDate`
- `applicationEndDate`
- `winnerAnnouncementDate`
- `eligibilitySummary`
- `unitSummary`
- `requiredDocuments`
- `sourceUrl`
- `lastCheckedDate`

모든 공고에는 공식 출처 URL과 확인일이 있어야 한다. 공고 정보 일부가 누락되어도 화면이 깨지지 않게 처리한다. 위치 지도는 `address`를 우선 사용하고, 없으면 `region` + `district`를 fallback으로 사용한다.

## 8-1. 외부 연동 상태

### Vercel

- Production URL: `https://cheongyakeasy.vercel.app`
- SPA rewrite는 `vercel.json`에서 모든 경로를 `/index.html`로 보낸다.
- Serverless Function: `/api/real-estate-news`

### Kakao

- 지도 SDK와 카카오톡 공유 SDK를 사용한다.
- 필요한 환경변수:
  - `VITE_KAKAO_JAVASCRIPT_KEY`
  - `VITE_KAKAO_MAP_APP_KEY`는 선택이며, 없으면 JavaScript key를 재사용한다.
- Kakao Developers Web 플랫폼 도메인에 `https://cheongyakeasy.vercel.app` 등록이 필요하다.

### Supabase

- 패키지: `@supabase/supabase-js`, `@supabase/ssr`
- 클라이언트: `src/services/supabaseClient.ts`
- 필요한 환경변수:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- 로컬 Supabase CLI 설정은 `supabase/config.toml`에 있다.
- `npx supabase start`는 Docker Desktop 실행이 필요하다.

### Naver 부동산뉴스

- 원본: `https://news.naver.com/breakingnews/section/101/260`
- 브라우저 CORS를 피하기 위해 `api/real-estate-news.js`가 서버에서 HTML을 가져와 파싱한다.
- 응답 캐시는 Vercel `s-maxage=60` 기준이며, 프론트는 60초마다 재요청한다.

## 9. 디자인 규칙

시각 시스템은 `docs/DESIGN.MD`를 따른다.

핵심 토큰:

- Primary: `#0066FF`
- Primary strong: `#005EEB`
- Primary subtle: `#EAF2FE`
- Page background: `#F7F7F8`
- Card background: `#FFFFFF`
- Main text: `#171719`
- Secondary text: `#70737C`
- Border: `#E1E2E4`
- Positive: `#16A34A`
- Cautionary: `#F97316`
- Negative: `#EF4444`

타이포그래피:

- Wanted Sans 또는 Pretendard를 우선한다.
- 숫자, 날짜, 금액에는 `font-variant-numeric: tabular-nums`를 적용한다.
- 금액과 세대수는 임의 축약하지 않는다.

레이아웃:

- 모바일 우선
- 360px 화면에서 깨지지 않아야 한다.
- 모바일은 하단 navigation, 데스크톱은 상단 navigation을 사용한다.
- 데스크톱 컨테이너는 최대 1120px를 기본으로 한다.
- 카드 안에 카드를 중첩하지 않는다.
- primary blue는 장식용으로 남발하지 않는다.

## 10. 콘텐츠와 문구 규칙

청약이지는 차분하고 직접적인 한국어를 사용한다.

권장 문구:

- `공식 공고 보기`
- `공고 자세히 보기`
- `필터 적용`
- `필터 초기화`
- `조건에 맞는 공고가 없어요.`
- `공고를 찾을 수 없어요.`
- `대출 조건은 상품과 시점에 따라 달라질 수 있어요.`

금지 또는 지양 문구:

- `신청하기` 단독 사용
- `무조건 신청 가능`
- `대출 승인 가능`
- `최저금리 보장`
- `데이터가 없습니다`
- `문제가 발생했습니다`

청약 신청 대행, 개인별 자격 판정, 금융 상품 추천처럼 보이는 문구를 쓰지 않는다.

## 11. 접근성 규칙

- 모든 페이지에는 `main` landmark가 있어야 한다.
- navigation에는 `aria-label`을 둔다.
- 검색 input에는 label 또는 `aria-label`을 둔다.
- icon-only button에는 반드시 `aria-label`을 둔다.
- 상태는 색상만으로 구분하지 않고 텍스트 배지를 함께 사용한다.
- focus outline을 제거하지 않는다.
- 모바일 터치 타깃은 최소 44px 이상으로 만든다.
- 외부 링크는 목적이 명확한 텍스트를 사용한다.

## 12. 외부 링크와 보안

공식 출처 링크는 새 탭으로 열 수 있으며 다음 속성을 사용한다.

```tsx
target="_blank"
rel="noopener noreferrer"
```

v1에서는 개인정보를 수집하지 않는다. 소득, 자산, 신용정보 입력 UI를 만들지 않는다.

## 13. 테스트와 검증

구현 후 최소 확인:

- `npm run build`
- 서비스 로직 단위 테스트
- 360px, 375px, 768px, 1280px viewport 확인
- 홈에서 공고 상세 이동
- 공고 목록 필터 적용
- 필터 결과 없음 상태 확인
- 잘못된 상세 ID 처리
- 일정 페이지 날짜순 정렬
- 공식 출처 링크 속성 확인

가능하면 Vitest로 다음을 테스트한다.

- 검색어 필터
- 지역 필터
- 상태 필터
- 날짜 범위 필터
- 잘못된 query 값 보정
- calendar event 생성과 정렬

## 14. PDCA 운영 규칙

현재 기능명은 `cheongyakeasy-responsive-site`다.

작업 단계:

```text
Plan 완료 -> Design 완료 -> Do 진행 중 -> Check 대기 -> Act 대기 -> Report 대기
```

실제 앱 구현이 끝나기 전에는 `do` 단계를 완료 처리하지 않는다. 구현과 검증이 끝난 뒤 다음 명령 흐름을 따른다.

```text
$pdca analyze cheongyakeasy-responsive-site
```

분석에서 구현률이 낮으면 iterate 단계로 보완한다.

## 15. 작업 시 주의

- 사용자가 만든 문서나 파일을 임의로 삭제하지 않는다.
- 빈 프로젝트라도 문서에 정의된 구조를 우선한다.
- 디자인 변경 시 `docs/DESIGN.MD`와 충돌하지 않게 한다.
- 데이터 구조 변경 시 Design 문서의 타입과 서비스 함수도 함께 검토한다.
- 외부 공식 정보가 필요한 작업은 최신성을 확인한다.
- 청약/대출/법적 판단과 관련된 문구는 보수적으로 작성한다.

## 16. 빠른 시작

실제 구현을 시작한다면 다음 순서로 진행한다.

1. Vite React TypeScript 프로젝트 초기화
2. `src/styles/montage-tokens.css`와 `src/styles/global.css` 작성
3. `src/types` 작성
4. `src/data` seed data 작성
5. `src/services` 필터/일정/formatter 작성
6. layout과 ui 컴포넌트 작성
7. 6개 주요 페이지 구현
8. 빌드와 viewport 검증

작업 중 의사결정이 애매하면 이 문서보다 Plan/Design/Do 문서를 먼저 확인한다.
