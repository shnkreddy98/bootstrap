import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Stack Component
 *
 * Layout component for spacing children evenly.
 * Mobile-first responsive spacing.
 */

const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        vertical: 'flex-col',
        horizontal: 'flex-row flex-wrap',
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1 sm:gap-2',
        sm: 'gap-2 sm:gap-3',
        md: 'gap-3 sm:gap-4',
        lg: 'gap-4 sm:gap-6',
        xl: 'gap-6 sm:gap-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
    },
    defaultVariants: {
      direction: 'vertical',
      spacing: 'md',
      align: 'stretch',
      justify: 'start',
    },
  }
)

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={stackVariants({ direction, spacing, align, justify, className })}
        {...props}
      />
    )
  }
)

Stack.displayName = 'Stack'
