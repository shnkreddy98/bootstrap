import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

/**
 * Button Component
 *
 * Flexible button with multiple variants, sizes, and states.
 * iOS 44px touch target compliant.
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:opacity-90 focus:ring-brand',
        secondary: 'bg-bg-2 text-fg-0 hover:bg-bg-3 focus:ring-border-1 border border-border-0',
        outline: 'bg-transparent text-brand border-2 border-brand hover:bg-brand hover:text-white focus:ring-brand',
        ghost: 'bg-transparent text-fg-0 hover:bg-bg-2 focus:ring-border-1',
        danger: 'bg-error text-white hover:opacity-90 focus:ring-error',
        success: 'bg-success text-white hover:opacity-90 focus:ring-success',
      },
      size: {
        sm: 'px-3 py-2 text-xs sm:text-sm min-h-[36px]',
        md: 'px-4 py-3 text-sm sm:text-base min-h-[44px]', // Default - iOS compliant
        lg: 'px-6 py-3 text-base sm:text-lg min-h-[48px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    loading,
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
