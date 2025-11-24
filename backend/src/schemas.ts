import { z } from 'zod'

/**
 * Zod Validation Schemas
 *
 * These schemas are the SINGLE SOURCE OF TRUTH for types.
 * All TypeScript types are inferred from these schemas.
 *
 * Benefits:
 * - Types and validation rules always match
 * - No type/schema drift
 * - Runtime validation at all boundaries
 */

// ============================================
// Response Schemas (what API returns)
// ============================================

/**
 * Todo Schema - Validates database query results and API responses
 */
export const todoSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.string(),
  title: z.string().min(1).max(200),
  completed: z.boolean(),
  created_at: z.coerce.string(), // JSON-safe: database TIMESTAMP serialized to string
})

/**
 * Todo List Response Schema
 */
export const todoListSchema = z.array(todoSchema)

/**
 * Delete Response Schema
 */
export const deleteResponseSchema = z.object({
  success: z.boolean(),
})

// ============================================
// Request Schemas (what API accepts)
// ============================================

/**
 * Create Todo Request Schema
 */
export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  completed: z.boolean().optional().default(false),
})

/**
 * Update Todo Request Schema
 */
export const updateTodoSchema = z.object({
  completed: z.boolean(),
})

/**
 * URL Parameter Schemas
 */
export const todoIdParamSchema = z.coerce.number().int().positive()

// ============================================
// Inferred Types (exported for use throughout app)
// ============================================

export type Todo = z.infer<typeof todoSchema>
export type CreateTodoInput = z.infer<typeof createTodoSchema>
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>
