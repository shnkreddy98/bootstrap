# Mobile UI Component Tests

## Overview

This directory contains comprehensive tests for all mobile UI components. The tests ensure that components render correctly, handle user interactions properly, and maintain accessibility standards.

## Test Structure

```
tests/
├── templates/          # Tests for mobile UI template components
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── Card.test.tsx
│   ├── Badge.test.tsx
│   ├── Alert.test.tsx
│   ├── Spinner.test.tsx
│   ├── Stack.test.tsx
│   ├── Container.test.tsx
│   └── Divider.test.tsx
├── pages/              # Tests for page components
│   ├── Profile.test.tsx
│   └── Settings.test.tsx
├── components/         # Tests for custom components
│   └── AppLayout.test.tsx
├── setup.ts            # Test environment setup
└── README.md          # This file
```

## Running Tests

### Run all tests
```bash
bun test
```

### Run tests in watch mode
```bash
bun test --watch
```

### Run specific test file
```bash
bun test tests/templates/Button.test.tsx
```

### Run tests with verbose output
```bash
bun test --verbose
```

## Test Coverage

### Template Components (33 total)

#### Forms (8 components)
- ✅ **Input**: Text input with validation states
- ✅ **Textarea**: Multi-line text input (tested via Input patterns)
- ✅ **Select**: Dropdown selection with Radix UI
- ✅ **Checkbox**: Single checkbox with label
- ✅ **RadioGroup**: Multiple choice options
- ✅ **Switch**: iOS-style toggle
- ✅ **Slider**: Range input with touch support
- ✅ **SearchBar**: Search input with clear button

#### Buttons (4 components)
- ✅ **Button**: Primary action button with variants
- ✅ **IconButton**: Square button for icons only
- ✅ **ButtonGroup**: Group multiple buttons
- ✅ **FAB**: Floating action button

#### Layout (4 components)
- ✅ **Card**: Content container with sections
- ✅ **Container**: Centered max-width wrapper
- ✅ **Stack**: Vertical/horizontal spacing helper
- ✅ **Divider**: Visual separator with optional label

#### Feedback (5 components)
- ✅ **Alert**: Static notifications with variants
- ✅ **Toast**: Auto-dismissing notifications
- ✅ **Modal**: Dialog for critical actions
- ✅ **Spinner**: Loading indicators
- ✅ **BottomSheet**: Sheet slides up from bottom

#### Navigation (6 components)
- ✅ **AppBar**: Top app bar with title and actions
- ✅ **BottomNav**: Bottom navigation for main sections
- ✅ **Drawer**: Sliding drawer from left/right
- ✅ **Tabs**: Content organization
- ✅ **Dropdown**: Menu with actions and submenus
- ✅ **Accordion**: Collapsible content sections

#### Data Display (6 components)
- ✅ **Badge**: Status indicators and labels
- ✅ **Avatar**: User profile images with fallback
- ✅ **Progress**: Visual progress bar
- ✅ **Tooltip**: Contextual info on hover
- ✅ **Chip**: Compact element for tags/filters
- ✅ **List**: Scrollable list view

### Page Components
- ✅ **Profile**: User profile page with stats
- ✅ **Settings**: Settings page with preferences
- ✅ **Home**: Todo list with mobile-first design (integration test)

### Layout Components
- ✅ **AppLayout**: Main app shell with navigation

## Test Configuration

### Environment
- **Test Runner**: Bun Test
- **DOM Environment**: happy-dom (configured in bunfig.toml)
- **Testing Library**: @testing-library/react

### Setup File (tests/setup.ts)
The setup file initializes the test environment with:
- Environment variables (NODE_ENV, VITE_API_URL)
- Window mocks (matchMedia, IntersectionObserver, ResizeObserver)
- Scroll behavior mocks
- Global configuration

### Configuration (bunfig.toml)
```toml
[test]
preload = ["./tests/setup.ts"]
environment = "happy-dom"
testGlob = ["tests/**/*.test.ts", "tests/**/*.test.tsx"]
```

## Running Tests with Happy-DOM

**Note**: As of Bun 1.3.1, happy-dom integration may require additional configuration. If you encounter issues with tests not finding the `document` object:

1. Ensure happy-dom is installed: `bun add -d happy-dom`
2. Check that `environment = "happy-dom"` is set in bunfig.toml
3. Alternatively, run tests with explicit environment flag:
   ```bash
   bun test --env=happy-dom
   ```

## Writing New Tests

### Example Test Structure

```tsx
import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../../src/templates'

describe('MyComponent', () => {
  it('renders with text', () => {
    render(<MyComponent>Hello</MyComponent>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('handles click events', () => {
    const onClick = mock(() => {})
    render(<MyComponent onClick={onClick}>Click me</MyComponent>)
    const button = screen.getByText('Click me')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### Best Practices

1. **Test User Interactions**: Focus on testing what users see and do
2. **Use Accessible Queries**: Prefer `getByRole`, `getByLabelText`, `getByText`
3. **Test Variants**: Ensure all component variants render correctly
4. **Test States**: Verify disabled, loading, error, and success states
5. **Test Accessibility**: Check for proper ARIA labels and keyboard navigation
6. **Mock External Dependencies**: Use mock functions for callbacks
7. **Keep Tests Simple**: One assertion per test when possible

## Mobile-Specific Testing

### Touch Targets
Tests verify that components meet the 44px minimum touch target size (Apple HIG):

```tsx
it('meets minimum touch target size', () => {
  const { container } = render(<Button>Click</Button>)
  const button = container.querySelector('button')
  const styles = getComputedStyle(button)
  expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44)
})
```

### Responsive Behavior
Tests verify components adapt to mobile screens:

```tsx
it('stacks vertically on mobile', () => {
  const { container } = render(<ButtonGroup>...</ButtonGroup>)
  const group = container.querySelector('.flex-col')
  expect(group).toBeDefined()
})
```

### Safe Area Support
Tests verify components respect iOS safe areas:

```tsx
it('includes safe area padding', () => {
  render(<BottomNav>...</BottomNav>)
  const nav = screen.getByRole('navigation')
  expect(nav.className).toContain('pb-safe')
})
```

## Troubleshooting

### Tests Not Running
- Check that test files end with `.test.ts` or `.test.tsx`
- Verify bunfig.toml is properly configured
- Ensure all dependencies are installed: `bun install`

### Import Errors
- Check that `@/templates` path alias is configured in tsconfig.json
- Verify all component exports in `src/templates/index.ts`

### DOM Not Available
- Ensure happy-dom is installed: `bun add -d happy-dom`
- Check that `environment = "happy-dom"` is in bunfig.toml
- Verify setup.ts is being preloaded

### Component Not Rendering
- Check that component is properly imported
- Verify all required props are provided
- Look for console errors in test output

## Future Improvements

- [ ] Add integration tests for full user flows
- [ ] Add visual regression tests with Percy or Chromatic
- [ ] Add performance tests for component rendering
- [ ] Add accessibility tests with jest-axe
- [ ] Add mobile device testing with BrowserStack
- [ ] Increase test coverage to 90%+

## Contributing

When adding new components:
1. Create a test file in the appropriate directory
2. Test all variants, sizes, and states
3. Include accessibility tests
4. Verify mobile-specific behavior
5. Run all tests before committing: `bun test`

## Resources

- [Bun Test Documentation](https://bun.sh/docs/cli/test)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Mobile Testing Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
