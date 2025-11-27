import { forwardRef, InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Input Component
 *
 * A flexible input component with variants for different states and sizes.
 * Mobile-first with iOS 44px touch target support.
 */

const inputVariants = cva(
  'w-full border rounded-sm transition-colors focus:outline-none focus:ring-1 placeholder:text-fg-3',
  {
    variants: {
      variant: {
        default: 'bg-bg-0 border-border-0 focus:border-brand focus:ring-brand',
        error: 'bg-bg-0 border-error focus:border-error focus:ring-error',
        success: 'bg-bg-0 border-success focus:border-success focus:ring-success',
      },
      size: {
        sm: 'px-3 py-2 text-xs sm:text-sm',
        md: 'px-3 py-3 text-sm sm:text-base', // Default - meets 44px min
        lg: 'px-4 py-3 text-base sm:text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, disabled, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm text-fg-1 mb-1 sm:mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={inputVariants({ variant: error ? 'error' : variant, size, disabled, className })}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-fg-3">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
