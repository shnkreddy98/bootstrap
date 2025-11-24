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
 * Component integration tests setup
 * Using jsdom for DOM environment (works better with React 19)
 */

import { JSDOM } from "jsdom";

// Set up DOM environment with jsdom
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

const { window } = dom;
const { document } = window;

// Set up all necessary globals for React testing
Object.defineProperty(global, "window", {
  value: window,
  writable: true,
});
Object.defineProperty(global, "document", {
  value: document,
  writable: true,
});
global.navigator = window.navigator as any;
global.HTMLElement = window.HTMLElement as any;
global.Node = window.Node as any;
global.Element = window.Element as any;
global.Text = window.Text as any;
global.Comment = window.Comment as any;
global.DocumentFragment = window.DocumentFragment as any;

// Copy all window properties to global
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    (global as any)[key] = (window as any)[key];
  }
});

// Mock fetch globally for tests
// Tests can override this with their own mocks
global.fetch = global.fetch || (() => Promise.resolve({
  ok: true,
  json: async () => ({}),
} as Response));

console.log("Frontend tests initialized");
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API URL: ${process.env.VITE_API_URL}`);
