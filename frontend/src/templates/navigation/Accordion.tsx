import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

/**
 * Accordion Component (Radix UI)
 *
 * Collapsible content sections.
 * Mobile-friendly with touch targets.
 */

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = forwardRef<
  HTMLDivElement,
  AccordionPrimitive.AccordionItemProps
>(({ className = '', ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={`border-b border-border-0 ${className}`}
      {...props}
    />
  )
})

AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionPrimitive.AccordionTriggerProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`
          flex flex-1 items-center justify-between
          py-4 sm:py-5 text-sm sm:text-base font-medium text-left
          transition-all hover:text-brand
          focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
          group
          ${className}
        `}
        {...props}
      >
        {children}
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionPrimitive.AccordionContentProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm sm:text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={`pb-4 pt-0 ${className}`}>{children}</div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = 'AccordionContent'
