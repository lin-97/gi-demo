# .agents/

本目录为 AI 编码助手规范的**唯一来源**（Single Source of Truth），适用于 Cursor、OpenCode、Codex 等工具。

## 结构

```
.agents/
├── rules/              # 常驻规则（纯 Markdown）
│   ├── agent-behavior.md
│   ├── coding-standards.md
│   ├── vue.md
│   └── css.md
└── skills/             # 按需加载的任务型技能（Agent Skills 标准）
    ├── project/SKILL.md
    ├── crud-page/SKILL.md
    └── api-mock/SKILL.md
```

## 工具适配

| 工具 | 适配方式 |
|------|----------|
| Cursor | 根目录 `AGENTS.md` + `.agents/rules/` + `.agents/skills/` |
| OpenCode | 根目录 `AGENTS.md` + `opencode.json` |
| Codex | 根目录 `AGENTS.md` + `.agents/skills/` |

修改规范时**只改本目录**及根目录 `AGENTS.md`，不要改各工具适配层中的重复内容。
