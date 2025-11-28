# Agent Guide - The Only File You Need

> **For LLM Agents**: This is your complete reference. Everything you need to build features is here.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [System Overview](#system-overview)
3. [Page Library (20+ Pages)](#page-library)
4. [Component Library (33 Components)](#component-library)
5. [Adding New Pages](#adding-new-pages)
6. [Mock Data System](#mock-data-system)
7. [Feature Blueprints](#feature-blueprints)
8. [Component Patterns](#component-patterns)
9. [File Locations](#file-locations)

---

## Quick Start

```bash
# Start dev server
bun start

# Visit pages
http://localhost:5173/           # Home
http://localhost:5173/feed       # Feed
http://localhost:5173/products   # Products
http://localhost:5173/dashboard  # Dashboard
http://localhost:5173/contact    # Contact
```

---

## System Overview

### ⚠️ Backend Implementation Note

**IMPORTANT**: This repository contains a `backend/` directory with a full backend implementation. **DO NOT USE IT.**

- The backend exists for reference purposes only
- All features should be built using the mock data system
- Never connect the frontend to the backend
- Never reference backend code in frontend implementations
- When `bun start` runs, both backend and frontend start, but they are not connected

**Always use the mock data system** (`frontend/src/lib/mockData.ts`) for all data needs.

---

### What You Have

- ✅ **33 UI Components** - All mobile-optimized, production-ready
- ✅ **20+ Page Templates** - Copy-paste ready pages
- ✅ **9 Active Pages** - Working examples
- ✅ **Mock Data System** - No backend needed
- ✅ **Instant Startup** - ~200ms dev server

### How It Works

1. **Browse** page templates below
2. **Copy** page from `frontend/src/page-templates/` to `frontend/src/pages/`
3. **Add route** in `frontend/src/lib/router.tsx`
4. **Add mock data** in `frontend/src/lib/mockData.ts` (if needed)
5. **Done!** Page works immediately

### Tech Stack

- **React 19** - Latest React
- **TypeScript** - Full type safety
- **Vite** - Fast build tool
- **Bun** - Fast runtime
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching
- **Radix UI** - Accessible components
- **Tailwind CSS v4** - Utility-first styling

---

## Page Library

### 📁 Available Page Templates

All templates in `frontend/src/page-templates/`:

#### 🔐 Auth Pages (5)
| Page | File | Route | Description |
|------|------|-------|-------------|
| Login | `auth/LoginPage.tsx` | `/login` | Email/password login ✅ ACTIVE |
| Signup | `auth/SignupPage.tsx` | `/signup` | Create account ✅ ACTIVE |
| Forgot Password | `auth/ForgotPasswordPage.tsx` | `/forgot-password` | Request password reset |
| Reset Password | `auth/ResetPasswordPage.tsx` | `/reset-password` | Set new password |
| Verify Email | `auth/VerifyEmailPage.tsx` | `/verify-email` | Email confirmation |

#### 👤 User Pages (4)
| Page | File | Route | Description |
|------|------|-------|-------------|
| Profile | `user/ProfilePage.tsx` | `/profile` | User profile ✅ ACTIVE |
| Edit Profile | `user/EditProfilePage.tsx` | `/profile/edit` | Edit profile form |
| Settings | `user/SettingsPage.tsx` | `/settings` | Account settings ✅ ACTIVE |
| Notifications | `user/NotificationsPage.tsx` | `/notifications` | Notification center |

#### 📱 Content Pages (6)
| Page | File | Route | Description |
|------|------|-------|-------------|
| Feed | `content/FeedPage.tsx` | `/feed` | Social feed ✅ ACTIVE |
| Post Detail | `content/PostDetailPage.tsx` | `/post/:id` | Single post view |
| Public Profile | `content/PublicProfilePage.tsx` | `/user/:id` | View other users |
| Search | `content/SearchPage.tsx` | `/search` | Search results |
| Explore | `content/ExplorePage.tsx` | `/explore` | Discover content |
| Bookmarks | `content/BookmarksPage.tsx` | `/bookmarks` | Saved items |

#### 🛒 E-commerce Pages (5)
| Page | File | Route | Description |
|------|------|-------|-------------|
| Products | `ecommerce/ProductsPage.tsx` | `/products` | Product grid ✅ ACTIVE |
| Product Detail | `ecommerce/ProductDetailPage.tsx` | `/product/:id` | Single product |
| Cart | `ecommerce/CartPage.tsx` | `/cart` | Shopping cart |
| Checkout | `ecommerce/CheckoutPage.tsx` | `/checkout` | Multi-step checkout |
| Orders | `ecommerce/OrdersPage.tsx` | `/orders` | Order history |

#### 📊 Dashboard Pages (3)
| Page | File | Route | Description |
|------|------|-------|-------------|
| Dashboard | `dashboard/DashboardPage.tsx` | `/dashboard` | Stats dashboard ✅ ACTIVE |
| Analytics | `dashboard/AnalyticsPage.tsx` | `/analytics` | Detailed analytics |
| Users Admin | `dashboard/UsersAdminPage.tsx` | `/admin/users` | User management |

#### 📄 Utility Pages (8)
| Page | File | Route | Description |
|------|------|-------|-------------|
| 404 Not Found | `utility/NotFoundPage.tsx` | `*` | 404 error ✅ ACTIVE |
| 500 Error | `utility/ErrorPage.tsx` | `/error` | Server error |
| Maintenance | `utility/MaintenancePage.tsx` | `/maintenance` | Under maintenance |
| Coming Soon | `utility/ComingSoonPage.tsx` | `/coming-soon` | Launch countdown |
| About | `utility/AboutPage.tsx` | `/about` | About us |
| Contact | `utility/ContactPage.tsx` | `/contact` | Contact form ✅ ACTIVE |
| FAQ | `utility/FAQPage.tsx` | `/faq` | FAQ accordion |
| Terms | `utility/TermsPage.tsx` | `/terms` | Terms of service |

---

## Component Library

### All 33 Components

**Import from**: `frontend/src/templates/`

```tsx
import {
  // Forms (8)
  Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, SearchBar,

  // Buttons (4)
  Button, IconButton, ButtonGroup, FAB,

  // Layout (4)
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Container, Stack, Divider,

  // Feedback (5)
  Alert, Toast, ToastProvider, Modal, ModalTrigger, ModalContent,
  ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose,
  Spinner, FullPageSpinner, BottomSheet, BottomSheetContent,
  BottomSheetHeader, BottomSheetTitle, BottomSheetBody,

  // Navigation (6)
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  AppBar, BottomNav, BottomNavItem, Drawer,

  // Data Display (6)
  Badge, Avatar, AvatarGroup, Progress,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
  Chip, ChipGroup, List, ListItem, ListEmptyState,
} from '../templates'
```

### Component Categories

#### Forms (8)
- **Input** - Text input with validation
- **Textarea** - Multi-line text
- **Select** - Dropdown selection
- **Checkbox** - Single checkbox
- **RadioGroup** - Multiple choice
- **Switch** - iOS toggle
- **Slider** - Range input
- **SearchBar** - Search with clear

#### Buttons (4)
- **Button** - Primary action
- **IconButton** - Icon only
- **ButtonGroup** - Group buttons
- **FAB** - Floating action button

#### Layout (4)
- **Card** - Content container
- **Container** - Max-width wrapper
- **Stack** - Spacing helper
- **Divider** - Visual separator

#### Feedback (5)
- **Alert** - Static notification
- **Toast** - Auto-dismiss message
- **Modal** - Dialog overlay
- **Spinner** - Loading indicator
- **BottomSheet** - Mobile drawer

#### Navigation (6)
- **Tabs** - Tab navigation
- **Dropdown** - Dropdown menu
- **Accordion** - Collapsible sections
- **AppBar** - Top navigation
- **BottomNav** - Bottom tab bar
- **Drawer** - Side navigation

#### Data Display (6)
- **Badge** - Status indicator
- **Avatar** - User profile image
- **Progress** - Progress bar
- **Tooltip** - Contextual info
- **Chip** - Tag/pill
- **List** - Scrollable list

---

## Adding New Pages

### Step-by-Step Process

#### 1. Copy Page Template

```bash
# Example: Add a blog post detail page
cp frontend/src/page-templates/content/PostDetailPage.tsx \
   frontend/src/pages/PostDetail.tsx
```

#### 2. Add Import in Router

```tsx
// frontend/src/lib/router.tsx
import { PostDetail } from '../pages/PostDetail'
```

#### 3. Create Route

```tsx
// frontend/src/lib/router.tsx
const postDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/post/:id',
  component: PostDetail,
})
```

#### 4. Add to Route Tree

```tsx
// frontend/src/lib/router.tsx
const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    profileRoute,
    settingsRoute,
    postDetailRoute,  // ADD THIS
    // ... other routes
  ]),
  loginRoute,
  signupRoute,
  notFoundRoute,
])
```

#### 5. Add Mock Data (if needed)

```tsx
// frontend/src/lib/mockData.ts

// Add data
const mockPostDetails = [
  { id: 1, title: 'Post Title', content: 'Content...', comments: [] },
]

// Add API function
export const mockApi = {
  // ... existing functions
  async fetchPostDetail(id: number) {
    await delay(200)
    return mockPostDetails.find(p => p.id === id)
  },
}
```

#### 6. Add API Function

```tsx
// frontend/src/lib/api.ts
export async function fetchPostDetail(id: number) {
  if (USE_MOCK_DATA) {
    return mockApi.fetchPostDetail(id)
  }
  throw new Error('Backend not implemented')
}

// frontend/src/lib/queries.ts
export function usePostDetail(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostDetail(id),
  })
}
```

#### 7. Done!

Navigate to `/post/1` → Page works!

---

## Mock Data System

### How It Works

All data is stored in `frontend/src/lib/mockData.ts`:
- In-memory storage
- Persists during session
- Resets on page refresh
- Simulates 200-300ms network delays

### Available Mock Data

```typescript
✅ mockTodos        - 4 todo items
✅ mockPosts        - 3 social posts
✅ mockProducts     - 8 products (4 categories)
✅ mockStats        - Dashboard statistics
✅ mockActivity     - Recent activity feed
✅ mockUser         - Demo user account
✅ mockConfig       - App configuration
```

### Adding New Mock Data

```typescript
// 1. Define data type
interface Product {
  id: number
  name: string
  price: number
}

// 2. Create mock data
let mockProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99 },
  { id: 2, name: 'Product 2', price: 39.99 },
]

// 3. Add API function
export const mockApi = {
  async fetchProducts(): Promise<Product[]> {
    await delay(200)
    return [...mockProducts]
  },

  async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    await delay(300)
    const newProduct = { id: nextId++, ...data }
    mockProducts.push(newProduct)
    return newProduct
  },
}
```

### Switching to Real Backend

```tsx
// frontend/src/lib/api.ts
const USE_MOCK_DATA = false  // Change to false

// Now all API calls will use real backend
// Make sure to implement backend endpoints!
```

---

## Feature Blueprints

### Common App Patterns

#### 1. Social Feed App

**Pages**: Feed, Post Detail, Profile, Notifications

**Mock Data**:
```tsx
let mockPosts = [
  { id: 1, content: 'Post text', likes: 24, comments: 5 },
]
```

**API Functions**:
```tsx
fetchPosts(), createPost(), likePost(), addComment()
```

#### 2. E-commerce Store

**Pages**: Products, Product Detail, Cart, Checkout

**Mock Data**:
```tsx
let mockProducts = [
  { id: 1, name: 'Product', price: 29.99, stock: 50 },
]
let mockCart = []
```

**API Functions**:
```tsx
fetchProducts(), addToCart(), checkout(), fetchOrders()
```

#### 3. Dashboard App

**Pages**: Dashboard, Analytics, Settings

**Mock Data**:
```tsx
let mockStats = {
  revenue: 125450,
  users: 1234,
  orders: 456,
}
```

**API Functions**:
```tsx
fetchStats(), fetchAnalytics(), updateSettings()
```

#### 4. Blog Platform

**Pages**: Feed, Post Detail, Profile

**Mock Data**:
```tsx
let mockPosts = [
  { id: 1, title: 'Post', content: 'Content', author: 'User' },
]
```

**API Functions**:
```tsx
fetchPosts(), fetchPost(), createPost(), updatePost()
```

---

## Component Patterns

### Common UI Patterns (Copy-Paste Ready)

#### Loading State
```tsx
{isLoading && (
  <div className="flex items-center justify-center py-12">
    <Spinner size="lg" color="brand" />
  </div>
)}
```

#### Error State
```tsx
{error && (
  <Alert
    variant="error"
    title="Error"
    description={error.message}
  />
)}
```

#### Empty State
```tsx
<ListEmptyState
  icon={<Search size={48} className="text-fg-3" />}
  title="No results"
  description="Try a different search"
  action={<Button>Clear filters</Button>}
/>
```

#### Modal Pattern
```tsx
const [isOpen, setIsOpen] = useState(false)

<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger asChild>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
    </ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

#### Bottom Sheet Pattern (Mobile)
```tsx
const [isOpen, setIsOpen] = useState(false)

<BottomSheet open={isOpen} onOpenChange={setIsOpen}>
  <BottomSheetContent showHandle>
    <BottomSheetHeader>
      <BottomSheetTitle>Title</BottomSheetTitle>
    </BottomSheetHeader>
    <BottomSheetBody>
      <Input label="Field" />
      <Button fullWidth onClick={handleSubmit}>Submit</Button>
    </BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>
```

#### List Pattern
```tsx
<List divided>
  {items.map((item) => (
    <ListItem
      key={item.id}
      title={item.title}
      description={item.description}
      leftContent={<Avatar fallback={item.initials} />}
      rightContent={<Badge>{item.status}</Badge>}
      showChevron
      interactive
      onClick={() => handleClick(item.id)}
    />
  ))}
</List>
```

#### Form Pattern
```tsx
<Stack direction="vertical" spacing="lg">
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <Textarea
    label="Message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <Button
    variant="primary"
    fullWidth
    onClick={handleSubmit}
    disabled={!email || !message}
  >
    Submit
  </Button>
</Stack>
```

#### Search & Filter Pattern
```tsx
const [query, setQuery] = useState('')
const [filter, setFilter] = useState('all')

<Stack direction="vertical" spacing="md">
  <SearchBar
    placeholder="Search..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onClear={() => setQuery('')}
  />

  <ChipGroup>
    <Chip
      label="All"
      variant={filter === 'all' ? 'primary' : 'default'}
      onClick={() => setFilter('all')}
      clickable
    />
    <Chip
      label="Active"
      variant={filter === 'active' ? 'primary' : 'default'}
      onClick={() => setFilter('active')}
      clickable
    />
  </ChipGroup>
</Stack>

{filtered.map(item => ...)}
```

---

## File Locations

### Quick Reference

```
frontend/src/
├── page-templates/              # Copy pages FROM here
│   ├── auth/                   # Auth pages
│   ├── content/                # Content pages
│   ├── dashboard/              # Dashboard pages
│   ├── ecommerce/              # E-commerce pages
│   ├── user/                   # User pages
│   └── utility/                # Utility pages
│
├── pages/                       # Copy pages TO here (active)
│   ├── Feed.tsx                # ✅ Active
│   ├── Products.tsx            # ✅ Active
│   ├── Dashboard.tsx           # ✅ Active
│   └── ...                     # Add more here
│
├── templates/                   # 33 UI components
│   ├── buttons/
│   ├── forms/
│   ├── layout/
│   ├── feedback/
│   ├── navigation/
│   ├── data-display/
│   └── index.ts                # Import all from here
│
├── lib/
│   ├── mockData.ts             # All mock data + API functions
│   ├── api.ts                  # API client (uses mocks)
│   ├── queries.ts              # React Query hooks
│   └── router.tsx              # All routes
│
└── components/                  # App-specific components
    ├── AppLayout.tsx
    ├── TodoItem.tsx
    └── ...
```

### Key Files to Modify

| File | When to Modify | What to Add |
|------|---------------|-------------|
| `page-templates/` | Never | Templates are read-only |
| `pages/` | Always | Copy pages here |
| `lib/router.tsx` | Add route | Import, create route, add to tree |
| `lib/mockData.ts` | Add data | Mock data + API functions |
| `lib/api.ts` | Add endpoint | API functions |
| `lib/queries.ts` | Add hook | React Query hooks |

---

## Common Tasks

### Task: Add a Social Feed

1. Copy page: `cp frontend/src/page-templates/content/FeedPage.tsx frontend/src/pages/Feed.tsx`
2. Add route (already done ✅)
3. Mock data already exists ✅
4. Navigate to `/feed` → Works!

### Task: Add E-commerce

1. Copy page: `cp frontend/src/page-templates/ecommerce/ProductsPage.tsx frontend/src/pages/Shop.tsx`
2. Add route (already done ✅)
3. Mock data already exists ✅
4. Navigate to `/products` → Works!

### Task: Add Dashboard

1. Copy page: `cp frontend/src/page-templates/dashboard/DashboardPage.tsx frontend/src/pages/Admin.tsx`
2. Add route (already done ✅)
3. Mock data already exists ✅
4. Navigate to `/dashboard` → Works!

### Task: Add Custom Page

1. Copy closest template
2. Modify content
3. Add route
4. Add mock data if needed
5. Done!

---

## Decision Guide

### Which Component to Use?

**For displaying lists**:
- Simple text → `List` + `ListItem`
- Rich content → `List` + `ListItem` with `leftContent`/`rightContent`
- Cards → Grid of `Card`

**For user input**:
- Short text → `Input`
- Long text → `Textarea`
- Selection → `Select`
- Multiple choice → `RadioGroup`
- Yes/no → `Switch`
- Accept terms → `Checkbox`
- Range → `Slider`
- Search → `SearchBar`

**For feedback**:
- Static message → `Alert`
- Temporary → `Toast`
- Confirmation → `Modal`
- Mobile drawer → `BottomSheet`
- Loading → `Spinner`
- Progress → `Progress`

**For navigation**:
- Main sections → `BottomNav`
- Secondary tabs → `Tabs`
- Actions menu → `Dropdown`
- Collapsible → `Accordion`

**For status/tags**:
- Status → `Badge`
- Tags → `Chip` + `ChipGroup`
- User → `Avatar`

---

## Important Rules

1. **ALWAYS use template components** - Never create custom UI
2. **ALWAYS import from** `'../templates'`
3. **Copy pages, don't modify templates** - Templates are source of truth
4. **Add routes after copying pages**
5. **Add mock data for new features**
6. **Use existing patterns** - See Component Patterns above
7. **Mobile-first** - All components already optimized
8. **Test immediately** - Just navigate to page after adding

---

## Quick Command Reference

```bash
# Start dev server
bun start

# Build for production
bun run build

# Run tests
bun run test

# Type check
bun run typecheck

# Lint
bun run lint
```

---

## Summary

**You have everything to build any app:**

- ✅ 33 mobile-optimized components
- ✅ 20+ production-ready page templates
- ✅ Complete mock data system
- ✅ 9 working examples
- ✅ Copy-paste patterns
- ✅ Instant startup (~200ms)

**Just copy pages and build!** 🚀

---

## Example: Complete User Request

**User**: "Create an app where people can post photos and others can rate them"

**You do**:
1. Use `FeedPage.tsx` template (already active ✅)
2. Copy `PostDetailPage.tsx` for post details
3. Add route for post detail
4. Add mock data:
   ```tsx
   let mockPosts = [
     { id: 1, imageUrl: '/img.jpg', rating: 4.5, ratings: 42 }
   ]
   ```
5. Done! Working photo rating app in < 5 minutes

**That's the power of this system!**
