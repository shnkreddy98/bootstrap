/**
 * Template Component Examples
 *
 * Copy and paste these examples into your components.
 * Uncomment the sections you need.
 */

import {
  // Forms
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,

  // Buttons
  Button,
  IconButton,
  ButtonGroup,

  // Layout
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Stack,
  Divider,

  // Feedback
  Alert,
  Toast,
  ToastProvider,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Spinner,

  // Navigation
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  // Data Display
  Badge,
  Avatar,
  Progress,
} from './index'

import { Save, Settings, User, LogOut } from 'lucide-react'
import { useState } from 'react'

/**
 * Example 1: Complete Form
 */
export function FormExample() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    country: '',
    terms: false,
    plan: '',
    notifications: false,
  })

  return (
    <Container size="sm">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Get in touch with us</CardDescription>
        </CardHeader>

        <CardContent>
          <Stack direction="vertical" spacing="lg">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Textarea
              label="Message"
              placeholder="Tell us what you think..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <Select
              label="Country"
              placeholder="Select your country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
              ]}
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            />

            <RadioGroup
              label="Subscription Plan"
              options={[
                { value: 'free', label: 'Free', description: '$0/month' },
                { value: 'pro', label: 'Pro', description: '$10/month' },
                { value: 'enterprise', label: 'Enterprise', description: 'Contact us' },
              ]}
              value={formData.plan}
              onValueChange={(value) => setFormData({ ...formData, plan: value })}
            />

            <Checkbox
              label="Accept terms and conditions"
              description="I agree to the terms and conditions"
              checked={formData.terms}
              onCheckedChange={(checked) => setFormData({ ...formData, terms: !!checked })}
            />

            <Switch
              label="Email notifications"
              description="Receive updates via email"
              checked={formData.notifications}
              onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
            />
          </Stack>
        </CardContent>

        <CardFooter>
          <ButtonGroup fullWidth orientation="horizontal">
            <Button variant="outline" fullWidth>Cancel</Button>
            <Button variant="primary" fullWidth leftIcon={<Save size={16} />}>
              Submit
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Container>
  )
}

/**
 * Example 2: Dashboard with Cards
 */
export function DashboardExample() {
  return (
    <Container size="lg">
      <Stack direction="vertical" spacing="xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-mono text-fg-0">Dashboard</h1>
          <p className="text-sm text-fg-2 mt-2">Welcome back!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-fg-2">Total Users</p>
                  <p className="text-2xl sm:text-3xl font-mono text-fg-0 mt-1">1,234</p>
                </div>
                <Badge variant="success">+12%</Badge>
              </div>
              <Progress value={75} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-fg-2">Revenue</p>
                  <p className="text-2xl sm:text-3xl font-mono text-fg-0 mt-1">$12,345</p>
                </div>
                <Badge variant="primary">New</Badge>
              </div>
              <Progress value={60} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-fg-2">Tasks</p>
                  <p className="text-2xl sm:text-3xl font-mono text-fg-0 mt-1">42</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <Progress value={40} className="mt-4" />
            </CardContent>
          </Card>
        </div>

        <Alert variant="info" title="System Update" description="A new version is available. Please update to get the latest features." />
      </Stack>
    </Container>
  )
}

/**
 * Example 3: User Profile with Dropdown
 */
export function ProfileExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4 border-b border-border-0">
      <div className="flex items-center gap-3">
        <Avatar src="/avatar.jpg" alt="John Doe" fallback="JD" size="lg" />
        <div>
          <p className="text-sm sm:text-base font-medium text-fg-0">John Doe</p>
          <p className="text-xs text-fg-2">john@example.com</p>
        </div>
      </div>

      <Dropdown>
        <DropdownTrigger asChild>
          <IconButton icon={<Settings size={18} />} aria-label="Settings" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>My Account</DropdownLabel>
          <DropdownItem>
            <User size={16} className="mr-2" />
            Profile
          </DropdownItem>
          <DropdownItem>
            <Settings size={16} className="mr-2" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalTrigger asChild>
          <Button variant="primary">Edit Profile</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Profile</ModalTitle>
            <ModalDescription>Update your profile information</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <Stack direction="vertical" spacing="md">
              <Input label="Name" defaultValue="John Doe" />
              <Input label="Email" type="email" defaultValue="john@example.com" />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </ModalFooter>
          <ModalClose />
        </ModalContent>
      </Modal>
    </div>
  )
}

/**
 * Example 4: Tabs Navigation
 */
export function TabsExample() {
  return (
    <Container>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Overview</h3>
              <p className="text-sm text-fg-2">Dashboard overview content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Analytics</h3>
              <p className="text-sm text-fg-2">Analytics data goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Settings</h3>
              <p className="text-sm text-fg-2">Settings panel goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}

/**
 * Example 5: FAQ with Accordion
 */
export function FAQExample() {
  return (
    <Container size="md">
      <Stack direction="vertical" spacing="xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-mono text-fg-0">Frequently Asked Questions</h2>
          <p className="text-sm text-fg-2 mt-2">Find answers to common questions</p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item1">
            <AccordionTrigger>What is this application?</AccordionTrigger>
            <AccordionContent>
              This is a modern web application built with React, TypeScript, and Tailwind CSS.
              It features a terminal-inspired design with full mobile support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item2">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
              Simply create an account and follow the onboarding process. You'll be up and running in minutes!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item3">
            <AccordionTrigger>Is it mobile-friendly?</AccordionTrigger>
            <AccordionContent>
              Yes! All components are mobile-first and optimized for iOS with 44px touch targets and safe area support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Container>
  )
}

/**
 * Example 6: Toast Notifications
 */
export function ToastExample() {
  const [showToast, setShowToast] = useState(false)

  return (
    <ToastProvider>
      <Container>
        <Stack direction="vertical" spacing="md">
          <Button onClick={() => setShowToast(true)}>
            Show Toast
          </Button>

          <Toast
            variant="success"
            title="Changes saved"
            description="Your settings have been updated successfully"
            open={showToast}
            onOpenChange={setShowToast}
            duration={3000}
          />
        </Stack>
      </Container>
    </ToastProvider>
  )
}

/**
 * Example 7: Loading States
 */
export function LoadingExample() {
  const [loading, setLoading] = useState(false)

  return (
    <Container>
      <Card>
        <CardContent>
          <Stack direction="vertical" spacing="lg" align="center">
            <Spinner size="xl" color="brand" />
            <p className="text-sm text-fg-2">Loading your data...</p>

            <Divider spacing="lg" />

            <Button loading={loading} onClick={() => setLoading(true)}>
              Save Changes
            </Button>

            <Progress value={65} showValue label="Upload progress" />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}
