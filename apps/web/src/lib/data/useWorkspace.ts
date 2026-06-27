'use client'

import { useQuery } from '@tanstack/react-query'
import { getWorkspace } from './admin'

export function useWorkspace() {
  return useQuery({ queryKey: ['workspace'], queryFn: getWorkspace, staleTime: 60_000 })
}
