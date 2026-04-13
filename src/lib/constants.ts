import type { DesignTokens } from '../types';

export const MOCK_DESIGN_TOKENS: DesignTokens = {
  color: {
    brand: {
      primary:   '#6366F1',   // indigo-500
      secondary: '#8B5CF6',   // violet-500
      accent:    '#A78BFA',   // violet-400
    },
    background: {
      page:    '#F9FAFB',     // gray-50
      surface: '#FFFFFF',
      overlay: 'rgba(0,0,0,0.50)',
    },
    text: {
      primary:   '#111827',   // gray-900
      secondary: '#6B7280',   // gray-500
      inverse:   '#FFFFFF',
    },
    border:  '#E5E7EB',       // gray-200
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error:   '#EF4444',
    },
  },

  typography: {
    families: {
      body:    'Inter, ui-sans-serif, system-ui, sans-serif',
      heading: 'Inter, ui-sans-serif, system-ui, sans-serif',
      mono:    'ui-monospace, "Cascadia Code", "Fira Code", monospace',
    },
    weights: {
      regular:  '400',
      medium:   '500',
      semibold: '600',
      bold:     '700',
    },
    scale: {
      xs:    { size: '12px', lineHeight: '1.4' },
      sm:    { size: '14px', lineHeight: '1.5' },
      base:  { size: '16px', lineHeight: '1.6' },
      lg:    { size: '18px', lineHeight: '1.5' },
      xl:    { size: '20px', lineHeight: '1.4' },
      '2xl': { size: '24px', lineHeight: '1.3' },
      '3xl': { size: '32px', lineHeight: '1.2' },
      '4xl': { size: '48px', lineHeight: '1.1' },
    },
  },

  spacing: {
    baseUnit: 4,
    scale: {
      xs:    '4px',
      sm:    '8px',
      md:    '16px',
      lg:    '24px',
      xl:    '32px',
      '2xl': '48px',
      '3xl': '64px',
    },
  },

  radius: {
    none: '0',
    sm:   '4px',
    md:   '8px',
    lg:   '16px',
    xl:   '24px',
    full: '9999px',
  },

  shadow: {
    sm:  '0 1px 2px rgba(0,0,0,0.06)',
    md:  '0 4px 12px rgba(0,0,0,0.08)',
    lg:  '0 8px 24px rgba(0,0,0,0.12)',
    xl:  '0 20px 60px rgba(0,0,0,0.20)',
  },

  siteArchitecture: {
    paradigm: 'landing',
    density:  'comfortable',
    motif:    'card-heavy, generous whitespace, sticky header, clean grid, purple brand',
    layout: {
      type:        'multi-column',
      navPosition: 'top-fixed',
    },
    visualWeight: {
      dominant:  'typography',
      hierarchy: 'functional',
    },
  },

  skeleton: {
    hero: {
      present:  true,
      layout:   'centered',
      headline: 'Beautiful by Default',
      ctaCount: 2,
    },
    nav: {
      brand: 'VibeExtract',
      items: ['Product', 'Docs', 'Pricing'],
    },
    cards: {
      present:     true,
      gridColumns: 3,
      hasShadow:   true,
    },
    footer: {
      present: true,
      columns: 4,
    },
  },

  spacingSystem: {
    baseUnit: 4,
    steps: ['4px','8px','12px','16px','20px','24px','32px','40px','48px','64px'],
    named: { xs:'4px', sm:'8px', md:'16px', lg:'24px', xl:'32px', '2xl':'48px', '3xl':'64px' },
  },

  typographyScale: {
    baseSize:    '16px',
    baseSizeRem: '1rem',
    families:    ['Inter', 'system-ui'],
    steps: [
      { px:'12px', rem:'0.75rem',  lineHeight:'1.5',  weight:'400', role:'label'   },
      { px:'14px', rem:'0.875rem', lineHeight:'1.5',  weight:'400', role:'body-sm' },
      { px:'16px', rem:'1rem',     lineHeight:'1.6',  weight:'400', role:'body'    },
      { px:'20px', rem:'1.25rem',  lineHeight:'1.4',  weight:'500', role:'body-lg' },
      { px:'24px', rem:'1.5rem',   lineHeight:'1.3',  weight:'600', role:'h4'      },
      { px:'32px', rem:'2rem',     lineHeight:'1.2',  weight:'700', role:'h3'      },
      { px:'48px', rem:'3rem',     lineHeight:'1.1',  weight:'700', role:'h2'      },
      { px:'56px', rem:'3.5rem',   lineHeight:'1.05', weight:'800', role:'h1'      },
    ],
  },
};
