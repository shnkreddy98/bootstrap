import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

/**
 * Tanstack Router Setup
 *
 * Code-based router configuration (explicit over file-based magic).
 * All routes are defined here for easy discovery.
 */

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Not found route
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
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
