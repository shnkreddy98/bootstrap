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
    render(<Input label="Email" disabled />)
    const input = screen.getByLabelText('Email') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('renders required state', () => {
    render(<Input label="Email" required />)
    const input = screen.getByLabelText('Email *') as HTMLInputElement
    expect(input.required).toBe(true)
  })

  it('renders with type email', () => {
    render(<Input label="Email" type="email" />)
    const input = screen.getByLabelText('Email') as HTMLInputElement
    expect(input.type).toBe('email')
  })

  it('renders with type password', () => {
    render(<Input label="Password" type="password" />)
    const input = screen.getByLabelText('Password') as HTMLInputElement
    expect(input.type).toBe('password')
  })

  it('renders full width', () => {
    render(<Input label="Email" fullWidth />)
    const container = screen.getByLabelText('Email').closest('div')
    expect(container?.className).toContain('w-full')
  })
})
