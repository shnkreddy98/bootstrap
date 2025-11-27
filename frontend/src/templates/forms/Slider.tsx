import * as SliderPrimitive from '@radix-ui/react-slider'
import { forwardRef } from 'react'

/**
 * Slider Component (Radix UI)
 *
 * Range input for selecting values (volume, brightness, etc.).
 * Mobile-optimized with large touch targets.
 */

export interface SliderProps extends SliderPrimitive.SliderProps {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ label, showValue, formatValue, className = '', ...props }, ref) => {
    const value = props.value?.[0] ?? props.defaultValue?.[0] ?? 0
    const displayValue = formatValue ? formatValue(value) : value

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-3">
            {label && (
              <label className="text-xs sm:text-sm text-fg-1">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-xs sm:text-sm text-fg-2 font-mono">
                {displayValue}
              </span>
            )}
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          className={`
            relative flex items-center select-none touch-none
            w-full h-12 cursor-pointer
            ${className}
          `}
          {...props}
        >
          <SliderPrimitive.Track className="bg-bg-2 relative grow rounded-full h-2">
            <SliderPrimitive.Range className="absolute bg-brand rounded-full h-full" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb
            className="
              block w-6 h-6 bg-white border-2 border-brand rounded-full
              shadow-md transition-shadow
              hover:shadow-lg focus:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
        </SliderPrimitive.Root>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
