import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from './api'

/**
 * Tanstack Query Hooks
 *
 * Query factory pattern for organizing and reusing queries
 */

// Query keys
export const todoKeys = {
  all: ['todos'] as const,
}

/**
 * Fetch all todos
 */
export function useTodos() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: fetchTodos,
  })
}

/**
 * Create a new todo
 */
export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after creating
      queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}

/**
 * Toggle todo completion
 */
export function useToggleTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodo(id, completed),
    onSuccess: () => {
      // Invalidate and refetch todos after toggling
      queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}

/**
 * Delete a todo
 */
export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after deleting
      queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}
