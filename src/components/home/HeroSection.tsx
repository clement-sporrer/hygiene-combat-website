import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { ArrowRight } from "lucide-react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";

const HeroSection = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const clientLogos = await fetchClientLogos();
        setLogos(clientLogos);
      } catch (error) {
        console.error("Error loading client logos:", error);
      } finally {
        setIsLoadingLogos(false);
      }
    };

    loadLogos();
  }, []);

  const handleCTAClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById("ce-que-fait-la-solution");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Double the logos for seamless loop
  const doubledLogos = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section className="relative min-h-screen bg-brand-black text-brand-white overflow-hidden pt-12 md:pt-16 overflow-x-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 max-w-screen-2xl w-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-start overflow-x-hidden pt-4 sm:pt-8 md:pt-12 lg:pt-16">
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-10 xl:gap-14 items-start w-full py-0 sm:py-2 md:py-4 lg:py-0">
          {/* Left content - 2/3 width */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-center lg:text-left animate-fade-in lg:col-span-2 lg:ml-8 xl:ml-12 2xl:ml-16 w-full" style={{ fontSize: '1.15em' }}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight tracking-tight">
                Un produit pensé{" "}
                <span className="text-primary">PAR</span> les gens du combat{" "}
                <span className="text-primary">POUR</span> les gens du combat
              </h1>
              
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
                sans rendre les surfaces glissantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-3">
              <Button
                asLink
                to="#ce-que-fait-la-solution"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
                onClick={handleCTAClick}
              >
                Découvrir la solution
              </Button>
              <Button
                asLink
                to="/devis"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
              >
                Demander un devis
              </Button>
            </div>
          </div>

          {/* Right content - Video - 1/3 width */}
          <div className="relative order-first lg:order-last flex items-start justify-center animate-fade-in delay-200 lg:col-span-1 w-full -mt-2 sm:-mt-4 md:-mt-6">
            <div 
              className="relative w-full flex items-center justify-center mx-auto"
              style={{ 
                maxWidth: 'clamp(224px, 68vw, 328px)',
                width: '100%'
              }}
            >
              {/* Desktop: plus grande et plus verticale */}
              <div className="hidden lg:block relative w-full" style={{ maxWidth: '400px' }}>
                {/* Video container - aspect ratio vertical pour desktop */}
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-300">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat pour salles de sport"
                    title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                  >
                    <source src="/videos/bidon h&c.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Mobile/Tablet: comportement responsive actuel */}
              <div className="lg:hidden relative w-full max-w-[90vw] mx-auto">
                {/* Video container - proportions fluides: plus large et moins haut sur mobile */}
                <div 
                  className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    aspectRatio: 'clamp(0.75, calc(100vw / 400), 0.85)'
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
                    <source src="/videos/bidon h&c.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos Section - Ils nous font confiance - Full width band */}
        {!isLoadingLogos && logos.length > 0 && (
          <div className="w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 animate-fade-in overflow-hidden">
            <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 md:mb-5 uppercase tracking-wider">
              Ils nous font confiance
            </p>
            
            {/* Scrolling logos container */}
            <div className="relative w-full">
              <div className="flex animate-scroll-logos">
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12"
                  >
                    {logo.websiteUrl ? (
                      <a
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16 flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16 flex items-center justify-center">
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-brand-black to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-10" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll arrow */}
      <ScrollArrow targetId="solution-summary" variant="dark" showOnMobile={true} />
    </section>
  );
};

export default HeroSection;
