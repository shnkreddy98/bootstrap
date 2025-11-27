import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Card Component
 *
 * Container component for grouping content.
 * Mobile-first with responsive padding.
 */

const cardVariants = cva(
  'rounded-sm border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-bg-1 border-border-0',
        elevated: 'bg-bg-0 border-border-0 shadow-md',
        outlined: 'bg-transparent border-border-1',
      },
      padding: {
        none: '',
        sm: 'p-3 sm:p-4',
        md: 'p-4 sm:p-6',
        lg: 'p-6 sm:p-8',
      },
      interactive: {
        true: 'hover:bg-bg-2 cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, padding, interactive, className })}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mb-4 ${className}`}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

/**
 * Card Title
 */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-lg sm:text-xl font-mono text-fg-0 ${className}`}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

/**
 * Card Description
 */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`mt-1 text-xs sm:text-sm text-fg-2 ${className}`}
        {...props}
      />
    )
  }
)

CardDescription.displayName = 'CardDescription'

/**
 * Card Content
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)

CardContent.displayName = 'CardContent'

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mt-4 pt-4 border-t border-border-0 ${className}`}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'
