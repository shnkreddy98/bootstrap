import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

/**
 * 404 Not Found Page
 *
 * Simple terminal-inspired 404 page
 */

export function NotFound() {
  return (
    <div className="min-h-screen bg-bg-0 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-mono text-fg-0 mb-4">
          404
        </h1>
        <p className="text-sm text-fg-2 mb-6">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm rounded-sm hover:opacity-90 transition-opacity no-underline"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
