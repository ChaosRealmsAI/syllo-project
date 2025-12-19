import { useState } from 'react'
import { BlockProps, TableConfig, TableData, TableRow } from './types'

type ColumnDef = {
  key: keyof TableRow
  header: string
  render?: (row: TableRow, editingCell: { rowId: string; field: string } | null, setEditingCell: (cell: { rowId: string; field: string } | null) => void, updateCell: (rowId: string, field: string, value: string) => void) => React.ReactNode
}

export function TableBlock({ config, data, onDataChange }: BlockProps<TableConfig, TableData>) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: string } | null>(null)

  const updateCell = (rowId: string, field: string, value: string) => {
    onDataChange?.({
      ...data,
      rows: data.rows.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    })
  }

  const EditableCell = ({
    rowId,
    field,
    value,
    className = ''
  }: {
    rowId: string
    field: string
    value: string
    className?: string
  }) => {
    const isEditing = editingCell?.rowId === rowId && editingCell?.field === field

    if (isEditing) {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => updateCell(rowId, field, e.target.value)}
          onBlur={() => setEditingCell(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setEditingCell(null)
            if (e.key === 'Escape') setEditingCell(null)
          }}
          autoFocus
          className={`w-full bg-transparent border border-accent rounded px-2 py-0.5 focus:outline-none ${className}`}
        />
      )
    }

    return (
      <span
        onDoubleClick={() => setEditingCell({ rowId, field })}
        className={`cursor-pointer ${className}`}
      >
        {value}
      </span>
    )
  }

  // Build visible columns based on config
  const columns: ColumnDef[] = [
    { key: 'name', header: 'Name' },
    ...(config.showStatus ? [{
      key: 'status' as keyof TableRow,
      header: 'Status',
      render: (row: TableRow) => (
        <span className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: row.statusColor }}
          />
          <EditableCell rowId={row.id} field="status" value={row.status} className="text-text-main" />
        </span>
      )
    }] : []),
    { key: 'priority', header: 'Priority' },
    { key: 'owner', header: 'Owner' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4 font-semibold text-text-muted uppercase text-xs tracking-wide"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-border hover:bg-element transition-colors ${
                config.striped && index % 2 === 1 ? 'bg-element/50' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-text-main">
                  {col.render ? (
                    col.render(row, editingCell, setEditingCell, updateCell)
                  ) : (
                    <EditableCell
                      rowId={row.id}
                      field={col.key}
                      value={String(row[col.key])}
                      className={col.key === 'owner' ? 'text-text-muted' : ''}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
