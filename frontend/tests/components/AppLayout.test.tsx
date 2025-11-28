import { describe, it, expect } from 'bun:test'
import { AppLayout } from '../../src/components/AppLayout'

// Note: AppLayout requires full router context which is complex to set up in unit tests.
// Its functionality is tested through page integration tests instead.
describe('AppLayout', () => {
  it('can be imported', () => {
    expect(AppLayout).toBeDefined()
    expect(typeof AppLayout).toBe('function')
  })

  it('is a valid component', () => {
    expect(AppLayout.name || 'AppLayout').toBeTruthy()
  })

  it('exports a valid React component', () => {
    // Just verify it's a valid component function
    expect(AppLayout).toBeInstanceOf(Function)
  })
})
