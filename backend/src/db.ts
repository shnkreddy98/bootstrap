import { Pool } from 'pg'
import { z } from 'zod'

/**
 * Database Connection
 *
 * Uses DATABASE_URL environment variable provided by AI agent.
 * Default is for local development only.
 */

const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/myapp'

console.log('Database connection string:', connectionString)

export const pool = new Pool({
  connectionString,
})

// Connection logging
pool.on('connect', () => {
  console.log('✓ Database connected')
})

pool.on('error', (err) => {
  console.error('✗ Database connection error:', err)
  process.exit(1)
})

/**
 * Execute a query and return all rows (UNVALIDATED)
 *
 * @deprecated Use queryValidated instead for type safety
 */
export async function query<T>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const result = await pool.query(sql, params)
  return result.rows as T[]
}

/**
 * Execute a query and return the first row, or null if no rows (UNVALIDATED)
 *
 * @deprecated Use queryOneValidated instead for type safety
 */
export async function queryOne<T>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows[0] || null
}

/**
 * Execute a query and validate all rows against a Zod schema
 *
 * This provides runtime type safety - database results are validated
 * against the schema, catching any unexpected data shapes.
 *
 * @throws {z.ZodError} If validation fails
 */
export async function queryValidated<T>(
  sql: string,
  params: any[],
  schema: z.ZodSchema<T>
): Promise<T[]> {
  const result = await pool.query(sql, params)

  // Validate all rows
  const validated = result.rows.map((row, index) => {
    try {
      return schema.parse(row)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Database result validation failed at row ${index}: ${error.message}`
        )
      }
      throw error
    }
  })

  return validated
}

/**
 * Execute a query and validate the first row against a Zod schema
 * Returns null if no rows found.
 *
 * @throws {z.ZodError} If validation fails
 */
export async function queryOneValidated<T>(
  sql: string,
  params: any[],
  schema: z.ZodSchema<T>
): Promise<T | null> {
  const result = await pool.query(sql, params)

  if (result.rows.length === 0) {
    return null
  }

  try {
    return schema.parse(result.rows[0])
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Database result validation failed: ${error.message}`)
    }
    throw error
  }
}
