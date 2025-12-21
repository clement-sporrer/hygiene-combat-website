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
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const { useLightText } = useTheme();
  
  const darkTextColor = useLightText ? "text-white" : "text-brand-black";
  const darkTextMuted = useLightText ? "text-white/70" : "text-brand-black/70";
  
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
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact - Hygiène & Combat | Devis Désinfectant Salle de Sport"
        description="Contactez Hygiène & Combat pour vos questions sur notre solution d'hygiène professionnelle. Désinfectant tatami, ring et vestiaires. Réponse sous 24h. +33 6 15 61 35 31"
        path="/contact"
        keywords="contact hygiène combat, devis désinfectant salle sport, contact produit hygiène tatami"
      />
      <Header variant="light" />
      
      <main>
        {/* Hero */}
        <Section variant="dark" size="narrow" spacing="hero" className="flex items-center">
          <div className="hero-content">
            <h1 className={darkTextColor}>Contact</h1>
            <p className={cn("text-lg md:text-xl content-block", darkTextMuted)}>
              Une question ? Besoin d'informations ? Nous sommes là pour vous aider.
            </p>
          </div>
        </Section>

        {/* Contact content */}
        <Section variant="light" size="wide" spacing="relaxed">
          <div className="grid lg:grid-cols-2 grid-content">
            {/* Form */}
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-heading mb-8">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                {/* Calendly link */}
                <div className="card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Calendar className="text-primary flex-shrink-0" size={22} aria-hidden="true" />
                    <h4 className="font-semibold text-heading text-lg">Prendre rendez-vous</h4>
                  </div>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Planifiez un appel pour discuter de vos besoins.
                  </p>
                  <a
                    href={import.meta.env.VITE_CALENDLY_LINK || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      Réserver un créneau
                    </Button>
                  </a>
                </div>

                {/* Nos coordonnées */}
                <div className="pt-8 border-t border-border">
                  <h2 className="text-2xl md:text-3xl font-bold text-heading mb-8">
                    Nos coordonnées
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-primary" size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading mb-2">Email</h4>
                        <a 
                          href="mailto:contact@hygiene-combat.fr" 
                          className="text-primary hover:underline text-base transition-colors break-all"
                        >
                          contact@hygiene-combat.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-primary" size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading mb-2">Téléphone</h4>
                        <a 
                          href="tel:+33615613531" 
                          className="text-primary hover:underline text-base transition-colors"
                        >
                          +33 6 15 61 35 31
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading mb-2">Localisation</h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Hauts-de-Seine (92), Ile de France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="text-primary" size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading mb-2">Horaires</h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Lundi – Vendredi : 10h – 20h
                        </p>
                      </div>
                    </div>
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
