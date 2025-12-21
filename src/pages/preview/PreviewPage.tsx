/**
 * PreviewPage - Renders pages with specific theme applied
 * Used for theme comparison and preview routes
 */

import { useEffect } from "react";
import { ThemeId, useTheme } from "@/lib/theme";
import Index from "@/pages/Index";
import Solution from "@/pages/Solution";

interface PreviewPageProps {
  theme: ThemeId;
  page?: 'accueil' | 'solution';
}

const PreviewPage = ({ theme, page = 'accueil' }: PreviewPageProps) => {
  const { setTheme } = useTheme();

  // Apply theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Render the appropriate page
  if (page === 'solution') {
    return <Solution />;
  }
  
  return <Index />;
};

export default PreviewPage;

