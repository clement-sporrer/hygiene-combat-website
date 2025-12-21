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
    <section className="hero-section">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-blue-dark/20" />
      
      {/* Main Hero Grid - Content area */}
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left: Text + CTA */}
          <div className="hero-content-left">
            <h1 className="hero-title">
              Un produit pensé{" "}
              <span className="text-primary">PAR</span> les gens du combat{" "}
              <span className="text-primary">POUR</span> les gens du combat
            </h1>
            
            <p className="hero-subtitle">
              Nettoie, désinfecte et enlève les mauvaises odeurs en 5 minutes, 
              sans rendre les surfaces glissantes.
            </p>

            <div className="hero-cta-group">
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

          {/* Right: Video */}
          <div className="hero-video-wrapper">
            <div className="hero-video-container">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="hero-video"
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

        {/* Client Logos Section - Bottom of hero */}
        {!isLoadingLogos && logos.length > 0 && (
          <div className="hero-logos-section">
            <p className="hero-logos-title">
              Ils nous font confiance
            </p>
            
            {/* Scrolling logos container */}
            <div className="hero-logos-track">
              <div className="hero-logos-scroll">
                {doubledLogos.map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="hero-logo-item"
                  >
                    {logo.websiteUrl ? (
                      <a
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-logo-link"
                        aria-label={`Visiter le site de ${logo.name}`}
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="hero-logo-img"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="hero-logo-link">
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="hero-logo-img"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Fade edges */}
              <div className="hero-logos-fade-left" />
              <div className="hero-logos-fade-right" />
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
