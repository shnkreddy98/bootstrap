import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Floating Action Button (FAB)
 *
 * Prominent circular button for primary actions.
 * Mobile-optimized with iOS positioning and safe areas.
 */

const fabVariants = cva(
  'fixed flex items-center justify-center rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed z-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:opacity-90',
        secondary: 'bg-fg-0 text-white hover:opacity-90',
      },
      size: {
        md: 'w-14 h-14',
        lg: 'w-16 h-16',
      },
      position: {
        'bottom-right': 'bottom-6 right-6',
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
        'bottom-left': 'bottom-6 left-6',
      },
      extended: {
        true: 'rounded-full px-6 gap-2 w-auto',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      position: 'bottom-right',
      extended: false,
    },
  }
)

export interface FABProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon: ReactNode
  label?: string
}

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ className, variant, size, position, extended, icon, label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={fabVariants({ variant, size, position, extended: extended || !!label, className })}
        style={{
          bottom: position?.includes('bottom')
            ? 'calc(1.5rem + var(--safe-area-inset-bottom))'
            : undefined
        }}
        {...props}
      >
        {icon}
        {label && <span className="font-medium text-sm">{label}</span>}
      </button>
    )
  }
)

FAB.displayName = 'FAB'
