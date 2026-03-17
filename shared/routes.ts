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
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat' as const,
      input: z.object({
        message: z.string().min(1),
        history: z.array(z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string(),
        })).optional(),
      }),
      responses: {
        200: z.object({ response: z.string() }),
        500: errorSchemas.internal,
      },
    },
  },
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads' as const,
      input: z.object({
        name: z.string().min(1, "Name is required").optional().nullable(),
        email: z.string().email("Please enter a valid email address.").optional().nullable(),
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
  admin: {
    login: {
      method: 'POST' as const,
      path: '/api/admin/login' as const,
      input: z.object({
        password: z.string().min(1, "Password is required"),
      }),
    },
    stats: {
      method: 'GET' as const,
      path: '/api/admin/stats' as const,
    },
    leads: {
      list: {
        method: 'GET' as const,
        path: '/api/admin/leads' as const,
      },
      get: {
        method: 'GET' as const,
        path: '/api/admin/leads/:id' as const,
      },
      updateStatus: {
        method: 'PATCH' as const,
        path: '/api/admin/leads/:id' as const,
        input: z.object({
          status: z.enum(["new", "contacted", "converted", "closed"]),
        }),
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/leads/:id' as const,
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
