-- Migration: 0002_todos
-- Description: Create todos table for task management
-- Created: 2025-01-30

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- References users.user_id
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_todos_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS todos_created_at_idx ON todos(created_at DESC);

-- Create an index on user_id for faster user-based queries
CREATE INDEX IF NOT EXISTS todos_user_id_idx ON todos(user_id);
