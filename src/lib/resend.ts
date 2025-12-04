/**
 * Resend email utilities
 */

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send email via Resend API
 * This function is called from the server-side API routes
 */
export async function sendEmail(data: EmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Resend API key not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: data.from || 'Hygiène & Combat <contact@hygiene-combat.fr>',
      to: data.to,
      subject: data.subject,
      html: data.html,
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
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Téléphone :</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            ${data.gymName ? `
            <div class="field">
              <div class="label">Nom de la salle :</div>
              <div class="value">${data.gymName}</div>
            </div>
            ` : ''}
            ${data.city ? `
            <div class="field">
              <div class="label">Ville :</div>
              <div class="value">${data.city}</div>
            </div>
            ` : ''}
            ${data.activity ? `
            <div class="field">
              <div class="label">Activité sportive :</div>
              <div class="value">${data.activity}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message :</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
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
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Téléphone :</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="field">
              <div class="label">Nom de la salle :</div>
              <div class="value">${data.gymName}</div>
            </div>
            <div class="field">
              <div class="label">Ville / Code postal :</div>
              <div class="value">${data.location}</div>
            </div>
            ${data.activities ? `
            <div class="field">
              <div class="label">Activités pratiquées :</div>
              <div class="value">${data.activities}</div>
            </div>
            ` : ''}
            ${data.surfaces ? `
            <div class="field">
              <div class="label">Types de surfaces principales :</div>
              <div class="value">${data.surfaces}</div>
            </div>
            ` : ''}
            ${data.members ? `
            <div class="field">
              <div class="label">Nombre approximatif d'adhérents :</div>
              <div class="value">${data.members}</div>
            </div>
            ` : ''}
            ${data.message ? `
            <div class="field">
              <div class="label">Message / Besoins spécifiques :</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}

