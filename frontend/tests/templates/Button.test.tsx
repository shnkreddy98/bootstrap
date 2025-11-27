import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Button, IconButton } from '../../src/templates'
import { Plus } from 'lucide-react'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDefined()
  })

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button.className).toContain('bg-brand')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button.className).toContain('bg-bg-2')
  })

  it('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button.className).toContain('bg-error')
  })

  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('renders with left icon', () => {
    render(
      <Button leftIcon={<Plus data-testid="left-icon" size={16} />}>
        Add
      </Button>
    )
    expect(screen.getByTestId('left-icon')).toBeDefined()
  })

  it('renders loading state', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByText('Loading') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('renders full width', () => {
    render(<Button fullWidth>Full Width</Button>)
    const button = screen.getByText('Full Width')
    expect(button.className).toContain('w-full')
  })
})

describe('IconButton', () => {
  it('renders with icon', () => {
    render(
      <IconButton
        icon={<Plus data-testid="icon" size={18} />}
        aria-label="Add item"
      />
    )
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('has proper aria-label', () => {
    render(
      <IconButton
        icon={<Plus size={18} />}
        aria-label="Add item"
      />
    )
    const button = screen.getByLabelText('Add item')
    expect(button).toBeDefined()
  })

  it('renders with variant', () => {
    render(
      <IconButton
        icon={<Plus size={18} />}
        aria-label="Add"
        variant="danger"
      />
    )
    const button = screen.getByLabelText('Add')
    expect(button.className).toContain('bg-error')
  })
})
