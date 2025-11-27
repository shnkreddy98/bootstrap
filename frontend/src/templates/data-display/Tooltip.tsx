import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef } from 'react'

/**
 * Tooltip Component (Radix UI)
 *
 * Contextual information on hover/focus.
 * Mobile-friendly with touch support.
 */

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = forwardRef<
  HTMLDivElement,
  TooltipPrimitive.TooltipContentProps
>(({ className = '', sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`
        z-50 overflow-hidden rounded-sm bg-fg-0 px-3 py-2
        text-xs sm:text-sm text-white shadow-md
        animate-in fade-in-0 zoom-in-95
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
        data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        ${className}
      `}
      {...props}
    />
  )
})

TooltipContent.displayName = 'TooltipContent'
