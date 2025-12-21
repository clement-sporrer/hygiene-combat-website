import { useState, useEffect } from "react";
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

interface HeaderProps {
  variant?: "dark" | "light";
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDark = variant === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isDark
          ? isScrolled
            ? "bg-brand-black/98 shadow-md backdrop-blur-md"
            : "bg-brand-black/95 backdrop-blur-sm"
          : isScrolled
          ? "bg-brand-white/98 shadow-md backdrop-blur-md"
          : "bg-brand-white/95 backdrop-blur-sm"
      }`}
    >
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
              src={isDark ? logoWhite : logoBlack}
              alt="Hygiène & Combat"
              className="h-10 sm:h-12 md:h-14 w-auto"
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
                    isDark ? "text-brand-white" : "text-brand-black"
                  } ${
                    isActive
                      ? "text-primary"
                      : "hover:text-primary"
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
              variant={isDark ? "primary" : "secondary"}
              size="md"
            >
              Demander un devis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
              isDark
                ? "text-brand-white hover:bg-brand-blue-dark/20"
                : "text-brand-black hover:bg-muted"
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
            isDark ? "bg-brand-black border-t border-brand-blue-dark/30" : "bg-brand-white border-t border-border"
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
                      ? isDark
                        ? "bg-brand-blue-dark/30 text-primary"
                        : "bg-primary/10 text-primary"
                      : isDark
                      ? "text-brand-white hover:bg-brand-blue-dark/20"
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
                variant={isDark ? "primary" : "secondary"}
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
