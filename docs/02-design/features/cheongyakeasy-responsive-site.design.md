# 청약이지 반응형 주택청약 사이트 - Design Document

> 요약: 주택청약 공고, 일정, 가이드, 대출 정보를 모바일 우선 반응형 웹으로 제공하는 정적 데이터 기반 v1 설계
>
> 프로젝트: CheongyakEasy
> 버전: 1.0.0
> 작성자: Codex
> 작성일: 2026-06-03
> 상태: Draft
> Plan 문서: [cheongyakeasy-responsive-site.plan.md](../../01-plan/features/cheongyakeasy-responsive-site.plan.md)

---

## 1. 개요

### 1.1 설계 목표

청약이지 v1은 로그인 없이 접근 가능한 반응형 정보 사이트로 설계한다. 사용자는 모바일과 데스크톱에서 청약 공고를 탐색하고, 조건으로 필터링하고, 주요 일정을 확인하고, 청약 절차와 대출 준비 정보를 읽을 수 있어야 한다.

v1의 핵심은 빠른 구현과 검증이다. 데이터는 로컬 JSON 또는 TypeScript seed data로 시작하되, 도메인 타입과 데이터 접근 함수를 분리해서 이후 청약홈, LH, SH, GH 등 외부 데이터 동기화 구조로 확장할 수 있게 한다.

### 1.2 설계 원칙

- 모바일 우선: 375px 기준에서 먼저 완성하고, 데스크톱은 중앙 정렬된 넓은 정보 화면으로 확장한다.
- 공식 출처 우선: 모든 공고와 대출 정보에는 공식 출처 URL과 확인일을 표시한다.
- 데이터와 UI 분리: 화면 컴포넌트는 정제된 도메인 모델만 받는다.
- URL 기반 필터: 공고 필터는 공유 가능한 쿼리 파라미터로 관리한다.
- WantedDev/Montage 기반 UI: 인터랙션은 `#0066FF`, 본문은 한국어 중심, 숫자와 날짜는 정확하게 표시한다.
- 과도한 개인화 금지: v1은 정보 제공 서비스이며, 자격 판정이나 금융 조언으로 보이지 않게 한다.

## 2. 기술 아키텍처

### 2.1 선택 기술

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Vite + React + TypeScript | 빈 프로젝트에서 빠르게 시작 가능하고, 정적 배포와 컴포넌트 개발에 적합하다. |
| 라우팅 | React Router | `/`, `/subscriptions`, `/subscription-detail/:id` 같은 클라이언트 라우팅을 단순하게 구성한다. |
| 스타일링 | 일반 CSS + CSS 변수 | WantedDev/Montage-inspired 토큰을 전역 변수로 정의하고, 의존성을 줄인다. |
| 데이터 | TypeScript seed data | 타입 안정성과 정적 배포를 동시에 확보한다. |
| 아이콘 | lucide-react | 하나의 SVG 아이콘 라이브러리로 통일한다. |
| 테스트 | Vitest, Playwright 또는 브라우저 수동 검증 | 필터 로직은 단위 테스트, 주요 화면은 브라우저 확인을 우선한다. |

### 2.2 상위 구조

```text
------------------------------+
| Browser                      |
| - React Router               |
| - Responsive UI              |
+--------------+---------------+
               |
               v
+------------------------------+
| Domain Services              |
| - notice filtering           |
| - calendar event mapping     |
| - guide lookup               |
+--------------+---------------+
               |
               v
+------------------------------+
| Local Seed Data              |
| - notices                    |
| - guides                     |
| - loan guides                |
+------------------------------+
```

### 2.3 데이터 흐름

```text
사용자 필터 입력
  -> URLSearchParams 갱신
  -> 필터 파서가 NoticeFilter 생성
  -> notice service가 seed data 필터링
  -> 화면 컴포넌트가 리스트, 빈 상태, 카운트 렌더링
```

상세 화면은 URL의 `id`를 기준으로 공고를 조회한다. 공고가 없으면 한국어 404/빈 상태를 표시하고 목록으로 돌아가는 보조 버튼을 제공한다.

### 2.4 의존성 관계

| 모듈 | 의존 대상 | 책임 |
|------|-----------|------|
| `src/data/*` | 없음 | seed data 보관 |
| `src/types/*` | 없음 | 도메인 타입 정의 |
| `src/services/*` | `data`, `types` | 필터링, 정렬, 일정 변환 |
| `src/components/*` | `types` | 재사용 UI 컴포넌트 |
| `src/pages/*` | `services`, `components` | 라우트별 화면 구성 |
| `src/styles/*` | 없음 | WantedDev/Montage-inspired 토큰, 레이아웃, 반응형 규칙 |

## 3. 파일 구조

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
  services/
    noticeService.ts
    calendarService.ts
    guideService.ts
  components/
    layout/
      AppLayout.tsx
      BottomNav.tsx
      PageHeader.tsx
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      EmptyState.tsx
      TextField.tsx
      SegmentedTabs.tsx
    notice/
      NoticeCard.tsx
      NoticeFilterBar.tsx
      NoticeSummary.tsx
      ScheduleTimeline.tsx
    guide/
      GuideCard.tsx
      ChecklistBlock.tsx
  pages/
    HomePage.tsx
    SubscriptionsPage.tsx
    SubscriptionDetailPage.tsx
    CalendarPage.tsx
    GuidePage.tsx
    LoanPage.tsx
    NotFoundPage.tsx
  styles/
    tokens.css
    global.css
```

## 4. 데이터 모델

### 4.1 공고 모델

```typescript
type NoticeStatus = "open" | "upcoming" | "closed" | "announced";
type HousingType = "public-rental" | "private-sale" | "public-sale" | "youth" | "newlywed";
type SupplyType = "special" | "general" | "priority" | "remaining";

interface SubscriptionNotice {
  id: string;
  title: string;
  organization: "청약홈" | "LH" | "SH" | "GH" | "기타";
  region: string;
  district: string;
  address?: string;
  housingType: HousingType;
  supplyType: SupplyType;
  status: NoticeStatus;
  applicationStartDate: string;
  applicationEndDate: string;
  winnerAnnouncementDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  moveInDateText?: string;
  eligibilitySummary: string[];
  unitSummary: UnitSummary[];
  requiredDocuments: string[];
  sourceUrl: string;
  lastCheckedDate: string;
  featured?: boolean;
}

interface UnitSummary {
  areaType: string;
  supplyCount: number;
  estimatedPriceText?: string;
  depositText?: string;
  monthlyRentText?: string;
}
```

### 4.2 필터 모델

```typescript
interface NoticeFilter {
  query?: string;
  region?: string;
  housingType?: HousingType | "all";
  supplyType?: SupplyType | "all";
  status?: NoticeStatus | "all";
  dateFrom?: string;
  dateTo?: string;
}
```

필터 기본값은 `status=all`, `housingType=all`, `supplyType=all`이다. 검색어는 제목, 지역, 지구명, 기관명을 대상으로 한다.

### 4.3 일정 모델

```typescript
type CalendarEventType = "application-start" | "application-end" | "winner" | "contract";

interface CalendarEvent {
  id: string;
  noticeId: string;
  title: string;
  date: string;
  type: CalendarEventType;
  region: string;
  status: NoticeStatus;
}
```

### 4.4 가이드 모델

```typescript
interface Guide {
  id: string;
  title: string;
  category: "basic" | "eligibility" | "score" | "documents" | "process";
  summary: string;
  sections: GuideSection[];
  relatedLinks: ReferenceLink[];
}

interface GuideSection {
  heading: string;
  body: string;
  checklist?: string[];
}

interface ReferenceLink {
  label: string;
  url: string;
}
```

### 4.5 대출 가이드 모델

```typescript
interface LoanGuide {
  id: string;
  title: string;
  targetUser: string;
  summary: string;
  keyConditions: string[];
  cautionPoints: string[];
  officialUrl: string;
  lastCheckedDate: string;
}
```

## 5. API 명세

v1은 별도 서버 API를 만들지 않는다. 다만 이후 서버 이전이 쉽도록 서비스 함수 인터페이스를 API처럼 고정한다.

### 5.1 서비스 함수

| 함수 | 입력 | 출력 | 설명 |
|------|------|------|------|
| `listNotices(filter)` | `NoticeFilter` | `SubscriptionNotice[]` | 필터와 검색어를 적용한 공고 목록 |
| `getNoticeById(id)` | `string` | `SubscriptionNotice \| undefined` | 공고 상세 조회 |
| `getFeaturedNotices()` | 없음 | `SubscriptionNotice[]` | 홈 화면 추천 공고 |
| `getCalendarEvents(filter)` | `NoticeFilter` | `CalendarEvent[]` | 공고 날짜를 일정 이벤트로 변환 |
| `listGuides()` | 없음 | `Guide[]` | 가이드 목록 |
| `getGuideById(id)` | `string` | `Guide \| undefined` | 가이드 상세 조회 |
| `listLoanGuides()` | 없음 | `LoanGuide[]` | 대출 가이드 목록 |

### 5.2 향후 HTTP API 전환안

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | `/api/notices` | 공고 목록과 필터 결과 | 없음 |
| GET | `/api/notices/:id` | 공고 상세 | 없음 |
| GET | `/api/calendar-events` | 일정 목록 | 없음 |
| GET | `/api/guides` | 가이드 목록 | 없음 |
| GET | `/api/loan-guides` | 대출 가이드 목록 | 없음 |

응답 형식은 다음 형태로 맞춘다.

```json
{
  "data": [],
  "meta": {
    "lastUpdated": "2026-06-03",
    "source": "seed"
  }
}
```

## 6. 화면 설계

### 6.1 공통 레이아웃

```text
모바일
+--------------------------+
| 상단 로고/현재 페이지     |
+--------------------------+
| 본문                     |
| - 요약                   |
| - 필터/목록/콘텐츠       |
+--------------------------+
| 하단 탭 내비게이션       |
+--------------------------+

데스크톱
+--------------------------------------+
| 상단 내비게이션                       |
+--------------------------------------+
| 중앙 컨테이너 max-width 1120px        |
| 2열 보조 레이아웃 허용                |
+--------------------------------------+
```

모바일에서는 하단 탭을 사용한다. 데스크톱에서는 상단 내비게이션을 노출하고 하단 탭은 숨긴다.

### 6.2 페이지 목록

| 페이지 | 경로 | 핵심 UI | 요구사항 연결 |
|--------|------|---------|---------------|
| 홈 | `/` | 활성 공고 요약, 마감 임박 일정, 가이드 진입, 대출 진입 | FR-01 |
| 청약 공고 | `/subscriptions` | 검색, 필터, 공고 카드 목록, 빈 상태 | FR-02, FR-03, FR-08 |
| 공고 상세 | `/subscription-detail/:id` | 일정, 자격, 공급, 서류, 출처 링크 | FR-04 |
| 청약 일정 | `/calendar` | 날짜별 타임라인, 상태 배지 | FR-05 |
| 청약 가이드 | `/guide` | 초보자용 설명 카드와 체크리스트 | FR-06 |
| 대출 정보 | `/loan` | 대출 준비 체크리스트, 주의사항, 공식 링크 | FR-07 |
| 찾을 수 없음 | `*` | 짧은 안내와 목록 이동 버튼 | FR-10 |

### 6.3 주요 컴포넌트

| 컴포넌트 | 위치 | 책임 |
|----------|------|------|
| `AppLayout` | `components/layout` | 공통 페이지 폭, 헤더, 내비게이션 |
| `BottomNav` | `components/layout` | 모바일 하단 탭 |
| `Button` | `components/ui` | WantedDev/Montage-inspired primary/secondary 버튼 |
| `Badge` | `components/ui` | 상태, 기관, 공급유형 표시 |
| `Card` | `components/ui` | 공고/가이드/대출 정보 카드 |
| `EmptyState` | `components/ui` | 결과 없음, 공고 없음, 상세 없음 |
| `NoticeCard` | `components/notice` | 목록용 공고 요약 |
| `NoticeFilterBar` | `components/notice` | 검색어와 필터 컨트롤 |
| `ScheduleTimeline` | `components/notice` | 상세 화면 일정 흐름 |
| `GuideCard` | `components/guide` | 가이드 목록 카드 |
| `ChecklistBlock` | `components/guide` | 서류/대출 준비 체크리스트 |

## 7. 디자인 시스템 적용

### 7.1 토큰

```css
:root {
  --ce-primary: #0066ff;
  --ce-primary-strong: #005eeb;
  --ce-primary-heavy: #0054d1;
  --ce-primary-subtle: #eaf2fe;
  --ce-background-alt: #f7f7f8;
  --ce-label-normal: #171719;
  --ce-label-neutral: #70737c;
  --ce-line-solid: #e1e2e4;
  --ce-line-weak: #eaebec;
  --ce-positive: #16a34a;
  --ce-cautionary: #f97316;
  --ce-negative: #ef4444;
  --ce-radius-card: 16px;
  --ce-radius-button: 12px;
}
```

### 7.2 타이포그래피

- 기본 폰트 스택은 Wanted Sans 또는 Pretendard 우선, 한국어 시스템 폰트 fallback을 사용한다.
- 금액, 공급 수, 날짜 카운트는 `font-variant-numeric: tabular-nums`를 적용한다.
- 본문은 14px 또는 16px, 제목은 20px 이상, 주요 숫자는 700 weight를 사용한다.

### 7.3 상태별 UI

| 상태 | 처리 |
|------|------|
| 로딩 | 최종 레이아웃과 같은 크기의 skeleton. 금액/숫자는 `--`로 표시 가능 |
| 필터 결과 없음 | `조건에 맞는 공고가 없어요.` 한 줄과 필터 초기화 보조 버튼 |
| 상세 공고 없음 | `공고를 찾을 수 없어요.`와 목록 이동 버튼 |
| 오류 | 하단 toast 또는 화면 내 짧은 문장. `문제가 발생했습니다` 같은 모호한 문구 금지 |
| 성공 | 필터/탭 전환은 즉시 반영. 과한 축하 모션은 사용하지 않음 |

## 8. 라우팅과 상태 관리

### 8.1 라우트

```text
/                         HomePage
/subscriptions            SubscriptionsPage
/subscription-detail/:id  SubscriptionDetailPage
/calendar                 CalendarPage
/guide                    GuidePage
/loan                     LoanPage
*                         NotFoundPage
```

### 8.2 URL 쿼리

`/subscriptions`와 `/calendar`는 다음 쿼리를 사용한다.

```text
?q=강남&region=서울&status=open&housingType=public-rental&supplyType=special
```

지원 쿼리:

- `q`: 검색어
- `region`: 지역
- `status`: `all | open | upcoming | closed | announced`
- `housingType`: `all | public-rental | private-sale | public-sale | youth | newlywed`
- `supplyType`: `all | special | general | priority | remaining`
- `dateFrom`, `dateTo`: `YYYY-MM-DD`

## 9. 접근성 및 SEO

### 9.1 접근성

- 모든 페이지는 `header`, `main`, `nav` landmark를 사용한다.
- 필터 입력은 명확한 label 또는 `aria-label`을 가진다.
- 버튼, 링크, 탭은 키보드로 접근 가능해야 한다.
- 색상만으로 상태를 구분하지 않고 텍스트 배지를 함께 사용한다.
- focus outline은 CheongyakEasy primary blue 계열로 보이게 유지한다.

### 9.2 SEO

- 페이지별 `title`과 `meta description`을 설정한다.
- 공고 상세 페이지는 공고명, 지역, 기관명을 title에 포함한다.
- 정적 배포 v1에서는 기본 Open Graph 태그를 전역으로 둔다.
- 공식 출처 링크에는 `rel="noopener noreferrer"`를 적용한다.

## 10. 오류 처리

| 상황 | 사용자 메시지 | 처리 |
|------|---------------|------|
| 공고 ID 없음 | `공고를 찾을 수 없어요.` | 목록 이동 버튼 표시 |
| 필터 결과 없음 | `조건에 맞는 공고가 없어요.` | 필터 초기화 버튼 표시 |
| 잘못된 쿼리 값 | 별도 오류 없음 | 기본값 `all`로 보정 |
| 외부 링크 열기 | 별도 오류 없음 | 새 탭으로 공식 출처 이동 |
| 데이터 필드 누락 | `확인 필요` 또는 섹션 숨김 | 화면 깨짐 방지 |

## 11. 보안 및 신뢰성

- 사용자 입력 검색어는 화면 출력 전에 React escaping에 맡기고, HTML 삽입은 금지한다.
- 외부 링크는 `target="_blank"`와 `rel="noopener noreferrer"`를 함께 사용한다.
- v1은 민감한 개인정보를 수집하지 않는다.
- 대출 정보는 설명형 콘텐츠로 제한하고, 개인 맞춤 추천처럼 보이는 문구를 쓰지 않는다.
- 공고와 대출 데이터에는 `lastCheckedDate`를 표시해 정보의 기준일을 분명히 한다.

## 12. 테스트 계획

| 유형 | 대상 | 도구/방법 |
|------|------|-----------|
| 단위 테스트 | `noticeService`, `calendarService` 필터/정렬 로직 | Vitest |
| 컴포넌트 확인 | 공고 카드, 필터바, 빈 상태 | 브라우저 수동 확인 |
| 반응형 확인 | 360px, 375px, 768px, 1280px | Playwright 또는 브라우저 스크린샷 |
| 접근성 확인 | 키보드 이동, label, focus 상태 | 수동 점검 |
| 빌드 검증 | TypeScript, Vite build | `npm run build` |

### 12.1 핵심 검증 시나리오

1. 홈에서 마감 임박 공고를 확인하고 상세 페이지로 이동한다.
2. `/subscriptions`에서 지역과 상태 필터를 적용한다.
3. 필터 결과가 없을 때 빈 상태와 필터 초기화 버튼을 확인한다.
4. 상세 페이지에서 일정, 자격, 공급, 서류, 공식 링크를 확인한다.
5. `/calendar`에서 같은 공고의 접수 시작/마감 이벤트가 보이는지 확인한다.
6. 모바일 폭에서 하단 탭과 본문이 겹치지 않는지 확인한다.

## 13. 구현 순서

1. 프로젝트 초기화: Vite React TypeScript, React Router, lucide-react 설치
2. 전역 스타일 작성: `tokens.css`, `global.css`
3. 도메인 타입 작성: notice, guide, loan
4. seed data 작성: 공고, 가이드, 대출 가이드
5. 서비스 함수 작성: 필터, 상세 조회, 일정 변환
6. 공통 UI 작성: Button, Badge, Card, EmptyState, layout
7. 페이지 구현: Home, Subscriptions, Detail, Calendar, Guide, Loan
8. 반응형/접근성 보정
9. 빌드 및 브라우저 검증

## 14. 설계 결정 기록

| 결정 | 선택 | 이유 |
|------|------|------|
| v1 데이터 방식 | TypeScript seed data | API 없이도 빠르게 사용자 흐름을 검증할 수 있다. |
| URL 필터 | 쿼리 파라미터 | 필터 결과 공유와 뒤로가기 동작이 자연스럽다. |
| UI 방향 | WantedDev/Montage-inspired utility UI | 청약/금융 정보의 신뢰감과 가독성을 높인다. |
| 레이아웃 | 모바일 하단 탭 + 데스크톱 상단 nav | 모바일 사용성을 우선하면서 데스크톱 정보 탐색도 지원한다. |
| 개인화 | 제외 | 법적/금융적 오해를 줄이고 v1 범위를 명확히 한다. |

## 15. 다음 단계

- `docs/02-design/features/cheongyakeasy-responsive-site.do.md` 구현 가이드를 작성한다.
- Vite React TypeScript 프로젝트를 초기화한다.
- 이 설계 문서의 파일 구조와 타입을 기준으로 구현을 시작한다.

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-06-03 | 최초 설계 문서 작성 | Codex |
