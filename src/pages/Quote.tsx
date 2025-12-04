import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import FormField from "@/components/ui/FormField";
import TextareaField from "@/components/ui/TextareaField";
import SelectField from "@/components/ui/SelectField";
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

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
      
      <main className="pt-20">
        {/* Hero */}
        <Section variant="muted" className="py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black">
              Demander un devis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Remplissez ce formulaire et nous vous proposons une solution 
              adaptée à votre salle et à votre usage.
            </p>
          </div>
        </Section>

        {/* Form section */}
        <Section variant="light">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10">
              {/* Contact info */}
              <div className="space-y-5 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-brand-black">
                  Vos coordonnées
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
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
              <div className="space-y-5 md:space-y-6 pt-6 md:pt-8 border-t border-border">
                <h2 className="text-xl md:text-2xl font-semibold text-brand-black">
                  Votre salle
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Nom de la salle"
                    type="text"
                    {...register("gymName")}
                    error={errors.gymName?.message}
                    placeholder="Fight Club Paris"
                    required
                  />
                  <FormField
                    label="Ville / Code postal"
                    type="text"
                    {...register("location")}
                    error={errors.location?.message}
                    placeholder="Paris 75001"
                    required
                  />
                </div>

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
                  label="Nombre approximatif d'adhérents"
                  {...register("members")}
                  options={[
                    { value: "", label: "Sélectionner..." },
                    { value: "0-50", label: "Moins de 50" },
                    { value: "50-100", label: "50 - 100" },
                    { value: "100-200", label: "100 - 200" },
                    { value: "200-500", label: "200 - 500" },
                    { value: "500+", label: "Plus de 500" },
                  ]}
                />
              </div>

              {/* Message */}
              <div className="space-y-5 md:space-y-6 pt-6 md:pt-8 border-t border-border">
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
            <div className="mt-10 md:mt-12 p-5 md:p-6 bg-muted/50 rounded-xl">
              <div className="flex items-start gap-3 md:gap-4">
                <Truck className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-black mb-2 text-sm md:text-base">
                    Informations livraison
                  </h4>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span>France métropolitaine + Corse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span>Livraison sous 48h après facturation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      <span>Devis personnalisé sous 24h</span>
                    </li>
                  </ul>
                </div>
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
