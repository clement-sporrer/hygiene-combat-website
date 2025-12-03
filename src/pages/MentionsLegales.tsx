import Legal from "./Legal";

const MentionsLegales = () => {
  const content = `
    <h2>1. Éditeur du site</h2>
    <p>
      Le site <strong>hygiene-combat.fr</strong> est édité par :
    </p>
    <p>
      <strong>Matthieu PIERRE PINTO</strong><br />
      Email : contact@hygiene-combat.fr<br />
      Téléphone : +33 6 15 61 35 31<br />
      Localisation : Hauts-de-Seine (92), région parisienne
    </p>

    <h2>2. Hébergement</h2>
    <p>
      Le site est hébergé par Vercel Inc.<br />
      340 S Lemon Ave #4133<br />
      Walnut, CA 91789<br />
      États-Unis
    </p>

    <h2>3. Propriété intellectuelle</h2>
    <p>
      L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété exclusive de Hygiène & Combat, sauf mention contraire.
    </p>
    <p>
      Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
    </p>

    <h2>4. Données personnelles</h2>
    <p>
      Les données personnelles collectées via les formulaires de contact et de devis sont utilisées uniquement pour répondre à vos demandes.
    </p>
    <p>
      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles.
    </p>
    <p>
      Pour exercer ces droits, contactez-nous à : contact@hygiene-combat.fr
    </p>

    <h2>5. Cookies</h2>
    <p>
      Ce site n'utilise pas de cookies de tracking. Seuls les cookies techniques nécessaires au fonctionnement du site peuvent être utilisés.
    </p>

    <h2>6. Responsabilité</h2>
    <p>
      Hygiène & Combat s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Cependant, nous ne pouvons garantir que ces informations sont complètes, à jour et exemptes d'erreurs.
    </p>
    <p>
      L'utilisation du site se fait sous votre propre responsabilité.
    </p>

    <h2>7. Liens externes</h2>
    <p>
      Ce site peut contenir des liens vers des sites externes. Hygiène & Combat n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
    </p>

    <h2>8. Droit applicable</h2>
    <p>
      Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation du site sera de la compétence exclusive des tribunaux français.
    </p>

    <h2>9. Contact</h2>
    <p>
      Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :
    </p>
    <p>
      <strong>Email :</strong> contact@hygiene-combat.fr<br />
      <strong>Téléphone :</strong> +33 6 15 61 35 31
    </p>
  `;

  return <Legal title="Mentions légales" content={content} />;
};

export default MentionsLegales;

