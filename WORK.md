# 청약이지 작업 기록
1. 완료: 빈 프로젝트 확인, 참고 서비스 조사, Toss 디자인 계약 작성.
2. 완료: 지도, 검색, 청약 필터, 단지 상세, 일정, 기기 내 관심 목록 구현.
3. 완료: 빌드와 타입 검사. 실제 브라우저 검색/필터/관심 저장/복원/지도 확대축소/상세/월 전환 검증. 모바일 375, 태블릿 768, 데스크톱 1280 가로 넘침 없음. WebMCP 유효/잘못된 입력 확인. 브라우저 오류 없음.
4. 변경: 사용자가 GitHub와 Vercel 연결을 요청하여 기존 Sites 게시 경로를 대체.
5. 완료: 표준 Next.js 실행 설정, Vercel 프레임워크 설정. Webpack 배포 빌드와 타입 검사 통과.
6. 완료: Vercel 인증 갱신 및 jhon-s-projects15/cheongyakeasy에 로컬 폴더 연결. GitHub cheongyakeasy-pixel/Easy89 main 브랜치는 이 프로젝트에 이미 연결되어 있음. 기존 운영 배포 READY와 https://cheongyakeasy.vercel.app 화면 확인.
   보류: 새 지도 앱의 운영 배포. 원격 저장소의 기존 Vite 앱과 다른 코드이며 사용자 버전 선택은 아직 없음. Vercel 기존 프레임워크 설정은 Vite로 유지.
7. 참고: Turbopack은 이 실행 환경의 내부 포트 권한 제한으로 실패하여 Webpack 빌드를 사용.

## 범위와 한계
- 실제 지도 타일 + 가상 단지 예시. 실제 공고 API·계정·푸시·네이티브 패키지는 미연동.
- 관심 단지는 이 기기 localStorage에 저장.
- 사이트 플러그인 스크립트가 세션 중 파일시스템에서 사라져, 프로젝트 기존 build 명령과 표준 tar로 대체.
- IDE Biome LSP 미설치; 타입 검사로 대체. React Doctor 오류는 미사용 스타터 carousel에 한정됨.
- 실제 브라우저 스크린샷: /tmp/cheongyak-qa. Lighthouse 정량 점수 미측정.

## 새 지도 앱 미리보기
Vercel 미리보기: https://cheongyakeasy-ct39s16ko-jhon-s-projects15.vercel.app
배포 ID: dpl_EcCeg8rwMKxHiUXBn8jLUt1mzdmK. READY, 원격 빌드와 타입 검사 통과, 인증된 HTTP 응답 200 및 지도 앱 콘텐츠 확인. 브라우저는 Vercel 로그인 보호 화면으로 이동하여 원격 상호작용 검증은 미완료. 기존 운영 사이트는 유지. GitHub CLI 계정 인증과 저장소 ADMIN 권한 확인 완료. 새 지도 앱 브랜치는 map-platform-preview이며 기존 main은 유지.
