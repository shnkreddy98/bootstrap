/**
 * Frontend Test Setup
 *
 * This file runs before all tests and sets up the test environment.
 */

// Set test environment
process.env.NODE_ENV = "test";

// Mock environment variables for tests
process.env.VITE_API_URL = process.env.VITE_API_URL || "http://localhost:3000";

// Global test configuration
export const TEST_TIMEOUT = 10000;

/**
 * For component integration tests, you'll need to install:
 * bun add -d @testing-library/react @testing-library/user-event happy-dom
 *
 * Then uncomment this section:
 */

/*
import { JSDOM } from "happy-dom";

// Set up DOM environment
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

global.document = dom.window.document;
global.window = dom.window as any;
global.navigator = dom.window.navigator;
*/

// Mock fetch globally for tests
// Tests can override this with their own mocks
global.fetch = global.fetch || (() => Promise.resolve({
  ok: true,
  json: async () => ({}),
} as Response));

console.log("Frontend tests initialized");
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API URL: ${process.env.VITE_API_URL}`);
