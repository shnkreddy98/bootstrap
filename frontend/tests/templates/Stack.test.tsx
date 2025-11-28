import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { Stack } from '../../src/templates'


describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    )
    expect(screen.getByText('Child 1')).toBeDefined()
    expect(screen.getByText('Child 2')).toBeDefined()
  })

  it('renders with vertical direction', () => {
    const { container } = render(
      <Stack direction="vertical">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.flex-col')
    expect(stack).toBeDefined()
  })

  it('renders with horizontal direction', () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.flex-row')
    expect(stack).toBeDefined()
  })

  it('renders with small spacing', () => {
    const { container } = render(
      <Stack spacing="sm">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.gap-2')
    expect(stack).toBeDefined()
  })

  it('renders with medium spacing', () => {
    const { container } = render(
      <Stack spacing="md">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.gap-4')
    expect(stack).toBeDefined()
  })

  it('renders with large spacing', () => {
    const { container } = render(
      <Stack spacing="lg">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.gap-6')
    expect(stack).toBeDefined()
  })

  it('renders with center alignment', () => {
    const { container } = render(
      <Stack align="center">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.items-center')
    expect(stack).toBeDefined()
  })

  it('renders with space between justify', () => {
    const { container } = render(
      <Stack justify="between">
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.justify-between')
    expect(stack).toBeDefined()
  })

  it('renders full width', () => {
    const { container } = render(
      <Stack fullWidth>
        <div>Child 1</div>
      </Stack>
    )
    const stack = container.querySelector('.w-full')
    expect(stack).toBeDefined()
  })
})
