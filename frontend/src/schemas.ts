import { z } from 'zod'

/**
 * Frontend Zod Schemas
 *
 * These schemas validate API responses from the backend.
 * They should match backend/src/schemas.ts
 *
 * NOTE: Keep these in sync with backend schemas when API changes!
 *
 * Benefits:
 * - Runtime validation of API responses
 * - Catches backend changes at runtime
 * - Type safety from validation
 */

// ============================================
// Response Schemas (what API returns)
// ============================================

/**
 * Todo Schema - Validates API response shape
 */
export const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  completed: z.boolean(),
  created_at: z.string(), // ISO timestamp string from JSON
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

/**
 * User Schema - Current user info
 */
export const userSchema = z.object({
  userId: z.string(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  isAnonymous: z.boolean(),
})

/**
 * Config Schema - Runtime configuration from backend
 */
export const configSchema = z.object({
  externalAuthUrl: z.string(),
})

// ============================================
// Request Schemas (what we send to API)
// ============================================

/**
 * Create Todo Request Schema
 */
export const createTodoInputSchema = z.object({
  title: z.string().min(1).max(200),
  completed: z.boolean().optional(),
})

/**
 * Update Todo Request Schema
 */
export const updateTodoInputSchema = z.object({
  completed: z.boolean(),
})

// ============================================
// Inferred Types
// ============================================

export type Todo = z.infer<typeof todoSchema>
export type CreateTodoInput = z.infer<typeof createTodoInputSchema>
export type UpdateTodoInput = z.infer<typeof updateTodoInputSchema>
export type User = z.infer<typeof userSchema>
export type Config = z.infer<typeof configSchema>
