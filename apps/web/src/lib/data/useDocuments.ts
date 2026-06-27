'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listDocuments, uploadDocument, deleteDocument } from './documents'

export function useDocuments(objectType: string, objectId: string) {
  return useQuery({
    queryKey: ['documents', objectType, objectId],
    queryFn: () => listDocuments(objectType, objectId),
  })
}

export function useDocumentMutations(objectType: string, objectId: string) {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: ['documents', objectType, objectId] })

  const upload = useMutation({
    mutationFn: (file: File) => uploadDocument(objectType, objectId, file),
    onSuccess: invalidate,
  })
  const remove = useMutation({
    mutationFn: ({ id, path }: { id: string; path: string | null }) => deleteDocument(id, path),
    onSuccess: invalidate,
  })

  return { upload, remove }
}
