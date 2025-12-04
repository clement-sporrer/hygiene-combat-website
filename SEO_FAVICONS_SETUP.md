# Guide de Configuration SEO - Favicons et Images OG

## Favicons requis

Le site nécessite les favicons suivants dans le dossier `public/` :

### Favicons standards
- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels)
- `favicon.ico` (format ICO, multi-taille)

### Apple Touch Icon
- `apple-touch-icon.png` (180x180 pixels)

### Android Chrome Icons
- `android-chrome-192x192.png` (192x192 pixels)
- `android-chrome-512x512.png` (512x512 pixels)

## Comment créer les favicons

1. **Source** : Utiliser le logo Hygiène & Combat (logo-black.png ou logo-white.png)
2. **Outils recommandés** :
   - [Favicon.io](https://favicon.io/) - Génère tous les formats
   - [RealFaviconGenerator](https://realfavicongenerator.net/) - Outil complet
   - Photoshop/GIMP pour redimensionnement manuel

3. **Spécifications** :
   - Format : PNG (sauf favicon.ico)
   - Fond : Transparent ou couleur de fond du site
   - Contraste : Assurer une bonne lisibilité sur fond clair et sombre
   - Taille minimale : Respecter les dimensions exactes

## Image Open Graph (OG)

### Fichier requis
- `og-image.jpg` (1200x630 pixels)

### Spécifications
- Dimensions : 1200x630 pixels (ratio 1.91:1)
- Format : JPG ou PNG
- Taille fichier : < 1MB (idéalement < 500KB)
- Contenu suggéré :
  - Logo Hygiène & Combat
  - Titre : "Hygiène & Combat"
  - Sous-titre : "Solution d'hygiène professionnelle pour salles de sport"
  - Visuel du produit (bidon) si disponible
  - Couleurs de la marque (noir, bleu-gris)

### Outils pour créer l'image OG
- Canva (template OG Image 1200x630)
- Figma
- Photoshop
- [OG Image Generator](https://www.opengraph.xyz/)

## Vérification

Une fois les fichiers créés, vérifier :
1. Tous les fichiers sont dans `public/`
2. Les liens dans `index.html` pointent vers les bons fichiers
3. Le `manifest.json` référence les bonnes tailles
4. Tester avec [Favicon Checker](https://realfavicongenerator.net/favicon_checker)
5. Tester l'image OG avec [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

## Notes

- Les favicons sont déjà référencés dans `index.html` et `manifest.json`
- L'image OG est référencée dans le composant `SEO.tsx`
- Tous les chemins sont relatifs à `/public/`

