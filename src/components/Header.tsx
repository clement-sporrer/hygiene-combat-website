import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Palette, ChevronDown } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import Button from "@/components/ui/button";
import { useTheme, themeList, ThemeId } from "@/lib/theme";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/solution", label: "Notre solution" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Debug mode - set to true to log contrast calculations
const DEBUG_CONTRAST = false;

/**
 * Parse a CSS color string (rgb, rgba, hex) to RGB values
 */
function parseColor(color: string): { r: number; g: number; b: number; a: number } | null {
  if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") {
    return null;
  }
  
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  
  const hexMatch = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1,
    };
  }
  
  return null;
}

function getLuminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function getEffectiveBackgroundColor(element: Element | null, headerEl: Element | null): { r: number; g: number; b: number } {
  let current = element;
  
  while (current && current !== document.documentElement) {
    if (current === headerEl || headerEl?.contains(current)) {
      current = current.parentElement;
      continue;
    }
    
    const style = window.getComputedStyle(current);
    const bgColor = style.backgroundColor;
    const parsed = parseColor(bgColor);
    
    if (parsed && parsed.a > 0.1) {
      return { r: parsed.r, g: parsed.g, b: parsed.b };
    }
    
    current = current.parentElement;
  }
  
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyBg = parseColor(bodyStyle.backgroundColor);
  if (bodyBg && bodyBg.a > 0.1) {
    return { r: bodyBg.r, g: bodyBg.g, b: bodyBg.b };
  }
  
  return { r: 255, g: 255, b: 255 };
}

function calculateHeaderContrast(headerEl: HTMLElement | null): "light" | "dark" {
  if (!headerEl) return "dark";
  
  const rect = headerEl.getBoundingClientRect();
  const headerHeight = rect.height;
  const headerWidth = rect.width;
  
  const sampleXPositions = [0.1, 0.3, 0.5, 0.7, 0.9];
  const sampleY = rect.top + headerHeight / 2;
  
  let totalLuminance = 0;
  let sampleCount = 0;
  
  for (const xRatio of sampleXPositions) {
    const sampleX = rect.left + headerWidth * xRatio;
    const elements = document.elementsFromPoint(sampleX, sampleY);
    
    let targetElement: Element | null = null;
    for (const el of elements) {
      if (el !== headerEl && !headerEl.contains(el)) {
        targetElement = el;
        break;
      }
    }
    
    if (targetElement) {
      if (targetElement.tagName === "VIDEO" || targetElement.tagName === "CANVAS") {
        totalLuminance += 0.1;
        sampleCount++;
        continue;
      }
      
      const bgColor = getEffectiveBackgroundColor(targetElement, headerEl);
      const luminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
      totalLuminance += luminance;
      sampleCount++;
    }
  }
  
  const avgLuminance = sampleCount > 0 ? totalLuminance / sampleCount : 0.5;
  
  if (DEBUG_CONTRAST) {
    console.log(`[Header Contrast] Avg luminance: ${avgLuminance.toFixed(3)} → ${avgLuminance < 0.5 ? "light text (dark bg)" : "dark text (light bg)"}`);
  }
  
  return avgLuminance < 0.5 ? "dark" : "light";
}

interface HeaderProps {
  variant?: "dark" | "light";
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textTheme, setTextTheme] = useState<"dark" | "light">(variant);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const themeSwitcherRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Theme context
  const { theme: currentTheme, setTheme } = useTheme();

  const recalculateContrast = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const newTheme = calculateHeaderContrast(headerRef.current);
      setTextTheme((prev) => {
        if (prev !== newTheme) {
          return newTheme;
        }
        return prev;
      });
    });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    if (sections.length === 0) {
      recalculateContrast();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hasRelevantChange = entries.some(
          (entry) => entry.isIntersecting || entry.boundingClientRect.top < 100
        );
        if (hasRelevantChange) {
          recalculateContrast();
        }
      },
      {
        rootMargin: "-0px 0px -90% 0px",
        threshold: [0, 0.1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    recalculateContrast();

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [recalculateContrast, location.pathname]);

  useEffect(() => {
    const handleResize = () => recalculateContrast();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [recalculateContrast]);

  useEffect(() => {
    setIsMenuOpen(false);
    const timer = setTimeout(recalculateContrast, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, recalculateContrast]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close theme switcher when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeSwitcherRef.current && !themeSwitcherRef.current.contains(event.target as Node)) {
        setIsThemeSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeId: ThemeId) => {
    setTheme(themeId);
    setIsThemeSwitcherOpen(false);
    // Recalculate contrast after theme change
    setTimeout(recalculateContrast, 50);
  };

  const useWhiteText = textTheme === "dark";

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname !== "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md min-h-[44px] min-w-[44px]"
            aria-label="Retour à l'accueil"
          >
            <img
              src={useWhiteText ? logoWhite : logoBlack}
              alt="Hygiène & Combat"
              className="h-10 sm:h-12 md:h-14 w-auto transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    if (link.href !== location.pathname) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? "text-primary"
                      : useWhiteText
                        ? "text-white hover:text-primary"
                        : "text-brand-black hover:text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop: Theme Switcher + CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Switcher */}
            <div ref={themeSwitcherRef} className="relative">
              <button
                onClick={() => setIsThemeSwitcherOpen(!isThemeSwitcherOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  useWhiteText
                    ? "text-white/80 hover:text-white border-white/20 hover:border-white/40 hover:bg-white/10"
                    : "text-brand-black/80 hover:text-brand-black border-brand-black/20 hover:border-brand-black/40 hover:bg-brand-black/5"
                }`}
                aria-expanded={isThemeSwitcherOpen}
                aria-label="Changer le thème"
              >
                <Palette size={16} />
                <span className="hidden lg:inline">Thème</span>
                <ChevronDown size={14} className={`transition-transform ${isThemeSwitcherOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {isThemeSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Thème visuel
                  </div>
                  
                  {themeList.map((themeConfig) => (
                    <button
                      key={themeConfig.id}
                      onClick={() => handleThemeChange(themeConfig.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                        currentTheme === themeConfig.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span 
                        className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0"
                        style={{ background: themeConfig.previewColor }}
                      />
                      {themeConfig.name}
                      {currentTheme === themeConfig.id && <span className="ml-auto text-primary">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button - Always blue-light */}
            <Button
              asLink
              to="/devis"
              variant="primary"
              size="md"
              className="btn-cta"
            >
              Demander un devis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors duration-200 ${
              useWhiteText
                ? "text-white hover:text-primary"
                : "text-brand-black hover:text-primary"
            }`}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-50 overflow-y-auto ${
            useWhiteText ? "bg-brand-black border-t border-brand-blue-dark/30" : "bg-brand-white border-t border-border"
          } shadow-xl`}
        >
          <nav className="container-wide py-6 flex flex-col gap-2" aria-label="Navigation mobile">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (link.href !== location.pathname) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`min-h-[48px] flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? useWhiteText
                        ? "bg-brand-blue-dark/30 text-primary"
                        : "bg-primary/10 text-primary"
                      : useWhiteText
                        ? "text-white hover:bg-brand-blue-dark/20"
                        : "text-brand-black hover:bg-muted"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile Theme Switcher */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                useWhiteText ? 'text-white/50' : 'text-gray-500'
              }`}>
                Thème visuel
              </p>
              <div className="grid grid-cols-4 gap-2">
                {themeList.map((themeConfig) => (
                  <button
                    key={themeConfig.id}
                    onClick={() => {
                      handleThemeChange(themeConfig.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                      currentTheme === themeConfig.id
                        ? 'bg-primary/20 ring-2 ring-primary'
                        : useWhiteText ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span 
                      className="w-8 h-8 rounded-full border-2 border-gray-400"
                      style={{ background: themeConfig.previewColor }}
                    />
                    <span className={`text-xs ${useWhiteText ? 'text-white/80' : 'text-gray-700'}`}>
                      {themeConfig.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                asLink
                to="/devis"
                variant="primary"
                size="md"
                className="w-full min-h-[48px] btn-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                Demander un devis
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
