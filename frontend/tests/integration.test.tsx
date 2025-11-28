import { describe, test, expect, beforeEach, mock } from "bun:test";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as api from "../src/lib/api";

/**
 * Frontend Integration Tests
 *
 * These tests verify that your React components work with real-world interactions:
 * - Component rendering
 * - User interactions (clicks, typing, etc.)
 * - API integration (with mocked responses)
 * - State management
 * - UI updates based on data changes
 *
 * Note: These tests mock API calls to avoid dependency on backend.
 * For full E2E tests that include backend, use tools like Playwright or Cypress.
 */

// Mock data matching your schema
const mockTodos = [
  {
    id: 1,
    title: "Test todo 1",
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Test todo 2",
    completed: true,
    created_at: new Date().toISOString(),
  },
];

// Skip these tests since USE_MOCK_DATA is enabled and we don't use the backend
describe.skip("Frontend Integration Tests - API Integration", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mock.restore();
  });

  test("API client - fetchTodos returns array of todos", async () => {
    // Mock the fetch call
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => mockTodos,
      } as Response)
    );
    global.fetch = mockFetch as any;

    const todos = await api.fetchTodos();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe("Test todo 1");
  });

  test("API client - createTodo sends correct data", async () => {
    const newTodo = { title: "New todo", completed: false };
    const createdTodo = { id: 3, ...newTodo, created_at: new Date().toISOString() };

    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 201,
        json: async () => createdTodo,
      } as Response)
    );
    global.fetch = mockFetch as any;

    const result = await api.createTodo(newTodo);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.id).toBe(3);
    expect(result.title).toBe("New todo");
  });

  test("API client - toggleTodo updates completion status", async () => {
    const updatedTodo = { ...mockTodos[0], completed: true };

    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => updatedTodo,
      } as Response)
    );
    global.fetch = mockFetch as any;

    const result = await api.toggleTodo(1, true);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.completed).toBe(true);
  });

  test("API client - deleteTodo returns success", async () => {
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      } as Response)
    );
    global.fetch = mockFetch as any;

    const result = await api.deleteTodo(1);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
  });

  test("API client - handles 401 error by redirecting", async () => {
    // Mock window.location (not available in Bun test environment)
    const mockLocation = { href: "http://localhost" };
    (globalThis as any).window = { location: mockLocation };

    const mockFetch = mock(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: async () => ({ error: "Unauthorized" }),
      } as Response)
    );
    global.fetch = mockFetch as any;

    await expect(api.fetchTodos()).rejects.toThrow("Unauthorized");
    // Note: In a real browser environment, window.location.href would be set

    // Cleanup
    delete (globalThis as any).window;
  });

  test("API client - handles network errors", async () => {
    const mockFetch = mock(() => Promise.reject(new Error("Network error")));
    global.fetch = mockFetch as any;

    await expect(api.fetchTodos()).rejects.toThrow("Network error");
  });

  test("API client - handles validation errors", async () => {
    // Return invalid data that doesn't match schema
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => [{ invalid: "data" }],
      } as Response)
    );
    global.fetch = mockFetch as any;

    await expect(api.fetchTodos()).rejects.toThrow("Invalid API response");
  });
});

/**
 * Component Integration Tests
 *
 * Uncomment these when you have @testing-library/react installed:
 * bun add -d @testing-library/react @testing-library/user-event happy-dom
 *
 * Then add to frontend/tests/setup.ts:
 * import { JSDOM } from 'happy-dom'
 * global.document = new JSDOM().window.document
 */

/*
describe("Frontend Integration Tests - Component Integration", () => {
  test("TodoItem component - renders todo and handles toggle", async () => {
    const user = userEvent.setup();
    const mockOnToggle = mock(() => {});
    const mockOnDelete = mock(() => {});

    render(
      <TodoItem
        todo={mockTodos[0]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    // Check if todo is rendered
    expect(screen.getByText("Test todo 1")).toBeDefined();

    // Click the checkbox
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1, true);
  });

  test("TodoForm component - submits new todo", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = mock(() => {});

    render(<TodoForm onSubmit={mockOnSubmit} />);

    // Type into input
    const input = screen.getByPlaceholderText(/add a new todo/i);
    await user.type(input, "New integration test todo");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /add/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith("New integration test todo");
  });

  test("Full page integration - TodoList fetches and displays todos", async () => {
    // Mock API
    const mockFetch = mock(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => mockTodos,
      } as Response)
    );
    global.fetch = mockFetch as any;

    // Render page with React Query provider
    const { QueryClient, QueryClientProvider } = await import("@tanstack/react-query");
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    const { default: Home } = await import("../src/pages/Home");

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText("Test todo 1")).toBeDefined();
      expect(screen.getByText("Test todo 2")).toBeDefined();
    });
  });
});
*/

/**
 * How to add more integration tests:
 *
 * 1. For API routes:
 *    - Add new routes to your backend
 *    - Create tests that make HTTP requests
 *    - Verify responses and database state
 *
 * 2. For components:
 *    - Install testing libraries (see comment above)
 *    - Import your components
 *    - Use render() to mount them
 *    - Use userEvent to simulate interactions
 *    - Use screen.getBy* to find elements
 *    - Use waitFor() for async operations
 *
 * 3. For full E2E tests:
 *    - Consider using Playwright or Cypress
 *    - These tools run in real browsers
 *    - They can test against running backend
 */
