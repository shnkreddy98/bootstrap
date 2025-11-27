import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Container } from '../../src/templates'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Container content</Container>)
    expect(screen.getByText('Container content')).toBeDefined()
  })

  it('renders with small size', () => {
    const { container } = render(<Container size="sm">Content</Container>)
    const containerEl = container.querySelector('.max-w-3xl')
    expect(containerEl).toBeDefined()
  })

  it('renders with medium size', () => {
    const { container } = render(<Container size="md">Content</Container>)
    const containerEl = container.querySelector('.max-w-5xl')
    expect(containerEl).toBeDefined()
  })

  it('renders with large size', () => {
    const { container } = render(<Container size="lg">Content</Container>)
    const containerEl = container.querySelector('.max-w-7xl')
    expect(containerEl).toBeDefined()
  })

  it('renders with full size', () => {
    const { container } = render(<Container size="full">Content</Container>)
    const containerEl = container.querySelector('.max-w-full')
    expect(containerEl).toBeDefined()
  })

  it('renders with padding', () => {
    const { container } = render(<Container padding="md">Content</Container>)
    const containerEl = container.querySelector('.px-4')
    expect(containerEl).toBeDefined()
  })

  it('renders with no padding', () => {
    const { container } = render(<Container padding="none">Content</Container>)
    const containerEl = container.querySelector('.px-0')
    expect(containerEl).toBeDefined()
  })

  it('centers content', () => {
    const { container } = render(<Container>Content</Container>)
    const containerEl = container.querySelector('.mx-auto')
    expect(containerEl).toBeDefined()
  })
})
