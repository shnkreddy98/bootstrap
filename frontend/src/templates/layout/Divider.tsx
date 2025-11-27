import { forwardRef, HTMLAttributes } from 'react'

/**
 * Divider Component
 *
 * Visual separator between sections.
 */

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  label?: string
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', spacing = 'md', label, className = '', ...props }, ref) => {
    const spacingClasses = {
      none: '',
      sm: orientation === 'horizontal' ? 'my-2 sm:my-3' : 'mx-2 sm:mx-3',
      md: orientation === 'horizontal' ? 'my-4 sm:my-6' : 'mx-4 sm:mx-6',
      lg: orientation === 'horizontal' ? 'my-6 sm:my-8' : 'mx-6 sm:mx-8',
    }

    if (label && orientation === 'horizontal') {
      return (
        <div className={`relative flex items-center ${spacingClasses[spacing]} ${className}`}>
          <div className="flex-1 border-t border-border-0" />
          <span className="px-3 text-xs sm:text-sm text-fg-3 bg-bg-0">
            {label}
          </span>
          <div className="flex-1 border-t border-border-0" />
        </div>
      )
    }

    return (
      <hr
        ref={ref}
        className={`
          border-border-0
          ${orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l'}
          ${spacingClasses[spacing]}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
