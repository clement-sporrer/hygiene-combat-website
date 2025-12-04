import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/layout/Section";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="light" />
      
      <main>
        <Section fullScreen>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                Page introuvable
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Retour à l'accueil
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline-dark inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Page précédente
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Vous pouvez également consulter :
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/solution" className="text-primary hover:underline text-sm">
                  Notre solution
                </Link>
                <Link to="/a-propos" className="text-primary hover:underline text-sm">
                  À propos
                </Link>
                <Link to="/contact" className="text-primary hover:underline text-sm">
                  Contact
                </Link>
                <Link to="/devis" className="text-primary hover:underline text-sm">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
