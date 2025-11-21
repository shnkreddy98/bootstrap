import { describe, test, expect, beforeEach } from "bun:test";

/**
 * Backend Unit Tests
 *
 * Unit tests verify individual functions and logic in isolation.
 * They should be:
 * - Fast (no network, no database)
 * - Isolated (no dependencies on external services)
 * - Deterministic (same input = same output)
 *
 * Use unit tests for:
 * - Pure functions (utility functions, formatters, validators)
 * - Business logic
 * - Data transformations
 * - Algorithm implementations
 */

describe("Backend Unit Tests - Basic Examples", () => {
  /**
   * Example 1: Testing pure functions
   * Pure functions are ideal for unit testing - same input always produces same output
   */
  test("basic arithmetic - testing pure function behavior", () => {
    const add = (a: number, b: number) => a + b;

    expect(add(2, 2)).toBe(4);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  /**
   * Example 2: Testing string operations
   * Tests string manipulation and validation logic
   */
  test("string operations - testing string utilities", () => {
    const greeting = "Hello, World!";

    // Test substring checking
    expect(greeting).toContain("World");
    expect(greeting).toContain("Hello");

    // Test length
    expect(greeting.length).toBe(13);

    // Test transformations
    expect(greeting.toLowerCase()).toBe("hello, world!");
    expect(greeting.toUpperCase()).toBe("HELLO, WORLD!");
  });

  /**
   * Example 3: Testing async operations
   * Shows how to test promises and async/await functions
   */
  test("async operations - testing promise-based functions", async () => {
    // Test a function that returns a promise
    const fetchData = async (): Promise<number> => {
      return Promise.resolve(42);
    };

    const result = await fetchData();
    expect(result).toBe(42);

    // Alternative syntax for testing promises
    await expect(fetchData()).resolves.toBe(42);
  });

  /**
   * Example 4: Testing object equality
   * Deep equality checks for objects and arrays
   */
  test("object equality - testing data structures", () => {
    const user = { name: "John", age: 30 };

    // Use toEqual for deep equality (not toBe)
    expect(user).toEqual({ name: "John", age: 30 });

    // Test nested objects
    const userWithAddress = {
      name: "John",
      address: { city: "NYC", zip: "10001" }
    };
    expect(userWithAddress.address).toEqual({ city: "NYC", zip: "10001" });
  });

  /**
   * Example 5: Testing array operations
   * Common patterns for testing arrays
   */
  test("array operations - testing array manipulation", () => {
    const numbers = [1, 2, 3, 4, 5];

    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
    expect(numbers[0]).toBe(1);

    // Test array methods
    const doubled = numbers.map(n => n * 2);
    expect(doubled).toEqual([2, 4, 6, 8, 10]);

    const filtered = numbers.filter(n => n > 3);
    expect(filtered).toEqual([4, 5]);
  });

  /**
   * Example 6: Testing error handling
   * Verify that functions throw errors when expected
   */
  test("error handling - testing exception cases", () => {
    const divide = (a: number, b: number) => {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    };

    expect(() => divide(10, 2)).not.toThrow();
    expect(divide(10, 2)).toBe(5);

    expect(() => divide(10, 0)).toThrow("Division by zero");
  });
});

/**
 * Example: Testing with setup and teardown
 * Use beforeEach/afterEach for common test setup
 */
describe("Backend Unit Tests - With Setup/Teardown", () => {
  let testData: { users: Array<{ id: number; name: string }> };

  // Runs before each test
  beforeEach(() => {
    testData = {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    };
  });

  test("find user by id - testing search logic", () => {
    const findUserById = (id: number) => {
      return testData.users.find(u => u.id === id);
    };

    expect(findUserById(1)).toEqual({ id: 1, name: "Alice" });
    expect(findUserById(2)).toEqual({ id: 2, name: "Bob" });
    expect(findUserById(999)).toBeUndefined();
  });

  test("filter users by name - testing filter logic", () => {
    const filterByName = (query: string) => {
      return testData.users.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    expect(filterByName("alice")).toHaveLength(1);
    expect(filterByName("bob")).toHaveLength(1);
    expect(filterByName("charlie")).toHaveLength(0);
  });
});

/**
 * Template: Testing utility functions
 * Add your own utility function tests here
 */
describe("Backend Unit Tests - Your Utility Functions", () => {
  test("example utility - add your function tests here", () => {
    // Example: Testing a date formatter
    // const formatDate = (date: Date) => date.toISOString().split('T')[0];
    // expect(formatDate(new Date('2025-01-15'))).toBe('2025-01-15');

    expect(true).toBe(true); // Replace with your actual test
  });
});

/**
 * How to add more unit tests:
 *
 * 1. Create a new describe block for each module/file
 * 2. Write tests for individual functions
 * 3. Test edge cases (empty inputs, null, undefined, etc.)
 * 4. Test error conditions
 * 5. Keep tests fast and isolated
 *
 * Example structure:
 * describe("MyModule", () => {
 *   test("myFunction - handles normal input", () => { ... });
 *   test("myFunction - handles edge case", () => { ... });
 *   test("myFunction - throws on invalid input", () => { ... });
 * });
 */
