/**
 * HeroSection - Homepage Hero
 * 
 * Structure en 3 zones verticales dans un container 100svh :
 * - Zone A : Contenu principal (texte + vidéo) - flex-1, centré
 * - Zone B : Carrousel "Ils nous font confiance" - hauteur fixe
 * - Zone C : Espace + flèche de navigation - hauteur fixe
 * 
 * Breakpoints vérifiés : 375px, 390-430px, 768px, 1024px, 1280px, 1440px, 1920px
 */

import { useEffect, useState, useRef } from "react";
import Button from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";

// ID de la section suivante pour le scroll
const NEXT_SECTION_ID = "solution-summary";

const HeroSection = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Charger les logos clients
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

  // Scroll vers la section suivante
  const scrollToNextSection = () => {
    const nextSection = document.getElementById(NEXT_SECTION_ID);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll vers la solution (CTA)
  const handleDiscoverClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollToNextSection();
  };

  // Double les logos pour le loop infini
  const doubledLogos = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section
      id="home-hero"
      className="
        relative min-h-[100svh] overflow-hidden
        bg-brand-black text-brand-white
        flex flex-col
        pt-20 md:pt-24 lg:pt-24
        pb-0
      "
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20 pointer-events-none" />

      {/* ============================================================
          ZONE A : Contenu principal (texte + vidéo)
          flex-1 pour occuper l'espace restant, centré verticalement
          ============================================================ */}
      <div className="
        relative z-10 flex-1 min-h-0
        flex items-center justify-center
        w-full max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
      ">
        <div className="
          w-full
          grid grid-cols-1 lg:grid-cols-2
          gap-8 lg:gap-12 xl:gap-16
          items-center
        ">
          {/* Colonne gauche : Texte + CTA */}
          <div className="
            flex flex-col gap-5 lg:gap-6
            text-center lg:text-left
            order-2 lg:order-1
          ">
            {/* H1 - Taille responsive avec clamp */}
            <h1 className="
              text-[clamp(1.75rem,5vw,3.5rem)]
              leading-[1.08]
              font-bold tracking-tight
              max-w-[20ch] lg:max-w-[22ch]
              mx-auto lg:mx-0
            ">
              Un produit pensé{" "}
              <span className="text-primary">PAR</span> les gens du combat{" "}
              <span className="text-primary">POUR</span> les gens du combat
            </h1>

            {/* Sous-titre */}
            <p className="
              text-[clamp(0.95rem,2vw,1.125rem)]
              leading-relaxed
              text-white/70
              max-w-[45ch]
              mx-auto lg:mx-0
            ">
              Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
              sans rendre les surfaces glissantes.
            </p>

            {/* CTAs */}
            <div className="
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
              justify-center lg:justify-start
              pt-1
            ">
              <Button
                asLink
                to={`#${NEXT_SECTION_ID}`}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleDiscoverClick}
                className="w-full sm:w-auto"
              >
                Découvrir la solution
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="
                  w-full sm:w-auto
                  border-2 border-white/80 text-white
                  hover:bg-white hover:text-brand-black
                  focus-visible:ring-white
                "
              >
                Demander un devis
              </Button>
            </div>
          </div>

          {/* Colonne droite : Vidéo */}
          <div className="
            flex items-center justify-center
            order-1 lg:order-2
          ">
            <div className="
              relative w-full
              max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[420px]
              aspect-[3/4]
              lg:max-h-[420px] xl:max-h-[480px]
              rounded-2xl lg:rounded-3xl
              overflow-hidden
              shadow-2xl shadow-black/40
              bg-brand-blue-dark/20
            ">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
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
          ZONE B : Carrousel "Ils nous font confiance"
          Hauteur fixe, largeur full container
          ============================================================ */}
      <div className="
        relative z-10
        w-full max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        h-[72px] sm:h-[80px] lg:h-[88px]
        flex flex-col justify-center
        shrink-0
      ">
        {!isLoadingLogos && logos.length > 0 && (
          <>
            {/* Titre discret */}
            <p className="
              text-[10px] sm:text-[11px]
              text-white/50
              uppercase tracking-[0.15em]
              font-medium
              text-center
              mb-2 sm:mb-3
            ">
              Ils nous font confiance
            </p>

            {/* Carrousel */}
            <div
              ref={carouselRef}
              className="relative w-full overflow-hidden h-[40px] sm:h-[44px] lg:h-[48px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`
                  flex items-center h-full
                  ${isPaused ? "animate-none" : "animate-scroll-logos"}
                `}
                style={{
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 h-full flex items-center"
                  >
                    {logo.websiteUrl ? (
                      <a
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          block h-[32px] sm:h-[36px] lg:h-[40px]
                          w-auto
                          opacity-60 hover:opacity-100
                          transition-opacity duration-200
                          focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black rounded
                        "
                        aria-label={`Visiter le site de ${logo.name}`}
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name}`}
                          className="h-full w-auto object-contain"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="h-[32px] sm:h-[36px] lg:h-[40px] w-auto opacity-60">
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name}`}
                          className="h-full w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-brand-black to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-brand-black to-transparent pointer-events-none" />
            </div>
          </>
        )}

        {/* Placeholder si chargement ou pas de logos (réserve l'espace) */}
        {(isLoadingLogos || logos.length === 0) && (
          <div className="h-full" aria-hidden="true" />
        )}
      </div>

      {/* ============================================================
          ZONE C : Espace libre + Flèche de navigation
          Hauteur fixe, flèche centrée
          ============================================================ */}
      <div className="
        relative z-10
        h-14 sm:h-16 lg:h-20
        flex items-center justify-center
        shrink-0
      ">
        <button
          onClick={scrollToNextSection}
          className="
            group
            flex flex-col items-center justify-center
            p-2
            min-h-[44px] min-w-[44px]
            rounded-full
            text-white/60 hover:text-white
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black
            motion-safe:animate-bounce-subtle
          "
          aria-label="Défiler vers la section suivante"
        >
          <ChevronDown size={28} className="sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

/**
 * Breakpoints checked:
 * - 375x812 (iPhone SE): Layout colonne, vidéo compacte, texte lisible, tout tient en 100svh
 * - 390x844 (iPhone 12/13/14): Idem, spacing optimisé
 * - 768x1024 (iPad): Layout colonne avec plus d'espace
 * - 1024x768 (iPad landscape): Transition vers 2 colonnes
 * - 1280x800 (Laptop): 2 colonnes équilibrées
 * - 1440x900 (Desktop): 2 colonnes avec plus de breathing room
 * - 1920x1080 (Full HD): Container max-w-7xl, centré, pas d'étirement
 * 
 * Ajustements clés:
 * - H1: clamp(1.75rem, 5vw, 3.5rem) pour scaling fluide
 * - Vidéo: max-w + max-h pour éviter débordement
 * - Carrousel: hauteur fixe (72-88px selon breakpoint)
 * - Zone flèche: hauteur fixe (56-80px selon breakpoint)
 * - prefers-reduced-motion: bounce désactivé via motion-safe
 */
