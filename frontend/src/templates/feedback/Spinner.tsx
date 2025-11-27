import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Spinner Component
 *
 * Loading indicator with different sizes.
 */

const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
      color: {
        default: 'text-fg-2',
        brand: 'text-brand',
        white: 'text-white',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
    },
  }
)

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export function Spinner({ size, color, className = '' }: SpinnerProps) {
  return (
    <Loader2 className={spinnerVariants({ size, color, className })} />
  )
}

/**
 * Full Page Spinner
 */
export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-0 z-50">
      <Spinner size="xl" color="brand" />
    </div>
  )
}
