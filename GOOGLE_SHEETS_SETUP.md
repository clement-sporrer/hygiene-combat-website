# Configuration Google Sheets

Ce document explique comment configurer le Google Sheets pour le site Hygiène & Combat.

## 📋 Structure requise

Le Google Sheets doit contenir **3 feuilles** :

### 1. Feuille "Logos" (CSV public - SIMPLE)

Cette feuille contient les logos des clients à afficher sur la page d'accueil.

**Structure des colonnes :**
- **Colonne A** : Nom du client (ex: "Fight Club Paris")
- **Colonne B** : URL Imgur du logo (ex: "https://i.imgur.com/xxxxx.png")
- **Colonne C** : URL du site web (optionnel, ex: "https://fightclub.fr")

**Exemple de données :**
```
| Nom du client        | URL Imgur                          | URL du site           |
|----------------------|------------------------------------|-----------------------|
| Fight Club Paris     | https://i.imgur.com/abc123.png     | https://fightclub.fr  |
| MMA Factory          | https://i.imgur.com/def456.png     |                       |
| BJJ Academy          | https://i.imgur.com/ghi789.png     | https://bjjacademy.fr |
```

**✅ Configuration SIMPLE (CSV public) :**

1. Ouvrir votre Google Sheets
2. Aller dans **"Fichier"** > **"Partager"** > **"Publier sur le web"**
3. Dans la fenêtre qui s'ouvre :
   - Sélectionner la feuille **"Logos"**
   - Choisir le format **"CSV"**
   - Cliquer sur **"Publier"**
4. Copier l'URL générée (ex: `https://docs.google.com/spreadsheets/d/.../gid=0/export?format=csv`)
5. Ajouter cette URL dans la variable d'environnement `VITE_GOOGLE_SHEETS_LOGOS_CSV_URL`

**C'est tout !** Aucune authentification nécessaire pour les logos.

**Notes importantes :**
- La première ligne peut être un en-tête (sera ignorée automatiquement)
- Les logos doivent être hébergés sur Imgur ou un autre service d'hébergement d'images
- Si la colonne C est vide, le logo ne sera pas cliquable
- Les logos doivent être au format PNG, JPG ou SVG
- Le CSV se met à jour automatiquement quand vous modifiez le Sheets

---

### 2. Feuille "Contact"

Cette feuille stocke les données du formulaire de contact.

**Structure des colonnes (en-têtes requis) :**
- **Colonne A** : name (Nom)
- **Colonne B** : email (Email)
- **Colonne C** : phone (Téléphone - optionnel)
- **Colonne D** : gymName (Nom de la salle - optionnel)
- **Colonne E** : city (Ville - optionnel)
- **Colonne F** : activity (Activité sportive - optionnel)
- **Colonne G** : message (Message)
- **Colonne H** : timestamp (Date/heure d'envoi - automatique)

**Exemple d'en-têtes :**
```
| name              | email                    | phone          | gymName        | city  | activity | message                    | timestamp           |
|-------------------|--------------------------|----------------|----------------|-------|----------|----------------------------|---------------------|
| Jean Dupont       | jean@example.com         | 0612345678     | Fight Club     | Paris | MMA      | Bonjour, j'aimerais...     | 2024-01-15T10:30:00|
```

**Notes importantes :**
- Les en-têtes doivent être exactement comme indiqué (sensible à la casse)
- La colonne H (timestamp) est remplie automatiquement par l'API
- Les colonnes optionnelles peuvent être vides

---

### 3. Feuille "Devis"

Cette feuille stocke les données du formulaire de demande de devis.

**Structure des colonnes (en-têtes requis) :**
- **Colonne A** : name (Nom / Prénom)
- **Colonne B** : email (Email)
- **Colonne C** : phone (Téléphone)
- **Colonne D** : gymName (Nom de la salle)
- **Colonne E** : location (Ville / Code postal)
- **Colonne F** : activities (Activités pratiquées - optionnel)
- **Colonne G** : surfaces (Types de surfaces - optionnel)
- **Colonne H** : members (Nombre d'adhérents - optionnel)
- **Colonne I** : message (Message / Besoins spécifiques - optionnel)
- **Colonne J** : timestamp (Date/heure d'envoi - automatique)

**Exemple d'en-têtes :**
```
| name          | email            | phone      | gymName        | location    | activities      | surfaces           | members | message        | timestamp           |
|---------------|------------------|------------|----------------|-------------|-----------------|--------------------|---------|----------------|---------------------|
| Marie Martin  | marie@example.com| 0698765432 | Elite MMA      | Lyon 69001  | MMA, JJB       | Tatamis, ring      | 100-200 | Besoin urgent  | 2024-01-15T14:20:00|
```

**Notes importantes :**
- Les en-têtes doivent être exactement comme indiqué (sensible à la casse)
- La colonne J (timestamp) est remplie automatiquement par l'API
- Les colonnes F, G, H, I sont optionnelles

---

## 🔐 Configuration Google Cloud (uniquement pour les formulaires)

**Note pour le développeur :** Cette configuration est uniquement nécessaire pour que les formulaires puissent écrire dans Google Sheets. Les logos utilisent un CSV public (voir ci-dessus). Cette partie technique peut être gérée par le développeur.

### 1. Créer un projet Google Cloud

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet ou sélectionner un projet existant

### 2. Activer l'API Google Sheets

1. Dans le menu, aller dans "APIs & Services" > "Library"
2. Rechercher "Google Sheets API"
3. Cliquer sur "Enable"

### 3. Créer un compte de service

1. Aller dans "IAM & Admin" > "Service Accounts"
2. Cliquer sur "Create Service Account"
3. Remplir :
   - **Name** : `hygiene-combat-api` (ou autre nom)
   - **Description** : Compte de service pour l'API du site
4. Cliquer sur "Create and Continue"
5. Optionnel : Ajouter un rôle (pas nécessaire pour notre usage)
6. Cliquer sur "Done"

### 4. Générer une clé JSON

1. Cliquer sur le compte de service créé
2. Aller dans l'onglet "Keys"
3. Cliquer sur "Add Key" > "Create new key"
4. Sélectionner "JSON"
5. Télécharger le fichier JSON

### 5. Extraire les informations

Ouvrir le fichier JSON téléchargé et extraire :
- `client_email` → Variable `GOOGLE_SHEETS_CLIENT_EMAIL`
- `private_key` → Variable `GOOGLE_SHEETS_PRIVATE_KEY` (garder les `\n`)

### 6. Partager le Google Sheets

1. Ouvrir votre Google Sheets
2. Cliquer sur "Share" (Partager)
3. Ajouter l'email du compte de service (celui dans `client_email`)
4. Donner les droits **"Editor"** (Éditeur)
5. Décocher "Notify people" (optionnel)
6. Cliquer sur "Send"

### 7. Obtenir l'ID du spreadsheet

L'ID se trouve dans l'URL du Google Sheets :
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

Copier `[SPREADSHEET_ID]` → Variable `GOOGLE_SHEETS_SPREADSHEET_ID`

---

## Test de configuration

### Test des logos (CSV public)
1. Vérifier que la feuille "Logos" existe
2. Vérifier que la publication CSV est active
3. Tester l'URL CSV directement dans le navigateur (doit afficher du texte CSV)
4. Vérifier que les logos s'affichent sur la page d'accueil

### Test des formulaires (API Google Sheets)
1. Vérifier que les feuilles "Contact" et "Devis" existent avec les bons noms
2. Vérifier que les en-têtes sont corrects
3. Vérifier que le compte de service a accès au Sheets (droits "Editor")
4. Tester un formulaire depuis le site
5. Vérifier que les données apparaissent dans le Sheets

---

## Dépannage

### Les données ne s'enregistrent pas
- Vérifier que le compte de service a les droits "Editor"
- Vérifier que les noms de feuilles sont exacts (sensible à la casse)
- Vérifier que les en-têtes sont corrects
- Vérifier les logs dans Vercel

### Les logos ne s'affichent pas
- Vérifier que l'URL CSV publique (`VITE_GOOGLE_SHEETS_LOGOS_CSV_URL`) est correcte
- Vérifier que la feuille "Logos" est bien publiée en CSV public
- Vérifier que la publication CSV est active (aller dans "Fichier" > "Partager" > "Publier sur le web")
- Vérifier que les URLs Imgur sont valides et accessibles
- Vérifier la console du navigateur pour les erreurs de chargement
- Tester l'URL CSV directement dans le navigateur (doit afficher du texte CSV)

### Erreur "Permission denied"
- Vérifier que le compte de service a bien été ajouté au Sheets
- Vérifier que les droits sont "Editor" et non "Viewer"

