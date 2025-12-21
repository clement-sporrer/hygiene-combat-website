/**
 * Shared utilities for API routes
 */

import type { VercelRequest } from '@vercel/node';
import { google } from 'googleapis';
import { z, type ZodSchema } from 'zod';

// Rate limiting storage (in production, use Redis or similar)
// NOTE: This is in-memory and will reset on each serverless function restart
// For production with multiple instances, use Redis or Vercel Edge Config
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Check rate limit for an IP address
 * @param ip - IP address to check
 * @returns true if request is allowed, false if rate limited
 */
export function checkRateLimit(ip: string): boolean {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 min default
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);

  const now = Date.now();
  const userData = requestCounts.get(ip);

  if (!userData || now > userData.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userData.count >= maxRequests) {
    return false;
  }

  userData.count++;
  return true;
}

/**
 * Get client IP address from request
 */
export function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0].split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

/**
 * Append data to Google Sheets
 */
export async function appendToGoogleSheets(
  spreadsheetId: string,
  sheetName: string,
  values: string[],
  range: string
): Promise<void> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials not configured');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values],
    },
  });
}

/**
 * Send email via Resend API
 */
export async function sendEmailViaResend(data: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // In production, we should log this but not throw
    // Email is not critical for the form submission
    if (process.env.NODE_ENV === 'production') {
      console.warn('Resend API key not configured, skipping email');
    }
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Hygiène & Combat <contact@hygiene-combat.fr>',
      to: data.to,
      subject: data.subject,
      html: data.html,
      replyTo: data.replyTo,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to send email');
  }
}

/**
 * Generate HTML email template for contact form
 */
export function generateContactEmailHTML(data: {
  name: string;
  email: string;
  phone?: string;
  gymName?: string;
  city?: string;
  activity?: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000000; color: #fff; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #000000; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouveau message de contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nom :</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${escapeHtml(data.email)}</div>
            </div>
            ${data.phone ? `<div class="field"><div class="label">Téléphone :</div><div class="value">${escapeHtml(data.phone)}</div></div>` : ''}
            ${data.gymName ? `<div class="field"><div class="label">Nom de la salle :</div><div class="value">${escapeHtml(data.gymName)}</div></div>` : ''}
            ${data.city ? `<div class="field"><div class="label">Ville :</div><div class="value">${escapeHtml(data.city)}</div></div>` : ''}
            ${data.activity ? `<div class="field"><div class="label">Activité sportive :</div><div class="value">${escapeHtml(data.activity)}</div></div>` : ''}
            <div class="field">
              <div class="label">Message :</div>
              <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate HTML email template for quote form
 */
export function generateQuoteEmailHTML(data: {
  name: string;
  email: string;
  phone: string;
  gymName: string;
  location: string;
  activities?: string;
  surfaces?: string;
  members?: string;
  message?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000000; color: #fff; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #000000; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle demande de devis</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nom / Prénom :</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${escapeHtml(data.email)}</div>
            </div>
            <div class="field">
              <div class="label">Téléphone :</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            <div class="field">
              <div class="label">Nom de la salle :</div>
              <div class="value">${escapeHtml(data.gymName)}</div>
            </div>
            <div class="field">
              <div class="label">Ville / Code postal :</div>
              <div class="value">${escapeHtml(data.location)}</div>
            </div>
            ${data.activities ? `<div class="field"><div class="label">Activités pratiquées :</div><div class="value">${escapeHtml(data.activities)}</div></div>` : ''}
            ${data.surfaces ? `<div class="field"><div class="label">Types de surfaces principales :</div><div class="value">${escapeHtml(data.surfaces)}</div></div>` : ''}
            ${data.members ? `<div class="field"><div class="label">Nombre approximatif d'adhérents :</div><div class="value">${escapeHtml(data.members)}</div></div>` : ''}
            ${data.message ? `<div class="field"><div class="label">Message / Besoins spécifiques :</div><div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div></div>` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Escape HTML to prevent XSS in email templates
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Validate request body with Zod schema
 */
export function validateRequestBody<T>(
  body: unknown,
  schema: ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validation error: ${errors}` };
    }
    return { success: false, error: 'Invalid request body' };
  }
}

// Re-export Zod for convenience
export { z } from 'zod';

