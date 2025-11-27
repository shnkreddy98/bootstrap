import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Textarea Component
 *
 * A flexible textarea component with auto-resize support and variants.
 */

const textareaVariants = cva(
  'w-full border rounded-sm transition-colors focus:outline-none focus:ring-1 placeholder:text-fg-3 resize-y',
  {
    variants: {
      variant: {
        default: 'bg-bg-0 border-border-0 focus:border-brand focus:ring-brand',
        error: 'bg-bg-0 border-error focus:border-error focus:ring-error',
        success: 'bg-bg-0 border-success focus:border-success focus:ring-success',
      },
      size: {
        sm: 'px-3 py-2 text-xs sm:text-sm min-h-[80px]',
        md: 'px-3 py-3 text-sm sm:text-base min-h-[100px]',
        lg: 'px-4 py-3 text-base sm:text-lg min-h-[120px]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed resize-none',
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

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, disabled, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm text-fg-1 mb-1 sm:mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          className={textareaVariants({ variant: error ? 'error' : variant, size, disabled, className })}
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

Textarea.displayName = 'Textarea'
