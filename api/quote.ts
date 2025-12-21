/**
 * Vercel Serverless Function - Quote Form API
 * POST /api/quote
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { quoteFormSchema } from '../src/lib/validations';
import { validateServerEnv } from '../src/lib/env';
import {
  checkRateLimit,
  getClientIP,
  appendToGoogleSheets,
  sendEmailViaResend,
  generateQuoteEmailHTML,
  validateRequestBody,
} from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate environment variables
  try {
    validateServerEnv();
  } catch (envError) {
    return res.status(500).json({
      message: envError instanceof Error ? envError.message : 'Server configuration error',
    });
  }

  // Rate limiting
  const ip = getClientIP(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  try {
    // Validate request body with Zod
    const validation = validateRequestBody(req.body, quoteFormSchema);
    if (!validation.success) {
      return res.status(400).json({ message: validation.error });
    }

    const data = validation.data;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    const timestamp = new Date().toISOString();
    // Combine postalCode and city for location field (backward compatible)
    const location = `${data.postalCode} ${data.city}`;
    const values = [
      data.name,
      data.email,
      data.phone,
      data.gymName,
      location,
      data.activities || '',
      data.surfaces || '',
      data.surfaceArea || '',
      data.frequency || '',
      data.message || '',
      timestamp,
    ];

    // Append to Google Sheets
    await appendToGoogleSheets(spreadsheetId, 'Devis', values, 'A:K');

    // Send email via Resend (non-blocking)
    sendEmailViaResend({
      to: 'contact@hygiene-combat.fr',
      subject: `Nouvelle demande de devis - ${data.gymName}`,
      html: generateQuoteEmailHTML({
        name: data.name,
        email: data.email,
        phone: data.phone,
        gymName: data.gymName,
        location: location,
        activities: data.activities,
        surfaces: data.surfaces,
        members: data.surfaceArea, // Using surfaceArea as members for now
        message: data.message,
      }),
      replyTo: data.email,
    }).catch((emailError) => {
      // Log error but don't fail the request
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to send email:', emailError);
      }
    });

    return res.status(200).json({ message: 'Quote form submitted successfully' });
  } catch (error) {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error processing quote form:', error);
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

