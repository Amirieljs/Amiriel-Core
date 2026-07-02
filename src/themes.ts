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
