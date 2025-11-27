import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../../src/templates'

describe('Spinner', () => {
  it('renders spinner', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeDefined()
  })

  it('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />)
    const spinner = container.querySelector('.w-4')
    expect(spinner).toBeDefined()
  })

  it('renders with medium size', () => {
    const { container } = render(<Spinner size="md" />)
    const spinner = container.querySelector('.w-6')
    expect(spinner).toBeDefined()
  })

  it('renders with large size', () => {
    const { container } = render(<Spinner size="lg" />)
    const spinner = container.querySelector('.w-8')
    expect(spinner).toBeDefined()
  })

  it('renders with extra large size', () => {
    const { container } = render(<Spinner size="xl" />)
    const spinner = container.querySelector('.w-12')
    expect(spinner).toBeDefined()
  })

  it('renders with brand color', () => {
    const { container } = render(<Spinner color="brand" />)
    const spinner = container.querySelector('.text-brand')
    expect(spinner).toBeDefined()
  })

  it('renders with white color', () => {
    const { container } = render(<Spinner color="white" />)
    const spinner = container.querySelector('.text-white')
    expect(spinner).toBeDefined()
  })

  it('renders with default color', () => {
    const { container } = render(<Spinner color="default" />)
    const spinner = container.querySelector('.text-fg-2')
    expect(spinner).toBeDefined()
  })
})
