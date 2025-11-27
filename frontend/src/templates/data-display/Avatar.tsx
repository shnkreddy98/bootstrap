import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Avatar Component (Radix UI)
 *
 * User profile images with fallback support.
 */

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback: string
  className?: string
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, size, className = '' }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={avatarVariants({ size, className })}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className="flex h-full w-full items-center justify-center bg-bg-2 text-fg-0 font-medium"
          delayMs={600}
        >
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    )
  }
)

Avatar.displayName = 'Avatar'

/**
 * Avatar Group
 * Displays multiple avatars with overlap
 */
export function AvatarGroup({
  children,
  max = 3,
  className = '',
}: {
  children: React.ReactNode
  max?: number
  className?: string
}) {
  const childArray = React.Children.toArray(children)
  const displayChildren = childArray.slice(0, max)
  const remaining = childArray.length - max

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayChildren}
      {remaining > 0 && (
        <div className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 bg-bg-2 text-fg-0 border-2 border-bg-0">
          <span className="flex h-full w-full items-center justify-center text-xs font-medium">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  )
}
