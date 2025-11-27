import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef, ReactNode } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

/**
 * Drawer Component (Side Navigation Drawer)
 *
 * Sliding drawer from left/right for navigation and actions.
 * Built on Radix Dialog for accessibility.
 */

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

export const DrawerTrigger = Dialog.Trigger

export interface DrawerContentProps extends Dialog.DialogContentProps {
  side?: 'left' | 'right'
  showClose?: boolean
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, side = 'left', showClose = true, className = '', ...props }, ref) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-fg-0/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          ref={ref}
          className={`
            fixed z-50 bg-bg-0 shadow-xl
            ${side === 'left' ? 'left-0 top-0 bottom-0' : 'right-0 top-0 bottom-0'}
            w-[85vw] sm:w-[320px] max-w-md
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            ${side === 'left'
              ? 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
              : 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
            }
            ${className}
          `}
          style={{
            paddingTop: 'var(--safe-area-inset-top)',
            paddingBottom: 'var(--safe-area-inset-bottom)',
          }}
          aria-describedby={undefined}
          {...props}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Navigation Menu</Dialog.Title>
          </VisuallyHidden.Root>
          {children}
          {showClose && (
            <Dialog.Close className="absolute right-4 top-4 text-fg-2 hover:text-fg-0 transition-colors p-2">
              <X size={20} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    )
  }
)

DrawerContent.displayName = 'DrawerContent'

/**
 * Drawer Header
 */
export function DrawerHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-b border-border-0 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Drawer Title
 */
export const DrawerTitle = forwardRef<HTMLHeadingElement, Dialog.DialogTitleProps>(
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

DrawerTitle.displayName = 'DrawerTitle'

/**
 * Drawer Body
 */
export function DrawerBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Drawer Footer
 */
export function DrawerFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-t border-border-0 ${className}`}>
      {children}
    </div>
  )
}
