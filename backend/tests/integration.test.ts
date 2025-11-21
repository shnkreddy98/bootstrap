import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { queryValidated } from "../src/db";
import { todoListSchema } from "../src/schemas";

/**
 * Backend Integration Tests
 *
 * These tests verify that your API routes work end-to-end:
 * - HTTP request handling
 * - Route validation
 * - Database operations
 * - Response formatting
 *
 * Tests run against the actual server and database.
 */

const API_BASE = `http://localhost:${process.env.PORT || 3000}`;

// Test data
const testTodo = {
  title: "Integration test todo",
  completed: false,
};

describe("Backend Integration Tests - /api/todos", () => {
  let createdTodoId: number;

  // Cleanup before tests
  beforeAll(async () => {
    // Clean up any existing test data
    await queryValidated(
      "DELETE FROM todos WHERE title = $1",
      [testTodo.title],
      todoListSchema
    );
  });

  // Cleanup after tests
  afterAll(async () => {
    // Clean up test data
    if (createdTodoId) {
      await queryValidated(
        "DELETE FROM todos WHERE id = $1",
        [createdTodoId],
        todoListSchema
      );
    }
  });

  test("GET /api/health - health check returns ok", async () => {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ status: "ok" });
  });

  test("GET /api/todos - fetch all todos", async () => {
    const response = await fetch(`${API_BASE}/api/todos`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    // Each todo should have required fields
    if (data.length > 0) {
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("title");
      expect(data[0]).toHaveProperty("completed");
      expect(data[0]).toHaveProperty("created_at");
    }
  });

  test("POST /api/todos - create a new todo", async () => {
    const response = await fetch(`${API_BASE}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testTodo),
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty("id");
    expect(data.title).toBe(testTodo.title);
    expect(data.completed).toBe(testTodo.completed);
    expect(data).toHaveProperty("created_at");

    // Store ID for cleanup and later tests
    createdTodoId = data.id;
  });

  test("POST /api/todos - validation fails with invalid data", async () => {
    const response = await fetch(`${API_BASE}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" }), // Empty title should fail
    });

    expect(response.status).toBe(400);
  });

  test("PATCH /api/todos/:id - update todo completion", async () => {
    // First create a todo
    const createResponse = await fetch(`${API_BASE}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Todo to update", completed: false }),
    });
    const created = await createResponse.json();

    // Update it
    const updateResponse = await fetch(`${API_BASE}/api/todos/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    const updated = await updateResponse.json();

    expect(updateResponse.status).toBe(200);
    expect(updated.id).toBe(created.id);
    expect(updated.completed).toBe(true);

    // Cleanup
    await fetch(`${API_BASE}/api/todos/${created.id}`, { method: "DELETE" });
  });

  test("PATCH /api/todos/:id - returns 404 for non-existent todo", async () => {
    const response = await fetch(`${API_BASE}/api/todos/999999`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe("Todo not found");
  });

  test("DELETE /api/todos/:id - delete a todo", async () => {
    // First create a todo
    const createResponse = await fetch(`${API_BASE}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Todo to delete", completed: false }),
    });
    const created = await createResponse.json();

    // Delete it
    const deleteResponse = await fetch(`${API_BASE}/api/todos/${created.id}`, {
      method: "DELETE",
    });
    const deleteData = await deleteResponse.json();

    expect(deleteResponse.status).toBe(200);
    expect(deleteData.success).toBe(true);

    // Verify it's gone
    const getResponse = await fetch(`${API_BASE}/api/todos`);
    const todos = await getResponse.json();
    const found = todos.find((t: any) => t.id === created.id);
    expect(found).toBeUndefined();
  });

  test("DELETE /api/todos/:id - returns 404 for non-existent todo", async () => {
    const response = await fetch(`${API_BASE}/api/todos/999999`, {
      method: "DELETE",
    });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data.error).toBe("Todo not found");
  });

  test("End-to-end flow - create, update, delete", async () => {
    // 1. Create
    const createRes = await fetch(`${API_BASE}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "E2E test todo", completed: false }),
    });
    const created = await createRes.json();
    expect(createRes.status).toBe(201);
    expect(created.completed).toBe(false);

    // 2. Update
    const updateRes = await fetch(`${API_BASE}/api/todos/${created.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    const updated = await updateRes.json();
    expect(updateRes.status).toBe(200);
    expect(updated.completed).toBe(true);

    // 3. Verify it's in the list
    const listRes = await fetch(`${API_BASE}/api/todos`);
    const todos = await listRes.json();
    const found = todos.find((t: any) => t.id === created.id);
    expect(found).toBeDefined();
    expect(found.completed).toBe(true);

    // 4. Delete
    const deleteRes = await fetch(`${API_BASE}/api/todos/${created.id}`, {
      method: "DELETE",
    });
    expect(deleteRes.status).toBe(200);

    // 5. Verify it's gone
    const finalListRes = await fetch(`${API_BASE}/api/todos`);
    const finalTodos = await finalListRes.json();
    const notFound = finalTodos.find((t: any) => t.id === created.id);
    expect(notFound).toBeUndefined();
  });
});
