import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { AppLayout } from '../components/AppLayout'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Settings } from '../pages/Settings'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
import { NotFound } from '../pages/NotFound'
import { FeedPage } from '../pages/Feed'
import { ProductsPage } from '../pages/Products'
import { DashboardPage } from '../pages/Dashboard'
import { ContactPage } from '../pages/Contact'

/**
 * Tanstack Router Setup
 *
 * Code-based router configuration with mobile app layout
 */

// Root route - just renders outlet without any wrapper
const rootRoute = createRootRoute({
  component: Outlet,
})

// Root route with AppLayout for authenticated pages
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
})

// App routes (with AppLayout)
const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: Home,
})

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/profile',
  component: Profile,
})

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/settings',
  component: Settings,
})

const feedRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/feed',
  component: FeedPage,
})

const productsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/products',
  component: ProductsPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const contactRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/contact',
  component: ContactPage,
})

// Auth routes (without AppLayout)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
})

// Not found route
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    profileRoute,
    settingsRoute,
    feedRoute,
    productsRoute,
    dashboardRoute,
    contactRoute,
  ]),
  loginRoute,
  signupRoute,
  notFoundRoute,
])

// Create and export router
export const router = createRouter({
  routeTree,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
