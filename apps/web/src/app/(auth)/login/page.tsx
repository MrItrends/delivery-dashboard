'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginValues } from '@/lib/validation/auth'
import { createClient } from '@/lib/supabase/client'
import { useOnline } from '@/lib/hooks/useOnline'
import { useToastStore } from '@/stores/useToastStore'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { Checkbox } from '@/components/primitives/Checkbox'
import { Icon } from '@/components/primitives/Icon'
import {
  AuthHeader,
  AuthDivider,
  SSOButtons,
  FieldStack,
  FormOptions,
  AltAction,
  AuthFooter,
  FormBanner,
} from '@/components/auth/AuthScaffold'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'locked' }

export default function LoginPage() {
  const router = useRouter()
  const online = useOnline()
  const toast = useToastStore()
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: 'idle' })
  const [ssoRedirecting, setSsoRedirecting] = useState<null | 'microsoft' | 'google'>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '', remember: true },
  })

  async function onSubmit(values: LoginValues) {
    setSubmitState({ kind: 'idle' })

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('locked') || msg.includes('too many')) {
        setSubmitState({ kind: 'locked' })
      } else if (msg.includes('not confirmed') || msg.includes('confirm')) {
        setSubmitState({ kind: 'error', message: 'Please confirm your email before signing in.' })
      } else {
        setSubmitState({ kind: 'error', message: 'Incorrect email or password. Try again or reset it below.' })
      }
      return
    }

    toast.success('Signed in')
    router.push('/')
    router.refresh()
  }

  function handleSSO(provider: 'microsoft' | 'google') {
    setSsoRedirecting(provider)
    // Simulated redirect hand-off
    setTimeout(() => {
      toast.info(`Redirecting to ${provider === 'microsoft' ? 'Microsoft' : 'Google'}…`)
    }, 400)
  }

  const disabled = isSubmitting || !!ssoRedirecting

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to access your workspace."
      />

      {/* Offline takes precedence — you cannot submit while disconnected */}
      {!online && (
        <FormBanner tone="warning">
          You&rsquo;re offline. Reconnect to sign in — we&rsquo;ll keep your details here.
        </FormBanner>
      )}

      {submitState.kind === 'error' && online && (
        <FormBanner tone="error">{submitState.message}</FormBanner>
      )}

      {submitState.kind === 'locked' && online && (
        <FormBanner tone="warning">
          Your account is locked after several failed attempts.{' '}
          <a href="/account-locked">See how to unlock it.</a>
        </FormBanner>
      )}

      <FieldStack>
        <TextField
          label="Email"
          type="email"
          icon="mail"
          placeholder="you@department.gov.uk"
          autoComplete="email"
          autoFocus
          inputMode="email"
          error={touchedFields.email ? errors.email?.message : undefined}
          success={
            touchedFields.email && dirtyFields.email && !errors.email
              ? ' '
              : undefined
          }
          disabled={disabled}
          {...register('email')}
        />

        <TextField
          label="Password"
          type="password"
          icon="lock"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={touchedFields.password ? errors.password?.message : undefined}
          disabled={disabled}
          {...register('password')}
        />
      </FieldStack>

      <FormOptions
        left={<Checkbox label="Remember me" {...register('remember')} />}
        rightHref="/forgot-password"
        rightLabel="Forgot password?"
      />

      <div style={{ marginTop: 'var(--space-6)' }}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={disabled || !online}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </div>

      <AuthDivider />

      <SSOButtons
        onMicrosoft={() => handleSSO('microsoft')}
        onGoogle={() => handleSSO('google')}
        disabled={disabled || !online}
      />

      {ssoRedirecting && (
        <p
          style={{
            marginTop: 'var(--space-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}
          role="status"
        >
          <Icon name="spinner" size={16} className="spin" />
          Redirecting to {ssoRedirecting === 'microsoft' ? 'Microsoft' : 'Google'}…
        </p>
      )}

      <AltAction
        prompt="Don't have an account?"
        href="/signup"
        label="Request access"
      />

      <AuthFooter />
    </form>
  )
}
