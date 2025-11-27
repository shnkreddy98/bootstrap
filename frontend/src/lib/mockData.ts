import type { Todo, User, Config } from '../schemas'

/**
 * Mock Data Store
 *
 * In-memory data store for frontend-only development.
 * No backend required - instant startup and testing.
 */

// Mock Todos
let mockTodos: Todo[] = [
  { id: 1, title: 'Build awesome UI components', completed: true },
  { id: 2, title: 'Test mobile responsiveness', completed: false },
  { id: 3, title: 'Add dark mode support', completed: false },
  { id: 4, title: 'Deploy to production', completed: false },
]

let nextTodoId = 5

// Mock User
const mockUser: User = {
  id: 1,
  email: 'demo@example.com',
  name: 'Demo User',
}

// Mock Config
const mockConfig: Config = {
  appName: 'Bootstrap App',
  version: '1.0.0',
}

/**
 * Simulate network delay for realistic UX testing
 */
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock API Functions
 */

export const mockApi = {
  // Todos
  async fetchTodos(): Promise<Todo[]> {
    await delay(200)
    return [...mockTodos]
  },

  async createTodo(data: { title: string; completed: boolean }): Promise<Todo> {
    await delay(300)
    const newTodo: Todo = {
      id: nextTodoId++,
      title: data.title,
      completed: data.completed,
    }
    mockTodos.push(newTodo)
    return newTodo
  },

  async toggleTodo(id: number, completed: boolean): Promise<Todo> {
    await delay(200)
    const todo = mockTodos.find(t => t.id === id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    todo.completed = completed
    return { ...todo }
  },

  async deleteTodo(id: number): Promise<{ success: boolean }> {
    await delay(200)
    const index = mockTodos.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Todo not found')
    }
    mockTodos.splice(index, 1)
    return { success: true }
  },

  // User
  async fetchMe(): Promise<User> {
    await delay(100)
    return { ...mockUser }
  },

  // Config
  async fetchConfig(): Promise<Config> {
    await delay(100)
    return { ...mockConfig }
  },
}

/**
 * Reset mock data (useful for testing)
 */
export function resetMockData() {
  mockTodos = [
    { id: 1, title: 'Build awesome UI components', completed: true },
    { id: 2, title: 'Test mobile responsiveness', completed: false },
    { id: 3, title: 'Add dark mode support', completed: false },
    { id: 4, title: 'Deploy to production', completed: false },
  ]
  nextTodoId = 5
}
