import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Badge Component
 *
 * Small status indicators and labels.
 */

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-sm font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-bg-2 text-fg-0 border border-border-0',
        primary: 'bg-brand text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-error text-white',
        info: 'bg-info text-white',
        outline: 'bg-transparent text-fg-0 border-2 border-border-1',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs sm:text-sm',
        lg: 'px-3 py-1.5 text-sm sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'
