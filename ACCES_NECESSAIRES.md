# Liste des Accès Nécessaires - Site Hygiène & Combat

Cette liste récapitule tous les accès et comptes nécessaires pour configurer et déployer le site.

## ✅ Accès Client (à obtenir)

### 1. Google Account (pour Google Sheets)
**Utilisation :** Gestion du Google Sheets contenant les logos clients et les données des formulaires

**Ce qui est nécessaire :**
- Accès au Google Sheets (création ou accès existant)
- Possibilité de publier la feuille "Logos" en CSV public
- Possibilité de partager le Sheets avec un compte de service (pour les formulaires)

**Actions à faire :**
- [ ] Obtenir l'accès au Google Account du client
- [ ] Créer ou accéder au Google Sheets
- [ ] Configurer les 3 feuilles (Logos, Contact, Devis)
- [ ] Publier la feuille "Logos" en CSV public
- [ ] Partager le Sheets avec le compte de service Google Cloud (voir ci-dessous)

---

### 2. Resend Account
**Utilisation :** Envoi d'emails pour les formulaires de contact et de devis

**Ce qui est nécessaire :**
- Compte Resend (gratuit jusqu'à 100 emails/jour)
- Clé API Resend

**Actions à faire :**
- [ ] Créer un compte sur [resend.com](https://resend.com)
- [ ] Vérifier le domaine `hygiene-combat.fr` (si envoi depuis ce domaine)
- [ ] Générer une clé API
- [ ] Ajouter la clé dans les variables d'environnement :
  - `RESEND_API_KEY` (server-side)
  - `VITE_RESEND_API_KEY` (optionnel, si besoin côté frontend)

---

### 3. Calendly Account
**Utilisation :** Lien de prise de rendez-vous sur la page Contact

**Ce qui est nécessaire :**
- Compte Calendly (gratuit disponible)
- Lien Calendly personnalisé

**Actions à faire :**
- [ ] Créer un compte sur [calendly.com](https://calendly.com)
- [ ] Configurer les créneaux disponibles
- [ ] Obtenir le lien de partage
- [ ] Ajouter dans la variable d'environnement : `VITE_CALENDLY_LINK`

---

### 4. Vercel Account (optionnel - peut être géré par le dev)
**Utilisation :** Déploiement et hébergement du site

**Ce qui est nécessaire :**
- Compte Vercel (gratuit disponible)
- Accès au repository GitHub
- Configuration des variables d'environnement

**Actions à faire :**
- [ ] Créer un compte sur [vercel.com](https://vercel.com)
- [ ] Connecter le repository GitHub
- [ ] Configurer toutes les variables d'environnement (voir ci-dessous)
- [ ] Déployer le site

---

## 🔧 Accès Développeur (à créer/configurer)

### 5. Google Cloud Platform (pour le compte de service)
**Utilisation :** Création d'un compte de service pour permettre l'écriture dans Google Sheets via l'API

**Ce qui est nécessaire :**
- Projet Google Cloud
- Compte de service avec clé JSON
- Partage du Google Sheets avec l'email du compte de service

**Actions à faire :**
- [ ] Créer un projet dans [Google Cloud Console](https://console.cloud.google.com)
- [ ] Activer l'API Google Sheets
- [ ] Créer un compte de service
- [ ] Générer une clé JSON
- [ ] Extraire `client_email` et `private_key`
- [ ] Partager le Google Sheets avec l'email du compte de service
- [ ] Ajouter dans les variables d'environnement :
  - `GOOGLE_SHEETS_CLIENT_EMAIL`
  - `GOOGLE_SHEETS_PRIVATE_KEY`
  - `GOOGLE_SHEETS_SPREADSHEET_ID`

**Note :** Cette partie peut être gérée entièrement par le développeur.

---

### 6. GitHub Repository
**Utilisation :** Versioning et déploiement

**Ce qui est nécessaire :**
- Repository GitHub (déjà créé)
- Accès en écriture pour le développeur

**Actions à faire :**
- [ ] Vérifier l'accès au repository
- [ ] Configurer les secrets GitHub (si nécessaire pour CI/CD)

---

## 📋 Variables d'Environnement à Configurer

### Variables Frontend (Vercel - Build)
```env
VITE_GOOGLE_SHEETS_LOGOS_CSV_URL=https://docs.google.com/spreadsheets/d/.../gid=0/export?format=csv
VITE_CALENDLY_LINK=https://calendly.com/votre-lien
VITE_SITE_URL=https://hygiene-combat.fr
```

### Variables Backend (Vercel - Serverless Functions)
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
GOOGLE_SHEETS_SPREADSHEET_ID=xxxxxxxxxxxxxxxxxxxxx
GOOGLE_SHEETS_CLIENT_EMAIL=xxxxx@xxxxx.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

---

## 📝 Checklist Complète

### Phase 1 : Accès Client
- [ ] Accès Google Account (Google Sheets)
- [ ] Compte Resend créé + clé API obtenue
- [ ] Compte Calendly créé + lien obtenu
- [ ] (Optionnel) Accès Vercel si gestion par le client

### Phase 2 : Configuration Google Sheets
- [ ] Google Sheets créé avec 3 feuilles (Logos, Contact, Devis)
- [ ] Feuille "Logos" publiée en CSV public
- [ ] URL CSV copiée → `VITE_GOOGLE_SHEETS_LOGOS_CSV_URL`
- [ ] Structure des colonnes vérifiée

### Phase 3 : Configuration Google Cloud (Développeur)
- [ ] Projet Google Cloud créé
- [ ] API Google Sheets activée
- [ ] Compte de service créé
- [ ] Clé JSON générée et credentials extraits
- [ ] Google Sheets partagé avec l'email du compte de service
- [ ] ID du spreadsheet obtenu

### Phase 4 : Configuration Vercel
- [ ] Repository GitHub connecté
- [ ] Toutes les variables d'environnement ajoutées
- [ ] Déploiement testé
- [ ] Formulaires testés (contact et devis)
- [ ] Logos testés (affichage depuis CSV)

### Phase 5 : Tests Finaux
- [ ] Test formulaire de contact → vérifier email + Google Sheets
- [ ] Test formulaire de devis → vérifier email + Google Sheets
- [ ] Test affichage des logos depuis CSV
- [ ] Test lien Calendly
- [ ] Vérification SEO (métadonnées)
- [ ] Test responsive sur mobile/tablette

---

## 🔐 Sécurité

**Important :**
- Ne jamais commiter les variables d'environnement dans le code
- Utiliser les variables d'environnement de Vercel pour la production
- Les credentials Google Cloud doivent rester secrets
- La clé API Resend ne doit pas être exposée côté client

---

## 📞 Support

En cas de problème :
- Vérifier les logs dans Vercel Dashboard
- Vérifier la console du navigateur pour les erreurs frontend
- Consulter `GOOGLE_SHEETS_SETUP.md` pour le dépannage
- Consulter `INSTRUCTIONS_CONFIGURATION.md` pour la configuration détaillée

