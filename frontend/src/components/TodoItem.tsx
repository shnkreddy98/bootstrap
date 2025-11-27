import { Checkbox } from 'radix-ui'
import { Check, Trash2 } from 'lucide-react'
import type { Todo } from '../schemas'

/**
 * TodoItem Component
 *
 * Displays a single todo with:
 * - Radix Checkbox for completion toggle
 * - Title with strike-through when completed
 * - Delete button
 *
 * Styled with terminal-inspired theme
 */

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-bg-1 border border-border-0 rounded-sm hover:bg-bg-2 transition-colors">
      {/* Radix Checkbox - Accessible, styled with terminal theme */}
      <Checkbox.Root
        checked={todo.completed}
        onCheckedChange={(checked) => onToggle(todo.id, checked === true)}
        className="w-6 h-6 sm:w-5 sm:h-5 border-2 border-border-0 rounded-xs flex items-center justify-center
                   data-[state=checked]:bg-brand data-[state=checked]:border-brand
                   transition-colors cursor-pointer shrink-0"
      >
        <Checkbox.Indicator>
          <Check size={16} className="text-white sm:w-[14px] sm:h-[14px]" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span
        className={`flex-1 text-sm sm:text-base transition-colors break-words ${
          todo.completed
            ? 'text-fg-2 line-through'
            : 'text-fg-0'
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-error hover:text-error/80 transition-colors p-2 shrink-0"
        aria-label="Delete todo"
      >
        <Trash2 size={18} className="sm:w-4 sm:h-4" />
      </button>
    </div>
  )
}
