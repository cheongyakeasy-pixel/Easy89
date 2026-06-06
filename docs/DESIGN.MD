# 청약이지 디자인 시스템

> 기준 영감: WantedDev / Montage Web Design System  
> 대상: CheongyakEasy 주택청약 반응형 웹 사이트  
> 작성일: 2026-06-03  
> 상태: Draft

---

## 1. Visual Theme & Atmosphere

청약이지는 주택청약 공고와 일정, 자격, 대출 준비 정보를 빠르게 이해하도록 돕는 정보형 서비스다. 화면은 구직 플랫폼처럼 명확하고 실용적이어야 하며, 청약/금융 정보가 가진 무게 때문에 과장된 장식보다 정돈된 구조와 신뢰감이 우선이다.

WantedDev의 공개 디자인 자산에서는 두 축을 가져온다. 첫째, Montage Web Design System의 제품형 UI 구조다. Montage는 `@wanteddev/wds`, `@wanteddev/wds-theme`, `@wanteddev/wds-icon` 등으로 구성된 웹 디자인 시스템이며, 토큰과 컴포넌트 중심 설계를 지향한다. 둘째, Wanted Sans의 타이포그래피 정신이다. Wanted Sans는 기하학적인 인상과 읽기 쉬운 형태를 동시에 추구하는 글꼴로, 제목과 본문 모두에 적합한 산세리프 계열이다.

청약이지는 이를 주택청약 도메인에 맞춰 변환한다. 화면의 첫인상은 밝은 배경, 강한 blue primary, cool neutral 텍스트, 단정한 카드와 리스트로 구성한다. 사용자는 서비스가 광고나 커뮤니티가 아니라, 공식 정보를 확인하기 전 핵심을 정리해 주는 실무형 도구라고 느껴야 한다.

핵심 특성:

- 밝고 깨끗한 흰색/쿨 뉴트럴 기반 화면
- `#0066FF` 계열 primary blue를 주요 행동과 선택 상태에만 사용
- Wanted Sans 또는 Pretendard 기반의 한국어 친화 타이포그래피
- 카드, 리스트, 필터, 탭 중심의 정보형 레이아웃
- 과한 장식, 과한 그림자, 마케팅식 히어로 구성 지양
- 모바일 우선, 데스크톱 확장형 구조

## 2. Color Palette & Roles

### Primary

| 역할 | Token | 값 | 사용처 |
|------|-------|----|--------|
| Primary | `blue.50` | `#0066FF` | 주요 CTA, 활성 필터, 선택 상태 |
| Primary strong | `blue.45` | `#005EEB` | hover, pressed |
| Primary heavy | `blue.40` | `#0054D1` | 고대비 강조, active text |
| Primary light | `blue.95` | `#EAF2FE` | 약한 선택 배경, 안내 배경 |
| Primary pale | `blue.99` | `#F7FBFF` | 아주 약한 정보 배경 |

### Neutral

| 역할 | Token | 값 | 사용처 |
|------|-------|----|--------|
| Text strong | `coolNeutral.10` | `#171719` | 제목, 주요 본문 |
| Text normal | `coolNeutral.22` | `#2E2F33` | 강조 본문 |
| Text secondary | `coolNeutral.50` | `#70737C` | 보조 설명, 메타 |
| Text disabled | `coolNeutral.70` | `#989BA2` | 비활성 텍스트 |
| Border strong | `coolNeutral.96` | `#E1E2E4` | 기본 경계 |
| Border weak | `coolNeutral.97` | `#EAEBEC` | 약한 구분선 |
| Surface disabled | `coolNeutral.98` | `#F4F4F5` | 비활성 배경, skeleton |
| Background alt | `coolNeutral.99` | `#F7F7F8` | 페이지 배경 |
| White | `common.100` | `#FFFFFF` | 카드, 기본 surface |
| Black | `common.0` | `#000000` | 제한적 고대비 |

### Semantic

| 역할 | 값 | 사용처 |
|------|----|--------|
| Positive | `#16A34A` | 접수 가능, 완료, 긍정 상태 |
| Cautionary | `#F97316` | 마감 임박, 확인 필요 |
| Negative | `#EF4444` | 마감, 오류, 위험 |
| Info | `#0066FF` | 정보성 액션, 선택 상태 |

### CSS Variables

```css
:root {
  --ce-primary: #0066ff;
  --ce-primary-strong: #005eeb;
  --ce-primary-heavy: #0054d1;
  --ce-primary-subtle: #eaf2fe;
  --ce-primary-pale: #f7fbff;

  --ce-background: #ffffff;
  --ce-background-alt: #f7f7f8;
  --ce-surface-disabled: #f4f4f5;

  --ce-label-normal: #171719;
  --ce-label-strong: #2e2f33;
  --ce-label-neutral: #70737c;
  --ce-label-assistive: #989ba2;

  --ce-line-solid: #e1e2e4;
  --ce-line-weak: #eaebec;

  --ce-positive: #16a34a;
  --ce-cautionary: #f97316;
  --ce-negative: #ef4444;
}
```

## 3. Typography Rules

### Font Family

WantedDev 생태계의 글꼴 자산을 우선 고려한다.

```css
font-family:
  "Wanted Sans",
  Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  "Apple SD Gothic Neo",
  "Noto Sans KR",
  sans-serif;
```

Montage WDS를 직접 적용하는 경우에는 WDS README 기준으로 Pretendard 로드를 우선한다. Wanted Sans를 자체 로드할 수 있는 경우에는 청약이지의 브랜드 폰트로 Wanted Sans를 사용할 수 있다.

### Type Scale

| 역할 | 크기 | 굵기 | 행간 | 사용처 |
|------|------|------|------|--------|
| Display | 30px | 700 | 40px | 홈 주요 문장, 핵심 요약 |
| Page Title | 26px | 700 | 36px | 페이지 제목 |
| Section Title | 22px | 700 | 30px | 주요 섹션 |
| Card Title | 17px | 600 | 24px | 공고 카드 제목 |
| Body Large | 16px | 400 | 26px | 설명 본문 |
| Body | 15px | 400 | 24px | 일반 본문 |
| Body Small | 14px | 400 | 22px | 보조 설명 |
| Caption | 12px | 400 | 18px | 확인일, 출처, 세부 메타 |
| Data | 16px | 600 | 24px | 날짜, 세대수, 금액 |

### Numeric Rules

```css
.number,
.date,
.amount {
  font-variant-numeric: tabular-nums;
}
```

청약 일정, 공급 세대수, 보증금, 임대료, 분양가 등은 축약하지 않고 원문 값에 가깝게 표시한다. `약 1.2억`처럼 반올림한 표현은 주요 화면에서 사용하지 않는다.

## 4. Component Stylings

### Button

| Variant | 배경 | 텍스트 | 높이 | Radius | 사용처 |
|---------|------|--------|------|--------|--------|
| Primary | `#0066FF` | `#FFFFFF` | 48px 또는 56px | 12px | 주요 CTA |
| Secondary | `#EAF2FE` | `#0054D1` | 48px | 12px | 보조 액션 |
| Neutral | `#F4F4F5` | `#2E2F33` | 48px | 12px | 필터 초기화, 취소 |
| Text | transparent | `#0066FF` | 40px | 8px | 약한 링크형 액션 |
| Danger | `#EF4444` | `#FFFFFF` | 48px | 12px | 제한적 오류/삭제 액션 |

규칙:

- 한 화면의 primary CTA는 하나만 둔다.
- 공식 신청 대행처럼 보이지 않도록 `신청하기`보다 `공식 공고 보기`를 우선 사용한다.
- 아이콘 버튼은 `aria-label`을 반드시 가진다.

### Text Field / Search Field

- 배경: `#FFFFFF`
- Border: `1px solid #E1E2E4`
- Focus border: `#0066FF`
- Radius: 12px
- 높이: 48px
- Placeholder: `#989BA2`
- 검색 필드는 검색 아이콘과 clear 버튼을 지원한다.

### Card

- 배경: `#FFFFFF`
- Border: `1px solid #EAEBEC`
- Radius: 16px
- Padding: 16px mobile, 20px desktop
- Shadow: 기본 없음. 필요한 경우 `0 1px 2px rgba(0,0,0,0.04)`

카드는 공고, 가이드, 대출 정보처럼 반복되는 단위에만 사용한다. 카드 안에 카드를 중첩하지 않는다.

### Badge

| Tone | 배경 | 텍스트 | 사용처 |
|------|------|--------|--------|
| Primary | `#EAF2FE` | `#0054D1` | 기관, 선택 상태 |
| Positive | `rgba(22,163,74,0.12)` | `#16A34A` | 접수 가능 |
| Cautionary | `rgba(249,115,22,0.12)` | `#F97316` | 마감 임박 |
| Negative | `rgba(239,68,68,0.12)` | `#EF4444` | 마감, 오류 |
| Neutral | `#F4F4F5` | `#70737C` | 메타 정보 |

### Filter / Chip

- 선택 전: white background, `#E1E2E4` border
- 선택 후: `#EAF2FE` background, `#0066FF` text
- Radius: pill
- 모바일에서는 horizontal scroll 허용
- 필터 상태는 URL query와 동기화한다.

### Navigation

모바일:

- Bottom navigation 사용
- 높이 64px 이상
- active icon/text는 `#0066FF`
- inactive text는 `#70737C`
- safe area inset 고려
- 현재 항목은 홈, 리스트, 캘린더, 뉴스, 가이드, 대출이다. 6분할에서도 라벨이 줄바꿈 없이 읽혀야 한다.

데스크톱:

- Top navigation 사용
- 중앙 컨테이너 최대 폭 1120px
- active route는 primary text 또는 underline으로 표시
- 현재 항목은 홈, 청약리스트, 캘린더, 부동산뉴스, 가이드, 대출 정보다.

### Table

공급 정보와 대출 조건 표에 사용한다.

- Header background: `#F7F7F8`
- Border: `#EAEBEC`
- Text: `#171719`
- Numeric: tabular nums
- 모바일에서는 행 단위 카드형 정보로 전환 가능

### Empty State

문구는 짧고 다음 행동이 분명해야 한다.

- 필터 결과 없음: `조건에 맞는 공고가 없어요.`
- 상세 없음: `공고를 찾을 수 없어요.`
- 보조 액션: `필터 초기화`, `공고 목록 보기`

### News Card

부동산뉴스 카드는 좌우형 콘텐츠 카드로 구성한다.

- 왼쪽: 88~96px 썸네일 고정 영역
- 오른쪽: 제목, 설명, 언론사/시간 메타
- 이미지가 없을 때도 왼쪽 썸네일 placeholder 영역을 유지한다.
- 제목은 2줄까지 자연스럽게 읽혀야 하며, 설명은 2줄 clamp를 사용한다.
- `1분마다 자동 업데이트`, `최근 갱신` 같은 내부 갱신 메타는 화면에 노출하지 않는다.
- 외부 기사 링크는 새 탭으로 열며 `rel="noopener noreferrer"`를 사용한다.

### Calendar Preview

청약리스트 페이지 최상단에는 월간 캘린더 preview를 둔다.

- 접수 시작/마감/당첨 발표/계약 일정을 dot과 짧은 라벨로 표시한다.
- 날짜 클릭 시 리스트를 해당 날짜 기준으로 필터링한다.
- 모바일에서도 7열 grid가 유지되어야 하며, 셀 내부 텍스트가 레이아웃을 밀어내지 않아야 한다.

### Kakao Map / Share

상세 페이지 하단에는 위치 지도와 공유 액션을 제공한다.

- 지도는 `address`를 우선 사용하고, 없으면 `region` + `district`를 사용한다.
- SDK key가 없거나 도메인 설정이 맞지 않아도 `카카오맵 열기` 외부 링크는 유지한다.
- 카카오톡 공유 버튼은 `공식 공고 보기` 아래 보조 액션으로 둔다.
- Kakao Developers Web 플랫폼 도메인 등록이 필요하다.

## 5. Layout Principles

### Spacing

Montage spacing 단계에 맞춰 사용한다.

```text
0, 0.5, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80
```

권장 적용:

| 용도 | 값 |
|------|----|
| 모바일 좌우 여백 | 20px |
| 카드 내부 여백 | 16px 또는 20px |
| 카드 간격 | 12px 또는 16px |
| 섹션 간격 | 32px |
| 큰 페이지 섹션 간격 | 48px |
| 리스트 행 최소 높이 | 64px |
| 주요 버튼 높이 | 48px 또는 56px |

### Grid

- 모바일: 1열
- 태블릿: 1~2열
- 데스크톱: 최대 1120px 컨테이너, 필요 시 2열
- 공고 목록은 데스크톱에서 2열 카드 그리드 가능
- 공고 상세는 본문과 보조 정보 aside를 분리할 수 있다.

### Breakpoints

| Token | Width | 청약이지 적용 |
|-------|-------|---------------|
| xs | 0px | 모바일 기본 |
| sm | 768px | 태블릿, 2열 일부 허용 |
| md | 992px | 데스크톱 nav, 상세 보조 패널 |
| lg | 1200px | 1120px 컨테이너 |
| xl | 1600px | 컨테이너 과확장 금지 |

## 6. Depth & Elevation

청약이지는 깊이감을 최소화한다. 정보의 신뢰는 그림자보다 정돈된 간격, 명확한 경계, 안정적인 타이포그래피에서 나온다.

| Level | 처리 | 사용처 |
|-------|------|--------|
| 0 | shadow 없음 | 페이지, 일반 섹션 |
| 1 | `0 1px 2px rgba(0,0,0,0.04)` | 카드 hover, 약한 surface |
| 2 | `0 4px 12px rgba(0,0,0,0.08)` | dropdown, popover |
| 3 | `0 8px 24px rgba(0,0,0,0.12)` | modal, bottom sheet |

규칙:

- 기본 카드는 border 중심으로 표현한다.
- 그림자는 인터랙션 또는 overlay에만 제한적으로 사용한다.
- colored shadow는 사용하지 않는다.

## 7. Do's and Don'ts

### Do

- WantedDev/Montage의 blue primary와 cool neutral 체계를 사용한다.
- Wanted Sans 또는 Pretendard 기반의 한국어 가독성을 우선한다.
- 공고 상태는 색상과 텍스트를 함께 표시한다.
- 공식 출처 링크와 확인일을 명확히 표시한다.
- 날짜, 금액, 세대수는 tabular numeric으로 정렬한다.
- 모바일에서는 한 화면에 하나의 주요 행동만 강조한다.
- 필터 상태를 URL query와 동기화한다.

### Don't

- 청약 신청을 대행하는 것처럼 보이는 CTA를 쓰지 않는다.
- 개인별 자격 판정이나 대출 승인 가능성을 단정하지 않는다.
- 공고 금액과 날짜를 임의로 축약하지 않는다.
- 카드 안에 카드를 중첩하지 않는다.
- primary blue를 장식용으로 남발하지 않는다.
- 이모지를 상태 표시나 UI 라벨에 사용하지 않는다.
- `데이터가 없습니다`, `문제가 발생했습니다`처럼 막연한 문구만 보여주지 않는다.

## 8. Responsive Behavior

### Mobile

- 360px부터 주요 화면이 깨지지 않아야 한다.
- 하단 navigation을 사용한다.
- 필터 chip은 가로 스크롤을 허용한다.
- 테이블은 카드형 행으로 변환한다.
- 주요 CTA는 full-width가 기본이다.

### Tablet

- 목록은 2열 전환을 검토한다.
- 필터 영역은 한 줄 또는 두 줄로 정리한다.
- 상세 페이지는 아직 단일 컬럼을 유지할 수 있다.

### Desktop

- 상단 navigation을 사용한다.
- 최대 1120px 컨테이너를 유지한다.
- 공고 목록은 2열 카드 그리드를 사용할 수 있다.
- 상세 페이지는 본문과 aside를 나눌 수 있다.

## 9. Agent Prompt Guide

### 빠른 색상 참조

- Primary CTA: `#0066FF`
- Primary hover: `#005EEB`
- Primary subtle: `#EAF2FE`
- Page background: `#F7F7F8`
- Card background: `#FFFFFF`
- Main text: `#171719`
- Secondary text: `#70737C`
- Border: `#E1E2E4`
- Positive: `#16A34A`
- Cautionary: `#F97316`
- Negative: `#EF4444`

### 컴포넌트 프롬프트 예시

- 공고 카드: white background, 16px radius, 16px padding, 1px `#EAEBEC` border. 상단에 기관 badge와 상태 badge, 제목 17px/600, 지역과 접수 기간 14px/400, 날짜는 tabular nums.
- 필터 바: 검색 필드 48px height, 지역 select, 상태 segmented control, 선택 chip은 `#EAF2FE` background와 `#0066FF` text.
- 공식 링크 버튼: primary button, `#0066FF` background, white text, 48px height, 12px radius, label은 `공식 공고 보기`.
- 빈 상태: centered block, title 17px/600 `#171719`, description 14px `#70737C`, secondary button `필터 초기화`.
- 모바일 하단 navigation: 64px height, white background, top border `#EAEBEC`, active `#0066FF`, inactive `#70737C`.

## 10. Voice & Tone

청약이지는 차분하고 직접적인 한국어를 쓴다. 사용자가 해야 할 확인 행동을 분명히 알려주되, 개인별 판단을 대신하지 않는다.

| 상황 | 톤 |
|------|----|
| CTA | 짧은 명사형 또는 동사형: `공식 공고 보기`, `필터 적용` |
| 안내 | 한 문장으로 핵심만 설명 |
| 오류 | 원인 또는 다음 행동을 포함 |
| 빈 상태 | 이유 한 줄 + 복귀 액션 |
| 대출 정보 | 확인/준비/주의 중심, 추천/보장 표현 금지 |
| 공식 출처 | 출처와 확인일을 함께 표시 |

금지 문구:

- `문제가 발생했습니다`
- `데이터가 없습니다`
- `무조건 신청 가능`
- `대출 승인 가능`
- `최저금리 보장`

## 11. Iconography & SVG Guidelines

- 아이콘 라이브러리는 하나만 사용한다.
- 구현 단계에서는 `lucide-react`를 우선 사용한다.
- Montage WDS를 직접 설치하면 `@wanteddev/wds-icon` 전환을 검토한다.
- 아이콘은 inline SVG 컴포넌트로 사용한다.
- 색상은 `currentColor`를 따른다.
- 버튼 아이콘은 18px, standalone icon은 24px를 기본으로 한다.
- icon-only button에는 반드시 `aria-label`을 둔다.

## 12. Document Policies

- UI 문서와 UI 문자열에 이모지를 사용하지 않는다.
- 공고, 금융, 대출 관련 문구는 정확성과 출처를 우선한다.
- 색상, spacing, breakpoint 값은 이 문서의 토큰을 우선 참조한다.
- 실제 코드에서 Montage 패키지를 직접 쓰지 못하더라도 동일한 시각 토큰을 CSS 변수로 재현한다.

## 13. Sources

- WantedDev GitHub: https://github.com/wanteddev
- Montage Web: https://github.com/wanteddev/montage-web
- Montage Documentation: https://montage.wanted.co.kr
- WDS package: https://github.com/wanteddev/montage-web/tree/main/packages/wds
- WDS Theme tokens: https://github.com/wanteddev/montage-web/tree/main/packages/wds-theme
- Wanted Sans: https://github.com/wanteddev/wanted-sans
