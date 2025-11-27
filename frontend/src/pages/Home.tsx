import { useState, useEffect } from 'react'
import { useTodos, useCreateTodo, useToggleTodo, useDeleteTodo } from '../lib/queries'
import { TodoItem } from '../components/TodoItem'
import {
  Container,
  Stack,
  Card,
  Alert,
  Spinner,
  List,
  ListEmptyState,
  SearchBar,
  Chip,
  ChipGroup,
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetBody,
  Input,
  Button,
} from '../templates'
import { Plus, CheckCircle } from 'lucide-react'

/**
 * Home Page
 *
 * Main todo list page with mobile-first design
 */

export function Home() {
  const { data: todos, isLoading, error } = useTodos()
  const createTodo = useCreateTodo()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const handleCreateTodo = () => {
    if (newTodoTitle.trim()) {
      createTodo.mutate({ title: newTodoTitle.trim(), completed: false })
      setNewTodoTitle('')
      setIsAddSheetOpen(false)
    }
  }

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleTodo.mutate({ id, completed })
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate(id)
  }

  // Filter todos
  const filteredTodos = todos?.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && !todo.completed) ||
      (filterStatus === 'completed' && todo.completed)
    return matchesSearch && matchesFilter
  })

  const activeTodos = todos?.filter(t => !t.completed).length || 0
  const completedTodos = todos?.filter(t => t.completed).length || 0

  // Listen for FAB click to open bottom sheet
  useEffect(() => {
    const handleOpenAddTodo = () => setIsAddSheetOpen(true)
    window.addEventListener('openAddTodo', handleOpenAddTodo)
    return () => window.removeEventListener('openAddTodo', handleOpenAddTodo)
  }, [])

  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="none">
        {/* Stats Card */}
        <Card variant="default" padding="md">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-mono text-brand mb-1">{completedTodos}</p>
              <p className="text-xs text-fg-2">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-mono text-warning mb-1">{activeTodos}</p>
              <p className="text-xs text-fg-2">Active</p>
            </div>
            <div>
              <p className="text-2xl font-mono text-fg-0 mb-1">{todos?.length || 0}</p>
              <p className="text-xs text-fg-2">Total</p>
            </div>
          </div>
        </Card>

        {/* Search & Filters */}
        <div className="p-4 space-y-3">
          <SearchBar
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            fullWidth
          />

          <ChipGroup>
            <Chip
              label="All"
              variant={filterStatus === 'all' ? 'primary' : 'default'}
              onClick={() => setFilterStatus('all')}
              clickable
            />
            <Chip
              label="Active"
              variant={filterStatus === 'active' ? 'primary' : 'default'}
              onClick={() => setFilterStatus('active')}
              clickable
            />
            <Chip
              label="Completed"
              variant={filterStatus === 'completed' ? 'primary' : 'default'}
              onClick={() => setFilterStatus('completed')}
              clickable
            />
          </ChipGroup>
        </div>

        {/* Error State */}
        {error && (
          <div className="px-4">
            <Alert
              variant="error"
              title="Failed to load todos"
              description={error.message}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" color="brand" />
          </div>
        )}

        {/* Todo List */}
        {!isLoading && filteredTodos && (
          <>
            {filteredTodos.length === 0 ? (
              <ListEmptyState
                icon={<CheckCircle size={48} className="text-fg-3" />}
                title={searchQuery ? 'No todos found' : 'No todos yet'}
                description={searchQuery ? 'Try a different search term' : 'Tap the + button to add your first todo'}
                action={
                  !searchQuery && (
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={18} />}
                      onClick={() => setIsAddSheetOpen(true)}
                    >
                      Add Todo
                    </Button>
                  )
                }
              />
            ) : (
              <List divided>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </List>
            )}
          </>
        )}
      </Stack>

      {/* Add Todo Bottom Sheet */}
      <BottomSheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <BottomSheetContent showHandle>
          <BottomSheetHeader>
            <BottomSheetTitle>Add New Todo</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
            <Stack direction="vertical" spacing="lg">
              <Input
                label="What needs to be done?"
                placeholder="Enter todo title..."
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleCreateTodo()
                  }
                }}
                autoFocus
              />
              <Button
                variant="primary"
                fullWidth
                leftIcon={<Plus size={18} />}
                onClick={handleCreateTodo}
                disabled={!newTodoTitle.trim() || createTodo.isPending}
                loading={createTodo.isPending}
              >
                Add Todo
              </Button>
            </Stack>
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    </Container>
  )
}
