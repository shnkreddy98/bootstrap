import { createRemoteJWKSet, jwtVerify } from 'jose';
import { getCookie, setCookie } from 'hono/cookie';
import { config } from './config/index.js';
import { jwtPayloadSchema, User } from './types/index.js';
import type { MiddlewareHandler } from 'hono';
import { upsertUser } from './users.js';

// Create JWKS client (cached) - only if JWKS_URI is properly configured
let JWKS: ReturnType<typeof createRemoteJWKSet> | null = null;
try {
  if (config.JWKS_URI && config.JWKS_URI.trim() !== '') {
    JWKS = createRemoteJWKSet(new URL(config.JWKS_URI));
    console.log('JWKS configured for JWT verification');
  } else {
    console.log('JWKS not configured - JWT verification disabled, anonymous mode only');
  }
} catch (error) {
  console.error('Failed to initialize JWKS:', error);
  JWKS = null;
}

const ANONYMOUS_USER_COOKIE = 'anonymous_user_id';

/**
 * JWT authentication middleware
 * Handles three scenarios:
 * 1. JWT with only 'sub' claim → anonymous user (from proxy)
 * 2. JWT with sub + email/name → authenticated user
 * 3. No JWT → generate UUID, set cookie, create anonymous user
 */
export const authenticateJWT: MiddlewareHandler = async (c, next) => {
  try {
    // Get JWT from Authorization header
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No JWT provided - check for anonymous user cookie
      let anonymousId = getCookie(c, ANONYMOUS_USER_COOKIE);

      if (!anonymousId) {
        // Generate new UUID for anonymous user
        anonymousId = crypto.randomUUID();

        // Set cookie (expires in 1 year)
        setCookie(c, ANONYMOUS_USER_COOKIE, anonymousId, {
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
      }

      const user: User = {
        userId: anonymousId,
        isAnonymous: true,
      };

      // Save anonymous user to database
      await upsertUser(user);

      c.set('user', user);
      await next();
      return;
    }

    // JWT token provided - verify it
    if (!JWKS) {
      console.error('JWT token provided but JWKS is not configured. Set JWKS_URI, JWT_ISSUER, and JWT_AUDIENCE in environment variables.');
      return c.json({ error: 'Authentication not properly configured' }, 500);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT signature and claims
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: config.JWT_ISSUER || undefined,
    });

    // Validate payload structure
    const validatedPayload = jwtPayloadSchema.parse(payload);

    // Determine if anonymous (only 'sub' claim, no email/name)
    const isAnonymous = !validatedPayload.email && !validatedPayload.first_name && !validatedPayload.last_name;

    // Attach user info to Hono context
    const user: User = {
      userId: validatedPayload.sub, // Extract from 'sub' claim
      email: validatedPayload.email,
      firstName: validatedPayload.first_name,
      lastName: validatedPayload.last_name,
      isAnonymous,
    };

    // Save/update user in database
    await upsertUser(user);

    c.set('user', user);

    await next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    return c.json({ error: 'Invalid or expired authentication token' }, 401);
  }
};
