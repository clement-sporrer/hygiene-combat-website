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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? isScrolled
            ? "bg-brand-black shadow-lg"
            : "bg-brand-black/95 backdrop-blur-sm"
          : isScrolled
          ? "bg-brand-white shadow-lg"
          : "bg-brand-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname !== "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md min-h-[44px] min-w-[44px]"
            aria-label="Retour à l'accueil"
          >
            <img
              src={isDark ? logoWhite : logoBlack}
              alt="Hygiène & Combat"
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
                  className={`relative px-2 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md ${
                    isDark ? "text-brand-white" : "text-brand-black"
                  } ${
                    isActive
                      ? "text-primary"
                      : isDark
                      ? "hover:text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
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

          {/* Mobile Menu Button - Touch target 44x44px minimum */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isDark
                ? "text-brand-white hover:bg-brand-blue-dark/20"
                : "text-brand-black hover:bg-muted"
            }`}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-16 left-0 right-0 z-50 ${
            isDark ? "bg-brand-black border-t border-brand-blue-dark/30" : "bg-brand-white border-t border-border"
          } shadow-lg`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2 max-w-screen-2xl">
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
                  className={`min-h-[44px] flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActive
                      ? isDark
                        ? "bg-brand-blue-dark/30 text-primary"
                        : "bg-primary/10 text-primary"
                      : isDark
                      ? "text-brand-white hover:bg-brand-blue-dark/20"
                      : "text-brand-black hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 pt-4 border-t border-border">
              <Button
                asLink
                to="/devis"
                variant={isDark ? "primary" : "secondary"}
                size="md"
                className="w-full min-h-[44px]"
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
