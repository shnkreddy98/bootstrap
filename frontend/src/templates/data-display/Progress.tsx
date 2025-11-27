import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Progress Component (Radix UI)
 *
 * Visual progress indicator.
 */

const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-bg-2',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ProgressProps
  extends ProgressPrimitive.ProgressProps,
    VariantProps<typeof progressVariants> {
  showValue?: boolean
  label?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size, showValue, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <span className="text-xs sm:text-sm text-fg-1">{label}</span>
            )}
            {showValue && (
              <span className="text-xs sm:text-sm text-fg-2">{value}%</span>
            )}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={progressVariants({ size, className })}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-brand transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  }
)

Progress.displayName = 'Progress'
