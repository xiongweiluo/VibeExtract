/**
 * VibeExtract Design Token Schema — v2
 *
 * Five semantic layers: Color · Typography · Spacing · Radius · Shadow
 * Two structural layers: SiteArchitecture · Skeleton
 * One optional physical layer: spacingSystem · typographyScale (from Puppeteer)
 */

export interface DesignTokens {
  // ── 1. Color ────────────────────────────────────────────────────────────────
  color: {
    brand: {
      /** Dominant CTA / accent — HEX */
      primary:   string;
      /** Supporting accent — HEX */
      secondary: string;
      /** Highlight / interactive state — HEX */
      accent:    string;
    };
    background: {
      /** Main page background — HEX */
      page:    string;
      /** Card / panel / widget surface — HEX */
      surface: string;
      /** Modal scrim / tooltip overlay — may be rgba() for opacity */
      overlay: string;
    };
    text: {
      /** Main body text — HEX */
      primary:   string;
      /** Muted / helper / metadata text — HEX */
      secondary: string;
      /** Text on dark or branded surfaces — HEX */
      inverse:   string;
    };
    /** Most common separator / outline — HEX */
    border: string;
    status: {
      success: string;  // HEX — e.g. "#10B981"
      warning: string;  // HEX — e.g. "#F59E0B"
      error:   string;  // HEX — e.g. "#EF4444"
    };
  };

  // ── 2. Typography ────────────────────────────────────────────────────────────
  typography: {
    families: {
      /** Body / UI font-family stack */
      body:    string;
      /** Heading font-family stack (may equal body) */
      heading: string;
      /** Monospace stack for code / data */
      mono:    string;
    };
    weights: {
      regular:  string;   // "400"
      medium:   string;   // "500"
      semibold: string;   // "600"
      bold:     string;   // "700"
    };
    /**
     * 8-level type scale.
     * size = CSS value (px or rem); lineHeight = unitless ratio.
     */
    scale: {
      xs:    { size: string; lineHeight: string };  // caption / label
      sm:    { size: string; lineHeight: string };  // small body text
      base:  { size: string; lineHeight: string };  // default body copy
      lg:    { size: string; lineHeight: string };  // lead / large body
      xl:    { size: string; lineHeight: string };  // card title / h5
      '2xl': { size: string; lineHeight: string };  // section title / h4
      '3xl': { size: string; lineHeight: string };  // page heading / h3
      '4xl': { size: string; lineHeight: string };  // hero headline / h1–h2
    };
  };

  // ── 3. Spacing ───────────────────────────────────────────────────────────────
  spacing: {
    /** Grid base unit in px — almost always 4 or 8 */
    baseUnit: number;
    /** Named semantic scale derived from baseUnit (all CSS px strings) */
    scale: {
      xs:    string;   // 1× baseUnit
      sm:    string;   // 2× baseUnit
      md:    string;   // 4× baseUnit
      lg:    string;   // 6× baseUnit
      xl:    string;   // 8× baseUnit
      '2xl': string;   // 12× baseUnit
      '3xl': string;   // 16× baseUnit
    };
  };

  // ── 4. Border Radius ─────────────────────────────────────────────────────────
  radius: {
    none: string;  // "0"
    sm:   string;  // tags / badges
    md:   string;  // inputs / buttons
    lg:   string;  // cards / panels
    xl:   string;  // sheets / drawers
    full: string;  // pill / circle — "9999px"
  };

  // ── 5. Shadow ────────────────────────────────────────────────────────────────
  shadow: {
    sm:  string;  // hairline — very subtle, e.g. "0 1px 2px rgba(0,0,0,0.06)"
    md:  string;  // card — standard elevation, e.g. "0 4px 12px rgba(0,0,0,0.08)"
    lg:  string;  // panel — elevated, e.g. "0 8px 24px rgba(0,0,0,0.12)"
    xl:  string;  // modal — dramatic, e.g. "0 20px 60px rgba(0,0,0,0.20)"
  };

  // ── 6. Site Architecture ─────────────────────────────────────────────────────
  siteArchitecture: {
    /**
     * Primary structural paradigm of the page.
     * landing     — marketing hero + feature sections + CTA rows
     * saas-app    — authenticated app UI, task-oriented
     * e-commerce  — product grid, shopping-focused
     * content-site — text-dominant, long-form, editorial
     * portfolio   — showcase, image-heavy, personal brand
     * docs        — documentation, structured reference
     * social-feed — infinite scroll, user-generated cards
     * dashboard   — data-dense, metrics, sidebar navigation
     */
    paradigm: 'landing' | 'saas-app' | 'e-commerce' | 'content-site' | 'portfolio' | 'docs' | 'social-feed' | 'dashboard';
    /** Spatial density of the page */
    density: 'compact' | 'comfortable' | 'spacious';
    /** Free-text visual motif / personality — 3–5 comma-separated descriptors */
    motif: string;
    layout: {
      type: 'single-column' | 'multi-column' | 'sidebar' | 'grid' | 'masonry';
      navPosition: 'top-fixed' | 'top-static' | 'side' | 'floating' | 'minimal';
    };
    visualWeight: {
      /** Which element type carries the most visual weight */
      dominant:  'typography' | 'imagery' | 'data' | 'color';
      /** Overall design philosophy */
      hierarchy: 'editorial' | 'functional' | 'expressive';
    };
  };

  // ── 7. Component Skeleton ────────────────────────────────────────────────────
  skeleton: {
    hero: {
      present:  boolean;
      /** Spatial arrangement of the hero section */
      layout:   'centered' | 'split' | 'full-bleed' | 'asymmetric' | 'none';
      /** Extracted or inferred primary headline text */
      headline: string;
      /** Number of visible CTA buttons in the hero */
      ctaCount: number;
    };
    nav: {
      /** Extracted brand / logo name */
      brand: string;
      /** Main navigation link labels (up to 6) */
      items: string[];
    };
    cards: {
      present:     boolean;
      /** Number of columns in the card grid (0 if not a card layout) */
      gridColumns: number;
      /** Whether cards carry a visible drop shadow */
      hasShadow:   boolean;
    };
    footer: {
      present: boolean;
      /** Approximate number of columns in the footer */
      columns: number;
    };
  };

  // ── 8. Physical measurements — optional (populated by Puppeteer pass) ────────
  /**
   * Precise spacing system measured from computed CSS.
   * When present, values are exact px integers snapped to the detected base grid.
   */
  spacingSystem?: {
    baseUnit: number;
    steps:    string[];
    named: {
      xs: string; sm: string; md: string;
      lg: string; xl: string; '2xl': string; '3xl': string;
    };
  };
  /**
   * Design Critique generated in Phase 1 of the two-turn extraction pipeline.
   * Contains semantic color analysis, spacing math, typography sampling, and
   * visual language characterisation. Useful for debugging token decisions.
   */
  designCritique?: string;

  /**
   * Precise typography scale measured from computed CSS.
   * When present, px/rem values are exact and role assignments are data-driven.
   */
  typographyScale?: {
    baseSize:    string;
    baseSizeRem: string;
    families:    string[];
    steps: Array<{
      px:         string;
      rem:        string;
      lineHeight: string;
      weight:     string;
      role:       string;
    }>;
  };

  /**
   * Asset inventory collected by Puppeteer — image and SVG URLs found on the page.
   * Images include <img src>, <img srcset>, and CSS background-image sources.
   * SVGs include <img src="*.svg">, <use href> references, and detected sprite sheets.
   */
  assets?: {
    /** External image URLs (excluding data: URIs), capped at 50 entries */
    images: string[];
    /** SVG file URLs and detected sprite sheet references */
    svgs: string[];
  };
}
