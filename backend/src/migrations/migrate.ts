import { Pool } from 'pg'
import { readdir, readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Database Migration Runner
 *
 * Reads .sql files from this directory and applies them sequentially.
 * Tracks applied migrations in a 'migrations' table.
 *
 * Usage: bun run migrate
 */

const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/myapp'

async function runMigrations() {
  const pool = new Pool({ connectionString })

  try {
    console.log('🔄 Starting migrations...')
    console.log(`📍 Database: ${connectionString.split('@')[1]}`) // Show host/db only

    // Create migrations tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT NOW()
      )
    `)

    // Get applied migrations
    const appliedResult = await pool.query(
      'SELECT filename FROM migrations ORDER BY filename'
    )
    const applied = new Set(appliedResult.rows.map(r => r.filename))

    // Read migration files
    const migrationsDir = __dirname
    const files = await readdir(migrationsDir)
    const sqlFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort() // 001, 002, 003...

    if (sqlFiles.length === 0) {
      console.log('⚠️  No migration files found')
      return
    }

    // Run pending migrations
    let ranCount = 0

    for (const file of sqlFiles) {
      if (applied.has(file)) {
        console.log(`⏭️  Skipping ${file} (already applied)`)
        continue
      }

      console.log(`⚙️  Running ${file}...`)

      const filePath = join(migrationsDir, file)
      const sql = await readFile(filePath, 'utf-8')

      // Run in transaction
      await pool.query('BEGIN')

      try {
        await pool.query(sql)
        await pool.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        )
        await pool.query('COMMIT')

        console.log(`✅ Applied ${file}`)
        ranCount++
      } catch (error) {
        await pool.query('ROLLBACK')
        throw new Error(`Failed to apply ${file}: ${error}`)
      }
    }

    if (ranCount === 0) {
      console.log('✨ All migrations up to date')
    } else {
      console.log(`✅ Applied ${ranCount} migration(s)`)
    }

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run if called directly
runMigrations()
