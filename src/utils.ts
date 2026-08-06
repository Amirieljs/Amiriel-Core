import type {
  AmirielDocument,
  AmirielFont,
  AmirielIdFactory,
  AmirielMedia,
  AmirielMediaPlacement,
  AmirielNormalizeOptions,
  AmirielPage,
  AmirielPaperSize,
  AmirielPaperSizeLimits,
  AmirielTextBlock,
  AmirielTextColor,
  AmirielTheme,
} from "./types";
import { AMIRIEL_BUILTIN_THEME_IDS, themeDefaultTextColorFor } from "./themes";

interface CryptoLike {
  randomUUID?: () => string;
  getRandomValues?: (array: Uint8Array) => Uint8Array;
}

let fallbackIdCounter = 0;

export const AMIRIEL_TEXT_COLORS: Record<AmirielTextColor, string> = {
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#ca8a04",
  green: "#16a34a",
  cyan: "#0891b2",
  blue: "#2563eb",
  purple: "#9333ea",
  pink: "#ec4899",
  brown: "#92400e",
  gray: "#6b7280",
  black: "#000000",
  white: "#ffffff",
};

export const AMIRIEL_TEXT_COLOR_OPTIONS = Object.keys(AMIRIEL_TEXT_COLORS) as AmirielTextColor[];
export const AMIRIEL_FONT_OPTIONS: AmirielFont[] = ["system", "serif", "handwritten"];
export const AMIRIEL_THEME_OPTIONS = AMIRIEL_BUILTIN_THEME_IDS;
export const AMIRIEL_DEFAULT_PAPER_SIZE: AmirielPaperSize = { width: 720, height: 520 };
export const AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS: Required<AmirielPaperSizeLimits> = {
  minWidth: 320,
  maxWidth: 1600,
  minHeight: 240,
  maxHeight: 2200,
};

export const AMIRIEL_THEME_DEFAULT_TEXT_COLOR = {
  midnight: "white",
  paper: "black",
  memorial: "white",
  dawn: "black",
  ocean: "white",
  rose: "white",
} as const satisfies Record<string, AmirielTextColor>;

export const AMIRIEL_FONT_STACKS: Record<AmirielFont, string> = {
  system: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "Georgia, 'Times New Roman', 'Noto Serif', 'Noto Serif CJK SC', serif",
  handwritten: "'Segoe Print', 'Bradley Hand', 'Kaiti SC', STKaiti, KaiTi, 'Noto Serif CJK SC', cursive, serif",
};

function globalCrypto(): CryptoLike | undefined {
  return (globalThis as typeof globalThis & { crypto?: CryptoLike }).crypto;
}

function randomHex(bytes = 8): string {
  const crypto = globalCrypto();
  if (crypto?.getRandomValues) {
    const values = crypto.getRandomValues(new Uint8Array(bytes));
    return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
  }
  fallbackIdCounter += 1;
  return `${Date.now().toString(36)}-${fallbackIdCounter.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createAmirielId(prefix = "amiriel"): string {
  const crypto = globalCrypto();
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${prefix}-${randomHex()}`;
}

export function themeDefaultTextBlockColor(theme?: AmirielTheme): AmirielTextColor {
  return themeDefaultTextColorFor(theme);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function positiveInteger(value: unknown, fallback: number) {
  const next = Number(value);
  if (!Number.isFinite(next) || next <= 0) return fallback;
  return Math.round(next);
}

function normalizeRawPaperSize(value: Partial<AmirielPaperSize> | undefined, fallback: AmirielPaperSize): AmirielPaperSize {
  return {
    width: positiveInteger(value?.width, fallback.width),
    height: positiveInteger(value?.height, fallback.height),
  };
}

export function normalizePaperSizeLimits(limits?: AmirielPaperSizeLimits): Required<AmirielPaperSizeLimits> {
  const minWidth = positiveInteger(limits?.minWidth, AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS.minWidth);
  const minHeight = positiveInteger(limits?.minHeight, AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS.minHeight);
  const maxWidth = Math.max(minWidth, positiveInteger(limits?.maxWidth, AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS.maxWidth));
  const maxHeight = Math.max(minHeight, positiveInteger(limits?.maxHeight, AMIRIEL_DEFAULT_PAPER_SIZE_LIMITS.maxHeight));
  return { minWidth, maxWidth, minHeight, maxHeight };
}

export function normalizePaperSize(
  value?: Partial<AmirielPaperSize>,
  options: AmirielNormalizeOptions = {},
): AmirielPaperSize {
  const fallback = normalizeRawPaperSize(options.defaultPaperSize, AMIRIEL_DEFAULT_PAPER_SIZE);
  if (options.paperResizable === false) return fallback;

  const limits = normalizePaperSizeLimits(options.paperSizeLimits);
  const paper = normalizeRawPaperSize(value, fallback);
  return {
    width: clamp(paper.width, limits.minWidth, limits.maxWidth),
    height: clamp(paper.height, limits.minHeight, limits.maxHeight),
  };
}

export function safeAspectRatio(width?: number, height?: number) {
  if (width && height && width > 0 && height > 0) return clamp(width / height, 0.1, 10);
  return 4 / 3;
}

export function mediaAspectRatio(media?: AmirielMedia) {
  return safeAspectRatio(media?.width, media?.height);
}

export function fallbackHeightPercent(width: number, aspectRatio: number) {
  return clamp(width / aspectRatio, 8, 100);
}

export function heightPercentForWidth(width: number, aspectRatio: number, paperWidth: number, paperHeight: number) {
  if (paperWidth <= 0 || paperHeight <= 0) return fallbackHeightPercent(width, aspectRatio);
  return clamp((width * paperWidth) / (paperHeight * aspectRatio), 8, 100);
}

export function widthPercentForHeight(height: number, aspectRatio: number, paperWidth: number, paperHeight: number) {
  if (paperWidth <= 0 || paperHeight <= 0) return clamp(height * aspectRatio, 8, 100);
  return clamp((height * paperHeight * aspectRatio) / paperWidth, 8, 100);
}

export function mediaSizeWithinPaper(
  preferredWidth: number,
  aspectRatio: number,
  paperWidth: number,
  paperHeight: number,
  maxWidth: number,
  maxHeight: number,
) {
  let width = clamp(preferredWidth, 8, Math.max(8, maxWidth));
  let height = heightPercentForWidth(width, aspectRatio, paperWidth, paperHeight);
  if (height > maxHeight) {
    height = Math.max(8, maxHeight);
    width = clamp(widthPercentForHeight(height, aspectRatio, paperWidth, paperHeight), 8, Math.max(8, maxWidth));
    height = heightPercentForWidth(width, aspectRatio, paperWidth, paperHeight);
  }
  return { width, height };
}

export function normalizeTextBlock(block: AmirielTextBlock, index = 0): AmirielTextBlock {
  return {
    id: block.id,
    x: clamp(block.x, 0, 92),
    y: clamp(block.y, 0, 92),
    width: clamp(block.width || 88, 12, 96),
    height: clamp(block.height || 22, 8, 100),
    text: block.text || "",
    z: Math.max(1, Math.round(block.z || index + 1)),
    ...(block.font && AMIRIEL_FONT_OPTIONS.includes(block.font) ? { font: block.font } : {}),
    ...(block.fontSize ? { fontSize: clamp(block.fontSize, 10, 48) } : {}),
    ...(block.bold ? { bold: true } : {}),
    ...(block.italic ? { italic: true } : {}),
    ...(block.underline ? { underline: true } : {}),
    ...(block.color && AMIRIEL_TEXT_COLOR_OPTIONS.includes(block.color) ? { color: block.color } : {}),
  };
}

export function normalizeTextBlocks(page: AmirielPage): AmirielTextBlock[] {
  const existing = (page.textBlocks ?? []).filter((block) => Boolean(block.id));
  if (existing.length) return existing.map((block, index) => normalizeTextBlock(block, index));
  if (!page.text?.trim()) return [];
  return [{
    id: `legacy-${page.id}`,
    x: 4,
    y: 16,
    width: 88,
    height: 28,
    text: page.text,
    z: 1,
  }];
}

export function normalizePlacement(
  placement: AmirielMediaPlacement,
  media?: AmirielMedia,
  paperSize: AmirielPaperSize = AMIRIEL_DEFAULT_PAPER_SIZE,
): AmirielMediaPlacement {
  const aspectRatio = placement.aspectRatio || mediaAspectRatio(media) || safeAspectRatio(placement.width, placement.height);
  const x = clamp(placement.x, 0, 92);
  const y = clamp(placement.y, 0, 92);
  const width = clamp(placement.width, 8, 100 - x);
  const height = clamp(heightPercentForWidth(width, aspectRatio, paperSize.width, paperSize.height), 8, 100 - y);
  return {
    id: placement.id,
    mediaId: placement.mediaId,
    x,
    y,
    width,
    height,
    aspectRatio,
    z: Math.max(1, Math.round(placement.z || 1)),
  };
}

export function normalizeMediaPlacements(
  page: AmirielPage,
  mediaList: AmirielMedia[],
  paperSize: AmirielPaperSize = AMIRIEL_DEFAULT_PAPER_SIZE,
  createId: AmirielIdFactory = createAmirielId,
): AmirielMediaPlacement[] {
  const existing = (page.mediaPlacements ?? []).filter((placement) => Boolean(placement.id && placement.mediaId));
  if (existing.length) {
    return existing.map((placement) => normalizePlacement(
      placement,
      mediaList.find((item) => item.id === placement.mediaId),
      paperSize,
    ));
  }

  return (page.mediaIds ?? []).map((mediaId, index) => {
    const media = mediaList.find((item) => item.id === mediaId);
    const aspectRatio = mediaAspectRatio(media);
    const width = 38;
    return normalizePlacement({
      id: createId(),
      mediaId,
      x: 10 + (index % 2) * 42,
      y: 28 + Math.floor(index / 2) * 28,
      width,
      height: heightPercentForWidth(width, aspectRatio, paperSize.width, paperSize.height),
      aspectRatio,
      z: index + 1,
    }, media, paperSize);
  });
}

export function combinedPageText(page?: AmirielPage) {
  if (!page) return "";
  const blocks = page.textBlocks ?? [];
  if (blocks.length) return blocks.map((block) => block.text).join("\n");
  return page.text || "";
}

export function syncPageText(page: AmirielPage) {
  page.text = combinedPageText(page);
}

function clonePlainDeep<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => clonePlainDeep(item)) as T;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, clonePlainDeep(entry)]),
  ) as T;
}

export function sortAmirielPages(pages: AmirielPage[]): AmirielPage[] {
  return [...pages].sort((a, b) => a.order - b.order);
}

export function normalizeDocument(
  value: Partial<AmirielDocument> | null | undefined,
  options: AmirielNormalizeOptions = {},
): AmirielDocument {
  const createId = options.createId ?? createAmirielId;
  const raw = clonePlainDeep(value ?? {}) as Partial<AmirielDocument>;
  const media = (raw.media ?? []).filter((item) => Boolean(item.id && item.type && item.url));
  const paper = normalizePaperSize(raw.paper, options);
  const fallbackPages: AmirielPage[] = [{
    id: createId(),
    order: 0,
    text: "",
    font: "handwritten",
    mediaIds: [],
    mediaPlacements: [],
    textBlocks: [],
  }];
  const pages = raw.pages?.length ? raw.pages : fallbackPages;

  const normalized: AmirielDocument = {
    theme: raw.theme || "midnight",
    media,
    paper,
    pages: pages.map((page, index) => {
      const normalizedPage: AmirielPage = {
        ...page,
        id: page.id || createId(),
        order: index,
        text: page.text || "",
        font: page.font && AMIRIEL_FONT_OPTIONS.includes(page.font) ? page.font : "handwritten",
        mediaIds: page.mediaIds || [],
        mediaPlacements: page.mediaPlacements || [],
        textBlocks: page.textBlocks || [],
      };
      normalizedPage.mediaPlacements = normalizeMediaPlacements(normalizedPage, media, paper, createId);
      normalizedPage.textBlocks = normalizeTextBlocks(normalizedPage);
      syncPageText(normalizedPage);
      return normalizedPage;
    }),
  };

  return normalized;
}

export function formatVideoDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}
