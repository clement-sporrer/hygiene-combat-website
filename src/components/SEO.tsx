import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
  noindex?: boolean;
}

const SEO = ({ title, description, path = "", image, keywords, noindex = false }: SEOProps) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://hygiene-combat.fr";
  const fullUrl = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  
  // Default keywords if not provided
  const defaultKeywords = "désinfectant salle de sport, désinfectant tatami, nettoyant sports de combat, solution hygiène salle de sport, désinfectant ring, biocide tatami, nettoyant MMA, produit hygiène combat, désinfection ring boxe, désinfectant parquet sportif";
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Hygiène & Combat" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};

export default SEO;

