import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'

/**
 * Dropdown Menu Component (Radix UI)
 *
 * Accessible dropdown menu for actions and navigation.
 * Mobile-optimized with touch-friendly targets.
 */

export const Dropdown = DropdownMenuPrimitive.Root
export const DropdownTrigger = DropdownMenuPrimitive.Trigger
export const DropdownGroup = DropdownMenuPrimitive.Group
export const DropdownPortal = DropdownMenuPrimitive.Portal
export const DropdownSub = DropdownMenuPrimitive.Sub
export const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuContentProps
>(({ className = '', sideOffset = 4, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={`
          z-50 min-w-[12rem] overflow-hidden
          bg-bg-0 border border-border-0 rounded-sm shadow-lg
          p-1
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
          data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
          ${className}
        `}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
})

DropdownContent.displayName = 'DropdownContent'

export const DropdownItem = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps & { inset?: boolean }
>(({ className = '', inset, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={`
        relative flex items-center gap-2 px-3 py-3 text-sm sm:text-base
        rounded-xs cursor-pointer select-none
        text-fg-0 focus:bg-bg-2 focus:outline-none
        data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
        ${inset ? 'pl-8' : ''}
        ${className}
      `}
      {...props}
    />
  )
})

DropdownItem.displayName = 'DropdownItem'

export const DropdownCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
>(({ className = '', children, checked, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={`
        relative flex items-center gap-2 px-3 py-3 pl-8 text-sm sm:text-base
        rounded-xs cursor-pointer select-none
        text-fg-0 focus:bg-bg-2 focus:outline-none
        data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
        ${className}
      `}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center w-4 h-4">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check size={14} className="text-brand" strokeWidth={3} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem'

export const DropdownRadioItem = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuRadioItemProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={`
        relative flex items-center gap-2 px-3 py-3 pl-8 text-sm sm:text-base
        rounded-xs cursor-pointer select-none
        text-fg-0 focus:bg-bg-2 focus:outline-none
        data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center w-4 h-4">
        <DropdownMenuPrimitive.ItemIndicator>
          <div className="w-2 h-2 bg-brand rounded-full" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
})

DropdownRadioItem.displayName = 'DropdownRadioItem'

export const DropdownLabel = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuLabelProps & { inset?: boolean }
>(({ className = '', inset, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`
        px-3 py-2 text-xs font-medium text-fg-2
        ${inset ? 'pl-8' : ''}
        ${className}
      `}
      {...props}
    />
  )
})

DropdownLabel.displayName = 'DropdownLabel'

export const DropdownSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(({ className = '', ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`-mx-1 my-1 h-px bg-border-0 ${className}`}
      {...props}
    />
  )
})

DropdownSeparator.displayName = 'DropdownSeparator'

export const DropdownSubTrigger = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps & { inset?: boolean }
>(({ className = '', inset, children, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={`
        flex items-center gap-2 px-3 py-3 text-sm sm:text-base
        rounded-xs cursor-pointer select-none
        text-fg-0 focus:bg-bg-2
        data-[state=open]:bg-bg-2
        ${inset ? 'pl-8' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
      <ChevronRight size={16} className="ml-auto text-fg-2" />
    </DropdownMenuPrimitive.SubTrigger>
  )
})

DropdownSubTrigger.displayName = 'DropdownSubTrigger'

export const DropdownSubContent = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSubContentProps
>(({ className = '', ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={`
        z-50 min-w-[12rem] overflow-hidden
        bg-bg-0 border border-border-0 rounded-sm shadow-lg
        p-1
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        ${className}
      `}
      {...props}
    />
  )
})

DropdownSubContent.displayName = 'DropdownSubContent'
