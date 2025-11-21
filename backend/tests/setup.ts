/**
 * Backend Test Setup
 *
 * This file runs before all tests and sets up the test environment.
 */

// Ensure test environment variables are loaded
if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL not set. Integration tests will fail."
  );
  console.warn(
    "   Make sure to run tests with: bun run --env-file=../.env test"
  );
}

// Set test-specific configuration
process.env.NODE_ENV = process.env.NODE_ENV || "test";

// Configure test timeouts (in milliseconds)
// Increase for integration tests that need more time
export const TEST_TIMEOUT = 10000;

console.log("Backend tests initialized");
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Database: ${process.env.DATABASE_URL ? "✓ Connected" : "✗ Not configured"}`);
