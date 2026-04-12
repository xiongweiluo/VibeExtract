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
}
