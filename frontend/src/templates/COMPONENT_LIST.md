# Complete Component Library

> **For Developers & AI Assistants**: This file contains the complete reference for all 33 UI components. Always import and use these components instead of creating custom UI elements.

## 📊 Overview

**Total Components: 33** (Production-Ready, Mobile-First, iOS-Optimized)
- Forms: 8 components
- Buttons: 4 components
- Layout: 4 components
- Feedback: 5 components
- Navigation: 6 components
- Data Display: 6 components

---

## 📝 Forms (8)

### 1. **Input** (`forms/Input.tsx`)
Text input with validation states
```tsx
<Input label="Email" type="email" error="Invalid email" />
```
- Variants: default, error, success
- Sizes: sm, md, lg
- Features: label, error message, helper text

### 2. **Textarea** (`forms/Textarea.tsx`)
Multi-line text input
```tsx
<Textarea label="Message" placeholder="Enter message..." />
```
- Variants: default, error, success
- Sizes: sm (80px), md (100px), lg (120px)
- Features: auto-resize, character counter support

### 3. **Select** (`forms/Select.tsx`)
Dropdown selection (Radix UI)
```tsx
<Select
  label="Country"
  options={[{ value: 'us', label: 'United States' }]}
  onValueChange={(value) => console.log(value)}
/>
```
- Features: search, keyboard navigation, accessibility

### 4. **Checkbox** (`forms/Checkbox.tsx`)
Single checkbox (Radix UI)
```tsx
<Checkbox label="Accept terms" description="I agree..." />
```
- Features: indeterminate state, label, description

### 5. **RadioGroup** (`forms/RadioGroup.tsx`)
Multiple choice selection (Radix UI)
```tsx
<RadioGroup
  options={[
    { value: 'free', label: 'Free', description: '$0/month' }
  ]}
/>
```
- Orientation: vertical, horizontal
- Features: description per option, disabled state

### 6. **Switch** (`forms/Switch.tsx`)
iOS-style toggle (Radix UI)
```tsx
<Switch label="Notifications" checked={enabled} />
```
- Features: iOS-style animation, label, description

### 7. **Slider** (`forms/Slider.tsx`)
Range input (Radix UI)
```tsx
<Slider
  label="Volume"
  min={0}
  max={100}
  value={[50]}
  showValue
/>
```
- Features: custom formatting, label, touch-friendly

### 8. **SearchBar** (`forms/SearchBar.tsx`)
Search input with clear button
```tsx
<SearchBar placeholder="Search..." loading={isSearching} />
```
- Features: clear button, loading state, icon

---

## 🔘 Buttons (4)

### 1. **Button** (`buttons/Button.tsx`)
Primary action button
```tsx
<Button variant="primary" leftIcon={<Plus />}>
  Add Item
</Button>
```
- Variants: primary, secondary, outline, ghost, danger, success
- Sizes: sm, md (44px), lg
- Features: loading state, left/right icons, full width

### 2. **IconButton** (`buttons/IconButton.tsx`)
Square button for icons only
```tsx
<IconButton icon={<X />} aria-label="Close" />
```
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md (44px), lg
- **Required**: aria-label for accessibility

### 3. **ButtonGroup** (`buttons/ButtonGroup.tsx`)
Group buttons with spacing
```tsx
<ButtonGroup orientation="horizontal">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>
```
- Orientation: horizontal, vertical
- Features: responsive layout, full width option

### 4. **FAB** (Floating Action Button) (`buttons/FAB.tsx`)
Floating circular button
```tsx
<FAB icon={<Plus />} label="Add" position="bottom-right" />
```
- Variants: primary, secondary
- Positions: bottom-right, bottom-center, bottom-left
- Features: extended (with label), safe area aware

---

## 📦 Layout (4)

### 1. **Card** (`layout/Card.tsx`)
Content container with sections
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```
- Variants: default, elevated, outlined
- Padding: none, sm, md, lg
- Features: interactive (hover), composable sections

### 2. **Container** (`layout/Container.tsx`)
Centered max-width wrapper
```tsx
<Container size="md" padding="md">
  <h1>Content</h1>
</Container>
```
- Sizes: sm (768px), md (1024px), lg (1280px), xl (1536px), full
- Padding: none, sm, md, lg

### 3. **Stack** (`layout/Stack.tsx`)
Spacing helper for children
```tsx
<Stack direction="vertical" spacing="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```
- Direction: vertical, horizontal
- Spacing: xs, sm, md, lg, xl
- Align: start, center, end, stretch
- Justify: start, center, end, between, around

### 4. **Divider** (`layout/Divider.tsx`)
Visual separator
```tsx
<Divider spacing="md" />
<Divider label="OR" spacing="lg" />
```
- Orientation: horizontal, vertical
- Spacing: none, sm, md, lg
- Features: optional label

---

## 💬 Feedback (5)

### 1. **Alert** (`feedback/Alert.tsx`)
Static notification
```tsx
<Alert
  variant="success"
  title="Success!"
  description="Changes saved"
  onClose={() => {}}
/>
```
- Variants: info, success, warning, error
- Features: title, description, closeable, custom icon

### 2. **Toast** (`feedback/Toast.tsx`)
Auto-dismiss notification (Radix UI)
```tsx
<ToastProvider>
  <Toast
    variant="success"
    title="Saved"
    description="Your changes were saved"
    open={show}
    onOpenChange={setShow}
  />
</ToastProvider>
```
- Variants: default, info, success, warning, error
- Features: auto-dismiss, swipe to dismiss, duration

### 3. **Modal** (`feedback/Modal.tsx`)
Dialog overlay (Radix UI)
```tsx
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger><Button>Open</Button></ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
    </ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button>Action</Button>
    </ModalFooter>
    <ModalClose />
  </ModalContent>
</Modal>
```
- Features: backdrop blur, close button, escape key, animations
- Options: fullScreenOnMobile

### 4. **Spinner** (`feedback/Spinner.tsx`)
Loading indicator
```tsx
<Spinner size="lg" color="brand" />
<FullPageSpinner />
```
- Sizes: sm, md, lg, xl
- Colors: default, brand, white

### 5. **BottomSheet** (`feedback/BottomSheet.tsx`)
Sheet slides up from bottom (Radix UI)
```tsx
<BottomSheet open={isOpen} onOpenChange={setIsOpen}>
  <BottomSheetTrigger><Button>Open</Button></BottomSheetTrigger>
  <BottomSheetContent showHandle>
    <BottomSheetHeader>
      <BottomSheetTitle>Title</BottomSheetTitle>
    </BottomSheetHeader>
    <BottomSheetBody>Content</BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>
```
- Features: drag handle, safe area aware, max height 90vh

---

## 🧭 Navigation (6)

### 1. **AppBar** (Top Navigation) (`navigation/AppBar.tsx`)
Top app bar with title and actions
```tsx
<AppBar
  title="Page Title"
  leftAction="back"
  onLeftActionClick={() => navigate(-1)}
  rightActions={<IconButton icon={<Settings />} />}
/>
```
- Left actions: back, menu, custom
- Features: sticky, transparent, subtitle

### 2. **BottomNav** (Tab Bar) (`navigation/BottomNav.tsx`)
Bottom navigation for main sections
```tsx
<BottomNav>
  <BottomNavItem icon={<Home />} label="Home" active />
  <BottomNavItem icon={<Search />} label="Search" badge={3} />
  <BottomNavItem icon={<User />} label="Profile" />
</BottomNav>
```
- Features: 3-5 items recommended, badges, safe area aware
- Active state styling

### 3. **Drawer** (Side Navigation) (`navigation/Drawer.tsx`)
Sliding drawer from left/right (Radix UI)
```tsx
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerTrigger><Button>Menu</Button></DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>Content</DrawerBody>
  </DrawerContent>
</Drawer>
```
- Sides: left, right
- Features: backdrop, close button, safe area aware

### 4. **Tabs** (`navigation/Tabs.tsx`)
Content organization (Radix UI)
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```
- Features: keyboard navigation, scrollable list

### 5. **Dropdown** (Menu) (`navigation/Dropdown.tsx`)
Dropdown menu (Radix UI)
```tsx
<Dropdown>
  <DropdownTrigger><Button>Menu</Button></DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownItem>Profile</DropdownItem>
    <DropdownSeparator />
    <DropdownCheckboxItem checked>Show Details</DropdownCheckboxItem>
    <DropdownRadioGroup>
      <DropdownRadioItem value="1">Option 1</DropdownRadioItem>
    </DropdownRadioGroup>
  </DropdownContent>
</Dropdown>
```
- Features: submenus, checkboxes, radio groups, separators

### 6. **Accordion** (`navigation/Accordion.tsx`)
Collapsible sections (Radix UI)
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```
- Types: single, multiple
- Features: animated expand/collapse, chevron rotation

---

## 📊 Data Display (6)

### 1. **Badge** (`data-display/Badge.tsx`)
Status indicator
```tsx
<Badge variant="success">Active</Badge>
```
- Variants: default, primary, success, warning, error, info, outline
- Sizes: sm, md, lg

### 2. **Avatar** (`data-display/Avatar.tsx`)
User profile image (Radix UI)
```tsx
<Avatar src="/user.jpg" alt="John" fallback="JD" size="md" />
<AvatarGroup max={3}>
  <Avatar fallback="A" />
  <Avatar fallback="B" />
  <Avatar fallback="C" />
  <Avatar fallback="D" />
</AvatarGroup>
```
- Sizes: sm, md, lg, xl
- Features: fallback text, image loading delay, group display

### 3. **Progress** (`data-display/Progress.tsx`)
Progress bar (Radix UI)
```tsx
<Progress value={75} showValue label="Upload progress" />
```
- Sizes: sm, md, lg
- Features: animated, label, value display

### 4. **Tooltip** (`data-display/Tooltip.tsx`)
Contextual info (Radix UI)
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Helpful info</TooltipContent>
  </Tooltip>
</TooltipProvider>
```
- Features: auto-positioning, delay, touch support

### 5. **Chip** (Tag/Pill) (`data-display/Chip.tsx`)
Compact element for tags/filters
```tsx
<Chip label="React" variant="primary" onRemove={() => {}} />
<ChipGroup>
  <Chip label="Tag 1" />
  <Chip label="Tag 2" />
</ChipGroup>
```
- Variants: default, primary, success, warning, error, outlined
- Sizes: sm, md, lg
- Features: removable, clickable, icon support

### 6. **List** (`data-display/List.tsx`)
Scrollable list view
```tsx
<List divided>
  <ListItem
    leftContent={<Avatar fallback="J" />}
    title="John Doe"
    description="Software Engineer"
    rightContent={<Badge>New</Badge>}
    showChevron
    interactive
    onClick={() => {}}
  />
  <ListSectionHeader>Section 2</ListSectionHeader>
  <ListItem title="Item 2" />
</List>

<ListEmptyState
  icon={<Search size={48} />}
  title="No results"
  description="Try a different search"
  action={<Button>Clear filters</Button>}
/>
```
- Features: divided, interactive, sections, empty state
- ListItem: left/right content, title, description, chevron

---

## 🎨 Design Features

### Mobile-First
- ✅ 44px touch targets (Apple HIG)
- ✅ Responsive text: `text-sm sm:text-base`
- ✅ Responsive padding: `p-3 sm:p-4`
- ✅ Responsive spacing: `gap-2 sm:gap-3`

### iOS Optimization
- ✅ Safe area support (notch/Dynamic Island)
- ✅ WKWebView compatible
- ✅ iOS-style animations
- ✅ Bottom nav safe area padding
- ✅ FAB safe area positioning

### Accessibility
- ✅ WCAG 2.1 compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA attributes

### Terminal Aesthetic
- ✅ Custom theme colors (cafe latte)
- ✅ Monospace typography
- ✅ Sharp corners (brutalist)
- ✅ Minimal shadows
- ✅ 4px grid system

---

## 📦 Dependencies

```json
{
  "class-variance-authority": "^0.7.0",
  "@radix-ui/react-checkbox": "^1.1.2",
  "@radix-ui/react-select": "^2.1.4",
  "@radix-ui/react-switch": "^1.1.2",
  "@radix-ui/react-toast": "^1.2.4",
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-tabs": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.4",
  "@radix-ui/react-accordion": "^1.2.2",
  "@radix-ui/react-avatar": "^1.1.2",
  "@radix-ui/react-progress": "^1.1.2",
  "@radix-ui/react-tooltip": "^1.1.6",
  "@radix-ui/react-radio-group": "^1.2.2",
  "@radix-ui/react-slider": "^1.2.1"
}
```

---

## 🚀 Quick Import

```tsx
import {
  // Forms
  Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, SearchBar,

  // Buttons
  Button, IconButton, ButtonGroup, FAB,

  // Layout
  Card, CardHeader, CardTitle, Container, Stack, Divider,

  // Feedback
  Alert, Toast, Modal, Spinner, BottomSheet,

  // Navigation
  AppBar, BottomNav, Drawer, Tabs, Dropdown, Accordion,

  // Data Display
  Badge, Avatar, Progress, Tooltip, Chip, List
} from '@/templates'
```
