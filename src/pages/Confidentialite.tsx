import Legal from "./Legal";
import SEO from "@/components/SEO";

const Confidentialite = () => {
  const content = `
    <h2>1. Responsable du traitement</h2>
    <p>
      Le responsable du traitement des données personnelles est :
    </p>
    <p>
      <strong>Matthieu PIERRE PINTO</strong><br />
      Email : contact@hygiene-combat.fr<br />
      Téléphone : +33 6 15 61 35 31<br />
      Localisation : Hauts-de-Seine (92), région parisienne
    </p>

    <h2>2. Données collectées</h2>
    <p>
      Nous collectons les données suivantes via nos formulaires :
    </p>
    <ul>
      <li><strong>Formulaire de contact :</strong> nom, email, téléphone (optionnel), nom de la salle (optionnel), ville (optionnel), activité sportive (optionnel), message</li>
      <li><strong>Formulaire de devis :</strong> nom, email, téléphone, nom de la salle, localisation, activités, surfaces, nombre d'adhérents, message (optionnel)</li>
    </ul>
    <p>
      Ces données sont collectées avec votre consentement explicite lors de la soumission des formulaires.
    </p>

    <h2>3. Finalités du traitement</h2>
    <p>
      Les données collectées sont utilisées pour :
    </p>
    <ul>
      <li>Répondre à vos demandes de contact</li>
      <li>Établir et envoyer des devis personnalisés</li>
      <li>Gérer la relation commerciale</li>
      <li>Améliorer nos services</li>
    </ul>

    <h2>4. Base légale</h2>
    <p>
      Le traitement de vos données personnelles est basé sur :
    </p>
    <ul>
      <li>Votre consentement (formulaires de contact et de devis)</li>
      <li>L'exécution de mesures précontractuelles (devis)</li>
      <li>Notre intérêt légitime (amélioration des services)</li>
    </ul>

    <h2>5. Conservation des données</h2>
    <p>
      Les données sont conservées :
    </p>
    <ul>
      <li>Pour les demandes de contact : 3 ans à compter du dernier contact</li>
      <li>Pour les devis : durée de la relation commerciale + 3 ans</li>
    </ul>

    <h2>6. Destinataires des données</h2>
    <p>
      Vos données sont accessibles uniquement à :
    </p>
    <ul>
      <li>L'équipe de Hygiène & Combat pour le traitement de vos demandes</li>
      <li>Nos prestataires techniques (hébergement, services d'email) dans le cadre strict de leurs missions</li>
    </ul>
    <p>
      Vos données ne sont jamais vendues ou cédées à des tiers à des fins commerciales.
    </p>

    <h2>7. Transferts hors UE</h2>
    <p>
      Certains de nos prestataires (hébergement Vercel) peuvent être situés hors de l'Union Européenne. Dans ce cas, nous nous assurons que des garanties appropriées sont en place (clauses contractuelles types).
    </p>

    <h2>8. Vos droits</h2>
    <p>
      Conformément au RGPD, vous disposez des droits suivants :
    </p>
    <ul>
      <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
      <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
      <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certains cas</li>
      <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
      <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
      <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
      <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
    </ul>
    <p>
      Pour exercer ces droits, contactez-nous à : contact@hygiene-combat.fr
    </p>

    <h2>9. Sécurité</h2>
    <p>
      Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération.
    </p>

    <h2>10. Cookies</h2>
    <p>
      Ce site n'utilise pas de cookies de tracking ou de publicité. Seuls les cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
    </p>

    <h2>11. Réclamation</h2>
    <p>
      Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL :
    </p>
    <p>
      <strong>CNIL</strong><br />
      3 Place de Fontenoy - TSA 80715<br />
      75334 Paris Cedex 07<br />
      Téléphone : 01 53 73 22 22<br />
      Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
    </p>

    <h2>12. Modifications</h2>
    <p>
      Cette politique de confidentialité peut être modifiée à tout moment. La version en vigueur est celle publiée sur le site.
    </p>
    <p>
      Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}
    </p>

    <h2>13. Contact</h2>
    <p>
      Pour toute question concernant cette politique de confidentialité :
    </p>
    <p>
      <strong>Email :</strong> contact@hygiene-combat.fr<br />
      <strong>Téléphone :</strong> +33 6 15 61 35 31
    </p>
  `;

  return (
    <>
      <SEO
        title="Politique de Confidentialité | Hygiène & Combat"
        description="Politique de confidentialité Hygiène & Combat. Protection des données personnelles, RGPD, droits d'accès et de rectification."
        path="/confidentialite"
        keywords="politique confidentialité, protection données, RGPD"
        noindex={true}
      />
      <Legal title="Politique de confidentialité" content={content} />
    </>
  );
};

export default Confidentialite;

