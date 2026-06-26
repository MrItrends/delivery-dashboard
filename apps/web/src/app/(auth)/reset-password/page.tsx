'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from '@/lib/validation/auth'
import { useToastStore } from '@/stores/useToastStore'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { PasswordStrength } from '@/components/auth/PasswordStrength'
import { AuthStatus } from '@/components/auth/AuthStatus'
import {
  AuthHeader,
  FieldStack,
  AuthFooter,
} from '@/components/auth/AuthScaffold'

export default function ResetPasswordPage() {
  const router = useRouter()
  const toast = useToastStore()
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: { password: '', confirmPassword: '' },
  })

  const passwordValue = watch('password')

  async function onSubmit(_values: ResetPasswordValues) {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Password updated')
    setDone(true)
  }

  if (done) {
    return (
      <AuthStatus
        icon="check-circle"
        tone="success"
        title="Password updated"
        description="Your password has been changed. You can now sign in with your new password."
        actions={
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/login')}
            style={{ width: '100%' }}
          >
            Continue to sign in
          </Button>
        }
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthHeader
        title="Choose a new password"
        subtitle="Your new password must be different from previous passwords."
      />

      <FieldStack>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <TextField
            label="New password"
            type="password"
            icon="lock"
            placeholder="Create a new password"
            autoComplete="new-password"
            autoFocus
            error={touchedFields.password ? errors.password?.message : undefined}
            disabled={isSubmitting}
            {...register('password')}
          />
          <PasswordStrength value={passwordValue} />
        </div>

        <TextField
          label="Confirm new password"
          type="password"
          icon="lock"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          error={touchedFields.confirmPassword ? errors.confirmPassword?.message : undefined}
          disabled={isSubmitting}
          {...register('confirmPassword')}
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
          {isSubmitting ? 'Updating…' : 'Update password'}
        </Button>
      </div>

      <AuthFooter />
    </form>
  )
}
