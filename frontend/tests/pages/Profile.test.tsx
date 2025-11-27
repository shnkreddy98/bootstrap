import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Profile } from '../../src/pages/Profile'

// Create a test query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('Profile Page', () => {
  it('renders profile header', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    )

    // Check for profile elements
    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('john.doe@example.com')).toBeDefined()
  })

  it('renders stats section', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    )

    // Check for stats labels
    expect(screen.getByText('Completed')).toBeDefined()
    expect(screen.getByText('Active')).toBeDefined()
    expect(screen.getByText('Total')).toBeDefined()
  })

  it('renders account information', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    )

    // Check for account info
    expect(screen.getByText('Account Information')).toBeDefined()
    expect(screen.getByText('Username')).toBeDefined()
    expect(screen.getByText('Email')).toBeDefined()
  })

  it('renders edit profile button', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    )

    const editButton = screen.getByText('Edit Profile')
    expect(editButton).toBeDefined()
  })
})
