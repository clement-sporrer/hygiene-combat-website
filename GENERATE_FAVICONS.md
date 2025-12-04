# Génération des Favicons

## Méthode 1 : Script automatique (recommandé)

### Prérequis
```bash
npm install sharp --save-dev
```

### Exécution
```bash
node scripts/generate-favicons.js
```

Le script génère automatiquement tous les favicons nécessaires dans le dossier `public/` :
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `favicon.ico` (basé sur 32x32)

## Méthode 2 : Outils en ligne

### RealFaviconGenerator (recommandé)
1. Aller sur https://realfavicongenerator.net/
2. Uploader `src/assets/logo-black.png`
3. Configurer :
   - iOS : Cocher "Apple touch icon"
   - Android : Cocher "Android Chrome"
   - Windows : Optionnel
   - Favicon : Cocher "Favicon for desktop browsers"
4. Télécharger le package généré
5. Extraire les fichiers dans `public/`

### Favicon.io
1. Aller sur https://favicon.io/
2. Utiliser "Image" → Uploader le logo
3. Télécharger le package
4. Extraire dans `public/`

## Méthode 3 : Manuel (Photoshop/GIMP)

### Tailles requises
- 16x16 pixels → `favicon-16x16.png`
- 32x32 pixels → `favicon-32x32.png`
- 180x180 pixels → `apple-touch-icon.png`
- 192x192 pixels → `android-chrome-192x192.png`
- 512x512 pixels → `android-chrome-512x512.png`

### Instructions
1. Ouvrir `src/assets/logo-black.png` dans votre éditeur
2. Redimensionner à chaque taille requise
3. Exporter en PNG avec fond transparent
4. Placer les fichiers dans `public/`

### Favicon.ico
Pour créer un vrai fichier `.ico` :
- Utiliser un convertisseur en ligne : https://convertio.co/png-ico/
- Ou utiliser ImageMagick : `convert favicon-32x32.png favicon.ico`

## Vérification

Après génération, vérifier que tous les fichiers sont présents :
```bash
ls -la public/favicon*
ls -la public/apple-touch-icon.png
ls -la public/android-chrome-*.png
```

## Test

1. Ouvrir le site dans un navigateur
2. Vérifier que le favicon apparaît dans l'onglet
3. Tester sur mobile (iOS et Android) pour vérifier les icônes

## Notes

- Le logo source est : `src/assets/logo-black.png` (1563x1563)
- Tous les favicons doivent être dans `public/`
- Les liens sont déjà configurés dans `index.html` et `manifest.json`

