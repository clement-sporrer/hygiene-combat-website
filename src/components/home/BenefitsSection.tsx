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
    <Section variant="light" id="ce-que-fait-la-solution" className="h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Client Logos Section */}
      {!isLoadingLogos && logos.length > 0 && (
        <div className="mb-12 md:mb-16 animate-fade-in">
          <p className="text-center text-sm text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider">
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

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black mb-4 md:mb-6">
          Ce que fait la solution
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Un seul produit pour nettoyer, désinfecter et désodoriser vos équipements.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {benefits.map((benefit, index) => {
          const delayClass = index === 0 ? "" : index === 1 ? "delay-200" : "delay-400";
          return (
            <div
              key={benefit.title}
              className={`group bg-card p-6 md:p-8 rounded-xl border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-1 text-center animate-fade-up ${delayClass}`}
            >
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
              <benefit.icon size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-brand-black mb-3">
              {benefit.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {benefit.description}
            </p>
          </div>
          );
        })}
      </div>
      
      {/* Scroll arrow */}
      <ScrollArrow targetId="protegez-vos-adherents" variant="light" />
    </Section>
  );
};

export default BenefitsSection;
