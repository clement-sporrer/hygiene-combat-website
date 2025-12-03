# Site Hygiène & Combat

Site vitrine pour la présentation d'une solution d'hygiène professionnelle destinée aux salles de sport et clubs de sports de combat.

## 🚀 Technologies

- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **React Router** pour le routing
- **Tailwind CSS** pour le styling
- **Shadcn/ui** pour les composants UI
- **React Hook Form** + **Zod** pour la validation des formulaires
- **Resend** pour l'envoi d'emails
- **Google Sheets API** pour le stockage des données
- **Vercel** pour le déploiement

## 📋 Prérequis

- Node.js 18+ et npm
- Compte Google Cloud avec API Sheets activée
- Compte Resend avec clé API
- Google Sheets avec les feuilles configurées (voir ci-dessous)

## 🛠️ Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd hygiene-combat-website
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
```

4. Remplir les variables dans `.env` :
   - `VITE_RESEND_API_KEY` : Clé API Resend
   - `VITE_GOOGLE_SHEETS_API_KEY` : Clé API Google Sheets (lecture publique)
   - `VITE_GOOGLE_SHEETS_SPREADSHEET_ID` : ID du Google Sheets
   - `GOOGLE_SHEETS_CLIENT_EMAIL` : Email du compte de service Google
   - `GOOGLE_SHEETS_PRIVATE_KEY` : Clé privée du compte de service
   - `RESEND_API_KEY` : Clé API Resend (server-side)
   - `VITE_CALENDLY_LINK` : Lien Calendly
   - `VITE_SITE_URL` : URL du site (ex: https://hygiene-combat.fr)

## 📊 Configuration Google Sheets

Le Google Sheets doit contenir 3 feuilles :

### Feuille "Logos"
Colonnes :
- **A** : Nom du client
- **B** : URL Imgur du logo
- **C** : URL du site (optionnel)

Exemple :
```
| Nom du client | URL Imgur | URL du site |
|---------------|-----------|------------|
| Fight Club    | https://i.imgur.com/xxx.png | https://fightclub.fr |
```

### Feuille "Contact"
Colonnes (en-têtes) :
- **A** : name
- **B** : email
- **C** : phone
- **D** : gymName
- **E** : city
- **F** : activity
- **G** : message
- **H** : timestamp

### Feuille "Devis"
Colonnes (en-têtes) :
- **A** : name
- **B** : email
- **C** : phone
- **D** : gymName
- **E** : location
- **F** : activities
- **G** : surfaces
- **H** : members
- **I** : message
- **J** : timestamp

### Configuration Google Cloud

1. Créer un projet dans [Google Cloud Console](https://console.cloud.google.com)
2. Activer l'API Google Sheets
3. Créer un compte de service :
   - Aller dans "IAM & Admin" > "Service Accounts"
   - Créer un nouveau compte de service
   - Télécharger la clé JSON
   - Extraire `client_email` et `private_key` pour les variables d'environnement
4. Partager le Google Sheets avec l'email du compte de service (donner les droits d'éditeur)

## 🚀 Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 📦 Build

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## 🚢 Déploiement

Le site est configuré pour être déployé sur Vercel :

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel
3. Déployer

Les API routes dans `/api` seront automatiquement déployées comme fonctions serverless.

## 📁 Structure du projet

```
├── api/                    # API routes (Vercel serverless functions)
│   ├── contact.ts         # Endpoint pour le formulaire de contact
│   └── quote.ts           # Endpoint pour le formulaire de devis
├── public/                 # Fichiers statiques
│   ├── videos/            # Vidéos
│   └── sitemap.xml        # Sitemap SEO
├── src/
│   ├── components/        # Composants React
│   │   ├── home/         # Composants de la page d'accueil
│   │   └── ui/           # Composants UI (shadcn)
│   ├── lib/              # Utilitaires
│   │   ├── googleSheets.ts  # Fonctions Google Sheets
│   │   ├── resend.ts        # Fonctions Resend
│   │   └── validations.ts   # Schémas Zod
│   ├── pages/            # Pages du site
│   └── App.tsx           # Composant principal
└── package.json
```

## 🔧 Fonctionnalités

- ✅ Formulaires de contact et de devis avec validation
- ✅ Envoi d'emails via Resend
- ✅ Enregistrement dans Google Sheets
- ✅ Chargement dynamique des logos clients depuis Google Sheets
- ✅ SEO optimisé avec métadonnées dynamiques
- ✅ Pages légales (Mentions légales, CGV, Confidentialité)
- ✅ Responsive design
- ✅ Rate limiting sur les formulaires

## 📝 Notes importantes

- Les logos clients sont chargés depuis Google Sheets via l'API publique
- Les formulaires nécessitent un compte de service Google avec accès en écriture
- Le rate limiting est basique (en mémoire). Pour la production, utiliser Redis
- Les emails sont envoyés à `contact@hygiene-combat.fr` avec copie au demandeur

## 🐛 Dépannage

### Les logos ne s'affichent pas
- Vérifier que la clé API Google Sheets est correcte
- Vérifier que le spreadsheet ID est correct
- Vérifier que la feuille "Logos" existe et contient des données

### Les formulaires ne fonctionnent pas
- Vérifier les variables d'environnement server-side (dans Vercel)
- Vérifier que le compte de service Google a accès au Sheets
- Vérifier les logs dans Vercel pour les erreurs

## 📄 Licence

Propriétaire - Hygiène & Combat
