import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

const DURATIONS: Record<ToastType, number> = {
  success: 3000,
  warning: 5000,
  error:   8000,
  info:    4000,
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  add: (toast) => {
    const id = Math.random().toString(36).slice(2)
    const duration = toast.duration ?? DURATIONS[toast.type]

    set((state) => ({
      toasts: [...state.toasts.slice(-2), { ...toast, id }],
    }))

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, duration)
  },

  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  success: (message) =>
    useToastStore.getState().add({ type: 'success', message }),

  error: (message) =>
    useToastStore.getState().add({ type: 'error', message }),

  warning: (message) =>
    useToastStore.getState().add({ type: 'warning', message }),

  info: (message) =>
    useToastStore.getState().add({ type: 'info', message }),
}))
