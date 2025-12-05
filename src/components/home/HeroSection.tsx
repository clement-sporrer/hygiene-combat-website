import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-brand-black text-brand-white overflow-hidden pt-16 md:pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 max-w-screen-2xl w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center w-full py-8 sm:py-12 md:py-16 lg:py-0">
          {/* Left content */}
          <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 text-center lg:text-left animate-fade-in max-w-2xl mx-auto lg:mx-0 w-full">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-blue-dark/30 rounded-full text-xs sm:text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Solution professionnelle
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                Un produit pensé{" "}
                <span className="text-primary">par</span> les gens du combat{" "}
                <span className="text-primary">pour</span> les gens du combat
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
                sans rendre les surfaces glissantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <Button
                asLink
                to="/solution"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Découvrir la solution
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
              >
                Demander un devis
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">3-en-1</span>
                  <span className="whitespace-nowrap">Biocide complet</span>
                </div>
                <div className="hidden sm:block w-px h-5 sm:h-6 md:h-8 bg-border/50" />
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">5 min</span>
                  <span className="whitespace-nowrap">Temps d'action</span>
                </div>
                <div className="hidden md:block w-px h-8 bg-border/50" />
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">🇫🇷</span>
                  <span className="whitespace-nowrap">Made in France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Video */}
          <div className="relative order-first lg:order-last flex items-center justify-center h-full animate-fade-in delay-200 w-full">
            <div 
              className="relative w-full flex items-center justify-center mx-auto"
              style={{ 
                maxWidth: 'clamp(280px, 85vw, 410px)',
                width: '100%'
              }}
            >
              {/* Desktop: plus grande et plus verticale */}
              <div className="hidden lg:block relative w-full" style={{ maxWidth: '500px' }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
                
                {/* Video container - aspect ratio vertical pour desktop */}
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-glow transition-all duration-300">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat pour salles de sport"
                    title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                  >
                    <source src="/videos/product-showcase.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Mobile/Tablet: comportement responsive actuel */}
              <div className="lg:hidden relative w-full">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
                
                {/* Video container - proportions fluides: plus large et moins haut sur mobile */}
                <div 
                  className="relative w-full rounded-3xl overflow-hidden shadow-glow transition-all duration-300"
                  style={{
                    aspectRatio: 'clamp(0.7, calc(100vw / 450), 0.75)'
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat pour salles de sport"
                    title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                  >
                    <source src="/videos/product-showcase.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <ScrollArrow targetId="ce-que-fait-la-solution" variant="dark" />
    </section>
  );
};

export default HeroSection;
