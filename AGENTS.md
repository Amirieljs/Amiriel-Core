# @amiriel/core

框架无关的 Amiriel 文档模型。npm 包 `@amiriel/core`，仓库 [Amirieljs/Amiriel-Core](https://github.com/Amirieljs/Amiriel-Core)。

本包只包含类型、归一化、主题、en/zh 标签，以及纸张、文本块和媒体摆放的数学。禁止引入 Vue、React、DOM、存储、登录、路由或数据库。

## 源码

| 文件 | 职责 |
| --- | --- |
| `src/types.ts` | `AmirielDocument`、页、媒体、文本块、摆放、编辑器限额、标签 |
| `src/utils.ts` | `normalizeDocument` 与纸张、摆放、字号颜色工具 |
| `src/themes.ts` | 内置主题与 CSS 变量。当前 id：`midnight`、`paper`、`memorial`、`dawn`、`ocean`、`rose` |
| `src/labels.ts` | `AmirielLocale` 只有 `en` 和 `zh` |
| `src/index.ts` | 唯一公共出口 |

`normalizeDocument` 在缺少 id 时用 `crypto.randomUUID()`，也可由调用方传入 `createId`。

下游必须从本包引用这些符号：

- 元包 `amiriel` 只做 `export * from "@amiriel/core"`。
- `@amiriel/vue`、`@amiriel/react`、`@amiriel/vanilla` 重导出本包，并各自实现编辑器 UI。
- 官网 `Amiriel.com` 不依赖本包的源码目录，它安装的是已发布的 `@amiriel/vue`。

改了类型或归一化之后，框架包只应跟着编译通过，不要在框架包里复制一份新逻辑。产品侧的配额、分享和落库不在本仓库。

## 规则

- 说明用简体中文。不启动长期进程。不发布、不打 tag，除非用户明确要求。
- 发布由 `.github/workflows/release.yml` 完成，并 dispatch 下游 Sync Core。不要在本地 `npm publish` 作为常规路径。
- 版本以本目录 `package.json` 为准。没有明确要求时不要顺手改 version。
- 包管理器是 `package.json` 里的 `packageManager` 字段所写的 pnpm。

## 验证

```bash
pnpm install && pnpm typecheck && pnpm build
```

本包目前没有测试脚本。类型检查和 build 是默认验证。未运行的项目写「未测试」。
