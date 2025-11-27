import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { forwardRef, ReactNode } from 'react'

/**
 * Checkbox Component (Radix UI)
 *
 * Accessible checkbox with iOS-friendly touch targets.
 */

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: ReactNode
  description?: string
  disabled?: boolean
  error?: string
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onCheckedChange, label, description, disabled, error }, ref) => {
    return (
      <div className="flex items-start gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="
            w-[18px] h-[18px] shrink-0 mt-0.5
            border-2 rounded-xs flex items-center justify-center
            transition-colors cursor-pointer
            data-[state=checked]:bg-brand data-[state=checked]:border-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            border-border-0 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
          "
        >
          <CheckboxPrimitive.Indicator>
            <Check size={14} className="text-white" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label className="block text-sm text-fg-0 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-fg-3">{description}</p>
            )}
            {error && (
              <p className="mt-1 text-xs text-error">{error}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
