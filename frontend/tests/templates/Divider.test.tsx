import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Divider } from '../../src/templates'


describe('Divider', () => {
  it('renders horizontal divider', () => {
    const { container } = render(<Divider />)
    const divider = container.querySelector('.w-full')
    expect(divider).toBeDefined()
  })

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const divider = container.querySelector('.h-full')
    expect(divider).toBeDefined()
  })

  it('renders with label', () => {
    render(<Divider label="OR" />)
    expect(screen.getByText('OR')).toBeDefined()
  })

  it('renders with small spacing', () => {
    const { container } = render(<Divider spacing="sm" />)
    const divider = container.querySelector('.my-2')
    expect(divider).toBeDefined()
  })

  it('renders with medium spacing', () => {
    const { container } = render(<Divider spacing="md" />)
    const divider = container.querySelector('.my-4')
    expect(divider).toBeDefined()
  })

  it('renders with large spacing', () => {
    const { container } = render(<Divider spacing="lg" />)
    const divider = container.querySelector('.my-6')
    expect(divider).toBeDefined()
  })

  it('renders with no spacing', () => {
    const { container } = render(<Divider spacing="none" />)
    const divider = container.querySelector('.my-0')
    expect(divider).toBeDefined()
  })
})
