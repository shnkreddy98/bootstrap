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
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

/**
 * Login Page
 *
 * User authentication with email/password
 */

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // TODO: Implement actual login logic
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
              Welcome Back
            </h1>
            <p className="text-sm text-fg-2">
              Sign in to continue to Terminal Todo
            </p>
          </div>

          {/* Login Form */}
          <Card variant="default" padding="lg">
            <form onSubmit={handleSubmit}>
              <Stack direction="vertical" spacing="lg">
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <Checkbox
                    label="Remember me"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <button
                    type="button"
                    className="text-xs sm:text-sm text-brand hover:underline"
                    onClick={() => {
                      // TODO: Navigate to forgot password
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                >
                  Sign In
                </Button>

                {/* Divider */}
                <Divider />

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-fg-2">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-brand hover:underline font-medium"
                      onClick={() => navigate({ to: '/signup' })}
                    >
                      Sign up
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
