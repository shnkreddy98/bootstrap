import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Search, X } from 'lucide-react'

/**
 * Search Bar Component
 *
 * Specialized input for search with icon and clear button.
 * Mobile-optimized with iOS 44px touch target.
 */

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
  loading?: boolean
  fullWidth?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className = '', onClear, loading, fullWidth, value, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState('')
    const displayValue = value !== undefined ? value : internalValue
    const showClear = displayValue !== ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('')
      }
      onClear?.()

      // Create synthetic event for controlled inputs
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>
      onChange?.(syntheticEvent)
    }

    return (
      <div className={`relative ${fullWidth ? 'w-full' : 'max-w-md'}`}>
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3 pointer-events-none">
          <Search size={18} />
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="search"
          value={displayValue}
          onChange={handleChange}
          className={`
            w-full pl-10 pr-10 py-3
            text-sm sm:text-base bg-bg-0 border border-border-0 rounded-sm
            focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand
            placeholder:text-fg-3 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />

        {/* Clear Button */}
        {showClear && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-fg-3 hover:text-fg-0 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
