/**
 * Theme Variants Configuration
 * Defines color schemes for variant pages
 */

export type ThemeVariant = 
  | 'noir'
  | 'bleu-clair'
  | 'bleu-fonce'
  | 'gradient-clair-fonce'
  | 'gradient-fonce-clair';

export interface ThemeConfig {
  name: string;
  // CSS custom properties to apply
  cssVars: {
    // Dark sections (hero, etc.)
    darkBg: string;
    darkText: string;
    // Light sections
    lightBg: string;
    lightText: string;
    // Hero specific
    heroGradient: string;
    // Button adjustments
    buttonBg: string;
    buttonText: string;
    buttonHoverBg: string;
  };
  // Tailwind classes for quick application
  classes: {
    heroBg: string;
    sectionDark: string;
    sectionLight: string;
  };
}

export const themeVariants: Record<ThemeVariant, ThemeConfig> = {
  'noir': {
    name: 'Noir (actuel)',
    cssVars: {
      darkBg: '#000000',
      darkText: '#fefefe',
      lightBg: '#fefefe',
      lightText: '#000000',
      heroGradient: 'linear-gradient(to bottom right, #000000, rgba(0,0,0,0.95), rgba(56,74,84,0.3))',
      buttonBg: '#87a6bb',
      buttonText: '#fefefe',
      buttonHoverBg: 'rgba(135,166,187,0.9)',
    },
    classes: {
      heroBg: 'bg-brand-black',
      sectionDark: 'bg-brand-black text-brand-white',
      sectionLight: 'bg-brand-white text-brand-black',
    },
  },
  'bleu-clair': {
    name: 'Bleu Clair',
    cssVars: {
      darkBg: '#87a6bb',
      darkText: '#000000',
      lightBg: '#fefefe',
      lightText: '#000000',
      heroGradient: 'linear-gradient(to bottom right, #87a6bb, rgba(135,166,187,0.95), rgba(56,74,84,0.4))',
      buttonBg: '#384a54',
      buttonText: '#fefefe',
      buttonHoverBg: 'rgba(56,74,84,0.9)',
    },
    classes: {
      heroBg: 'bg-[#87a6bb]',
      sectionDark: 'bg-[#87a6bb] text-brand-black',
      sectionLight: 'bg-brand-white text-brand-black',
    },
  },
  'bleu-fonce': {
    name: 'Bleu Foncé',
    cssVars: {
      darkBg: '#384a54',
      darkText: '#fefefe',
      lightBg: '#fefefe',
      lightText: '#000000',
      heroGradient: 'linear-gradient(to bottom right, #384a54, rgba(56,74,84,0.95), rgba(0,0,0,0.3))',
      buttonBg: '#87a6bb',
      buttonText: '#fefefe',
      buttonHoverBg: 'rgba(135,166,187,0.9)',
    },
    classes: {
      heroBg: 'bg-[#384a54]',
      sectionDark: 'bg-[#384a54] text-brand-white',
      sectionLight: 'bg-brand-white text-brand-black',
    },
  },
  'gradient-clair-fonce': {
    name: 'Dégradé Bleu Clair → Foncé',
    cssVars: {
      darkBg: 'linear-gradient(to bottom, #87a6bb, #384a54)',
      darkText: '#fefefe',
      lightBg: '#fefefe',
      lightText: '#000000',
      heroGradient: 'linear-gradient(to bottom, #87a6bb, #384a54)',
      buttonBg: '#fefefe',
      buttonText: '#384a54',
      buttonHoverBg: 'rgba(254,254,254,0.9)',
    },
    classes: {
      heroBg: 'bg-gradient-to-b from-[#87a6bb] to-[#384a54]',
      sectionDark: 'bg-gradient-to-b from-[#87a6bb] to-[#384a54] text-brand-white',
      sectionLight: 'bg-brand-white text-brand-black',
    },
  },
  'gradient-fonce-clair': {
    name: 'Dégradé Bleu Foncé → Clair',
    cssVars: {
      darkBg: 'linear-gradient(to bottom, #384a54, #87a6bb)',
      darkText: '#fefefe',
      lightBg: '#fefefe',
      lightText: '#000000',
      heroGradient: 'linear-gradient(to bottom, #384a54, #87a6bb)',
      buttonBg: '#fefefe',
      buttonText: '#384a54',
      buttonHoverBg: 'rgba(254,254,254,0.9)',
    },
    classes: {
      heroBg: 'bg-gradient-to-b from-[#384a54] to-[#87a6bb]',
      sectionDark: 'bg-gradient-to-b from-[#384a54] to-[#87a6bb] text-brand-white',
      sectionLight: 'bg-brand-white text-brand-black',
    },
  },
};

export const getThemeConfig = (variant: ThemeVariant): ThemeConfig => {
  return themeVariants[variant] || themeVariants['noir'];
};

// Helper to determine if text should be light or dark based on background
export const shouldUseLightText = (variant: ThemeVariant): boolean => {
  return variant !== 'bleu-clair';
};

