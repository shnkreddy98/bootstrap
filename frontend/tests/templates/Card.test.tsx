import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../src/templates'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeDefined()
  })

  it('renders with default variant', () => {
    render(<Card variant="default">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('bg-bg-0')
  })

  it('renders with elevated variant', () => {
    render(<Card variant="elevated">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('shadow-md')
  })

  it('renders with outlined variant', () => {
    render(<Card variant="outlined">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('border-2')
  })

  it('renders with padding', () => {
    render(<Card padding="lg">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('p-6')
  })

  it('renders as interactive', () => {
    render(<Card interactive>Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('cursor-pointer')
  })
})

describe('CardHeader', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>
    )
    expect(screen.getByText('Header content')).toBeDefined()
  })
})

describe('CardTitle', () => {
  it('renders title text', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeDefined()
  })
})

describe('CardDescription', () => {
  it('renders description text', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Card description')).toBeDefined()
  })
})

describe('CardContent', () => {
  it('renders content', () => {
    render(
      <Card>
        <CardContent>Main content</CardContent>
      </Card>
    )
    expect(screen.getByText('Main content')).toBeDefined()
  })
})

describe('CardFooter', () => {
  it('renders footer', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )
    expect(screen.getByText('Footer content')).toBeDefined()
  })
})
