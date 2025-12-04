import Legal from "./Legal";
import SEO from "@/components/SEO";

const CGV = () => {
  const content = `
    <h2>1. Objet</h2>
    <p>
      Les présentes Conditions Générales de Vente (CGV) régissent la vente de produits d'hygiène professionnels par Hygiène & Combat aux professionnels (salles de sport, clubs de sports de combat).
    </p>

    <h2>2. Produits</h2>
    <p>
      Hygiène & Combat commercialise un biocide 3-en-1 professionnel pour le nettoyage, la désinfection et la désodorisation des surfaces dans les salles de sport de combat.
    </p>
    <p>
      Les caractéristiques des produits sont décrites sur le site. Hygiène & Combat se réserve le droit de modifier ces caractéristiques à tout moment.
    </p>

    <h2>3. Commandes</h2>
    <p>
      Toute commande implique l'acceptation sans réserve des présentes CGV.
    </p>
    <p>
      Les commandes sont passées via le formulaire de devis disponible sur le site. Un devis personnalisé est établi sous 24h et envoyé par email.
    </p>
    <p>
      La commande est définitive après validation du devis et réception du paiement.
    </p>

    <h2>4. Prix</h2>
    <p>
      Les prix sont indiqués en euros, hors taxes. La TVA est ajoutée selon la législation en vigueur.
    </p>
    <p>
      Les prix peuvent être modifiés à tout moment. Le prix applicable est celui indiqué sur le devis validé.
    </p>

    <h2>5. Paiement</h2>
    <p>
      Le paiement s'effectue par virement bancaire ou chèque selon les modalités indiquées sur le devis.
    </p>
    <p>
      Les produits sont expédiés après réception du paiement.
    </p>

    <h2>6. Livraison</h2>
    <p>
      La livraison s'effectue en France métropolitaine et en Corse sous 48h après facturation.
    </p>
    <p>
      Les frais de livraison sont indiqués sur le devis.
    </p>
    <p>
      En cas de retard de livraison, le client sera informé dans les plus brefs délais.
    </p>

    <h2>7. Droit de rétractation</h2>
    <p>
      Conformément à la législation en vigueur, les professionnels ne bénéficient pas du droit de rétractation pour les commandes de produits personnalisés.
    </p>

    <h2>8. Garantie</h2>
    <p>
      Hygiène & Combat garantit la conformité des produits aux normes européennes en vigueur.
    </p>
    <p>
      En cas de non-conformité, le client doit informer Hygiène & Combat dans les 48h suivant la réception.
    </p>

    <h2>9. Responsabilité</h2>
    <p>
      Hygiène & Combat ne saurait être tenu responsable des dommages indirects résultant de l'utilisation des produits.
    </p>
    <p>
      Le client est responsable de l'utilisation conforme des produits selon les instructions fournies.
    </p>

    <h2>10. Propriété intellectuelle</h2>
    <p>
      Tous les éléments du site (textes, images, logos) sont la propriété de Hygiène & Combat et sont protégés par le droit de la propriété intellectuelle.
    </p>

    <h2>11. Données personnelles</h2>
    <p>
      Les données collectées sont utilisées pour le traitement des commandes et la relation commerciale.
    </p>
    <p>
      Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
    </p>

    <h2>12. Droit applicable et juridiction</h2>
    <p>
      Les présentes CGV sont régies par le droit français.
    </p>
    <p>
      Tout litige relatif à l'interprétation ou à l'exécution des présentes sera de la compétence exclusive des tribunaux français.
    </p>

    <h2>13. Contact</h2>
    <p>
      Pour toute question concernant ces CGV :
    </p>
    <p>
      <strong>Email :</strong> contact@hygiene-combat.fr<br />
      <strong>Téléphone :</strong> +33 6 15 61 35 31
    </p>
  `;

  return (
    <>
      <SEO
        title="Conditions Générales de Vente | Hygiène & Combat"
        description="CGV Hygiène & Combat. Conditions de vente, livraison, paiement et garantie pour nos produits d'hygiène professionnels pour salles de sport."
        path="/cgv"
        keywords="cgv hygiène combat, conditions générales vente"
        noindex={true}
      />
      <Legal title="Conditions Générales de Vente" content={content} />
    </>
  );
};

export default CGV;

