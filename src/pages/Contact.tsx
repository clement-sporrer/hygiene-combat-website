import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import FormField from "@/components/ui/FormField";
import TextareaField from "@/components/ui/TextareaField";
import Button from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/lib/googleSheets";

const Contact = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons sous 24h.",
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
        title="Contact - Hygiène & Combat | Devis Désinfectant Salle de Sport"
        description="Contactez Hygiène & Combat pour vos questions sur notre solution d'hygiène professionnelle. Désinfectant tatami, ring et vestiaires. Réponse sous 24h. +33 6 15 61 35 31"
        path="/contact"
        keywords="contact hygiène combat, devis désinfectant salle sport, contact produit hygiène tatami"
      />
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <Section variant="muted" className="min-h-[50vh] flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black">
              Contact
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Une question ? Besoin d'informations ? Nous sommes là pour vous aider.
            </p>
          </div>
        </Section>

        {/* Contact content */}
        <Section variant="light" className="min-h-[70vh] flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 md:mb-8">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Nom"
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Téléphone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+33 6 15 61 35 31"
                  />
                  <FormField
                    label="Nom de la salle"
                    type="text"
                    {...register("gymName")}
                    placeholder="Fight Club Paris"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Ville"
                    type="text"
                    {...register("city")}
                    placeholder="Paris"
                  />
                  <FormField
                    label="Activité sportive"
                    type="text"
                    {...register("activity")}
                    placeholder="MMA, JJB, Boxe..."
                  />
                </div>

                <TextareaField
                  label="Message"
                  rows={5}
                  {...register("message")}
                  error={errors.message?.message}
                  placeholder="Votre message..."
                  required
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  icon={Send}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 md:mb-8">
                  Nos coordonnées
                </h2>

                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1 text-sm md:text-base">Email</h4>
                      <a 
                        href="mailto:contact@hygiene-combat.fr" 
                        className="text-primary hover:underline text-sm md:text-base transition-colors"
                      >
                        contact@hygiene-combat.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1 text-sm md:text-base">Téléphone</h4>
                      <a 
                        href="tel:+33615613531" 
                        className="text-primary hover:underline text-sm md:text-base transition-colors"
                      >
                        +33 6 15 61 35 31
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1 text-sm md:text-base">Localisation</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Hauts-de-Seine (92), région parisienne
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1 text-sm md:text-base">Horaires</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Lundi – Vendredi : 10h – 20h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendly link */}
                <div className="pt-6 md:pt-8 border-t border-border">
                  <div className="bg-muted/50 p-5 md:p-6 rounded-xl">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <Calendar className="text-primary flex-shrink-0" size={20} />
                      <h4 className="font-semibold text-brand-black text-sm md:text-base">Prendre rendez-vous</h4>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                      Planifiez un appel pour discuter de vos besoins.
                    </p>
                    <Button
                      href={import.meta.env.VITE_CALENDLY_LINK || "#"}
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Réserver un créneau
                    </Button>
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

export default Contact;
