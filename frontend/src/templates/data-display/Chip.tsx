import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

/**
 * Chip Component (Tags, Pills, Filters)
 *
 * Compact elements for tags, filters, selections, or quick actions.
 * Mobile-optimized with touch-friendly interactions.
 */

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-bg-2 text-fg-0 border border-border-0 hover:bg-bg-3',
        primary: 'bg-brand/10 text-brand border border-brand/20 hover:bg-brand/20',
        success: 'bg-success/10 text-success border border-success/20 hover:bg-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20 hover:bg-warning/20',
        error: 'bg-error/10 text-error border border-error/20 hover:bg-error/20',
        outlined: 'bg-transparent text-fg-0 border-2 border-border-1 hover:bg-bg-1',
      },
      size: {
        sm: 'px-2 py-1 text-xs h-6',
        md: 'px-3 py-1.5 text-xs sm:text-sm h-7 sm:h-8',
        lg: 'px-4 py-2 text-sm sm:text-base h-9 sm:h-10',
      },
      clickable: {
        true: 'cursor-pointer active:scale-95',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      clickable: false,
    },
  }
)

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof chipVariants> {
  label: string
  icon?: ReactNode
  onRemove?: () => void
  onClick?: () => void
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, clickable, label, icon, onRemove, onClick, ...props }, ref) => {
    const isClickable = clickable || !!onClick

    return onClick ? (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        type="button"
        className={chipVariants({
          variant,
          size,
          clickable: isClickable,
          className,
        })}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="shrink-0 hover:bg-fg-0/10 rounded-full p-0.5 transition-colors"
            aria-label="Remove"
          >
            <X size={14} />
          </button>
        )}
      </button>
    ) : (
      <div
        ref={ref}
        className={chipVariants({
          variant,
          size,
          clickable: isClickable,
          className,
        })}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="shrink-0 hover:bg-fg-0/10 rounded-full p-0.5 transition-colors"
            aria-label="Remove"
          >
            <X size={14} />
          </button>
        )}
      </div>
    )
  }
)

Chip.displayName = 'Chip'

/**
 * Chip Group
 * For displaying multiple chips with proper spacing
 */
export function ChipGroup({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  )
}
