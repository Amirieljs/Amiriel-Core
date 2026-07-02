<p align="center">
  <img src="https://amiriel.com/logo/amiriel_256x256.webp" alt="Amiriel logo" width="96" height="96" />
</p>

<h1 align="center">Amiriel</h1>

<p align="center">
  Framework-agnostic TypeScript core for Amiriel letter documents.
</p>

`amiriel` is the shared model and rules layer used by framework packages such as
[`@amiriel/vue`](https://github.com/Amirieljs/Amiriel-Vue) for Vue and
[`@amiriel/react`](https://github.com/Amirieljs/Amiriel-React) for React. It
contains no UI framework, DOM, storage, authentication, routing, or database
code.

[![npm version (beta)](https://img.shields.io/npm/v/amiriel/beta?style=flat-square)](https://www.npmjs.com/package/amiriel)
[![license](https://img.shields.io/npm/l/amiriel?style=flat-square)](https://www.npmjs.com/package/amiriel)
[![TypeScript](https://img.shields.io/badge/typescript-ready-3178C6?style=flat-square&logo=typescript&logoColor=white)]()

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
npm install amiriel@beta
pnpm add amiriel@beta
yarn add amiriel@beta
bun add amiriel@beta
```

## Usage

```ts
import {
  normalizeDocument,
  type AmirielDocument,
} from "amiriel";

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
import { normalizeDocument } from "amiriel";

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
} from "amiriel";

const theme = findAmirielThemeDefinition("paper");
const cssVars = amirielThemeCssVars(theme);
```

### Labels

```ts
import { resolveAmirielLabels } from "amiriel";

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

Amiriel is split into three packages:

- [`amiriel`](https://github.com/Amirieljs/Amiriel): shared framework-agnostic TypeScript model and rules (this repository)
- [`@amiriel/vue`](https://github.com/Amirieljs/Amiriel-Vue): Vue 3 implementation
- [`@amiriel/react`](https://github.com/Amirieljs/Amiriel-React): React implementation

Framework packages should depend on this core package instead of duplicating
document normalization, theme definitions, labels, and placement math.

The full hosted product lives at [amiriel.com](https://amiriel.com).

## Release Sync

When this repository publishes a new version, the release workflow can dispatch
sync events to the Vue and React repositories. Configure these secrets in this
repository:

- `NPM_TOKEN`: npm automation token used for publishing
- `AMIRIELJS_SYNC_TOKEN`: GitHub token with access to dispatch workflows in
  `Amirieljs/Amiriel-Vue` and `Amirieljs/Amiriel-React`

The Vue and React repositories listen for the `core-release` dispatch event,
upgrade `amiriel`, run checks, bump their own beta version, publish to npm, and
create a GitHub release.

## License

MIT. The core package is open source and can be used commercially. The official
hosted Amiriel product at [amiriel.com](https://amiriel.com) may still provide
paid services around storage, accounts, delivery, hosting, collaboration, or
other product workflows.
