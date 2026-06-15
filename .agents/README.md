# .agents/

本目录为 AI 编码助手规范的**唯一来源**（Single Source of Truth），适用于 Cursor、OpenCode、Codex 等工具。

## 结构

```
.agents/
├── rules/
│   └── agent.md                # 唯一常驻规则（Cursor 经 AGENTS.md 内联注入）
└── skills/                   # 按需加载
    ├── code-ts/SKILL.md
    ├── code-vue/SKILL.md
    ├── code-css/SKILL.md
    ├── project-guide/SKILL.md
    ├── project-crud/SKILL.md
    ├── project-api/SKILL.md
    └── git-commit/SKILL.md
```

## 工具适配

| 工具 | 适配方式 |
|------|----------|
| Cursor | `AGENTS.md`（内联 behavior 规则 + 技能索引）+ `.agents/skills/`（按需） |
| OpenCode | `AGENTS.md` + `opencode.json` + `.agents/rules/` + `.agents/skills/` |
| Codex | `AGENTS.md` + `.agents/skills/` |

修改 `agent.md` 后请同步 `AGENTS.md` 的「常驻规则」一节；编码规范改对应 skill，不要重复写入 `AGENTS.md`。
