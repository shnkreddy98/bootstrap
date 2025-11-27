import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Container,
  Stack,
  Card,
  Input,
  Button,
  Checkbox,
  Divider,
} from '../templates'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

/**
 * Signup Page
 *
 * User registration with name, email, and password
 */

export function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
      confirmPassword?: string
      terms?: string
    } = {}

    if (!name) {
      newErrors.name = 'Name is required'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // TODO: Implement actual signup logic
    setTimeout(() => {
      setIsLoading(false)
      navigate({ to: '/' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg-0 flex items-center justify-center p-4">
      <Container size="sm" padding="none">
        <Stack direction="vertical" spacing="lg">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-mono text-fg-0 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-fg-2">
              Join Terminal Todo and start organizing your tasks
            </p>
          </div>

          {/* Signup Form */}
          <Card variant="default" padding="lg">
            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" spacing="lg">
                {/* Name Input */}
                <div className="relative">
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-[34px] text-fg-3 pointer-events-none">
                    <User size={18} />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-[34px] text-fg-3 pointer-events-none">
                    <Mail size={18} />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    helperText="Must be 8+ characters with uppercase, lowercase, and number"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-fg-3 hover:text-fg-0 transition-colors z-10"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="absolute right-12 top-[34px] text-fg-3 pointer-events-none">
                    <Lock size={18} />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[34px] text-fg-3 hover:text-fg-0 transition-colors z-10"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className="absolute right-12 top-[34px] text-fg-3 pointer-events-none">
                    <Lock size={18} />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <Checkbox
                    label={
                      <span className="text-xs sm:text-sm">
                        I agree to the{' '}
                        <button
                          type="button"
                          className="text-brand hover:underline"
                          onClick={() => {
                            // TODO: Navigate to terms
                          }}
                        >
                          Terms & Conditions
                        </button>{' '}
                        and{' '}
                        <button
                          type="button"
                          className="text-brand hover:underline"
                          onClick={() => {
                            // TODO: Navigate to privacy policy
                          }}
                        >
                          Privacy Policy
                        </button>
                      </span>
                    }
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                  />
                  {errors.terms && (
                    <p className="mt-1 text-xs text-error">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                >
                  Create Account
                </Button>

                {/* Divider */}
                <Divider />

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-fg-2">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="text-brand hover:underline font-medium"
                      onClick={() => navigate({ to: '/login' })}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </div>
  )
}
