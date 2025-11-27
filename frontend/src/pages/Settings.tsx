import { useState } from 'react'
import {
  Container,
  Stack,
  List,
  ListItem,
  ListSectionHeader,
  Switch,
  Divider,
  Card,
  Badge,
  Slider,
} from '../templates'
import {
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  Info,
  Volume2,
  Mail,
} from 'lucide-react'

/**
 * Settings Page
 *
 * App settings with switches, sliders, and navigation
 */

export function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [volume, setVolume] = useState([75])

  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="none">
        {/* Preferences */}
        <List divided>
          <ListSectionHeader>Preferences</ListSectionHeader>

          <ListItem
            leftContent={<Bell size={20} className="text-fg-2" />}
            title="Push Notifications"
            description="Receive push notifications for updates"
            rightContent={
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            }
          />

          <ListItem
            leftContent={<Moon size={20} className="text-fg-2" />}
            title="Dark Mode"
            description="Switch to dark theme"
            rightContent={
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            }
          />

          <ListItem
            leftContent={<Mail size={20} className="text-fg-2" />}
            title="Email Alerts"
            description="Get notified via email"
            rightContent={
              <Switch
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            }
          />
        </List>

        <Divider spacing="none" />

        {/* Volume Control */}
        <Card variant="default" padding="md">
          <Stack direction="vertical" spacing="md">
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-fg-2" />
              <span className="text-sm sm:text-base text-fg-0">Volume</span>
            </div>
            <Slider
              min={0}
              max={100}
              value={volume}
              onValueChange={setVolume}
              showValue
              formatValue={(v) => `${v}%`}
            />
          </Stack>
        </Card>

        <Divider spacing="none" />

        {/* General */}
        <List divided>
          <ListSectionHeader>General</ListSectionHeader>

          <ListItem
            leftContent={<Globe size={20} className="text-fg-2" />}
            title="Language"
            description="English"
            showChevron
            interactive
            onClick={() => {
              // TODO: Navigate to language settings
            }}
          />

          <ListItem
            leftContent={<Shield size={20} className="text-fg-2" />}
            title="Privacy & Security"
            description="Manage your privacy settings"
            showChevron
            interactive
            onClick={() => {
              // TODO: Navigate to privacy settings
            }}
          />
        </List>

        <Divider spacing="none" />

        {/* Support */}
        <List divided>
          <ListSectionHeader>Support</ListSectionHeader>

          <ListItem
            leftContent={<HelpCircle size={20} className="text-fg-2" />}
            title="Help Center"
            description="Get help and support"
            showChevron
            interactive
            onClick={() => {
              // TODO: Navigate to help center
            }}
          />

          <ListItem
            leftContent={<Info size={20} className="text-fg-2" />}
            title="About"
            description="Version 1.0.0"
            rightContent={<Badge variant="primary">Latest</Badge>}
            showChevron
            interactive
            onClick={() => {
              // TODO: Navigate to about page
            }}
          />
        </List>

        {/* Bottom padding for navigation */}
        <div className="h-20" />
      </Stack>
    </Container>
  )
}
