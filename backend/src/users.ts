import { queryOneValidated } from './db.js';
import { z } from 'zod';
import type { User } from './types/index.js';

// Schema for user database record
const userDbSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  email: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  is_anonymous: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

/**
 * Upsert a user into the database
 * Creates or updates a user record based on userId
 */
export async function upsertUser(user: User): Promise<void> {
  await queryOneValidated(
    `INSERT INTO users (user_id, email, first_name, last_name, is_anonymous, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (user_id)
     DO UPDATE SET
       email = EXCLUDED.email,
       first_name = EXCLUDED.first_name,
       last_name = EXCLUDED.last_name,
       is_anonymous = EXCLUDED.is_anonymous,
       updated_at = NOW()`,
    [user.userId, user.email || null, user.firstName || null, user.lastName || null, user.isAnonymous],
    userDbSchema
  );
}
