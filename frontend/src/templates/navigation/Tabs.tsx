import * as TabsPrimitive from '@radix-ui/react-tabs'
import { forwardRef } from 'react'

/**
 * Tabs Component (Radix UI)
 *
 * Accessible tabs for organizing content.
 * Mobile-first with scrollable tab list.
 */

export const Tabs = TabsPrimitive.Root

export const TabsList = forwardRef<
  HTMLDivElement,
  TabsPrimitive.TabsListProps
>(({ className = '', ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={`
        inline-flex gap-1 p-1 bg-bg-1 border border-border-0 rounded-sm
        overflow-x-auto scrollbar-thin
        ${className}
      `}
      {...props}
    />
  )
})

TabsList.displayName = 'TabsList'

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  TabsPrimitive.TabsTriggerProps
>(({ className = '', ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={`
        px-4 py-2 text-sm sm:text-base font-medium rounded-xs
        transition-all whitespace-nowrap
        text-fg-2 hover:text-fg-0
        data-[state=active]:bg-bg-0 data-[state=active]:text-fg-0 data-[state=active]:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  )
})

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = forwardRef<
  HTMLDivElement,
  TabsPrimitive.TabsContentProps
>(({ className = '', ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={`
        mt-4 sm:mt-6
        focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-sm
        ${className}
      `}
      {...props}
    />
  )
})

TabsContent.displayName = 'TabsContent'
