import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

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
  const location = useLocation();
  const isDark = variant === "dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? "bg-brand-black/95 backdrop-blur-sm" : "bg-brand-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={isDark ? logoWhite : logoBlack}
              alt="Hygiène & Combat"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link font-medium ${
                  isDark ? "text-brand-white" : "text-brand-black"
                } ${location.pathname === link.href ? "text-primary" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/devis"
              className={isDark ? "btn-primary" : "btn-secondary"}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isDark ? "text-brand-white" : "text-brand-black"}`}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-20 left-0 right-0 ${
            isDark ? "bg-brand-black" : "bg-brand-white"
          } border-t border-border`}
        >
          <nav className="container mx-auto py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 font-medium ${
                  isDark ? "text-brand-white" : "text-brand-black"
                } ${location.pathname === link.href ? "text-primary" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/devis"
              onClick={() => setIsMenuOpen(false)}
              className={`mt-2 text-center ${isDark ? "btn-primary" : "btn-secondary"}`}
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
