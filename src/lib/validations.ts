import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  gymName: z.string().optional(),
  city: z.string().optional(),
  activity: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone est requis'),
  gymName: z.string().min(2, 'Le nom de la salle est requis'),
  location: z.string().min(2, 'La localisation est requise'),
  activities: z.string().optional(),
  surfaces: z.string().optional(),
  surfaceArea: z.string().optional(),
  frequency: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;

