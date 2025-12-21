/**
 * Theme System
 * Provides theme context and utilities for the 4 color themes
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeId = 'noir' | 'bleu-clair' | 'bleu-fonce' | 'degrade';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  previewColor: string; // For theme switcher UI
  useLightTextOnDark: boolean; // Whether dark sections use light text
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'noir': {
    id: 'noir',
    name: 'Noir',
    description: 'Thème sombre classique',
    previewColor: '#000000',
    useLightTextOnDark: true,
  },
  'bleu-clair': {
    id: 'bleu-clair',
    name: 'Bleu Clair',
    description: 'Thème bleu lumineux',
    previewColor: '#87a6bb',
    useLightTextOnDark: false, // Dark text on blue-light
  },
  'bleu-fonce': {
    id: 'bleu-fonce',
    name: 'Bleu Foncé',
    description: 'Thème bleu profond',
    previewColor: '#384a54',
    useLightTextOnDark: true,
  },
  'degrade': {
    id: 'degrade',
    name: 'Dégradé',
    description: 'Dégradé bleu subtil',
    previewColor: 'linear-gradient(to bottom, #87a6bb, #384a54)',
    useLightTextOnDark: true,
  },
};

export const themeList = Object.values(themes);

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeId) => void;
  useLightText: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeId;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'noir',
  storageKey = 'hc-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    // Check URL param first (for variant pages)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme') as ThemeId;
      if (urlTheme && themes[urlTheme]) {
        return urlTheme;
      }
      
      // Check localStorage
      const stored = localStorage.getItem(storageKey) as ThemeId;
      if (stored && themes[stored]) {
        return stored;
      }
    }
    return defaultTheme;
  });

  const themeConfig = themes[theme];

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.removeAttribute('data-theme');
    
    // Apply new theme
    root.setAttribute('data-theme', theme);
    
    // Store preference
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = (newTheme: ThemeId) => {
    if (themes[newTheme]) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig,
        setTheme,
        useLightText: themeConfig.useLightTextOnDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get theme-aware classes
 */
export function useThemeClasses() {
  const { theme, useLightText } = useTheme();
  
  return {
    // Text classes for dark sections
    textOnDark: useLightText ? 'text-white' : 'text-brand-black',
    textMutedOnDark: useLightText ? 'text-white/70' : 'text-brand-black/70',
    
    // Background classes
    bgDark: theme === 'degrade' 
      ? 'bg-gradient-to-b from-[#87a6bb] to-[#384a54]'
      : theme === 'bleu-clair'
        ? 'bg-[#87a6bb]'
        : theme === 'bleu-fonce'
          ? 'bg-[#384a54]'
          : 'bg-brand-black',
    
    // Border classes
    borderOnDark: useLightText ? 'border-white/20' : 'border-brand-black/20',
    
    // Button classes for dark sections
    outlineButtonOnDark: useLightText
      ? 'border-white/50 text-white hover:bg-white hover:text-brand-black'
      : 'border-brand-black/50 text-brand-black hover:bg-brand-black hover:text-white',
  };
}

/**
 * Get theme from URL path (for variant pages)
 */
export function getThemeFromPath(pathname: string): ThemeId | null {
  if (pathname.includes('-noir')) return 'noir';
  if (pathname.includes('-bleu-clair')) return 'bleu-clair';
  if (pathname.includes('-bleu-fonce')) return 'bleu-fonce';
  if (pathname.includes('-degrade') || pathname.includes('-gradient')) return 'degrade';
  return null;
}

