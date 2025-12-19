import { useState } from 'react'
import { BlockProps, TaskConfig, TaskData, TaskItem } from './types'

const priorityColors: Record<string, string> = {
  P0: 'bg-red-500/10 text-red-500 border-red-500/20',
  P1: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  P2: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

export function TaskBlock({ config, data, onDataChange }: BlockProps<TaskConfig, TaskData>) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const updateItem = (id: string, updates: Partial<TaskItem>) => {
    onDataChange?.({
      items: data.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    })
  }

  const toggleDone = (id: string) => {
    const item = data.items.find(i => i.id === id)
    if (item) {
      updateItem(id, { done: !item.done })
    }
  }

  return (
    <div className="space-y-2">
      {data.items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 p-3 rounded hover:bg-element transition-colors group"
        >
          {/* Checkbox */}
          <button
            onClick={() => toggleDone(item.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              item.done
                ? 'bg-accent border-accent text-text-on-accent'
                : 'border-border hover:border-accent'
            }`}
          >
            {item.done && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {editingId === item.id ? (
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingId(null)
                  if (e.key === 'Escape') setEditingId(null)
                }}
                autoFocus
                className="w-full bg-transparent border border-accent rounded px-2 py-0.5 focus:outline-none text-text-main"
              />
            ) : (
              <span
                onClick={() => setEditingId(item.id)}
                className={`cursor-pointer ${
                  item.done ? 'line-through text-text-muted' : 'text-text-main'
                }`}
              >
                {item.title}
              </span>
            )}

            {/* Meta */}
            <div className="flex gap-2 mt-1 flex-wrap">
              {config.showPriority && item.priority && (
                <span className={`text-xs px-2 py-0.5 rounded border ${priorityColors[item.priority]}`}>
                  {item.priority}
                </span>
              )}
              {config.showDueDate && item.dueDate && (
                <span className="text-xs px-2 py-0.5 rounded bg-element text-text-muted">
                  {item.dueDate}
                </span>
              )}
              {config.showTags && item.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-element text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
