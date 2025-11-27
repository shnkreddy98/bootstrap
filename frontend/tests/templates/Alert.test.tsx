import { describe, it, expect, mock } from 'bun:test'
import { render, screen, fireEvent } from '@testing-library/react'
import { Alert } from '../../src/templates'

describe('Alert', () => {
  it('renders with title', () => {
    render(<Alert title="Alert title" />)
    expect(screen.getByText('Alert title')).toBeDefined()
  })

  it('renders with description', () => {
    render(<Alert title="Title" description="Alert description" />)
    expect(screen.getByText('Alert description')).toBeDefined()
  })

  it('renders with info variant', () => {
    render(<Alert variant="info" title="Info alert" />)
    const alert = screen.getByText('Info alert').closest('div')
    expect(alert?.className).toContain('bg-info')
  })

  it('renders with success variant', () => {
    render(<Alert variant="success" title="Success alert" />)
    const alert = screen.getByText('Success alert').closest('div')
    expect(alert?.className).toContain('bg-success')
  })

  it('renders with warning variant', () => {
    render(<Alert variant="warning" title="Warning alert" />)
    const alert = screen.getByText('Warning alert').closest('div')
    expect(alert?.className).toContain('bg-warning')
  })

  it('renders with error variant', () => {
    render(<Alert variant="error" title="Error alert" />)
    const alert = screen.getByText('Error alert').closest('div')
    expect(alert?.className).toContain('bg-error')
  })

  it('renders close button when onClose is provided', () => {
    const onClose = mock(() => {})
    render(<Alert title="Closeable" onClose={onClose} />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeDefined()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = mock(() => {})
    render(<Alert title="Closeable" onClose={onClose} />)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render close button when onClose is not provided', () => {
    render(<Alert title="Not closeable" />)
    const closeButtons = screen.queryAllByRole('button')
    expect(closeButtons.length).toBe(0)
  })
})
