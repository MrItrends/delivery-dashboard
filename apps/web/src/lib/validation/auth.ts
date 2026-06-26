import { z } from 'zod'

/**
 * Auth validation schemas.
 * Messages are written in the product voice: short, human, never technical.
 */

const email = z
  .string()
  .min(1, 'Enter your email address')
  .email('Enter a valid email address')

const password = z.string().min(1, 'Enter your password')

const newPassword = z
  .string()
  .min(10, 'Use at least 10 characters')
  .regex(/[a-z]/, 'Add a lowercase letter')
  .regex(/[A-Z]/, 'Add an uppercase letter')
  .regex(/[0-9]/, 'Add a number')

export const loginSchema = z.object({
  email,
  password,
  remember: z.boolean().optional(),
})
export type LoginValues = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    name: z.string().min(1, 'Enter your full name'),
    email,
    password: newPassword,
    confirmPassword: z.string().min(1, 'Re-enter your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type SignupValues = z.infer<typeof signupSchema>

export const forgotPasswordSchema = z.object({ email })
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: newPassword,
    confirmPassword: z.string().min(1, 'Re-enter your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

/**
 * Password strength helper for the live meter on Sign Up / Reset.
 * Returns a 0–4 score and a label.
 */
export function passwordStrength(value: string): {
  score: 0 | 1 | 2 | 3 | 4
  label: string
} {
  if (!value) return { score: 0, label: '' }
  let score = 0
  if (value.length >= 10) score++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return { score: score as 0 | 1 | 2 | 3 | 4, label: labels[score] ?? '' }
}
