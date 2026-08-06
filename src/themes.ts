import type { AmirielTextColor, AmirielTheme } from "./types";

/** Paper surface CSS variables applied to framework renderers/editors. */
export interface AmirielPaperThemeVars {
  paperBorder: string;
  paperBg: string;
  paperText: string;
  paperDivider: string;
  paperAccent: string;
  paperHead?: string;
  paperShadow?: string;
  paperMediaBorder?: string;
  paperMediaBg?: string;
}

export interface AmirielThemeDefinition {
  id: string;
  label?: string;
  /** CSS `background` value for the theme swatch button. */
  swatch: string;
  defaultTextColor: AmirielTextColor;
  vars: AmirielPaperThemeVars;
}

export const AMIRIEL_BUILTIN_THEME_DEFINITIONS: AmirielThemeDefinition[] = [
  {
    id: "midnight",
    swatch: "linear-gradient(135deg, #373737, #050505)",
    defaultTextColor: "white",
    vars: {
      paperBorder: "rgba(214, 170, 103, 0.24)",
      paperBg:
        "radial-gradient(circle at 12% 0%, rgba(214, 170, 103, 0.1), transparent 38%), linear-gradient(180deg, #171718 0%, #09090a 100%)",
      paperText: "#eadfce",
      paperHead: "rgba(241, 234, 220, 0.92)",
      paperDivider: "rgba(214, 170, 103, 0.2)",
      paperAccent: "rgba(214, 170, 103, 0.8)",
      paperShadow: "0 20px 48px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      paperMediaBorder: "rgba(255, 255, 255, 0.1)",
      paperMediaBg: "rgba(0, 0, 0, 0.28)",
    },
  },
  {
    id: "paper",
    swatch: "linear-gradient(135deg, #ece8df, #d6aa67)",
    defaultTextColor: "black",
    vars: {
      paperBorder: "rgba(180, 140, 80, 0.34)",
      paperBg:
        "radial-gradient(circle at 12% 0%, rgba(214, 170, 103, 0.14), transparent 38%), linear-gradient(180deg, #f7f2e8 0%, #ebe3d4 100%)",
      paperText: "#3a3228",
      paperHead: "rgba(62, 48, 32, 0.92)",
      paperDivider: "rgba(180, 140, 80, 0.24)",
      paperAccent: "rgba(122, 88, 42, 0.88)",
      paperShadow: "0 20px 48px rgba(72, 54, 32, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.42)",
      paperMediaBorder: "rgba(110, 82, 48, 0.16)",
      paperMediaBg: "rgba(255, 255, 255, 0.28)",
    },
  },
  {
    id: "memorial",
    swatch: "linear-gradient(135deg, #9fb27a, #252525)",
    defaultTextColor: "white",
    vars: {
      paperBorder: "rgba(159, 178, 122, 0.28)",
      paperBg:
        "radial-gradient(circle at 12% 0%, rgba(159, 178, 122, 0.1), transparent 38%), linear-gradient(180deg, #1e2822 0%, #121916 100%)",
      paperText: "#dde5d4",
      paperHead: "rgba(221, 229, 212, 0.92)",
      paperDivider: "rgba(159, 178, 122, 0.2)",
      paperAccent: "rgba(159, 178, 122, 0.88)",
      paperShadow: "0 20px 48px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(159, 178, 122, 0.08)",
      paperMediaBorder: "rgba(159, 178, 122, 0.16)",
      paperMediaBg: "rgba(0, 0, 0, 0.24)",
    },
  },
  {
    id: "dawn",
    swatch: "linear-gradient(135deg, #f3d5b5, #c4785a)",
    defaultTextColor: "black",
    vars: {
      paperBorder: "rgba(196, 120, 90, 0.32)",
      paperBg:
        "radial-gradient(circle at 18% 8%, rgba(255, 210, 170, 0.35), transparent 42%), linear-gradient(180deg, #fbf3ea 0%, #f0dcc8 100%)",
      paperText: "#4a3428",
      paperHead: "rgba(74, 52, 40, 0.92)",
      paperDivider: "rgba(196, 120, 90, 0.22)",
      paperAccent: "rgba(168, 88, 58, 0.88)",
      paperShadow: "0 20px 48px rgba(120, 72, 48, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
      paperMediaBorder: "rgba(168, 88, 58, 0.16)",
      paperMediaBg: "rgba(255, 255, 255, 0.32)",
    },
  },
  {
    id: "ocean",
    swatch: "linear-gradient(135deg, #6a9bb8, #0f1c28)",
    defaultTextColor: "white",
    vars: {
      paperBorder: "rgba(122, 168, 196, 0.28)",
      paperBg:
        "radial-gradient(circle at 12% 0%, rgba(122, 168, 196, 0.12), transparent 38%), linear-gradient(180deg, #152430 0%, #0b141c 100%)",
      paperText: "#d5e6f0",
      paperHead: "rgba(213, 230, 240, 0.92)",
      paperDivider: "rgba(122, 168, 196, 0.2)",
      paperAccent: "rgba(122, 168, 196, 0.88)",
      paperShadow: "0 20px 48px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(122, 168, 196, 0.08)",
      paperMediaBorder: "rgba(122, 168, 196, 0.16)",
      paperMediaBg: "rgba(0, 0, 0, 0.24)",
    },
  },
  {
    id: "rose",
    swatch: "linear-gradient(135deg, #e8b4c4, #5c2a3a)",
    defaultTextColor: "white",
    vars: {
      paperBorder: "rgba(214, 150, 168, 0.3)",
      paperBg:
        "radial-gradient(circle at 14% 0%, rgba(214, 150, 168, 0.14), transparent 40%), linear-gradient(180deg, #2a1820 0%, #160e14 100%)",
      paperText: "#f0dce4",
      paperHead: "rgba(240, 220, 228, 0.92)",
      paperDivider: "rgba(214, 150, 168, 0.22)",
      paperAccent: "rgba(214, 150, 168, 0.88)",
      paperShadow: "0 20px 48px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(214, 150, 168, 0.08)",
      paperMediaBorder: "rgba(214, 150, 168, 0.16)",
      paperMediaBg: "rgba(0, 0, 0, 0.24)",
    },
  },
];

export const AMIRIEL_BUILTIN_THEME_IDS = AMIRIEL_BUILTIN_THEME_DEFINITIONS.map((theme) => theme.id) as AmirielTheme[];

export function amirielThemeCssVars(def: AmirielThemeDefinition): Record<string, string> {
  const vars = def.vars;
  return {
    "--amiriel-paper-border": vars.paperBorder,
    "--amiriel-paper-bg": vars.paperBg,
    "--amiriel-paper-text": vars.paperText,
    "--amiriel-paper-divider": vars.paperDivider,
    "--amiriel-paper-accent": vars.paperAccent,
    ...(vars.paperHead ? { "--amiriel-paper-head": vars.paperHead } : {}),
    ...(vars.paperShadow ? { "--amiriel-paper-shadow": vars.paperShadow } : {}),
    ...(vars.paperMediaBorder ? { "--amiriel-paper-media-border": vars.paperMediaBorder } : {}),
    ...(vars.paperMediaBg ? { "--amiriel-paper-media-bg": vars.paperMediaBg } : {}),
  };
}

export function mergeAmirielThemeDefinitions(custom: AmirielThemeDefinition[] = []): AmirielThemeDefinition[] {
  const map = new Map<string, AmirielThemeDefinition>();
  for (const def of AMIRIEL_BUILTIN_THEME_DEFINITIONS) map.set(def.id, def);
  for (const def of custom) {
    const base = map.get(def.id);
    map.set(def.id, {
      ...base,
      ...def,
      vars: { ...base?.vars, ...def.vars },
    });
  }
  return Array.from(map.values());
}

export function findAmirielThemeDefinition(
  themeId: string | undefined,
  custom: AmirielThemeDefinition[] = [],
): AmirielThemeDefinition {
  const resolved = mergeAmirielThemeDefinitions(custom);
  return resolved.find((theme) => theme.id === themeId) ?? resolved[0]!;
}

export function themeDefaultTextColorFor(
  themeId: string | undefined,
  custom: AmirielThemeDefinition[] = [],
): AmirielTextColor {
  return findAmirielThemeDefinition(themeId, custom).defaultTextColor;
}
