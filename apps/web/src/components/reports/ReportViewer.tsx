'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { getReport, updateReport, publishReport } from '@/lib/data/reports'
import { composeReport } from '@/lib/data/reportCompose'
import { downloadCSV } from '@/lib/export'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import r from './ReportViewer.module.css'

const STATUS: Record<string, { status: ObjectStatus; label: string }> = {
  draft: { status: 'draft', label: 'Draft' },
  review: { status: 'active', label: 'In review' },
  published: { status: 'approved', label: 'Published' },
}

export function ReportViewer({ id }: { id: string }) {
  const toast = useToastStore()
  const qc = useQueryClient()
  const { data: report, isLoading, isError } = useQuery({ queryKey: ['report', id], queryFn: () => getReport(id) })
  const { data: composed } = useQuery({ queryKey: ['report-compose', id], queryFn: () => composeReport(report!), enabled: !!report })

  const [narrative, setNarrative] = useState('')
  const [recommendations, setRecommendations] = useState('')
  useEffect(() => { if (report) { setNarrative(report.narrative ?? ''); setRecommendations(report.recommendations ?? '') } }, [report])

  const save = useMutation({
    mutationFn: () => updateReport(id, { narrative, recommendations }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['report', id] }); toast.success('Report saved') },
    onError: () => toast.error('Could not save'),
  })
  const publish = useMutation({
    mutationFn: () => publishReport(id, report?.version ?? 1),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['report', id] }); qc.invalidateQueries({ queryKey: ['reports'] }); toast.success('Report published') },
    onError: () => toast.error('Could not publish'),
  })

  function exportCsv() {
    if (!report || !composed) return
    const rows: (string | number)[][] = [
      ['Report', report.title],
      ['Scope', `${report.scope_type} — ${composed.scopeName}`],
      ['Period', report.period ?? ''],
      ['Status', report.status],
      [],
      ['Metric', 'Value'],
      ...composed.metrics.map((m) => [m.label, m.value] as (string | number)[]),
      [],
      ['Risk', 'Severity', 'Owner', 'Mitigation'],
      ...composed.risks.map((x) => [x.title, x.severity, x.owner ?? '', x.mitigation ?? ''] as (string | number)[]),
    ]
    downloadCSV(`${report.title.replace(/\s+/g, '-').toLowerCase()}.csv`, rows)
  }

  if (isLoading) return <div className={page.page}><div className={page.body} style={{ paddingTop: 'var(--space-8)' }}><div className="shimmer" style={{ height: 28, width: 280, borderRadius: 6, display: 'block' }} /></div></div>
  if (isError || !report) return <div className={page.page}><div className={page.body} style={{ paddingTop: 'var(--space-8)' }}><FormBanner tone="error">This report couldn’t be found.</FormBanner></div></div>

  const st = STATUS[report.status] ?? STATUS.draft!
  const published = report.status === 'published'

  return (
    <div className={page.page}>
      <PageHeader
        title={report.title}
        status={st.status}
        metadata={[{ label: 'Version', value: `v${report.version}` }, { label: 'Status', value: st.label }]}
        primaryAction={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="md" onClick={exportCsv}>Export CSV</Button>
            <Button variant="secondary" size="md" iconLeft={<Icon name="document" size={16} />} onClick={() => window.print()}>Print / PDF</Button>
            <Button variant="secondary" size="md" loading={save.isPending} onClick={() => save.mutate()}>Save</Button>
            <Button variant="primary" size="md" loading={publish.isPending} disabled={published} onClick={() => publish.mutate()}>{published ? 'Published' : 'Publish'}</Button>
          </div>
        }
      />
      <div className={page.body}>
        <div id="report-print" className={r.doc}>
          <div className={r.docHeader}>
            <h1 className={r.docTitle}>{report.title}</h1>
            <div className={r.docMeta}>
              <span>Scope: <strong>{composed?.scopeName ?? report.scope_type}</strong></span>
              {report.period && <span>Period: {report.period}</span>}
              {report.audience && <span>Audience: {report.audience}</span>}
              <span>Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Summary */}
          <section className={r.section}>
            <h2 className={r.sectionTitle}>Summary</h2>
            {composed ? (
              <>
                <div className={r.metrics}>
                  {composed.metrics.map((m) => (
                    <div key={m.label} className={r.metric}>
                      <div className={r.metricValue}>{m.value}</div>
                      <div className={r.metricLabel}>{m.label}</div>
                    </div>
                  ))}
                </div>
                {composed.healthDist && (composed.healthDist.healthy + composed.healthDist.atRisk + composed.healthDist.critical) > 0 && (
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <div className={r.healthBar}>
                      <span className={r.barHealthy} style={{ flex: composed.healthDist.healthy || 0.001 }} />
                      <span className={r.barAtRisk} style={{ flex: composed.healthDist.atRisk || 0.001 }} />
                      <span className={r.barCritical} style={{ flex: composed.healthDist.critical || 0.001 }} />
                    </div>
                    <div className={r.legend}>
                      <span><span className={r.legendDot} style={{ background: 'var(--color-status-healthy-dot)' }} />{composed.healthDist.healthy} healthy</span>
                      <span><span className={r.legendDot} style={{ background: 'var(--color-status-atrisk-dot)' }} />{composed.healthDist.atRisk} at risk</span>
                      <span><span className={r.legendDot} style={{ background: 'var(--color-status-critical-dot)' }} />{composed.healthDist.critical} critical</span>
                    </div>
                  </div>
                )}
              </>
            ) : <p className={r.empty}>Composing live data…</p>}
          </section>

          {/* Risks */}
          <section className={r.section}>
            <h2 className={r.sectionTitle}>Risk summary</h2>
            {composed && composed.risks.length > 0 ? (
              <div className={r.table}>
                {composed.risks.map((x) => (
                  <div key={x.id} className={r.tr}>
                    <StatusChip status={x.severity} size="sm" />
                    <span className={r.riskTitle}>{x.title}</span>
                    <span className={r.riskMeta}>{x.owner ?? ''}</span>
                  </div>
                ))}
              </div>
            ) : <p className={r.empty}>No risks recorded for this scope.</p>}
          </section>

          {/* Recent activity */}
          <section className={r.section}>
            <h2 className={r.sectionTitle}>Recent activity</h2>
            {composed && composed.recent.length > 0 ? (
              <div>
                {composed.recent.map((c) => (
                  <div key={c.id} className={r.activityItem}>
                    <span className={r.activityAuthor}>{c.author}</span> {c.body} <span className={r.riskMeta}>· {timeAgo(c.created_at)}</span>
                  </div>
                ))}
              </div>
            ) : <p className={r.empty}>No recent activity.</p>}
          </section>

          {/* Narrative */}
          <section className={r.section}>
            <h2 className={r.sectionTitle}>Narrative</h2>
            {published
              ? <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', whiteSpace: 'pre-wrap' }}>{narrative || '—'}</p>
              : <textarea className={r.textarea} value={narrative} onChange={(e) => setNarrative(e.target.value)} placeholder="Summarise the state of delivery for this report…" />}
          </section>

          {/* Recommendations */}
          <section className={r.section}>
            <h2 className={r.sectionTitle}>Recommendations</h2>
            {published
              ? <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', whiteSpace: 'pre-wrap' }}>{recommendations || '—'}</p>
              : <textarea className={r.textarea} value={recommendations} onChange={(e) => setRecommendations(e.target.value)} placeholder="What decisions or actions do you recommend?" />}
          </section>
        </div>
      </div>
    </div>
  )
}
