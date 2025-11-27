import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Container Component
 *
 * Centered container with max-width constraints.
 * Mobile-first responsive padding.
 */

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
      },
      padding: {
        none: '',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 md:px-8',
        lg: 'px-6 sm:px-8 md:px-12',
      },
    },
    defaultVariants: {
      size: 'md',
      padding: 'md',
    },
  }
)

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={containerVariants({ size, padding, className })}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'
