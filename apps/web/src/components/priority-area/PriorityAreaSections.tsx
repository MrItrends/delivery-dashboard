'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { StatusChip } from '@/components/primitives/StatusChip'
import { useCapabilities } from '@/lib/data/roles'
import { useRealtime } from '@/lib/data/useRealtime'
import { getPriorityAreaSummary } from '@/lib/data/priorityAreaDetail'
import sect from '@/components/entity/EntityCollection.module.css'
import s from '@/components/pages/pages.module.css'

const money = (n: number) => `₦${Math.round(n).toLocaleString()}`

/** The recognisable Priority Area workspace sections: Interventions summary and
 *  Finance-methods rollup, aggregated from beneath the priority area. */
export function PriorityAreaSections({ id }: { id: string }) {
  const router = useRouter()
  const caps = useCapabilities()
  useRealtime('interventions', ['pa-summary', id])
  const { data, isLoading } = useQuery({ queryKey: ['pa-summary', id], queryFn: () => getPriorityAreaSummary(id) })
  const interventions = data?.interventions ?? []
  const financeMethods = data?.financeMethods ?? []

  return (
    <>
      <section className={sect.section} aria-label="Interventions">
        <div className={sect.sectionHeader}>
          <h2 className={sect.sectionTitle}>Interventions <span className={sect.count}>{interventions.length}</span></h2>
          {caps.canCreate && (
            <Button size="sm" variant="secondary" iconLeft={<Icon name="plus" size={15} />} onClick={() => router.push(`/new/intervention?pa=${id}`)}>Intervention</Button>
          )}
        </div>
        {isLoading ? (
          <div className={s.empty}>Loading…</div>
        ) : interventions.length === 0 ? (
          <div className={s.empty}>No interventions yet. Add the first to plan budgets, financiers and activities.</div>
        ) : (
          <ul className={s.list} role="list">
            {interventions.map((iv) => (
              <li key={iv.id}>
                <button type="button" className={`${s.row} ${s.rowButton}`} onClick={() => router.push(`/interventions/${iv.id}`)}>
                  <span className={s.rowMain}>
                    <span className={s.rowTitle}>{iv.ref ? `${iv.ref} · ` : ''}{iv.name}</span>
                    <span className={s.rowSub}>{iv.owner || 'Unassigned'}</span>
                  </span>
                  <span className={s.rowRight}>
                    <span className={s.rowMeta}>{money(iv.budget)}</span>
                    <StatusChip status={iv.status} size="sm" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {financeMethods.length > 0 && (
        <section className={sect.section} aria-label="Finance methods">
          <div className={sect.sectionHeader}>
            <h2 className={sect.sectionTitle}>Finance methods</h2>
          </div>
          <ul className={s.list} role="list">
            {financeMethods.map((fm) => (
              <li key={fm.method}>
                <div className={s.row}>
                  <span className={s.rowMain}><span className={s.rowTitle}>{fm.method}</span></span>
                  <span className={s.rowMeta}>{money(fm.amount)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
