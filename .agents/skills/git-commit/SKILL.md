---
name: git-commit
description: 执行 git 提交的标准流程。用户明确要求 commit、提交代码、生成提交信息时使用。涵盖变更检查、Conventional Commits 提交信息、安全约束与提交流程。
---

# Git 提交

> **前置条件**：仅当用户**明确要求**提交时才执行；未要求时不得主动 commit / push。

## 第一步：收集变更状态

同时执行（不要串行等待）：

```bash
git status
git diff
```

必要时补充 `git diff --staged`；需了解分支与远程关系时执行 `git status -sb`。

## 第二步：分析变更

- 覆盖**已暂存 + 未暂存 + 未跟踪**中与本次任务相关的文件
- 判断变更类型，映射到 Conventional Commits 的 `type`
- 提交信息聚焦 **why**（1–2 句完整句子），准确反映目的
- **不要**提交 `.env`、密钥、token、credentials 等敏感文件；若用户坚持，须明确警告
- 无相关变更时不执行 commit

## 第三步：提交信息格式（Conventional Commits）

```
<type>(<scope>): <subject>

<body>
```

### type（必选）

| type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档 |
| `style` | 格式（不影响逻辑，如空格、分号） |
| `refactor` | 重构（非新功能、非修 bug） |
| `perf` | 性能优化 |
| `test` | 测试 |
| `build` | 构建系统或外部依赖 |
| `ci` | CI 配置 |
| `chore` | 其他杂项（不改 src/test） |
| `revert` | 回滚提交 |

### subject（必选）

- 使用**祈使句**，简明描述做了什么
- 不加句号；建议 50 字符以内
- 示例：`新增用户登录表单`、`修复表格分页重置问题`

### scope（可选）

- 括号内标明影响模块，如 `feat(auth)`、`fix(table)`
- 跨模块或难以界定时可省略

### body（可选）

- 说明**为什么**改、改了什么影响
- 与 subject 空一行

### 示例

```
fix(theme): 切换明暗模式时重新生成主题色阶

generate 依赖 isDark 生成色阶，切换后需重新写入 --primary-* 变量，
否则暗色模式下主色显示异常。
```

```
feat(user): 新增用户列表批量删除
```

## 第四步：执行提交（顺序）

```bash
git add <相关文件>
git commit -m "$(cat <<'EOF'
feat(user): 新增用户列表批量删除

补充说明变更原因与影响（可选）

EOF
)"
git status
```

PowerShell 环境可用：

```powershell
git commit -m "feat(user): 新增用户列表批量删除"
git commit -m "fix(theme): 切换明暗模式时重新生成主题色阶" -m "generate 依赖 isDark 生成色阶，切换后需重新写入 CSS 变量。"
```

## 安全约束（必须遵守）

| 禁止 | 说明 |
|------|------|
| `git config` 修改 | 不更改任何 git 配置 |
| `push --force` / `reset --hard` | 除非用户明确要求 |
| `--no-verify` / `--no-gpg-sign` | 除非用户明确要求 |
| 对 main/master force push | 须警告用户 |
| 无用户请求时 push | 不主动推送远程 |

### `--amend` 仅当全部满足

1. 用户明确要求 amend，**或** pre-commit hook 自动改文件需纳入本次提交
2. HEAD 为当前会话创建的 commit，且**未 push**
3. hook 拒绝时：**修复后新建 commit**，不要 amend

## 提交后

- `git status` 确认成功
- hook 失败：修复问题后**重新 commit**（新提交，非 amend）
- 将 commit hash / 摘要反馈给用户
- 用户未要求时**不要 push**

## 检查清单

- [ ] 用户已明确要求提交
- [ ] 已查看 status + diff
- [ ] 提交信息符合 Conventional Commits
- [ ] 未包含敏感文件
- [ ] 提交后 status 正常
