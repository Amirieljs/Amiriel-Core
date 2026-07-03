<p align="center">
  <img src="https://amiriel.com/logo/amiriel_256x256.webp" alt="Amiriel logo" width="96" height="96" />
</p>

<h1 align="center">@amiriel/core</h1>

<p align="center">
  Framework-agnostic TypeScript core for Amiriel letter documents.
</p>

`@amiriel/core` is the shared model and rules layer used by framework packages such as
[`@amiriel/vue`](https://github.com/Amirieljs/Amiriel-Vue) for Vue and
[`@amiriel/react`](https://github.com/Amirieljs/Amiriel-React) for React. It
contains no UI framework, DOM, storage, authentication, routing, or database
code.

[![npm version (beta)](https://img.shields.io/npm/v/@amiriel/core/beta?style=flat-square)](https://www.npmjs.com/package/@amiriel/core)
[![license](https://img.shields.io/npm/l/@amiriel/core?style=flat-square)](https://www.npmjs.com/package/@amiriel/core)
[![TypeScript](https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)]()

Prefer the short package name? Install [`amiriel`](https://www.npmjs.com/package/amiriel) instead — it re-exports everything from this package.

## Features

- Shared Amiriel document types
- Document normalization helpers
- Paper size constraints and media placement math
- Built-in themes and CSS variable generation
- English and Chinese UI label helpers
- Font, text color, and video duration utilities
- Framework-agnostic ESM package with TypeScript declarations

## Install

```bash
npm install @amiriel/core@beta
pnpm add @amiriel/core@beta
yarn add @amiriel/core@beta
bun add @amiriel/core@beta
```

Or use the meta package:

```bash
npm install amiriel@beta
```

## Usage

```ts
import {
  normalizeDocument,
  type AmirielDocument,
} from "@amiriel/core";

const document: AmirielDocument = normalizeDocument({
  theme: "midnight",
  media: [],
  pages: [],
});
```

### Custom id generation

`normalizeDocument` may assign page or placement ids when input omits them.
In modern Node.js and browsers it uses `crypto.randomUUID()` when available.
You can also pass your own id factory:

```ts
import { normalizeDocument } from "@amiriel/core";

const document = normalizeDocument(input, {
  createId: () => `doc-${Date.now()}`,
});
```

### Themes

Built-in themes: `midnight`, `paper`, `memorial`.

```ts
import {
  amirielThemeCssVars,
  findAmirielThemeDefinition,
} from "@amiriel/core";

const theme = findAmirielThemeDefinition("paper");
const cssVars = amirielThemeCssVars(theme);
```

### Labels

```ts
import { resolveAmirielLabels } from "@amiriel/core";

const labels = resolveAmirielLabels("zh", {
  uploadMedia: "选择照片或视频",
});
```

## Main Exports

| Export | Description |
| --- | --- |
| Document types | `AmirielDocument`, `AmirielPage`, `AmirielMedia`, and related shapes |
| `normalizeDocument` | Normalize document input into the shared Amiriel shape |
| Theme helpers | Built-in theme definitions, CSS variable generation, and merge utilities |
| Label helpers | Built-in English and Chinese UI labels with partial overrides |
| Placement math | Paper sizing, media placement, and text block normalization utilities |

## Package Architecture

| npm package | Repository | Role |
| --- | --- | --- |
| `@amiriel/core` | [Amirieljs/Amiriel-Core](https://github.com/Amirieljs/Amiriel-Core) | Framework-agnostic core (this repo) |
| `amiriel` | [Amirieljs/Amiriel](https://github.com/Amirieljs/Amiriel) | Meta package re-exporting `@amiriel/core` |
| `@amiriel/vue` | [Amirieljs/Amiriel-Vue](https://github.com/Amirieljs/Amiriel-Vue) | Vue 3 implementation |
| `@amiriel/react` | [Amirieljs/Amiriel-React](https://github.com/Amirieljs/Amiriel-React) | React implementation |
| `@amiriel/vanilla` | [Amirieljs/Amiriel-Vanilla](https://github.com/Amirieljs/Amiriel-Vanilla) | Vanilla JS implementation |

Framework packages depend on `@amiriel/core` for document normalization, theme
definitions, labels, and placement math.

The full hosted product lives at [amiriel.com](https://amiriel.com).

## License

MIT. The core package is open source and can be used commercially. The official
hosted Amiriel product at [amiriel.com](https://amiriel.com) may still provide
paid services around storage, accounts, delivery, hosting, collaboration, or
other product workflows.
