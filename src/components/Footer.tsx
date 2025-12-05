import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white overflow-x-hidden">
      <div className="container mx-auto py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <img src={logoWhite} alt="Hygiène & Combat" className="h-12 sm:h-14 w-auto" />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Solution d'hygiène pensée par les gens du combat pour les gens du combat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link to="/" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Accueil
              </Link>
              <Link to="/solution" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Notre solution
              </Link>
              <Link to="/a-propos" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                À propos
              </Link>
              <Link to="/contact" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Contact
              </Link>
              <Link to="/devis" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Informations légales</h4>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link to="/mentions-legales" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Mentions légales
              </Link>
              <Link to="/cgv" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                CGV
              </Link>
              <Link to="/confidentialite" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px] flex items-center">
                Politique de confidentialité
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact</h4>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a
                href="mailto:contact@hygiene-combat.fr"
                className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px]"
              >
                <Mail size={18} />
                <span className="break-all">contact@hygiene-combat.fr</span>
              </a>
              <a
                href="tel:+33615613531"
                className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors min-h-[40px]"
              >
                <Phone size={18} />
                <span>+33 6 15 61 35 31</span>
              </a>
              <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground min-h-[40px]">
                <MapPin size={18} />
                <span>Hauts-de-Seine (92)</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Lun – Ven : 10h – 20h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-7 md:pt-8 border-t border-brand-blue-dark/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <p>© {new Date().getFullYear()} Hygiène & Combat. Tous droits réservés.</p>
            <p>Fabriqué en France 🇫🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
