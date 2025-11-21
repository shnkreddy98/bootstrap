import { useState, FormEvent } from 'react'
import { Plus } from 'lucide-react'

/**
 * TodoForm Component
 *
 * Form for creating new todos.
 * Simple, terminal-inspired styling.
 */

interface TodoFormProps {
  onSubmit: (title: string) => void
  isLoading?: boolean
}

export function TodoForm({ onSubmit, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={isLoading}
        className="flex-1 px-3 py-2 text-sm bg-bg-0 border border-border-0 rounded-sm
                   focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand
                   disabled:opacity-50 disabled:cursor-not-allowed
                   placeholder:text-fg-3 transition-colors"
      />

      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="px-4 py-2 bg-brand text-white text-sm rounded-sm
                   hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-opacity flex items-center gap-2"
      >
        <Plus size={16} />
        Add
      </button>
    </form>
  )
}
