# Frontend-Only UI Boilerplate

**Blazing-fast frontend development with mock data. No backend required!**

## Stack

- **Runtime**: Bun
- **Framework**: React 19
- **Routing**: TanStack Router
- **Data**: TanStack Query + Mock Data
- **Styling**: Tailwind CSS v4
- **UI Components**: 33 pre-built components (Radix UI)
- **Build**: Vite
- **TypeScript**: Full type safety

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (instant startup!)
bun run dev

# Open browser
http://localhost:5173
```

That's it! No database, no backend, no configuration needed.

## Features

### ✅ 33 Production-Ready UI Components
- **Forms**: Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, SearchBar
- **Buttons**: Button, IconButton, ButtonGroup, FAB
- **Layout**: Card, Container, Stack, Divider
- **Feedback**: Alert, Toast, Modal, Spinner, BottomSheet
- **Navigation**: Tabs, Dropdown, Accordion, AppBar, BottomNav, Drawer
- **Data Display**: Badge, Avatar, Progress, Tooltip, Chip, List

All mobile-first with 44px touch targets and iOS optimization.

### ✅ Mock Data System
- In-memory data store
- Simulated network delays (200-300ms)
- Full CRUD operations
- Persists during session

### ✅ Example Pages
- **Home**: Todo list with search/filter
- **Profile**: User profile page
- **Settings**: Settings form
- **Login/Signup**: Auth pages

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── templates/          # 33 UI components
│   │   ├── pages/              # Example pages
│   │   ├── components/         # App-specific components
│   │   ├── lib/
│   │   │   ├── mockData.ts     # Mock data store
│   │   │   ├── api.ts          # API client (uses mocks)
│   │   │   ├── router.tsx      # Routes
│   │   │   └── queries.ts      # React Query hooks
│   │   └── main.tsx
│   └── package.json
├── IMPLEMENTATION_PROCESS.md   # Full implementation guide
├── FRONTEND_ONLY.md            # Mock data details
└── package.json                # Root scripts
```

## Development

### Start Dev Server
```bash
bun run dev
```
Opens at http://localhost:5173

### Build for Production
```bash
bun run build
```
Output: `frontend/dist/`

### Preview Production Build
```bash
bun run preview
```

### Type Check
```bash
bun run typecheck
```

### Lint
```bash
bun run lint
bun run lint:fix
```

### Test
```bash
bun run test
```

## Adding Features

### 1. Quick Example
Want to add a "Projects" page? Copy from `IMPLEMENTATION_PROCESS.md`:

1. Create `frontend/src/pages/Projects.tsx`
2. Add mock data in `frontend/src/lib/mockData.ts`
3. Add route in `frontend/src/lib/router.tsx`
4. Done!

### 2. Feature Blueprints
See `IMPLEMENTATION_PROCESS.md` for complete blueprints:
- Social Feed (photo sharing)
- Dashboard with Stats
- Form-Heavy Page
- List with Search/Filter
- Detail View
- Multi-Step Flow

### 3. UI Components
Always use the 33 pre-built components:

```tsx
import {
  Button, Input, Card, Modal, List, Badge, Avatar
} from '../templates'
```

See `frontend/src/templates/examples.tsx` for copy-paste examples.

## Mock Data

### Viewing Mock Data
Edit `frontend/src/lib/mockData.ts`:

```tsx
let mockTodos: Todo[] = [
  { id: 1, title: 'Your todo', completed: false },
  // Add more...
]
```

### Adding Mock Data for New Features

```tsx
// In mockData.ts
export const mockApi = {
  async fetchPosts(): Promise<Post[]> {
    await delay(200)
    return [...mockPosts]
  },

  async createPost(data: FormData): Promise<Post> {
    await delay(300)
    // Create and return mock post
  }
}
```

### Adjusting Network Delay
```tsx
// In mockData.ts
const delay = (ms: number = 300) => // Change this
```

## Switching to Real Backend

When ready to connect to a real API:

1. Open `frontend/src/lib/api.ts`
2. Change `USE_MOCK_DATA` to `false`:
   ```tsx
   const USE_MOCK_DATA = false
   ```
3. Set up your backend
4. Update API endpoints

## Documentation

- **`IMPLEMENTATION_PROCESS.md`** - Complete implementation guide for LLMs and developers
- **`FRONTEND_ONLY.md`** - Mock data system details
- **`frontend/src/templates/README.md`** - Component documentation
- **`frontend/src/templates/COMPONENT_LIST.md`** - All 33 components reference
- **`frontend/src/templates/examples.tsx`** - Copy-paste code examples

## Mobile-First Design

All components are optimized for mobile:
- ✅ 44px touch targets (Apple HIG compliant)
- ✅ Responsive text sizing
- ✅ Safe area support (notch/Dynamic Island)
- ✅ Bottom navigation with safe area padding
- ✅ Touch-friendly interactions

## Tech Highlights

- **Bun**: Fast runtime and package manager
- **React 19**: Latest features
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Data fetching and caching
- **Radix UI**: Accessible component primitives
- **Tailwind CSS v4**: Utility-first styling
- **TypeScript**: Full type safety with Zod validation

## Use Cases

Perfect for:
- 🎨 **UI prototyping** - Test designs without backend complexity
- 📱 **Mobile testing** - Responsive design validation
- 🚀 **Rapid iteration** - Change UI, see results instantly
- 🧪 **Component development** - Build and test in isolation
- 📦 **Demos** - Share frontend without setup hassle
- 🎓 **Learning** - Focus on frontend without backend distraction

## Benefits

- ⚡ **Instant startup** - Dev server ready in ~200ms
- 🎨 **33 pre-built components** - No need to build UI from scratch
- 📱 **Mobile-first** - iOS optimized out of the box
- 🔄 **Fast iteration** - Hot reload, instant changes
- 📚 **Well documented** - Implementation guides for LLMs and humans
- 🧪 **Ready to test** - Mock data for all scenarios
- 🚀 **Production ready** - Build and deploy anytime

## Contributing

The template components are designed to be customized:
- Adjust colors in `frontend/src/index.css`
- Modify component variants
- Add new components following the same patterns

## Support

- **Component issues**: Check `frontend/src/templates/README.md`
- **Implementation help**: See `IMPLEMENTATION_PROCESS.md`
- **Mock data**: See `FRONTEND_ONLY.md`

---

**Built for speed. Optimized for LLMs. Ready for production.** 🚀
