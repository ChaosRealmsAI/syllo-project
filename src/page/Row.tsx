import { blocks } from '../blocks'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RowInstance } from './types'

interface RowProps {
  row: RowInstance
}

export function Row({ row }: RowProps) {
  return (
    <div className="page-row grid grid-cols-12 gap-4 items-stretch">
      {row.blocks.map(block => {
        const BlockComponent = blocks[block.type]
        if (!BlockComponent) {
          console.warn(`Unknown block type: ${block.type}`)
          return null
        }
        return (
          <div key={block.id} className={`col-span-${block.span}`}>
            <ErrorBoundary>
              <BlockComponent config={block.config} data={block.data} />
            </ErrorBoundary>
          </div>
        )
      })}
    </div>
  )
}
