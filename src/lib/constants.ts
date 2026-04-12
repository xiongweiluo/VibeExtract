import type { DesignTokens } from '../types';

export const MOCK_DESIGN_TOKENS: DesignTokens = {
  colors: {
    brand: {
      primary: '#6366F1',   // indigo-500
      secondary: '#8B5CF6', // violet-500
    },
    background: {
      main: '#F9FAFB', // gray-50
      card: '#FFFFFF',
    },
    text: {
      base: '#111827',  // gray-900
      muted: '#6B7280', // gray-500
    },
    border: '#E5E7EB', // gray-200
  },
  spacing: {
    base: 4,
    scale: 'rem',
  },
  borderRadius: {
    small: '0.25rem',  // 4px
    medium: '0.5rem',  // 8px
    large: '1rem',     // 16px
  },
  typography: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    headingWeight: '700',
  },
  layoutVibe: 'card-heavy layout, generous whitespace, sticky header, clean grid',
  typeScale: {
    hero: '56px',
    heading: '28px',
    body: '16px',
    label: '12px',
    lineHeight: '1.5',
  },
  layoutStructure: {
    pattern: 'landing',
    density: 'comfortable',
    heroStyle: 'centered',
    navStyle: 'sticky',
    sectionGap: '64px',
    contentPadding: '48px',
  },
  components: {
    card: {
      shadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
      padding: '20px 24px',
    },
    button: {
      paddingX: '20px',
      paddingY: '10px',
      letterSpacing: 'normal',
    },
  },
};
