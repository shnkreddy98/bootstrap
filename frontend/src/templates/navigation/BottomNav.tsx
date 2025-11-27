import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Bottom Navigation Component (Tab Bar)
 *
 * iOS-style bottom navigation for 3-5 primary sections.
 * Safe area padding included for iPhone notch.
 */

const bottomNavVariants = cva(
  'fixed bottom-0 left-0 right-0 z-40 bg-bg-0 border-t border-border-0',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BottomNavProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottomNavVariants> {
  children: ReactNode
}

export const BottomNav = forwardRef<HTMLDivElement, BottomNavProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={bottomNavVariants({ variant, className })}
        style={{ paddingBottom: 'var(--safe-area-inset-bottom)' }}
        {...props}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {children}
        </div>
      </nav>
    )
  }
)

BottomNav.displayName = 'BottomNav'

/**
 * Bottom Nav Item
 */
export interface BottomNavItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  active?: boolean
  badge?: string | number
}

export const BottomNavItem = forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ icon, label, active, badge, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          relative flex flex-col items-center justify-center
          min-w-[60px] sm:min-w-[80px] px-2 py-2 gap-1
          text-xs font-medium rounded-sm
          transition-colors
          ${active
            ? 'text-brand'
            : 'text-fg-2 hover:text-fg-0'
          }
          ${className}
        `}
        {...props}
      >
        <div className="relative">
          {icon}
          {badge !== undefined && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-error text-white text-xs rounded-full flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
        <span className="truncate max-w-full">
          {label}
        </span>
      </button>
    )
  }
)

BottomNavItem.displayName = 'BottomNavItem'
