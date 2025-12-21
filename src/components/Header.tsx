import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import Button from "@/components/ui/button";

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
  
  // Handle rgb/rgba
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  
  // Handle hex
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

/**
 * Calculate relative luminance (Y) from RGB
 * Formula: Y = 0.2126*R + 0.7152*G + 0.0722*B (normalized 0-1)
 */
function getLuminance(r: number, g: number, b: number): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Get the effective background color of an element by traversing up the DOM
 */
function getEffectiveBackgroundColor(element: Element | null, headerEl: Element | null): { r: number; g: number; b: number } {
  let current = element;
  
  while (current && current !== document.documentElement) {
    // Skip the header itself
    if (current === headerEl || headerEl?.contains(current)) {
      current = current.parentElement;
      continue;
    }
    
    const style = window.getComputedStyle(current);
    const bgColor = style.backgroundColor;
    const parsed = parseColor(bgColor);
    
    if (parsed && parsed.a > 0.1) {
      // Found a non-transparent background
      return { r: parsed.r, g: parsed.g, b: parsed.b };
    }
    
    current = current.parentElement;
  }
  
  // Fallback: check body/html or return white
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyBg = parseColor(bodyStyle.backgroundColor);
  if (bodyBg && bodyBg.a > 0.1) {
    return { r: bodyBg.r, g: bodyBg.g, b: bodyBg.b };
  }
  
  // Default to white if nothing found
  return { r: 255, g: 255, b: 255 };
}

/**
 * Sample background colors at multiple points under the header
 * and calculate average luminance
 */
function calculateHeaderContrast(headerEl: HTMLElement | null): "light" | "dark" {
  if (!headerEl) return "dark";
  
  const rect = headerEl.getBoundingClientRect();
  const headerHeight = rect.height;
  const headerWidth = rect.width;
  
  // Sample points at 10%, 30%, 50%, 70%, 90% width, at vertical center of header
  const sampleXPositions = [0.1, 0.3, 0.5, 0.7, 0.9];
  const sampleY = rect.top + headerHeight / 2;
  
  let totalLuminance = 0;
  let sampleCount = 0;
  
  for (const xRatio of sampleXPositions) {
    const sampleX = rect.left + headerWidth * xRatio;
    
    // Get all elements at this point
    const elements = document.elementsFromPoint(sampleX, sampleY);
    
    // Find the first element that's not the header or its children
    let targetElement: Element | null = null;
    for (const el of elements) {
      if (el !== headerEl && !headerEl.contains(el)) {
        targetElement = el;
        break;
      }
    }
    
    if (targetElement) {
      // Check if it's a video/canvas - assume dark
      if (targetElement.tagName === "VIDEO" || targetElement.tagName === "CANVAS") {
        totalLuminance += 0.1; // Assume dark
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
  
  // If background is dark (low luminance), use light text
  // If background is light (high luminance), use dark text
  return avgLuminance < 0.5 ? "dark" : "light";
}

interface HeaderProps {
  variant?: "dark" | "light";
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textTheme, setTextTheme] = useState<"dark" | "light">(variant);
  const headerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();

  // Recalculate contrast with RAF batching
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

  // Setup IntersectionObserver to detect section changes
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    if (sections.length === 0) {
      recalculateContrast();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Only recalculate when a section enters/exits the header zone
        const hasRelevantChange = entries.some(
          (entry) => entry.isIntersecting || entry.boundingClientRect.top < 100
        );
        if (hasRelevantChange) {
          recalculateContrast();
        }
      },
      {
        rootMargin: "-0px 0px -90% 0px", // Only observe top 10% of viewport
        threshold: [0, 0.1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Initial calculation
    recalculateContrast();

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [recalculateContrast, location.pathname]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      recalculateContrast();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [recalculateContrast]);

  // Recalculate on route change
  useEffect(() => {
    setIsMenuOpen(false);
    // Delay to let page render
    const timer = setTimeout(recalculateContrast, 100);
    return () => clearTimeout(timer);
  }, [location.pathname, recalculateContrast]);

  // Lock body scroll when mobile menu is open
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

  // textTheme="dark" means background is dark, so use white text
  // textTheme="light" means background is light, so use dark text
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

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              asLink
              to="/devis"
              variant="primary"
              size="md"
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

      {/* Mobile Menu - keeps solid background for usability */}
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
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                asLink
                to="/devis"
                variant="primary"
                size="md"
                className="w-full min-h-[48px]"
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
