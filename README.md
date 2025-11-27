# Web Application Boilerplate

Full-stack TypeScript application with backend serving API and pre-built frontend from single process.

## Stack

**Backend**
- Runtime: Bun
- Framework: Hono
- Database: PostgreSQL with pg driver
- Validation: Zod schemas

**Frontend**
- Framework: React 19
- Routing: Tanstack Router
- Data: Tanstack Query
- Styling: Tailwind v4
- UI: Radix UI
- Build: Vite

## Environment Variables

Create `.env` file in project root or set variables in environment.

| Variable | Type | Default | Required | Purpose |
|----------|------|---------|----------|---------|
| `PORT` | number | `3000` | No | Backend server port |
| `DATABASE_URL` | string | `postgresql://postgres:postgres@localhost:5432/myapp` | Yes | PostgreSQL connection string |
| `VITE_API_URL` | string | Empty in production, `http://localhost:3000` in dev | No | Frontend API base URL |
| `EXTERNAL_AUTH_URL` | string | `https://auth.example.com/login` | No | External auth redirect URL for 401/403 |

Frontend environment variables (not prefixed with `VITE_`) are accessed via `import.meta.env`. Set these at build time or in `.env` file.

## PostgreSQL Setup

1. Install PostgreSQL
2. Create database: `createdb myapp`
3. Set `DATABASE_URL` environment variable
4. Run migrations (see below)

Connection string format: `postgresql://user:password@host:port/database`

## Database Migrations

### Location
`backend/src/migrations/*.sql`

### Naming Convention
Sequential numbers: `0001_initial.sql`, `0002_add_column.sql`

4-digit format supports up to 9999 migrations.

### Structure
```sql
-- Migration: <number>_<description>
-- Description: <what this migration does>

<SQL statements>
```

### Running Migrations
```bash
cd backend
bun run migrate
```

Migration runner:
- Tracks applied migrations in `migrations` table
- Runs migrations in transaction
- Executes files in alphanumeric order
- Skips already applied migrations

### Creating New Migration
1. Create file: `backend/src/migrations/000X_description.sql`
2. Write SQL statements
3. Run `bun run migrate`

Example:
```sql
-- Migration: 0002_add_user_id
-- Description: Add user_id foreign key to todos

ALTER TABLE todos ADD COLUMN user_id INTEGER;
CREATE INDEX todos_user_id_idx ON todos(user_id);
```

## Bun Commands

### Backend
```bash
cd backend

# Install dependencies
bun install

# Development (auto-restart on file changes)
bun run dev

# Production (serves API + static frontend)
bun run start

# Run migrations
bun run migrate
```

### Frontend
```bash
cd frontend

# Install dependencies
bun install

# Development server with hot reload (port 5173)
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview
```

### Notes
- Backend `dev` mode: API only on port 3000
- Backend `start` mode: API + static files on port 3000
- Frontend `dev` mode: Runs on port 5173, proxies API to localhost:3000
- Production: Backend serves pre-built frontend from `dist/`

## Tailwind v4 Theme

### Location
`frontend/src/theme.css`

### Structure
Theme uses `@theme` directive with CSS custom properties.

```css
@theme {
  --color-bg-0: #fefdfb;  /* Define token */
  --color-brand: var(--color-pink);  /* Reference token */
}
```

### Token Categories

**Colors**
- `--color-bg-{0-3}`: Background layers (0=base, 3=pressed)
- `--color-fg-{0-3}`: Text hierarchy (0=primary, 3=disabled)
- `--color-border-{0-2}`: Border weights
- `--color-{pink|green|red|yellow|blue|purple|orange}`: Palette
- `--color-{brand|success|error|warning|info}`: Semantic colors

**Typography**
- `--text-{2xs|xs|sm|base|lg|xl|2xl|3xl}`: Font sizes
- `--text-{size}--line-height`: Corresponding line heights
- `--font-{mono|sans|body}`: Font stacks

**Spacing**
- `--spacing-{0.5|1|2|3|4|5|6|8|10|12|16|20}`: 4px grid system

**Visual**
- `--radius-{none|xs|sm|DEFAULT|md|lg|xl}`: Border radius
- `--shadow-{xs|sm|md|lg|xl}`: Box shadows

### Usage in Components
```tsx
// Use Tailwind utilities with theme tokens
<div className="bg-bg-0 text-fg-0 border-border-0">
<button className="bg-brand text-white">
<span className="text-fg-2">
```

### Modifying Theme
1. Edit `frontend/src/theme.css`
2. Change token values or add new tokens
3. Rebuild frontend: `cd frontend && bun run build`
4. Commit updated `dist/` files

### Adding New Tokens
```css
@theme {
  /* Add new token */
  --color-custom: #abc123;

  /* Reference in semantic token */
  --color-highlight: var(--color-custom);
}
```

Use in JSX: `className="bg-custom text-highlight"`

## Hono Framework

### Location
`backend/src/index.ts`

### Basic Structure
```typescript
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/endpoint', async (c) => {
  return c.json({ data: 'value' })
})

export default {
  port: 3000,
  fetch: app.fetch,
}
```

### Route Handlers
```typescript
// GET
app.get('/api/resource', async (c) => {
  return c.json(data)
})

// POST with validation
app.post('/api/resource',
  zValidator('json', schema),
  async (c) => {
    const validated = c.req.valid('json')
    return c.json(result, 201)
  }
)

// PATCH
app.patch('/api/resource/:id', async (c) => {
  const id = c.req.param('id')
  return c.json(updated)
})

// DELETE
app.delete('/api/resource/:id', async (c) => {
  return c.json({ success: true })
})
```

### Context Methods
- `c.json(data, status?)`: Return JSON response
- `c.req.param('name')`: Get URL parameter
- `c.req.valid('json')`: Get validated request body
- `c.req.header('name')`: Get request header

### Middleware
```typescript
import { cors } from 'hono/cors'

app.use('/api/*', cors())
```

### Error Handling
```typescript
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404)
})
```

### Static Files
```typescript
import { serveStatic } from 'hono/bun'

app.use('/*', serveStatic({ root: '../frontend/dist' }))
```

## Zod Validation

### Location
- Backend: `backend/src/schemas.ts`
- Frontend: `frontend/src/schemas.ts`

### Purpose
- Define schemas once
- Validate runtime data
- Infer TypeScript types

### Schema Definition
```typescript
import { z } from 'zod'

export const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  completed: z.boolean(),
  created_at: z.string(),
})

export type Todo = z.infer<typeof todoSchema>
```

### Backend Usage

**Request Validation**
```typescript
import { zValidator } from '@hono/zod-validator'

app.post('/api/todos',
  zValidator('json', createTodoSchema),
  async (c) => {
    const data = c.req.valid('json') // Type-safe, validated
    // Use data
  }
)
```

**Database Result Validation**
```typescript
import { queryValidated } from './db'

const todos = await queryValidated(
  'SELECT * FROM todos',
  [],
  todoListSchema
)
// todos is typed as Todo[]
```

**URL Parameter Validation**
```typescript
const idSchema = z.coerce.number().int().positive()
const id = idSchema.parse(c.req.param('id'))
```

### Frontend Usage

**API Response Validation**
```typescript
async function fetchAPI<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, options)
  const data = await response.json()
  return schema.parse(data) // Validates and returns typed data
}
```

**Form Validation**
```typescript
const formSchema = z.object({
  title: z.string().min(1).max(200),
  completed: z.boolean().optional(),
})

const result = formSchema.safeParse(formData)
if (result.success) {
  // result.data is typed and validated
}
```

### Schema Types

**Primitives**
```typescript
z.string()
z.number()
z.boolean()
z.date()
z.null()
z.undefined()
```

**Constraints**
```typescript
z.string().min(1).max(100)
z.number().int().positive()
z.string().email()
z.string().url()
z.number().min(0).max(100)
```

**Transforms**
```typescript
z.coerce.number() // Convert string to number
z.string().transform(s => s.toLowerCase())
```

**Optional/Default**
```typescript
z.string().optional()
z.boolean().default(false)
```

**Arrays/Objects**
```typescript
z.array(itemSchema)
z.object({ field: z.string() })
```

### Best Practices
- Keep frontend and backend schemas in sync
- Validate all external inputs (API requests, database results)
- Use `.safeParse()` for user input validation
- Use `.parse()` when errors should throw
- Infer types with `z.infer<typeof schema>`

## Radix UI

### Installation
Already installed: `radix-ui` package includes all primitives.

### Usage
Import components directly:

```typescript
import { Checkbox } from 'radix-ui'

<Checkbox.Root
  checked={value}
  onCheckedChange={(checked) => setValue(checked)}
  className="w-5 h-5 border-2"
>
  <Checkbox.Indicator>
    <CheckIcon />
  </Checkbox.Indicator>
</Checkbox.Root>
```

### Available Components
Dialog, AlertDialog, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, NavigationMenu, Menubar, Checkbox, Switch, Select, RadioGroup, Slider, Form, Label, Tabs, Accordion, Collapsible, ScrollArea, Separator, Portal, Slot, VisuallyHidden, AspectRatio, Avatar, Progress, Toast, Toggle, ToggleGroup, Toolbar

### Component Structure
Radix components are compound components with subcomponents:
```typescript
<Component.Root>
  <Component.Trigger />
  <Component.Content>
    <Component.Item />
  </Component.Content>
</Component.Root>
```

### Styling
Radix components are unstyled. Add Tailwind classes:
```typescript
<Dialog.Root>
  <Dialog.Trigger className="bg-brand text-white px-4 py-2">
    Open
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6">
      <Dialog.Title className="text-lg font-bold">Title</Dialog.Title>
      <Dialog.Description className="text-sm">Description</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### State Management
Most Radix components accept controlled or uncontrolled props:
```typescript
// Uncontrolled
<Checkbox.Root defaultChecked={false} />

// Controlled
<Checkbox.Root
  checked={state}
  onCheckedChange={setState}
/>
```

### When to Use Radix
- Accessible UI components required (keyboard navigation, ARIA attributes, focus management)
- Complex interactions (dialogs, dropdowns, tooltips)
- Form controls beyond native HTML (custom checkboxes, switches, select menus)

### When Not to Use Radix
- Simple static layouts
- Native HTML elements are sufficient
- No accessibility requirements

## Project Structure

```
backend/
├── src/
│   ├── migrations/
│   │   ├── 0001_initial.sql
│   │   └── migrate.ts
│   ├── index.ts       # Hono app, routes
│   ├── db.ts          # Database connection, query helpers
│   └── schemas.ts     # Zod schemas, type inference
└── package.json

frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route pages
│   ├── lib/
│   │   ├── api.ts     # API client with validation
│   │   ├── queries.ts # Tanstack Query hooks
│   │   └── router.tsx # Tanstack Router config
│   ├── schemas.ts     # Zod schemas for API responses
│   ├── store.ts       # Zustand store template (commented)
│   ├── theme.css      # Tailwind v4 theme tokens
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
├── dist/              # Pre-built frontend (committed)
├── public/            # Static assets
└── package.json
```

## API Client Pattern

### Backend
```typescript
// schemas.ts
export const resourceSchema = z.object({ id: z.number(), name: z.string() })
export type Resource = z.infer<typeof resourceSchema>

// index.ts
app.get('/api/resources', async (c) => {
  const resources = await queryValidated(
    'SELECT * FROM resources',
    [],
    z.array(resourceSchema)
  )
  return c.json(resources)
})
```

### Frontend
```typescript
// schemas.ts
export const resourceSchema = z.object({ id: z.number(), name: z.string() })
export type Resource = z.infer<typeof resourceSchema>

// api.ts
export async function fetchResources(): Promise<Resource[]> {
  return fetchAPI('/api/resources', z.array(resourceSchema))
}

// queries.ts
export function useResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
  })
}

// Component
const { data } = useResources()
```

## Database Query Pattern

### Raw Query (Avoid)
```typescript
const result = await pool.query('SELECT * FROM todos')
const todos = result.rows // Type: any[]
```

### Validated Query (Use This)
```typescript
const todos = await queryValidated(
  'SELECT id, title, completed, created_at FROM todos',
  [],
  todoListSchema
)
// Type: Todo[]
// Runtime validated
```

### Query Helpers
```typescript
// Multiple rows
queryValidated<T>(sql: string, params: any[], schema: z.ZodSchema<T>): Promise<T[]>

// Single row
queryOneValidated<T>(sql: string, params: any[], schema: z.ZodSchema<T>): Promise<T | null>
```

## Best Practices

### Type Safety
- Define Zod schemas in `schemas.ts`
- Infer types with `z.infer<typeof schema>`
- Never use `any` type
- Validate all external data (requests, database, API responses)

### Database
- Use parameterized queries: `$1, $2, $3`
- Never concatenate SQL strings
- Validate results with `queryValidated()`
- Use transactions for multi-statement operations

### API Design
- Prefix API routes with `/api/`
- Validate request bodies with `zValidator()`
- Return consistent JSON structure
- Use appropriate HTTP status codes (200, 201, 400, 404, 500)

### Frontend State
- Server state: Tanstack Query
- UI state: Zustand (if needed)
- URL state: Tanstack Router
- Form state: React useState

### File Organization
- Components: One component per file
- Route pages: `pages/` directory
- Utilities: `lib/` directory
- Types: Export from `schemas.ts`

### Deployment
- Frontend pre-built in `dist/` directory
- Commit `dist/` to version control
- Backend serves static files from `dist/`
- Single process, single port deployment
- Set `DATABASE_URL` and `PORT` environment variables

### Building Frontend
After source changes:
```bash
cd frontend
bun run build
git add dist/
git commit -m "(feat): update frontend"
```

### Error Handling
- Backend: Use Hono error handlers
- Frontend: Use Tanstack Query error states
- Database: Catch and log errors, return appropriate HTTP status
- Validation: Return 400 with error details

## Startup

### Development
```bash
# Terminal 1: Backend API
cd backend
bun install
bun run migrate
bun run dev

# Terminal 2: Frontend dev server
cd frontend
bun install
bun run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:3000

### Production
```bash
cd backend
bun install
bun run migrate
bun run start
```

Application: http://localhost:3000

## Example: Adding New Feature

### 1. Define Schema
```typescript
// backend/src/schemas.ts
export const itemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
})

export const createItemSchema = z.object({
  name: z.string().min(1).max(100),
})

export type Item = z.infer<typeof itemSchema>
export type CreateItemInput = z.infer<typeof createItemSchema>
```

### 2. Create Migration
```sql
-- backend/src/migrations/0002_add_items.sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Run: `bun run migrate`

### 3. Add Backend Route
```typescript
// backend/src/index.ts
app.get('/api/items', async (c) => {
  const items = await queryValidated(
    'SELECT id, name FROM items',
    [],
    z.array(itemSchema)
  )
  return c.json(items)
})

app.post('/api/items',
  zValidator('json', createItemSchema),
  async (c) => {
    const data = c.req.valid('json')
    const item = await queryOneValidated(
      'INSERT INTO items (name) VALUES ($1) RETURNING id, name',
      [data.name],
      itemSchema
    )
    return c.json(item, 201)
  }
)
```

### 4. Add Frontend Schema
```typescript
// frontend/src/schemas.ts
export const itemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
})

export type Item = z.infer<typeof itemSchema>
```

### 5. Add API Client
```typescript
// frontend/src/lib/api.ts
export async function fetchItems(): Promise<Item[]> {
  return fetchAPI('/api/items', z.array(itemSchema))
}

export async function createItem(data: { name: string }): Promise<Item> {
  return fetchAPI('/api/items', itemSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
```

### 6. Add Query Hooks
```typescript
// frontend/src/lib/queries.ts
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
```

### 7. Use in Component
```typescript
// frontend/src/pages/Items.tsx
export function Items() {
  const { data: items } = useItems()
  const createItem = useCreateItem()

  const handleCreate = (name: string) => {
    createItem.mutate({ name })
  }

  return (
    <div>
      {items?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

### 8. Build and Deploy
```bash
cd frontend
bun run build
git add dist/
git commit -m "(feat): add items feature"
```
