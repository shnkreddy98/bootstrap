import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef } from 'react'

/**
 * Modal Component (Radix UI Dialog)
 *
 * Accessible modal dialog for important user interactions.
 * Mobile-first with full-screen option on small screens.
 */

export interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Modal({ open, onOpenChange, children }: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  )
}

/**
 * Modal Trigger
 */
export const ModalTrigger = DialogPrimitive.Trigger

/**
 * Modal Content
 */
export const ModalContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps & { fullScreenOnMobile?: boolean }
>(({ children, fullScreenOnMobile = false, className = '', ...props }, ref) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-fg-0/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        className={`
          fixed z-50 bg-bg-0 border border-border-0 shadow-xl
          ${fullScreenOnMobile
            ? 'inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sm sm:max-w-lg sm:w-full sm:max-h-[90vh]'
            : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm max-w-[calc(100%-2rem)] sm:max-w-lg w-full max-h-[90vh]'
          }
          overflow-y-auto
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
          data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
          ${className}
        `}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

ModalContent.displayName = 'ModalContent'

/**
 * Modal Header
 */
export function ModalHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 sm:p-6 border-b border-border-0 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Modal Title
 */
export const ModalTitle = forwardRef<HTMLHeadingElement, DialogPrimitive.DialogTitleProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={`text-lg sm:text-xl font-mono text-fg-0 ${className}`}
        {...props}
      />
    )
  }
)

ModalTitle.displayName = 'ModalTitle'

/**
 * Modal Description
 */
export const ModalDescription = forwardRef<HTMLParagraphElement, DialogPrimitive.DialogDescriptionProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={`mt-2 text-xs sm:text-sm text-fg-2 ${className}`}
        {...props}
      />
    )
  }
)

ModalDescription.displayName = 'ModalDescription'

/**
 * Modal Body
 */
export function ModalBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Modal Footer
 */
export function ModalFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 sm:p-6 border-t border-border-0 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end ${className}`}>
      {children}
    </div>
  )
}

/**
 * Modal Close Button
 */
export function ModalClose() {
  return (
    <DialogPrimitive.Close className="absolute right-3 top-3 sm:right-4 sm:top-4 text-fg-2 hover:text-fg-0 transition-colors p-2">
      <X size={18} />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  )
}
