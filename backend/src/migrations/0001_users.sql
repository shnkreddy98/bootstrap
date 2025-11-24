-- Create users table
-- This stores both authenticated and anonymous users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL, -- JWT 'sub' claim or generated UUID for anonymous
  email TEXT, -- From JWT 'email' claim (null for anonymous)
  first_name TEXT, -- From JWT 'first_name' claim (null for anonymous)
  last_name TEXT, -- From JWT 'last_name' claim (null for anonymous)
  is_anonymous BOOLEAN DEFAULT true, -- true if only 'sub' claim exists in JWT
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups by user_id (most common query pattern)
CREATE INDEX idx_users_user_id ON users(user_id);

-- Index for email lookups (if needed)
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
