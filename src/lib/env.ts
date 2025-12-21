/**
 * Environment variables validation
 * Validates all required environment variables at startup
 */

import { z } from 'zod';

// Schema for server-side environment variables (used in API routes)
const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().min(1, 'GOOGLE_SHEETS_SPREADSHEET_ID is required'),
  GOOGLE_SHEETS_CLIENT_EMAIL: z.string().email('GOOGLE_SHEETS_CLIENT_EMAIL must be a valid email'),
  GOOGLE_SHEETS_PRIVATE_KEY: z.string().min(1, 'GOOGLE_SHEETS_PRIVATE_KEY is required'),
  RATE_LIMIT_WINDOW_MS: z.string().optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().optional(),
});

// Schema for client-side environment variables (prefixed with VITE_)
const clientEnvSchema = z.object({
  VITE_GOOGLE_SHEETS_LOGOS_CSV_URL: z.string().url().optional(),
  VITE_CALENDLY_LINK: z.string().url().optional(),
  VITE_SITE_URL: z.string().url().optional(),
});

/**
 * Validate server-side environment variables
 * Call this in API routes to ensure all required variables are present
 */
export function validateServerEnv(): z.infer<typeof serverEnvSchema> {
  try {
    return serverEnvSchema.parse({
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
      RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
      throw new Error(`Missing or invalid environment variables:\n${missingVars}`);
    }
    throw error;
  }
}

/**
 * Validate client-side environment variables
 * Call this in client code to ensure all required variables are present
 */
export function validateClientEnv(): z.infer<typeof clientEnvSchema> {
  try {
    return clientEnvSchema.parse({
      VITE_GOOGLE_SHEETS_LOGOS_CSV_URL: import.meta.env.VITE_GOOGLE_SHEETS_LOGOS_CSV_URL,
      VITE_CALENDLY_LINK: import.meta.env.VITE_CALENDLY_LINK,
      VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
      console.warn(`Missing or invalid client environment variables:\n${missingVars}`);
    }
    // Client-side validation is less strict, just return what we have
    return {
      VITE_GOOGLE_SHEETS_LOGOS_CSV_URL: import.meta.env.VITE_GOOGLE_SHEETS_LOGOS_CSV_URL,
      VITE_CALENDLY_LINK: import.meta.env.VITE_CALENDLY_LINK,
      VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
    };
  }
}

