# 청약이지 디자인 시스템

## 1. Visual Theme & Atmosphere
사용자 제공 Toss 지침을 시각 계약으로 사용한다. 호갱노노는 검색, 지도, 목록, 상세의 정보구조 참고이며 픽셀 복제가 아니다. 청약 탐색 작업 화면으로 바로 진입한다.
## 2. Color Palette & Roles
Primitive: blue500 #3182f6, blue600 #2272eb, blue50 #e8f3ff, white #ffffff, grey50 #f9fafb, grey100 #f2f4f6, grey200 #e5e8eb, grey400 #b0b8c1, grey500 #8b95a1, grey600 #6b7684, grey700 #4e5968, grey800 #333d4b, grey900 #191f28, green500 #03b26c, red500 #f04452.
Semantic: primary blue500, primary-hover blue600, selection blue50, foreground grey900, body grey700, muted grey600, border grey200, surface white, background grey50. Blue indicates interactive actions. Green open status and red ending status always include text.
## 3. Typography Rules
Toss Product Sans, Tossface, SF Pro KR, SF Pro Display, -apple-system, BlinkMacSystemFont, Basier Square, Apple SD Gothic Neo, Roboto, Noto Sans KR, sans-serif. System fallback when proprietary font absent. No unauthorized font redistribution.
Sizes 12/13/14/16/17/20/22/26/30px; weights 400/600/700. Line-height 1.5. Exact amounts use tabular-nums and 700. No emojis.
## 4. Component Stylings
Button: installed shadcn primitive, primary/secondary/ghost; 40px desktop, 48px mobile; radii 8/12/14/16. Input: grey50, 14px radius, visible blue focus. Sheet: installed Radix sheet, 480px maximum, accessible title/description/close and focus trapping. Tabs: installed Radix tabs. Badges: weak blue/green/grey with textual status. Compact list cards use dividers, no heavy shadows.
## 5. Layout Principles
8px base; 4/8/12/16/20/24/32/40/48 spacing. Header 72px, nav rail 88px, results sidebar 384px, map takes remainder. Mobile below 768px uses bottom navigation and map/list switch. No forced 480px desktop width: map exploration requires simultaneous geographical context. Reusable ApartmentCard, StatusBadge, map marker and detail sheet share tokens.
## 6. Depth & Elevation
Flat page and list. Floating map controls use single-layer 0 2px 8px rgba(0,0,0,.08). Overlay rgba(2,9,19,.5). No colored shadows.
## 7. Do's and Don'ts
One primary action per detail. Keep exact financial values. Never present sample announcements as current verified offers. All content labeled demonstration data with fictional names. Local favorites explicitly labeled this device. Link to official 청약홈 for real notices.
## 8. Responsive Behavior
375/768/1280 targets. At mobile, list and map alternate, fixed bottom nav with safe area. Scroll confined to results on desktop. Sheet full-width on small screens. Touch targets >=44px. Focus ring, semantic landmarks, labeled inputs, reduced motion.
## 9. Agent Prompt Guide
Interaction transition 150ms, sheet 250ms, cubic-bezier(.4,0,.2,1). Reduced motion sets transitions and animations to 0ms. Map is real geographic tiles with drag and zoom, no decorative fake geography. Markers correspond to fictional development examples at district coordinates.

## Personas and validation
첫 청약 사용자: 지역 검색 → 상태 필터 → 일정 확인. 재방문 사용자: 관심 목록 → 상세 열기. 작은 화면 사용자: 지도/목록 전환 → 상세 닫기. 모든 흐름 키보드 및 실제 브라우저 확인.

## Delivery scope
Interactive responsive web MVP. Real official data ingestion, account synchronization, push notifications and app-store native packages require a subsequent integration stage; this interface must not imply those are active.
