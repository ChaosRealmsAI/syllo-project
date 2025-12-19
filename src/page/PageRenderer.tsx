import { Row } from './Row'
import { PageSchema } from './types'

interface PageRendererProps {
  schema: PageSchema
}

export function PageRenderer({ schema }: PageRendererProps) {
  return (
    <div className="space-y-4">
      {schema.rows.map(row => (
        <Row key={row.id} row={row} />
      ))}
    </div>
  )
}
