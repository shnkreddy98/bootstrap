import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Badge } from '../../src/templates'


describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeDefined()
  })

  it('renders with primary variant', () => {
    render(<Badge variant="primary">Primary</Badge>)
    const badge = screen.getByText('Primary')
    expect(badge.className).toContain('bg-brand')
  })

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge.className).toContain('bg-success')
  })

  it('renders with error variant', () => {
    render(<Badge variant="error">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge.className).toContain('bg-error')
  })

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge.className).toContain('bg-warning')
  })

  it('renders with info variant', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge.className).toContain('bg-info')
  })

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')
    expect(badge.className).toContain('border')
  })

  it('renders with small size', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge.className).toContain('text-xs')
  })

  it('renders with large size', () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText('Large')
    expect(badge.className).toContain('text-base')
  })
})
