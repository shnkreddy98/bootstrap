import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'

/**
 * Alert Component
 *
 * Display important messages to users.
 * Mobile-first responsive design.
 */

const alertVariants = cva(
  'flex gap-3 p-3 sm:p-4 rounded-sm border',
  {
    variants: {
      variant: {
        info: 'bg-info-bg border-info text-fg-0',
        success: 'bg-success-bg border-success text-fg-0',
        warning: 'bg-warning-bg border-warning text-fg-0',
        error: 'bg-error-bg border-error text-fg-0',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
}

const iconColorMap = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  onClose?: () => void
  icon?: React.ReactNode
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, description, onClose, icon, children, ...props }, ref) => {
    const Icon = variant ? iconMap[variant] : iconMap.info

    return (
      <div
        ref={ref}
        role="alert"
        className={alertVariants({ variant, className })}
        {...props}
      >
        <div className={`shrink-0 mt-0.5 ${variant ? iconColorMap[variant] : iconColorMap.info}`}>
          {icon || <Icon size={18} />}
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm sm:text-base font-medium mb-1">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-xs sm:text-sm opacity-90">
              {description}
            </p>
          )}
          {children}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 text-fg-2 hover:text-fg-0 transition-colors p-1"
            aria-label="Close alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'
