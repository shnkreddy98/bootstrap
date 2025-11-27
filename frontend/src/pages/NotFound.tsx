import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

/**
 * 404 Not Found Page
 *
 * Simple terminal-inspired 404 page
 */

export function NotFound() {
  return (
    <div className="min-h-screen bg-bg-0 flex items-center justify-center p-4 sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-mono text-fg-0 mb-3 sm:mb-4">
          404
        </h1>
        <p className="text-xs sm:text-sm text-fg-2 mb-4 sm:mb-6">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white text-sm sm:text-base rounded-sm hover:opacity-90 transition-opacity no-underline min-h-[44px]"
        >
          <Home size={18} className="sm:w-4 sm:h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
