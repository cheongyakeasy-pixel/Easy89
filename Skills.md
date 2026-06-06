# Skills.md - CheongyakEasy Skills Inventory

이 문서는 현재 프로젝트에서 사용할 수 있는 로컬/전역 skills와 설치 경로를 정리한다. 발급 키 원문은 기록하지 않는다.

## 1. Project Skills

프로젝트 로컬 skills는 `.agents/skills`에 설치되어 있다.

| Skill | Source | Path | 사용 시점 |
|------|--------|------|-----------|
| `supabase` | `supabase/agent-skills` | `.agents/skills/supabase/SKILL.md` | Supabase DB, Auth, Edge Functions, Realtime, Storage, client, SSR, CLI, MCP 작업 |
| `supabase-postgres-best-practices` | `supabase/agent-skills` | `.agents/skills/supabase-postgres-best-practices/SKILL.md` | PostgreSQL schema, RLS, index, query, migration, performance 검토 |

설치 lockfile:

```text
skills-lock.json
```

설치 명령:

```bash
npx skills add supabase/agent-skills
```

## 2. Global Codex Skills

gstack은 전역 Codex skills로 설치되어 있다.

| 항목 | 값 |
|------|----|
| Source | `garrytan/gstack` |
| Clone path | `~/.claude/skills/gstack` |
| Codex skills path | `~/.codex/skills/gstack*` |
| 설치된 gstack skills 수 | 53 |
| Bun path | `~/.local/node_modules/.bin/bun` |

대표 skills:

- `gstack`
- `gstack-browse`
- `gstack-review`
- `gstack-qa`
- `gstack-ship`
- `gstack-plan-ceo-review`
- `gstack-plan-eng-review`
- `gstack-design-review`
- `gstack-setup-deploy`
- `gstack-land-and-deploy`

설치에 사용한 흐름:

```bash
npm install --prefix ~/.local bun
PATH=~/.local/node_modules/.bin:$PATH ~/.claude/skills/gstack/setup --host codex --quiet
```

## 3. OMO / LazyCodex Plugin

`lazycodex-ai`를 통해 `omo@sisyphuslabs` 플러그인이 설치되어 있다.

| 항목 | 값 |
|------|----|
| Plugin | `omo@sisyphuslabs` |
| Path | `~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0` |
| 주요 CLI | `omo`, `omo-ultrawork`, `omo-rules`, `omo-lsp`, `omo-comment-checker` |
| ULW CLI fallback | `~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0/components/ulw-loop/dist/cli.js` |

ULW를 시작하려면 brief가 필요하다.

```bash
node ~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0/components/ulw-loop/dist/cli.js ulw-loop create-goals --brief "<목표>" --json
```

## 4. Built-In / Existing Workflow Skills

이 프로젝트에서 이미 활용된 주요 skills:

- `pdca`: Plan/Design/Do 문서화와 단계 관리
- `bkit-templates`: PDCA 문서 템플릿
- `starter`: Vite/React 정적 웹 구현
- `zero-script-qa`: curl/log 기반 검증
- `github`, `vercel`, `supabase`: 외부 서비스 연결과 배포

## 5. 사용 규칙

- 사용자가 `$skill` 또는 skill 이름을 명시하면 해당 `SKILL.md`를 먼저 읽는다.
- Supabase 관련 작업은 `.agents/skills/supabase/SKILL.md`를 우선한다.
- DB schema/RLS/index 작업은 `supabase-postgres-best-practices`를 함께 읽는다.
- gstack skills는 전역 설치이므로 새 세션에서 skill 목록에 보이지 않으면 Codex 세션 재시작 또는 skill discovery가 필요할 수 있다.
- 설치형 명령은 사용자 승인을 받고 실행한다.
