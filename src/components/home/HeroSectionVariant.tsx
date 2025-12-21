/**
 * HeroSectionVariant - Homepage Hero with Theme Variants
 */

import { useEffect, useState, useRef } from "react";
import Button from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";
import { ThemeVariant, getThemeConfig, shouldUseLightText } from "@/lib/themeVariants";
import { cn } from "@/lib/utils";

const NEXT_SECTION_ID = "solution-summary";

interface HeroSectionVariantProps {
  variant: ThemeVariant;
}

const HeroSectionVariant = ({ variant }: HeroSectionVariantProps) => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const theme = getThemeConfig(variant);
  const useLightText = shouldUseLightText(variant);

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

  // Dynamic background styles based on variant
  const getBgStyle = () => {
    if (variant === 'gradient-clair-fonce') {
      return { background: 'linear-gradient(to bottom, #87a6bb, #384a54)' };
    }
    if (variant === 'gradient-fonce-clair') {
      return { background: 'linear-gradient(to bottom, #384a54, #87a6bb)' };
    }
    return {};
  };

  const bgClass = cn(
    "relative min-h-[100svh] flex flex-col",
    useLightText ? "text-brand-white" : "text-brand-black",
    variant === 'noir' && "bg-brand-black",
    variant === 'bleu-clair' && "bg-[#87a6bb]",
    variant === 'bleu-fonce' && "bg-[#384a54]"
  );

  // Gradient overlay for non-gradient variants
  const getGradientOverlay = () => {
    if (variant === 'noir') {
      return "bg-gradient-to-br from-brand-black via-brand-black/95 to-brand-blue-dark/30";
    }
    if (variant === 'bleu-clair') {
      return "bg-gradient-to-br from-[#87a6bb] via-[#87a6bb]/95 to-[#384a54]/40";
    }
    if (variant === 'bleu-fonce') {
      return "bg-gradient-to-br from-[#384a54] via-[#384a54]/95 to-brand-black/30";
    }
    return "";
  };

  // Text colors
  const textColor = useLightText ? "text-white" : "text-brand-black";
  const mutedTextColor = useLightText ? "text-white/70" : "text-brand-black/70";
  const labelColor = useLightText ? "text-white/50" : "text-brand-black/50";

  // Outline button style
  const outlineButtonClass = useLightText
    ? "border-2 border-white/50 text-white hover:bg-white hover:text-brand-black hover:border-white"
    : "border-2 border-brand-black/50 text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black";

  return (
    <section
      id="home-hero"
      aria-labelledby="hero-heading"
      className={bgClass}
      style={getBgStyle()}
    >
      {/* Background gradient for solid color variants */}
      {!variant.startsWith('gradient') && (
        <div 
          className={cn("absolute inset-0 pointer-events-none", getGradientOverlay())} 
          aria-hidden="true" 
        />
      )}
      
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 md:pt-24 pb-4">
        
        {/* 12-column grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left column: Text + CTAs */}
          <div className="lg:col-span-6 flex flex-col gap-5 lg:gap-6 text-center lg:text-left order-2 lg:order-1">
            
            {/* H1 Headline */}
            <h1 
              id="hero-heading"
              className={cn("text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight", textColor)}
            >
              Un produit pensé{" "}
              <span className="text-primary">PAR</span> les gens du combat{" "}
              <span className="text-primary">POUR</span> les gens du combat
            </h1>

            {/* Subtext */}
            <p className={cn("text-base sm:text-lg lg:text-xl leading-relaxed max-w-[50ch] mx-auto lg:mx-0", mutedTextColor)}>
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
                className={cn("w-full sm:w-auto transition-all duration-200", outlineButtonClass)}
              >
                Demander un devis
              </Button>
            </div>

            {/* Trust row - Desktop only */}
            <div className="hidden lg:block pt-8">
              <TrustRowVariant 
                logos={logos}
                doubledLogos={doubledLogos}
                isLoading={isLoadingLogos}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                carouselRef={carouselRef}
                useLightText={useLightText}
                variant={variant}
              />
            </div>
          </div>

          {/* Right column: Video */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
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

        {/* Trust row - Mobile/Tablet */}
        <div className="lg:hidden mt-10">
          <TrustRowVariant 
            logos={logos}
            doubledLogos={doubledLogos}
            isLoading={isLoadingLogos}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            carouselRef={carouselRef}
            useLightText={useLightText}
            variant={variant}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 shrink-0 h-14 flex items-center justify-center">
        <button
          onClick={scrollToNextSection}
          className={cn(
            "group flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-safe:animate-bounce-subtle",
            useLightText ? "text-white/40 hover:text-white/80" : "text-brand-black/40 hover:text-brand-black/80"
          )}
          aria-label="Défiler vers la section suivante"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

/* Trust Row Component with variant support */
interface TrustRowVariantProps {
  logos: ClientLogo[];
  doubledLogos: ClientLogo[];
  isLoading: boolean;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  carouselRef: React.RefObject<HTMLDivElement>;
  useLightText: boolean;
  variant: ThemeVariant;
}

const TrustRowVariant = ({ 
  logos, 
  doubledLogos, 
  isLoading, 
  isPaused, 
  setIsPaused, 
  carouselRef,
  useLightText,
  variant,
}: TrustRowVariantProps) => {
  if (isLoading || logos.length === 0) {
    return <div className="h-16" aria-hidden="true" />;
  }

  const labelColor = useLightText ? "text-white/50" : "text-brand-black/50";
  
  // Fade gradient based on variant
  const getFadeFrom = () => {
    if (variant === 'noir') return 'from-brand-black';
    if (variant === 'bleu-clair') return 'from-[#87a6bb]';
    if (variant === 'bleu-fonce') return 'from-[#384a54]';
    if (variant === 'gradient-clair-fonce') return 'from-[#87a6bb]';
    if (variant === 'gradient-fonce-clair') return 'from-[#384a54]';
    return 'from-brand-black';
  };

  return (
    <div className="space-y-4">
      <p className={cn("text-xs sm:text-sm uppercase tracking-[0.15em] font-medium text-center lg:text-left", labelColor)}>
        Ils nous font confiance
      </p>

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
          className={cn("absolute inset-y-0 left-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-r to-transparent pointer-events-none", getFadeFrom())} 
          aria-hidden="true" 
        />
        <div 
          className={cn("absolute inset-y-0 right-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-l to-transparent pointer-events-none", getFadeFrom())} 
          aria-hidden="true" 
        />
      </div>
    </div>
  );
};

export default HeroSectionVariant;

