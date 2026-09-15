# 청약이지

호갱노노의 지도 탐색 구조와 Toss 스타일을 바탕으로 만든 반응형 청약 탐색 웹 MVP입니다.

## 구현된 기능
- 서울 지도 이동, 확대·축소, 지도 마커에서 단지 상세 보기
- 지역·단지 검색, 공급 유형·분양가·접수 상태 필터, 가격·일정 정렬
- 월별 청약 일정과 단지 상세 연결
- 기기 내 관심 단지 저장 및 새로고침 후 복원
- 모바일 지도/목록 전환, 키보드 탐색, 접근성 상세 패널
- 선택적 브라우저 WebMCP 검색 연동

## 데이터 범위
단지명·위치·가격·공급 세대수·청약 일정은 모두 가상 예시입니다. 실제 청약 공급과 자격은 청약홈 공고로 확인해야 합니다. 지도는 OpenStreetMap 타일을 사용하고 출처를 표시합니다. 상용 서비스 출시에 앞서 적절한 지도 제공 계약과 트래픽 정책 검토가 필요합니다.

회원 계정, 기기간 동기화, 실시간 공고 수집, 푸시 알림, iOS/Android 앱스토어 패키지는 아직 포함하지 않습니다. 현재 결과물은 모바일에서도 동작하는 웹앱입니다.

## 로컬 실행
Node 22.x. `npm ci`, `npm run dev`. `npm run build`로 배포 빌드, `npm start -- --port 4173`으로 로컬 배포용 검증. `npx tsc --noEmit`으로 타입 검사.

## 구조
`components/explorer.tsx`: 탐색 상태와 주요 탭. `geographic-map.tsx`: 지리 좌표 기반 지도. `detail-sheet.tsx`: 상세 패널. `apartment-card.tsx`: 재사용 목록 카드. `lib/apartments.ts`: 타입과 예시 데이터. `DESIGN.md`: 디자인 계약.

## 검증
배포용 서버의 실제 브라우저에서 검색, 필터, 일정 월 전환, 관심 저장/복원, 상세 열기/닫기, 지도 확대/축소, 모바일 전환, WebMCP 유효/잘못된 입력을 검증했습니다. 375/768/1280 화면 가로 넘침이 없습니다. 빌드와 타입 검사를 통과했습니다.
React Doctor는 사용하지 않는 스타터 carousel 구독 정리 오류 1건과 기존 UI 프리미티브 등의 경고를 보고합니다. 새 제품 컴포넌트에는 오류가 없습니다. Lighthouse 정량 성능 점수는 미측정입니다.

## Vercel 배포
이 디렉터리를 저장소 루트로 사용합니다. Vercel의 Framework Preset은 Next.js이며 `vercel.json`에 지정되어 있습니다. 설치는 `npm ci`, 빌드는 `npm run build`를 사용합니다. 현재 데모에는 환경 변수가 필요하지 않습니다. GitHub 저장소를 Vercel 프로젝트에 연결한 뒤 main 브랜치 변경으로 자동 배포할 수 있습니다. Vercel 인증과 로컬 프로젝트 연결은 완료했습니다. 기존 `jhon-s-projects15/cheongyakeasy` 프로젝트는 GitHub `cheongyakeasy-pixel/Easy89`의 main 브랜치에 연결되어 있으며, 운영 사이트는 https://cheongyakeasy.vercel.app 입니다. 기존 원격 앱은 Vite이고 이 로컬 지도 앱은 Next.js이므로, 버전 선택과 프레임워크 전환 전에는 로컬 앱을 운영 배포하지 않습니다.

새 지도 앱의 [Vercel 미리보기](https://cheongyakeasy-ct39s16ko-jhon-s-projects15.vercel.app)를 배포했습니다. Vercel 로그인이 필요합니다. 기존 운영 사이트와 별개이며 GitHub 인증을 완료했으며 새 지도 앱은 `map-platform-preview` 브랜치에서 관리합니다.
