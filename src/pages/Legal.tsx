import { Link } from "react-router-dom";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

interface LegalProps {
  title: string;
  content: string;
}

const Legal = ({ title, content }: LegalProps) => {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false,
    });
  }, [content]);

  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="light" />
      
      <main className="pt-16 md:pt-20">
        <section className="py-20 bg-brand-white">
          <div className="container mx-auto max-w-4xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Retour à l'accueil
            </Link>
            
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-brand-black mb-8">{title}</h1>
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;

