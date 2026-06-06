# CheongyakEasy

청약이지는 주택청약 공고, 일정, 자격 확인 포인트, 준비 서류, 대출 준비 정보, 부동산뉴스를 제공하는 Vite + React + TypeScript 반응형 웹앱입니다.

## Codex 시작점

VS Code에서 진행하던 작업을 Codex가 이어받을 때는 아래 문서를 먼저 읽습니다.

1. `AGENTS.md`
2. `docs/AGENTS.md`
3. `docs/CODEX_CONTEXT.md`
4. `docs/DESIGN.MD`
5. `docs/01-plan/`
6. `docs/02-design/`

중요한 채팅 맥락은 자동으로 동기화되지 않습니다. 다음 Codex 세션에 필요한 내용은 `docs/CODEX_CONTEXT.md`에 요약하고 GitHub에 push합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

VS Code에서는 `CheongyakEasy.code-workspace`를 열고 `Terminal > Run Task...`에서 `dev: vite`, `build`, `test`, `preview`를 실행할 수 있습니다.

## 검증

```bash
npm run build
npm test
```

## 환경변수

실제 키는 저장소에 기록하지 않습니다. 필요한 이름은 `.env.example`과 `docs/CODEX_CONTEXT.md`를 참고합니다.
