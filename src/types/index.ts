export interface DesignTokens {
  colors: {
    brand: { primary: string; secondary: string };
    background: { main: string; card: string };
    text: { base: string; muted: string };
    border: string;
  };
  spacing: { base: number; scale: string }; // e.g. 4, "rem"
  borderRadius: { small: string; medium: string; large: string };
  typography: {
    sans: string;
    headingWeight: string;
  };
  /** Free-form layout personality — e.g. "high-density grid · generous whitespace · oversized headings" */
  layoutVibe: string;
  /** Font scale extracted from the site's visual hierarchy */
  typeScale: {
    hero: string;       // largest headline size, e.g. "72px"
    heading: string;    // section heading size, e.g. "32px"
    body: string;       // body copy size, e.g. "16px"
    label: string;      // captions / labels, e.g. "12px"
    lineHeight: string; // dominant line-height rhythm, e.g. "1.2" or "1.6"
  };
  /** Structural layout patterns that define the page skeleton */
  layoutStructure: {
    /** Overall page layout pattern */
    pattern: 'hero-centric' | 'card-grid' | 'editorial' | 'dashboard' | 'landing';
    /** Spatial density of the page */
    density: 'compact' | 'comfortable' | 'spacious';
    /** Hero section treatment */
    heroStyle: 'full-bleed' | 'split' | 'centered' | 'none';
    /** Navigation style */
    navStyle: 'sticky' | 'transparent' | 'sidebar' | 'minimal';
    /** Estimated vertical gap between major sections */
    sectionGap: string;   // e.g. "80px"
    /** Estimated horizontal content padding */
    contentPadding: string; // e.g. "5%" or "48px"
  };
  /** Key component semantics beyond color/radius */
  components: {
    card: {
      shadow: string;   // CSS box-shadow, e.g. "0 2px 8px rgba(0,0,0,0.12)"
      padding: string;  // CSS shorthand, e.g. "16px 20px"
    };
    button: {
      paddingX: string;      // e.g. "24px"
      paddingY: string;      // e.g. "10px"
      letterSpacing: string; // e.g. "0.04em" or "normal"
    };
  };

  /**
   * Physical spacing system — measured from computed CSS via Puppeteer.
   * All values are exact px integers snapped to the detected base grid unit.
   * Optional: present only when the physical extractor ran successfully.
   */
  spacingSystem?: {
    /** Detected grid base unit in px (almost always 4 or 8) */
    baseUnit: number;
    /** Deduplicated step scale snapped to the grid, e.g. ["4px","8px","12px","16px","24px","32px"] */
    steps: string[];
    /** Semantic named tokens derived from the scale */
    named: {
      xs:   string;   // 1× base
      sm:   string;   // 2× base
      md:   string;   // 4× base
      lg:   string;   // 6× base
      xl:   string;   // 8× base
      '2xl': string;  // 12× base
      '3xl': string;  // 16× base
    };
  };

  /**
   * Physical typography scale — measured from computed CSS via Puppeteer.
   * px values are exact integers; rem values are relative to the page root font-size.
   * Optional: present only when the physical extractor ran successfully.
   */
  typographyScale?: {
    /** Most-frequent body text size, e.g. "16px" */
    baseSize: string;
    /** baseSizeRem relative to page root, e.g. "1rem" */
    baseSizeRem: string;
    /** Unique font-family names detected on the page */
    families: string[];
    /** All unique type sizes, sorted smallest → largest */
    steps: Array<{
      px:         string;  // "14px"
      rem:        string;  // "0.875rem"
      lineHeight: string;  // "1.5"
      weight:     string;  // "400"
      /** Inferred semantic role: label | body-sm | body | body-lg | h5 | h4 | h3 | h2 | h1 | display */
      role:       string;
    }>;
  };
}
