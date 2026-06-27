-- =============================================================================
-- 0004 — generalise documents to any object + allow Storage access.
-- Run after 0003. Requires a private Storage bucket named "documents".
-- =============================================================================

alter table documents add column if not exists object_type text;
alter table documents add column if not exists object_id uuid;
create index if not exists idx_documents_object on documents(object_type, object_id);

-- Authenticated users can read/write the documents bucket.
do $$
begin
  begin
    create policy "documents auth all" on storage.objects for all to authenticated
      using (bucket_id = 'documents') with check (bucket_id = 'documents');
  exception when duplicate_object then null; end;
end $$;
