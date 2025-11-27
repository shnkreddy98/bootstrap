# Frontend-Only Mode

This project is configured for **frontend-only development** with mock data. No backend required!

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (instant startup!)
bun start

# Build for production
bun run build

# Preview production build
bun run preview
```

Visit: http://localhost:5173

## How It Works

### Mock Data System
- All API calls use in-memory mock data
- Located in `frontend/src/lib/mockData.ts`
- Simulates network delays for realistic UX testing (200-300ms)
- Data persists during session, resets on refresh

### Features
- ✅ **Instant startup** - No backend to start
- ✅ **Fast iteration** - Changes reflect immediately
- ✅ **Full CRUD** - Create, read, update, delete all work
- ✅ **Realistic delays** - Simulated network latency
- ✅ **Same interface** - Easy to switch to real backend later

## Mock Data

Default mock data includes:
- 4 sample todos
- Demo user (demo@example.com)
- App config

### Customizing Mock Data

Edit `frontend/src/lib/mockData.ts`:

```tsx
let mockTodos: Todo[] = [
  { id: 1, title: 'Your custom todo', completed: false },
  // Add more...
]
```

### Adjusting Network Delay

```tsx
// In mockData.ts
const delay = (ms: number = 300) => // Change this value
```

## Switching to Real Backend

When you're ready to connect to a real API:

1. Open `frontend/src/lib/api.ts`
2. Change `USE_MOCK_DATA` to `false`:
   ```tsx
   const USE_MOCK_DATA = false
   ```
3. Uncomment backend scripts in root `package.json`
4. Start your backend server

## Adding Mock Data for New Features

When implementing new features with the blueprints:

**Example: Adding Posts**

1. Add interface in `frontend/src/schemas.ts`:
```tsx
export interface Post {
  id: number
  title: string
  imageUrl: string
  rating: number
}
```

2. Add mock data in `frontend/src/lib/mockData.ts`:
```tsx
let mockPosts: Post[] = [
  { id: 1, title: 'Cool Outfit', imageUrl: '/demo.jpg', rating: 4.5 },
]

export const mockApi = {
  // ... existing methods

  async fetchPosts(): Promise<Post[]> {
    await delay(200)
    return [...mockPosts]
  },

  async createPost(data: FormData): Promise<Post> {
    await delay(400) // Longer for file uploads
    const newPost: Post = {
      id: nextPostId++,
      title: data.get('title') as string,
      imageUrl: '/demo.jpg', // In real backend, this would be uploaded
      rating: 0,
    }
    mockPosts.push(newPost)
    return newPost
  },
}
```

3. Add API functions in `frontend/src/lib/api.ts`:
```tsx
export async function fetchPosts(): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return mockApi.fetchPosts()
  }
  return fetchAPI('/api/posts', postListSchema)
}
```

4. Use in components - works exactly like real API!

## Development Workflow

### For Pure UI Work
```bash
bun start
# Edit components, see changes instantly
# No backend complexity, just UI
```

### For Testing Data Flow
```bash
# Modify mock data
# Test loading states, errors, empty states
# All without backend
```

### For Production
```bash
bun run build
# Creates optimized dist/ folder
# Same build process as with backend
```

## Tips

1. **Mock realistic data** - Use data that looks like production
2. **Test edge cases** - Add empty arrays, long strings, etc. to mock data
3. **Simulate errors** - Throw errors in mock functions to test error handling
4. **Keep delays realistic** - 200-500ms feels right for most operations

## File Structure

```
frontend/
├── src/
│   ├── lib/
│   │   ├── mockData.ts     ← All mock data and API functions
│   │   ├── api.ts          ← API client (uses mocks when USE_MOCK_DATA = true)
│   │   └── queries.ts      ← React Query hooks (unchanged)
│   └── ...
```

## Benefits of Frontend-Only Mode

- 🚀 **Instant startup** - No waiting for backend
- 🎨 **Focus on UI/UX** - Design and test interfaces rapidly
- 📱 **Mobile testing** - Test responsive designs without backend
- 🔄 **Rapid iteration** - Make changes, see results instantly
- 📦 **Easy sharing** - Send frontend to others, works immediately
- 🧪 **UI testing** - Test components in isolation

## When to Add Real Backend

You might want a real backend when:
- You need actual file storage
- You need real authentication
- You need to share data between users
- You need server-side processing
- You're ready for production

Until then, enjoy blazing-fast frontend development! ⚡
