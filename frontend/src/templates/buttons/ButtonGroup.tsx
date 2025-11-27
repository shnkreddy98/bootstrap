import { Children, cloneElement, isValidElement, ReactElement } from 'react'

/**
 * Button Group Component
 *
 * Groups multiple buttons together with proper spacing.
 * Mobile-first with responsive layouts.
 */

interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
  className?: string
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  fullWidth = false,
  className = ''
}: ButtonGroupProps) {
  const childArray = Children.toArray(children)

  return (
    <div
      className={`
        flex gap-2 sm:gap-3
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {childArray.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<{ fullWidth?: boolean }>, {
            key: index,
            ...(fullWidth && orientation === 'vertical' ? { fullWidth: true } : {}),
          })
        }
        return child
      })}
    </div>
  )
}
