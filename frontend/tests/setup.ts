/**
 * Test Setup
 *
 * Configure testing environment for mobile UI components
 */

// Set test environment
process.env.NODE_ENV = "test";
process.env.VITE_API_URL = process.env.VITE_API_URL || "http://localhost:3000";

// Check if running in browser environment (happy-dom)
if (typeof window !== 'undefined') {
  // Mock window.matchMedia for responsive components
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })

  // Mock IntersectionObserver for components that use it
  if (!(window as any).IntersectionObserver) {
    (window as any).IntersectionObserver = class IntersectionObserver {
      constructor() {}
      disconnect() {}
      observe() {}
      takeRecords() {
        return []
      }
      unobserve() {}
    }
  }

  // Mock ResizeObserver for components that use it
  if (!(window as any).ResizeObserver) {
    (window as any).ResizeObserver = class ResizeObserver {
      constructor() {}
      disconnect() {}
      observe() {}
      unobserve() {}
    }
  }

  // Mock scrollTo for components that use it
  if (!window.scrollTo) {
    window.scrollTo = () => {}
  }
}

console.log("Frontend tests initialized");
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`API URL: ${process.env.VITE_API_URL}`);
