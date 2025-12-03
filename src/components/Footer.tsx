import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoWhite} alt="Hygiène & Combat" className="h-14 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Solution d'hygiène pensée par les gens du combat pour les gens du combat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/solution" className="text-muted-foreground hover:text-primary transition-colors">
                Notre solution
              </Link>
              <Link to="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/devis" className="text-muted-foreground hover:text-primary transition-colors">
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Informations légales</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link to="/cgv" className="text-muted-foreground hover:text-primary transition-colors">
                CGV
              </Link>
              <Link to="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@hygiene-combat.fr"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>contact@hygiene-combat.fr</span>
              </a>
              <a
                href="tel:+33600000000"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={18} />
                <span>06 00 00 00 00</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} />
                <span>Hauts-de-Seine (92)</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Lun – Ven : 10h – 20h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-blue-dark/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Hygiène & Combat. Tous droits réservés.</p>
            <p>Fabriqué en France 🇫🇷</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
