import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '../../src/components/AppLayout'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('AppLayout', () => {
  it('renders children', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <div>Test content</div>
        </AppLayout>
      </QueryClientProvider>
    )
    expect(screen.getByText('Test content')).toBeDefined()
  })

  it('renders app bar', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      </QueryClientProvider>
    )
    // AppBar should be present in the layout
    const appBar = screen.getByRole('banner', { hidden: true })
    expect(appBar).toBeDefined()
  })

  it('renders bottom navigation', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      </QueryClientProvider>
    )
    // Bottom nav should have Home, Profile, Settings
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Profile')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })
})
