import type { Todo, User, Config } from '../schemas'

/**
 * Mock Data Store
 *
 * In-memory data store for frontend-only development.
 * No backend required - instant startup and testing.
 */

// Mock Todos
let mockTodos: Todo[] = [
  { id: 1, title: 'Build awesome UI components', completed: true, created_at: new Date('2024-01-01').toISOString() },
  { id: 2, title: 'Test mobile responsiveness', completed: false, created_at: new Date('2024-01-02').toISOString() },
  { id: 3, title: 'Add dark mode support', completed: false, created_at: new Date('2024-01-03').toISOString() },
  { id: 4, title: 'Deploy to production', completed: false, created_at: new Date('2024-01-04').toISOString() },
]

let nextTodoId = 5

// Mock User
const mockUser: User = {
  userId: '1',
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  isAnonymous: false,
}

// Mock Config
const mockConfig: Config = {
  externalAuthUrl: 'https://auth.example.com',
}

// Mock Posts (for Feed)
const mockPosts = [
  {
    id: 1,
    userId: 1,
    userName: 'Alice Johnson',
    userAvatar: undefined,
    content: 'Just launched my new project! Really excited to share it with everyone. Check it out!',
    imageUrl: undefined,
    likes: 24,
    comments: 5,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    userId: 2,
    userName: 'Bob Smith',
    userAvatar: undefined,
    content: 'Beautiful sunset today 🌅',
    imageUrl: undefined,
    likes: 42,
    comments: 8,
    createdAt: new Date('2024-01-14').toISOString(),
  },
  {
    id: 3,
    userId: 3,
    userName: 'Carol White',
    userAvatar: undefined,
    content: 'Working on some exciting new features! Stay tuned for updates.',
    imageUrl: undefined,
    likes: 15,
    comments: 3,
    createdAt: new Date('2024-01-13').toISOString(),
  },
]

let nextPostId = 4

// Mock Products (for E-commerce)
const mockProducts = [
  { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'clothing', imageUrl: undefined, stock: 50 },
  { id: 2, name: 'Denim Jeans', price: 79.99, category: 'clothing', imageUrl: undefined, stock: 30 },
  { id: 3, name: 'Leather Wallet', price: 49.99, category: 'accessories', imageUrl: undefined, stock: 20 },
  { id: 4, name: 'Sunglasses', price: 149.99, category: 'accessories', imageUrl: undefined, stock: 15 },
  { id: 5, name: 'Running Shoes', price: 119.99, category: 'shoes', imageUrl: undefined, stock: 25 },
  { id: 6, name: 'Canvas Sneakers', price: 59.99, category: 'shoes', imageUrl: undefined, stock: 40 },
  { id: 7, name: 'Leather Backpack', price: 89.99, category: 'bags', imageUrl: undefined, stock: 10 },
  { id: 8, name: 'Tote Bag', price: 39.99, category: 'bags', imageUrl: undefined, stock: 0 },
]

// Mock Stats (for Dashboard)
const mockStats = {
  revenue: 125450,
  revenueTrend: 12.5,
  users: 1234,
  usersTrend: 8.2,
  orders: 456,
  ordersTrend: 15.3,
  activeSessions: 89,
}

// Mock Recent Activity (for Dashboard)
const mockActivity = [
  {
    id: 1,
    userName: 'John Doe',
    userAvatar: undefined,
    action: 'Completed a purchase',
    type: 'purchase',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    userName: 'Jane Smith',
    userAvatar: undefined,
    action: 'Signed up for an account',
    type: 'signup',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    userAvatar: undefined,
    action: 'Updated profile information',
    type: 'update',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

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

  async createTodo(data: { title: string; completed?: boolean }): Promise<Todo> {
    await delay(300)
    const newTodo: Todo = {
      id: nextTodoId++,
      title: data.title,
      completed: data.completed ?? false,
      created_at: new Date().toISOString(),
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

  // Posts (for Feed)
  async fetchPosts(): Promise<typeof mockPosts> {
    await delay(200)
    return [...mockPosts]
  },

  async createPost(data: { content: string }): Promise<typeof mockPosts[0]> {
    await delay(300)
    const newPost = {
      id: nextPostId++,
      userId: parseInt(mockUser.userId),
      userName: `${mockUser.firstName || ''} ${mockUser.lastName || ''}`.trim() || 'User',
      userAvatar: undefined,
      content: data.content,
      imageUrl: undefined,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    }
    mockPosts.unshift(newPost)
    return newPost
  },

  // Products (for E-commerce)
  async fetchProducts(): Promise<typeof mockProducts> {
    await delay(200)
    return [...mockProducts]
  },

  // Stats (for Dashboard)
  async fetchStats(): Promise<typeof mockStats> {
    await delay(200)
    return { ...mockStats }
  },

  // Recent Activity (for Dashboard)
  async fetchRecentActivity(): Promise<typeof mockActivity> {
    await delay(150)
    return [...mockActivity]
  },
}

/**
 * Reset mock data (useful for testing)
 */
export function resetMockData() {
  mockTodos = [
    { id: 1, title: 'Build awesome UI components', completed: true, created_at: new Date('2024-01-01').toISOString() },
    { id: 2, title: 'Test mobile responsiveness', completed: false, created_at: new Date('2024-01-02').toISOString() },
    { id: 3, title: 'Add dark mode support', completed: false, created_at: new Date('2024-01-03').toISOString() },
    { id: 4, title: 'Deploy to production', completed: false, created_at: new Date('2024-01-04').toISOString() },
  ]
  nextTodoId = 5
}
