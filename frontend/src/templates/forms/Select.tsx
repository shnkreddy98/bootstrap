import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

/**
 * Select Component (Radix UI)
 *
 * A native-like select component with mobile-friendly touch targets.
 * Built on Radix UI for accessibility.
 */

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onValueChange, placeholder, label, error, helperText, disabled }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm text-fg-1 mb-1 sm:mb-2">
            {label}
          </label>
        )}
        <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectPrimitive.Trigger
            ref={ref}
            className={`
              w-full flex items-center justify-between px-3 py-3
              text-sm sm:text-base bg-bg-0 border rounded-sm
              focus:outline-none focus:ring-1 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-border-0 focus:border-brand focus:ring-brand'
              }
            `}
          >
            <SelectPrimitive.Value placeholder={placeholder || 'Select an option'} />
            <SelectPrimitive.Icon>
              <ChevronDown size={16} className="text-fg-2" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="overflow-hidden bg-bg-0 border border-border-0 rounded-sm shadow-lg z-50"
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="
                      relative flex items-center px-8 py-3 text-sm sm:text-base
                      text-fg-0 rounded-xs cursor-pointer select-none
                      focus:bg-bg-2 focus:outline-none
                      data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
                      data-[state=checked]:bg-bg-1
                    "
                  >
                    <SelectPrimitive.ItemIndicator className="absolute left-2 w-4 flex items-center justify-center">
                      <Check size={14} className="text-brand" strokeWidth={3} />
                    </SelectPrimitive.ItemIndicator>
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {error && (
          <p className="mt-1 text-xs text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-fg-3">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
