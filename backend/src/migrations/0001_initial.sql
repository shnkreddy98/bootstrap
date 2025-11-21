-- Migration: 0001_initial
-- Description: Create todos table for task management
-- Created: 2025-01-30

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS todos_created_at_idx ON todos(created_at DESC);
