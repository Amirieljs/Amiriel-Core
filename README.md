# Amiriel Core

Framework-agnostic TypeScript core for Amiriel letter documents.

`@amiriel/core` is the shared model and rules layer used by framework packages
such as `amiriel` for Vue and `@amiriel/react` for React. It contains no UI
framework, DOM, storage, authentication, routing, or database code.

## Features

- Shared Amiriel document types
- Document normalization and legacy document migration helpers
- Paper size constraints and media placement math
- Built-in themes and CSS variable generation
- English and Chinese UI label helpers
- Font, text color, and video duration utilities
- Node.js-native ESM package with TypeScript declarations

## Install

Pre-release builds are published under the `beta` dist-tag:

```bash
npm install @amiriel/core@beta
pnpm add @amiriel/core@beta
yarn add @amiriel/core@beta
bun add @amiriel/core@beta
```

After the first stable release, install without the tag:

```bash
npm install @amiriel/core
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

`normalizeDocument` may need to create page or placement ids for legacy input.
In modern Node.js and browsers it uses `crypto.randomUUID()` when available.
You can also pass your own id factory:

```ts
import { normalizeDocument } from "@amiriel/core";

const document = normalizeDocument(input, {
  createId: () => `doc-${Date.now()}`,
});
```

### Themes

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

## Package Architecture

The recommended split is:

- `@amiriel/core`: shared Node.js/TypeScript model and rules
- `amiriel`: Vue 3 implementation
- `@amiriel/react`: React implementation

Framework packages should depend on this core package instead of duplicating
document normalization, theme definitions, labels, and placement math.

## Release Sync

When this repository publishes a new version, the release workflow can dispatch
sync events to the Vue and React repositories. Configure these secrets in this
repository:

- `NPM_TOKEN`: npm automation token used for publishing
- `AMIRIELJS_SYNC_TOKEN`: GitHub token with access to dispatch workflows in
  `Amirieljs/Amiriel-Vue` and `Amirieljs/Amiriel-React`

The Vue and React repositories listen for the `core-release` dispatch event,
upgrade `@amiriel/core`, run checks, bump their own beta version, publish to
npm, and create a GitHub release.

## License

MIT. The editor packages are open source and can be used commercially. The
official hosted Amiriel product may still provide paid services around storage,
accounts, delivery, hosting, collaboration, or other product workflows.
