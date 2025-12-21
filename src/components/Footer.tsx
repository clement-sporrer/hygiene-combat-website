import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { useLightText } = useTheme();
  
  const textColor = useLightText ? "text-white" : "text-brand-black";
  const textMuted = useLightText ? "text-white/60" : "text-brand-black/60";
  const borderColor = useLightText ? "border-white/10" : "border-brand-black/10";
  
  return (
    <footer className="section-dark overflow-x-hidden">
      <div className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src={useLightText ? logoWhite : logoBlack} 
              alt="Hygiène & Combat" 
              className="h-12 w-auto" 
            />
            <p className={cn("text-sm leading-relaxed max-w-xs", textMuted)}>
              Solution d'hygiène pensée par les gens du combat pour les gens du combat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={cn("font-semibold text-base mb-4", textColor)}>Navigation</h4>
            <nav className="flex flex-col gap-3" aria-label="Navigation du site">
              <Link to="/" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Accueil
              </Link>
              <Link to="/solution" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Notre solution
              </Link>
              <Link to="/a-propos" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                À propos
              </Link>
              <Link to="/contact" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Contact
              </Link>
              <Link to="/devis" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className={cn("font-semibold text-base mb-4", textColor)}>Informations légales</h4>
            <nav className="flex flex-col gap-3" aria-label="Informations légales">
              <Link to="/mentions-legales" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Mentions légales
              </Link>
              <Link to="/cgv" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                CGV
              </Link>
              <Link to="/confidentialite" className={cn("text-sm hover:text-primary transition-colors min-h-[44px] flex items-center", textMuted)}>
                Politique de confidentialité
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className={cn("font-semibold text-base mb-4", textColor)}>Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@hygiene-combat.fr"
                className={cn("flex items-center gap-3 text-sm hover:text-primary transition-colors min-h-[44px]", textMuted)}
              >
                <Mail size={18} className="flex-shrink-0" aria-hidden="true" />
                <span className="break-all">contact@hygiene-combat.fr</span>
              </a>
              <a
                href="tel:+33615613531"
                className={cn("flex items-center gap-3 text-sm hover:text-primary transition-colors min-h-[44px]", textMuted)}
              >
                <Phone size={18} className="flex-shrink-0" aria-hidden="true" />
                <span>+33 6 15 61 35 31</span>
              </a>
              <div className={cn("flex items-center gap-3 text-sm min-h-[44px]", textMuted)}>
                <MapPin size={18} className="flex-shrink-0" aria-hidden="true" />
                <span>Hauts-de-Seine (92)</span>
              </div>
              <p className={cn("text-xs mt-2", textMuted)}>
                Lun – Ven : 10h – 20h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn("mt-12 pt-8 border-t", borderColor)}>
          <div className={cn("flex flex-col sm:flex-row justify-between items-center gap-4 text-xs", textMuted)}>
            <p>© {new Date().getFullYear()} Hygiène & Combat. Tous droits réservés.</p>
            <p>Fabriqué en France 🇫🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
