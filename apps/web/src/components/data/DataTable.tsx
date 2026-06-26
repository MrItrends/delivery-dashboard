'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type OnChangeFn,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useState, useRef, useCallback, useId } from 'react'
import styles from './DataTable.module.css'

// Row height by density mode
const ROW_HEIGHT = { comfortable: 56, compact: 40 } as const
type Density = keyof typeof ROW_HEIGHT

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  density?: Density
  onRowClick?: (row: TData) => void
  onRowDoubleClick?: (row: TData) => void
  getRowId?: (row: TData) => string
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  isLoading?: boolean
  emptyMessage?: string
  stickyHeader?: boolean
}

export function DataTable<TData>({
  data,
  columns,
  density = 'comfortable',
  onRowClick,
  onRowDoubleClick,
  getRowId,
  rowSelection,
  onRowSelectionChange,
  isLoading = false,
  emptyMessage = 'No items to display.',
  stickyHeader = true,
}: DataTableProps<TData>) {
  const tableId = useId()
  const [sorting, setSorting] = useState<SortingState>([])
  const parentRef = useRef<HTMLDivElement>(null)
  const rowHeight = ROW_HEIGHT[density]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection: rowSelection ?? {} },
    onSortingChange: setSorting,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId,
    enableRowSelection: !!onRowSelectionChange,
  })

  const { rows } = table.getRowModel()
  const VIRTUALIZE_THRESHOLD = 50

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
    enabled: rows.length > VIRTUALIZE_THRESHOLD,
  })

  const virtualRows = rows.length > VIRTUALIZE_THRESHOLD
    ? virtualizer.getVirtualItems()
    : rows.map((_, i) => ({ index: i, start: i * rowHeight, size: rowHeight }))

  const totalHeight = rows.length > VIRTUALIZE_THRESHOLD
    ? virtualizer.getTotalSize()
    : rows.length * rowHeight

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>, row: TData) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onRowClick?.(row)
      }
    },
    [onRowClick]
  )

  if (isLoading) {
    return <DataTableSkeleton density={density} />
  }

  return (
    <div className={styles.wrapper} ref={parentRef} id={tableId}>
      <table
        className={`${styles.table} ${styles[density]}`}
        role="grid"
        aria-rowcount={rows.length}
      >
        {/* Header */}
        <thead className={stickyHeader ? styles.stickyHeader : ''}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.headerRow}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    className={`${styles.th} ${canSort ? styles.sortable : ''}`}
                    style={{ width: header.getSize() }}
                    aria-sort={
                      sorted === 'asc'
                        ? 'ascending'
                        : sorted === 'desc'
                        ? 'descending'
                        : canSort
                        ? 'none'
                        : undefined
                    }
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className={styles.thInner}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        <span className={styles.sortIcon} aria-hidden="true">
                          {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>

        {/* Body — virtualized when >50 rows */}
        <tbody
          style={{
            height: totalHeight,
            position: 'relative',
            display: 'block',
          }}
        >
          {rows.length === 0 ? (
            <tr className={styles.emptyRow}>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index]
              if (!row) return null
              const isSelected = row.getIsSelected?.()
              return (
                <tr
                  key={row.id}
                  className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: rowHeight,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => onRowClick?.(row.original)}
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                  onKeyDown={(e) => handleRowKeyDown(e, row.original)}
                  tabIndex={0}
                  aria-selected={isSelected}
                  aria-rowindex={virtualRow.index + 1}
                  role="row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={styles.td}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>

      {/* Selection count */}
      {onRowSelectionChange && table.getSelectedRowModel().rows.length > 0 && (
        <div className={styles.selectionBar} role="status" aria-live="polite">
          {table.getSelectedRowModel().rows.length} selected
          <button
            className={styles.clearSelection}
            onClick={() => table.resetRowSelection()}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

/* Skeleton loader */
function DataTableSkeleton({ density }: { density: Density }) {
  const rowHeight = ROW_HEIGHT[density]
  return (
    <div className={styles.skeleton}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={styles.skeletonRow}
          style={{ height: rowHeight }}
          aria-hidden="true"
        >
          <div className={`${styles.skeletonCell} ${styles.skeletonCellSm}`} />
          <div className={`${styles.skeletonCell} ${styles.skeletonCellLg}`} />
          <div className={`${styles.skeletonCell} ${styles.skeletonCellMd}`} />
          <div className={`${styles.skeletonCell} ${styles.skeletonCellMd}`} />
          <div className={`${styles.skeletonCell} ${styles.skeletonCellSm}`} />
        </div>
      ))}
    </div>
  )
}
