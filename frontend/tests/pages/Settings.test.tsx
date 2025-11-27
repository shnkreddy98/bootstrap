import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Settings } from '../../src/pages/Settings'

describe('Settings Page', () => {
  it('renders preferences section', () => {
    render(<Settings />)
    expect(screen.getByText('Preferences')).toBeDefined()
  })

  it('renders notification settings', () => {
    render(<Settings />)
    expect(screen.getByText('Push Notifications')).toBeDefined()
    expect(screen.getByText('Receive notifications for updates')).toBeDefined()
  })

  it('renders dark mode setting', () => {
    render(<Settings />)
    expect(screen.getByText('Dark Mode')).toBeDefined()
    expect(screen.getByText('Use dark color scheme')).toBeDefined()
  })

  it('renders email alerts setting', () => {
    render(<Settings />)
    expect(screen.getByText('Email Alerts')).toBeDefined()
    expect(screen.getByText('Get email notifications')).toBeDefined()
  })

  it('renders volume control', () => {
    render(<Settings />)
    expect(screen.getByText('Volume')).toBeDefined()
  })

  it('renders general section', () => {
    render(<Settings />)
    expect(screen.getByText('General')).toBeDefined()
    expect(screen.getByText('Language')).toBeDefined()
    expect(screen.getByText('Privacy & Security')).toBeDefined()
  })

  it('renders support section', () => {
    render(<Settings />)
    expect(screen.getByText('Support')).toBeDefined()
    expect(screen.getByText('Help Center')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
  })

  it('renders version badge', () => {
    render(<Settings />)
    expect(screen.getByText('v1.0.0')).toBeDefined()
  })
})
