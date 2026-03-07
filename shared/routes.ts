import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads' as const,
      input: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Please enter a valid email address."),
        interest: z.string().optional().nullable(),
        organisation: z.string().optional().nullable(),
        phone: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        category: z.string().optional().nullable(),
        requirementType: z.string().optional().nullable(),
        message: z.string().optional().nullable(),
        cartItems: z.string().optional().nullable(),
      }),
      responses: {
        201: z.object({ id: z.number(), message: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
