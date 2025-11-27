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
import { mockApi } from './mockData'

/**
 * API Client
 *
 * Frontend-only mode: Uses mock data (no backend required)
 * Backend mode: Uncomment the fetchAPI calls below
 *
 * Toggle between modes by setting USE_MOCK_DATA
 */

// Set to false when you have a real backend
const USE_MOCK_DATA = true

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
  if (USE_MOCK_DATA) {
    return mockApi.fetchTodos()
  }
  return fetchAPI('/api/todos', todoListSchema)
}

/**
 * Create a new todo
 */
export async function createTodo(data: CreateTodoInput): Promise<Todo> {
  if (USE_MOCK_DATA) {
    return mockApi.createTodo(data)
  }
  return fetchAPI('/api/todos', todoSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Toggle todo completion status
 */
export async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
  if (USE_MOCK_DATA) {
    return mockApi.toggleTodo(id, completed)
  }
  return fetchAPI(`/api/todos/${id}`, todoSchema, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  })
}

/**
 * Delete a todo
 */
export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  if (USE_MOCK_DATA) {
    return mockApi.deleteTodo(id)
  }
  return fetchAPI(`/api/todos/${id}`, deleteResponseSchema, {
    method: 'DELETE',
  })
}

/**
 * Fetch current user info
 */
export async function fetchMe(): Promise<User> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchMe()
  }
  return fetchAPI('/api/me', userSchema)
}

/**
 * Fetch runtime configuration
 */
export async function fetchConfig(): Promise<Config> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchConfig()
  }
  return fetchAPI('/api/config', configSchema)
}

/**
 * Fetch all posts (for Feed)
 */
export async function fetchPosts() {
  if (USE_MOCK_DATA) {
    return mockApi.fetchPosts()
  }
  // return fetchAPI('/api/posts', postsSchema)
  throw new Error('Backend not implemented')
}

/**
 * Create a new post
 */
export async function createPost(data: { content: string }) {
  if (USE_MOCK_DATA) {
    return mockApi.createPost(data)
  }
  // return fetchAPI('/api/posts', postSchema, { method: 'POST', body: JSON.stringify(data) })
  throw new Error('Backend not implemented')
}

/**
 * Fetch all products (for E-commerce)
 */
export async function fetchProducts() {
  if (USE_MOCK_DATA) {
    return mockApi.fetchProducts()
  }
  // return fetchAPI('/api/products', productsSchema)
  throw new Error('Backend not implemented')
}

/**
 * Fetch dashboard stats
 */
export async function fetchStats() {
  if (USE_MOCK_DATA) {
    return mockApi.fetchStats()
  }
  // return fetchAPI('/api/stats', statsSchema)
  throw new Error('Backend not implemented')
}

/**
 * Fetch recent activity
 */
export async function fetchRecentActivity() {
  if (USE_MOCK_DATA) {
    return mockApi.fetchRecentActivity()
  }
  // return fetchAPI('/api/activity', activitySchema)
  throw new Error('Backend not implemented')
}
