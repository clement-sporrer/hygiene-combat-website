# Instructions de Configuration - Site Hygiène & Combat

## ✅ Ce qui a été fait

Tous les problèmes identifiés dans l'audit ont été corrigés :

### ✅ Fonctionnalités critiques
- ✅ Formulaires fonctionnels avec intégration Resend et Google Sheets
- ✅ Pages légales créées (Mentions légales, CGV, Confidentialité)
- ✅ Coordonnées mises à jour (Matthieu PIERRE PINTO, +33 6 15 61 35 31, contact@hygiene-combat.fr)
- ✅ Logos clients chargés dynamiquement depuis Google Sheets

### ✅ SEO et Performance
- ✅ Métadonnées SEO dynamiques avec react-helmet-async
- ✅ Sitemap.xml créé
- ✅ Structured data amélioré (Organization, Product)

### ✅ Qualité
- ✅ Validation Zod + react-hook-form implémentée
- ✅ Gestion d'erreur complète
- ✅ Page 404 améliorée (français, Header/Footer)
- ✅ Rate limiting sur les formulaires

---

## 🔧 Configuration requise

### 1. Variables d'environnement

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Logos (CSV public - SIMPLE)
VITE_GOOGLE_SHEETS_LOGOS_CSV_URL=https://docs.google.com/spreadsheets/d/.../gid=0/export?format=csv

# API Keys (Frontend - préfixe VITE_)
VITE_RESEND_API_KEY=your_resend_api_key_here
VITE_CALENDLY_LINK=https://calendly.com/votre-lien
VITE_SITE_URL=https://hygiene-combat.fr

# API Keys (Backend - pour Vercel - uniquement pour les formulaires)
RESEND_API_KEY=your_resend_api_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Rate Limiting (optionnel)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

**Important :** 
- Les variables avec préfixe `VITE_` sont accessibles côté frontend
- Les autres variables sont uniquement côté serveur (API routes)
- Pour Vercel, ajouter toutes les variables dans les paramètres du projet

### 2. Configuration Google Sheets

Voir le fichier `GOOGLE_SHEETS_SETUP.md` pour les instructions détaillées.

**Résumé rapide :**

**Pour les logos (SIMPLE - CSV public) :**
1. Créer un Google Sheets avec une feuille "Logos"
2. Aller dans "Fichier" > "Partager" > "Publier sur le web"
3. Sélectionner la feuille "Logos" et le format "CSV"
4. Copier l'URL générée → Variable `VITE_GOOGLE_SHEETS_LOGOS_CSV_URL`
5. **C'est tout !** Aucune authentification nécessaire.

**Pour les formulaires (nécessite Google Cloud) :**
1. Créer les feuilles "Contact" et "Devis" dans le même Sheets
2. Créer un compte de service Google Cloud
3. Partager le Sheets avec l'email du compte de service
4. Obtenir l'ID du spreadsheet et les credentials

### 3. Configuration Resend

1. Créer un compte sur [Resend](https://resend.com)
2. Obtenir votre clé API
3. Ajouter la clé dans les variables d'environnement
4. Vérifier le domaine `hygiene-combat.fr` (si vous voulez envoyer depuis ce domaine)

### 4. Configuration Calendly

1. Créer votre lien Calendly
2. Ajouter le lien dans `VITE_CALENDLY_LINK`

---

## 📋 Structure Google Sheets requise

### Feuille "Logos"
```
| Nom du client | URL Imgur | URL du site (optionnel) |
|---------------|-----------|-------------------------|
| Fight Club    | https://i.imgur.com/xxx.png | https://fightclub.fr |
```

### Feuille "Contact"
En-têtes (première ligne) :
```
name | email | phone | gymName | city | activity | message | timestamp
```

### Feuille "Devis"
En-têtes (première ligne) :
```
name | email | phone | gymName | location | activities | surfaces | members | message | timestamp
```

**Note :** Les colonnes `timestamp` sont remplies automatiquement par l'API.

---

## 🚀 Déploiement sur Vercel

1. **Connecter le repository**
   - Aller sur [Vercel](https://vercel.com)
   - Importer le projet depuis GitHub

2. **Configurer les variables d'environnement**
   - Aller dans "Settings" > "Environment Variables"
   - Ajouter toutes les variables (sans préfixe VITE_ pour les variables serveur)
   - **Important :** Les variables `VITE_*` doivent aussi être ajoutées pour le build

3. **Déployer**
   - Vercel détectera automatiquement Vite
   - Les API routes dans `/api` seront déployées comme fonctions serverless

4. **Vérifier**
   - Tester les formulaires
   - Vérifier que les emails sont envoyés
   - Vérifier que les données sont enregistrées dans Google Sheets

---

## 🧪 Tests locaux

Pour tester localement avec les API routes :

1. Installer Vercel CLI :
```bash
npm i -g vercel
```

2. Lancer en mode développement :
```bash
vercel dev
```

Cela lancera le serveur avec les API routes fonctionnelles.

---

## 📝 Checklist avant mise en production

- [ ] Toutes les variables d'environnement sont configurées
- [ ] Google Sheets est configuré avec les 3 feuilles
- [ ] Le compte de service Google a accès au Sheets
- [ ] Resend API est configuré et testé
- [ ] Le lien Calendly est correct
- [ ] Les coordonnées sont à jour partout
- [ ] Les logos clients sont ajoutés dans le Sheets
- [ ] Le sitemap.xml est à jour avec la bonne URL
- [ ] Les métadonnées SEO sont correctes
- [ ] Test des formulaires (contact et devis)
- [ ] Vérification des emails reçus
- [ ] Vérification des données dans Google Sheets

---

## 🐛 Dépannage

### Les formulaires ne fonctionnent pas
- Vérifier les variables d'environnement dans Vercel
- Vérifier les logs dans Vercel Dashboard
- Vérifier que les noms de feuilles sont exacts (sensible à la casse)

### Les logos ne s'affichent pas
- Vérifier `VITE_GOOGLE_SHEETS_API_KEY` et `VITE_GOOGLE_SHEETS_SPREADSHEET_ID`
- Vérifier que la feuille "Logos" existe
- Vérifier que les URLs Imgur sont valides

### Erreurs d'API
- Vérifier les credentials Google Sheets
- Vérifier que le compte de service a les droits "Editor"
- Vérifier la clé API Resend

---

## 📞 Support

Pour toute question, contactez :
- **Email :** contact@hygiene-combat.fr
- **Téléphone :** +33 6 15 61 35 31

---

## 📚 Documentation supplémentaire

- `README.md` - Documentation générale du projet
- `GOOGLE_SHEETS_SETUP.md` - Guide détaillé pour Google Sheets
- `AUDIT_COMPLET.md` - Audit initial avec tous les défauts identifiés
- `RESUME_AUDIT.md` - Résumé exécutif de l'audit

