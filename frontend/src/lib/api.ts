import { z } from 'zod'
import {
  todoSchema,
  todoListSchema,
  deleteResponseSchema,
  type Todo,
  type CreateTodoInput,
} from '../schemas'

/**
 * API Client
 *
 * Handles all communication with the backend API.
 * Automatically redirects to external auth on 401/403 errors.
 * Validates all API responses with Zod schemas for runtime type safety.
 */

// API base URL
// In production (single process), API is on same host
// In dev, backend is on :3000, frontend on :5173
const API_BASE = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : '')

// Auth redirect URL for 401/403 errors
const AUTH_URL = import.meta.env.EXTERNAL_AUTH_URL ||
  'https://auth.example.com/login'

/**
 * Helper function for API calls with Zod validation
 * Automatically handles auth redirects and validates response shape
 *
 * @throws {z.ZodError} If response validation fails
 */
async function fetchAPI<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  // Redirect on auth errors
  if (response.status === 401 || response.status === 403) {
    console.warn('Unauthorized, redirecting to auth...')
    window.location.href = AUTH_URL
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error.error || 'API request failed')
  }

  const data = await response.json()

  // Validate response with Zod schema
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('API response validation failed:', error.errors)
      throw new Error(`Invalid API response: ${error.message}`)
    }
    throw error
  }
}

/**
 * Fetch all todos
 */
export async function fetchTodos(): Promise<Todo[]> {
  return fetchAPI('/api/todos', todoListSchema)
}

/**
 * Create a new todo
 */
export async function createTodo(data: CreateTodoInput): Promise<Todo> {
  return fetchAPI('/api/todos', todoSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Toggle todo completion status
 */
export async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
  return fetchAPI(`/api/todos/${id}`, todoSchema, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  })
}

/**
 * Delete a todo
 */
export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  return fetchAPI(`/api/todos/${id}`, deleteResponseSchema, {
    method: 'DELETE',
  })
}
