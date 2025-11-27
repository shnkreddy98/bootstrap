import { useState } from 'react'
import {
  Container,
  Stack,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Button,
  Alert,
  Divider,
} from '../templates'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

/**
 * Contact Page - Contact Form Template
 *
 * Features:
 * - Contact form with validation
 * - Contact info display
 * - Success/error states
 * - Inquiry type select
 */

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message

  return (
    <Container size="md" padding="md">
      <Stack direction="vertical" spacing="xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-mono text-fg-0">
            Contact Us
          </h1>
          <p className="text-sm text-fg-2 mt-2">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <Alert
            variant="success"
            title="Message sent!"
            description="We'll get back to you as soon as possible."
            onClose={() => setSubmitted(false)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent>
                  <Stack direction="vertical" spacing="lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Select
                      label="Subject"
                      placeholder="Select a subject"
                      options={[
                        { value: 'general', label: 'General Inquiry' },
                        { value: 'support', label: 'Technical Support' },
                        { value: 'sales', label: 'Sales Question' },
                        { value: 'feedback', label: 'Feedback' },
                        { value: 'other', label: 'Other' },
                      ]}
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      required
                    />
                  </Stack>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    leftIcon={<Send size={18} />}
                    disabled={!isFormValid || isSubmitting}
                    loading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack direction="vertical" spacing="lg">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-brand mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-fg-0">Email</p>
                      <p className="text-xs text-fg-2 mt-1">
                        support@example.com
                      </p>
                    </div>
                  </div>

                  <Divider spacing="none" />

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-brand mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-fg-0">Phone</p>
                      <p className="text-xs text-fg-2 mt-1">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <Divider spacing="none" />

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-brand mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-fg-0">Office</p>
                      <p className="text-xs text-fg-2 mt-1">
                        123 Main Street
                        <br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </div>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-fg-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Stack>
    </Container>
  )
}
