import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  fetchMe,
  fetchConfig,
  fetchPosts,
  createPost,
  fetchProducts,
  fetchStats,
  fetchRecentActivity,
} from './api'

/**
 * Tanstack Query Hooks
 *
 * Query factory pattern for organizing and reusing queries
 */

// Query keys
export const todoKeys = {
  all: ['todos'] as const,
}

export const userKeys = {
  me: ['user', 'me'] as const,
}

export const configKeys = {
  config: ['config'] as const,
}

/**
 * Fetch runtime configuration
 */
export function useConfig() {
  return useQuery({
    queryKey: configKeys.config,
    queryFn: fetchConfig,
    staleTime: Infinity, // Config doesn't change during session
    retry: false,
  })
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

/**
 * Fetch current user info
 */
export function useMe() {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: fetchMe,
    retry: false, // Don't retry on 401 errors
  })
}

/**
 * Fetch all posts (for Feed)
 */
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

/**
 * Create a new post
 */
export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

/**
 * Fetch all products (for E-commerce)
 */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

/**
 * Fetch dashboard stats
 */
export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  })
}

/**
 * Fetch recent activity
 */
export function useRecentActivity() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: fetchRecentActivity,
  })
}
