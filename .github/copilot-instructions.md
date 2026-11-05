# @amiriel/core

完整约定见本仓库 `AGENTS.md`。

这里只有框架无关的文档模型：`src/types.ts`、`utils.ts`、`themes.ts`、`labels.ts`。不要引入 Vue、React、DOM、存储或数据库。

Vue、React、Vanilla 和元包 `amiriel` 都从本包重导出。改模型后不要在那些仓库复制一份实现。

不启动长期进程。没有明确要求时不改 version、不 `npm publish`、不推 tag。验证：`pnpm typecheck` 和 `pnpm build`。
