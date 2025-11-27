import { z } from 'zod'
import {
  todoSchema,
  todoListSchema,
  deleteResponseSchema,
  userSchema,
  configSchema,
  type Todo,
  type CreateTodoInput,
  type User,
  type Config,
} from '../schemas'

/**
 * API Client
 *
 * Handles all communication with the backend API.
 * Automatically redirects to external auth on 401/403 errors.
 * Validates all API responses with Zod schemas for runtime type safety.
 *
 * Uses relative URLs - works in both dev (via Vite proxy) and production
 */

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
  const response = await fetch(endpoint, {
    ...options,
    credentials: 'include', // Send cookies with requests
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  // Just throw error on auth failures - UI components will handle displaying login
  if (response.status === 401 || response.status === 403) {
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

/**
 * Fetch current user info
 */
export async function fetchMe(): Promise<User> {
  return fetchAPI('/api/me', userSchema)
}

/**
 * Fetch runtime configuration
 */
export async function fetchConfig(): Promise<Config> {
  return fetchAPI('/api/config', configSchema)
}
