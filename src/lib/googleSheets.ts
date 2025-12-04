/**
 * Google Sheets utilities
 * 
 * Pour les logos : utilisation d'un CSV public (plus simple)
 * Pour les formulaires : API Google Sheets avec authentification (écriture)
 */

export interface ClientLogo {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

import type { ContactFormData, QuoteFormData } from './validations';

/**
 * Parse CSV string into array of rows
 */
function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim());
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

/**
 * Fetch client logos from Google Sheets CSV public URL
 * 
 * Pour obtenir l'URL CSV :
 * 1. Ouvrir le Google Sheets
 * 2. Aller dans "Fichier" > "Partager" > "Publier sur le web"
 * 3. Sélectionner la feuille "Logos" et le format "CSV"
 * 4. Copier l'URL générée
 * 
 * Structure CSV attendue :
 * - Colonne 1 : Nom du client
 * - Colonne 2 : URL Imgur du logo
 * - Colonne 3 : URL du site (optionnel)
 */
export async function fetchClientLogos(): Promise<ClientLogo[]> {
  const csvUrl = import.meta.env.VITE_GOOGLE_SHEETS_LOGOS_CSV_URL;

  if (!csvUrl) {
    console.warn('Google Sheets logos CSV URL not configured');
    return [];
  }

  try {
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch logos CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    // Skip header row (first row) and map to ClientLogo objects
    return rows.slice(1).map((row) => ({
      name: row[0] || '',
      logoUrl: row[1] || '',
      websiteUrl: row[2] || undefined,
    })).filter((logo: ClientLogo) => logo.name && logo.logoUrl);
  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}

/**
 * Submit contact form to Google Sheets via API
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to submit contact form');
  }
}

/**
 * Submit quote form to Google Sheets via API
 */
export async function submitQuoteForm(data: QuoteFormData): Promise<void> {
  const response = await fetch('/api/quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to submit quote form');
  }
}

