import * as ToastPrimitive from '@radix-ui/react-toast'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'

/**
 * Toast Component (Radix UI)
 *
 * Non-blocking notifications that auto-dismiss.
 * Mobile-optimized positioning.
 */

const toastVariants = cva(
  'flex items-start gap-3 p-4 sm:p-5 rounded-sm border shadow-lg max-w-sm sm:max-w-md w-full bg-bg-0',
  {
    variants: {
      variant: {
        default: 'border-border-0',
        info: 'border-info',
        success: 'border-success',
        warning: 'border-warning',
        error: 'border-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
}

const iconColorMap = {
  default: 'text-fg-2',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
}

export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ variant = 'default', title, description, open, onOpenChange, duration = 5000 }, ref) => {
    const Icon = variant ? iconMap[variant] : iconMap.default

    return (
      <ToastPrimitive.Root
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        duration={duration}
        className={toastVariants({ variant })}
      >
        <div className={`shrink-0 mt-0.5 ${variant ? iconColorMap[variant] : iconColorMap.default}`}>
          <Icon size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <ToastPrimitive.Title className="text-sm sm:text-base font-medium text-fg-0 mb-1">
            {title}
          </ToastPrimitive.Title>
          {description && (
            <ToastPrimitive.Description className="text-xs sm:text-sm text-fg-2">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>

        <ToastPrimitive.Close className="shrink-0 text-fg-2 hover:text-fg-0 transition-colors p-1" aria-label="Close">
          <X size={16} />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    )
  }
)

Toast.displayName = 'Toast'

/**
 * Toast Provider
 * Wrap your app with this to enable toasts
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 p-4 sm:p-6 flex flex-col gap-2 sm:gap-3 z-50 max-w-full sm:max-w-md" />
    </ToastPrimitive.Provider>
  )
}
