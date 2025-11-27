import { useState } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import {
  AppBar,
  BottomNav,
  BottomNavItem,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  Divider,
  Avatar,
  FAB,
} from '../templates'
import {
  Home,
  Settings,
  User,
  Plus,
  CheckSquare,
  Info,
  HelpCircle,
  LogOut,
} from 'lucide-react'

/**
 * App Layout Component
 *
 * Main layout with AppBar, BottomNav, and Drawer
 * Wraps all pages in the app
 */

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const currentPath = location.pathname

  const handleNavigation = (path: string) => {
    navigate({ to: path })
  }

  const handleDrawerNavigation = (path: string) => {
    setDrawerOpen(false)
    setTimeout(() => navigate({ to: path }), 300)
  }

  // Determine page title based on route
  const getPageTitle = () => {
    switch (currentPath) {
      case '/':
        return 'Terminal Todo'
      case '/profile':
        return 'Profile'
      case '/settings':
        return 'Settings'
      default:
        return 'Terminal Todo'
    }
  }

  // Trigger add todo event for Home page
  const handleAddClick = () => {
    window.dispatchEvent(new CustomEvent('openAddTodo'))
  }

  return (
    <div className="min-h-screen bg-bg-0 flex flex-col">
      {/* Top App Bar */}
      <AppBar
        title={getPageTitle()}
        leftAction="menu"
        onLeftActionClick={() => setDrawerOpen(true)}
        rightActions={
          <button
            onClick={() => handleNavigation('/profile')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-bg-1 transition-colors"
            aria-label="Profile"
          >
            <User size={22} className="text-fg-0" />
          </button>
        }
        sticky
      />

      {/* Side Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent side="left">
          <DrawerHeader>
            {/* User Profile in Drawer */}
            <div className="flex items-center gap-3 py-2">
              <Avatar
                src="/avatar.jpg"
                alt="John Doe"
                fallback="JD"
                size="lg"
              />
              <div>
                <p className="text-base font-medium text-fg-0">John Doe</p>
                <p className="text-xs text-fg-3">john.doe@example.com</p>
              </div>
            </div>
          </DrawerHeader>

          <DrawerBody>
            <List divided={false}>
              <ListItem
                leftContent={<Home size={20} />}
                title="Home"
                interactive
                onClick={() => handleDrawerNavigation('/')}
              />
              <ListItem
                leftContent={<CheckSquare size={20} />}
                title="My Todos"
                interactive
                onClick={() => handleDrawerNavigation('/')}
              />
              <ListItem
                leftContent={<User size={20} />}
                title="Profile"
                interactive
                onClick={() => handleDrawerNavigation('/profile')}
              />
              <ListItem
                leftContent={<Settings size={20} />}
                title="Settings"
                interactive
                onClick={() => handleDrawerNavigation('/settings')}
              />

              <Divider spacing="md" />

              <ListItem
                leftContent={<Info size={20} />}
                title="About"
                interactive
                onClick={() => {
                  // TODO: Navigate to about page
                }}
              />
              <ListItem
                leftContent={<HelpCircle size={20} />}
                title="Help & Support"
                interactive
                onClick={() => {
                  // TODO: Navigate to help page
                }}
              />

              <Divider spacing="md" />

              <ListItem
                leftContent={<LogOut size={20} className="text-error" />}
                title="Logout"
                interactive
                onClick={() => {
                  // TODO: Implement logout logic
                }}
                className="text-error"
              />
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Floating Action Button (only on home) */}
      {currentPath === '/' && (
        <FAB
          icon={<Plus size={24} />}
          position="bottom-center"
          onClick={handleAddClick}
          aria-label="Add todo"
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav>
        <BottomNavItem
          icon={<Home size={22} />}
          label="Home"
          active={currentPath === '/'}
          onClick={() => handleNavigation('/')}
        />
        <BottomNavItem
          icon={<Settings size={22} />}
          label="Settings"
          active={currentPath === '/settings'}
          onClick={() => handleNavigation('/settings')}
        />
      </BottomNav>
    </div>
  )
}
