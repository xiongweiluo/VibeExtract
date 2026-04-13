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
  spacingSystem: {
    baseUnit: 4,
    steps: ['4px','8px','12px','16px','20px','24px','32px','40px','48px','64px'],
    named: { xs:'4px', sm:'8px', md:'16px', lg:'24px', xl:'32px', '2xl':'48px', '3xl':'64px' },
  },
  typographyScale: {
    baseSize: '16px',
    baseSizeRem: '1rem',
    families: ['Inter', 'system-ui'],
    steps: [
      { px:'12px', rem:'0.75rem',  lineHeight:'1.5', weight:'400', role:'label'   },
      { px:'14px', rem:'0.875rem', lineHeight:'1.5', weight:'400', role:'body-sm' },
      { px:'16px', rem:'1rem',     lineHeight:'1.6', weight:'400', role:'body'    },
      { px:'20px', rem:'1.25rem',  lineHeight:'1.4', weight:'500', role:'body-lg' },
      { px:'24px', rem:'1.5rem',   lineHeight:'1.3', weight:'600', role:'h4'      },
      { px:'32px', rem:'2rem',     lineHeight:'1.2', weight:'700', role:'h3'      },
      { px:'48px', rem:'3rem',     lineHeight:'1.1', weight:'700', role:'h2'      },
      { px:'56px', rem:'3.5rem',   lineHeight:'1.05',weight:'800', role:'h1'      },
    ],
  },
};
