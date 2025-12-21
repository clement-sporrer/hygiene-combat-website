import { useEffect, useState } from "react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";
import ScrollArrow from "@/components/ui/ScrollArrow";

const ClientLogos = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    };

    loadLogos();
  }, []);

  if (isLoading) {
    return (
      <section id="client-logos" className="bg-brand-white h-screen flex flex-col justify-center border-y border-border">
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Ils nous font confiance
          </p>
          <div className="flex justify-center">
            <div className="text-muted-foreground">Chargement...</div>
          </div>
        </div>
      </section>
    );
  }

  if (logos.length === 0) {
    return null;
  }

  // Double the logos for seamless loop
  const doubledLogos = [...logos, ...logos];

  return (
    <section id="client-logos" className="bg-brand-white h-screen flex flex-col justify-center border-y border-border overflow-hidden relative">
      <div className="container mx-auto w-full">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider animate-fade-in">
          Ils nous font confiance
        </p>
        
        {/* Scrolling logos container */}
        <div className="relative">
        <div className="flex animate-scroll-logos">
          {doubledLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              {logo.websiteUrl ? (
                <a
                  href={logo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-32 h-16 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={logo.logoUrl}
                    alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className="w-32 h-16 flex items-center justify-center">
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
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-white to-transparent pointer-events-none" />
        </div>
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="ce-que-fait-la-solution" variant="light" />
    </section>
  );
};

export default ClientLogos;
