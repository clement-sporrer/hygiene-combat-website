import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Section from "@/components/layout/Section";
import FormField from "@/components/ui/FormField";
import TextareaField from "@/components/ui/TextareaField";
import Button from "@/components/ui/button";
import ScrollArrow from "@/components/ui/ScrollArrow";
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
      
      <main>
        {/* Hero */}
        <Section variant="muted" fullScreen className="relative">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black">
              Contact
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Une question ? Besoin d'informations ? Nous sommes là pour vous aider.
            </p>
          </div>
          <ScrollArrow />
        </Section>

        {/* Contact content */}
        <Section variant="light" fullScreen className="relative py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto w-full px-4 sm:px-6">
            {/* Form */}
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-black mb-6 sm:mb-8 md:mb-10">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Calendly link - En premier */}
                <div>
                  <div className="bg-muted/50 p-5 sm:p-6 md:p-7 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <Calendar className="text-primary flex-shrink-0" size={22} />
                      <h4 className="font-semibold text-brand-black text-base sm:text-lg">Prendre rendez-vous</h4>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 leading-relaxed">
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
                        className="w-full sm:w-auto min-h-[44px]"
                      >
                        Réserver un créneau
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Nos coordonnées - En dessous */}
                <div className="pt-6 sm:pt-8 md:pt-10 border-t border-border">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-black mb-6 sm:mb-8 md:mb-10">
                    Nos coordonnées
                  </h2>

                  <div className="space-y-5 sm:space-y-6 md:space-y-7">
                    <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-primary" size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black mb-2 text-base sm:text-lg">Email</h4>
                        <a 
                          href="mailto:contact@hygiene-combat.fr" 
                          className="text-primary hover:underline text-sm sm:text-base md:text-lg transition-colors break-all"
                        >
                          contact@hygiene-combat.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-primary" size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black mb-2 text-base sm:text-lg">Téléphone</h4>
                        <a 
                          href="tel:+33615613531" 
                          className="text-primary hover:underline text-sm sm:text-base md:text-lg transition-colors"
                        >
                          +33 6 15 61 35 31
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-primary" size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black mb-2 text-base sm:text-lg">Localisation</h4>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                          Hauts-de-Seine (92), région parisienne
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-muted/30 rounded-xl hover:bg-muted/40 transition-colors duration-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="text-primary" size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black mb-2 text-base sm:text-lg">Horaires</h4>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
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
