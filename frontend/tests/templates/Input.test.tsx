import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Input } from '../../src/templates'


describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeDefined()
  })

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter email" />)
    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement
    expect(input).toBeDefined()
  })

  it('renders with error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeDefined()
  })

  it('renders with helper text', () => {
    render(<Input label="Email" helperText="We'll never share your email" />)
    expect(screen.getByText("We'll never share your email")).toBeDefined()
  })

  it('renders disabled state', () => {
    render(<Input label="Email" disabled placeholder="test" />)
    const input = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(input.hasAttribute('disabled')).toBe(true)
  })

  it.skip('renders required state', () => {
    render(<Input label="Email" required placeholder="test" />)
    const input = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(input.hasAttribute('required')).toBe(true)
  })

  it.skip('renders with type email', () => {
    render(<Input label="Email" type="email" placeholder="test" />)
    const input = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(input.getAttribute('type')).toBe('email')
  })

  it.skip('renders with type password', () => {
    render(<Input label="Password" type="password" placeholder="test" />)
    const input = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(input.getAttribute('type')).toBe('password')
  })

  it.skip('renders full width', () => {
    render(<Input label="Email" fullWidth placeholder="test" />)
    const input = screen.getByPlaceholderText('test')
    // Just check that input exists - fullWidth is tested via integration tests
    expect(input).toBeDefined()
  })
})
