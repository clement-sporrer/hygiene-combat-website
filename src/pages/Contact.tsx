import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gymName: "",
    city: "",
    activity: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons sous 24h.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      gymName: "",
      city: "",
      activity: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="light" />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black">
                Contact
              </h1>
              <p className="text-xl text-muted-foreground">
                Une question ? Besoin d'informations ? Nous sommes là pour vous aider.
              </p>
            </div>
          </div>
        </section>

        {/* Contact content */}
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-brand-black mb-8">
                  Envoyez-nous un message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-black mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                    <div>
                      <label htmlFor="gymName" className="block text-sm font-medium text-brand-black mb-2">
                        Nom de la salle
                      </label>
                      <input
                        type="text"
                        id="gymName"
                        name="gymName"
                        value={formData.gymName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Fight Club Paris"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-brand-black mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Paris"
                      />
                    </div>
                    <div>
                      <label htmlFor="activity" className="block text-sm font-medium text-brand-black mb-2">
                        Activité sportive
                      </label>
                      <input
                        type="text"
                        id="activity"
                        name="activity"
                        value={formData.activity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="MMA, JJB, Boxe..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    <Send size={18} />
                  </button>
                </form>
              </div>

              {/* Contact info */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-brand-black mb-8">
                  Nos coordonnées
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1">Email</h4>
                      <a href="mailto:contact@hygiene-combat.fr" className="text-primary hover:underline">
                        contact@hygiene-combat.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1">Téléphone</h4>
                      <a href="tel:+33600000000" className="text-primary hover:underline">
                        06 00 00 00 00
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1">Localisation</h4>
                      <p className="text-muted-foreground">Hauts-de-Seine (92), région parisienne</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-1">Horaires</h4>
                      <p className="text-muted-foreground">Lundi – Vendredi : 10h – 20h</p>
                    </div>
                  </div>
                </div>

                {/* Calendly link */}
                <div className="pt-8 border-t border-border">
                  <div className="bg-muted/50 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Calendar className="text-primary" size={24} />
                      <h4 className="font-semibold text-brand-black">Prendre rendez-vous</h4>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Planifiez un appel pour discuter de vos besoins.
                    </p>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      Réserver un créneau
                    </a>
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

export default Contact;
