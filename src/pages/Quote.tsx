import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Send, Truck, CheckCircle2, AlertCircle } from "lucide-react";
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
        title="Demander un devis | Hygiène & Combat"
        description="Demandez un devis personnalisé pour votre salle de sport. Solution adaptée à votre surface, votre fréquentation et vos besoins spécifiques."
        path="/devis"
      />
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black">
                Demander un devis
              </h1>
              <p className="text-xl text-muted-foreground">
                Remplissez ce formulaire et nous vous proposons une solution 
                adaptée à votre salle et à votre usage.
              </p>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact info */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-brand-black">
                    Vos coordonnées
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                        Nom / Prénom *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                          errors.name ? "border-destructive" : "border-border"
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                          errors.email ? "border-destructive" : "border-border"
                        }`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        errors.phone ? "border-destructive" : "border-border"
                      }`}
                      placeholder="+33 6 15 61 35 31"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gym info */}
                <div className="space-y-6 pt-4 border-t border-border">
                  <h2 className="text-xl font-semibold text-brand-black">
                    Votre salle
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gymName" className="block text-sm font-medium text-brand-black mb-2">
                        Nom de la salle *
                      </label>
                      <input
                        type="text"
                        id="gymName"
                        {...register("gymName")}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                          errors.gymName ? "border-destructive" : "border-border"
                        }`}
                        placeholder="Fight Club Paris"
                      />
                      {errors.gymName && (
                        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.gymName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-brand-black mb-2">
                        Ville / Code postal *
                      </label>
                      <input
                        type="text"
                        id="location"
                        {...register("location")}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                          errors.location ? "border-destructive" : "border-border"
                        }`}
                        placeholder="Paris 75001"
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="activities" className="block text-sm font-medium text-brand-black mb-2">
                      Activités pratiquées
                    </label>
                    <input
                      type="text"
                      id="activities"
                      {...register("activities")}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="MMA, JJB, Boxe, Lutte, Grappling..."
                    />
                  </div>

                  <div>
                    <label htmlFor="surfaces" className="block text-sm font-medium text-brand-black mb-2">
                      Types de surfaces principales
                    </label>
                    <input
                      type="text"
                      id="surfaces"
                      {...register("surfaces")}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Tatamis puzzle, ring, cage, sol musculation..."
                    />
                  </div>

                  <div>
                    <label htmlFor="members" className="block text-sm font-medium text-brand-black mb-2">
                      Nombre approximatif d'adhérents
                    </label>
                    <select
                      id="members"
                      {...register("members")}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-brand-white"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="0-50">Moins de 50</option>
                      <option value="50-100">50 - 100</option>
                      <option value="100-200">100 - 200</option>
                      <option value="200-500">200 - 500</option>
                      <option value="500+">Plus de 500</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-6 pt-4 border-t border-border">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                      Message / Besoins spécifiques
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Décrivez vos besoins, fréquence de nettoyage souhaitée, questions..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  <Send size={18} />
                </button>
              </form>

              {/* Delivery info */}
              <div className="mt-12 p-6 bg-muted/50 rounded-xl">
                <div className="flex items-start gap-4">
                  <Truck className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-brand-black mb-2">
                      Informations livraison
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary" />
                        France métropolitaine + Corse
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary" />
                        Livraison sous 48h après facturation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-primary" />
                        Devis personnalisé sous 24h
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Quote;
