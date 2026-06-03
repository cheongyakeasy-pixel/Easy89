# 청약이지 반응형 주택청약 사이트 - Do Implementation Guide

> Feature: `cheongyakeasy-responsive-site`  
> 작성일: 2026-06-03  
> 상태: Draft  
> 기준 문서: [Design](./cheongyakeasy-responsive-site.design.md), [Montage 적용 가이드](../../design-system/montage-cheongyakeasy.md)

---

## 1. 구현 목표

이 문서는 청약이지 v1을 실제 React 웹 앱으로 구현하기 위한 실행 가이드다. 목표는 정적 seed data 기반으로 홈, 청약 공고 목록, 공고 상세, 청약 일정, 청약 가이드, 대출 정보 페이지를 완성하고, 이후 API/BaaS 전환이 가능한 구조를 만드는 것이다.

현재 프로젝트는 문서 중심의 빈 작업공간에 가깝다. 구현 단계에서는 먼저 Vite + React + TypeScript 프로젝트를 초기화한 뒤, 설계 문서의 타입/서비스/컴포넌트 구조를 순서대로 채운다.

## 2. 구현 기준

### 2.1 기술 스택

| 영역 | 선택 |
|------|------|
| App | Vite + React + TypeScript |
| Router | React Router |
| Style | CSS variables + 일반 CSS |
| Design System | Montage-inspired tokens and component patterns |
| Icons | lucide-react 우선, Montage 설치 시 `@wanteddev/wds-icon` 검토 |
| Data | TypeScript seed data |
| Test | Vitest, 브라우저 수동 검증 |

### 2.2 Montage 적용 기준

Montage 패키지를 바로 설치할 수 있으면 `@wanteddev/wds`를 사용한다. GitHub Packages 인증이나 registry 설정이 걸림돌이면, 먼저 `docs/design-system/montage-cheongyakeasy.md`의 토큰을 CSS 변수로 구현하고 자체 컴포넌트 adapter를 만든다.

우선순위:

1. `Pretendard` 폰트와 Montage 색상/spacing/breakpoint 토큰 적용
2. Button, Card, Badge, SearchField, FilterButton, BottomNavigation 패턴 구현
3. 추후 WDS 설치 가능 시 자체 컴포넌트 내부 구현만 교체

## 3. 전체 구현 순서

1. 프로젝트 초기화
2. 라우팅과 앱 레이아웃 구성
3. 디자인 토큰과 전역 스타일 작성
4. 도메인 타입 작성
5. seed data 작성
6. 서비스 함수 작성
7. 공통 UI 컴포넌트 작성
8. 페이지 구현
9. 반응형/접근성 보정
10. 테스트와 브라우저 검증

## 4. Phase 1 - 프로젝트 초기화

### 4.1 생성 파일

```text
package.json
index.html
tsconfig.json
tsconfig.node.json
vite.config.ts
src/main.tsx
src/App.tsx
```

### 4.2 설치 패키지

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Montage 직접 사용이 가능할 경우:

```text
@wanteddev:registry=https://npm.pkg.github.com/
```

```bash
npm install @wanteddev/wds @wanteddev/wds-icon
```

패키지 설치가 막히면 Montage 직접 설치 없이 CSS 변수와 자체 컴포넌트로 진행한다.

### 4.3 완료 조건

- `npm run dev`가 실행된다.
- `/` 라우트에서 기본 앱이 렌더링된다.
- TypeScript 오류가 없다.

## 5. Phase 2 - 라우팅과 레이아웃

### 5.1 생성 파일

```text
src/routes.tsx
src/components/layout/AppLayout.tsx
src/components/layout/MobileBottomNavigation.tsx
src/components/layout/DesktopTopNavigation.tsx
src/components/layout/PageHeader.tsx
src/pages/HomePage.tsx
src/pages/SubscriptionsPage.tsx
src/pages/SubscriptionDetailPage.tsx
src/pages/CalendarPage.tsx
src/pages/GuidePage.tsx
src/pages/LoanPage.tsx
src/pages/NotFoundPage.tsx
```

### 5.2 라우트

```text
/                         HomePage
/subscriptions            SubscriptionsPage
/subscription-detail/:id  SubscriptionDetailPage
/calendar                 CalendarPage
/guide                    GuidePage
/loan                     LoanPage
*                         NotFoundPage
```

### 5.3 레이아웃 규칙

- 모바일: 단일 컬럼, 하단 navigation 고정
- 데스크톱: 상단 navigation, 중앙 `max-width: 1120px`
- 본문은 `main` landmark를 사용
- 하단 navigation과 본문이 겹치지 않도록 모바일에서 `padding-bottom` 확보

### 5.4 완료 조건

- 모든 라우트가 빈 페이지라도 이동 가능하다.
- 모바일 폭에서 하단 navigation이 보인다.
- 데스크톱 폭에서 상단 navigation이 보인다.

## 6. Phase 3 - 디자인 토큰과 전역 스타일

### 6.1 생성 파일

```text
src/styles/montage-tokens.css
src/styles/global.css
```

### 6.2 기본 토큰

```css
:root {
  --ce-primary: #0066ff;
  --ce-primary-strong: #005eeb;
  --ce-primary-heavy: #0054d1;
  --ce-primary-subtle: #eaf2fe;

  --ce-background: #ffffff;
  --ce-background-alt: #f7f7f8;
  --ce-surface-disabled: #f4f4f5;

  --ce-label-normal: #171719;
  --ce-label-neutral: rgba(46, 47, 51, 0.88);
  --ce-label-alternative: rgba(55, 56, 60, 0.61);
  --ce-label-assistive: rgba(55, 56, 60, 0.28);

  --ce-line-normal: rgba(112, 115, 124, 0.22);
  --ce-line-solid: #e1e2e4;

  --ce-positive: #16a34a;
  --ce-cautionary: #f97316;
  --ce-negative: #ef4444;

  --ce-radius-sm: 8px;
  --ce-radius-md: 12px;
  --ce-radius-lg: 16px;
  --ce-radius-pill: 9999px;
}
```

### 6.3 전역 규칙

- `box-sizing: border-box`
- body background는 `--ce-background-alt`
- 앱 루트는 최소 높이 `100vh`
- 숫자/날짜 주요 요소에는 `font-variant-numeric: tabular-nums`
- focus outline은 primary color로 보이게 유지

### 6.4 완료 조건

- 모든 페이지가 Pretendard/system font stack으로 렌더링된다.
- 주요 색상과 배경이 Montage 적용 가이드와 일치한다.
- 모바일과 데스크톱에서 텍스트가 겹치지 않는다.

## 7. Phase 4 - 데이터 타입

### 7.1 생성 파일

```text
src/types/notice.ts
src/types/guide.ts
src/types/loan.ts
```

### 7.2 구현 항목

`notice.ts`:

- `NoticeStatus`
- `HousingType`
- `SupplyType`
- `SubscriptionNotice`
- `UnitSummary`
- `NoticeFilter`
- `CalendarEventType`
- `CalendarEvent`

`guide.ts`:

- `GuideCategory`
- `Guide`
- `GuideSection`
- `ReferenceLink`

`loan.ts`:

- `LoanGuide`

### 7.3 완료 조건

- 타입은 설계 문서의 필드를 모두 포함한다.
- 선택 필드는 `?`로 표시한다.
- 날짜는 v1에서 `YYYY-MM-DD` 문자열로 유지한다.

## 8. Phase 5 - Seed Data

### 8.1 생성 파일

```text
src/data/notices.ts
src/data/guides.ts
src/data/loanGuides.ts
```

### 8.2 공고 seed data 조건

최소 6개 공고를 작성한다.

- `open` 2개
- `upcoming` 2개
- `closed` 1개
- `announced` 1개

지역은 서울, 경기, 인천을 포함한다. 기관은 청약홈, LH, SH, GH 중 3개 이상을 포함한다.

### 8.3 가이드 seed data 조건

최소 5개 가이드:

- 청약 기본
- 자격 확인
- 가점/순위
- 서류 준비
- 신청 절차

### 8.4 대출 가이드 seed data 조건

최소 3개:

- 전세자금 준비
- 디딤돌/버팀목 등 정책자금 확인
- 신용/소득 서류 체크

### 8.5 완료 조건

- 모든 seed data는 타입 검사를 통과한다.
- 모든 공고에 `sourceUrl`, `lastCheckedDate`가 있다.
- 주요 날짜와 금액 문구는 임의 반올림 없이 정확한 문자열로 쓴다.

## 9. Phase 6 - 서비스 계층

### 9.1 생성 파일

```text
src/services/noticeService.ts
src/services/calendarService.ts
src/services/guideService.ts
src/services/formatters.ts
```

### 9.2 구현 함수

`noticeService.ts`:

- `listNotices(filter?: NoticeFilter): SubscriptionNotice[]`
- `getNoticeById(id: string): SubscriptionNotice | undefined`
- `getFeaturedNotices(): SubscriptionNotice[]`
- `getRegions(): string[]`
- `parseNoticeFilter(searchParams: URLSearchParams): NoticeFilter`
- `createNoticeSearchParams(filter: NoticeFilter): URLSearchParams`

`calendarService.ts`:

- `getCalendarEvents(filter?: NoticeFilter): CalendarEvent[]`
- `getUpcomingEvents(limit?: number): CalendarEvent[]`

`guideService.ts`:

- `listGuides(): Guide[]`
- `getGuideById(id: string): Guide | undefined`
- `listLoanGuides(): LoanGuide[]`

`formatters.ts`:

- `formatKoreanDate(date: string): string`
- `getDaysUntil(date: string): number`
- `getNoticeStatusLabel(status: NoticeStatus): string`
- `getHousingTypeLabel(type: HousingType): string`
- `getSupplyTypeLabel(type: SupplyType): string`

### 9.3 완료 조건

- 필터는 검색어, 지역, 상태, 주택유형, 공급유형, 날짜 범위를 처리한다.
- 잘못된 쿼리 값은 `all` 또는 `undefined`로 보정한다.
- 일정 이벤트는 날짜 오름차순으로 정렬된다.

## 10. Phase 7 - 공통 UI 컴포넌트

### 10.1 생성 파일

```text
src/components/ui/Button.tsx
src/components/ui/Badge.tsx
src/components/ui/Card.tsx
src/components/ui/EmptyState.tsx
src/components/ui/TextField.tsx
src/components/ui/SegmentedTabs.tsx
src/components/ui/Skeleton.tsx
```

### 10.2 구현 규칙

`Button`:

- variants: `primary`, `secondary`, `text`, `danger`
- sizes: `medium`, `large`
- disabled와 loading 상태 지원

`Badge`:

- variants: `fill`, `weak`
- tones: `primary`, `neutral`, `positive`, `cautionary`, `negative`

`Card`:

- radius 12px
- border 또는 subtle shadow 중 하나만 사용
- nested card 금지

`EmptyState`:

- title, description, action 지원
- 아이콘은 lucide-react 사용

`TextField`:

- label 또는 `aria-label` 필수
- 검색 필드에서는 clear 버튼 선택 가능

### 10.3 완료 조건

- 컴포넌트는 접근 가능한 HTML 속성을 가진다.
- 버튼 텍스트가 모바일 폭에서도 넘치지 않는다.
- 색상은 `montage-tokens.css` 변수만 참조한다.

## 11. Phase 8 - 도메인 컴포넌트

### 11.1 생성 파일

```text
src/components/notice/NoticeCard.tsx
src/components/notice/NoticeFilterBar.tsx
src/components/notice/NoticeStatusBadge.tsx
src/components/notice/NoticeSummary.tsx
src/components/notice/ScheduleTimeline.tsx
src/components/notice/UnitSummaryTable.tsx
src/components/guide/GuideCard.tsx
src/components/guide/ChecklistBlock.tsx
src/components/loan/LoanGuideCard.tsx
```

### 11.2 구현 규칙

`NoticeCard`:

- 기관 badge, 상태 badge, 제목, 지역, 접수 기간, 자격 요약 표시
- 전체 카드 또는 내부 버튼으로 상세 이동 가능

`NoticeFilterBar`:

- 검색어, 지역, 상태, 주택유형, 공급유형 필터
- URL query와 양방향 동기화

`ScheduleTimeline`:

- 접수 시작, 접수 마감, 당첨 발표, 계약 기간 표시
- 없는 날짜는 섹션을 숨기거나 `확인 필요` 표시

`UnitSummaryTable`:

- 데스크톱은 table
- 모바일은 카드형 행으로 전환

### 11.3 완료 조건

- 공고 상세에 필요한 모든 정보를 구조화해서 보여준다.
- 공식 출처 링크에는 `target="_blank"`와 `rel="noopener noreferrer"`를 적용한다.
- 상태는 색상과 텍스트를 함께 사용한다.

## 12. Phase 9 - 페이지 구현

### 12.1 HomePage

구현 항목:

- 현재 접수 중 공고 요약
- 마감 임박 일정
- 청약 가이드 바로가기
- 대출 정보 바로가기

완료 조건:

- 첫 화면에서 청약이지의 목적이 명확하다.
- 모바일에서 주요 CTA가 한 화면에 자연스럽게 보인다.

### 12.2 SubscriptionsPage

구현 항목:

- 검색/필터 영역
- 결과 개수
- 공고 카드 목록
- 필터 결과 없음 상태

완료 조건:

- URL query로 필터 상태가 유지된다.
- 필터 초기화 버튼이 작동한다.

### 12.3 SubscriptionDetailPage

구현 항목:

- 공고 제목과 기관/상태 badge
- 일정 timeline
- 자격 요약
- 공급 정보
- 준비 서류
- 공식 출처 링크

완료 조건:

- 없는 ID로 접근하면 상세 없음 상태가 나온다.
- 날짜/금액/세대수는 tabular numeric 스타일을 사용한다.

### 12.4 CalendarPage

구현 항목:

- 월/전체 또는 예정/마감 segment
- 일정 리스트
- 공고 상세 이동 링크

완료 조건:

- `application-start`, `application-end`, `winner`, `contract` 이벤트가 구분된다.
- 날짜 오름차순 정렬이 유지된다.

### 12.5 GuidePage

구현 항목:

- 가이드 카테고리 목록
- 가이드 카드
- 체크리스트 블록

완료 조건:

- 초보자도 청약 절차를 순서대로 이해할 수 있다.
- 긴 설명은 카드나 accordion으로 나눈다.

### 12.6 LoanPage

구현 항목:

- 대출 준비 체크리스트
- 대출 가이드 카드
- 공식 확인 안내
- 금융 조언 아님 disclaimer

완료 조건:

- 개인 맞춤 추천처럼 보이는 문구가 없다.
- 각 정보에 공식 확인 경로가 있다.

## 13. Phase 10 - 테스트

### 13.1 단위 테스트

생성 파일:

```text
src/services/noticeService.test.ts
src/services/calendarService.test.ts
```

테스트 항목:

- 검색어 필터
- 지역 필터
- 상태 필터
- 날짜 범위 필터
- 잘못된 쿼리 값 보정
- 일정 이벤트 생성과 정렬

### 13.2 브라우저 검증

검증 viewport:

- 360px
- 375px
- 768px
- 1280px

검증 시나리오:

1. 홈에서 공고 상세로 이동한다.
2. 공고 목록에서 지역/상태 필터를 적용한다.
3. 필터 결과 없음 상태를 확인한다.
4. 상세에서 공식 링크가 새 탭 속성으로 렌더링되는지 확인한다.
5. 일정 페이지에서 날짜 순서가 맞는지 확인한다.
6. 모바일에서 하단 navigation과 본문이 겹치지 않는지 확인한다.

## 14. 접근성 체크리스트

- [ ] 모든 페이지에 `main` landmark가 있다.
- [ ] navigation에는 `aria-label`이 있다.
- [ ] 검색 input에는 label 또는 `aria-label`이 있다.
- [ ] icon-only button에는 `aria-label`이 있다.
- [ ] focus outline이 보인다.
- [ ] 색상만으로 상태를 구분하지 않는다.
- [ ] 외부 링크 텍스트가 목적지를 설명한다.
- [ ] 모바일에서 터치 타깃은 최소 44px 이상이다.

## 15. 콘텐츠 체크리스트

- [ ] 모든 공고에 공식 출처 URL이 있다.
- [ ] 모든 공고에 확인일이 있다.
- [ ] 금액은 축약하지 않는다.
- [ ] 날짜는 `YYYY.MM.DD` 또는 한국어 날짜로 명확히 표시한다.
- [ ] 오류 문구는 구체적이고 행동 가능하다.
- [ ] 대출 페이지는 개인 금융 조언처럼 보이지 않는다.
- [ ] `데이터가 없습니다`, `문제가 발생했습니다` 같은 일반 문구를 쓰지 않는다.

## 16. 완료 기준

Do 단계 완료로 인정하려면 다음 조건을 만족해야 한다.

- [ ] 프로젝트가 실행 가능하다.
- [ ] 설계된 6개 주요 페이지가 구현되어 있다.
- [ ] seed data 기반 공고 목록/상세/필터가 작동한다.
- [ ] 청약 일정 이벤트가 표시된다.
- [ ] 가이드와 대출 정보 페이지가 렌더링된다.
- [ ] Montage 토큰 또는 Montage-inspired CSS 변수가 적용되어 있다.
- [ ] 기본 테스트 또는 수동 검증 결과가 문서화되어 있다.
- [ ] `npm run build`가 성공한다.

## 17. 다음 PDCA 단계

구현이 끝나면 Check 단계로 이동한다.

```text
$pdca analyze cheongyakeasy-responsive-site
```

분석 단계에서는 이 Do 문서와 Design 문서를 기준으로 실제 코드 구현률을 계산한다.

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-06-03 | 최초 Do 구현 가이드 작성 | Codex |
