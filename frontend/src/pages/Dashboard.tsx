import { useStats, useRecentActivity } from '../lib/queries'
import {
  Container,
  Stack,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Progress,
  Spinner,
  Alert,
  List,
  ListItem,
  Avatar,
} from '../templates'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react'

/**
 * Dashboard Page - Stats Dashboard Template
 *
 * Features:
 * - Stat cards with trends
 * - Progress bars
 * - Recent activity list
 * - Color-coded metrics
 */

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useStats()
  const { data: activity, isLoading: activityLoading } = useRecentActivity()

  if (statsLoading || activityLoading) {
    return (
      <Container size="lg" padding="md">
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" color="brand" />
        </div>
      </Container>
    )
  }

  if (statsError) {
    return (
      <Container size="lg" padding="md">
        <Alert
          variant="error"
          title="Error loading dashboard"
          description={statsError.message}
        />
      </Container>
    )
  }

  return (
    <Container size="lg" padding="none">
      <Stack direction="vertical" spacing="lg">
        {/* Header */}
        <Card variant="default" padding="md">
          <h1 className="text-xl sm:text-2xl font-mono text-fg-0">Dashboard</h1>
          <p className="text-xs sm:text-sm text-fg-2 mt-1">
            Welcome back! Here's your overview
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {/* Total Revenue */}
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-fg-2">Total Revenue</p>
                  <p className="text-2xl font-mono text-fg-0 mt-1">
                    ${stats?.revenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign size={20} className="text-success" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                {stats?.revenueTrend && stats.revenueTrend > 0 ? (
                  <>
                    <TrendingUp size={14} className="text-success" />
                    <Badge variant="success" size="sm">
                      +{stats?.revenueTrend}%
                    </Badge>
                  </>
                ) : (
                  <>
                    <TrendingDown size={14} className="text-error" />
                    <Badge variant="error" size="sm">
                      {stats?.revenueTrend}%
                    </Badge>
                  </>
                )}
              </div>
              <Progress value={75} className="mt-3" size="sm" />
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-fg-2">Total Users</p>
                  <p className="text-2xl font-mono text-fg-0 mt-1">
                    {stats?.users.toLocaleString()}
                  </p>
                </div>
                <Users size={20} className="text-brand" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp size={14} className="text-success" />
                <Badge variant="success" size="sm">
                  +{stats?.usersTrend}%
                </Badge>
              </div>
              <Progress value={60} className="mt-3" size="sm" />
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-fg-2">Total Orders</p>
                  <p className="text-2xl font-mono text-fg-0 mt-1">
                    {stats?.orders.toLocaleString()}
                  </p>
                </div>
                <ShoppingCart size={20} className="text-warning" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp size={14} className="text-success" />
                <Badge variant="primary" size="sm">
                  +{stats?.ordersTrend}%
                </Badge>
              </div>
              <Progress value={85} className="mt-3" size="sm" />
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-fg-2">Active Sessions</p>
                  <p className="text-2xl font-mono text-fg-0 mt-1">
                    {stats?.activeSessions}
                  </p>
                </div>
                <Activity size={20} className="text-info" />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="info" size="sm">
                  Live
                </Badge>
              </div>
              <Progress value={40} className="mt-3" size="sm" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="px-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activity && activity.length > 0 ? (
                <List divided>
                  {activity.map((item) => (
                    <ListItem
                      key={item.id}
                      leftContent={
                        <Avatar
                          src={item.userAvatar}
                          fallback={item.userName[0]}
                          size="md"
                        />
                      }
                      title={item.action}
                      description={`${item.userName} • ${new Date(item.timestamp).toLocaleString()}`}
                      rightContent={
                        <Badge
                          variant={
                            item.type === 'purchase'
                              ? 'success'
                              : item.type === 'signup'
                              ? 'primary'
                              : 'default'
                          }
                        >
                          {item.type}
                        </Badge>
                      }
                    />
                  ))}
                </List>
              ) : (
                <p className="text-sm text-fg-2 text-center py-4">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Stack>
    </Container>
  )
}
