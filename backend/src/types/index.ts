import { z } from 'zod';

// JWT payload schema - validates the structure of the JWT claims
export const jwtPayloadSchema = z.object({
  sub: z.string(), // Subject (user ID)
  iss: z.string().optional(), // Issuer
  aud: z.union([z.string(), z.array(z.string())]).optional(), // Audience
  exp: z.number().optional(), // Expiration time
  iat: z.number().optional(), // Issued at
  email: z.string().optional(), // Email from session
  first_name: z.string().optional(), // First name from session
  last_name: z.string().optional(), // Last name from session
});

export type JWTPayload = z.infer<typeof jwtPayloadSchema>;

// User context attached to Hono context after authentication
export interface User {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAnonymous: boolean;
}

// Extend Hono's context type to include user
declare module 'hono' {
  interface ContextVariableMap {
    user: User;
  }
}
