/**
 * Google Sheets API utilities
 * 
 * Structure attendue du Google Sheets :
 * 
 * Feuille "Logos" :
 * - Colonne A : Nom du client
 * - Colonne B : URL Imgur du logo
 * - Colonne C : URL du site (optionnel)
 * 
 * Feuille "Contact" :
 * - Colonnes : name, email, phone, gymName, city, activity, message, timestamp
 * 
 * Feuille "Devis" :
 * - Colonnes : name, email, phone, gymName, location, activities, surfaces, members, message, timestamp
 */

export interface ClientLogo {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

import type { ContactFormData, QuoteFormData } from './validations';

/**
 * Fetch client logos from Google Sheets
 */
export async function fetchClientLogos(): Promise<ClientLogo[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = 'Logos';

  if (!apiKey || !spreadsheetId) {
    console.warn('Google Sheets API not configured');
    return [];
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    // Skip header row and map to ClientLogo objects
    return rows.slice(1).map((row: string[]) => ({
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

