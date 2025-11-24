import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { zValidator } from '@hono/zod-validator'
import { queryValidated, queryOneValidated } from './db'
import {
  todoSchema,
  todoListSchema,
  createTodoSchema,
  updateTodoSchema,
  todoIdParamSchema,
  type Todo,
} from './schemas'
import { authenticateJWT } from './auth.js'

/**
 * Main Application Server
 *
 * This server:
 * - Serves API endpoints at /api/*
 * - Serves pre-built frontend static files from ../frontend/dist
 * - Handles SPA routing (fallback to index.html)
 * - Runs as a single process on PORT (default: 3000)
 */

const app = new Hono()

// ============================================
// API Routes (Must come BEFORE static files)
// ============================================

app.use('/api/*', cors({
  origin: (origin) => origin, // Allow any origin (adjust for production)
  credentials: true, // Allow cookies to be sent/received
}))

// Health check (public, no auth required)
app.get('/api/health', (c) => c.json({ status: 'ok' }))

// JWT authentication for protected routes
app.use('/api/todos/*', authenticateJWT)
app.use('/api/todos', authenticateJWT)

// Get all todos for the authenticated user
app.get('/api/todos', async (c) => {
  const user = c.get('user')
  const todos = await queryValidated(
    'SELECT id, user_id, title, completed, created_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
    [user.userId],
    todoSchema
  )
  return c.json(todos)
})

// Create a new todo
app.post(
  '/api/todos',
  zValidator('json', createTodoSchema),
  async (c) => {
    const user = c.get('user')
    const data = c.req.valid('json')
    const todo = await queryOneValidated(
      'INSERT INTO todos (user_id, title, completed) VALUES ($1, $2, $3) RETURNING id, user_id, title, completed, created_at',
      [user.userId, data.title, data.completed], // Schema has default, no need for || false
      todoSchema
    )
    return c.json(todo, 201)
  }
)

// Update a todo (toggle completion)
app.patch(
  '/api/todos/:id',
  zValidator('json', updateTodoSchema),
  async (c) => {
    const user = c.get('user')
    // Validate URL parameter (prevents NaN issues)
    const id = todoIdParamSchema.parse(c.req.param('id'))
    const { completed } = c.req.valid('json')

    const todo = await queryOneValidated(
      'UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING id, user_id, title, completed, created_at',
      [completed, id, user.userId],
      todoSchema
    )

    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404)
    }

    return c.json(todo)
  }
)

// Delete a todo
app.delete('/api/todos/:id', async (c) => {
  const user = c.get('user')
  // Validate URL parameter (prevents NaN issues)
  const id = todoIdParamSchema.parse(c.req.param('id'))

  const todo = await queryOneValidated(
    'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, user.userId],
    todoSchema.pick({ id: true }) // Only need to validate id field
  )

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }

  return c.json({ success: true })
})

// ============================================
// Static File Serving (After API routes)
// ============================================

// Serve frontend static files
// Automatically serves .gz/.br versions if client supports them
app.use('/*', serveStatic({
  root: '../frontend/dist',
}))

// SPA fallback - serve index.html for client-side routes
// This must come LAST to catch all non-API routes
app.get('*', async (c) => {
  const file = Bun.file('../frontend/dist/index.html')
  return c.html(await file.text())
})

// ============================================
// Error Handling
// ============================================

app.notFound((c) => c.json({ error: 'Not found' }, 404))

app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

// ============================================
// Server Startup
// ============================================

const port = parseInt(process.env.PORT || '3000', 10)

export default {
  port,
  fetch: app.fetch,
}

console.log(`🚀 Server running on http://localhost:${port}`)
console.log(`📂 Serving frontend from ../frontend/dist`)
console.log(`🔌 API available at http://localhost:${port}/api`)
