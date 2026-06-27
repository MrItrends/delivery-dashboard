'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listEntities,
  createEntity,
  updateEntity,
  setEntityArchived,
  listParentOptions,
  type Row,
  type ListOpts,
} from './crud'

export function useEntityList<T extends Row>(table: string, opts: ListOpts = {}) {
  return useQuery({
    queryKey: [table, 'list', opts.parentKey ?? null, opts.parentId ?? null, !!opts.includeArchived],
    queryFn: () => listEntities<T>(table, opts),
  })
}

export function useEntityMutations(table: string) {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: [table] })

  const create = useMutation({
    mutationFn: (input: Record<string, unknown>) => createEntity(table, input),
    onSuccess: invalidate,
  })
  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Record<string, unknown> }) => updateEntity(table, id, patch),
    onSuccess: invalidate,
  })
  const archive = useMutation({
    mutationFn: ({ id, archived }: { id: string; archived: boolean }) => setEntityArchived(table, id, archived),
    onSuccess: invalidate,
  })

  return { create, update, archive }
}

export function useParentOptions(table: string | undefined, labelField = 'name', enabled = true) {
  return useQuery({
    queryKey: [table, 'options', labelField],
    queryFn: () => listParentOptions(table!, labelField),
    enabled: enabled && !!table,
  })
}
