/**
 * HeroSection - Homepage Hero
 * 
 * Structure en 3 zones verticales dans un container 100svh :
 * - Zone A : Contenu principal (texte + vidéo) - flex-1, centré
 * - Zone B : Carrousel "Ils nous font confiance" - hauteur fixe, proche du contenu
 * - Zone C : Flèche de navigation - hauteur compacte
 * 
 * Design: Premium, wide layout, impactful typography
 */

import { useEffect, useState, useRef } from "react";
import Button from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";

const NEXT_SECTION_ID = "solution-summary";

const HeroSection = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const clientLogos = await fetchClientLogos();
        setLogos(clientLogos);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Error loading client logos:", error);
        }
      } finally {
        setIsLoadingLogos(false);
      }
    };
    loadLogos();
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById(NEXT_SECTION_ID);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDiscoverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollToNextSection();
  };

  const doubledLogos = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section
      id="home-hero"
      className="
        relative min-h-[100svh] overflow-hidden
        bg-brand-black text-brand-white
        flex flex-col
      "
    >
      {/* Background avec gradient premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black/95 to-brand-blue-dark/30 pointer-events-none" />
      
      {/* Subtle glow effect */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ============================================================
          ZONE A : Contenu principal - WIDE LAYOUT
          ============================================================ */}
      <div className="
        relative z-10 flex-1 min-h-0
        flex items-center
        w-full max-w-[1600px] mx-auto
        px-5 sm:px-8 lg:px-12 xl:px-16
        pt-24 md:pt-28 lg:pt-28
        pb-6 md:pb-8
      ">
        <div className="
          w-full
          grid grid-cols-1 lg:grid-cols-12
          gap-8 lg:gap-10 xl:gap-16
          items-center
        ">
          {/* Colonne gauche : Texte + CTA - 7 colonnes sur 12 */}
          <div className="
            lg:col-span-7
            flex flex-col gap-6 lg:gap-8
            text-center lg:text-left
            order-2 lg:order-1
          ">
            {/* H1 - Plus grand, plus impactant */}
            <h1 className="
              text-[clamp(2rem,6vw,4.5rem)]
              leading-[1.05]
              font-bold tracking-[-0.02em]
              max-w-[18ch]
              mx-auto lg:mx-0
            ">
              Un produit pensé{" "}
              <span className="text-primary">PAR</span> les gens du combat{" "}
              <span className="text-primary">POUR</span> les gens du combat
            </h1>

            {/* Sous-titre - Plus lisible */}
            <p className="
              text-[clamp(1rem,2.5vw,1.25rem)]
              leading-relaxed
              text-white/75
              max-w-[50ch]
              mx-auto lg:mx-0
            ">
              Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
              sans rendre les surfaces glissantes.
            </p>

            {/* CTAs - Plus espacés et impactants */}
            <div className="
              flex flex-col sm:flex-row
              gap-4
              justify-center lg:justify-start
              pt-2
            ">
              <Button
                asLink
                to={`#${NEXT_SECTION_ID}`}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleDiscoverClick}
                className="w-full sm:w-auto px-8"
              >
                Découvrir la solution
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="
                  w-full sm:w-auto px-8
                  border-2 border-white/60 text-white
                  hover:bg-white hover:text-brand-black hover:border-white
                  transition-all duration-300
                "
              >
                Demander un devis
              </Button>
            </div>
          </div>

          {/* Colonne droite : Vidéo - 5 colonnes sur 12 */}
          <div className="
            lg:col-span-5
            flex items-center justify-center lg:justify-end
            order-1 lg:order-2
          ">
            <div className="
              relative
              w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px]
              aspect-[3/4]
              rounded-2xl lg:rounded-3xl
              overflow-hidden
              shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]
              ring-1 ring-white/10
            ">
              {/* Video glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-50" />
              
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="relative w-full h-full object-cover"
                aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat"
                title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = "none";
                }}
              >
                <source src="/videos/bidon h&c.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          ZONE B : Carrousel "Ils nous font confiance" - Plus haut
          ============================================================ */}
      <div className="
        relative z-10
        w-full max-w-[1600px] mx-auto
        px-5 sm:px-8 lg:px-12 xl:px-16
        shrink-0
      ">
        {!isLoadingLogos && logos.length > 0 && (
          <div className="py-4 sm:py-5 lg:py-6">
            {/* Titre */}
            <p className="
              text-[10px] sm:text-[11px] lg:text-xs
              text-white/40
              uppercase tracking-[0.2em]
              font-medium
              text-center
              mb-3 sm:mb-4
            ">
              Ils nous font confiance
            </p>

            {/* Carrousel */}
            <div
              ref={carouselRef}
              className="relative w-full overflow-hidden h-[36px] sm:h-[40px] lg:h-[44px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`
                  flex items-center h-full
                  ${isPaused ? "" : "animate-scroll-logos"}
                `}
                style={{
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 mx-5 sm:mx-7 lg:mx-10 h-full flex items-center"
                  >
                    {logo.websiteUrl ? (
                      <a
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          block h-[28px] sm:h-[32px] lg:h-[36px]
                          w-auto
                          opacity-50 hover:opacity-100
                          transition-opacity duration-300
                          focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded
                        "
                        aria-label={`Visiter le site de ${logo.name}`}
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name}`}
                          className="h-full w-auto object-contain brightness-0 invert"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="h-[28px] sm:h-[32px] lg:h-[36px] w-auto opacity-50">
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name}`}
                          className="h-full w-auto object-contain brightness-0 invert"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fade edges - Plus larges */}
              <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-brand-black to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-brand-black to-transparent pointer-events-none" />
            </div>
          </div>
        )}

        {/* Placeholder */}
        {(isLoadingLogos || logos.length === 0) && (
          <div className="h-[60px]" aria-hidden="true" />
        )}
      </div>

      {/* ============================================================
          ZONE C : Flèche - Compacte
          ============================================================ */}
      <div className="
        relative z-10
        h-12 sm:h-14
        flex items-center justify-center
        shrink-0
      ">
        <button
          onClick={scrollToNextSection}
          className="
            group
            flex items-center justify-center
            p-2
            min-h-[44px] min-w-[44px]
            rounded-full
            text-white/40 hover:text-white/80
            transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black
            motion-safe:animate-bounce-subtle
          "
          aria-label="Défiler vers la section suivante"
        >
          <ChevronDown size={24} className="sm:w-7 sm:h-7" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
