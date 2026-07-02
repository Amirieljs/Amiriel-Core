export type AmirielLocale = "en" | "zh";
export type AmirielBuiltinTheme = "midnight" | "paper" | "memorial";
/** Built-in ids or any custom theme id supplied by a host package. */
export type AmirielTheme = AmirielBuiltinTheme | (string & {});
export type AmirielFont = "system" | "serif" | "handwritten";
export type AmirielTextColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "purple"
  | "pink"
  | "brown"
  | "gray"
  | "black"
  | "white";

export type AmirielIdFactory = () => string;

export interface AmirielPaperSize {
  width: number;
  height: number;
}

export interface AmirielPaperSizeLimits {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export interface AmirielNormalizeOptions {
  defaultPaperSize?: AmirielPaperSize;
  paperSizeLimits?: AmirielPaperSizeLimits;
  paperResizable?: boolean;
  createId?: AmirielIdFactory;
}

export interface AmirielMediaPlacement {
  id: string;
  mediaId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio?: number;
  z: number;
}

export interface AmirielTextBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height?: number;
  text: string;
  z: number;
  font?: AmirielFont;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: AmirielTextColor;
}

export interface AmirielPage {
  id: string;
  order: number;
  text: string;
  font?: AmirielFont;
  mediaIds?: string[];
  mediaPlacements?: AmirielMediaPlacement[];
  textBlocks?: AmirielTextBlock[];
}

export interface AmirielMedia {
  id: string;
  type: "image" | "video";
  url: string;
  objectKey?: string;
  thumbnailUrl?: string;
  storage?: "local" | "r2";
  size?: number;
  width?: number;
  height?: number;
  duration?: number;
  createdAt?: string;
}

export interface AmirielDocument {
  theme: AmirielTheme;
  pages: AmirielPage[];
  media: AmirielMedia[];
  paper?: AmirielPaperSize;
}

export interface AmirielEditorLimits {
  maxPages?: number;
  maxTextBlocksPerPage?: number;
  maxImages?: number;
  maxVideos?: number;
}

export interface AmirielLabels {
  themeLabel: string;
  themes: Partial<Record<AmirielBuiltinTheme, string>> & Record<string, string>;
  fonts: Record<AmirielFont, string>;
  pagesCount: string;
  paperSizeTitle: string;
  paperWidth: string;
  paperHeight: string;
  paperSizeUnit: string;
  addPage: string;
  removePage: string;
  pagePlaceholder: string;
  /** Placeholder shown inside empty text-block editors. */
  textBlockPlaceholder: string;
  tapPaperHint: string;
  textBlocksTitle: string;
  addTextBlock: string;
  moveTextBlock: string;
  resizeTextBlock: string;
  deleteTextBlock: string;
  deleteTextBlockConfirm: string;
  textBlockFont: string;
  textBlockFontSize: string;
  textBlockBold: string;
  textBlockItalic: string;
  textBlockUnderline: string;
  textBlockColor: string;
  textBlockOverflowHint: string;
  textBlockLimit: string;
  charCount: string;
  allMediaTitle: string;
  uploadMedia: string;
  uploading: string;
  compressingMedia: string;
  uploadFailed: string;
  retryUpload: string;
  dismissFailedUpload: string;
  mediaUploadMissing: string;
  mediaEmpty: string;
  imageQuota: string;
  videoQuota: string;
  pageMediaHint: string;
  detachMedia: string;
  removeMedia: string;
  addMediaToPage: string;
  resizeMedia: string;
  viewFullscreen: string;
  playMedia: string;
  close: string;
  image: string;
  video: string;
  prevPage: string;
  nextPage: string;
  viewMedia: string;
  viewOnGithub: string;
}

export interface AmirielMediaUploadProgress {
  phase: "preparing" | "uploading";
  progress: number | null;
}

export interface AmirielMediaRequest<TFile = unknown> {
  file: TFile;
  pageId: string;
  handled?: boolean;
  onProgress?: (info: AmirielMediaUploadProgress) => void;
  resolve: (media: AmirielMedia) => void;
  reject: (message?: string) => void;
}
