import { useTodos, useCreateTodo, useToggleTodo, useDeleteTodo } from '../lib/queries'
import { TodoItem } from '../components/TodoItem'
import { TodoForm } from '../components/TodoForm'
import { Loader2 } from 'lucide-react'

/**
 * Home Page
 *
 * Main todo list page with:
 * - Todo form for creating new items
 * - List of all todos
 * - Loading and error states
 */

export function Home() {
  const { data: todos, isLoading, error } = useTodos()
  const createTodo = useCreateTodo()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  const handleCreateTodo = (title: string) => {
    createTodo.mutate({ title, completed: false })
  }

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleTodo.mutate({ id, completed })
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate(id)
  }

  return (
    <div className="min-h-screen bg-bg-0 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-mono text-fg-0 mb-2">
            Terminal Todo
          </h1>
          <p className="text-sm text-fg-2">
            A simple todo app with a terminal-inspired aesthetic
          </p>
        </div>

        {/* Create Todo Form */}
        <div className="mb-6">
          <TodoForm
            onSubmit={handleCreateTodo}
            isLoading={createTodo.isPending}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-fg-2" size={32} />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 bg-error-bg border border-error rounded-sm">
              <p className="text-sm text-error">
                Failed to load todos: {error.message}
              </p>
            </div>
          )}

          {/* Empty State */}
          {todos && todos.length === 0 && (
            <div className="p-8 text-center border border-border-0 rounded-sm bg-bg-1">
              <p className="text-sm text-fg-2">
                No todos yet. Add one above to get started!
              </p>
            </div>
          )}

          {/* Todo Items */}
          {todos && todos.length > 0 && (
            <>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </>
          )}
        </div>

        {/* Stats */}
        {todos && todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border-0">
            <p className="text-xs text-fg-2 text-center font-mono">
              {todos.filter(t => !t.completed).length} active ·{' '}
              {todos.filter(t => t.completed).length} completed ·{' '}
              {todos.length} total
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
