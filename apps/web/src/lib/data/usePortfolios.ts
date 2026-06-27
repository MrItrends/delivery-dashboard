'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listPortfolios,
  createPortfolio,
  updatePortfolio,
  setPortfolioArchived,
  type PortfolioInput,
} from './portfolios'

const KEY = ['portfolios'] as const

export function usePortfolios(includeArchived = false) {
  return useQuery({
    queryKey: [...KEY, { includeArchived }],
    queryFn: () => listPortfolios(includeArchived),
  })
}

export function useCreatePortfolio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: PortfolioInput) => createPortfolio(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdatePortfolio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: PortfolioInput }) => updatePortfolio(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useArchivePortfolio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, archived }: { id: string; archived: boolean }) => setPortfolioArchived(id, archived),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
