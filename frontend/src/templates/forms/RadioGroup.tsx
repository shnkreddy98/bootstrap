import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'

/**
 * Radio Group Component (Radix UI)
 *
 * Accessible radio button group with iOS-friendly touch targets.
 */

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onValueChange?: (value: string) => void
  label?: string
  error?: string
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onValueChange, label, error, orientation = 'vertical', disabled }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm text-fg-1 mb-2 sm:mb-3">
            {label}
          </label>
        )}
        <RadioGroupPrimitive.Root
          ref={ref}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          className={`
            flex gap-3 sm:gap-4
            ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
          `}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-start gap-3">
              <RadioGroupPrimitive.Item
                value={option.value}
                disabled={option.disabled || disabled}
                className="
                  w-6 h-6 sm:w-5 sm:h-5 shrink-0 mt-0.5
                  border-2 border-border-0 rounded-full
                  flex items-center justify-center
                  transition-colors cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  data-[state=checked]:border-brand
                "
              >
                <RadioGroupPrimitive.Indicator className="w-3 h-3 sm:w-2.5 sm:h-2.5 bg-brand rounded-full" />
              </RadioGroupPrimitive.Item>

              <div className="flex-1">
                <label className="block text-sm sm:text-base text-fg-0 cursor-pointer">
                  {option.label}
                </label>
                {option.description && (
                  <p className="mt-0.5 text-xs text-fg-3">{option.description}</p>
                )}
              </div>
            </div>
          ))}
        </RadioGroupPrimitive.Root>

        {error && (
          <p className="mt-2 text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
