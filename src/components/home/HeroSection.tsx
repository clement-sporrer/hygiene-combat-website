/**
 * HeroSection - Homepage Hero
 * 
 * Full-viewport hero with 12-column grid layout:
 * - Desktop: Left (cols 1-6) text/CTAs/trust, Right (cols 7-12) video
 * - Mobile: Stacked - text, video, trust row
 * - 100svh height, vertically centered content
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
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] bg-brand-black text-brand-white flex flex-col"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black/95 to-brand-blue-dark/30 pointer-events-none" 
        aria-hidden="true" 
      />
      
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main content area - flex-1 to fill available space */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-24 pb-4">
        
        {/* 12-column grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left column: Text + CTAs (cols 1-6 on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-5 lg:gap-6 text-center lg:text-left order-2 lg:order-1">
            
            {/* H1 Headline */}
            <h1 
              id="hero-heading"
              className="text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight"
            >
              Un produit pensé{" "}
              <span className="text-primary">PAR</span> les gens du combat{" "}
              <span className="text-primary">POUR</span> les gens du combat
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/70 max-w-[50ch] mx-auto lg:mx-0">
              Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
              sans rendre les surfaces glissantes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-1">
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
                className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white hover:text-brand-black hover:border-white transition-all duration-200"
              >
                Demander un devis
              </Button>
            </div>

            {/* Trust row - Desktop only (inside left column) */}
            <div className="hidden lg:block pt-8">
              <TrustRow 
                logos={logos}
                doubledLogos={doubledLogos}
                isLoading={isLoadingLogos}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                carouselRef={carouselRef}
              />
            </div>
          </div>

          {/* Right column: Video (cols 7-12 on desktop) */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]">
              {/* Aspect ratio wrapper - 3:4 for vertical video */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                {/* Video glow effect */}
                <div 
                  className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-50 -z-10" 
                  aria-hidden="true" 
                />
                
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

        {/* Trust row - Mobile/Tablet (below grid) */}
        <div className="lg:hidden mt-10">
          <TrustRow 
            logos={logos}
            doubledLogos={doubledLogos}
            isLoading={isLoadingLogos}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            carouselRef={carouselRef}
          />
        </div>
      </div>

      {/* Scroll indicator - fixed height at bottom */}
      <div className="relative z-10 shrink-0 h-14 flex items-center justify-center">
        <button
          onClick={scrollToNextSection}
          className="group flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full text-white/40 hover:text-white/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black motion-safe:animate-bounce-subtle"
          aria-label="Défiler vers la section suivante"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

/* Trust Row Component */
interface TrustRowProps {
  logos: ClientLogo[];
  doubledLogos: ClientLogo[];
  isLoading: boolean;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

const TrustRow = ({ 
  logos, 
  doubledLogos, 
  isLoading, 
  isPaused, 
  setIsPaused, 
  carouselRef 
}: TrustRowProps) => {
  if (isLoading || logos.length === 0) {
    return <div className="h-16" aria-hidden="true" />;
  }

  return (
    <div className="space-y-4">
      {/* Label */}
      <p className="text-xs sm:text-sm text-white/50 uppercase tracking-[0.15em] font-medium text-center lg:text-left">
        Ils nous font confiance
      </p>

      {/* Logo carousel */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden h-12 sm:h-14 lg:h-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex items-center h-full ${isPaused ? "" : "animate-scroll-logos"}`}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-5 sm:mx-8 lg:mx-10 h-full flex items-center"
            >
              {logo.websiteUrl ? (
                <a
                  href={logo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-10 sm:h-11 lg:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
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
                <div className="h-10 sm:h-11 lg:h-12 w-auto opacity-70">
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
        <div 
          className="absolute inset-y-0 left-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-brand-black to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-y-0 right-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-l from-brand-black to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
      </div>
    </div>
  );
};

export default HeroSection;
