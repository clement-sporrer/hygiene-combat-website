/**
 * Vercel Serverless Function - Contact Form API
 * POST /api/contact
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Rate limiting storage (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
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

async function appendToGoogleSheets(
  spreadsheetId: string,
  sheetName: string,
  values: string[]
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
    range: `${sheetName}!A:H`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values],
    },
  });
}

async function sendEmailViaResend(data: {
  name: string;
  email: string;
  phone?: string;
  gymName?: string;
  city?: string;
  activity?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('Resend API key not configured, skipping email');
    return;
  }

  const emailHtml = `
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
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `<div class="field"><div class="label">Téléphone :</div><div class="value">${data.phone}</div></div>` : ''}
            ${data.gymName ? `<div class="field"><div class="label">Nom de la salle :</div><div class="value">${data.gymName}</div></div>` : ''}
            ${data.city ? `<div class="field"><div class="label">Ville :</div><div class="value">${data.city}</div></div>` : ''}
            ${data.activity ? `<div class="field"><div class="label">Activité sportive :</div><div class="value">${data.activity}</div></div>` : ''}
            <div class="field">
              <div class="label">Message :</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Hygiène & Combat <contact@hygiene-combat.fr>',
      to: 'contact@hygiene-combat.fr',
      subject: `Nouveau message de contact - ${data.name}`,
      html: emailHtml,
      replyTo: data.email,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to send email');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip as string)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  try {
    const { name, email, phone, gymName, city, activity, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error('Google Sheets spreadsheet ID not configured');
    }

    const timestamp = new Date().toISOString();
    const values = [
      name,
      email,
      phone || '',
      gymName || '',
      city || '',
      activity || '',
      message,
      timestamp,
    ];

    // Append to Google Sheets
    await appendToGoogleSheets(spreadsheetId, 'Contact', values);

    // Send email via Resend
    try {
      await sendEmailViaResend({ name, email, phone, gymName, city, activity, message });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    return res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}

