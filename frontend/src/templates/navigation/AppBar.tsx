import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { ArrowLeft, Menu } from 'lucide-react'
import { IconButton } from '../buttons/IconButton'

/**
 * App Bar Component (Top Navigation Bar)
 *
 * Top app bar for screen titles, back buttons, and actions.
 * iOS-style with safe area support.
 */

export interface AppBarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  leftAction?: 'back' | 'menu' | ReactNode
  rightActions?: ReactNode
  onLeftActionClick?: () => void
  transparent?: boolean
  sticky?: boolean
}

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(
  ({
    title,
    subtitle,
    leftAction,
    rightActions,
    onLeftActionClick,
    transparent = false,
    sticky = true,
    className = '',
    children,
    ...props
  }, ref) => {
    const renderLeftAction = () => {
      if (!leftAction) return null

      if (leftAction === 'back') {
        return (
          <IconButton
            icon={<ArrowLeft size={20} />}
            aria-label="Go back"
            onClick={onLeftActionClick}
            variant="ghost"
          />
        )
      }

      if (leftAction === 'menu') {
        return (
          <IconButton
            icon={<Menu size={20} />}
            aria-label="Open menu"
            onClick={onLeftActionClick}
            variant="ghost"
          />
        )
      }

      return leftAction
    }

    return (
      <header
        ref={ref}
        className={`
          ${sticky ? 'sticky top-0' : ''}
          ${transparent ? 'bg-transparent' : 'bg-bg-0 border-b border-border-0'}
          z-40 transition-colors
          ${className}
        `}
        {...props}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {renderLeftAction()}
            {(title || subtitle) && (
              <div className="min-w-0 flex-1">
                {title && (
                  <h1 className="text-base sm:text-lg font-medium text-fg-0 truncate">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs text-fg-3 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>

          {/* Right Section */}
          {rightActions && (
            <div className="flex items-center gap-1 sm:gap-2 ml-2">
              {rightActions}
            </div>
          )}
        </div>
      </header>
    )
  }
)

AppBar.displayName = 'AppBar'
