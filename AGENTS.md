# CheongyakEasy Agent Entry

이 저장소의 작업 지침은 [docs/AGENTS.md](docs/AGENTS.md)에 정리되어 있습니다.

작업 전 우선순위:

1. [docs/AGENTS.md](docs/AGENTS.md)
2. [docs/CODEX_CONTEXT.md](docs/CODEX_CONTEXT.md)
3. [Skills.md](Skills.md)
4. [Hooks.md](Hooks.md)
5. [Design.md](Design.md)
6. [docs/01-plan/features/cheongyakeasy-responsive-site.plan.md](docs/01-plan/features/cheongyakeasy-responsive-site.plan.md)
7. [docs/02-design/features/cheongyakeasy-responsive-site.design.md](docs/02-design/features/cheongyakeasy-responsive-site.design.md)
8. [docs/02-design/features/cheongyakeasy-responsive-site.do.md](docs/02-design/features/cheongyakeasy-responsive-site.do.md)
9. [docs/DESIGN.MD](docs/DESIGN.MD)

현재 프로젝트는 Vite + React + TypeScript 기반 청약이지 반응형 웹앱입니다. Vercel 프로덕션 배포, Kakao 지도/공유, 네이버 부동산뉴스 API 프록시, Supabase 클라이언트 설정이 반영되어 있습니다.

중요 운영 메모:

- 발급 키 원문은 문서에 남기지 않습니다. 환경변수 이름만 기록합니다.
- 로컬 Supabase는 Docker Desktop이 필요합니다.
- gstack은 전역 Codex skills로 설치되어 있으며, 프로젝트 로컬에는 Supabase agent skills가 설치되어 있습니다.
