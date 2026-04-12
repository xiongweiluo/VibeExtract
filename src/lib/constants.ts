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
};
