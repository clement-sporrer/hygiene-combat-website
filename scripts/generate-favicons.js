/**
 * Script pour générer les favicons à partir du logo
 * 
 * Installation des dépendances:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const inputPath = path.join(__dirname, '../src/assets/logo-black.png');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Vérifier que le logo source existe
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ Logo source introuvable: ${inputPath}`);
      process.exit(1);
    }

    // Créer le dossier public s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('🎨 Génération des favicons...\n');

    // Générer chaque taille
    for (const { name, size } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 } // Fond transparent
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ ${name} (${size}x${size}) généré`);
    }

    // Générer favicon.ico (16x16 et 32x32 combinés)
    const favicon16 = await sharp(inputPath)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    // Note: Pour un vrai .ico, il faudrait utiliser une bibliothèque spécialisée
    // Pour l'instant, on copie le 32x32 comme favicon.ico
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32);
    console.log('✅ favicon.ico généré (basé sur 32x32)');

    console.log('\n✨ Tous les favicons ont été générés avec succès!');
    console.log(`📁 Fichiers créés dans: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error.message);
    process.exit(1);
  }
}

generateFavicons();

