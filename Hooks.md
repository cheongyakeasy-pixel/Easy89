# Hooks.md - CheongyakEasy Hooks and Automation

이 문서는 현재 프로젝트와 Codex 환경에서 동작하거나 참고해야 할 hook/automation 상태를 정리한다.

## 1. Project Hooks

현재 저장소에는 커밋된 프로젝트 전용 Codex hook 파일이 없다.

```text
No project-local hook file committed.
```

훅을 추가할 때는 다음 원칙을 따른다.

- 비밀값을 hook 로그에 출력하지 않는다.
- 네트워크/배포/DB 변경 hook은 명시 승인 후 도입한다.
- lint/test 자동 실행 hook을 추가할 경우 `npm run build`, `npm test` 기준을 우선한다.
- hook 파일을 만들면 이 문서와 `AGENTS.md`에 함께 기록한다.

## 2. Codex Global Hooks

`~/.codex/config.toml` 기준으로 plugin hooks 기능이 켜져 있다.

```toml
[features]
plugin_hooks = true
plugins = true
multi_agent = true
```

`omo@sisyphuslabs` 플러그인 설치 후 다음 hook state가 신뢰 등록되어 있다.

| Event | Source |
|------|--------|
| `session_start` | `omo@sisyphuslabs:hooks/hooks.json` |
| `user_prompt_submit` | `omo@sisyphuslabs:hooks/hooks.json` |
| `pre_tool_use` | `omo@sisyphuslabs:hooks/hooks.json` |
| `post_tool_use` | `omo@sisyphuslabs:hooks/hooks.json` |
| `post_compact` | `omo@sisyphuslabs:hooks/hooks.json` |
| `stop` | `omo@sisyphuslabs:hooks/hooks.json` |
| `subagent_stop` | `omo@sisyphuslabs:hooks/hooks.json` |

관련 plugin:

```text
~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0
```

## 3. App-Level Automation

### 부동산뉴스 갱신

- API: `/api/real-estate-news`
- Source: `https://news.naver.com/breakingnews/section/101/260`
- Server cache: `s-maxage=60, stale-while-revalidate=120`
- Client refresh: `useRealEstateNews`에서 60초 간격 재요청

화면에는 갱신 메타 문구를 표시하지 않는다.

### Vercel SPA Rewrite

`vercel.json`은 모든 경로를 `/index.html`로 보낸다.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 4. CLI Automation Notes

자주 사용하는 명령:

```bash
npm run build
npm test
npx --yes vercel --prod --yes
npx supabase start
```

주의:

- `npx supabase start`는 Docker Desktop 실행이 필요하다.
- Vercel 환경변수는 `VITE_` 접두사를 사용해야 Vite 브라우저 번들에서 접근할 수 있다.
- `VITE_` 값은 브라우저에 노출된다. service role key 같은 서버 전용 비밀값에는 절대 사용하지 않는다.
