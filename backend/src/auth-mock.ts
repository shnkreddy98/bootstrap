/**
 * Mock JWT Authentication for Development/Test Environments
 *
 * This module provides mock JWT functionality for local development and testing.
 * It bypasses real JWT verification and uses hardcoded test users.
 *
 * IMPORTANT: Only enabled when NODE_ENV is 'development' or 'test'
 */

import type { User } from './types/index.js';

/**
 * Mock users for testing
 * These represent different test scenarios
 */
export const MOCK_USERS = {
  // Authenticated test user
  testUser1: {
    userId: 'test-user-1',
    email: 'test1@example.com',
    firstName: 'Test',
    lastName: 'User',
    isAnonymous: false,
  } as User,

  // Another authenticated test user (for multi-user scenarios)
  testUser2: {
    userId: 'test-user-2',
    email: 'test2@example.com',
    firstName: 'Second',
    lastName: 'Tester',
    isAnonymous: false,
  } as User,

  // Anonymous test user
  anonymous: {
    userId: 'test-anonymous-user',
    isAnonymous: true,
  } as User,
};

/**
 * Generate a mock JWT token
 * Format: "mock.{userId}.{base64-encoded-json}"
 *
 * This is NOT a real JWT - it's just a formatted string that our mock
 * verifier can decode. Real JWT verification is bypassed in dev/test mode.
 */
export function generateMockJWT(user: User): string {
  const payload = {
    sub: user.userId,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  };

  // Encode as base64 for easy debugging
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');
  return `mock.${user.userId}.${encoded}`;
}

/**
 * Verify and decode a mock JWT token
 * Returns the user info if valid, null if invalid
 */
export function verifyMockJWT(token: string): User | null {
  try {
    // Check if it's a mock token
    if (!token.startsWith('mock.')) {
      return null;
    }

    // Parse the token: "mock.{userId}.{base64-payload}"
    const parts = token.split('.');
    if (parts.length !== 3 || parts[0] !== 'mock') {
      return null;
    }

    const userId = parts[1];
    const payloadBase64 = parts[2];

    // Decode the payload
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const payload = JSON.parse(payloadJson);

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.warn('Mock JWT expired');
      return null;
    }

    // Construct user object
    const user: User = {
      userId: payload.sub || userId,
      email: payload.email,
      firstName: payload.first_name,
      lastName: payload.last_name,
      isAnonymous: !payload.email && !payload.first_name && !payload.last_name,
    };

    return user;
  } catch (error) {
    console.error('Failed to verify mock JWT:', error);
    return null;
  }
}

/**
 * Generate mock tokens for all predefined users
 * Useful for documentation and test setup
 */
export function generateAllMockTokens(): Record<string, string> {
  return {
    testUser1: generateMockJWT(MOCK_USERS.testUser1),
    testUser2: generateMockJWT(MOCK_USERS.testUser2),
    anonymous: generateMockJWT(MOCK_USERS.anonymous),
  };
}

/**
 * Helper to check if mock JWT is enabled
 */
export function isMockJWTEnabled(): boolean {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' || env === 'test';
}

// Log mock tokens on startup in development
if (isMockJWTEnabled()) {
  const tokens = generateAllMockTokens();
  console.log('\n🔓 Mock JWT Authentication Enabled');
  console.log('Available test tokens:');
  console.log(`  testUser1: Bearer ${tokens.testUser1}`);
  console.log(`  testUser2: Bearer ${tokens.testUser2}`);
  console.log(`  anonymous: Bearer ${tokens.anonymous}`);
  console.log('  (or omit Authorization header for cookie-based anonymous auth)\n');
}
