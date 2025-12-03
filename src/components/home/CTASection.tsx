import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-brand-black text-brand-white py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-dark rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Parlez-nous de votre salle
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Chaque salle est différente. Contactez-nous pour une solution adaptée à votre 
            surface, votre fréquentation et vos besoins spécifiques.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              to="/devis" 
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
            >
              Demander un devis
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="btn-outline-light inline-flex items-center justify-center gap-2 text-lg"
            >
              <MessageSquare size={20} />
              Nous contacter
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              ✓ Réponse sous 24h
            </span>
            <span className="flex items-center gap-2">
              ✓ Livraison 48h
            </span>
            <span className="flex items-center gap-2">
              ✓ Fabriqué en France
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
