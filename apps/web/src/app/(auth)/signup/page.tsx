'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupValues } from '@/lib/validation/auth'
import { useToastStore } from '@/stores/useToastStore'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { PasswordStrength } from '@/components/auth/PasswordStrength'
import {
  AuthHeader,
  AuthDivider,
  SSOButtons,
  FieldStack,
  AltAction,
  WorkspaceHint,
  AuthFooter,
} from '@/components/auth/AuthScaffold'

export default function SignUpPage() {
  const router = useRouter()
  const toast = useToastStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const passwordValue = watch('password')

  async function onSubmit(_values: SignupValues) {
    await new Promise((r) => setTimeout(r, 1100))
    toast.success('Account created')
    router.push('/check-email?context=signup')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthHeader
        title="Request access"
        subtitle="Create your account to join your organisation's workspace."
      />

      <SSOButtons disabled={isSubmitting} />
      <AuthDivider label="or sign up with email" />

      <FieldStack>
        <TextField
          label="Full name"
          type="text"
          placeholder="Ahmed Yusuf"
          autoComplete="name"
          autoFocus
          error={touchedFields.name ? errors.name?.message : undefined}
          disabled={isSubmitting}
          {...register('name')}
        />

        <TextField
          label="Work email"
          type="email"
          icon="mail"
          placeholder="you@department.gov.uk"
          autoComplete="email"
          inputMode="email"
          error={touchedFields.email ? errors.email?.message : undefined}
          hint={!errors.email ? 'Use your government email address' : undefined}
          disabled={isSubmitting}
          {...register('email')}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <TextField
            label="Password"
            type="password"
            icon="lock"
            placeholder="Create a password"
            autoComplete="new-password"
            error={touchedFields.password ? errors.password?.message : undefined}
            disabled={isSubmitting}
            {...register('password')}
          />
          <PasswordStrength value={passwordValue} />
        </div>

        <TextField
          label="Confirm password"
          type="password"
          icon="lock"
          placeholder="Re-enter your password"
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
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </div>

      <WorkspaceHint>
        Access is granted by your workspace administrator. You&rsquo;ll be notified
        once approved.
      </WorkspaceHint>

      <AltAction
        prompt="Already have an account?"
        href="/login"
        label="Sign in"
      />

      <AuthFooter />
    </form>
  )
}
