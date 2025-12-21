import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white overflow-x-hidden">
      <div className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoWhite} alt="Hygiène & Combat" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Solution d'hygiène pensée par les gens du combat pour les gens du combat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-base mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3" aria-label="Navigation du site">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Accueil
              </Link>
              <Link to="/solution" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Notre solution
              </Link>
              <Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                À propos
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Contact
              </Link>
              <Link to="/devis" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-base mb-4">Informations légales</h4>
            <nav className="flex flex-col gap-3" aria-label="Informations légales">
              <Link to="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Mentions légales
              </Link>
              <Link to="/cgv" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                CGV
              </Link>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
                Politique de confidentialité
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@hygiene-combat.fr"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
              >
                <Mail size={18} className="flex-shrink-0" aria-hidden="true" />
                <span className="break-all">contact@hygiene-combat.fr</span>
              </a>
              <a
                href="tel:+33615613531"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
              >
                <Phone size={18} className="flex-shrink-0" aria-hidden="true" />
                <span>+33 6 15 61 35 31</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground min-h-[44px]">
                <MapPin size={18} className="flex-shrink-0" aria-hidden="true" />
                <span>Hauts-de-Seine (92)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Lun – Ven : 10h – 20h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-blue-dark/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Hygiène & Combat. Tous droits réservés.</p>
            <p>Fabriqué en France 🇫🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
