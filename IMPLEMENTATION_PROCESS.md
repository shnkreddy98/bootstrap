# Frontend Implementation Process - Quick Reference

> **For LLM Agents**: This is your implementation guide. Follow this to make changes quickly without exploring the codebase.

## How to Use This Guide

1. **For vague requests** → Go to "Feature Blueprints" section below to understand what to build
2. **For implementation** → Use the Quick Implementation Guides and patterns
3. **For reference** → Check the Component Patterns section for copy-paste code

---

## Feature Blueprints

> When given a feature request, use these blueprints to plan what to build.

### Blueprint: Social Feed (Photo/Post Sharing)

**Example Request**: "Create an app where people can post photos and others can rate them"

**What to Build**:

1. **Data Model** (`frontend/src/lib/api.ts`):
```tsx
export interface Post {
  id: number
  userId: number
  userName: string
  userAvatar?: string
  imageUrl: string
  caption?: string
  rating: number          // Average rating
  totalRatings: number    // Count of ratings
  userRating?: number     // Current user's rating (1-5)
  createdAt: string
}

export interface Rating {
  postId: number
  rating: number          // 1-5 stars
}
```

2. **API Endpoints** (`frontend/src/lib/api.ts`):
```tsx
export const postApi = {
  getAll: () => api.get<Post[]>('/posts'),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  create: (data: FormData) => api.post<Post>('/posts', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  rate: (postId: number, rating: number) =>
    api.post<void>(`/posts/${postId}/rate`, { rating }),
  delete: (id: number) => api.delete<void>(`/posts/${id}`),
}
```

3. **React Query Hooks** (`frontend/src/lib/queries.ts`):
```tsx
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApi.getAll,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useRatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, rating }: { postId: number; rating: number }) =>
      postApi.rate(postId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
```

4. **UI Components** (choose from templates):
   - **Feed**: `List` + `ListItem` OR `Card` in grid layout
   - **Post upload**: `BottomSheet` with file input + `Input` for caption
   - **Rating**: Custom component with stars OR `Slider` (1-5)
   - **Empty state**: `ListEmptyState`
   - **Loading**: `Spinner`

5. **Page Structure** (`frontend/src/pages/Feed.tsx`):
```tsx
// Grid of posts with images
// Each post shows: image, user info, caption, rating stars, average score
// Click to rate → opens rating modal/bottom sheet
// FAB or Button to upload new post
```

**File Upload Pattern**:
```tsx
const [selectedFile, setSelectedFile] = useState<File | null>(null)
const [preview, setPreview] = useState<string>('')

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }
}

const handleUpload = () => {
  if (selectedFile) {
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('caption', caption)
    createPost.mutate(formData)
  }
}

// In JSX
<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="hidden"
  id="file-upload"
/>
<label htmlFor="file-upload">
  <Button as="span">Choose Photo</Button>
</label>
{preview && <img src={preview} className="w-full rounded" />}
```

---

### Blueprint: Dashboard with Stats

**Example Request**: "Create a dashboard showing sales metrics and recent orders"

**What to Build**:

1. **Data Model**: Stats object + list of items
2. **API**: `GET /stats`, `GET /recent-orders`
3. **UI Components**:
   - **Stats cards**: `Card` in grid layout (2-4 columns)
   - **Charts**: Use a chart library OR `Progress` bars for simple viz
   - **Recent items**: `List` + `ListItem`
   - **Filters**: `Tabs` or `ChipGroup`
4. **Layout**: `Container` → `Stack` → Cards grid + List

**Reference**: See `frontend/src/templates/examples.tsx` lines 166-219 (DashboardExample)

---

### Blueprint: Form-Heavy Page

**Example Request**: "Create a profile settings page with multiple fields"

**What to Build**:

1. **Data Model**: User profile object
2. **API**: `GET /profile`, `PUT /profile`
3. **UI Components**:
   - **Layout**: `Card` with `CardHeader` + `CardContent` + `CardFooter`
   - **Fields**: `Input`, `Textarea`, `Select`, `Switch`, `Checkbox`, `RadioGroup`
   - **Actions**: `ButtonGroup` with Cancel + Save
   - **Sections**: Multiple `Card` components OR `Divider` with labels
4. **Pattern**: Controlled form with local state → Submit → API call

**Reference**: See `frontend/src/templates/examples.tsx` lines 76-161 (FormExample)

---

### Blueprint: List with Search/Filter

**Example Request**: "Create a page showing all products with search and category filter"

**What to Build**:

1. **Data Model**: Product object
2. **API**: `GET /products` (or client-side filter)
3. **UI Components**:
   - **Search**: `SearchBar`
   - **Filter**: `ChipGroup` or `Select`
   - **List**: `List` + `ListItem` OR `Card` grid
   - **Empty state**: `ListEmptyState`
4. **State**: `searchQuery`, `selectedCategory`, `filteredData`

**Reference**: See `frontend/src/pages/Home.tsx` lines 100-130 (search + filters)

---

### Blueprint: Detail View with Actions

**Example Request**: "Show full product details with buy/add to cart"

**What to Build**:

1. **Data Model**: Detailed product object
2. **API**: `GET /products/:id`, `POST /cart`
3. **UI Components**:
   - **Layout**: `Container` → `Stack` → `Card`
   - **Image**: `<img>` or `Avatar` for profile pics
   - **Info**: Text elements with Tailwind typography
   - **Actions**: `ButtonGroup` or single `Button`
   - **Specs**: `List` with key-value pairs OR `Accordion`
4. **Navigation**: Back button in `AppBar` or manual back `Button`

---

### Blueprint: Multi-Step Flow

**Example Request**: "Create an onboarding flow with 3 steps"

**What to Build**:

1. **State**: Current step (1-3), form data
2. **UI Components**:
   - **Progress**: `Progress` component showing step
   - **Content**: `Card` with step-specific content
   - **Navigation**: `ButtonGroup` with Back/Next
   - **Steps**: `Tabs` OR conditional rendering
3. **Pattern**:
```tsx
const [step, setStep] = useState(1)
const [formData, setFormData] = useState({})

{step === 1 && <Step1Form />}
{step === 2 && <Step2Form />}
{step === 3 && <Step3Form />}

<ButtonGroup>
  <Button onClick={() => setStep(step - 1)} disabled={step === 1}>Back</Button>
  <Button onClick={() => setStep(step + 1)}>
    {step === 3 ? 'Finish' : 'Next'}
  </Button>
</ButtonGroup>
```

---

### Decision Guide: Which Components to Use

**For displaying a list**:
- Simple text items → `List` + `ListItem`
- Rich content (images, badges) → `List` + `ListItem` with `leftContent`/`rightContent`
- Cards with hover → Grid of `Card` components
- Table-like → `List` with custom styling

**For user input**:
- Short text → `Input`
- Long text → `Textarea`
- Selection (dropdown) → `Select`
- Multiple choice → `RadioGroup`
- Yes/no toggle → `Switch`
- Accept terms → `Checkbox`
- Range (1-100) → `Slider`
- Search → `SearchBar`

**For showing info/feedback**:
- Static message → `Alert`
- Temporary message → `Toast`
- Confirmation → `Modal`
- Mobile drawer → `BottomSheet`
- Loading → `Spinner`
- Progress bar → `Progress`

**For navigation**:
- Main sections (3-5) → `BottomNav`
- Secondary tabs → `Tabs`
- Dropdown actions → `Dropdown`
- FAQ/collapsible → `Accordion`
- Side menu → `Drawer`

**For status/tags**:
- Status label → `Badge`
- Tags/filters → `Chip` + `ChipGroup`
- User profile → `Avatar`

---

## Project Structure (Frontend Only)

```
frontend/
├── src/
│   ├── templates/          # 33 pre-built UI components - USE THESE
│   │   ├── buttons/        # Button, IconButton, ButtonGroup, FAB
│   │   ├── forms/          # Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, SearchBar
│   │   ├── layout/         # Card, Container, Stack, Divider
│   │   ├── feedback/       # Alert, Toast, Modal, Spinner, BottomSheet
│   │   ├── navigation/     # Tabs, Dropdown, Accordion, AppBar, BottomNav, Drawer
│   │   ├── data-display/   # Badge, Avatar, Progress, Tooltip, Chip, List
│   │   └── index.ts        # Import all components from here
│   ├── pages/              # Home.tsx, Profile.tsx, Settings.tsx, Login.tsx, Signup.tsx
│   ├── components/         # AppLayout.tsx, TodoForm.tsx, TodoItem.tsx, UserBadge.tsx
│   ├── lib/
│   │   ├── router.tsx      # TanStack Router routes
│   │   ├── api.ts          # API client
│   │   └── queries.ts      # React Query hooks
│   ├── schemas.ts          # Zod schemas
│   └── store.ts            # Zustand store
```

---

## Quick Implementation Guides

### 1. Adding a New Page

**File**: `frontend/src/pages/YourPage.tsx`

**Template**:
```tsx
import { Container, Stack, Card, CardHeader, CardTitle, CardContent } from '../templates'

export function YourPage() {
  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="lg">
        <Card>
          <CardHeader>
            <CardTitle>Your Page Title</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Your content here */}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}
```

**Register Route** in `frontend/src/lib/router.tsx`:
```tsx
// Add import
import { YourPage } from '../pages/YourPage'

// Create route (with AppLayout)
const yourPageRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/your-path',
  component: YourPage,
})

// Add to route tree (line ~72)
const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    profileRoute,
    settingsRoute,
    yourPageRoute,  // ADD THIS
  ]),
  loginRoute,
  signupRoute,
  notFoundRoute,
])
```

---

### 2. Adding UI Components to a Page

**Never create custom UI components**. Always use templates from `frontend/src/templates/`.

**Import Pattern**:
```tsx
import {
  // Layout
  Container, Stack, Card, CardHeader, CardTitle, CardContent, Divider,

  // Forms
  Input, Textarea, Select, Checkbox, Switch, Button,

  // Feedback
  Alert, Spinner, Modal, BottomSheet,

  // Navigation
  Tabs, Dropdown, Accordion,

  // Data Display
  Badge, Avatar, Progress, List, Chip,
} from '../templates'
```

**Example - Form**:
```tsx
<Stack direction="vertical" spacing="lg">
  <Input
    label="Email"
    type="email"
    placeholder="you@example.com"
  />
  <Textarea
    label="Message"
    placeholder="Enter message..."
  />
  <Select
    label="Country"
    options={[
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
    ]}
    onValueChange={(value) => console.log(value)}
  />
  <Button variant="primary" fullWidth>
    Submit
  </Button>
</Stack>
```

**Reference**: See `frontend/src/templates/examples.tsx` for complete copy-paste examples.

---

### 3. Adding API Endpoints

**File**: `frontend/src/lib/api.ts`

**Add endpoint**:
```tsx
// Add interface
export interface YourData {
  id: number
  name: string
}

// Add function
export const yourApi = {
  getAll: () => api.get<YourData[]>('/your-endpoint'),
  getById: (id: number) => api.get<YourData>(`/your-endpoint/${id}`),
  create: (data: Omit<YourData, 'id'>) => api.post<YourData>('/your-endpoint', data),
  update: (id: number, data: Partial<YourData>) => api.put<YourData>(`/your-endpoint/${id}`, data),
  delete: (id: number) => api.delete<void>(`/your-endpoint/${id}`),
}
```

---

### 4. Adding React Query Hooks

**File**: `frontend/src/lib/queries.ts`

**Template**:
```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { yourApi } from './api'

// GET - Fetch list
export function useYourData() {
  return useQuery({
    queryKey: ['yourData'],
    queryFn: yourApi.getAll,
  })
}

// GET - Fetch single
export function useYourDataById(id: number) {
  return useQuery({
    queryKey: ['yourData', id],
    queryFn: () => yourApi.getById(id),
    enabled: !!id,
  })
}

// POST - Create
export function useCreateYourData() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: yourApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yourData'] })
    },
  })
}

// PUT - Update
export function useUpdateYourData() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      yourApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yourData'] })
    },
  })
}

// DELETE
export function useDeleteYourData() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: yourApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yourData'] })
    },
  })
}
```

**Usage in component**:
```tsx
const { data, isLoading, error } = useYourData()
const createMutation = useCreateYourData()

// In handler
createMutation.mutate({ name: 'Test' })
```

---

### 5. Adding Navigation Items

**Bottom Nav** (main tabs) - `frontend/src/components/AppLayout.tsx` (line ~80):
```tsx
<BottomNav>
  <BottomNavItem
    icon={<Home size={20} />}
    label="Home"
    active={location.pathname === '/'}
    onClick={() => navigate({ to: '/' })}
  />
  {/* Add your item here */}
  <BottomNavItem
    icon={<YourIcon size={20} />}
    label="Your Label"
    active={location.pathname === '/your-path'}
    onClick={() => navigate({ to: '/your-path' })}
  />
</BottomNav>
```

---

### 6. Component Patterns Reference

**Loading State**:
```tsx
{isLoading && (
  <div className="flex items-center justify-center py-12">
    <Spinner size="lg" color="brand" />
  </div>
)}
```

**Error State**:
```tsx
{error && (
  <Alert
    variant="error"
    title="Error"
    description={error.message}
  />
)}
```

**Empty State**:
```tsx
<ListEmptyState
  icon={<Search size={48} className="text-fg-3" />}
  title="No results"
  description="Try a different search"
  action={<Button variant="primary">Add New</Button>}
/>
```

**Modal Pattern**:
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
    <ModalBody>
      {/* Content */}
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

**Bottom Sheet Pattern** (mobile-first):
```tsx
const [isOpen, setIsOpen] = useState(false)

<BottomSheet open={isOpen} onOpenChange={setIsOpen}>
  <BottomSheetContent showHandle>
    <BottomSheetHeader>
      <BottomSheetTitle>Title</BottomSheetTitle>
    </BottomSheetHeader>
    <BottomSheetBody>
      {/* Content */}
    </BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>
```

**List Pattern**:
```tsx
<List divided>
  {items.map((item) => (
    <ListItem
      key={item.id}
      title={item.title}
      description={item.description}
      leftContent={<Avatar fallback={item.initials} />}
      rightContent={<Badge variant="success">{item.status}</Badge>}
      showChevron
      interactive
      onClick={() => handleClick(item.id)}
    />
  ))}
</List>
```

---

## Common Modifications

### Add a Form Field to Existing Page
1. Open the page file (e.g., `frontend/src/pages/YourPage.tsx`)
2. Add state: `const [fieldName, setFieldName] = useState('')`
3. Add the input component from templates:
   ```tsx
   <Input
     label="Field Label"
     value={fieldName}
     onChange={(e) => setFieldName(e.target.value)}
   />
   ```

### Add a Modal/Bottom Sheet to Page
1. Import: `import { Modal, ModalTrigger, ModalContent, ... } from '../templates'`
2. Add state: `const [isOpen, setIsOpen] = useState(false)`
3. Copy modal pattern from section 6 above

### Add Search/Filter Functionality
1. Import: `import { SearchBar, Chip, ChipGroup } from '../templates'`
2. Add state: `const [searchQuery, setSearchQuery] = useState('')`
3. Add search bar:
   ```tsx
   <SearchBar
     placeholder="Search..."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     onClear={() => setSearchQuery('')}
   />
   ```
4. Filter data:
   ```tsx
   const filtered = data?.filter(item =>
     item.name.toLowerCase().includes(searchQuery.toLowerCase())
   )
   ```

### Add Stats/Dashboard Cards
Copy from `frontend/src/pages/Home.tsx` lines 82-97 or `frontend/src/templates/examples.tsx` lines 166-219.

---

## Important Rules

1. **NEVER create custom UI components** - always use `frontend/src/templates/`
2. **ALWAYS import from** `'../templates'` or `'@/templates'`
3. **Reference examples**: `frontend/src/templates/examples.tsx` has 7 complete copy-paste examples
4. **Mobile-first**: All components are already mobile-optimized (44px touch targets, responsive)
5. **No testing required**: Components are production-ready
6. **Styling**: Use Tailwind utility classes only - do NOT create custom CSS
7. **Icons**: Use `lucide-react` for icons (already installed)

---

## Quick Reference: All Available Components

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
  Alert, Toast, ToastProvider, Modal, ModalTrigger, ModalContent, ModalHeader,
  ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose,
  Spinner, FullPageSpinner, BottomSheet, BottomSheetTrigger, BottomSheetContent,
  BottomSheetHeader, BottomSheetTitle, BottomSheetBody,

  // Navigation (6)
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel,
  DropdownSeparator, DropdownCheckboxItem, DropdownRadioGroup, DropdownRadioItem,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  AppBar, BottomNav, BottomNavItem, Drawer, DrawerTrigger, DrawerContent,

  // Data Display (6)
  Badge, Avatar, AvatarGroup, Progress,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
  Chip, ChipGroup, List, ListItem, ListSectionHeader, ListEmptyState,
} from '../templates'
```

---

## Example: Complete Feature Implementation

**Task**: Add a "Projects" page with list, search, and add modal

**Step 1**: Create page `frontend/src/pages/Projects.tsx`
```tsx
import { useState } from 'react'
import { useProjects, useCreateProject } from '../lib/queries'
import {
  Container, Stack, Card, Button, SearchBar, List, ListItem,
  ListEmptyState, Modal, ModalTrigger, ModalContent, ModalHeader,
  ModalTitle, ModalBody, ModalFooter, Input, Spinner, Alert, Badge,
} from '../templates'
import { Plus, Folder } from 'lucide-react'

export function Projects() {
  const { data: projects, isLoading, error } = useProjects()
  const createProject = useCreateProject()

  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreate = () => {
    if (newProjectName.trim()) {
      createProject.mutate({ name: newProjectName.trim() })
      setNewProjectName('')
      setIsModalOpen(false)
    }
  }

  const filtered = projects?.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="none">
        <Card variant="default" padding="md">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-mono text-fg-0">Projects</h1>
            <Badge variant="primary">{projects?.length || 0}</Badge>
          </div>
        </Card>

        <div className="p-4">
          <SearchBar
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            fullWidth
          />
        </div>

        {error && (
          <div className="px-4">
            <Alert variant="error" title="Error" description={error.message} />
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" color="brand" />
          </div>
        )}

        {!isLoading && filtered && (
          <>
            {filtered.length === 0 ? (
              <ListEmptyState
                icon={<Folder size={48} className="text-fg-3" />}
                title="No projects"
                description="Create your first project to get started"
                action={
                  <Button
                    variant="primary"
                    leftIcon={<Plus size={18} />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    New Project
                  </Button>
                }
              />
            ) : (
              <List divided>
                {filtered.map((project) => (
                  <ListItem
                    key={project.id}
                    title={project.name}
                    description={`Created ${new Date(project.createdAt).toLocaleDateString()}`}
                    leftContent={<Folder size={24} className="text-brand" />}
                    showChevron
                    interactive
                  />
                ))}
              </List>
            )}
          </>
        )}
      </Stack>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalTrigger asChild>
          <Button
            variant="primary"
            className="fixed bottom-20 right-4"
            leftIcon={<Plus size={18} />}
          >
            New Project
          </Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Create Project</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Project Name"
              placeholder="Enter project name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreate}
              disabled={!newProjectName.trim()}
              loading={createProject.isPending}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}
```

**Step 2**: Add API in `frontend/src/lib/api.ts`
```tsx
export interface Project {
  id: number
  name: string
  createdAt: string
}

export const projectApi = {
  getAll: () => api.get<Project[]>('/projects'),
  create: (data: Omit<Project, 'id' | 'createdAt'>) =>
    api.post<Project>('/projects', data),
}
```

**Step 3**: Add hooks in `frontend/src/lib/queries.ts`
```tsx
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectApi.getAll,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: projectApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
```

**Step 4**: Add route in `frontend/src/lib/router.tsx`
```tsx
import { Projects } from '../pages/Projects'

const projectsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/projects',
  component: Projects,
})

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    profileRoute,
    settingsRoute,
    projectsRoute,
  ]),
  loginRoute,
  signupRoute,
  notFoundRoute,
])
```

**Done!** Feature complete in 4 files.

---

## For More Details

- **Component Examples**: `frontend/src/templates/examples.tsx` (7 complete examples)
- **Component List**: `frontend/src/templates/COMPONENT_LIST.md` (all 33 components)
- **Component Docs**: `frontend/src/templates/README.md` (usage guide)
- **Live Example**: `frontend/src/pages/Home.tsx` (production page)
