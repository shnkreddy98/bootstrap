import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef } from 'react'

/**
 * Switch Component (Radix UI)
 *
 * iOS-style toggle switch for boolean values.
 */

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, label, description, disabled }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <SwitchPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="
            w-[58px] h-[34px] shrink-0
            bg-bg-3 rounded-full relative cursor-pointer
            transition-colors
            data-[state=checked]:bg-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
          "
        >
          <SwitchPrimitive.Thumb
            className="
              block w-[30px] h-[30px]
              bg-white rounded-full
              transition-transform duration-200
              translate-x-[2px] translate-y-[2px]
              data-[state=checked]:translate-x-[26px]
              shadow-md
            "
          />
        </SwitchPrimitive.Root>

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label className="block text-sm sm:text-base text-fg-0 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-fg-3">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
