import { useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import ScrollArrow from "@/components/ui/ScrollArrow";
import { Sparkles, ShieldCheck, Wind } from "lucide-react";
import { fetchClientLogos, type ClientLogo } from "@/lib/googleSheets";

const benefits = [
  {
    icon: Sparkles,
    title: "Nettoie en profondeur",
    description:
      "Élimine saleté, sueur et résidus pour des surfaces impeccables après chaque entraînement.",
  },
  {
    icon: ShieldCheck,
    title: "Désinfecte efficacement",
    description:
      "Détruit bactéries, champignons et virus responsables des infections cutanées (herpès, teigne, staphylocoque).",
  },
  {
    icon: Wind,
    title: "Supprime les odeurs",
    description:
      "Neutralise les mauvaises odeurs de transpiration et laisse un parfum frais d'eucalyptus.",
  },
];

const BenefitsSection = () => {
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

  // Double the logos for seamless loop
  const doubledLogos = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <Section variant="light" id="ce-que-fait-la-solution" fullScreen className="relative overflow-hidden">
      {/* Centered content wrapper */}
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <div className="w-full space-y-6 md:space-y-8 lg:space-y-10">
          {/* Client Logos Section - Reduced top spacing */}
          {!isLoadingLogos && logos.length > 0 && (
            <div className="animate-fade-in">
              <p className="text-center text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 uppercase tracking-wider">
                Ils nous font confiance
              </p>
              
              {/* Scrolling logos container */}
              <div className="relative">
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
                        className="block w-28 h-14 md:w-32 md:h-16 flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={logo.logoUrl}
                          alt={`Logo ${logo.name} - Client Hygiène & Combat`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <div className="w-28 h-14 md:w-32 md:h-16 flex items-center justify-center">
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
        )}

          {/* Header - Reduced spacing */}
          <div className="text-center max-w-3xl mx-auto animate-fade-in pt-2 md:pt-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black mb-2 md:mb-3">
              Ce que fait la solution
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Un seul produit pour nettoyer, désinfecter et désodoriser vos équipements.
            </p>
          </div>

          {/* Benefits grid - Reduced height boxes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
            {benefits.map((benefit, index) => {
              const delayClass = index === 0 ? "" : index === 1 ? "delay-200" : "delay-400";
              return (
                <div
                  key={benefit.title}
                  className={`group bg-card p-5 md:p-6 rounded-xl border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-1 text-center animate-fade-up ${delayClass} flex flex-col items-center justify-center`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 text-primary mb-3 md:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    <benefit.icon size={24} className="md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-black mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="protegez-vos-adherents" variant="light" />
    </Section>
  );
};

export default BenefitsSection;
