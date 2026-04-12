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
}
