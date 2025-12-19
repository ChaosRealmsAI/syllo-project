import { useState } from 'react'
import { BlockProps, KanbanConfig, KanbanData } from './types'

export function KanbanBlock({ config, data, onDataChange }: BlockProps<KanbanConfig, KanbanData>) {
  const [editingCard, setEditingCard] = useState<string | null>(null)

  const updateCardTitle = (columnId: string, cardId: string, title: string) => {
    onDataChange?.({
      columns: data.columns.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map(card =>
                card.id === cardId ? { ...card, title } : card
              )
            }
          : col
      )
    })
  }

  const columnCount = data.columns.length

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {data.columns.map((column) => (
        <div key={column.id} className="bg-element rounded-lg p-3">
          {/* Column Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-muted uppercase tracking-wide">
              {column.title}
            </span>
            <span className="text-xs text-text-muted bg-card px-2 py-0.5 rounded">
              {column.cards.length}
            </span>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            {column.cards.map((card) => (
              <div
                key={card.id}
                className="bg-card p-3 rounded border border-border shadow-card hover:shadow-hover transition-shadow"
              >
                {/* Tag */}
                {config.showCardTags && card.tag && (
                  <div
                    className="w-8 h-1 rounded mb-2"
                    style={{ backgroundColor: card.tagColor || '#888' }}
                  />
                )}

                {/* Title */}
                {editingCard === card.id ? (
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCardTitle(column.id, card.id, e.target.value)}
                    onBlur={() => setEditingCard(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setEditingCard(null)
                      if (e.key === 'Escape') setEditingCard(null)
                    }}
                    autoFocus
                    className="w-full bg-transparent border border-accent rounded px-2 py-0.5 text-sm focus:outline-none text-text-main"
                  />
                ) : (
                  <p
                    onClick={() => setEditingCard(card.id)}
                    className="text-sm font-medium text-text-main cursor-pointer hover:text-accent transition-colors"
                  >
                    {card.title}
                  </p>
                )}

                {/* Card ID */}
                {config.showCardId && (
                  <p className="text-xs text-text-muted mt-2">#{card.id}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
