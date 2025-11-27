import { useState } from 'react'
import {
  Container,
  Card,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListSectionHeader,
  Badge,
  Button,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
  Input,
} from '../templates'
import { User, Mail, Calendar, Edit2, LogOut } from 'lucide-react'

/**
 * Profile Page
 *
 * User profile with avatar, info, and settings list
 */

export function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const handleSave = () => {
    // Save logic here
    setIsEditModalOpen(false)
  }

  return (
    <Container size="md" padding="none">
      <Stack direction="vertical" spacing="none">
        {/* Profile Header Card */}
        <Card variant="default" padding="lg">
          <Stack direction="vertical" spacing="lg" align="center">
            <Avatar
              src="/avatar.jpg"
              alt={name}
              fallback={name.split(' ').map(n => n[0]).join('')}
              size="xl"
            />

            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-mono text-fg-0 mb-1">
                {name}
              </h2>
              <p className="text-sm text-fg-2">{email}</p>
            </div>

            <div className="flex gap-3">
              <Modal open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <ModalTrigger asChild>
                  <Button variant="primary" leftIcon={<Edit2 size={16} />}>
                    Edit Profile
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Edit Profile</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <Stack direction="vertical" spacing="lg">
                      <Input
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Stack>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </ModalFooter>
                  <ModalClose />
                </ModalContent>
              </Modal>
            </div>
          </Stack>
        </Card>

        <Divider spacing="none" />

        {/* Stats Card */}
        <Card variant="default" padding="md">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-mono text-brand mb-1">12</p>
              <p className="text-xs text-fg-2">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-mono text-warning mb-1">5</p>
              <p className="text-xs text-fg-2">Active</p>
            </div>
            <div>
              <p className="text-2xl font-mono text-fg-0 mb-1">17</p>
              <p className="text-xs text-fg-2">Total</p>
            </div>
          </div>
        </Card>

        <Divider spacing="none" />

        {/* Account Info */}
        <List divided>
          <ListSectionHeader>Account Information</ListSectionHeader>

          <ListItem
            leftContent={<User size={20} className="text-fg-2" />}
            title="Username"
            description="johndoe"
          />

          <ListItem
            leftContent={<Mail size={20} className="text-fg-2" />}
            title="Email"
            description={email}
            rightContent={<Badge variant="success">Verified</Badge>}
          />

          <ListItem
            leftContent={<Calendar size={20} className="text-fg-2" />}
            title="Member Since"
            description="January 2025"
          />
        </List>

        <Divider spacing="none" />

        {/* Actions */}
        <div className="p-4">
          <Button
            variant="danger"
            fullWidth
            leftIcon={<LogOut size={18} />}
            onClick={() => {
              // TODO: Implement logout logic
            }}
          >
            Logout
          </Button>
        </div>
      </Stack>
    </Container>
  )
}
