import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef, ReactNode } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

/**
 * Bottom Sheet Component
 *
 * Sheet that slides up from bottom, common in mobile UIs.
 * Built on Radix Dialog for accessibility.
 * Safe area aware for iOS devices.
 */

export interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function BottomSheet({ open, onOpenChange, children }: BottomSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

export const BottomSheetTrigger = Dialog.Trigger

export interface BottomSheetContentProps extends Dialog.DialogContentProps {
  showHandle?: boolean
  showClose?: boolean
  snapPoints?: Array<number | string>
}

export const BottomSheetContent = forwardRef<HTMLDivElement, BottomSheetContentProps>(
  ({ children, showHandle = true, showClose = false, className = '', ...props }, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-fg-0/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          ref={ref}
          className={`
            fixed left-0 right-0 bottom-0 z-50
            bg-bg-0 border-t border-border-0 rounded-t-lg shadow-xl
            max-h-[90vh] flex flex-col
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
            ${className}
          `}
          style={{
            paddingBottom: 'var(--safe-area-inset-bottom)',
          }}
          aria-describedby={undefined}
          {...props}
        >
          {/* Hidden title for accessibility (will be overridden if BottomSheetTitle is provided) */}
          <VisuallyHidden.Root>
            <Dialog.Title>Sheet</Dialog.Title>
          </VisuallyHidden.Root>

          {/* Handle */}
          {showHandle && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-border-1 rounded-full" />
            </div>
          )}

          {/* Close Button */}
          {showClose && (
            <Dialog.Close className="absolute right-4 top-4 text-fg-2 hover:text-fg-0 transition-colors p-2 z-10">
              <X size={20} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    )
  }
)

BottomSheetContent.displayName = 'BottomSheetContent'

/**
 * Bottom Sheet Header
 */
export function BottomSheetHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 pt-4 pb-4 border-b border-border-0 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Bottom Sheet Title
 */
export const BottomSheetTitle = forwardRef<HTMLHeadingElement, Dialog.DialogTitleProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <Dialog.Title
        ref={ref}
        className={`text-lg sm:text-xl font-mono text-fg-0 ${className}`}
        {...props}
      />
    )
  }
)

BottomSheetTitle.displayName = 'BottomSheetTitle'

/**
 * Bottom Sheet Description
 */
export const BottomSheetDescription = forwardRef<HTMLParagraphElement, Dialog.DialogDescriptionProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <Dialog.Description
        ref={ref}
        className={`mt-2 text-xs sm:text-sm text-fg-2 ${className}`}
        {...props}
      />
    )
  }
)

BottomSheetDescription.displayName = 'BottomSheetDescription'

/**
 * Bottom Sheet Body
 */
export function BottomSheetBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Bottom Sheet Footer
 */
export function BottomSheetFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-border-0 ${className}`}>
      {children}
    </div>
  )
}
