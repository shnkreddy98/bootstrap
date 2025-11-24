import { describe, test, expect } from "bun:test";
import { z } from "zod";

/**
 * Contract Tests
 *
 * These tests ensure that form data transformations match backend expectations.
 * They help catch bugs where HTML inputs produce strings but backend expects numbers.
 *
 * Example bug this catches:
 * - <input type="number"> produces string "18" but backend expects number 18
 * - Form submission sends {age: "18"} when it should send {age: 18}
 *
 * These tests validate the transformation layer between forms and API calls.
 */

describe("Frontend Contract Tests - Form Data Transformations", () => {
  /**
   * Example: Testing number input transformation
   *
   * HTML number inputs return strings, not numbers.
   * We need to transform them before sending to the backend.
   */
  test("number input transformation - converts string to number", () => {
    // Simulate what an HTML <input type="number"> produces
    const formValue = "42"; // Always a string, even with type="number"

    // Transform function that should be used before API call
    const transformToNumber = (value: string): number => {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) throw new Error("Invalid number");
      return parsed;
    };

    const result = transformToNumber(formValue);

    expect(typeof result).toBe("number");
    expect(result).toBe(42);
  });

  test("number input edge cases - handles empty and invalid values", () => {
    const transformToNumber = (value: string): number => {
      if (!value || value.trim() === "") throw new Error("Empty value");
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) throw new Error("Invalid number");
      return parsed;
    };

    expect(() => transformToNumber("")).toThrow("Empty value");
    expect(() => transformToNumber("abc")).toThrow("Invalid number");
    expect(transformToNumber("0")).toBe(0);
    expect(transformToNumber("  25  ")).toBe(25);
  });

  /**
   * Example: Registration form transformation
   *
   * This pattern would catch the bug mentioned in the markdown files
   * where age was sent as string instead of number.
   */
  test("registration form - transforms age from string to number", () => {
    // Simulate form data from HTML inputs
    interface RawFormData {
      email: string;
      password: string;
      name: string;
      age: string; // From <input type="number">
      gender: string;
      photo_url: string;
    }

    const rawFormData: RawFormData = {
      email: "user@example.com",
      password: "password123",
      name: "Test User",
      age: "21", // This is a string!
      gender: "Male",
      photo_url: "https://example.com/photo.jpg",
    };

    // Transform function that should be called before API submission
    const transformRegistrationData = (raw: RawFormData) => ({
      email: raw.email,
      password: raw.password,
      name: raw.name,
      age: parseInt(raw.age, 10), // Critical transformation
      gender: raw.gender,
      photo_url: raw.photo_url,
    });

    const transformed = transformRegistrationData(rawFormData);

    // Verify transformation worked
    expect(typeof transformed.age).toBe("number");
    expect(transformed.age).toBe(21);

    // Verify against backend schema (if shared)
    const registerSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(1),
      age: z.number().int().min(18), // Backend expects number, not string!
      gender: z.string(),
      photo_url: z.string().url(),
    });

    // This should not throw - if it does, transformation is wrong
    expect(() => registerSchema.parse(transformed)).not.toThrow();

    // This would throw if we sent raw form data
    expect(() => registerSchema.parse(rawFormData)).toThrow();
  });

  /**
   * Example: Todo creation form
   *
   * Validates that todo form data matches backend schema
   */
  test("todo creation - validates form data matches backend schema", () => {
    // Simulate form data
    const formData = {
      title: "Buy groceries",
      completed: false,
    };

    // Backend schema (should match backend/src/schemas.ts)
    const createTodoSchema = z.object({
      title: z.string().min(1).max(200),
      completed: z.boolean(),
    });

    // Validate that our form data matches backend expectations
    expect(() => createTodoSchema.parse(formData)).not.toThrow();

    // Test edge cases
    expect(() =>
      createTodoSchema.parse({ title: "", completed: false })
    ).toThrow(); // Empty title
    expect(() =>
      createTodoSchema.parse({ title: "Valid", completed: "false" })
    ).toThrow(); // String instead of boolean
  });

  /**
   * Example: Checkbox input transformation
   *
   * HTML checkboxes can return string "on" or boolean values
   * depending on how they're handled.
   */
  test("checkbox transformation - ensures boolean values", () => {
    const transformCheckbox = (value: unknown): boolean => {
      if (typeof value === "boolean") return value;
      if (value === "on" || value === "true") return true;
      if (value === "off" || value === "false" || value === "") return false;
      return Boolean(value);
    };

    expect(transformCheckbox(true)).toBe(true);
    expect(transformCheckbox(false)).toBe(false);
    expect(transformCheckbox("on")).toBe(true);
    expect(transformCheckbox("off")).toBe(false);
    expect(transformCheckbox("true")).toBe(true);
    expect(transformCheckbox("false")).toBe(false);
    expect(transformCheckbox("")).toBe(false);
  });

  /**
   * Example: Date input transformation
   *
   * HTML date inputs return strings in YYYY-MM-DD format
   */
  test("date input transformation - converts string to Date object", () => {
    const formDateValue = "2025-11-20"; // From <input type="date">

    const transformDate = (dateString: string): Date => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date;
    };

    const result = transformDate(formDateValue);

    expect(result instanceof Date).toBe(true);
    expect(result.toISOString()).toContain("2025-11-20");
  });

  /**
   * Example: Multi-select transformation
   *
   * Multi-select inputs return arrays
   */
  test("multi-select transformation - validates array of values", () => {
    const selectedValues = ["option1", "option2", "option3"];

    const validateMultiSelect = (values: unknown): string[] => {
      if (!Array.isArray(values)) throw new Error("Must be array");
      if (values.length === 0) throw new Error("At least one value required");
      return values.filter((v): v is string => typeof v === "string");
    };

    const result = validateMultiSelect(selectedValues);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
    expect(() => validateMultiSelect([])).toThrow("At least one value");
    expect(() => validateMultiSelect("not an array")).toThrow("Must be array");
  });
});

/**
 * Template: Add your own contract tests
 *
 * For each form in your application, add tests that:
 * 1. Simulate raw form data (as strings from HTML inputs)
 * 2. Transform the data
 * 3. Validate against backend schema
 * 4. Test edge cases
 */
describe("Frontend Contract Tests - Your Forms", () => {
  test("example form - add your form validation tests here", () => {
    // Example: Testing a user profile form
    // const rawData = { age: "25", bio: "..." }
    // const transformed = transformProfileData(rawData)
    // expect(typeof transformed.age).toBe('number')

    expect(true).toBe(true); // Replace with your actual test
  });
});

/**
 * How to add more contract tests:
 *
 * 1. For each form component, create a test that:
 *    - Simulates raw HTML input values (strings, "on", etc.)
 *    - Transforms them to correct types
 *    - Validates against backend schema
 *
 * 2. Test edge cases:
 *    - Empty values
 *    - Invalid formats
 *    - Type mismatches
 *
 * 3. Import actual backend schemas if they're shared:
 *    - Keep frontend/src/schemas.ts in sync with backend/src/schemas.ts
 *    - Or share schemas in a common package
 *
 * 4. Run these tests before committing form changes:
 *    - Catches bugs where form produces wrong data types
 *    - Ensures frontend/backend contract is maintained
 */
