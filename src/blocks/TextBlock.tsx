import { useState } from 'react'
import { BlockProps, TextConfig, TextData } from './types'

export function TextBlock({ config, data, onDataChange }: BlockProps<TextConfig, TextData>) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleChange = (field: keyof TextData, value: string) => {
    onDataChange?.({ ...data, [field]: value })
  }

  const EditableText = ({
    field,
    value,
    className = '',
    as: Component = 'p'
  }: {
    field: keyof TextData
    value: string
    className?: string
    as?: 'h1' | 'p' | 'blockquote'
  }) => {
    const isEditing = editingField === field

    if (isEditing) {
      return (
        <textarea
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              setEditingField(null)
            }
          }}
          autoFocus
          className={`w-full bg-transparent border border-accent rounded px-2 py-1 resize-none focus:outline-none ${className}`}
          rows={Component === 'p' ? 3 : 1}
        />
      )
    }

    return (
      <Component
        onClick={() => setEditingField(field)}
        className={`cursor-pointer hover:bg-element-hover rounded px-2 py-1 -mx-2 transition-colors ${className}`}
      >
        {value || <span className="text-text-muted italic">Click to edit...</span>}
      </Component>
    )
  }

  return (
    <div className="space-y-4">
      {config.showHeading && (
        <EditableText
          field="heading"
          value={data.heading}
          as="h1"
          className="text-2xl font-bold text-text-main"
        />
      )}

      <EditableText
        field="content"
        value={data.content}
        as="p"
        className="text-text-muted leading-relaxed"
      />

      {config.showQuote && (
        <blockquote className="border-l-4 border-accent pl-4 italic text-text-main">
          <EditableText
            field="quote"
            value={data.quote ?? ''}
            as="p"
            className=""
          />
        </blockquote>
      )}
    </div>
  )
}
