import { useMe, useConfig } from '../lib/queries'

export function UserBadge() {
  const { data: user, isLoading: userLoading, error: userError } = useMe()
  const { data: config, isLoading: configLoading } = useConfig()

  const authUrl = config?.externalAuthUrl || '/login'
  const isLoading = userLoading || configLoading
  const error = userError

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        Loading...
      </div>
    )
  }

  if (error || !user) {
    return (
      <a
        href={authUrl}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </a>
    )
  }

  if (user.isAnonymous) {
    return (
      <a
        href={authUrl}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </a>
    )
  }

  const displayName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.email || 'User'

  const initials = user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : (user.email?.[0] || 'U').toUpperCase()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {displayName}
        </span>
      </div>
    </div>
  )
}
