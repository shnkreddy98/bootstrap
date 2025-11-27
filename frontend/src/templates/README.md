# Template Components

> **⚠️ IMPORTANT**: Always use these template components for ALL UI elements in this project. Do NOT create custom UI components.

A comprehensive library of **33 production-ready, mobile-first React components** built with:

- **Radix UI**: Headless, accessible component primitives
- **Tailwind CSS v4**: Utility-first styling with terminal cafe latte aesthetic
- **TypeScript**: Full type safety with autocomplete
- **iOS-optimized**: 44px touch targets, safe area support, notch-aware
- **Accessible**: WCAG 2.1 compliant with keyboard navigation

## Why Radix UI?

- ✅ Already in your stack (`@radix-ui/react-checkbox`)
- ✅ Headless/unstyled - perfect for custom terminal theme
- ✅ Accessibility-first (WCAG compliant)
- ✅ Mobile-optimized with touch-friendly interactions
- ✅ TypeScript native
- ✅ Tree-shakeable
- ✅ React 19 compatible

## Installation

Install missing Radix UI packages:

```bash
npm install class-variance-authority
npm install @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-dropdown-menu @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-tooltip @radix-ui/react-radio-group
```

## Quick Start

```tsx
import { Button, Input, Card, Modal } from '@/templates'

function MyComponent() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

## Component Categories

### 📝 Forms
- **Input**: Text inputs with validation states
- **Textarea**: Multi-line text input
- **Select**: Dropdown select with search
- **Checkbox**: Single checkbox with label
- **RadioGroup**: Multiple choice options
- **Switch**: Toggle switch (iOS-style)

### 🔘 Buttons
- **Button**: Primary, secondary, outline, ghost, danger variants
- **IconButton**: Square button for icons only
- **ButtonGroup**: Group multiple buttons

### 📦 Layout
- **Card**: Content container with header/footer
- **Container**: Centered max-width wrapper
- **Stack**: Vertical/horizontal spacing helper
- **Divider**: Visual separator with optional label

### 💬 Feedback
- **Alert**: Static notifications (info, success, warning, error)
- **Toast**: Auto-dismissing notifications
- **Modal**: Dialog for critical actions
- **Spinner**: Loading indicators

### 🧭 Navigation
- **Tabs**: Organize content in tabs
- **Dropdown**: Menu with actions and submenus
- **Accordion**: Collapsible content sections

### 📊 Data Display
- **Badge**: Status indicators and labels
- **Avatar**: User profile images with fallback
- **Progress**: Visual progress bar
- **Tooltip**: Contextual info on hover

## Usage Examples

### Form Components

```tsx
import { Input, Select, Checkbox, RadioGroup, Switch } from '@/templates'

// Input with validation
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
  helperText="We'll never share your email"
/>

// Select dropdown
<Select
  label="Country"
  placeholder="Select country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  onValueChange={(value) => console.log(value)}
/>

// Checkbox
<Checkbox
  label="Accept terms"
  description="I agree to the terms and conditions"
  onCheckedChange={(checked) => console.log(checked)}
/>

// Radio Group
<RadioGroup
  label="Subscription Plan"
  options={[
    { value: 'free', label: 'Free', description: '$0/month' },
    { value: 'pro', label: 'Pro', description: '$10/month' },
  ]}
  onValueChange={(value) => console.log(value)}
/>

// Switch
<Switch
  label="Email notifications"
  description="Receive updates via email"
  onCheckedChange={(checked) => console.log(checked)}
/>
```

### Button Components

```tsx
import { Button, IconButton, ButtonGroup } from '@/templates'
import { Plus, Save, Trash } from 'lucide-react'

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>

// With icons
<Button leftIcon={<Plus size={16} />}>Add Item</Button>
<Button rightIcon={<Save size={16} />}>Save</Button>

// Loading state
<Button loading>Saving...</Button>

// Icon button
<IconButton icon={<Trash size={18} />} aria-label="Delete" variant="danger" />

// Button group
<ButtonGroup orientation="horizontal">
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</ButtonGroup>
```

### Layout Components

```tsx
import { Card, CardHeader, CardTitle, CardContent, Container, Stack, Divider } from '@/templates'

// Card with sections
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your account settings</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>

// Container for centering content
<Container size="md" padding="md">
  <h1>My App</h1>
</Container>

// Stack for spacing
<Stack direction="vertical" spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Divider
<Divider spacing="md" />
<Divider label="OR" spacing="lg" />
```

### Feedback Components

```tsx
import { Alert, Toast, ToastProvider, Modal, Spinner } from '@/templates'

// Alert
<Alert variant="info" title="New Update Available" description="Version 2.0 is ready to install" />
<Alert variant="success" title="Success!" onClose={() => {}} />
<Alert variant="error" title="Error" description="Failed to save changes" />

// Toast (wrap app in ToastProvider)
<ToastProvider>
  <YourApp />
</ToastProvider>

<Toast
  variant="success"
  title="Changes saved"
  description="Your profile has been updated"
  open={showToast}
  onOpenChange={setShowToast}
/>

// Modal
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm Action</ModalTitle>
      <ModalDescription>Are you sure you want to proceed?</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p>Modal content here</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </ModalFooter>
    <ModalClose />
  </ModalContent>
</Modal>

// Spinner
<Spinner size="lg" color="brand" />
<FullPageSpinner />
```

### Navigation Components

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent, Dropdown, Accordion } from '@/templates'

// Tabs
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Overview content</TabsContent>
  <TabsContent value="tab2">Settings content</TabsContent>
</Tabs>

// Dropdown Menu
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>

// Accordion
<Accordion type="single" collapsible>
  <AccordionItem value="item1">
    <AccordionTrigger>What is this?</AccordionTrigger>
    <AccordionContent>Answer to the question</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Data Display Components

```tsx
import { Badge, Avatar, AvatarGroup, Progress, Tooltip, TooltipProvider } from '@/templates'

// Badge
<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>

// Avatar
<Avatar src="/user.jpg" alt="John Doe" fallback="JD" size="md" />

// Avatar Group
<AvatarGroup max={3}>
  <Avatar fallback="JD" />
  <Avatar fallback="SM" />
  <Avatar fallback="AB" />
  <Avatar fallback="CD" />
</AvatarGroup>

// Progress
<Progress value={75} showValue label="Upload progress" />

// Tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Helpful information</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Mobile-First Features

All components are optimized for mobile:

- ✅ **Touch targets**: Minimum 44px per Apple HIG
- ✅ **Responsive text**: Scales from `text-xs sm:text-sm`
- ✅ **Responsive padding**: `p-3 sm:p-4`
- ✅ **Responsive spacing**: `gap-2 sm:gap-3`
- ✅ **Flexible layouts**: Stack vertically on mobile, horizontal on tablet+
- ✅ **Safe area support**: Respects iPhone notch/Dynamic Island

## Customization

All components accept `className` prop for Tailwind overrides:

```tsx
<Button className="w-full md:w-auto">
  Custom Button
</Button>
```

## TypeScript Support

Full type safety with intellisense:

```tsx
import type { InputProps, ButtonProps } from '@/templates'

const props: ButtonProps = {
  variant: 'primary', // Autocomplete available
  size: 'md',
  loading: false,
}
```

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA attributes included
- Focus management
- Color contrast compliant

## Browser Support

- ✅ Safari iOS 14+
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ WKWebView (iOS apps)

## Component Variants

### Button Variants
- `primary`: Brand colored, white text
- `secondary`: Light background
- `outline`: Transparent with brand border
- `ghost`: Transparent, subtle hover
- `danger`: Red for destructive actions
- `success`: Green for positive actions

### Alert/Toast Variants
- `info`: Blue for informational
- `success`: Green for success
- `warning`: Yellow for warnings
- `error`: Red for errors

### Size Variants
- `sm`: Compact for dense layouts
- `md`: Default - iOS compliant
- `lg`: Prominent for important actions

## Best Practices

1. **Always provide `aria-label` for icon-only buttons**
   ```tsx
   <IconButton icon={<X />} aria-label="Close" />
   ```

2. **Use form labels for accessibility**
   ```tsx
   <Input label="Email" /> // ✅
   <Input placeholder="Email" /> // ❌
   ```

3. **Wrap app in providers for Toast/Tooltip**
   ```tsx
   <ToastProvider>
     <TooltipProvider>
       <App />
     </TooltipProvider>
   </ToastProvider>
   ```

4. **Test on real iOS devices** for touch target validation

## Contributing

These templates are meant to be customized! Feel free to:
- Adjust colors in `theme.css`
- Modify sizes and spacing
- Add new variants
- Create new components following the same patterns

## Support

For issues or questions:
- Check Radix UI docs: https://www.radix-ui.com
- Tailwind CSS docs: https://tailwindcss.com
- Review component source code in `src/templates/`
