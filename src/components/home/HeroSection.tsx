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
        // Only log in development
        if (import.meta.env.DEV) {
          console.error("Error loading client logos:", error);
        }
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
    <section className="relative min-h-screen bg-brand-black text-brand-white overflow-hidden pt-16 md:pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      <div className="container-wide relative z-10 min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-16 md:py-24">
        <div className="grid lg:grid-cols-3 grid-content items-center w-full">
          {/* Left content - 2/3 width */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left animate-fade-in lg:col-span-2">
            <div className="space-y-6">
              <h1 className="max-w-4xl mx-auto lg:mx-0">
                Un produit pensé{" "}
                <span className="text-primary">PAR</span> les gens du combat{" "}
                <span className="text-primary">POUR</span> les gens du combat
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground content-block mx-auto lg:mx-0">
                Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
                sans rendre les surfaces glissantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
                className="w-full sm:w-auto border-2 border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
              >
                Demander un devis
              </Button>
            </div>
          </div>

          {/* Right content - Video - 1/3 width */}
          <div className="relative order-first lg:order-last flex items-center justify-center animate-fade-in delay-200 lg:col-span-1 w-full">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Desktop: vertical aspect ratio */}
              <div className="hidden lg:block relative w-full">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat pour salles de sport"
                    title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                    }}
                  >
                    <source src="/videos/bidon h&c.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Mobile/Tablet: horizontal aspect ratio */}
              <div className="lg:hidden relative w-full">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                    aria-label="Vidéo de présentation du biocide 3-en-1 Hygiène & Combat pour salles de sport"
                    title="Biocide 3-en-1 Hygiène & Combat - Désinfectant salle de sport"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                    }}
                  >
                    <source src="/videos/bidon h&c.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos Section */}
        {!isLoadingLogos && logos.length > 0 && (
          <div className="w-full mt-12 md:mt-16 animate-fade-in overflow-hidden">
            <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-wider font-medium">
              Ils nous font confiance
            </p>
            
            {/* Scrolling logos container */}
            <div className="relative w-full">
              <div className="flex animate-scroll-logos">
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 mx-6 md:mx-8 lg:mx-12"
                  >
                    {logo.websiteUrl ? (
                      <a
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-14 md:w-32 md:h-16 flex items-center justify-center hover:opacity-80 transition-opacity min-h-[56px]"
                        aria-label={`Visiter le site de ${logo.name}`}
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="w-28 h-14 md:w-32 md:h-16 flex items-center justify-center min-h-[56px]">
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
              <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-brand-black to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-brand-black to-transparent pointer-events-none z-10" />
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
