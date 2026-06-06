# Design.md - CheongyakEasy Current Design Notes

상세 디자인 시스템은 [docs/DESIGN.MD](docs/DESIGN.MD)를 따른다. 이 문서는 현재 구현된 화면과 최근 변경된 UI 규칙을 빠르게 확인하기 위한 루트 요약이다.

## 1. Design System

- 기준 영감: WantedDev / Montage Web Design System
- 구현 방식: CSS variables + 일반 CSS
- 아이콘: `lucide-react`
- 폰트: Wanted Sans 또는 Pretendard 우선, 시스템 한국어 폰트 fallback
- 색상 기준:
  - Primary: `#0066FF`
  - Primary strong: `#005EEB`
  - Primary subtle: `#EAF2FE`
  - Page background: `#F7F7F8`
  - Card background: `#FFFFFF`
  - Main text: `#171719`
  - Secondary text: `#70737C`
  - Border: `#E1E2E4`

## 2. Navigation

Desktop top navigation:

- 홈
- 청약리스트
- 캘린더
- 부동산뉴스
- 가이드
- 대출 정보

Mobile bottom navigation:

- 홈
- 리스트
- 캘린더
- 뉴스
- 가이드
- 대출

## 3. 구현된 주요 화면

| Route | 화면 규칙 |
|------|-----------|
| `/` | 홈. 주요 공고, 마감 임박 일정, 대출 진입점, 부동산뉴스 compact list |
| `/subscriptions` | 상단 캘린더 preview + 청약리스트 필터/검색 |
| `/subscription-detail/:id` | 공고 상세, 공식 링크, 카카오톡 공유, 하단 Kakao 위치 지도 |
| `/calendar` | 일정 목록 |
| `/news` | 네이버 경제/부동산 뉴스 list |
| `/guide` | 청약 가이드 |
| `/loan` | 대출/자금 준비 정보 |

## 4. News Card Layout

부동산뉴스 콘텐츠 카드는 좌우형이다.

- 왼쪽: 썸네일 고정 영역
- 오른쪽: 타이틀, 디스크립션, 언론사/시간
- 이미지가 없을 때도 왼쪽 썸네일 영역을 유지한다.
- `1분마다 자동 업데이트`, `최근 갱신` 문구는 화면에 노출하지 않는다.
- 데이터 갱신은 내부적으로 60초 주기를 유지한다.

## 5. Calendar Preview

청약리스트 페이지 최상단에 캘린더를 둔다.

- 월 단위 캘린더
- 접수 시작/마감/당첨/계약 dot 표시
- 날짜 클릭 시 해당 날짜의 공고로 리스트 필터링
- 모바일에서도 셀 크기가 급격히 흔들리지 않도록 고정 grid를 유지한다.

## 6. Kakao Components

상세 페이지 하단:

- `KakaoLocationMap`: 주소 기반 지도
- `KakaoShareButton`: 카카오톡 공유
- API key가 없거나 도메인 설정이 안 된 경우에도 `카카오맵 열기` 외부 링크는 제공한다.

필요 환경변수:

```text
VITE_KAKAO_JAVASCRIPT_KEY
VITE_KAKAO_MAP_APP_KEY
```

## 7. Supabase UI Rule

현재 Supabase는 클라이언트 연결 준비 상태이며, 아직 사용자 UI나 DB-backed 화면의 시각 패턴은 별도로 확정하지 않았다.

향후 DB-backed 화면을 만들 때:

- 로딩은 skeleton 사용
- 빈 상태는 이유와 다음 행동을 한 문장으로 제시
- 오류는 구체적이고 복구 가능한 문구 사용
- RLS나 인증 관련 실패를 사용자에게 내부 용어 그대로 노출하지 않음

## 8. 금지 사항

- 카드 안에 카드를 중첩하지 않는다.
- primary blue를 장식용으로 남발하지 않는다.
- 이모지를 UI 라벨/상태 표시로 사용하지 않는다.
- `데이터가 없습니다`, `문제가 발생했습니다`처럼 막연한 문구만 단독 사용하지 않는다.
- 청약 신청 대행, 자격 확정, 대출 승인 보장처럼 보이는 CTA를 쓰지 않는다.
