'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listComments, createComment, setCommentFlags } from './comments'

export function useComments(objectType: string, objectId: string) {
  return useQuery({
    queryKey: ['comments', objectType, objectId],
    queryFn: () => listComments(objectType, objectId),
  })
}

export function useCommentMutations(objectType: string, objectId: string) {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: ['comments', objectType, objectId] })

  const add = useMutation({
    mutationFn: (body: string) => createComment(objectType, objectId, body),
    onSuccess: invalidate,
  })
  const flag = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: { resolved?: boolean; pinned?: boolean } }) => setCommentFlags(id, patch),
    onSuccess: invalidate,
  })

  return { add, flag }
}
