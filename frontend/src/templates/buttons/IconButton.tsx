import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Icon Button Component
 *
 * Square button for icon-only actions.
 * iOS 44px touch target compliant.
 */

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:opacity-90 focus:ring-brand',
        secondary: 'bg-bg-2 text-fg-0 hover:bg-bg-3 focus:ring-border-1 border border-border-0',
        ghost: 'bg-transparent text-fg-0 hover:bg-bg-2 focus:ring-border-1',
        danger: 'bg-transparent text-error hover:bg-error-bg focus:ring-error',
      },
      size: {
        sm: 'w-9 h-9 sm:w-8 sm:h-8',
        md: 'w-11 h-11 sm:w-10 sm:h-10', // iOS compliant
        lg: 'w-12 h-12',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  }
)

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  'aria-label': string // Required for accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={iconButtonVariants({ variant, size, className })}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
