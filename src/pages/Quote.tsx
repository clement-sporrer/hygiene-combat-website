import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import FormField from "@/components/ui/FormField";
import TextareaField from "@/components/ui/TextareaField";
import SelectField from "@/components/ui/SelectField";
import PostalCodeField from "@/components/ui/PostalCodeField";
import Button from "@/components/ui/button";
import { Send, Truck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { quoteFormSchema, type QuoteFormData } from "@/lib/validations";
import { submitQuoteForm } from "@/lib/googleSheets";

const Quote = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      postalCode: "",
      city: "",
    },
  });

  const postalCodeValue = watch("postalCode");
  const cityValue = watch("city");

  const onSubmit = async (data: QuoteFormData) => {
    try {
      await submitQuoteForm(data);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous enverrons un devis personnalisé sous 24h.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <SEO
        title="Devis Désinfectant Salle de Sport | Hygiène & Combat - Gratuit"
        description="Demandez un devis personnalisé pour votre salle de sport. Solution d'hygiène adaptée à votre surface, fréquentation et besoins. Désinfectant tatami, ring, vestiaires. Réponse sous 24h."
        path="/devis"
        keywords="devis désinfectant salle sport, devis produit hygiène tatami, devis biocide professionnel, prix désinfectant ring"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero */}
        <Section variant="dark" size="narrow" spacing="hero" className="flex items-center">
          <div className="hero-content">
            <h1>Demander un devis</h1>
            <p className="text-lg md:text-xl text-muted-foreground content-block">
              Remplissez ce formulaire et nous vous proposons une solution 
              adaptée à votre salle et à votre usage.
            </p>
          </div>
        </Section>

        {/* Form section */}
        <Section variant="light" size="narrow" spacing="relaxed">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10">
              {/* Contact info */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-brand-black">
                  Vos coordonnées
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Nom / Prénom"
                    type="text"
                    {...register("name")}
                    error={errors.name?.message}
                    placeholder="Votre nom"
                    required
                  />
                  <FormField
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <FormField
                  label="Téléphone"
                  type="tel"
                  {...register("phone")}
                  error={errors.phone?.message}
                  placeholder="+33 6 15 61 35 31"
                  required
                />
              </div>

              {/* Gym info */}
              <div className="space-y-6 pt-8 border-t border-border">
                <h2 className="text-xl md:text-2xl font-semibold text-brand-black">
                  Votre salle
                </h2>

                <FormField
                  label="Nom de la salle"
                  type="text"
                  {...register("gymName")}
                  error={errors.gymName?.message}
                  placeholder="Fight Club Paris"
                  required
                />

                <PostalCodeField
                  postalCodeValue={postalCodeValue || ""}
                  cityValue={cityValue || ""}
                  onPostalCodeChange={(value) => setValue("postalCode", value, { shouldValidate: true })}
                  onCityChange={(value) => setValue("city", value, { shouldValidate: true })}
                  postalCodeError={errors.postalCode?.message}
                  cityError={errors.city?.message}
                  required
                />

                <FormField
                  label="Activités pratiquées"
                  type="text"
                  {...register("activities")}
                  placeholder="MMA, JJB, Boxe, Lutte, Grappling..."
                  helperText="Listez les principales activités de votre salle"
                />

                <FormField
                  label="Types de surfaces principales"
                  type="text"
                  {...register("surfaces")}
                  placeholder="Tatamis puzzle, ring, cage, sol musculation..."
                  helperText="Décrivez les surfaces à nettoyer"
                />

                <SelectField
                  label="Surfaces en m²"
                  {...register("surfaceArea")}
                  options={[
                    { value: "", label: "Sélectionner..." },
                    { value: "0-150", label: "0 à 150 m²" },
                    { value: "150-350", label: "150 à 350 m²" },
                    { value: "350-600", label: "350 à 600 m²" },
                    { value: "600+", label: "+600 m²" },
                  ]}
                />

                <SelectField
                  label="Fréquence d'activités hebdomadaire"
                  {...register("frequency")}
                  options={[
                    { value: "", label: "Sélectionner..." },
                    { value: "1j/7", label: "1j/7" },
                    { value: "2j/7", label: "2j/7" },
                    { value: "3j/7", label: "3j/7" },
                    { value: "4j/7", label: "4j/7" },
                    { value: "5j/7", label: "5j/7" },
                    { value: "6j/7", label: "6j/7" },
                    { value: "7j/7", label: "7j/7" },
                  ]}
                />
              </div>

              {/* Message */}
              <div className="pt-8 border-t border-border">
                <TextareaField
                  label="Message / Besoins spécifiques"
                  rows={5}
                  {...register("message")}
                  placeholder="Décrivez vos besoins, fréquence de nettoyage souhaitée, questions..."
                  helperText="Plus de détails nous aident à vous proposer la meilleure solution"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
            </form>

            {/* Delivery info */}
            <div className="mt-12 md:mt-16 card p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="text-primary flex-shrink-0" size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-black mb-4 text-lg">
                    Informations livraison
                  </h4>
                  <ul className="space-y-3 text-base text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                      <span>France métropolitaine + Corse</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Livraison sous 48h après facturation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                      <span>Devis personnalisé sous 24h</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Quote;
