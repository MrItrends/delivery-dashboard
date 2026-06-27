'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/lib/validation/auth'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import {
  AuthHeader,
  FieldStack,
  AuthBackLink,
  AuthFooter,
} from '@/components/auth/AuthScaffold'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  async function onSubmit(values: ForgotPasswordValues) {
    await new Promise((r) => setTimeout(r, 1000))
    router.push(`/check-email?context=reset&email=${encodeURIComponent(values.email)}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthBackLink href="/login" label="Back to sign in" />

      <AuthHeader
        title="Reset your password"
        subtitle="Enter the email linked to your account and we'll send you a secure link to reset your password."
        showLogo={false}
      />

      <FieldStack>
        <TextField
          label="Email"
          type="email"
          icon="mail"
          placeholder="you@health.gov.ng"
          autoComplete="email"
          autoFocus
          inputMode="email"
          error={touchedFields.email ? errors.email?.message : undefined}
          disabled={isSubmitting}
          {...register('email')}
        />
      </FieldStack>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Sending link…' : 'Send reset link'}
        </Button>
      </div>

      <AuthFooter />
    </form>
  )
}
