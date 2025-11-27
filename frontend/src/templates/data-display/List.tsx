import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

/**
 * List Component
 *
 * Scrollable list view for displaying collections of items.
 * Common patterns: settings, messages, feeds, etc.
 */

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  divided?: boolean
}

export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ children, divided = true, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="list"
        className={`
          ${divided ? 'divide-y divide-border-0' : 'space-y-1'}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

List.displayName = 'List'

/**
 * List Item
 */
export interface ListItemProps {
  leftContent?: ReactNode
  rightContent?: ReactNode
  title: string
  description?: string
  interactive?: boolean
  showChevron?: boolean
  className?: string
  onClick?: () => void
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({
    leftContent,
    rightContent,
    title,
    description,
    interactive = false,
    showChevron = false,
    className = '',
    onClick,
    ...props
  }, ref) => {
    return interactive || onClick ? (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        role="listitem"
        type="button"
        onClick={onClick}
        className={`
          flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-4 w-full
          hover:bg-bg-1 active:bg-bg-2 cursor-pointer transition-colors text-left
          ${className}
        `}
      >
        {/* Left Content */}
        {leftContent && (
          <div className="shrink-0">
            {leftContent}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base text-fg-0 font-medium truncate">
            {title}
          </div>
          {description && (
            <div className="text-xs sm:text-sm text-fg-2 truncate mt-0.5">
              {description}
            </div>
          )}
        </div>

        {/* Right Content */}
        {rightContent && (
          <div className="shrink-0">
            {rightContent}
          </div>
        )}

        {/* Chevron */}
        {showChevron && (
          <ChevronRight size={18} className="shrink-0 text-fg-3" />
        )}
      </button>
    ) : (
      <div
        ref={ref}
        role="listitem"
        className={`
          flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-4 w-full
          ${className}
        `}
        {...props}
      >
        {/* Left Content */}
        {leftContent && (
          <div className="shrink-0">
            {leftContent}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base text-fg-0 font-medium truncate">
            {title}
          </div>
          {description && (
            <div className="text-xs sm:text-sm text-fg-2 truncate mt-0.5">
              {description}
            </div>
          )}
        </div>

        {/* Right Content */}
        {rightContent && (
          <div className="shrink-0">
            {rightContent}
          </div>
        )}

        {/* Chevron */}
        {showChevron && (
          <ChevronRight size={18} className="shrink-0 text-fg-3" />
        )}
      </div>
    )
  }
)

ListItem.displayName = 'ListItem'

/**
 * List Section Header
 */
export function ListSectionHeader({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`px-4 py-2 bg-bg-1 text-xs font-medium text-fg-2 uppercase tracking-wide ${className}`}>
      {children}
    </div>
  )
}

/**
 * List Empty State
 */
export function ListEmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      {icon && (
        <div className="text-fg-3 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base sm:text-lg font-medium text-fg-0 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-fg-2 mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
